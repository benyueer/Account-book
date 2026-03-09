import { CreateCardDto, UpdateCardDto } from '@account-book/types'
import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Card } from './entities/card.entity'

@Injectable()
export class CardsService {
  constructor(
    @InjectRepository(Card)
    private readonly cardRepository: Repository<Card>,
  ) { }

  async create(createCardDto: CreateCardDto, userId: string): Promise<Card> {
    const card = this.cardRepository.create({
      ...createCardDto,
      userId,
    })
    return this.cardRepository.save(card)
  }

  async findAll(userId: string): Promise<Card[]> {
    return this.cardRepository.find({
      where: { userId },
      order: { bankName: 'ASC', lastFourDigits: 'ASC' },
    })
  }

  async findOne(id: string, userId: string): Promise<Card> {
    const card = await this.cardRepository.findOne({
      where: { id, userId },
    })
    if (!card) {
      throw new NotFoundException(`Card with ID "${id}" not found`)
    }
    return card
  }

  async update(id: string, updateCardDto: UpdateCardDto, userId: string): Promise<Card> {
    const card = await this.findOne(id, userId)
    Object.assign(card, updateCardDto)
    return this.cardRepository.save(card)
  }

  async remove(id: string, userId: string): Promise<void> {
    const card = await this.findOne(id, userId)
    await this.cardRepository.remove(card)
  }

  /**
   * 根据支付方式字符串寻找或创建卡片
   * 格式示例: "中信银行信用卡(1133)"
   */
  async findOrCreateByPaymentMethod(paymentMethod: string, userId: string): Promise<Card | null> {
    const match = paymentMethod.match(/^(.*?)\((\d{4})\)$/)
    if (!match) {
      return null
    }

    const bankName = match[1].trim()
    const lastFourDigits = match[2].trim()

    let card = await this.cardRepository.findOne({
      where: { bankName, lastFourDigits, userId },
    })

    if (!card) {
      card = await this.create({
        bankName,
        lastFourDigits,
        balance: 0,
        cardType: bankName.includes('信用卡') ? 'credit' : 'debit' as any,
      }, userId)
    }

    return card
  }
}
