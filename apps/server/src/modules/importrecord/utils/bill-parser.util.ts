import type { ImportRecordMetadata, ParsedBill, ParsedTransaction } from '@account-book/types'
import { TransactionSource, TransactionType } from '@account-book/types'
import * as XLSX from 'xlsx'

type ExcelCellValue = string | number | Date | boolean | null | undefined
type ExcelRow = ExcelCellValue[]

export class BillParser {
  static parse(filePath: string): ParsedBill {
    const workbook = XLSX.readFile(filePath)
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
        .filter(row => row.length >= headerRow.length && row[0]) // 过滤空行
        .map(row => this.rowToTransaction(row, headerRow, result.metadata.source))
    }

    return result
  }

  private static extractMetadata(rows: ExcelRow[], metadata: ImportRecordMetadata) {
    for (const row of rows) {
      const line = row.join(' ')
      if (line.includes('微信支付账单明细')) {
        metadata.title = '微信支付账单'
        metadata.source = TransactionSource.WECHAT
      }
      if (line.includes('微信昵称：')) {
        const match = line.match(/微信昵称：\[(.*?)\]/)
        if (match?.[1]) {
          metadata.nickname = match[1]
        }
      }
      if (line.includes('起始时间：')) {
        const match = line.match(/起始时间：\[(.*?)\]\s+终止时间：\[(.*?)\]/)
        if (match?.[1] && match?.[2]) {
          metadata.startTime = new Date(match[1])
          metadata.endTime = new Date(match[2])
        }
      }
      if (line.includes('导出时间：')) {
        const match = line.match(/导出时间：\[(.*?)\]/)
        if (match?.[1]) {
          metadata.exportTime = new Date(match[1])
        }
      }
      if (line.includes('收入')) {
        const incMatch = line.match(/(\d+)笔\s+(\d+(?:\.\d+)?)元$/)
        if (incMatch && incMatch.length >= 3) {
          metadata.totalIncomeCount = Number.parseInt(incMatch[1])
          // 金额
          metadata.totalIncomeCost = Number.parseFloat(incMatch[2])
        }
      }
      if (line.includes('支出')) {
        const expMatch = line.match(/(\d+)笔\s+(\d+(?:\.\d+)?)元$/)
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

    // 微信支付字段映射
    return {
      transactionTime: new Date(String(data['交易时间'] || data['时间'] || '')),
      transactionCategory: String(data['交易类型'] || data['类型'] || ''),
      counterparty: String(data['交易对方'] || ''),
      counterpartyAccount: String(data['对方账号'] || ''),
      productDescription: String(data['商品'] || ''),
      amount: Math.abs(Number.parseFloat(String(data['金额(元)'] || data['金额'] || '0').replace(/[^\d.-]/g, ''))),
      transactionType: (data['收/支'] === '收入') ? TransactionType.INCOME : TransactionType.EXPENSE,
      paymentMethod: String(data['支付方式'] || ''),
      transactionStatus: String(data['当前状态'] || ''),
      transactionOrderNumber: String(data['交易单号'] || ''),
      merchantOrderNumber: String(data['商户单号'] || ''),
      notes: data['备注'] ? String(data['备注']) : undefined,
      source: source || TransactionSource.IMPORT,
    }
  }
}
