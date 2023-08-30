import express from 'express'
import bootstarp from './src/index.routes.js'

const app = express()
const port = 3000

bootstarp (app, express);
app.listen(port, () => console.log(`Example app listening on port ${port}!`))