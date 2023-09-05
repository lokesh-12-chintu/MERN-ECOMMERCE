const express = require('express')
const {createProduct,getProductsBySlug,getProductDetailsById} = require("../controller/product");
const {requireSignin,adminMiddleware} = require("../common-middleware");
const router = express.Router();
const multer = require('multer');

const fs = require('fs')

const uploadDirectory = "./uploads";
if (!fs.existsSync(uploadDirectory)) {
  fs.mkdirSync(uploadDirectory);
}

const storage = multer.diskStorage({
  destination:(req,file,callback)=>{
    callback(null,uploadDirectory)
  },
  filename:(req,file,callback)=>{
    callback(null,`image-${Date.now()}. ${file.originalname}`)
  }
});

const upload = multer({storage})

router.post("/product/create",upload.array("productPictures"),createProduct)
router.get("/products/:slug", getProductsBySlug);
router.get('/product/:productId', getProductDetailsById);
module.exports = router;

 