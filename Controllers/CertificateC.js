const Certificate = require("../Models/CertificateModel");
const catchAsyncError = require("../Middlewares/CatchAsyncError");
const ErrorHandler = require("../Utiles/ErrorHandler");

//get All certificate
exports.getAllCertificate = catchAsyncError(async (req, res, next) => {
  const result = await Certificate.find();
  res.status(200).json({
    success: true,
    result,
  });
});
//get particular certificate
exports.getCertificateById = catchAsyncError(async (req, res, next) => {
  const result = await Certificate.findById(req.params.id);
  if (!result) {
    return next(new ErrorHandler(`Result not found`));
  }
  res.status(200).json({
    success: true,
    result,
  });
});
//Add certificate
exports.addCertificate = catchAsyncError(async (req, res, next) => {
  const result = await Certificate.create(req.body);
  res.status(200).json({
    success: true,
    result,
  });
});
//Delete course
exports.deleteCertificate=catchAsyncError(async(req,res,next)=>{
    const result=await Certificate.findById(req.params.id)
    if(!result){
        return next(new ErrorHandler(`Data not found`))
    }
    await result.remove()
    res.status(200).json({
        success:true,
        message:'Data has been deleted'
    })
})