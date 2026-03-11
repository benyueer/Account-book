import { TransactionSource, TransactionType } from '@account-book/types'
import { BillParser } from './bill-parser.util'

describe('支付宝账单解析 - 真实文件', () => {
  const filePath = '/Users/mac/Desktop/pro/Account-book/test_file/支付宝交易明细(20250101-20251231).csv'
  let result: ReturnType<typeof BillParser.parse>

  beforeAll(() => {
    result = BillParser.parse(filePath)
  })

  describe('元数据解析', () => {
    it('应识别来源为支付宝导入', () => {
      expect(result.metadata.source).toBe(TransactionSource.ALIPAY)
    })

    it('应解析账单标题', () => {
      expect(result.metadata.title).toBe('支付宝支付账单')
    })

    it('应解析账户昵称', () => {
      expect(result.metadata.nickname).toBe('347201906@qq.com')
    })

    it('应解析起始时间', () => {
      expect(result.metadata.startTime).toBeDefined()
      expect(result.metadata.startTime).toBeInstanceOf(Date)
      const start = result.metadata.startTime as Date
      expect(start.getFullYear()).toBe(2025)
      expect(start.getMonth()).toBe(0) // 1月 (0-indexed)
      expect(start.getDate()).toBe(1)
    })

    it('应解析终止时间', () => {
      expect(result.metadata.endTime).toBeDefined()
      expect(result.metadata.endTime).toBeInstanceOf(Date)
      const end = result.metadata.endTime as Date
      expect(end.getFullYear()).toBe(2025)
      expect(end.getMonth()).toBe(11) // 12月 (0-indexed)
      expect(end.getDate()).toBe(31)
    })

    it('应解析导出时间', () => {
      expect(result.metadata.exportTime).toBeDefined()
      expect(result.metadata.exportTime).toBeInstanceOf(Date)
      const exportTime = result.metadata.exportTime as Date
      expect(exportTime.getFullYear()).toBe(2026)
    })

    it('应解析收入统计', () => {
      expect(result.metadata.totalIncomeCount).toBe(7)
      expect(result.metadata.totalIncomeCost).toBe(10.44)
    })

    it('应解析支出统计', () => {
      expect(result.metadata.totalExpenseCount).toBe(419)
      expect(result.metadata.totalExpenseCost).toBe(24238.85)
    })
  })

  describe('交易明细解析', () => {
    it('应解析出正确数量的交易记录', () => {
      // 504 笔总记录 = 7 + 419 + 78，但 CSV 可能并非恰好 504 行（某些行可能被过滤）
      expect(result.transactions.length).toBeGreaterThan(0)
      // 文件中共 504 笔记录
      expect(result.transactions.length).toBeCloseTo(504, -1)
    })

    it('应正确解析第一条交易记录', () => {
      const first = result.transactions[0]
      expect(first).toBeDefined()
      expect(first.source).toBe(TransactionSource.ALIPAY)
      expect(first.transactionTime).toBeInstanceOf(Date)
      expect(typeof first.amount).toBe('number')
      expect(first.amount).toBeGreaterThan(0)
      expect([TransactionType.INCOME, TransactionType.EXPENSE, TransactionType.NO_COUNT])
        .toContain(first.transactionType)
    })

    it('所有交易记录都应有合法的交易时间', () => {
      for (const tx of result.transactions) {
        expect(tx.transactionTime).toBeInstanceOf(Date)
        expect(Number.isNaN((tx.transactionTime as Date).getTime())).toBe(false)
      }
    })

    it('所有交易记录都应有合法的金额（大于等于 0）', () => {
      for (const tx of result.transactions) {
        expect(tx.amount).toBeGreaterThanOrEqual(0)
        expect(Number.isNaN(tx.amount)).toBe(false)
      }
    })

    it('收/支字段应被正确映射', () => {
      const incomeCount = result.transactions.filter(tx => tx.transactionType === TransactionType.INCOME).length
      const expenseCount = result.transactions.filter(tx => tx.transactionType === TransactionType.EXPENSE).length
      const noCountCount = result.transactions.filter(tx => tx.transactionType === TransactionType.NO_COUNT).length

      // 验证与元数据中的统计数字基本一致
      expect(incomeCount).toBe(7)
      expect(expenseCount).toBe(419)
      expect(noCountCount).toBe(78)
    })

    it('所有交易记录来源都应为支付宝导入', () => {
      for (const tx of result.transactions) {
        expect(tx.source).toBe(TransactionSource.ALIPAY)
      }
    })

    it('交易对方字段应存在字符串类型的值', () => {
      for (const tx of result.transactions) {
        expect(typeof tx.counterparty).toBe('string')
      }
    })
  })
})
