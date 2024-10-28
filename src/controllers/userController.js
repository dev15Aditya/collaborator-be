const { createUser, loginUser } = require("../services/userService");

module.exports.createuserController = async (req, res) => {
    const { userName, password } = req.body;
    const response = await createUser({ userName, password });
    res.status(response.status).send(response.message);
}

module.exports.loginuserController = async (req, res) => {
    const { userName, password } = req.body;
    const response = await loginUser({ userName, password });
    res.status(response.status).send([response.userName, response.token, response.message]);
}