const { createUser, loginUser, getUser } = require("../services/userService");

module.exports.createuserController = async (req, res) => {
    const { userName, password } = req.body;
    const response = await createUser({ userName, password });
    res.status(response.status).send(response);
}

module.exports.loginuserController = async (req, res) => {
    const { userName, password } = req.body;
    const response = await loginUser({ userName, password });
    console.log(response);
    res.status(response.status).send(JSON.stringify(response));
}

module.exports.getuserController = async (req, res) => {
    const { id } = req.params;
    const response = await getUser(id);
    res.status(response.status).send(response);
}