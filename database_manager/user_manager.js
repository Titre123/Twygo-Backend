const {dbClient} = require('./db')

class User {
  
    // query through the user collection and get a single user based on a query
  static async findUser(query) {
    if (dbClient.isAlive() === true) {
      const collection = dbClient.db.collection('users');
      const data = await collection.findOne(query);
      return data;
    }
    return null;
  }

    // query through the user collection and get a all user based on a query
  static async findUsers(query) {
    if (dbClient.isAlive() === true) {
      const collection = dbClient.db.collection('users');
      const data = await collection.find(query).toArray();
      return data;
    }
    return null;
  }

//   insert into the database a new user
  static async insertUser(user) {
    if (dbClient.isAlive() === true) {
      const collection = dbClient.db.collection('users');
      const data = await collection.insertOne(user);
      return data;
    }
    return null;
  }

//   update a user with an existing or a new field
  static async updateUser(user, changes) {
    if (dbClient.isAlive() === true) {
      const collection = dbClient.db.collection('users');
      const data = await collection.findOneAndUpdate(
        {_id: user._id},
        {$set: changes},
        {returnNewDocument: true}
      );
      return data.value;
    }
  }

//   delete user that match the query parameter
  static async deleteUser(query) {
    if(dbClient.isAlive() === true) {
      const collection = dbClient.db.collection('users');
      const data = await collection.deleteMany(query);
    }
  }
}

module.exports = {User};