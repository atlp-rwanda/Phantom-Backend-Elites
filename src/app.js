// import express from 'express'
// import i18n from 'i18n'
const express = require('express')
// const i18n = require('i18n-express')
const i18 = require('i18n')
const path = require('path')
var i18next = require('i18next')
var middleware = require("i18next-express-middleware");
const i18n = require('./shared/i18n');
var app = express()

// i18.configure({
//     defaultLocale: 'en',
//     // directory: 'i18n/locales',
//     api: {
//       __: 'translate',
//       __n: 'translateN',
//     },
// });
app.use(i18n);

// i18next.use(middleware.LanguageDetector).init({
//     preload: ["en", "de", "it"]
//   });
// app.use(
//     middleware.handle(i18next, {
//       ignoreRoutes: ["/foo"], // or function(req, res, options, i18next) { /* return true to ignore */ }
//       removeLngFromUrl: false
//     })
//   );


const port = process.env.PORT || 1111;

app.use('/home',(req, res, next)=>{
    res.send('hello world')
})
app.listen(port, ()=>{
    console.log(`Connected : ${port} port`)
})

