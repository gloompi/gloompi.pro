import {createSelector} from 'reselect'
import {ObjToImmArr} from '../helpers'

const listGetter = state => state.works.entities
const categoryGetter = state => state.workCategories.picked

export const filtratedItems = createSelector(listGetter, categoryGetter, (list, category) => {
  return ObjToImmArr(list).filter(item => {
    if(!category.length) return true
    if(item.category && item.category.length !== 0){
      let toShow = false
      item.category.map(itemCat => {
        if(itemCat == category) {
          toShow = true
        }
      })
      return toShow
    }
  })
})