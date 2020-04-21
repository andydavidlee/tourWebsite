// Routes the information requested from the services files and renders them to the browser.

const express = require('express');

const router = express.Router();


module.exports = (params) => {

    const {tourService} = params;

    // requesting information from the services file in order to render the info pages.
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