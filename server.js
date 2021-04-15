const express = require('express');
const mongoose = require('mongoose');
//const { MONGO_URI } = require('./config');
const app = express();
const dotenv = require("dotenv");

dotenv.config();

// Routes
const branchesRoutes = require('./routes/api/branches');
const authRoutes = require('./routes/api/auth');



// Middleware 

app.use(express.json());



app.get('/', (req, res) => {
    res.send('Task Home Page')
});

// Connect to mongodb
mongoose.connect(process.env.DB_CONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
})
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

//User routes
app.use('/api/branches', branchesRoutes);
app.use('/api/user', authRoutes);


const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log('Server runnning'))