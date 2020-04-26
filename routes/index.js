const express = require('express');

const toursRoute = require('./tours');
const feedbackRoute = require('./feedback');
const contactRoute = require('./contact');


const router = express.Router();


module.exports = params => {

    const {tourService} = params; // Deconstructs tourService from param
    const {feedbackService} = params; // Deconstructs feedbackService from param
    const {personaliseService} = params; // Deconstructs personaliseService from param

    // Requesting infomation from both the tours and feedback routes pages in order to render the index page.
    router.get('/', async(request, response, next) => {
        try  {
            const feedback = await feedbackService.getList();
            const usersFavouriteTours = await personaliseService.getUsersFavouriteTours("Andrew_Lee");
            const favouriteTour = await tourService.getTopTours(usersFavouriteTours); //  Selects the ejs file to render and passes in the data for the page a JSON
            console.log(favouriteTour);
            return response.render('layout', { pageTitle: 'Welcome', template: 'index', topTours: usersFavouriteTours, feedback });
        } catch(err) {
            return next(err);
        }; 
 });
 

router.use('/tours', toursRoute(params));
router.use('/feedback', feedbackRoute(params));
router.use('/contact', contactRoute(params));

 return router;
};