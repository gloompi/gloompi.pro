import constants from 'constants'
import {Map, Record, OrderedMap} from 'immutable'
import {arrToImmObj} from '../helpers'

const {
  UPDATE_ABOUT,
  LOAD_ABOUT,
  START,
  SUCCESS,
  FAIL
} = constants

const AboutRecord = Record({
  id: undefined,
  title: undefined,
  coverImage: undefined,
  html: '',
})

const ReducerState = Record({loading: false, loaded: false, entities: new OrderedMap({})})

const defaultState = new ReducerState()

export default (aboutState = defaultState, action) => {
  const {type, payload} = action
  switch (type) {
    case LOAD_ABOUT + START:
      return aboutState.set('loading', true)
  
    case LOAD_ABOUT + SUCCESS:
      return aboutState
        .set('entities', new AboutRecord(payload.response))
        .set('loading', false)
        .set('loaded', true)

    case UPDATE_ABOUT + START:
      return aboutState
        .set('loaded', false)
        .set('loading', false)
  }
  
  return aboutState
}