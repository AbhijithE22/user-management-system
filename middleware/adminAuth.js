export const isAdminLogin = (req, res, next) => {
    if (!req.session.admin) {
        return res.redirect("/admin/login");
    }

    next();
};
export const isAdminGuest = (req, res, next) => {
    if (req.session.admin) {
        return res.redirect("/admin/dashboard");
    }

    next();
};