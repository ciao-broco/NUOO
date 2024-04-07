const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const mysql = require('mysql');


const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'students',
    connectionLimit: 10
  })

  app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({extended:true}))


app.get('/', (req, res) => {
  const sqlSelect = "SELECT * FROM students";
  db.query(sqlSelect, (err, result) => {
      if (err) {
          res.status(500).send("Errore nel recupero dei dati dal database");
      } else {
          res.json(result); // Invia i dati come JSON
      }
  });
});

app.get('/all', (req, res) => {
    const sqlSelect = "SELECT * FROM students";
    db.query(sqlSelect, (err, result) => {
      if (err) {
        res.status(500).send("Errore nel recupero dei dati dal database");
      } else {
        let brawlersHTML = "<h2>Students</h2>";
        result.forEach(brawler => {
          brawlersHTML += `<p>ID: ${brawler.ID}<br>Name: ${brawler.Name}<br> Email: ${brawler.Email}</p>`;
        });

        res.send(brawlersHTML);
      }
    });
  });

  app.post('/students', (req,res)=>{
const Name = req.body.Name
const Email = req.body.Email

const SqlInsert = "INSERT INTO students (Name,Email) VALUES (?,?)"
db.query(SqlInsert, [Name,Email], (err,result)=>{
if(err) console.log(err)
return res.json(result)
})
})
  app.get('/read/:id', (req,res)=>{
const id = req.params.id;
const SqlId = "SELECT * FROM students WHERE ID = ?"
db.query(SqlId, [id], (err,result)=>{
if(err) console.log(err)
return res.json(result)
})
})

app.put('/edit/:id', (req,res)=>{
  const id = req.params.id;
  const SqlEdit = "UPDATE students SET `Name` = ?, `Email` = ? WHERE ID = ?";  
  db.query(SqlEdit, [req.body.Name,req.body.Email,id], (err,result)=>{
  if(err) console.log(err)
  return res.json(result)
  })
  })

  app.delete('/delete/:id', (req, res) => {
    const id = req.params.id;
    const SqlDelete = "DELETE FROM students WHERE ID = ?";
    const SqlSelectRemainingIDs = "SELECT ID FROM students ORDER BY ID ASC";
  
    db.query(SqlDelete, [id], (err, deleteResult) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ error: "Errore durante l'eliminazione dello studente." });
      }
  
      // Seleziona tutti gli ID rimanenti ordinati in modo crescente
      db.query(SqlSelectRemainingIDs, (selectErr, selectResult) => {
        if (selectErr) {
          console.log(selectErr);
          return res.status(500).json({ error: "Errore durante il recupero degli ID rimanenti." });
        }
  
        // Aggiorna gli ID rimanenti in base alla loro posizione nella sequenza
        const updateQueries = selectResult.map((row, index) => {
          const newId = index + 1;
          const updateSql = "UPDATE students SET ID = ? WHERE ID = ?";
          return new Promise((resolve, reject) => {
            db.query(updateSql, [newId, row.ID], (updateErr, updateResult) => {
              if (updateErr) {
                reject(updateErr);
              } else {
                resolve(updateResult);
              }
            });
          });
        });
  
        // Esegui tutte le query di aggiornamento in parallelo
        Promise.all(updateQueries)
          .then(() => {
            return res.json({ success: true, message: "Studente eliminato e ID riorganizzati." });
          })
          .catch(updateErr => {
            console.log(updateErr);
            return res.status(500).json({ error: "Errore durante l'aggiornamento degli ID rimanenti." });
          });
      });
    });
  });
  
  


  
app.listen(8081, () => {
    console.log("Server listening on port 8081");
  });