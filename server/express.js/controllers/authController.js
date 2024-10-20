const User = require("../models/Users");
const CryptoJS = require("crypto-js");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const admin = require("firebase-admin");
const serviceAccount = require("../firebaseServiceAccountKey.json");

dotenv.config();

admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });

const verifyUserFirebase = async (userToken) => {
  try {
    const decodedToken = await admin.auth().verifyIdToken(userToken);
    // Token is valid
    // console.log("Decoded token:", decodedToken);
    return decodedToken;
  } catch (error) {
    // Token verification failed
    console.error("Error verifying token:", error);
    throw error;
  }
};

const verifyUser = (req, res, next) => {
  let token;

  if (req.body && req.body.token) {
    token = req.body.token;
  }

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    token = req.headers.authorization.substring(7); // Loại bỏ prefix "Bearer "
  }

  if (!token) {
    return res.status(401).json("The token was not available");
  } else {
    token = token.replace(/"/g, "");

    jwt.verify(
      token,
      process.env.JWT_SEC,
      { algorithm: "HS256" },
      (err, decoded) => {
        if (err) {
          // xác thực người dùng bằng firebase
          verifyUserFirebase(token)
            .then((decodedToken) => {
              // Token is valid, you can proceed with your logic
              // For example, you can get the UID of the user from decodedToken.uid
              console.log("Token is valid. User UID:", decodedToken.uid);
            })
            .catch((error) => {
              // Token verification failed
              console.error("Token verification failed:", error);
              return res.json("The token was wrong");
            });
        }

        console.log(decoded);
        req.decoded = decoded;
      }
    );
  }

  next();
};

// check email validation
const validateEmail = (email) => {
  const emailRegex = /\S+@\S+\.\S+/;
  return emailRegex.test(email);
};

const login = async (req, res) => {
  try {
    if (!validateEmail(req.body.email)) {
      return res.status(401).json("Invalid email");
    }

    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(401).json("Email not found");
    }

    const decryptedPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.SECRET
    );
    const pass = decryptedPassword.toString(CryptoJS.enc.Utf8);

    if (pass !== req.body.password) {
      return res.status(401).json("Wrong password");
    }

    const userToken = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role_id: user.role_id,
        status: user.status,
      },
      process.env.JWT_SEC,
      {
        expiresIn: "7d",
        algorithm: "HS256",
      }
    );

    const { __v, createdAt, updatedAt, ...userData } = user._doc;

    res.status(200).json({ ...userData, token: userToken });
  } catch (error) {
    console.log("Failed to login: ", error);
    res.status(500).json(error);
  }
};

const register = async (req, res) => {
  try {
    if (!validateEmail(req.body.email)) {
      return res.status(401).json("Invalid email");
    }

    const newUser = new User(req.body);
    const password = newUser.password;
    const encryptedPassword = CryptoJS.AES.encrypt(
      password,
      process.env.SECRET
    ).toString();

    newUser.password = encryptedPassword;
    await newUser.save();

    const userToken = jwt.sign(
      {
        id: newUser.id,
        email: newUser.email,
        role_id: newUser.role_id,
        status: newUser.status,
      },
      process.env.JWT_SEC,
      {
        expiresIn: "7d",
      }
    );

    const { __v, createdAt, updatedAt, ...userData } = newUser._doc;

    res.status(200).json({ ...userData, token: userToken });
  } catch (error) {
    console.error("Failed to register: ", error);
    res.status(500).json(error);
  }
};

module.exports = {
  login,
  register,
  verifyUser,
};
