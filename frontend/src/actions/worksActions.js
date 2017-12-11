import constants from 'constants'
import history from '../history'

const {
  CATEGORY_PICK,
  UPDATE_WORK,
  DELETE_WORK_CATEGORY,
  DELETE_WORK,
  POST_CATEGORY,
  POST_WORK,
  LOAD_CATEGORIES,
  LOAD_ALL_WORKS,
  LOAD_WORK,
  START,
  SUCCESS,
  FAIL
} = constants

export function pickCategory(name) {
  return (dispatch) => {
    dispatch({
      type: CATEGORY_PICK,
      payload: {
        name
      }
    })
  }
}

export function addWork(data) {
  return (dispatch) => {
    dispatch({
      type: POST_WORK + START,
    })
    fetch('/api/works', {
      method: 'POST',
      mode: 'cors',
      body: data
    })
      .then(res=>res.json())
      .then(response => {
        history.push('/throne/works')
        return dispatch({
          type: POST_WORK + SUCCESS,
          payload: {
            response
          }
        })
      })
      .catch(error => {
        dispatch({
          type: POST_WORK + FAIL,
          payload: {
            error
          }
        })
      })
  }
}

export function updateWork(id, data) {
  return (dispatch) => {
    dispatch({
      type: UPDATE_WORK + START,
    })
    fetch(`/api/works/${id}`, {
      method: 'PUT',
      mode: 'cors',
      body: data
    })
      .then(res=>res.json())
      .then(response => {
        history.push('/throne/works')
        return dispatch({
          type: UPDATE_WORK + SUCCESS,
          payload: {
            response
          }
        })
      })
      .catch(error => {
        dispatch({
          type: UPDATE_WORK + FAIL,
          payload: {
            error
          }
        })
      })
  }
}

export function deleteWork(id) {
  return (dispatch) => {
    dispatch({
      type: DELETE_WORK + START,
    })
    fetch(`/api/works/${id}`, {
      method: 'delete',
      mode: 'cors'
    })
      .then(res=>res.json())
      .then(response => {
        history.push('/throne/works')
        return dispatch({
          type: DELETE_WORK + SUCCESS,
          payload: {
            response
          }
        })
      })
      .catch(error => {
        dispatch({
          type: DELETE_WORK + FAIL,
          payload: {
            error
          }
        })
      })
  }
}

export function loadWork(id) {
  return (dispatch) => {
    dispatch({
        type: LOAD_WORK + START,
        payload: {}
    })
    
    fetch(`/api/works/${id}`)
      .then(res => {
        if (res.status >= 400) {
          throw new Error(res.statusText)
        }
        return res.json()
      })
      .then(response => dispatch({
        type: LOAD_WORK + SUCCESS,
        payload: { response }
      }))
      .catch(error => {
        dispatch({
          type: LOAD_WORK + FAIL,
          payload: { error }
        })
      })
  }
}

export function loadAllWorks(params) {
  return (dispatch) => {
    dispatch({
        type: LOAD_ALL_WORKS + START,
        payload: {}
    })
    
    fetch('/api/works')
      .then(res => {
        if (res.status >= 400) {
          throw new Error(res.statusText)
        }
        return res.json()
      })
      .then(response => dispatch({
        type: LOAD_ALL_WORKS + SUCCESS,
        payload: { response }
      }))
      .catch(error => {
        dispatch({
          type: LOAD_ALL_WORKS + FAIL,
          payload: { error }
        })
      })
  }
}

export function addCategory(data) {
  return (dispatch) => {
    dispatch({
      type: POST_CATEGORY + START
    })
    fetch('/api/works-category', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify(data)
    })
      .then(res=>res.json())
      .then(response => {
        return dispatch({
          type: POST_CATEGORY + SUCCESS,
          payload: {
            response
          }
        })
      })
      .catch(error => {
        dispatch({
          type: POST_CATEGORY + FAIL,
          payload: {
            error
          }
        })
      })
  }
}

export function deleteWorkCategory(id) {
  return (dispatch) => {
    dispatch({
      type: DELETE_WORK_CATEGORY + START
    })
    fetch(`/api/works-category/${id}`, {
      method: 'delete',
      mode: 'cors'
    })
      .then(res=>res.json())
      .then(response => {
        return dispatch({
          type: DELETE_WORK_CATEGORY + SUCCESS,
          payload: {
            response
          }
        })
      })
      .catch(error => {
        dispatch({
          type: DELETE_WORK_CATEGORY + FAIL,
          payload: {
            error
          }
        })
      })
  }
}

export function loadCategories(params) {
  return (dispatch) => {
    fetch('/api/works-category')
      .then(res => {
        if (res.status >= 400) {
          throw new Error(res.statusText)
        }
        return res.json()
      })
      .then(response => dispatch({
        type: LOAD_CATEGORIES + SUCCESS,
        payload: { response }
      }))
      .catch(error => {
        dispatch({
          type: LOAD_CATEGORIES + FAIL,
          payload: { error }
        })
      })
  }
}