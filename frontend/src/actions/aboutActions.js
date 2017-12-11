import constants from 'constants'
import history from '../history'

const {
  UPDATE_ABOUT,
  LOAD_ABOUT,
  START,
  SUCCESS,
  FAIL
} = constants

export function updateAbout(data) {
  return (dispatch) => {
    dispatch({
      type: UPDATE_ABOUT + START,
    })
    fetch(`/api/about`, {
      method: 'PUT',
      mode: 'cors',
      body: data
    })
      .then(res=>res.json())
      .then(response => {
        history.push('/throne')
        return dispatch({
          type: UPDATE_ABOUT + SUCCESS,
          payload: {
            response
          }
        })
      })
      .catch(error => {
        dispatch({
          type: UPDATE_ABOUT + FAIL,
          payload: {
            error
          }
        })
      })
  }
}

export function loadAbout(params) {
  return (dispatch) => {
    dispatch({
        type: LOAD_ABOUT + START,
        payload: {}
    })
    
    fetch('/api/about')
      .then(res => {
        if (res.status >= 400) {
          throw new Error(res.statusText)
        }
        return res.json()
      })
      .then(response => dispatch({
        type: LOAD_ABOUT + SUCCESS,
        payload: { response }
      }))
      .catch(error => {
        dispatch({
          type: LOAD_ABOUT + FAIL,
          payload: { error }
        })
      })
  }
}