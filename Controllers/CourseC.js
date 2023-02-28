const Course = require("../Models/CertificateModel");
const catchAsyncError = require("../Middlewares/CatchAsyncError");
const ErrorHandler = require("../Utiles/ErrorHandler");

//get All course
exports.getAllCourse = catchAsyncError(async (req, res, next) => {
  const result = await Course.find();
  res.status(200).json({
    success: true,
    result,
  });
});
//get particular course
exports.getCourseById = catchAsyncError(async (req, res, next) => {
  const result = await Course.findById(req.params.id);
  if (!result) {
    return next(new ErrorHandler(`Result not found`));
  }
  res.status(200).json({
    success: true,
    result,
  });
});
//Add course
exports.addCourse = catchAsyncError(async (req, res, next) => {
  const result = await Course.create(req.body);
  res.status(200).json({
    success: true,
    result,
  });
});
//Delete course
exports.deleteCourse=catchAsyncError(async(req,res,next)=>{
    const result=await Course.findById(req.params.id)
    if(!result){
        return next(new ErrorHandler(`Data not found`))
    }
    await result.remove()
    res.status(200).json({
        success:true,
        message:'Data has been deleted'
    })
})