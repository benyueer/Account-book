export enum CardType {
  DEBIT = 'debit',
  CREDIT = 'credit',
}

export interface Card {
  id: string
  bankName: string
  bankLogo?: string
  lastFourDigits: string
  balance: number
  cardType: CardType
  userId: string
  createdAt: string | Date
  updatedAt: string | Date
}

export type CreateCardDto = Omit<Card, 'id' | 'userId' | 'createdAt' | 'updatedAt'>
export type UpdateCardDto = Partial<CreateCardDto>
