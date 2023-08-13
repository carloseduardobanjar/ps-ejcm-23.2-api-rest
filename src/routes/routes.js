const Express = require('express');
const router = Express();
const VendorController = require("../controllers/VendorController");
const ItemController = require("../controllers/itemController");


//rotas para o anunciante
router.post("/vendor", VendorController.create);
router.get("/vendor/:id", VendorController.show);
router.get("/vendor", VendorController.index);
router.put("/vendor/:id", VendorController.update);
router.delete("/vendor/:id", VendorController.destroy);

//rotas para o item
router.post("/item", ItemController.create);
router.get("/item/:id", ItemController.show);

//rota para relação anunciante-item
router.put("/vendor/:vendorId/item/:itemId", ItemController.addVendor);

module.exports = router;