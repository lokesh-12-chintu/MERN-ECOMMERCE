const Product = require("../models/product");
const slugify = require("slugify")
const Category = require("../models/category");

exports.createProduct = async(req, res) => {
  //res.status(200).json( { file: req.files, body: req.body } );
  const { name, price, description,category,quantity,createdBy } = req.body;
  let productPicture = [];

  if (req.files.length > 0) {
    productPicture = req.files.map((file) => {
      return { img: file.filename };
    });
  }

  const product = new Product({
    name,
    slug:slugify(name),
    price,
    description,
    productPicture,
    quantity,
    category,
    createdBy:req.user._id

  });
  product.save((error,data) => {
      res.status(201).json({ product, files: req.files });
  });

}