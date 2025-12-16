import express from 'express';
import mysql from 'mysql2/promise';
import bcrypt from "bcrypt";
import session from 'express-session';

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

app.set('trust proxy', 1); 
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}))

function isAuthenticated(req, res, next) {
  if (!req.session.authenticated) {
    return res.redirect("/login");
  }
  next();
}


//routes
//root page
app.get('/', (req, res) => {
    res.render('login');
});
app.get('/login', (req, res) => {
  res.render('login');
});

app.post('/login', async (req, res) => {
    try{
       let username = req.body.username;
       let password = req.body.password;

       let sql = `SELECT * FROM user WHERE username = ?`;
       let params = [username];
    
       let [rows] = await pool.query(sql, params);

      if (rows.length === 0) {
      return res.send("Incorrect username or password.");
      }

      let storedHashedPassword = rows[0].password;

      let passwordMatch = await bcrypt.compare(password, storedHashedPassword);

      if (!passwordMatch) {
      return res.send("Incorrect username or password.");
    }

    req.session.authenticated = true;
    req.session.userId = rows[0].user_id;

    res.redirect('/dashboard'); //feel free to rename this route 



    } catch (err) {
    console.error(err);
    res.send("Server error");
  }

});

app.get("/signup", (req, res) => {
  res.render('signup');
});

app.post("/signup", async (req, res) => {
  try {
    let username = req.body.username;
    let email = req.body.email;
    let password = req.body.password;


    let sql = `SELECT * FROM user WHERE username = ?`;
    let params = [username];

    let [rows] = await pool.query(sql, params);

    if (rows.length > 0) {
      return res.send("Sorry, that username already exists!");
    }

    let hashedPassword = await bcrypt.hash(password, 10);

    let sql2 = `
      INSERT INTO user (username, email, password)
      VALUES (?, ?, ?)
    `;

    await pool.query(sql2, [username, email, hashedPassword]);
   
    res.redirect('/login');
    

  } catch (err) {
    console.error(err);
    res.send("Server error");
  }
 
});

app.get('/details', async(req, res) => {
    let car = req.query.car_id;

    let sql = `SELECT * FROM car WHERE car_id = ?`;
    let params = [car];

    let [rows] = await pool.query(sql, params);
    res.render('details', {car: rows});
});



app.get('/dashboard', isAuthenticated, (req, res) => {
    res.send("Dashboard placeholder. User ID = " + req.session.userId);
 
});


app.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/'); //redirect to login page
});




app.get("/dbTest", async(req, res) => {
   try {
        const [rows] = await pool.query("SELECT CURDATE()");
        res.send(rows);
    } catch (err) {
        console.error("Database error:", err);
        res.status(500).send("Database error");
    }
});//dbTest

app.listen(3000, ()=>{
    console.log("Express server running")
})