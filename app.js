const express = require("express");
const cors = require("cors");
const app = express();
const ApiError = require("./app/api-error");
const contactsRouter = require("./app/routes/contact.route");

app.use(express.json());
app.use(cors());
app.use("/api/contacts", contactsRouter);

app.get("/", (req, res)=>{
    res.json({ message: "welcome to contact book application."});
});

app.use((req, res, next)=> {
    return next(new ApiError(404, "Resource not found"));
});

app.use((error, req, res, next) => {
    return res.status(error.statusCode || 500).json({
        message: error.message || "Internal Server Error",
    });
});

module.exports= app;