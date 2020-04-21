const express = require('express');

const toursRoute = require('./tours');
const feedbackRoute = require('./feedback');


const router = express.Router();


module.exports = params => {

    const {tourService} = params;
    const {feedbackService} = params;
    const {personaliseService} = params; // Deconstructs personaliseService from param

    // Requesting infomation from both the tours and feedback routes pages in order to render the index page.
    router.get('/', async(request, response, next) => {
        try  {
            const topTours = await tourService.getTopTours();
            const feedback = await feedbackService.getList();
            const usersFavouriteTours = await personaliseService.getUsersFavouriteTours("Andrew_Lee");
            const favouriteTour = await tourService.getTopTours(usersFavouriteTours); //  Selects the ejs file to render and passes in the data for the page a JSON
            return response.render('layout', { pageTitle: 'Welcome', template: 'index', topTours: favouriteTour, feedback });
        } catch(err) {
            return next(err);
        }; 
 });
 

router.use('/tours', toursRoute(params));
router.use('/feedback', feedbackRoute(params));

 return router;
};