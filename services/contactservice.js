const fs = require('fs');
const util = require('util');

const writeFile = util.promisify(fs.writeFile);

/**
 * Logic for reading and writing feedback data
 */
class ContactService {
  /**
   * Constructor
   * @param {*} datafile Path to a JSOn file that contains the feedback data
   */
  constructor(datafile) {
    this.datafile = datafile;
  }

  /**
   * Add a new feedback item
   * @param {*} fbFirstName First name of the user
   * @param {*} fbLastName Last name of the user
   * @param {*} fbEmail Email of the user
   * @param {*} fbMessage The feedback message
   */
  async addEntry(fbFirstName, fbLastName, fbEmail, fbMessage) {
    const data = (await this.getData()) || [];
    data.unshift({ fbFirstName, fbLastName, fbEmail, fbMessage });
    return writeFile(this.datafile, JSON.stringify(data));
  }
}

module.exports = ContactService;