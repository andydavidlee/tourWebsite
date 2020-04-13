const express = require('express');

const toursRoute = require('./tours');
const feedbackRoute = require('./feedback');


const router = express.Router();


module.exports = params => {

    const {tourService} = params;
    const {feedbackService} = params;

    router.get('/', async(request, response, next) => {
        try  {
            const topTours = await tourService.getList();
            const feedback = await feedbackService.getList();
            return response.render('layout', { pageTitle: 'Welcome', template: 'index', topTours, feedback });
        } catch(err) {
            return next(err);
        }; 
 });
 

router.use('/tours', toursRoute(params));
router.use('/feedback', feedbackRoute(params));

 return router;
};