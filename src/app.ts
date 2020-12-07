import bodyParser from 'body-parser';
import cors from 'cors';
import express, { Application } from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import index from './routes/index';

const app: Application = express();

app.use(cors());
app.use(helmet());
app.use(morgan(process.env.NODE_ENV === 'production' ? 'common' : 'dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/', index);

// Application listener
app.listen(process.env.PORT, () => {
  console.log(`Server is now listening on port ${process.env.PORT}`);
});
