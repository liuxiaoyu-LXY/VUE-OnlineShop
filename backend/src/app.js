const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
// const session = require('koa-generic-session')
const index = require('./routes/index')
const users = require('./routes/users')
const shop = require('./routes/shop')
const order = require('./routes/order')
const address = require('./routes/address')
const cors  = require('koa2-cors')
// error handler
onerror(app)
app.use(cors({
  origin:'http://localhost:8080',
  // origin:'*',
  credentials:true
}))
// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'pug'
}))
app.keys=['aoojet']
// app.use(session(
//   {cookie:{
//     path:'/',
//     httpOnly:true,
//     maxAge:24*60*60*1000
//   }}
// ))
// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())
app.use(address.routes(), address.allowedMethods())
app.use(shop.routes(), shop.allowedMethods())
app.use(order.routes(), order.allowedMethods())
// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
