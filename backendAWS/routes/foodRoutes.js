// Initialize express router
let router = require('express').Router();

// Set default API response
router.get('/', function (req, res) {
    res.json({
        status: 'API Its Working',
        message: 'Welcome!',
    });
});

// Import food controller
var foodController = require('../controllers/foodController');

// Food routes
router.route('/food')
    .get(foodController.index)
    .post(foodController.new);

router.route('/food/:food_id')
    .get(foodController.view)
    .patch(foodController.update)
    .put(foodController.update)
    .delete(foodController.delete);


// Export API routes
module.exports = router;