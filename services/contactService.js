// Pulls required data from the feedback.json file and organises it for rendering on pages.
const fs = require('fs');
const util = require('util');

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

/**
 * Logic for reading and writing feedback data
 */
class ContactService {
  /**
   * Constructor
   * @param {*} datafile Path to a JSON file that contains the feedback data
   */
  constructor(datafile) {
    this.datafile = datafile;
  }

  
  async addEntry(firstName, lastName, email, message) {
    const data = (await this.getData()) || [];
    data.unshift({ firstName, lastName, email, message });
    return writeFile(this.datafile, JSON.stringify(data));
  }

  /**
   * Fetches feedback data from the JSON file provided to the constructor
   */
  async getData() {
    const data = await readFile(this.datafile, 'utf8');
    if (!data) return [];
    return JSON.parse(data);
  }
}

module.exports = ContactService;