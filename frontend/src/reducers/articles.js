import constants from 'constants'
import {Map, Record, OrderedMap} from 'immutable'
import {arrToImmObj} from '../helpers'

const {
  UPDATE_ARTICLE,
  DELETE_ARTICLE,
  POST_ARTICLE,
  LOAD_ARTICLE,
  LOAD_ALL_ARTICLES,
  LOAD_ARTICLES_PAGE,
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

const ReducerState = Record({
  pages: null, 
  loading: false, 
  loaded: false, 
  entities: new OrderedMap({})
})

const defaultState = new ReducerState()

export default (articlesState = defaultState, action) => {
  const {type, payload} = action
  switch (type) {
    case LOAD_ALL_ARTICLES + START:
      return articlesState
        .set('loading', true)
        .set('loaded', false)

    case LOAD_ARTICLE + START:
      return articlesState
        .set('loading', true)
        .set('loaded', false)

    case LOAD_ARTICLES_PAGE + START:
      return articlesState
        .set('loading', true)
        .set('loaded', false)
  
    case LOAD_ALL_ARTICLES + SUCCESS:
      return articlesState
        .set('entities', arrToImmObj(payload.response, ArticleRecord))
        .set('loading', false)
        .set('loaded', true)

    case LOAD_ARTICLE + START:
      return articlesState
        .update('entities', entities => arrToImmObj(payload.response, ArticleRecord).merge(entities))
        .set('loading', false)
        .set('loaded', true)

    case LOAD_ARTICLES_PAGE + SUCCESS:
      return articlesState
        .set('entities', arrToImmObj(payload.response.docs, ArticleRecord))
        .set('pages', payload.response.pages)
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