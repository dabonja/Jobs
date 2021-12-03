const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');
const PORT = process.env.PORT || 3001;
const app = express();
app.use(cors({ origin: true }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/*moji podaci baze podataka*/
const conn = mysql.createConnection({
  host: 'localhost',
  user: 'dabe',
  password:'12345',
  database: 'jobs_db'
});

/*konekcija ka bazi*/
conn.connect((err)=>{
  if(err) throw err;
  console.log('Mysql connected');
});

/*localhost3001/createdb kreira bazu podataka pod nazivom jobs_db*/
app.get('/createdb', (req,res)=>{
  let sql = 'CREATE DATABASE jobs_db';
  conn.query(sql, (err,result)=>{
    if(err) throw err;
    res.send('Database created...')
  })
})

app.get(`/getartisanbyid/:id`, (req, res)=>{
  console.log(req.params.id);
  let sql = `SELECT * FROM artisans WHERE id =${req.params.id}`;
  let query = conn.query(sql, (err, result)=>{
    if(err) throw err;
    console.log(result);
    res.send(result)
  })
})

/*localhost:3001/createposttable*/
app.get('/createartisanstable', (req,res)=>{
  let sql = 'CREATE TABLE artisans(id int AUTO_INCREMENT PRIMARY KEY, fullName VARCHAR(255), profession VARCHAR(255), company VARCHAR(255), contact double, rated double, location VARCHAR(255),image VARCHAR(255))';
  conn.query(sql, (err, result)=>{
    if(err) throw err;
    console.log(result);
    res.send('artisans table created...')
  })
})

/*insertovanje elemenata u tabelu artisans*/
app.post('/addartisans', (req,res)=>{
  let sql = 'INSERT INTO artisans SET ?';
  let query = conn.query(sql, req.body, (err, result)=>{
    if(err) throw err;
    res.send('New artisan added to database.')
  })

})

/*fetchovanje majstora iz baze podataka*/
app.get('/artisans', (req,res)=>{
  let sql = 'SELECT * FROM artisans';
  let query = conn.query(sql, (err,results)=>{
    if(err) throw err;
    let obj = JSON.stringify(results)

    res.send(obj);
  })

})
/*Slanje kategorija poslova na browser*/
app.get('/categories', (req,res)=>{
  let sql = "SELECT * FROM category";
  let query = conn.query(sql, (err,results)=>{
    if(err) throw err;
    let obj = JSON.stringify(results)
    res.send(obj);
  })
})

app.get('/jobs', (req,res)=>{
  let sql = "SELECT companies.companyName, companies.description, companies.location, companies.contact, category.name AS category_name FROM companies INNER JOIN category ON companies.category_id = category.id;";
  let query = conn.query(sql, (err, results)=>{
    if(err) throw err;
    let obj = JSON.stringify(results);
    res.send(obj);
  })
})

app.get('/', (req,res)=>{
  res.send("HEllo there!");
})
/*prikazivanje profesija na option meniju*/
app.get('/api', (req,res)=>{
  let obj = JSON.stringify(objects);
  res.send(obj);
})

app.listen(PORT, ()=>{
  console.log('Server listening on ', PORT);
})
