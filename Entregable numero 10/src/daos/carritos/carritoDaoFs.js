import { Contenedor } from '../../container/fs.js';

class CarritoDaoFs extends Contenedor{
    constructor(){
        super('src/db/cart.txt');
    }
}

export default CarritoDaoFs;