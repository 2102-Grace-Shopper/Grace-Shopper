const usersRouter = require('express').Router();
const {createUser,
    getAllUsers,
    getUserByEmail,
    updateUser,
    getUserByUsername,
    registerUser,
    loginUser} = require("../db/users")

const {getToken} = require('./userToken')

usersRouter.get("/", async (req, res, next) => {

    try {
        const users = await getAllUsers()
    
    res.send(users)
    } catch (error) {
        throw error
    }
});

usersRouter.get("/:username", async (req, res, next) => {
    const {username} = req.params;
    const user = await getUserByUsername(username);

    res.send(user);
});

usersRouter.post('/register', async (req, res, next) => {
    const { username, password } = req.body
    const user = await registerUser({username, password})

    if(user) {
        const token = getToken(user.username, user.id)
        res.send({
            message: "You have successfully registered an account! Please log in.",
            user: {
                id: user.id,
                username: user.username
            },
            token
        })
    }else{
        res.status(401).send({message: "Unable to register an account. Please try again."}) 
    }
});

usersRouter.post('/login', async (req, res, next) => {
    const { username, password } = req.body;
    const user = await loginUser(username, password);

    if (user) {
        const token = getToken(user.username, user.id);

        res.send({
            message: "You are now logged in.",
            user: {
                id: user.id,
                username: user.username
            },
            token
        })
    }else {
        res.status(401).send({message: "User not found. Please try again."});
    }
});

module.exports = usersRouter