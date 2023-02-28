const express = require("express");
const app = express();
const ErrorMiddleWare = require("./Middlewares/Error");

//Employee Details Router
const EmployeeRouter = require("./Routes/EmployeeRoutes");
const CertificateRoute = require("./Routes/CertificateRoutes");
const CourseRouter = require("./Routes/CourseRoutes");
const projectRouter = require("./Routes/ProjectRoutes");

//Auth Router
const AuthRouter=require('./Routes/AuthRoute')
app.use('/api/auth',AuthRouter)

app.use("/api", EmployeeRouter);
app.use("/api", CertificateRoute);
app.use("/api", CourseRouter);
app.use("/api", projectRouter);

app.use(ErrorMiddleWare);

module.exports = app;
