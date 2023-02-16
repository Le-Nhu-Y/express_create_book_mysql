const mysql = require('mysql');
const express=require('express');
const bodyParser=require('body-parser');

const app = express();
const PORT=3000;

const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '123456',
    database: 'book_manager',
    charset: 'utf8_general_ci'
});
connection.connect(function (err){
    if(err){
        throw err.stack;
    }else{
        console.log(`connect database successfuly`)
    }
});


app.use(bodyParser.urlencoded({ extended:false}));
app.use(bodyParser.json());

app.set('view engine','ejs');
app.set('views','./src/views');


app.get('/books/create',(req, res)=>{
    res.render('create')
})
app.post('/books/create',(req, res)=>{
    const{name,price,status,author}=req.body;

    console.log(req.body);
    const sqlInsert='INSERT INTO books(name,price,status,author)VALUE ?'
    const value = [
        [name,price,status,author]
    ];
    connection.query(sqlInsert,[value],function (err,result) {
        if(err) throw err;
        res.end('success');
    });
});


app.listen(PORT,()=>{
    console.log(`Server running on port: `+PORT);
});





