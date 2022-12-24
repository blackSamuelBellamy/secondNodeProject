const express = require('express')
const fs = require('fs')
const app = express()
const PUERTO = 3000
const canciones = JSON.parse(fs.readFileSync('repertorio.json'))

app.use(express.json())
app.listen(PUERTO, console.log(`Servidor conectado a puerto ${PUERTO}...`))


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})  
app.get("/canciones", (req, res) => {
  const canciones = JSON.parse(fs.readFileSync("repertorio.json"));
  res.json(canciones);
});

app.post('/canciones', (req, res) =>{
  const cancion = req.body
  canciones.push(cancion)
  fs.writeFileSync('repertorio.json', JSON.stringify(canciones))
  res.send(`canción ${cancion.titulo} agregada!`)
})

app.put('/canciones/:id', (req, res) => {
  const cancion = req.body
  const {id} = req.params
  const index = canciones.findIndex(ind => ind.id == id)
  canciones[index] = cancion
  fs.writeFileSync('repertorio.json', JSON.stringify(canciones))
  res.send(`canción ${cancion.titulo} editada!`)
})

app.delete('/canciones/:id', (req, res) => {
    const {id} = req.params
    const index = canciones.findIndex(ind => ind.id == id)
    const cancion = canciones[index]
    canciones.splice(index, 1)
    fs.writeFileSync('repertorio.json', JSON.stringify(canciones))
    res.send(`canción ${cancion.titulo} eliminada!`)
  })
  
  app.use('*', (req, res) =>{
    res.status(404).send('Error, ruta desconocida')
  })
