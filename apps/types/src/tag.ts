export interface Tag {
  id: string
  name: string
  userId: string
  createdAt: string | Date
  updatedAt: string | Date
}

export type CreateTagDto = Pick<Tag, 'name'>
