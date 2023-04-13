const {dbClient} = require('./db')

class Project {
  
    // query through the user collection and get a single user based on a query
  static async findProject(query) {
    if (dbClient.isAlive() === true) {
      const collection = dbClient.db.collection('projects');
      const data = await collection.findOne(query);
      return data;
    }
    return null;
  }

    // query through the user collection and get a all user based on a query
  static async findProjects(query) {
    if (dbClient.isAlive() === true) {
      const collection = dbClient.db.collection('projects');
      const data = await collection.find(query).toArray();
      return data;
    }
    return null;
  }

//   insert into the database a new project
  static async insertProject(project) {
    if (dbClient.isAlive() === true) {
      const collection = dbClient.db.collection('projects');
      const data = await collection.insertOne(project);
      return data;
    }
    return null;
  }

//   update a project with an existing or a new field
  static async updateProject(project, changes) {
    if (dbClient.isAlive() === true) {
      const collection = dbClient.db.collection('projects');
      const data = await collection.findOneAndUpdate(
        {_id: project._id},
        {$set: changes},
        {returnNewDocument: true}
      );
      return data.value;
    }
  }

//   delete projects that match the query parameter
  static async deleteProject(query) {
    if(dbClient.isAlive() === true) {
      const collection = dbClient.db.collection('projects');
      const data = await collection.deleteMany(query);
    }
  }

  // count all projects
  static async countProjects(query) {
    if(dbClient.isAlive() === true) {
      const collection = dbClient.db.collection('projects');
      const count = await collection.countDocuments(query);
      return count;
    }
  }
}

module.exports = {Project};