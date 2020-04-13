const fs = require("fs");
const util = require("util");


const readFile = util.promisify(fs.readFile);


class TourService {
  /**
   * Constructor
   * @param {*} datafile Path to a JSOn file that contains the speakers data
   */
  constructor(datafile) {
    this.datafile = datafile;
  }

  /**
   * Returns a list of speakers name and short name
   */
  async getTitles() {
    const data = await this.getData();

    // We are using map() to transform the array we get into another one
    return data.map(tour => {
      return { title: tour.title, shortname: tour.shortname };
    });
  }

  /**
   * Get speaker information provided a shortname
   * @param {*} shortname
   */
  async getTour(shortname) {
    const data = await this.getData();
    const tour = data.find(elm => {
      return elm.shortname === shortname;
    });
    if (!tour) return null;
    return {
      title: tour.title,
      shortname: tour.shortname,
      description: tour.description,
      banner: tour.banner
    };
  }

  /**
   * Returns a list of speakers with only the basic information
   */
  async getListShort() {
    const data = await this.getData();
    return data.map(tour => {
      return {
        shortname: tour.shortname,
        title: tour.title
      };
    });
  }

  /**
   * Get a list of speakers
   */
  async getList() {
    const data = await this.getData();
    return data.map(tour => {
      return {
        title: tour.title,
        shortname: tour.shortname,
        summary: tour.summary,
        card: tour.card
      };
    });
  }

  /**
   * Fetches speakers data from the JSON file provided to the constructor
   */
  async getData() {
    const data = await readFile(this.datafile, "utf8");
    return JSON.parse(data).tours;
  }

  /**
   * Get all artwork of a given speaker
   * @param {*} shortname The speakers short name
   */
  async getArtworkForTour(shortname) {
    const data = await this.getData();
    const tour = data.find(elm => {
      return elm.shortname === shortname;
    });
    if (!tour || !tour.thumbnails) return null;
    return tour.thumbnails;
  

  }

}

module.exports = TourService;