const mongoose = require('mongoose');
const beautifyUnique = require('mongoose-beautiful-unique-validation');

mongoose.Promise = Promise;
mongoose.plugin(beautifyUnique)
mongoose.plugin(schema => {
  if (!schema.options.toObject) {
    schema.options.toObject = {};
  }
  if (schema.options.toObject.transform == undefined) {
    schema.options.toObject.transform = (doc, ret) => { delete ret.__v; return ret; };
  }
})
mongoose.connect('mongodb://localhost/gloompi-DB', {
  server: {
    socketOptions: {
      keepAlive: 1
    },
    poolSize: 5
  }
})

module.exports = mongoose