const express = require('express');

const toursRoute = require('./tours');
const feedbackRoute = require('./feedback');
// const contactRoute = require('./contact');


const router = express.Router();


module.exports = params => {

    const {tourService} = params;
    const {feedbackService} = params;
    const {personaliseService} = params; // Deconstructs personaliseService from param
    // const {contactService} = params; // Deconstructs personaliseService from param

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

 router.post('/contact', async(req, res, next) => {
    try {
      const feedback = await feedbackService.getList(); 
      const topTours = await tourService.getList();
      const { firstName, lastName, email, message } = req.body
      console.log(req.body);
      const user = req({ firstName, lastName, email, message })
      const ret = await user.save()
      res.json(ret)
      
      if(!firstName || !lastName || !email || !message){
          return res.render('layout', 
          {
            pageTitle: 'Welcome', template: 'index', feedback, topTours,
          });
      }

     // render the index.ejs page if feedback infomation was successfully sent otherwise error page will appear.
      return res.redirect('/?success=true')
  }catch(err){
      return next(err);
  }
});
 

router.use('/tours', toursRoute(params));
router.use('/feedback', feedbackRoute(params));
// router.use('/contact', contactRoute(params));

 return router;
};