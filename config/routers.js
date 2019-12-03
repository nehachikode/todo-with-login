module.exports = app => {
    app.use("/", require("../routes/index"));
    app.use("/user", require("../routes/user"));
};
