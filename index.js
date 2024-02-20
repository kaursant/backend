let express = require('express');
let app = express();
let ejs = require('ejs');
let axios = require('axios');
let cors = require('cors');
app.set('view engine', 'ejs');
app.use(express.static('public'));
let body_parser = require('body-parser');
let cookie_parser = require('cookie-parser');
let session = require('express-session');
let flash = require('connect-flash');
app.use(body_parser.urlencoded({ 'extended': false }));
app.use(body_parser.json())
app.use(flash());
let userController = require('./controller/userController');


app.use(cors({
    origin: '*'
}));


let port = 9009;

const oneday = 1000 * 60 * 60 * 24;
app.use(session({
    secret: "thisismysecretkey",
    saveuninitialized: true,
    cookie: { maxage: oneday },
    resave: false
}));

let address = app.listen(port, function (req, res) {
    console.log('server is connected at port', port)
})


app.post('/contact/add',userController.contact_add)

app.post('/contact/search',userController.search)

app.post('/contact/detail/:_id',userController.contact_detail)

app.post('/contact/update/:_id',userController.contact_update)

app.post('/contact/delete',userController.contact_delete)

app.get('/total/contact', userController.total_contact)
