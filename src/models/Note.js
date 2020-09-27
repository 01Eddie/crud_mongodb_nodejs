const {Schema, model}=require('mongoose');

const NoteSchema = new Schema({
    title: {
        type: String, 
        required: true
    },
    description: {
        type: String, 
        required: true
    }, 
    user: {
        type:String,
        required: true
    }   
}, {
    //timestamps: es para ver cuando fue creado y cuando fue actualizado
    timestamps: true 
})
module.exports = model('Note', NoteSchema);