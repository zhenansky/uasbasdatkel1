import mongoose from "mongoose";

const Bazaar = mongoose.Schema({
    username:{
        type: String,
        required: true
    },
    namaBazaar:{
        type: String,
        required: true
    },
    namaPemilik:{
        type: String,
        required: true
    }
})

export default mongoose.model('Bazaars', Bazaar)