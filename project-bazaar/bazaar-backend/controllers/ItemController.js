import Item from "../models/ItemModel.js"

export const getItems = async (req, res) => {
    try{
        const items = await Item.find();
        res.json(items);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

export const getItemById  = async (req, res) => {
    try{
        const item = await Item.findById(req.params.id);
        res.json(item);
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}

export const getItemByIdBazaar  = async (req, res) => {
    var idBaazar = req.params.id;
    try{
        const item = await Item.find({id_bazaar: idBaazar});
        res.json(item);
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}

export const saveItem  = async (req, res) => {
    const item = new Item(req.body);
    try{
        const insertitem = await item.save();
        res.status(201).json(insertitem);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}

export const updateItem  = async (req, res) => {
    try{
        const updateditem = await Item.updateOne({_id:req.params.id}, {$set: req.body});
        res.status(200).json(updateditem);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}

export const deleteItem  = async (req, res) => {
    try{
        const deleteitem = await Item.deleteOne({_id:req.params.id});
        res.status(200).json(deleteitem);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}