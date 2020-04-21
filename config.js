const path = require('path');

module.exports = {
    development: {
        sitename: 'Tour Melbourne [Development]',
        data: {
            tours: path.join(__dirname, 'data/tours.json'),
            feedback: path.join(__dirname, 'data/feedback.json'),
            users: path.join(__dirname, 'data/users.json'),
            contact: path.join(__dirname, 'data/contact.json')
        }

    },
    production: {
        sitename: 'Tour Melbourne',
        data: {
            speakers: path.join(__dirname, 'data/tours.json'),
            feedback: path.join(__dirname, 'data/feedback.json'),
            users: path.join(__dirname, 'data/users.json'),
            contact: path.join(__dirname, 'data/contact.json')
        }
    }
}