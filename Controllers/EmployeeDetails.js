const Data = require("../Models/EmployeeShema");
const ErrorHandler = require("../Utiles/ErrorHandler");
const catchAsyncError = require("../Middlewares/CatchAsyncError");

//get Employee details
exports.getEmployeeData = catchAsyncError(async (req, res, next) => {
  const data = await Data.find();
  res.status(200).json({
    success: true,
    data,
  });
});
//get single Details
exports.getDataById = catchAsyncError(async (req, res, next) => {
  const data = await Data.findById(req.params.id);
  if (!data) {
    return next(new ErrorHandler(`Data not found`, 404));
  }
  res.status(200).json({
    success: true,
    data,
  });
});

//Create Employee Details
exports.createData = catchAsyncError(async (req, res, next) => {
  console.log("createData is running");
  const { GeneralInformation, skills, Experience, contactInfo } = req.body;
  const data = await Data.create({
    GeneralInformation,
    skills,
    Experience,
    contactInfo,
  });
  console.log(data);
  res.status(200).json({
    success: true,
    data,
  });
});

//update Employee details
exports.updateDetails = catchAsyncError(async (req, res, next) => {
  const result = await Data.findById(req.params.id);
  if (!result) {
    return next(new ErrorHandler(`Data not found`, 404));
  }
  result = await Data.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({
    success: true,
    result,
  });
});

//insert particular new data(update)
exports.updateData = catchAsyncError(async (req, res, next) => {
  const data = await Data.findById(req.params.id);
  if (!data) {
    return next(new ErrorHandler(`Data not present`, 404));
  }
  const { field } = req.body;

  data.Experience.usedSkills.push(field);
  await data.save();

  res.status(200).json({
    success: true,
    data,
  });
});

//Delete Employee Data
exports.deleteData=catchAsyncError(async(req,res,next)=>{
  const result=await Data.findById(req.params.id)
  if(!result){
    return next(new ErrorHandler(`Data not found`,404))
  }
  await result.remove()
  res.status(200).json({
    success:true,
    message:'Data has been deleted'
  })
})
