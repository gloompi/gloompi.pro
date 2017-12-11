import constants from 'constants'
import history from '../history'

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

export function addSkill(data) {
  return (dispatch) => {
    dispatch({
      type: POST_SKILL_ITEM + START,
    })
    fetch('/api/skill-item', {
      method: 'POST',
      mode: 'cors',
      body: data
    })
      .then(res=>res.json())
      .then(response => {
        history.push('/throne/skills')
        return dispatch({
          type: POST_SKILL_ITEM + SUCCESS,
          payload: {
            response
          }
        })
      })
      .catch(error => {
        dispatch({
          type: POST_SKILL_ITEM + FAIL,
          payload: {
            error
          }
        })
      })
  }
}

export function updateSkill(id, data) {
  return (dispatch) => {
    dispatch({
      type: UPDATE_SKILL_ITEM + START,
    })
    fetch(`/api/skill-item/${id}`, {
      method: 'PUT',
      mode: 'cors',
      body: data
    })
      .then(res=>res.json())
      .then(response => {
        history.push('/throne/skills')
        return dispatch({
          type: UPDATE_SKILL_ITEM + SUCCESS,
          payload: {
            response
          }
        })
      })
      .catch(error => {
        dispatch({
          type: UPDATE_SKILL_ITEM + FAIL,
          payload: {
            error
          }
        })
      })
  }
}

export function deleteSkill(id) {
  return (dispatch) => {
    dispatch({
      type: DELETE_SKILL_ITEM + START,
    })
    fetch(`/api/skill-item/${id}`, {
      method: 'delete',
      mode: 'cors'
    })
      .then(res=>res.json())
      .then(response => {
        history.push('/throne/skills')
        return dispatch({
          type: DELETE_SKILL_ITEM + SUCCESS,
          payload: {
            response
          }
        })
      })
      .catch(error => {
        dispatch({
          type: DELETE_SKILL_ITEM + FAIL,
          payload: {
            error
          }
        })
      })
  }
}

export function loadAllSkills(params) {
  return (dispatch) => {
    dispatch({
        type: LOAD_SKILL_ITEM + START,
        payload: {}
    })
    
    fetch('/api/skill-item')
      .then(res => {
        if (res.status >= 400) {
          throw new Error(res.statusText)
        }
        return res.json()
      })
      .then(response => dispatch({
        type: LOAD_SKILL_ITEM + SUCCESS,
        payload: { response }
      }))
      .catch(error => {
        dispatch({
          type: LOAD_SKILL_ITEM + FAIL,
          payload: { error }
        })
      })
  }
}

export function loadSkill(id) {
  return (dispatch) => {
    dispatch({
        type: LOAD_SKILL + START,
        payload: {}
    })
    
    fetch(`/api/skill-item/${id}`)
      .then(res => {
        if (res.status >= 400) {
          throw new Error(res.statusText)
        }
        return res.json()
      })
      .then(response => dispatch({
        type: LOAD_SKILL + SUCCESS,
        payload: { response }
      }))
      .catch(error => {
        dispatch({
          type: LOAD_SKILL + FAIL,
          payload: { error }
        })
      })
  }
}

export function addSkillCategory(data) {
  return (dispatch) => {
    dispatch({
      type: POST_SKILLS_LIST + START
    })
    fetch('/api/skills', {
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
          type: POST_SKILLS_LIST + SUCCESS,
          payload: {
            response
          }
        })
      })
      .catch(error => {
        dispatch({
          type: POST_SKILLS_LIST + FAIL,
          payload: {
            error
          }
        })
      })
  }
}

export function deleteSkillCategory(id) {
  return (dispatch) => {
    dispatch({
      type: DELETE_SKILLS_LIST + START
    })
    fetch(`/api/skills/${id}`, {
      method: 'delete',
      mode: 'cors'
    })
      .then(res=>res.json())
      .then(response => {
        return dispatch({
          type: DELETE_SKILLS_LIST + SUCCESS,
          payload: {
            response
          }
        })
      })
      .catch(error => {
        dispatch({
          type: DELETE_SKILLS_LIST + FAIL,
          payload: {
            error
          }
        })
      })
  }
}

export function loadSkillCategories(params) {
  return (dispatch) => {
    fetch('/api/skills')
      .then(res => {
        if (res.status >= 400) {
          throw new Error(res.statusText)
        }
        return res.json()
      })
      .then(response => dispatch({
        type: LOAD_SKILLS_LIST + SUCCESS,
        payload: { response }
      }))
      .catch(error => {
        dispatch({
          type: LOAD_SKILLS_LIST + FAIL,
          payload: { error }
        })
      })
  }
}

export function loadPopulatedSkills(params) {
  return (dispatch) => {
    fetch('/api/skills-populated')
      .then(res => {
        if (res.status >= 400) {
          throw new Error(res.statusText)
        }
        return res.json()
      })
      .then(response => dispatch({
        type: LOAD_POPULATED_SKILLS + SUCCESS,
        payload: { response }
      }))
      .catch(error => {
        dispatch({
          type: LOAD_POPULATED_SKILLS + FAIL,
          payload: { error }
        })
      })
  }
}