 const mongoose = require('mongoose')
 const url = 'mongodb://localhost:27017'
 const dbName = 'testdb'

//  mongoose.set('useCreateIndex',true)
//  mongoose.set('useCreateIndex', true);
//  mongoose.set('useFindAndModify',false)

 mongoose.connect(`${url}/${dbName}`,{
     useNewUrlParser:true,
     useUnifiedTopology:true
 })

 const db = mongoose.connection

 db.on('error',err=>{
     console.log('mongoose error',err)
 })

 db.once('open',()=>{
     console.log('success')
     
 })
 module.exports = mongoose