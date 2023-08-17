const Express = require('express');
const router = Express();
const VendorController = require("../controllers/VendorController");
const ItemController = require("../controllers/ItemController");
const AuthController = require("../controllers/AuthController");
const passport = require("passport");

router.use("/private", passport.authenticate('jwt', {session: false}));

router.get('/private/getDetails', AuthController.getDetails);
router.post('/login', AuthController.login);

//rotas para o anunciante
router.post("/vendor", VendorController.create);
router.get("/vendor/:id", VendorController.show);
router.get("/vendor", VendorController.index);
router.put("/vendor/:id", VendorController.update);
router.delete("/vendor/:id", VendorController.destroy);

//rotas para o item
router.post("/item", ItemController.create);
router.get("/item/:id", ItemController.show);
router.get("/item", ItemController.index);
router.put("/item/:id", ItemController.update);
router.delete("/item/:id", ItemController.destroy);

//rota para relação anunciante-item
router.put("/vendor/:vendorId/item/:itemId", ItemController.addVendor);
router.put("/vendor/item/:itemId", ItemController.removeVendor);

module.exports = router;