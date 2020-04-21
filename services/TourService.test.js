// As we are testing the TourService functions, we need to import this.
const TourService = require('./tourservices');
// add in the configs for testing
const configs = require('../config');

const config = configs['development'];

// We need to create a new instance of the class - pass through the file.
const tourService = new TourService(config.data.tours);

// We need to construct our test. 
// First test is returning an array of titles and short names.
test('getTitles should return an array of titles and shortnames', async () => {
  const titles = await tourService.getTitles();
  expect(titles).toStrictEqual(
    [{
      "title": "GRAFFITI ART",
        "shortname": "grafitti_art",
},{
   "title":"PARKLANDS",
   "shortname": "parklands",
},{
    "title":"NGV",
    "shortname": "ngv",
 },{
    "title":"FLINDERS STREET",
    "shortname": "flinders_street",
    }]);
})

// The second test returns selected details of the tours using the tours shortname.
test('Return details from a site shortname', async () => {
  const tour = await tourService.getTour("grafitti_art");
  expect(tour).toStrictEqual(
    {
      "title": "GRAFFITI ART",
        "shortname": "grafitti_art",
        "description": "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis non odio bibendum, porttitor lectus et, lacinia elit. Sed id risus erat. Fusce congue nibh vitae odio elementum, et rutrum quam facilisis. Maecenas cursus sollicitudin ante vel auctor. Sed non blandit ex, eu ultricies nibh. Mauris purus nisi, cursus vitae iaculis ut, malesuada et quam. Cras elementum diam eget felis ornare, id dignissim quam varius. Nulla vitae diam quis dui pulvinar aliquet quis ac nisl.</p><p>Duis vestibulum volutpat massa ut placerat. Vivamus blandit gravida fermentum. Mauris elementum condimentum ante, vel vehicula velit bibendum congue. Morbi porttitor tellus ut tortor auctor sollicitudin. Quisque auctor sit amet quam a volutpat. Curabitur euismod justo vel arcu volutpat tempus. Donec molestie commodo augue, id tincidunt ante vulputate a. Fusce condimentum tincidunt elit, nec fermentum mi facilisis a. Suspendisse ligula dui, facilisis non commodo et, suscipit quis ante. Fusce cursus sodales vestibulum. Sed a lacinia dui. Sed sed nunc nunc. Phasellus id porta augue. Sed pharetra blandit nulla, non rhoncus augue. Integer ut diam sodales, consectetur massa at, consequat velit.</p>",
        "banner":["grafittiartbanner.jpg"]
    }
  )
});