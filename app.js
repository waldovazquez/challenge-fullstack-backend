const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const cors = require('cors');
const compression = require('compression');

const app = express();
app.use(cors());
app.use(express.json());
app.use(compression());
app.use(helmet());
app.use(cookieParser());

app.disable('x-powered-by');

app.use('/api/carousel', require('./routes/firstCarousel'));
app.use('/api/carousel', require('./routes/secondCarousel'));

app.use(bodyParser.urlencoded({
  extended: false,
}));

app.use(bodyParser.json());

app.get('/', (_req, res) => res.send('Challenge Full Stack Developer Waldo Vázquez'));

const server = app.listen(process.env.PORT || 3500, () => console.info(`Server Connected to port ${process.env.PORT || 3500}`));

process.on('unhandledRejection', (err) => {
  console.info(`An error occurred: ${err.message}`);
  server.close(() => process.exit(1));
});
