import cookieParser from 'cookie-parser';
import express, { Application } from 'express'
import cors from 'cors'
import hbs from 'hbs'

const app: Application = express()

app.set('view engine', 'hbs')
app.use(cors())
app.use('/public', express.static('public'))
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cookieParser(process.env.KEY))

function bootstrap(callback: Function): void{
  app.listen(process.env.PORT, () => {
    callback(process.env.PORT)
  })
}

export { app, bootstrap, hbs }