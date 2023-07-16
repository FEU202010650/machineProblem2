const express = require('express');
const router = express.Router();
const userController = require('../controllers/userControllers');
const auth = require('../auth');

router.post('/checkEmail', (req, res) => {
  userController.checkEmailExists(req.body)
    .then(resultfromController => res.send(resultfromController));
});

// route for user registration
router.post('/register', (req, res) => {
  userController.registerUser(req.body)
    .then(resultfromController => res.send(resultfromController));
});

// route for user authentication
router.post('/login', (req, res) => {
  userController.loginUser(req.body)
    .then(resultfromController => res.send(resultfromController));
});

// route for retrieving user details
router.get('/details', auth.verify, (req, res) => {
  const userData = auth.decode(req.headers.authorization);
  userController.getProfile(userData.id)
    .then(resultFromController => res.send(resultFromController));
});

router.patch('/setAdmin/:userId', auth.verify, auth.isAdmin, (req, res) => {
  userController.setAdmin(req.params.userId)
    .then(resultFromController => res.send(resultFromController));
});

module.exports = router;
