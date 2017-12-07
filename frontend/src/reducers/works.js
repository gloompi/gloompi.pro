import constants from 'constants'
import {Map, Record, OrderedMap} from 'immutable'
import {arrToImmObj} from '../helpers'

const {UPDATE_WORK, DELETE_WORK, POST_WORK, LOAD_ALL_WORKS, START, SUCCESS, FAIL} = constants

const WorksRecord = Record({
  title: undefined,
  img: undefined,
  category: [],
  images: [],
  tech: [],
  html: '',
  link: undefined,
  bgColor: undefined,
  id: undefined
})

const ReducerState = Record({loading: false, loaded: false, entities: new OrderedMap({})})

const defaultState = new ReducerState()

export default (worksState = defaultState, action) => {
  const {type, payload} = action
  switch (type) {
    case LOAD_ALL_WORKS + START:
      return worksState.set('loading', true)
  
    case LOAD_ALL_WORKS + SUCCESS:
      return worksState
        .set('entities', arrToImmObj(payload.response, WorksRecord))
        .set('loading', false)
        .set('loaded', true)

    case POST_WORK + SUCCESS:
      return worksState
        .set('loaded', false)

    case DELETE_WORK + SUCCESS:
      return worksState
        .set('loaded', false)

    case UPDATE_WORK+ SUCCESS:
      return worksState
        .set('loaded', false)
  }
  
  return worksState
}