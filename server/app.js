import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';
import './config';
import TransactionRoutes from './routes/TransactionRoutes';
var cron = require('node-cron');

const PORT = process.env.PORT || 2000;
const corsOptions = {
  origin: '*',
  credentials: true,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  preflightContinue: false,
  optionsSuccessStatus: 204
};

const app = express();

app.set('trust proxy', true);
app.use(cors(corsOptions));
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

app.get('/', (req, res) => {
  return res.json({status : "success"})
  // util.setSuccess(200, 'I am alive at this port', PORT );
  // return util.send(res);
  });
  app.use('/api/v1/transactions', TransactionRoutes);
  
  
  app.listen(PORT, () => {
    console.log(`Server running, ${PORT}`);
  });
    
  export default app;
