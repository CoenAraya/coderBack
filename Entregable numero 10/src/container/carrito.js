const fs = require('fs');

class Carrito {
    constructor(filename){
        this.filename = filename
        this.id = 1
    }

    async save(){
        try{
            if(!fs.existsSync(this.filename)) {
                await fs.promises.writeFile(this.filename, JSON.stringify([
                    {
                        id: this.id,
                        timestamp: Date.now(),
                        productos: []
                    }
                ]));
                return { msj: `Carrito creado con el ID ${this.id}`}
            }else{
                const filename = await fs.promises.readFile(this.filename, 'utf-8')
                const json = JSON.parse(filename);
                if(json.length > 0){
                    json.push(
                        {
                            id: json.length + 1,
                            timestamp: Date.now(),
                            productos: []
                        }
                    )
                    await fs.promises.writeFile(this.filename, JSON.stringify(json))
                    return { msj: `Carrito creado con el ID ${json.length}`}
                }
            }
        }
        catch(e){
            console.log(e)
        }
    }

    async deleteById(id){
        try {
            const filename = await fs.promises.readFile(this.filename, 'utf-8')
            const json = JSON.parse(filename);
            if (json.length > 0) {
                const index = json.findIndex(obj => obj.id === id)
                if (index === -1) {
                    return {msj: `Carrito con el ID ${id} no existe`}
                } else {
                    json.splice(index, 1)
                    await fs.promises.writeFile(this.filename, JSON.stringify(json))
                    return {msj: `Carrito con el ID ${id} no existe`}
                }
            }
        }catch(error){
            console.log(error)
        } 
    } 

    async getById(id){
        try {
            const filename = await fs.promises.readFile(this.filename, 'utf-8')
            const json = JSON.parse(filename);
            if (json.length > 0) {
                const obj = json.find(obj => obj.id === id)
                if (obj){
                    return obj.productos
                }else{
                    return {error: "El carrito no existe"}
                } 
            }
        } catch (error) {
            console.log(error)
        }
    }

    async saveProduct(id, product){
        try {
            const filename = await fs.promises.readFile(this.filename, 'utf-8')
            const json = JSON.parse(filename);
            if (json.length > 0) {
                const obj = json.find(obj => obj.id === id)
                if (obj){
                    obj.productos.push(product)
                    await fs.promises.writeFile(this.filename, JSON.stringify(json))
                    return obj.productos
                }else{
                    return {error: "Carrito no existe"}
                } 
            }
        } catch (error) {
            console.log(error)
        }
    }

    async deleteProduct(id, idProduct){
        try {   
            const filename = await fs.promises.readFile(this.filename, 'utf-8')
            const json = JSON.parse(filename);
            if (json.length > 0) {
                const carrito = json.find(obj => obj.id === id)
                if (carrito){
                    const index = carrito.productos.findIndex(producto => producto.id === idProduct)
                    if (index === -1) {
                        return {msj: `Producto con el ID ${idProduct} no existe`}
                    } else {
                        carrito.productos.splice(index, 1)
                        await fs.promises.writeFile(this.filename, JSON.stringify(json))
                        return {msj: `Producto con el ID ${idProduct} fue borrado`}
                    }
                }else{
                    return {error: `Carrito con el ID ${id} no existe`}
                } 
            }
        } catch (error) {
            console.log(error)
        }
    }
} 

module.exports = Carrito