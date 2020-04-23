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
   * @param {*} firstName First name of the user
   * @param {*} lastName Last name of the user
   * @param {*} email Email of the user
   * @param {*} message The feedback message
   */
  async addEntry(firstName, lastName, email, message) {
    const data = (await this.getData()) || [];
    data.unshift({ firstName, lastName, email, message });
    return writeFile(this.datafile, JSON.stringify(data));
  }
}

module.exports = ContactService;