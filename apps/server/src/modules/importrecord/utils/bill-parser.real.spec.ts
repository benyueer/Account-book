import { join } from 'node:path'
import { TransactionType } from '@account-book/types'
import { BillParser } from './bill-parser.util'

describe('billParser Real File Integration Test', () => {
  // 注意：这里的相对路径是从 src 目录出发的，因为测试在 jest 的 rootDir: "src" 下运行
  const realFilePath = join(__dirname, '../../../../../../test_file/微信支付账单流水文件(20260122-20260129)_20260129164220.xlsx')

  it('应该能正确解析真实的微信支付 XLSX 账单', () => {
    const result = BillParser.parse(realFilePath)

    // 验证元数据
    expect(result.metadata.title).toBeDefined()
    expect(result.metadata.title).toContain('微信支付')

    console.log('--- 元数据解析结果 ---')
    console.log(`标题: ${String(result.metadata.title)}`)
    console.log(`昵称: ${String(result.metadata.nickname)}`)
    console.log(`开始时间: ${String(result.metadata.startTime)}`)
    console.log(`结束时间: ${String(result.metadata.endTime)}`)
    console.log(`总计收入: ${result.metadata.totalIncomeCount} 笔，金额: ${result.metadata.totalIncomeCost} 元`)
    console.log(`总计支出: ${result.metadata.totalExpenseCount} 笔，金额: ${result.metadata.totalExpenseCost} 元`)

    // 验证交易列表
    expect(result.transactions.length).toBeGreaterThan(0)

    const firstTx = result.transactions[0]
    expect(firstTx).toHaveProperty('transactionOrderNumber')
    expect(firstTx).toHaveProperty('amount')
    expect(typeof firstTx.amount).toBe('number')
    expect(Object.values(TransactionType)).toContain(firstTx.transactionType)

    console.log('--- 交易明细预览 ---')
    console.log(`成功解析出 ${result.transactions.length} 笔交易`)
    console.log('第一笔交易示例:', firstTx)

    // 检查是否有无效的 NaN 金额
    const hasNaN = result.transactions.some(t => Number.isNaN(t.amount))
    expect(hasNaN).toBe(false)
  })
})
