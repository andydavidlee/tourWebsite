// Routes infomation from the services file to render onto the index.ejs file.

const express = require('express');

const router = express.Router();



 module.exports = (params) => {

  const {feedbackService} = params;
  const {tourService} = params;



  router.post('/', async(req, res, next) => {
    try {
      const feedback = await feedbackService.getList(); 
      const topTours = await tourService.getList();

      const firstName = req.body.firstName.trim();
      const lastName = req.body.lastName.trim();
      const email = req.body.email.trim();
      const message = req.body.message.trim();
      
      if(!firstName || !lastName || !email || !message){
          return res.render('layout', 
          {
            pageTitle: 'Welcome', template: 'index', 
            feedback, 
            topTours,
            firstName,
            lastName,
            email,
            message,
          });
      }

     // render the index.ejs page if feedback infomation was successfully sent otherwise error page will appear.
      return res.redirect('/?success=true')
  }catch(err){
      return next(err);
  }
});

return router; 
};