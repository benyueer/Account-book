import { Base_Type } from "../service/graphql/generated/models";
import { Category } from "../store/modules/system";
import { arrToTree } from "./utils";

export const buildCategoryTree = (categorys: Category[]) => {
  const inCategorys: Category[] = []
  const outCategorys: Category[] = []

  for (let i = 0; i < categorys.length; i++) {
    if (categorys[i].baseType === Base_Type.In) {
      inCategorys.push(categorys[i])
    } else {
      outCategorys.push(categorys[i])
    }
  }
  const categoryIn = arrToTree<Category>(inCategorys, 'pid')
  const categoryOut = arrToTree<Category>(outCategorys, 'pid')

  return {
    categoryIn,
    categoryOut
  }
}

export function findTreeNodeById(tree: Category[], id: number) {
  for (let i = 0; i < tree.length; i++) {
    const fatherNode = tree[i]
    for (let j = 0; j < fatherNode.children.length; j++) {
      if (fatherNode.children[j].id === id) {
        return [fatherNode, fatherNode.children[j]]
      }
    }
  }
  return []
}
