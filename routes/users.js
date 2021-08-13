const usersRouter = require('express').Router();
const {createUser,
    getAllUsers,
    getUserByUsername,
    getUserById,
    loginUser} = require("../db/users")

const {createJWT} = require('./UserToken')

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

usersRouter.get("/:userid", async (req, res, next) => {
    const {userId} = req.params;
    const user = await getUserById(userId);

    res.send(user);
});

usersRouter.post('/register', async (req, res, next) => {

    const { username, password, email, firstName, isAdmin, lastName } = req.body;
    const user = await createUser({username, password, email, firstName, isAdmin, lastName});

    


    if (!user) {
        res.status(401).send({message: "User could not be registered."});
    } else {
        const token = createJWT(user.username, user.id);

        res.send({
            message: "Registration Successful.",
            user: {
                id: user.id,
                username: user.username
            },
            token
        })
    }
})

usersRouter.post('/login', async (req, res, next) => {
    const { username, password } = req.body;
    console.log("this is rec:", req.body)
    const user = await loginUser(username, password);

    if (!user) {
        res.status(401).send({message: "User not found."});
    } else {
        const token = createJWT(user.username, user.id);

        res.send({
            message: "Login Successful.",
            user: {
                id: user.id,
                username: user.username,
            },
            token
        })
        console.log("this is send:", res.send)
    }
})

usersRouter.get('/whoami', (req, res, next) => {
    if (req.user) {
        res.send({user: req.user})
    } else {
        res.status(401).send({message: 'You are not a registered user or authenticated user.'})
    }
})

module.exports = usersRouter