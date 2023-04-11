const { MongoClient } = require('mongodb');

class DBClient {
  constructor() {
    this.DB_HOST = process.env.DB_HOST || 'localhost';
    this.DB_PORT = process.env.DB_PORT || 27017;
    this.DB_DATABASE = process.env.DB_DATABASE || 'Twygo';
    // mongodb+srv://Tiazzy:Tiazzy123@cluster0.qxccq75.mongodb.net/test
    // mongodb://${this.DB_HOST}:${this.DB_PORT}
    this.client = new MongoClient(`mongodb+srv://Boom:oolZaBtJ46RJi8HN@cluster0.9yxqrd1.mongodb.net/?retryWrites=true&w=majority`, { useUnifiedTopology: true });
    this.connected = false;
    this.client.connect().then((conn) => {
      this.connected = true;
      this.db = conn.db(this.DB_DATABASE);
    }, (err) => {
      console.log(err);
    });
  }

  isAlive() {
    return this.connected;
  }
}

const dbClient = new DBClient();
module.exports = {dbClient};
