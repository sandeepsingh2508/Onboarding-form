const Project = require("../Models/ProjectSchema");
const catchAsyncError = require("../Middlewares/CatchAsyncError");
const ErrorHandler = require("../Middlewares/Error");

//get All project
exports.getAllProject = catchAsyncError(async (req, res, next) => {
  const result = await Project.find();
  res.status(200).json({
    success: true,
    result,
  });
});
//get project by id
exports.getProjectById = catchAsyncError(async (req, res, next) => {
  const result = await Project.findById(req.params.id);
  if (!result) {
    return next(new ErrorHandler(`result not found`, 404));
  }
  res.status(200).json({
    success: true,
    result,
  });
});

//Add new Project
exports.addProject = catchAsyncError(async (req, res, next) => {
  const result = await Project.create(req.body);
  res.status(200).json({
    success: true,
    result,
  });
});

//update Projec details
exports.updateDetail = catchAsyncError(async (req, res, next) => {
  const result = await Project.findById(req.params.id);
  if (!result) {
    return next(new ErrorHandler(`Data not found`, 404));
  }
  result = await Project.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndMidify: false,
  });
  res.status(200).json({
    success: true,
    result,
  });
});
//Delete Project
exports.deleteProject = catchAsyncError(async (req, res, next) => {
  const result = await Project.findById(req.params.id);
  if (!result) {
    return next(new ErrorHandler(`Data not found`, 404));
  }
  await result.remove();
  res.status(200).json({
    success: true,
    message: `Data has been deleted`,
  });
});
