const express = require("express");
const router = express.Router();
const { ensureAuthenticated } = require("../utils/ensureAuth");
const userController = require("../controllers/user.controller");
const schemas = require("../utils/joiSchemaValidator");
const validate = require("../middleware/joiValidator");

router.get("/", ensureAuthenticated, userController.findAll);

router.post("/", validate(schemas.users), userController.create);

router.get("/:userId", ensureAuthenticated, userController.findById);

router.put("/:userId", ensureAuthenticated, userController.update);

router.delete("/:userId", ensureAuthenticated, userController.delete);

module.exports = router;
