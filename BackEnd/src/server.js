const express = require("express");
const app = express();
const env = require('dotenv')
const cors = require('cors');
// const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const userRoutes = require("./routes/index");
const adminRoutes = require("./routes/admin/index");
const categoryRoutes = require('./routes/category');
const productRoutes = require('./routes/product')
const cartRoutes = require("./routes/cart")
const initialDataRoutes = require("./routes/admin/initialData");
const pageRoutes = require('./routes/admin/page')
const addressRoutes = require("./routes/address");
const orderRoutes = require("./routes/order");
const adminOrderRoute = require("./routes/admin/order.routes");

env.config()

app.use(cors());
app.use(express.json());

/* app.use(bodyParser.urlencoded({
    extended:true
}));
app.use(bodyParser.json()); */
app.use("/api",userRoutes);
app.use("/api",adminRoutes);
app.use("/api",categoryRoutes);
app.use("/api",productRoutes);
app.use("/api",cartRoutes)
app.use("/api", initialDataRoutes);
app.use('/api',pageRoutes)
app.use("/api", addressRoutes);
app.use("/api", orderRoutes);
app.use("/api", adminOrderRoute);

app.use('/uploads',express.static('./uploads'))


mongoose.set('strictQuery', true);
mongoose.connect(`mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.8s0p0pi.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`,
    { 
        useNewUrlParser:true,
        useUnifiedTopology:true
    }
).then(
    () => console.log("DB Connection Established")
)



/* app.get("/",(req,res,next) => {
    res. status(200).json({
        message:"Hello from Server"
    })
});
 
app.post("/data",(req,res,next) => {
    res.status(200).json({
        message:req.body
    });
})
 */




app.listen(process.env.PORT,()=>{
    console.log(`Server is running on port ${process.env.PORT}`)
})

