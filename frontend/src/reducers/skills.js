import constants from 'constants'
import {Map, Record, OrderedMap} from 'immutable'
import {arrToImmObj} from '../helpers'

const {
  UPDATE_SKILL_ITEM,
  UPDATE_SKILLS_LIST,
  DELETE_SKILL_ITEM,
  DELETE_SKILLS_LIST,
  POST_SKILL_ITEM,
  POST_SKILLS_LIST,
  LOAD_POPULATED_SKILLS,
  LOAD_SKILL,
  LOAD_SKILL_ITEM,
  LOAD_SKILLS_LIST,
  START,
  SUCCESS,
  FAIL
} = constants

const SkillRecord = Record({
  title: undefined,
  coverImage: undefined,
  html: '',
  id: undefined
})

const SkillCategoryRecord = Record({
  name: undefined,
  children : undefined,
  id: undefined
})

const ReducerState = Record({
  loading: false, 
  loaded: false, 
  fail: false,
  categoryLoaded: false,
  current: {},
  populateLoaded: false,
  populated: new OrderedMap({}),
  categories: new OrderedMap({}), 
  entities: new OrderedMap({})})

const defaultState = new ReducerState()

export default (skillsState = defaultState, action) => {
  const {type, payload} = action
  switch (type) {
    case LOAD_SKILL_ITEM + START:
      return skillsState.set('loading', true)
    
    case LOAD_SKILL + SUCCESS:
      return skillsState
        .set('current', payload.response)

    case LOAD_SKILL_ITEM + SUCCESS:
      return skillsState
        .set('entities', arrToImmObj(payload.response, SkillRecord))
        .set('loading', false)
        .set('loaded', true)

    case LOAD_POPULATED_SKILLS + SUCCESS:
      return skillsState
        .set('populated', arrToImmObj(payload.response, SkillCategoryRecord))
        .set('populateLoaded', true)

    case LOAD_SKILLS_LIST + SUCCESS:
      return skillsState
        .set('categories', arrToImmObj(payload.response, SkillCategoryRecord))
        .set('categoryLoaded', true)

    case LOAD_SKILLS_LIST + FAIL:
      return skillsState
        .set('fail', true)
        .set('categoryLoaded', false)

    case POST_SKILL_ITEM + START:
      return skillsState
        .set('loaded', false)
        .set('loading', false)

    case POST_SKILLS_LIST + START:
      return skillsState
        .set('categoryLoaded', false)

    case DELETE_SKILL_ITEM + START:
      return skillsState
        .set('loaded', false)
        .set('loading', false)

    case DELETE_SKILLS_LIST + START:
      return skillsState
        .set('categoryLoaded', false)

    case UPDATE_SKILL_ITEM + START:
      return skillsState
        .set('loaded', false)
        .set('loading', false)
  }
  
  return skillsState
}