const express = require('express');

const router = express.Router();



 module.exports = (params) => {

  const {feedbackService} = params;
  const {tourService} = params;



 router.post('/', async(req, res, next) => {
        
  try {
      console.log(req.body)
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
     
      await feedbackService.addEntry(name, title, message);

     
      return res.redirect('/?success=true')
  }catch(err){
      return next(err);
  }
});

return router; 
};