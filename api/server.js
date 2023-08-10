const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const config = require('./config');
const hassService = require('./services/homeassistant')
const openaiService = require('./services/openai')
const logging = require('./logging');
var passport = require('passport')
var session = require('express-session')
var models = require("./models");

const app = express();
const logger = logging.getLogger()

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport/passport.js')(passport, models.user);

models.sequelize.sync()
  .then(function () {
    console.log('Nice! Database looks fine')
  }).catch(function (err) {
    console.log(err, "Something went wrong with the Database Update!")
  });

app.use((req, res, next) => {
  logger.info(`${req.method} ${req.originalUrl}`);
  next();
});

app.post('/update', async (req, res) => {
  try {
    const devices = await hassService.updateCurrentState()
    openaiService.updateDevicesMessage(devices)
    return res.json({ message: 'updated successfully' });
  }
  catch (err) {
    logger.error('error: error in chat request');
    logger.error(err);
    return res.status(500).json({ message: 'error in request' })
  }
});

app.post('/chat', async (req, res) => {
  try {
    const message = req.body.message;
    logger.info(`body: ${req.body}`)

    if (!message) {
      logger.error(`error: body does not contain 'message'`)
      return res.status(400).json({ message: 'body must contain \'message\'' });
    }

    const chatRes = await openaiService.getChatCompletion(message)
    const parsed = await openaiService.parseCompletion(chatRes.data)

    hassService.updateEntityStateFromContent(parsed)

    return res.json({ message: 'updated state successfully' })
  }
  catch (err) {
    logger.error('error: error in chat request');
    logger.error(err);
    return res.status(500).json({ message: 'unable to update the request' })
  }
})

require('./routes/auth')(app,passport);

app.listen(config.PORT, async () => {
  console.log(`Server is up on port: ${config.PORT}`);
});
