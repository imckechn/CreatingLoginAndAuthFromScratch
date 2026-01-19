const express = require('express');
const sequelize = require('./common/database');
const defineUser = require('./common/models/User');
const User = defineUser(sequelize);
const authRoutes = require('./auth/routes');
const app = express();

app.use('/', authRoutes);
app.use(express.json());

sequelize.sync();

app.get('/status', (req, res) => {
  res.json({
    status: 'Running',
    timestamp: new Date().toISOString()
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));