const express = require('express');
const sequelize = require('./common/database');
const authRoutes = require('./auth/routes');
const app = express();
const defineUser = require('./common/models/User');
const User = defineUser(sequelize);
const PORT = process.env.PORT || 3000;
const userRoutes = require('./users/route');

sequelize.sync();

app.use(express.json());
app.use('/', authRoutes);
app.use('/user', userRoutes);
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    error: 'Something went wrong'
  });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

app.get('/status', (req, res) => {
  res.json({
    status: 'Running',
    timestamp: new Date().toISOString()
  });
});