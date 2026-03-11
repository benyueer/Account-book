import type { ImportRecordMetadata, ParsedBill, ParsedTransaction } from '@account-book/types'
import { TransactionSource, TransactionType } from '@account-book/types'
import * as XLSX from 'xlsx'

type ExcelCellValue = string | number | Date | boolean | null | undefined
type ExcelRow = ExcelCellValue[]

export class BillParser {
  static parse(filePath: string): ParsedBill {
    // 支持 UTF-8 BOM 和 GBK (代码页 936) 两种编码的 CSV
    const workbook = XLSX.readFile(filePath, { codepage: 936, type: 'file', raw: true })
    const sheetName = workbook.SheetNames[0]
    const worksheet = workbook.Sheets[sheetName]

    // 将工作表转换为原始数组（矩阵）
    const rows = XLSX.utils.sheet_to_json<ExcelRow>(worksheet, { header: 1 })

    const result: ParsedBill = {
      metadata: {} as ImportRecordMetadata,
      transactions: [],
    }

    let tableStartIndex = -1
    const metadataRows: ExcelRow[] = []

    // 1. 扫描元数据和定位表头
    for (let i = 0; i < rows.length; i++) {
      const row = rows[i]
      const firstCell = String(row[0] || '').trim()

      // 识别微信支付特有的表头分割行
      if (firstCell.includes('微信支付账单明细列表') && firstCell.includes('---')) {
        result.metadata.title = firstCell.replace(/-/g, '').trim()
        tableStartIndex = i + 1 // 下一行通常是列头
        break
      }

      // 识别支付宝特有的表头分割行
      const isAlipaySplitter = firstCell.includes('支付宝') && firstCell.includes('---') && (firstCell.includes('电子客户回单') || firstCell.includes('账单明细'))
      if (isAlipaySplitter) {
        result.metadata.title = '支付宝支付账单'
        tableStartIndex = i + 1
        break
      }

      // 额外判断：如果前几行包含支付宝账户，则判定为支付宝
      if (i < 10 && (firstCell.includes('支付宝账户') || String(row.join('')).includes('支付宝账户'))) {
        result.metadata.source = TransactionSource.ALIPAY
      }

      // 收集元数据行（在表头之前）
      if (row.length > 0) {
        metadataRows.push(row)
      }
    }

    // 2. 解析元数据
    this.extractMetadata(metadataRows, result.metadata)

    // 3. 解析交易数据
    if (tableStartIndex !== -1 && tableStartIndex < rows.length) {
      const headerRow = rows[tableStartIndex].map(h => String(h || '').trim())
      const dataRows = rows.slice(tableStartIndex + 1)

      result.transactions = dataRows
        .filter(row => row.length > 0 && row[0]) // 过滤空行
        .map(row => this.rowToTransaction(row, headerRow, result.metadata.source))
    }

    return result
  }

  private static extractMetadata(rows: ExcelRow[], metadata: ImportRecordMetadata) {
    for (const row of rows) {
      const line = row.join(' ').replace(/\s+/g, ' ')
      if (line.includes('微信支付账单明细')) {
        metadata.title = '微信支付账单'
        metadata.source = TransactionSource.WECHAT
      }
      if (line.includes('支付宝账户：')) {
        metadata.title = '支付宝支付账单'
        metadata.source = TransactionSource.ALIPAY
        const match = line.match(/支付宝账户：\s*(\S+)/)
        if (match?.[1]) {
          metadata.nickname = match[1].trim()
        }
      }

      // 微信昵称
      if (line.includes('微信昵称：')) {
        const match = line.match(/微信昵称：\s*\[([^\]]+)\]/)
        if (match?.[1]) {
          metadata.nickname = match[1]
        }
      }

      // 时间范围
      if (line.includes('起始时间：')) {
        // 支付宝格式：起始时间：[2025-01-01 00:00:00] 终止时间：[2025-12-31 23:59:59]
        // 微信格式：起始时间：[2025-01-01 00:00:00] 终止时间：[2025-12-31 23:59:59]
        const match = line.match(/起始时间：\s*\[([^\]]+)\]\s+终止时间：\s*\[([^\]]+)\]/)
        if (match?.[1] && match?.[2]) {
          metadata.startTime = new Date(match[1])
          metadata.endTime = new Date(match[2])
        }
      }

      // 导出时间
      if (line.includes('导出时间：')) {
        const match = line.match(/导出时间：\s*\[([^\]]+)\]/)
        if (match?.[1]) {
          metadata.exportTime = new Date(match[1])
        }
      }

      // 支出/收入统计
      if (line.includes('收入：') || line.includes('收入 ')) {
        const incMatch = line.match(/收入：?\s*(\d+)\s*笔\s+(\d+(?:\.\d+)?)\s*元/)
        if (incMatch && incMatch.length >= 3) {
          metadata.totalIncomeCount = Number.parseInt(incMatch[1])
          metadata.totalIncomeCost = Number.parseFloat(incMatch[2])
        }
      }
      if (line.includes('支出：') || line.includes('支出 ')) {
        const expMatch = line.match(/支出：?\s*(\d+)\s*笔\s+(\d+(?:\.\d+)?)\s*元/)
        if (expMatch && expMatch.length >= 3) {
          metadata.totalExpenseCount = Number.parseInt(expMatch[1])
          metadata.totalExpenseCost = Number.parseFloat(expMatch[2])
        }
      }
    }
  }

  private static rowToTransaction(row: ExcelRow, headers: string[], source?: TransactionSource): ParsedTransaction {
    const data: Record<string, ExcelCellValue> = {}
    headers.forEach((header, index) => {
      data[header] = row[index]
    })

    // 字段映射适配
    const rawTime = data['交易时间'] || data['时间'] || ''
    let transactionTime: Date
    if (typeof rawTime === 'number') {
      // 处理 Excel 数字日期 (1900-01-01 是 1)
      transactionTime = new Date(Math.round((rawTime - 25569) * 86400 * 1000))
    }
    else {
      transactionTime = new Date(String(rawTime))
    }

    const transactionCategory = String(data['交易分类'] || data['交易类型'] || data['类型'] || '')
    const counterparty = String(data['交易对方'] || '')
    const counterpartyAccount = String(data['对方账号'] || '')
    const productDescription = String(data['商品说明'] || data['商品'] || '')
    const amountStr = String(data['金额'] || data['金额(元)'] || '0').replace(/[^\d.-]/g, '')
    const amount = Math.abs(Number.parseFloat(amountStr))
    const typeStr = String(data['收/支'] || '')
    const transactionType = (typeStr === '收入') ? TransactionType.INCOME : (typeStr === '支出' ? TransactionType.EXPENSE : TransactionType.NO_COUNT)
    const paymentMethod = String(data['收/付款方式'] || data['支付方式'] || '')
    const transactionStatus = String(data['交易状态'] || data['当前状态'] || '')
    const transactionOrderNumber = String(data['交易订单号'] || data['交易单号'] || '').trim()
    const merchantOrderNumber = String(data['商家订单号'] || data['商户单号'] || '').trim()
    const notes = data['备注'] ? String(data['备注']) : undefined

    return {
      transactionTime,
      transactionCategory,
      counterparty,
      counterpartyAccount,
      productDescription,
      amount,
      transactionType,
      paymentMethod,
      transactionStatus,
      transactionOrderNumber,
      merchantOrderNumber,
      notes,
      source: source || TransactionSource.IMPORT,
    }
  }
}
