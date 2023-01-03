import  {Contenedor} from '../../container/fs.js'

class ProductosDaoFs extends Contenedor{
    constructor(){
        super('src/db/products.json')
    }
}

export default ProductosDaoFs ;