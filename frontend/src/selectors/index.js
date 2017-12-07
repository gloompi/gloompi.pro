import {createSelector} from 'reselect'
import {ObjToImmArr} from '../helpers'

const worksGetter = state => ObjToImmArr(state.works.entities)
const categoryGetter = state => ObjToImmArr(state.workCategories.entities)

export const filtratedItems = createSelector(worksGetter, categoryGetter, (works, category) => {
  return works.filter(work => {
    if(work.category && work.category.length !== 0){
      console.log(work.category, category)
    }

    return work
  })
})