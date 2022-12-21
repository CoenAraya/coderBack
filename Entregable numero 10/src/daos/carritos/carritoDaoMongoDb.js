const config = require("../../config/config")
const contenedor = require("../../container/mongodb")

const carritos = new contenedor("carritos", {
    timestamp: {type: String, require: true, max: 100},
    productos: {type: Array, require: true}
})

const crud = async () => {
    await config.initMongoDB()
    /* await carritos.save({timestamp: 1670919375156,products: [{
        timestamp:1670919375156,
        title:"Cama Queen Size",
        description:"Description here",
        code:"CQS",
        image:"https://simmonsarg.vteximg.com.br/arquivos/ids/158206-1000-1000/Sommier-Beautyrest-Black-200-160.png?v=637455359009970000",
        price:640,
        stock:9
    }]}) */
    //await carritos.getAll()
    //await carritos.getById("63978a0b5f16cfcd9378ba7b")
    //await carritos.deleteAll()
    //await carritos.deleteById("63978a0b5f16cfcd9378ba7b")
}

crud()