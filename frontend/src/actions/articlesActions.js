import constants from 'constants'
import history from '../history'

const {
  UPDATE_ARTICLE,
  DELETE_ARTICLE_CATEGORY,
  DELETE_ARTICLE,
  POST_ARTICLE_CATEGORY,
  POST_ARTICLE,
  LOAD_ARTICLES_PAGE,
  LOAD_ARTICLE_CATEGORIES,
  LOAD_ALL_ARTICLES,
  LOAD_ARTICLE,
  START,
  SUCCESS,
  FAIL
} = constants

export function addArticle(data) {
  return (dispatch) => {
    dispatch({
      type: POST_ARTICLE + START,
    })
    fetch('/api/articles', {
      method: 'POST',
      mode: 'cors',
      body: data
    })
      .then(res=>res.json())
      .then(response => {
        history.push('/throne/blog')
        return dispatch({
          type: POST_ARTICLE + SUCCESS,
          payload: {
            response
          }
        })
      })
      .catch(error => {
        dispatch({
          type: POST_ARTICLE + FAIL,
          payload: {
            error
          }
        })
      })
  }
}

export function updateArticle(id, data) {
  return (dispatch) => {
    dispatch({
      type: UPDATE_ARTICLE + START,
    })
    fetch(`/api/articles/${id}`, {
      method: 'PUT',
      mode: 'cors',
      body: data
    })
      .then(res=>res.json())
      .then(response => {
        history.push('/throne/blog')
        return dispatch({
          type: UPDATE_ARTICLE + SUCCESS,
          payload: {
            response
          }
        })
      })
      .catch(error => {
        dispatch({
          type: UPDATE_ARTICLE + FAIL,
          payload: {
            error
          }
        })
      })
  }
}

export function deleteArticle(id) {
  return (dispatch) => {
    dispatch({
      type: DELETE_ARTICLE + START,
    })
    fetch(`/api/articles/${id}`, {
      method: 'delete',
      mode: 'cors'
    })
      .then(res=>res.json())
      .then(response => {
        history.push('/throne/blog')
        return dispatch({
          type: DELETE_ARTICLE + SUCCESS,
          payload: {
            response
          }
        })
      })
      .catch(error => {
        dispatch({
          type: DELETE_ARTICLE + FAIL,
          payload: {
            error
          }
        })
      })
  }
}

export function loadArticle(id) {
  return (dispatch) => {
    dispatch({
        type: LOAD_ARTICLE + START,
        payload: {}
    })
    
    fetch(`/api/articles/${id}`)
      .then(res => {
        if (res.status >= 400) {
          throw new Error(res.statusText)
        }
        return res.json()
      })
      .then(response => dispatch({
        type: LOAD_ARTICLE + SUCCESS,
        payload: { response }
      }))
      .catch(error => {
        dispatch({
          type: LOAD_ARTICLE + FAIL,
          payload: { error }
        })
      })
  }
}

export function loadArticleByCategory(category, page = 1) {
  return (dispatch) => {
    dispatch({
        type: LOAD_ARTICLES_PAGE + START,
        payload: {}
    })
    
    fetch(`/api/articles/category/${page}/${category}`)
      .then(res => {
        if (res.status >= 400) {
          throw new Error(res.statusText)
        }
        return res.json()
      })
      .then(response => {
        dispatch({
          type: LOAD_ARTICLES_PAGE + SUCCESS,
          payload: { response }
        })
      })
      .catch(error => {
        dispatch({
          type: LOAD_ARTICLES_PAGE + FAIL,
          payload: { error }
        })
      })
  }
}

export function loadArticlesPage(page = 1) {
  return (dispatch) => {
    dispatch({
        type: LOAD_ARTICLES_PAGE + START,
        payload: {}
    })
    
    fetch(`/api/articles/page/${page}`)
      .then(res => {
        if (res.status >= 400) {
          throw new Error(res.statusText)
        }
        return res.json()
      })
      .then(response => {
        dispatch({
          type: LOAD_ARTICLES_PAGE + SUCCESS,
          payload: { response }
        })
      })
      .catch(error => {
        dispatch({
          type: LOAD_ARTICLES_PAGE + FAIL,
          payload: { error }
        })
      })
  }
}

export function loadAllArticles(params) {
  return (dispatch) => {
    dispatch({
        type: LOAD_ALL_ARTICLES + START,
        payload: {}
    })
    
    fetch('/api/articles')
      .then(res => {
        if (res.status >= 400) {
          throw new Error(res.statusText)
        }
        return res.json()
      })
      .then(response => dispatch({
        type: LOAD_ALL_ARTICLES + SUCCESS,
        payload: { response }
      }))
      .catch(error => {
        dispatch({
          type: LOAD_ALL_ARTICLES + FAIL,
          payload: { error }
        })
      })
  }
}

export function addArticleCategory(data) {
  return (dispatch) => {
    dispatch({
      type: POST_ARTICLE_CATEGORY + START
    })
    fetch('/api/article-category', {
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
          type: POST_ARTICLE_CATEGORY + SUCCESS,
          payload: {
            response
          }
        })
      })
      .catch(error => {
        dispatch({
          type: POST_ARTICLE_CATEGORY + FAIL,
          payload: {
            error
          }
        })
      })
  }
}

export function deleteArticleCategory(id) {
  return (dispatch) => {
    dispatch({
      type: DELETE_ARTICLE_CATEGORY + START
    })
    fetch(`/api/article-category/${id}`, {
      method: 'delete',
      mode: 'cors'
    })
      .then(res=>res.json())
      .then(response => {
        return dispatch({
          type: DELETE_ARTICLE_CATEGORY + SUCCESS,
          payload: {
            response
          }
        })
      })
      .catch(error => {
        dispatch({
          type: DELETE_ARTICLE_CATEGORY + FAIL,
          payload: {
            error
          }
        })
      })
  }
}

export function loadArticleCategories(params) {
  return (dispatch) => {
    fetch('/api/article-category')
      .then(res => {
        if (res.status >= 400) {
          throw new Error(res.statusText)
        }
        return res.json()
      })
      .then(response => dispatch({
        type: LOAD_ARTICLE_CATEGORIES + SUCCESS,
        payload: { response }
      }))
      .catch(error => {
        dispatch({
          type: LOAD_ARTICLE_CATEGORIES + FAIL,
          payload: { error }
        })
      })
  }
}