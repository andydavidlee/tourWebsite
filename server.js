const express = require('express');
const path = require('path');
// const createError = require('http-errors');

const bodyParser = require('body-parser');

const FeedbackService = require('./services/feedbackservice');
const TourService = require('./services/tourservices');
const ContactService = require('./services/contactservice');


const feedbackService = new FeedbackService('./data/feedback.json');
const tourService = new TourService('./data/tours.json');
const contactService = new ContactService('./data/contact.json');

const routes = require('./routes');

const app = express();

const port = 3000;

app.use(bodyParser.urlencoded({extended: true}));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views'));

app.locals.siteName = 'Tour Melbourne!';

app.use(express.static(path.join(__dirname, './static')));

app.use(async (request, response, next) => {
    
    try {
        const titles = await tourService.getTitles();
        response.locals.tourNames = titles;
        return next();
    } catch (err) {
        return next(err);
    }
});

app.use('/', routes({
    feedbackService,
    tourService,
    contactService,
}));

// app.use((request, response, next) => {
   // return next(createError(404, 'File not found!'));
// });

// app.use((err, request, response, next) => {
   // response.locals.message = err.message;
   // const status = err.status || 500;
   // response.locals.status = status;
   // response.status(status);
   // response.render('error');
// });

app.listen(port, () => {
    console.log(`Express server listening on port ${port}!`);
});