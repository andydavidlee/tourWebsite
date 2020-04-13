const express = require('express');

const router = express.Router();


module.exports = (params) => {

    const {tourService} = params;

    // router.get('/', async (req, response) => {
        // const tours = await tourService.getList();
        // response.render('/pages', { pageTitle: 'Tours', template: 'tours', tours });
    // return response.json(tours);
// });

router.get('/:shortname', async(request, response, next) => {
    try {
        const tour = await tourService.getTour(request.params.shortname);
        const thumbnails = await tourService.getArtworkForTour(request.params.shortname);
        return response.render('layout', { pageTitle: 'Tours', template: 'tour-detail', tour, thumbnails});
    } catch(err) {
    return next(err);
    }
});

return router;
};