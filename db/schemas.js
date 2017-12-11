const mongoose = require('mongoose');
const {Schema} = mongoose;

const worksSchema = exports.worksSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  img: {
    type: String,
    required: true,
    unique: true
  },
  category: {
    type: Array
  },
  images: {
    type: Array
  },
  tech: {
    type: Array,
    required: true
  },
  html: {
    type: String
  },
  link: {
    type: String
  },
  bgColor: {
    type: String
  }
}, {
  toJSON: {
    virtuals: true
  },
  toObject: {
    virtuals: true 
  },
  timestamps :true
});

const workCategoriesSchema = exports.workCategoriesSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  }
}, {
  toJSON: {
    virtuals: true
  },
  toObject: {
    virtuals: true 
  },
  timestamps :true
});

const articlesSchema = exports.articlesSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  coverImage: {
    type: String
  },
  category: {
    type: Array
  },
  html: {
    type: String
  },
}, {
  toJSON: {
    virtuals: true
  },
  toObject: {
    virtuals: true 
  },
  timestamps :true
});

const articleCategoriesSchema = exports.articleCategoriesSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  }
}, {
  toJSON: {
    virtuals: true
  },
  toObject: {
    virtuals: true 
  },
  timestamps :true
})

const aboutSchema = exports.aboutSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  coverImage: {
    type: String,
    unique: true,
    required: true
  },
  html: {
    type: String
  }
}, {
  toJSON: {
    virtuals: true
  },
  toObject: {
    virtuals: true 
  },
  timestamps :true
});

const skillsSchema = exports.skillsSchema = new Schema({
  name: {
    type: String,
    required: true
  }
}, {
  toJSON: {
    virtuals: true
  },
  toObject: {
    virtuals: true 
  },
  timestamps :true
});

const skillItemSchema = exports.skillItemSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  knowledge: {
    type: Number,
    required: true
  },
  parent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Skills',
    required: true
  }
}, {
  toJSON: {
    virtuals: true
  },
  toObject: {
    virtuals: true 
  },
  timestamps :true
});

worksSchema.statics.publicFields = ['title', 'img', 'category', 'images', 'tech', 'html', 'link', 'bgColor']
articlesSchema.statics.publicFields = ['title', 'coverImage', 'category', 'html']
aboutSchema.statics.publicFields = ['title', 'coverImage', 'html']
skillsSchema.statics.publicFields = ['name', 'children']
skillItemSchema.statics.publicFields = ['title', 'knowledge', 'parent']
skillsSchema.virtual('children', {
  ref: 'SkillItem', 
  localField: '_id',
  foreignField: 'parent'
});