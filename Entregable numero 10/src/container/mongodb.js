import mongoose from mongoose;
import config from '../config.js'

await mongoose.connect(config.mongobd.url);

export class MongoDb {

    constructor(collection, schema){
        this.collection = mongoose.model(collection,schema)

    }

    async save(objeto){

        let doc = await this.collection.create(objeto)
        doc.id = doc._id;
        return id
    }

    async getById(id){
        let doc = await this.collection.findOne({'_id' : id});
        if (doc){
            doc.id = doc._id;
            return doc;
        }
        return null
    }

    async getAll(){
        let docs = await this.collection.find({});
        docs = docs.map(item => {
            item.id = item._id;
            return item;
        });

        return docs;
    }

    async deleteById(id){
        let doc = await this.collection.deleteOne({'_id' : id});
    } 

    async update(objeto){
        await this.collection.replaceOne({'_id': objeto._id} , objeto);

    }


}

module.exports = MongoDb