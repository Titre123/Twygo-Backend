const {dbClient} = require('./db')

class Verification {
  
    // query through the user collection and get a single user based on a query
  static async findCode(query) {
    if (dbClient.isAlive() === true) {
      const collection = dbClient.db.collection('verification_codes');
      const data = await collection.findOne(query);
      return data;
    }
    return null;
  }

  //   insert into the database a new user
  static async insertCode(obj) {
    if (dbClient.isAlive() === true) {
      const collection = dbClient.db.collection('verification_codes');
      const data = await collection.insertOne(obj);
      return data;
    }
    return null;
  }

  //   delete user that match the query parameter
  static async deleteCode(query) {
    if(dbClient.isAlive() === true) {
      const collection = dbClient.db.collection('verification_codes');
      const data = await collection.deleteMany(query);
    }
  }
}

module.exports = {Verification};