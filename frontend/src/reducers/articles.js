import constants from 'constants'
import {Map, Record, OrderedMap} from 'immutable'
import {arrToImmObj} from '../helpers'

const {
  UPDATE_ARTICLE,
  DELETE_ARTICLE,
  POST_ARTICLE,
  LOAD_ALL_ARTICLES,
  START,
  SUCCESS,
  FAIL
} = constants

const ArticleRecord = Record({
  id: undefined,
  title: undefined,
  coverImage: undefined,
  category: [],
  html: '',
  createdAt: undefined
})

const ReducerState = Record({loading: false, loaded: false, entities: new OrderedMap({})})

const defaultState = new ReducerState()

export default (articlesState = defaultState, action) => {
  const {type, payload} = action
  switch (type) {
    case LOAD_ALL_ARTICLES + START:
      return articlesState.set('loading', true)
  
    case LOAD_ALL_ARTICLES + SUCCESS:
      return articlesState
        .set('entities', arrToImmObj(payload.response, ArticleRecord))
        .set('loading', false)
        .set('loaded', true)

    case POST_ARTICLE + START:
      return articlesState
        .set('loaded', false)
        .set('loading', false)

    case DELETE_ARTICLE + START:
      return articlesState
        .set('loaded', false)
        .set('loading', false)

    case UPDATE_ARTICLE + START:
      return articlesState
        .set('loaded', false)
        .set('loading', false)
  }
  
  return articlesState
}