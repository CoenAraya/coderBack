import Contenedor from "../../container/mongodb.js";

class ProductosDaoMongodb extends Contenedor {
    constructor(){
        super('productos',{
            title: {type: String, require: true},
            price: {type: Number, require: true},
            thumbnail: {type: String, require: true}

    });

    }

};

export default ProductosDaoMongodb;