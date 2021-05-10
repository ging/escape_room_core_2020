var express = require('express');
var router = express.Router();
var virusController = require('../controllers/virusController');
var trialController = require('../controllers/trialController');
var sessionController = require('../controllers/sessionController');

/*********************************************************** NO TOCAR ****************************************************************/
router.all('*', sessionController.deleteExpiredUserSession)

router.get('/', sessionController.new);
router.delete('/', sessionController.destroy);

router.get('/dashboard',                         virusController.index);
router.get('/virus/:virusId',                    virusController.show);
router.get('/virus/:virusId/trials',             trialController.index);
router.get('/virus/:virusId/successfulTrials',   trialController.indexSuccess);
router.get('/trials/:trialId',                   trialController.show);
router.post('/trials/:trialId/download',         trialController.download);
/*************************************************************************************************************************************/

module.exports = router;
