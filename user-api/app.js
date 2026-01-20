const express = require('express');
const sequelize = require('./common/database');
const authRoutes = require('./auth/routes');
const app = express();
const defineUser = require('./common/models/User');
const User = defineUser(sequelize);

app.use(express.json());
app.use('/', authRoutes);

sequelize.sync();

app.get('/status', (req, res) => {
  res.json({
    status: 'Running',
    timestamp: new Date().toISOString()
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));