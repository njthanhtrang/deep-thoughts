const mongoose = require('mongoose');

// in production, express.js uses process.env.PORT instead of 3001
// Heroku won't let us use CRA default port of 3000
// don't want to run nodemon or CRA bc neither codebase dynamically changes once deployed
// we only need static Node.js server that serves built/compiled front-end files
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/deep-thoughts', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
});

module.exports = mongoose.connection;
