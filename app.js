const express = require('express');
const app = express();
const PORT = 8000;
const cors = require('cors');
const { sequelize } = require('./models');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

const test = require('./routes/test');
app.use('/api', test);

const userRouter = require('./routes/user');
app.use('/', userRouter);

sequelize.sync({ force: true }).then(() => {
    app.listen(PORT, () => {
        console.log(`http://localhost:${PORT}`);
    });
});
