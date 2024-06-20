import mongoose from "mongoose";


const collection = "Adoptions";

const schema = new mongoose.Schema({
    owner: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Users'
    },
    pet: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Pets'
    },
    date_adoption: {
        type: Date,
        default: Date.now
    },
    date_returned: {
        type: Date,
        default: null
    },

})

const adoptionModel = mongoose.model(collection, schema);

export default adoptionModel;