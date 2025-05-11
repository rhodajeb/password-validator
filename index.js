const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const port=3000;
const app = express();

app.use(express.json());

const users = [];

const SECRET_KEY ='your_secret_key';

app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ message:'username and pasword are required'})
    }
    const hashedpassword = await bcrypt.hash(password, 10);
    users.push({ username, password: hashedpassword});
    res.status(201).send('user registered successfully');
}
);
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = user.find(u => u.username === username);
    if (!user) {
        return res.status(401).json({ message: 'invalid credentials'});
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(401).json({ message:'invalid credentials'});
    }
    const token = jwt.sign({ username }, SECRET_KEY, { expiresin: '1h' });
    res.json ({token});
}
);
app.get('/dashboard', (req, res) => {
    const authHearder = req.headers.authorization;
    if (!authHeader) return res.status(401).send('No token provided');

    const token = authHeader.split(' ')[1];
    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) return res.status(403).send('Invalid token');
        req.send(`Welcome to your dashboard, ${user.username}`);
    });
});

app.listen(port,() => {
    console.log('server is running at port, ${port}');
});