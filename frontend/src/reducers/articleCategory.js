import constants from 'constants'
import {Map, Record, OrderedMap} from 'immutable'
import {arrToImmObj} from '../helpers'

const {
  DELETE_ARTICLE_CATEGORY,
  POST_ARTICLE_CATEGORY,
  LOAD_ARTICLE_CATEGORIES,
  START,
  SUCCESS,
  FAIL
} = constants

const ArticleRecord = Record({
  name: undefined,
  id: undefined
})

const ReducerState = Record({'fail': false, 'loaded': false, entities: new OrderedMap({})})

const defaultState = new ReducerState()

export default (articleCategoryList = defaultState, action) => {
  const {type, payload} = action
  switch (type) {
    case LOAD_ARTICLE_CATEGORIES + SUCCESS:
      return articleCategoryList
        .set('entities', arrToImmObj(payload.response, ArticleRecord))
        .set('loaded', true)

    case LOAD_ARTICLE_CATEGORIES + FAIL:
      return articleCategoryList
        .set('fail', true)
        .set('loaded', false)

    case DELETE_ARTICLE_CATEGORY + START:
      return articleCategoryList
        .set('loaded', false)

    case POST_ARTICLE_CATEGORY + START:
      return articleCategoryList
        .set('loaded', false)
  }

  return articleCategoryList
}