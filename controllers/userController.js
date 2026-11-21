import User from "../models/userModel.js";
import bcrypt from "bcrypt";

export const loadLogin = (req, res) => {
  res.render("user/login.ejs", {
    error: null,
  });
};

export const loadSignup = (req, res) => {
  res.render("user/signup.ejs", {
    error: null,
  });
};

export const loadHome = (req, res) => {
  res.render("user/home.ejs", {
    user: req.session.user,
  });
};

export const logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.redirect("/home");
    }

    // Remove the session cookie from the browser
    res.clearCookie("connect.sid");

    // Redirect to login page
    res.redirect("/login");
  });
};

export const signup = async (req, res) => {
  try {
    const { fullName, email, phone, password, confirmPassword, status } =
      req.body;

    if (email === process.env.ADMIN_EMAIL) {
      return res.render("user/signup", {
        error: "This email cannot be used for registration.",
      });
    }
    if (!fullName || !email || !phone || !password || !confirmPassword) {
      return res.render("user/signup", {
        error: "All fields are required",
      });
    }

    if (password !== confirmPassword) {
      return res.render("user/signup", {
        error: "Passwords do not match",
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.render("user/signup", {
        error: "Email already exists",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      fullName,
      email,
      phone,
      password: hashedPassword,
      status: "Active",
    });

    res.redirect("/login");
  } catch (error) {
    console.log(error);
    res.render("user/signup", {
      error: "Something went wrong",
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.render("user/login", {
        error: "User not found",
      });
    }
    if (user.status === "Inactive") {
      return res.render("user/login", {
        error:
          "Your account has been deactivated. Please contact the administrator.",
      });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.render("user/login", {
        error: "invalid password",
      });
    }
    req.session.user = {
      id: user._id,
      name: user.fullName,
      email: user.email,
    };

    res.redirect("/home");
  } catch (error) {
    console.log(error);
    res.render("user/login", {
      error: "Something went wrong",
    });
  }
};
