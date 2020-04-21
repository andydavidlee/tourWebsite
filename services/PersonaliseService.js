// 1. Add the following code then open server>index.js
const fs = require('fs');
const util = require('util');

const readFile = util.promisify(fs.readFile);

// New Class
class PersonaliseService {
  // Passes the data into the constructor 
  constructor(datafile) {
    this.datafile = datafile;
  }

  // Returns a list of all the data
  async getList() {
    const data = await this.getData();
    return data;
  }

  // Reads the data in the text file and returns it
  async getData() {
    const data = await readFile(this.datafile, 'utf8');
    if (!data) return [];
    return JSON.parse(data);
  }

  // Takes the users short name and returns the users favorite artist
  async getUsersFavouriteTours(shortname){
    const data = await this.getData();
    const user = data.users.find((user) => {
        return user.shortname === 'Andrew_Lee';
    });

    if(!user || !user.favouriteTours) return null;
    return user.favouriteTours; 
  }
}

module.exports = PersonaliseService; // Exports the services 