import {combineReducers} from 'redux';
import skills from './skills'
import works from './works'
import workCategories from './workCategories'
import articles from './articles'
import articleCategory from './articleCategory'
import about from './about'

export default combineReducers({
  skills, works, workCategories, articles, articleCategory, about
});