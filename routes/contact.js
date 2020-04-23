// Routes infomation from the services file to render onto the index.ejs file.

const express = require('express');

const router = express.Router();



 module.exports = (params) => {

  const {feedbackService} = params;
  const {tourService} = params;



  router.post('/contact', async(req, res, next) => {
    try {
      const feedback = await feedbackService.getList(); 
      const topTours = await tourService.getList();
      const { firstName, lastName, email, message } = req.body
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

return router; 
};