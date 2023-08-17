const Vendor = require("../models/Vendor");
const Item = require("../models/Item");
const Auth = require("../config/auth");

async function create(req, res){
    try {
        const { password } = req.body;
		const hashAndSalt = Auth.generatePassword(password);
		const salt = hashAndSalt.salt;
		const hash = hashAndSalt.hash;

        const vendor = await Vendor.create({
            firstName: req.body.firstName,
			lastName: req.body.lastName,
			email: req.body.email,
			phoneNumber: req.body.phoneNumber,
            country: req.body.country,
			hash: hash,
			salt: salt
        });
        return res.status(201).json({message: "Anunciante cadastrado com sucesso!", vendor: vendor});
    } catch(err){
        return res.status(500).json({error: err});
    }
}

async function index(req, res){
    try{
        const vendors = await Vendor.findAll({include: [{model: Item}]});
        return res.status(200).json({message: "Todos os anunciantes listados", vendors: vendors});
    } catch(err) {
        return res.status(500).json({err});
    }
}

async function show(req, res){
    const {id} = req.params;
    try{
        const vendor = await Vendor.findByPk(id, {include: [{model: Item}]});
        return res.status(200).json({vendor});
    } catch(err){
        return res.status(500).json({err});
    }
}

async function update(req, res){
    const {id} = req.params;
    try{
        const [updated] = await Vendor.update(req.body, {where: {id: id}});
        if(updated) {
            const vendor = await Vendor.findByPk(id);
            return res.status(200).send(vendor);
        }
        throw new Error();
    }catch(err){
        return res.status(500).json("Anunciante não encontrado.");
    }
}

async function destroy(req, res){
    const {id} = req.params;
    try{
        const deleted = await Vendor.destroy({where: {id: id}});
        if(deleted){
            return res.status(200).json("Anunciante deletado com sucesso.");
        }
        throw new Error();
    } catch(err){
        return res.status(500).json("Anunciante não encontrado.");
    }
}

module.exports = {
    create,
    show, 
    index,
    update, 
    destroy,
}