const express=require('express')
const app=require('./app')
const cors=require('cors')
const dotenv=require('dotenv')
const DbConnect=require('./config/Database')
dotenv.config({path:'config/config.env'})
const port=process.env.PORT

DbConnect()

const { NODE_ENV,ORIGIN } = require("./config/config");
// const { API_ENDPOINT_NOT_FOUND_ERR} = require("./Middlewares/AuthError");


//middleware
app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: ORIGIN,
    optionsSuccessStatus: 200,
  })
);

// log in development environment

if (NODE_ENV === "development") {
  const morgan = require("morgan");
  app.use(morgan("dev"));
}

// index route

app.get("/", (req, res) => {
    res.status(200).json({
      type: "success",
      message: "server is up and running",
      data: null,
    });
  });
// page not found error handling  middleware

app.use("*", (req, res, next) => {
    const error = {
      status: 404,
      message: API_ENDPOINT_NOT_FOUND_ERR,
    };
    next(error);
  });
//unhandled prommis rejection
process.on("unhandledRejection",(err)=>{
    console.log(`Error:${err.message}`);
    console.log(`sutting the server due to unhadled promise rejection`);
        process.exit(1);
});


//unhandled prommis rejection at mongodb
process.on("unhandledRejection",(err)=>{
    console.log(`Error:${err.message}`);
    console.log(`sutting the server due to unhadled promise rejection`);
    server.close(()=>{
        process.exit(1);
    });
});
  const server=app.listen(port,()=>{
    console.log(`Server is working on http://localhost:${port}`)
})