const config = require("../../config/config")
const contenedor = require("../../container/firebase")

const carritos = new contenedor("carritos")

const crud = async () => {
    await config.initFirebase()
    await carritos.save({timestamp: 1670919375156,products: [{
        timestamp:1670919375156,
        title:"Cama Queen Size",
        description:"Description here",
        code:"CQS",
        image:"https://simmonsarg.vteximg.com.br/arquivos/ids/158206-1000-1000/Sommier-Beautyrest-Black-200-160.png?v=637455359009970000",
        price:640,
        stock:9
    }]})
    //await carritos.getAll()
    //await carritos.getById("xxxxxx")
    //await carritos.deleteById("xxxxxx")
    //await carritos.deleteAll()
}

crud()