//Modules - Class
const Carrito = require('./daos/carritos/carritoDaoFs')
const Contenedor = require('./daos/productos/productosDaoFs')
const express = require('express')
const { Router } = express
const app = express()

//Set Class (Desahabilitar p/Firebase-MongoDb)
const productos = new Contenedor()
const carrito = new Carrito()

//Rutas
const productosRuta = Router()
const carritoRuta = Router()

//Admininstrador
const admin = true

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use('/api/productos', productosRuta)
app.use('/api/carrito', carritoRuta)

const PORT = 8080

//Endpoints para los productos
productosRuta.get('/', (req, res) => {
    productos.getAll().then(response => {
        res.send(response)
    })
})

productosRuta.post('/', (req, res) => {
    const producto = req.body;
    productos.save(producto)
    res.send({msj: `Producto ${producto.title} ha sido añadido`})
})

productosRuta.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id)
    productos.deleteById(id)
    res.send({msj: `Producto con el id ${id} ha sido borrado`})
})

productosRuta.get('/:id', (req, res) => {
    const id = parseInt(req.params.id)
    productos.getById(id).then(response => {
        res.send(response)
    })
})

productosRuta.put('/:id', async (req, res) => {
    const id = parseInt(req.params.id)
    const producto = await productos.getById(id)
    const productoNuevo = {
        id: id,
        title: req.body.title,
        price: req.body.price,
        thumbnail: req.body.thumbnail
    };
    await productos.deleteById(id)
    await productos.save(productoNuevo)
    res.send({msj: `Producto ${producto.title} ha sido actuaizado`})
}) 


//Endpoints para el carrito
carritoRuta.post('/', async (req, res) => {
    res.send(await carrito.save())
})

carritoRuta.delete('/:id', async (req, res) => {
    const id = parseInt(req.params.id)
    res.send(await carrito.deleteById(id))
})

carritoRuta.get('/:id/productos', async (req, res) => {
    const id = parseInt(req.params.id)
    res.send(await carrito.getById(id))
})

carritoRuta.post('/:id/productos', async (req, res) => {
    const id = parseInt(req.params.id)
    const producto = req.body;
    res.send(await carrito.saveProduct(id, producto))
})

carritoRuta.delete('/:id/productos/:idProd', async (req, res) => {
    const idCarrito = parseInt(req.params.id)
    const idProducto = parseInt(req.params.idProd)
    res.send(await carrito.deleteProduct(idCarrito, idProducto))
})

//Errores en el SV
app.use((req, res, next) => {
    res.status(404).send({error: -2, descripcion: `Ruta ${req.url} medoto ${req.method} no implementado`});
});

const server = app.listen(PORT, ()=>{
    console.log(`Servido iniciado en: http://localhost:${server.address().port}`)
})
server.on("error", error => console.log(error))