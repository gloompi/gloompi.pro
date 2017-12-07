const mongoose = require('mongoose')
const {
  worksSchema,
  workCategoriesSchema,
  articlesSchema, 
  articleCategoriesSchema,
  aboutSchema, 
  skillsSchema, 
  skillItemSchema
} = require('./schemas')

const Works = exports.Works = mongoose.model('Works', worksSchema)
const WorkCategories = exports.WorkCategories = mongoose.model('WorksCategories', workCategoriesSchema)
const Articles = exports.Articles = mongoose.model('Articles', articlesSchema)
const ArticleCategories = exports.ArticleCategories = mongoose.model('ArticleCategories', articleCategoriesSchema)
const About = exports.About = mongoose.model('About', aboutSchema)
const Skills = exports.Skills = mongoose.model('Skills', skillsSchema)
const SkillItem = exports.SkillItem = mongoose.model('SkillItem', skillItemSchema)