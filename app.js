const express = require("express");
const dotenv = require("dotenv").config();
const connectToDb = require("./config/db");
const { errorHandler } = require("./Middleware/errorHandler");
const user = require("./routes/userRoute");
const blogs = require("./routes/blogRouter");
const app = express();



const port = process.env.PORT || 5000;
app.use(express.json());
app.use(errorHandler);
app.use("/api/user",user);
app.use("/api/blog",blogs);

app.listen(port,()=>{
    console.log(`server is running at port ${port}`);
});
connectToDb();


