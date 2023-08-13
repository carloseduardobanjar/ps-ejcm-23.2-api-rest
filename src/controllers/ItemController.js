const Vendor = require("../models/Vendor");
const Item = require("../models/Item");

async function create(req, res){
    try {
        const item = await Item.create(req.body);
        return res.status(201).json({message: "Item cadastrado com sucesso!", item: item});
    } catch(err){
        return res.status(500).json({error: err});
    }
}

async function index(req, res){
    try{
        const items = await Item.findAll();
        return res.status(200).json({message: "Todos os itens listados", items: items});
    } catch(err) {
        return res.status(500).json({err});
    }
}

async function show(req, res){
    const {id} = req.params;
    try{
        const item = await Item.findByPk(id);
        return res.status(200).json({item});
    } catch(err){
        return res.status(500).json({err});
    }
}

async function update(req, res){
    const {id} = req.params;
    try{
        const [updated] = await Item.update(req.body, {where: {id: id}});
        if(updated) {
            const item = await Item.findByPk(id);
            return res.status(200).send(item);
        }
        throw new Error();
    }catch(err){
        return res.status(500).json("Item não encontrado.");
    }
}

async function destroy(req, res){
    const {id} = req.params;
    try{
        const deleted = await Item.destroy({where: {id: id}});
        if(deleted){
            return res.status(200).json("Item deletado com sucesso.");
        }
        throw new Error();
    } catch(err){
        return res.status(500).json("Item não encontrado.");
    }
}


async function addVendor(req, res){
    const {vendorId, itemId} = req.params; 
    try{
        const vendor = await Vendor.findByPk(vendorId);
        const item = await Item.findByPk(itemId);
        await item.setVendor(vendor);
        return res.status(200).json(item);
    } catch(error) {
        return res.status(500).json({error});
    }
}

async function removeVendor(req, res){
    const {itemId} = req.params; 
    try{
        const item = await Item.findByPk(itemId);
        await item.setVendor(null);
        return res.status(200).json(item);
    } catch(error) {
        return res.status(500).json({error});
    }
}


module.exports = {
    create,
    show, 
    index,
    update, 
    destroy,
    addVendor,
    removeVendor
}