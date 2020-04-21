// Routes infomation from the services file to render onto the index.ejs file.

const express = require('express');

const router = express.Router();



 module.exports = (params) => {

  const {feedbackService} = params;
  const {tourService} = params;



 router.post('/', async(req, res, next) => {
     // requesting information from the feedback services file in order to render the info pages.
  try {
      const feedback = await feedbackService.getList(); 
      const topTours = await tourService.getList();

      const name = req.body.name.trim();
      const title = req.body.title.trim();
      const message = req.body.message.trim();

      if(!name || !title || !message){
          return res.render('layout', 
          {
            pageTitle: 'Welcome', template: 'index',
              error: true,
              name,
              title,
              message,
              feedback,
              topTours,
          });
      }
     // adds information to the feedback.json file.
      await feedbackService.addEntry(name, title, message);

     // render the index.ejs page if feedback infomation was successfully sent otherwise error page will appear.
      return res.redirect('/?success=true')
  }catch(err){
      return next(err);
  }
});

return router; 
};