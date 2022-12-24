import mongoose from "mongoose";

const Item = mongoose.Schema({
    name:{
        type: String,
        reuqired: true
    },
    price:{
        type: Number,
        requried: true
    },
    stok:{
        type: Number,
        requried: true
    }
});

export default mongoose.model('Items', Item);
