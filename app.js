const { error } = require ('console')
const express = require("express");
const exphbs = require("express-handlebars");
const path = require('path')
const dotenv = require ('dotenv')
const cookieParser = require ('cookie-parser')
const pool = require ('./settings/dataBase')


const app = express();

app.set('port', process.env.PORT|| 4000 );
app.listen (app.get('port'), ()=>{
    console.log('server en puerto', app.get('port'));
})

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.engine(".hbs",exphbs({
    defaultLayouts: 'main',
    layoutsDir: path.join(app.get('views'),'layouts'),
    partialsDir: path.join(app.get('views'),'partials'),
    extname:'.hbs'
}));
app.set("view engine",".hbs");

const publicDirectori = path.join(__dirname,'./public')
app.use(express.static(publicDirectori))

app.use(cookieParser())

//routes
app.use('/',require('./routes/pages'))
app.use('/auth', require ('./routes/auth'))

