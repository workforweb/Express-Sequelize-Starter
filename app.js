require('dotenv').config();
const express = require('express');
const sequelize = require('./models');
const User = require('./models/users');

const app = express();

const port = process.env.SERVER_PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Add new User

app.post('/users', async (req, res) => {
  try {
    let { firstname, lastname, email } = req.body;

    firstname = firstname.toLowerCase().trim();
    lastname = lastname.toLowerCase().trim();
    email = email.toLowerCase().trim();

    const user = await User.create({ firstname, lastname, email });

    return res.status(201).json({ status: true, data: user });
  } catch (error) {
    res.status(500).json({
      status: false,
      errors: Object.values(error.errors).map((el) => el.message),
    });
  }
});

// List all Users

app.get('/users', async (req, res) => {
  try {
    const user = await User.findAll();
    return res.status(200).json({ status: true, data: user });
  } catch (error) {
    res.status(500).json({
      status: false,
      errors: Object.values(error.errors).map((el) => el.message),
    });
  }
});

// Search a single User

app.get('/users/:id', async (req, res) => {
  try {
    const user = await User.findAll({ where: { id: req.params.id } });
    return res.status(200).json({ status: true, data: user });
  } catch (error) {
    res.status(500).json({
      status: false,
      errors: Object.values(error.errors).map((el) => el.message),
    });
  }
});

// Update an User

app.put('/users/:id', async (req, res) => {
  try {
    let { firstname, lastname, email } = req.body;

    firstname = firstname.toLowerCase().trim();
    lastname = lastname.toLowerCase().trim();
    email = email.toLowerCase().trim();

    const id = parseInt(req.params.id, 10);
    if (Number.isNaN(id)) return res.status(400).end();

    const isUserExist = await User.findOne({ where: { id } });

    if (!isUserExist)
      return res.status(404).json({ status: false, error: 'No User' });

    const user = await User.findByPk(id);

    user.firstname = firstname ? firstname : user.firstname;
    user.lastname = lastname ? lastname : user.lastname;
    user.email = email ? email : user.email;

    const updatedUser = await user.save();

    return res.status(200).json({ status: true, data: updatedUser });
  } catch (error) {
    res.status(500).json({
      status: false,
      errors: error,
    });
  }
});

// Delete an User

app.delete('/users/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (Number.isNaN(id)) return res.status(400).end();

    const isUserExist = await User.findOne({ where: { id } });

    if (!isUserExist)
      return res.status(404).json({ status: false, error: 'No User' });

    const user = await User.findByPk(id);

    await user.destroy();
    return res
      .status(200)
      .json({ status: true, msg: 'User deleted successfully!' });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: false,
      errors: error,
    });
  }
});

app.listen(port, async () => {
  try {
    await sequelize.authenticate();
    // await sequelize.sync({ force: true, logging: console.log });
    console.log(`Server started on http://localhost:${port}`);
    console.log('Database connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
});
