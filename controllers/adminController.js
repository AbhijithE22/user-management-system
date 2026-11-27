import User from "../models/UserModel.js";
import bcrypt from "bcrypt";

export const loadLogin = (req, res) => {
  res.render("admin/login.ejs", {
    error: null,
  });
};
export const loadDashboard = async (req, res) => {
  try {
    const search = req.query.search || "";

    const users = await User.find({
      $or: [
        {
          fullName: {
            $regex: search,
            $options: "i",
          },
        },
        {
          email: {
            $regex: search,
            $options: "i",
          },
        },
      ],
    });

    res.render("admin/dashboard", {
      users,
      search,
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.redirect("/admin/dashboard");
  } catch (error) {
    console.log(error);
    res.redirect("/admin/dashboard");
  }
};

export const loadAddUser = (req, res) => {
  
  res.render("admin/addUser.ejs", {
  error: null,
});
};

export const addUser = async (req, res) => {
  try {
    const {
      fullName,
      email,
      phone,
      password,
      status,
    } = req.body;

    // Validation

    if (
      !fullName ||
      !email ||
      !phone ||
      !password
    ) {
      return res.render("admin/addUser", {
        error: "All fields are required",
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.render("admin/addUser", {
        error: "Email already exists",
      });
    }

    if (email === process.env.ADMIN_EMAIL) {
      return res.render("admin/addUser", {
        error: "Cannot use admin email",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      fullName,
      email,
      phone,
      password: hashedPassword,
      status,
    });

    res.redirect("/admin/dashboard");
  } catch (error) {
    console.log(error);

    res.render("admin/addUser", {
      error: "Something went wrong",
    });
  }
};
export const LoadEditUser = async (req, res) => {
  const user = await User.findById(req.params.id);
  res.render("admin/editUser.ejs", { user });
};
export const updateUser = async (req, res) => {
  try {
    const { fullName, email, phone, status } = req.body;

    // Prevent using the admin email
    if (email === process.env.ADMIN_EMAIL) {
      const user = await User.findById(req.params.id);

      return res.render("admin/editUser", {
        user,
        error: "Cannot use admin email",
      });
    }

    await User.findByIdAndUpdate(req.params.id, {
      fullName,
      email,
      phone,
      status,
    });

    res.redirect("/admin/dashboard");
  } catch (error) {
    console.log(error);
    res.redirect("/admin/dashboard");
  }
};

export const Login = async (req, res) => {
  const { email, password } = req.body;
  if (
    email !== process.env.ADMIN_EMAIL ||
    password !== process.env.ADMIN_PASSWORD
  ) {
    return res.render("admin/login", {
      error: "Invalid email or password",
    });
  }

  req.session.admin = {
    email: process.env.ADMIN_EMAIL,
  };

  res.redirect("/admin/dashboard");
};
export const logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.redirect("/admin/dashboard");
    }

    // Remove the session cookie from the browser
    res.clearCookie("connect.sid");

    // Redirect to login page
    res.redirect("/admin/login");
  });
};
