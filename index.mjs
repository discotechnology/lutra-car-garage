import express from 'express';
import mysql from 'mysql2/promise';


const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));

//for Express to get values using POST method
app.use(express.urlencoded({extended:true}));

//setting up database connection pool
const pool = mysql.createPool({
    host: "blonze2d5mrbmcgf.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
    user: "v4e3w6yhr383ikbh",
    password: "t18coasub4oc9hn8",
    database: "s7jmctxlgmkxgwx2",
    connectionLimit: 10,
    waitForConnections: true
});

//routes
//root page
app.get('/', (req, res) => {
    res.render('login');
});
app.get('/login', (req, res) => {
  res.render('login');
});

app.post('/login', (req, res) => {
  let username = req.body.username;
  let password = req.body.password;

  console.log(username);
   console.log(password);
   res.render('login');

});

app.get("/signup", (req, res) => {
  res.render('signup');
});




app.get("/dbTest", async(req, res) => {
   try {
        const [rows] = await pool.query(
            "SELECT * FROM q_authors");
        res.send(rows);
    } catch (err) {
        console.error("Database error:", err);
        res.status(500).send("Database error");
    }
});//dbTest

app.listen(3000, ()=>{
    console.log("Express server running")
})