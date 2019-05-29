// implement your API here
const express = require('express');

const Db = require('./data/db.js');

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
    res.send('Welcome to Hobbiton');
})


//getting all users
server.get('/api/users', (req, res) => {
    Db.find(req.body)
        .then(users => {
            res.status(200).json(users);
        })
        .catch(error => {
            res.status(500).json({ error: "The users information could not be retrieved." })
        })
})

//getting users by id
server.get('/api/users/:id', async (req, res) => {
    try {
        const user = await Db.findById(req.params.id)

        if (user) {
            res.status(200).json(user)
        }
        else {
            res.status(404).json({ message: "The user with the specified ID does not exist." })
        }
    }

    catch (error) {
        res.status(500).json({ error: "The users information could not be retrieved." })
    }
})

//adding users
server.post('/api/users', async (req, res) => {
    try {
        if (req.body.name !== '' || req.body.bio !== '') {
            const user = await Db.insert(req.body)
            res.status(201).json(user)
        }
        else {
            res.status(400).json({ errorMessage: "Please provide name and bio for the user." })
        }
    }
    catch (error) {
        res.status(500).json({ error: "There was an error while saving the user to the database" })
    }
})

//delete user by id
server.delete('/api/users/:id', async (req, res) => {
    try {
        const user = await Db.remove(req.params.id)
        if (user) {
            res.status(200).json(user)
        }
        else {
            res.status(404).json({ message: "The user with the specified ID does not exist." })
        }

    }
    catch (error) {
        res.status(500).json({ error: "The user could not be removed" })
    }
})

//update user by id
server.put('/api/users/:id', async (req, res) => {
    try {
        if (req.body.name !== '' && req.body.bio !== '') {
            const user = await Db.update(req.params.id, req.body)
            if (user) {
                res.status(200).json(user)
            }
            else {
                res.status(404).json({ message: "The user with the specified ID does not exist." })
            }
        }
        else {
            res.status(400).json({ errorMessage: "Please provide name and bio for the user." })
        }
    }
    catch (error) {
        res.status(500).json({ error: "There was an error while saving the user to the database" })
    }

})

server.listen(8000, () => console.log('API runnning on port 8000'))