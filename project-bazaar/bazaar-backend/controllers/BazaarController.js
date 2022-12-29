import Bazaar from '../models/BazaarModel.js';

export const getBazaars = async (req, res) => {
    try{
        const bazaars = await Bazaar.find();
        res.json(bazaars);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

export const getBazaarById = async (req,res) => {
    try{
        const bazaar = await Bazaar.findById(req.params.id);
        res.json(bazaar);
    } catch (error) {
        res.status(404).json({message: error.message})
    }
}

export const saveBazaar = async (req, res) => {
    const bazaar = new Bazaar(req.body);
    try{
        const insertbazaar = await bazaar.save();
        res.status(201).json(insertbazaar);
    } catch (error){
        res.status(400).json({message: error.message});
    }
}

export const updateBazaar = async (req, res) => {
    try{
        const updatebazaar = await Bazaar.updateOne({_id:req.params.id}, {$set: req.body})
        res.status(200).json(updatebazaar);
    } catch(error){
        res.status(400).json({message: error.message});
    }
}

export const deleteBazaar = async (req, res) => {
    try{
        const detelebazaar = await Bazaar.deleteOne({_id:req.params.id})
        res.status(200).json(detelebazaar);
    } catch(error){
        res.status(400).json({message: error.message})
    }
}