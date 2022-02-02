const express = require('express');
const { join } = require("path");
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');
const { resolveObjectURL } = require('buffer');
const PORT = process.env.PORT || 3001;
const app = express();

app.use(cors({ origin: true }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(join(__dirname, "public")));

/*moji podaci baze podataka*/
const conn = mysql.createConnection({
  host: 'localhost',
  user: 'dabe',
  password:'12345',
  database: 'jobs_db'
});

app.get("/auth_config.json", (req, res) => {
  res.sendFile(join(__dirname, "../auth_config.json"));
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

/*
  rating majstora
*/
app.post('/setArtisanRating',(req,res)=>{
  console.log(req.body);

 
  let sql = 'INSERT INTO artisans_rating SET ?';
  let query = conn.query(sql, req.body, (err,result)=>{
    if(err) throw err;
    res.send(result)
  })

})
//SELECT artisans.id, artisans.fullName, artisans.contact, artisans.company, artisans.location, artisans.profession,artisans_rating.rating as rated FROM artisans LEFT JOIN artisans_rating ON artisans.id = artisans_rating.artisan_id 
  //SELECT artisans.id, artisans.fullName, artisans.contact, artisans.company, artisans.location, artisans.profession,AVG( artisans_rating.rating) as rated FROM artisans LEFT JOIN artisans_rating ON artisans.id = artisans_rating.artisan_id GROUP BY fullName
/*fetchovanje majstora iz baze podataka*/
app.get('/artisans', (req,res)=>{
  let sql = 'SELECT artisans.id, artisans.fullName, artisans.contact, artisans.company, artisans.location, artisans.profession,artisans_rating.rating as rated FROM artisans LEFT JOIN artisans_rating ON artisans.id = artisans_rating.artisan_id ';
  let query = conn.query(sql, (err,results)=>{
    if(err) throw err;
    let obj = JSON.stringify(results)
    console.log(obj);
    res.send(obj);
  })

})
/*
  Dobavljanje komentara i rejtinga majstora
*/ 
app.get(`/getcommentsandratings/:id`, (req, res)=>{
  console.log(req.params.id);
  let sql = `SELECT * FROM artisans_rating WHERE artisan_id =${req.params.id}`;
  let query = conn.query(sql, (err, result)=>{
    if(err) throw err;
    let obj = JSON.stringify(result)
    res.send(obj)
  })
})

/*Slanje kategorija poslova na browser*/
app.get('/categories', (req,res)=>{
  let sql = "SELECT * FROM category";
  let query = conn.query(sql, (err,results)=>{
    if(err) throw err;
    let obj = JSON.stringify(results)
   
    res.send([obj]);
  })
})

app.get('/jobs', (req,res)=>{
  let sql = "SELECT companies.company_name, companies.description, companies.location, companies.contact, category.name AS category_name FROM companies INNER JOIN category ON companies.category_id = category.id;";
  let query = conn.query(sql, (err, results)=>{
    if(err) throw err;
    let obj = JSON.stringify(results);
    res.send(obj);
  })
})

/*


var axios = require("axios").default;

var options = {
  method: 'GET',
  url: 'https://dev-lwkc3tvc.eu.auth0.com/userinfo',
  headers: {authorization: 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IklTWl9YN3VINlJKSHFDZTgwV25zUSJ9.eyJpc3MiOiJodHRwczovL2Rldi1sd2tjM3R2Yy5ldS5hdXRoMC5jb20vIiwic3ViIjoiWlpBcVhQdXlreGVrVGhHdnhTS2g0UDUxTDY3TUNvTWlAY2xpZW50cyIsImF1ZCI6Imh0dHBzOi8vZGV2LWx3a2MzdHZjLmV1LmF1dGgwLmNvbS9hcGkvdjIvIiwiaWF0IjoxNjM4ODg1MDUxLCJleHAiOjE2Mzg5NzE0NTEsImF6cCI6IlpaQXFYUHV5a3hla1RoR3Z4U0toNFA1MUw2N01Db01pIiwic2NvcGUiOiJyZWFkOmNsaWVudF9ncmFudHMgY3JlYXRlOmNsaWVudF9ncmFudHMgZGVsZXRlOmNsaWVudF9ncmFudHMgdXBkYXRlOmNsaWVudF9ncmFudHMgcmVhZDp1c2VycyB1cGRhdGU6dXNlcnMgZGVsZXRlOnVzZXJzIGNyZWF0ZTp1c2VycyByZWFkOnVzZXJzX2FwcF9tZXRhZGF0YSB1cGRhdGU6dXNlcnNfYXBwX21ldGFkYXRhIGRlbGV0ZTp1c2Vyc19hcHBfbWV0YWRhdGEgY3JlYXRlOnVzZXJzX2FwcF9tZXRhZGF0YSByZWFkOnVzZXJfY3VzdG9tX2Jsb2NrcyBjcmVhdGU6dXNlcl9jdXN0b21fYmxvY2tzIGRlbGV0ZTp1c2VyX2N1c3RvbV9ibG9ja3MgY3JlYXRlOnVzZXJfdGlja2V0cyByZWFkOmNsaWVudHMgdXBkYXRlOmNsaWVudHMgZGVsZXRlOmNsaWVudHMgY3JlYXRlOmNsaWVudHMgcmVhZDpjbGllbnRfa2V5cyB1cGRhdGU6Y2xpZW50X2tleXMgZGVsZXRlOmNsaWVudF9rZXlzIGNyZWF0ZTpjbGllbnRfa2V5cyByZWFkOmNvbm5lY3Rpb25zIHVwZGF0ZTpjb25uZWN0aW9ucyBkZWxldGU6Y29ubmVjdGlvbnMgY3JlYXRlOmNvbm5lY3Rpb25zIHJlYWQ6cmVzb3VyY2Vfc2VydmVycyB1cGRhdGU6cmVzb3VyY2Vfc2VydmVycyBkZWxldGU6cmVzb3VyY2Vfc2VydmVycyBjcmVhdGU6cmVzb3VyY2Vfc2VydmVycyByZWFkOmRldmljZV9jcmVkZW50aWFscyB1cGRhdGU6ZGV2aWNlX2NyZWRlbnRpYWxzIGRlbGV0ZTpkZXZpY2VfY3JlZGVudGlhbHMgY3JlYXRlOmRldmljZV9jcmVkZW50aWFscyByZWFkOnJ1bGVzIHVwZGF0ZTpydWxlcyBkZWxldGU6cnVsZXMgY3JlYXRlOnJ1bGVzIHJlYWQ6cnVsZXNfY29uZmlncyB1cGRhdGU6cnVsZXNfY29uZmlncyBkZWxldGU6cnVsZXNfY29uZmlncyByZWFkOmhvb2tzIHVwZGF0ZTpob29rcyBkZWxldGU6aG9va3MgY3JlYXRlOmhvb2tzIHJlYWQ6YWN0aW9ucyB1cGRhdGU6YWN0aW9ucyBkZWxldGU6YWN0aW9ucyBjcmVhdGU6YWN0aW9ucyByZWFkOmVtYWlsX3Byb3ZpZGVyIHVwZGF0ZTplbWFpbF9wcm92aWRlciBkZWxldGU6ZW1haWxfcHJvdmlkZXIgY3JlYXRlOmVtYWlsX3Byb3ZpZGVyIGJsYWNrbGlzdDp0b2tlbnMgcmVhZDpzdGF0cyByZWFkOmluc2lnaHRzIHJlYWQ6dGVuYW50X3NldHRpbmdzIHVwZGF0ZTp0ZW5hbnRfc2V0dGluZ3MgcmVhZDpsb2dzIHJlYWQ6bG9nc191c2VycyByZWFkOnNoaWVsZHMgY3JlYXRlOnNoaWVsZHMgdXBkYXRlOnNoaWVsZHMgZGVsZXRlOnNoaWVsZHMgcmVhZDphbm9tYWx5X2Jsb2NrcyBkZWxldGU6YW5vbWFseV9ibG9ja3MgdXBkYXRlOnRyaWdnZXJzIHJlYWQ6dHJpZ2dlcnMgcmVhZDpncmFudHMgZGVsZXRlOmdyYW50cyByZWFkOmd1YXJkaWFuX2ZhY3RvcnMgdXBkYXRlOmd1YXJkaWFuX2ZhY3RvcnMgcmVhZDpndWFyZGlhbl9lbnJvbGxtZW50cyBkZWxldGU6Z3VhcmRpYW5fZW5yb2xsbWVudHMgY3JlYXRlOmd1YXJkaWFuX2Vucm9sbG1lbnRfdGlja2V0cyByZWFkOnVzZXJfaWRwX3Rva2VucyBjcmVhdGU6cGFzc3dvcmRzX2NoZWNraW5nX2pvYiBkZWxldGU6cGFzc3dvcmRzX2NoZWNraW5nX2pvYiByZWFkOmN1c3RvbV9kb21haW5zIGRlbGV0ZTpjdXN0b21fZG9tYWlucyBjcmVhdGU6Y3VzdG9tX2RvbWFpbnMgdXBkYXRlOmN1c3RvbV9kb21haW5zIHJlYWQ6ZW1haWxfdGVtcGxhdGVzIGNyZWF0ZTplbWFpbF90ZW1wbGF0ZXMgdXBkYXRlOmVtYWlsX3RlbXBsYXRlcyByZWFkOm1mYV9wb2xpY2llcyB1cGRhdGU6bWZhX3BvbGljaWVzIHJlYWQ6cm9sZXMgY3JlYXRlOnJvbGVzIGRlbGV0ZTpyb2xlcyB1cGRhdGU6cm9sZXMgcmVhZDpwcm9tcHRzIHVwZGF0ZTpwcm9tcHRzIHJlYWQ6YnJhbmRpbmcgdXBkYXRlOmJyYW5kaW5nIGRlbGV0ZTpicmFuZGluZyByZWFkOmxvZ19zdHJlYW1zIGNyZWF0ZTpsb2dfc3RyZWFtcyBkZWxldGU6bG9nX3N0cmVhbXMgdXBkYXRlOmxvZ19zdHJlYW1zIGNyZWF0ZTpzaWduaW5nX2tleXMgcmVhZDpzaWduaW5nX2tleXMgdXBkYXRlOnNpZ25pbmdfa2V5cyByZWFkOmxpbWl0cyB1cGRhdGU6bGltaXRzIGNyZWF0ZTpyb2xlX21lbWJlcnMgcmVhZDpyb2xlX21lbWJlcnMgZGVsZXRlOnJvbGVfbWVtYmVycyByZWFkOmVudGl0bGVtZW50cyByZWFkOmF0dGFja19wcm90ZWN0aW9uIHVwZGF0ZTphdHRhY2tfcHJvdGVjdGlvbiByZWFkOm9yZ2FuaXphdGlvbnMgdXBkYXRlOm9yZ2FuaXphdGlvbnMgY3JlYXRlOm9yZ2FuaXphdGlvbnMgZGVsZXRlOm9yZ2FuaXphdGlvbnMgY3JlYXRlOm9yZ2FuaXphdGlvbl9tZW1iZXJzIHJlYWQ6b3JnYW5pemF0aW9uX21lbWJlcnMgZGVsZXRlOm9yZ2FuaXphdGlvbl9tZW1iZXJzIGNyZWF0ZTpvcmdhbml6YXRpb25fY29ubmVjdGlvbnMgcmVhZDpvcmdhbml6YXRpb25fY29ubmVjdGlvbnMgdXBkYXRlOm9yZ2FuaXphdGlvbl9jb25uZWN0aW9ucyBkZWxldGU6b3JnYW5pemF0aW9uX2Nvbm5lY3Rpb25zIGNyZWF0ZTpvcmdhbml6YXRpb25fbWVtYmVyX3JvbGVzIHJlYWQ6b3JnYW5pemF0aW9uX21lbWJlcl9yb2xlcyBkZWxldGU6b3JnYW5pemF0aW9uX21lbWJlcl9yb2xlcyBjcmVhdGU6b3JnYW5pemF0aW9uX2ludml0YXRpb25zIHJlYWQ6b3JnYW5pemF0aW9uX2ludml0YXRpb25zIGRlbGV0ZTpvcmdhbml6YXRpb25faW52aXRhdGlvbnMiLCJndHkiOiJjbGllbnQtY3JlZGVudGlhbHMifQ.KwRUilEVkSW_Mmjqn3KajsotecelNVrVDUQYicFYFiNbfJTjWo48vBAXcFgFrDlQpvMTbaZF35iT-0Lcu31EwSLZKYXz1MPUPYVzp_mvMeMI1R46VwD3KB5xzVy3KxYWsBotIze0w5qtJzgBpfNM1NXa_iyZLXiZlQ79kNykLnfb7mpySPobvyczqHNp4FEmds4UTLfJBAwv8wSS0oIsLu_35EWxpDeoaAIJsNkZwQLO9Xe48pv4T1N-yqQykD4koJreVvEfuQsy2AezJ8ZbMdEVJdmWECkr08szyRbUFLaxb8qr8Z2_sgXFdMZzot_5Y7e4shl3dG44xr-iHU23Zw'}
};

axios.request(options).then(function (response) {
  console.log(response.data);
}).catch(function (error) {
  console.error(error);
});

*/
app.get('/', (req,res)=>{
  res.send("HEllo there!");
})


app.listen(PORT, ()=>{
  console.log('Server listening on ', PORT);
})
