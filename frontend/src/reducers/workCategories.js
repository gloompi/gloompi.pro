import constants from 'constants'
import {Map, Record, OrderedMap} from 'immutable'
import {arrToImmObj} from '../helpers'

const {CATEGORY_PICK, DELETE_WORK_CATEGORY, POST_CATEGORY, LOAD_CATEGORIES, START, SUCCESS, FAIL} = constants

const WorksRecord = Record({
  name: undefined,
  id: undefined
})

const ReducerState = Record({picked: '', 'fail': false, 'loaded': false, entities: new OrderedMap({})})

const defaultState = new ReducerState()

export default(categoryList = defaultState, action) => {
  const {type, payload} = action
  switch (type) {
    case LOAD_CATEGORIES + SUCCESS:
      return categoryList
        .set('entities', arrToImmObj(payload.response, WorksRecord))
        .set('loaded', true)

    case LOAD_CATEGORIES + FAIL:
      return categoryList
        .set('fail', true)
        .set('loaded', false)

    case DELETE_WORK_CATEGORY + START:
      return categoryList
        .set('loaded', false)

    case POST_CATEGORY + START:
      return categoryList
        .set('loaded', false)

    case CATEGORY_PICK:
      return categoryList
        .set('picked', payload.name)
  }

  return categoryList
}