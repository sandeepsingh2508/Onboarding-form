const User = require("../Models/UserModel");
const ErrorHandler = require("../Utiles/ErrorHandler");


const { createJwtToken } = require("../Utiles/Token");

const { generateOTP, fast2sms } = require("../Utiles/OTP");

//create new user

exports.createNewUser = async (req, res, next) => {
  try {
    let { phone, name } = req.body;

    // check duplicate phone Number
    const phoneExist = await User.findOne({ phone });

    if (phoneExist) {
      return next(new ErrorHandler(`This number is already registerd`));
    }

    // create new user
    const createUser = new User({
      phone,
      name,
      role: phone === process.env.ADMIN_PHONE ? "ADMIN" : "USER",
    });

    // save user
    const user = await createUser.save();
   
    res.status(200).json({
      type: "success",
      message: "Account created OTP sended to mobile number",
      data: {
        userId: user._id,
      },
    });

    // generate otp
    const otp = generateOTP(6);
    // save otp to user collection
    user.phoneOtp = otp;
    await user.save();
    // send otp to phone number
    console.log(otp);
    await fast2sms(
      {
        message: `Your OTP is ${otp}`,
        contactNumber: user.phone,
      },
      next
    );
  } catch (error) {
    next(error);
  }
};

//login with phone otp
exports.loginWithPhoneOtp = async (req, res, next) => {
  try {
    const { phone } = req.body;
    const user = await User.findOne({ phone });

    if (!user) {
      console.log("not");
      return next(new ErrorHandler(`This number is not registerd`, 404));
    }

    res.status(201).json({
      type: "success",
      message: "OTP sended to your registered phone number",
      data: {
        userId: user._id,
      },
    });
    // generate otp
    const otp = generateOTP(6);
    // save otp to user collection
    user.phoneOtp = otp;
    user.isAccountVerified = true;
    await user.save();
    // send otp to phone number
    await fast2sms(
      {
        message: `Your OTP is ${otp}`,
        contactNumber: user.phone,
      },
      next
    );
  } catch (error) {
    next(error);
  }
};

//verify phone otp

exports.verifyPhoneOtp = async (req, res, next) => {
  try {
    const { otp, userId } = req.body;
    const user = await User.findById(userId);
    if (!user) {
      return next(new ErrorHandler("This User is not found", 404));
    }

    if (user.phoneOtp !== otp) {
      return next(new ErrorHandler("Incorrect OTP"));
    }

    const token = createJwtToken({ userId: user._id });
    
    user.phoneOtp = "";
    await user.save();

    res.status(201).json({
      type: "success",
      message: "OTP verified successfully",
      data: {
        token,
        userId: user._id,
      },
    });
  } catch (error) {
    next(error);
  }
};

// fetch current user
exports.fetchCurrentUser = async (req, res, next) => {
  try {
    const currentUser = res.locals.user;

    return res.status(200).json({
      type: "success",
      message: "fetch current user",
      data: {
        user: currentUser,
      },
    });
  } catch (error) {
    next(error);
  }
};

//  admin access only

exports.handleAdmin = async (req, res, next) => {
  try {
    const currentUser = res.locals.user;

    return res.status(200).json({
      type: "success",
      message: "Okay you are admin!!",
      data: {
        user: currentUser,
      },
    });
  } catch (error) {
    next(error);
  }
};
