import {combineReducers} from 'redux';
import skills from './skills'
import works from './works'
import workCategories from './workCategories'

export default combineReducers({
  skills, works, workCategories
});