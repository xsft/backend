const router = require('express').Router();
const authRoutes = require('./auth/routes/authRoutes');

router.use('/auth', authRoutes);

module.exports = router;
