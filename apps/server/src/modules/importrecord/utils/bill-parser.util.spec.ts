import { TransactionType } from '@account-book/types'
import * as XLSX from 'xlsx'
import { BillParser } from './bill-parser.util'

jest.mock('xlsx', () => ({
  readFile: jest.fn(),
  utils: {
    sheet_to_json: jest.fn(),
  },
}))

describe('billParser', () => {
  const mockRows = [
    ['微信支付账单明细'],
    ['查询支付人：[张三]'],
    ['起始时间：[2023-01-01 00:00:00]  终止时间：[2023-01-31 23:59:59]'],
    ['导出时间：[2023-02-01 10:00:00]'],
    ['最近一个月收入：1笔，金额：[100.00]元'],
    ['最近一个月支出：1笔，金额：[50.00]元'],
    ['注意事项：这是一些注意事项'],
    ['----------------------微信支付账单明细列表----------------------'],
    ['交易时间', '交易类型', '交易对方', '金额(元)', '收/支', '交易单号'],
    ['2023-01-05 12:00:00', '转账', '李四', '¥100.00', '收入', '100001'],
    ['2023-01-06 13:00:00', '消费', '某商店', '¥50.00', '支出', '100002'],
  ]

  beforeEach(() => {
    jest.clearAllMocks()
      ; (XLSX.readFile as jest.Mock).mockReturnValue({
        SheetNames: ['Sheet1'],
        Sheets: { Sheet1: {} },
      })
      ; (XLSX.utils.sheet_to_json as jest.Mock).mockReturnValue(mockRows)
  })

  it('应该正确解析微信支付账单的元数据', () => {
    const result = BillParser.parse('fake-path.csv')

    expect(result.metadata.title).toBe('微信支付账单')
    expect(result.metadata.nickname).toBe('张三')
    expect(result.metadata.startTime).toBeInstanceOf(Date)
    expect(result.metadata.totalIncome).toBe(100)
    expect(result.metadata.totalExpense).toBe(50)
    expect(result.metadata.notes).toContain('这是一些注意事项')
  })

  it('应该正确解析交易明细', () => {
    const result = BillParser.parse('fake-path.csv')

    expect(result.transactions).toHaveLength(2)

    expect(result.transactions[0]).toMatchObject({
      transactionOrderNumber: '100001',
      transactionType: TransactionType.INCOME,
      amount: 100,
      counterparty: '李四',
    })

    expect(result.transactions[1]).toMatchObject({
      transactionOrderNumber: '100002',
      transactionType: TransactionType.EXPENSE,
      amount: 50,
      counterparty: '某商店',
    })
  })

  it('应该能处理金额中的货币符号和非数字字符', () => {
    ; (XLSX.utils.sheet_to_json as jest.Mock).mockReturnValue([
      ...mockRows.slice(0, 10),
      ['交易时间', '交易类型', '交易对方', '金额(元)', '收/支', '交易单号'],
      ['2023-01-05 12:00:00', '转账', '李四', '-1,234.56', '支出', '100003'],
    ])

    const result = BillParser.parse('fake-path.csv')
    expect(result.transactions[0].amount).toBe(1234.56)
  })
})
