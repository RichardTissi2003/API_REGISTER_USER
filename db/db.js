const mongoose = require('mongoose')

mongoose.conect('mongodb+srv://richardtissi:12052003R@cluster0.hkwo6x0.mongodb.net/').then(()=>{
    console.log('conectado ao banco')
}).cath(()=>{
    console.log('erro ao se conecat ao banco')
})

module.exports = mongoose