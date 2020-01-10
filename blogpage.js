const express =  require('express')
const app = express()
const path = require('path')
const mustacheExpress = require ('mustache-express')

const VIEWS_PATH = path.join(__dirname,'/views')

app.use(express.static(path.join(__dirname, '/public')))

app.engine('mustache',mustacheExpress(VIEWS_PATH + '/partials','.mustache'))

app.set('views',VIEWS_PATH)

app.set('view engine','mustache')

app.get('/blogpage',(req,res)=>{
  res.render('blogpage')
})

app.listen(3000,()=>{
  console.log("Server is running")
})