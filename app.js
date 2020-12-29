const express = require('express');
const bodyParser = require('body-parser');
const {MongoClient} = require ('mongodb');
const { response, request } = require('express');

const app = express();
const port = 3000;

const dbName = 'habilitacion'
const url = 'mongodb://localhost:27017/' + dbName
const client = new MongoClient(url, { useUnifiedTopology: true});

async function conectar() {
    await client.connect(function(err){
      if(err){
        console.log('err')
        return
      }
      console.log('Conectado a mongo');
    })
}

conectar();

//INSERTAR UN REGISTRO
async function insertarRegistro(publi){
  let db = client.db(dbName)
  let collection = db.collection('publicaciones'); 

  collection.insertOne(publi, function(resultado){
      console.log(resultado)
  })
}

//TRAER TODOS LOS REGISTROS
async function encontrarPublicacion(){
  let db = client.db(dbName)
  let collection = db.collection('publicaciones'); 

  collection.find().toArray(function(err, docs){
    console.log(docs)
  })
}


app.use(bodyParser.json());
//LLAMADOS


//Metodo para el llamado del insertar
app.post('/agregar', (request, response) => {
  insertarRegistro(request.body);
  console.log(request.body)
  response.send('Se ha agrego las publicaciones');
})

app.get('/llamarPublicaciones', (req, res)=>{
  encontrarPublicacion()
  res.send('Correctos')
})

app.listen(port, () => {
  console.log(`Mi app corriendo en el puerto ${port}`)
})



