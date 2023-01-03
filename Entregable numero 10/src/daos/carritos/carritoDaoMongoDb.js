import Contenedor from "../../container/mongodb.js";

class CarritoDaoMongodb extends Contenedor {
    constructor(){
        super('carritos',{
            productos: {type: [], require: true},
            timestamp: {type: String, require: true}
            
    });

    }

};

export default CarritoDaoMongodb;