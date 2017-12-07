if (process.env.TRACE) {
  require('./libs/trace')
};

const {app} = require('./app');
const config = require('config');
const path = require('path');

app.listen(config.get('port'));
