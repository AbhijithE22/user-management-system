export const isGuest = (req, res, next) => {
  if (req.session.user) {
    return res.redirect("/home");
  }

  next();
};

export const isLogin = (req, res, next) => {
  if (!req.session.user) {
    return res.redirect("/login");
  }

  next();
};
