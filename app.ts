import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import {Logger} from "./src/Logger"
import {Log} from './src/Log'
// @ts-ignore
import dotenv from 'dotenv'

dotenv.config()

const PORT = process.env.PORT;
const app = express();
const logger = new Logger()

app.use(bodyParser());

app.use((error: Error, req: any, res: any, next: () => void) => {
  if (error instanceof SyntaxError) {
    res.status(400).send({ status: 400, errorCode: 'BAD_REQUEST' });
  } else {
    next();
  }
});

app.use(cors());


app.post('/activar', (req, res) => {
  logger.activate()
  res.status(200)
  res.send({
    status: 200,
    message: 'Activado exitosamente'
  })
})

app.post('/desactivar', (req, res) => {
  logger.deactivate()
  res.status(200)
  res.send({
    status: 200,
    message: 'Desactivado exitosamente'
  })
})

app.post('/log', async (req, res) => {
  const type = req.body.type
  const message = req.body.message

  if (!type || !message) {
    res.status(400)
    res.send({
      status: 400,
      message: 'Bad request',
    })
    return
  }

  let log: Log

  try {
    log = new Log(type, message)
  } catch(e) {
    res.status(400)
    res.send({
      status: 400,
      message: e.message,
    })
    return
  }

  try {
    await logger.log(log!)

    res.status(200)
    res.send({
      status: 200,
      message: 'Logeado exitosamente',
    })
  } catch(e) {
    res.status(400)
    res.send({
      status: 400,
      message: e.message,
    })
  }


})


  /*
  ======================================================================================
  */

app.all('*', (req, res) => {
  res.status(404);
  res.send({
    status: 404,
    errorCode: 'RESOURCE_NOT_FOUND',
  });
});

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
