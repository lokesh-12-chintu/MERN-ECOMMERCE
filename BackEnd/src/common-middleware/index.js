const jwt = require('jsonwebtoken')
const multer = require('multer');

const fs = require('fs')

const uploadDirectory = "./uploads";

if (!fs.existsSync(uploadDirectory)) {
  fs.mkdirSync(uploadDirectory);
}


const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, uploadDirectory)
  },
  filename: (req, file, callback) => {
    callback(null, `image-${Date.now()}. ${file.originalname}`)
  }
});

exports.upload = multer({ storage })
exports.requireSignin = (req, res, next) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(" ")[1];
    try {
      const user = jwt.verify(token, process.env.JWT_SECRET);
      req.user = user;
      next();
    } catch (error) {
      return res.status(401).json({ message: 'Invalid token' });
    }
  } else {
    return res.status(400).json({ message: 'Authorization required' });
  }
}

exports.userMiddleware = (req, res, next) => {
  if (req.user.role !== "user") {
    return res.status(400).json({ message: 'User access denied' })
  }
  next();
}


exports.adminMiddleware = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(400).json({ message: 'Admin access denied' })
  }
  next();
}
