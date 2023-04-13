const {Project} = require('../database_manager/project_manager');
const {User} = require('../database_manager/user_manager');
const {ObjectId} = require('mongodb');
const jwt = require('jsonwebtoken');

// get project be id
async function findProjectById(projectId) {
  return await Project.findProject({ _id: new ObjectId(projectId) });
}

// get a user from the database based on the Id
async function findUserById(userId) {
  return await User.findUser({ _id: new ObjectId(userId) });
}

// decoded a jwt token from the request
async function getUserFromToken(request) {
  const authHeader = request.headers.authorization;
  const token = authHeader.split(' ')[1];
  const decoded = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  return decoded;
}

class projectController {

  static async postProject(req, res) {
    try{
      const body = req.body;
      // get the decoded user information
      const decoded = await getUserFromToken(req);

      const user = await findUserById(decoded.id);
      if (!user) {
        return res.status(401).json({error: 'unauthorized'});
      }
      const {insertedId} = await Project.insertProject({...body, userId: user._id});
      const newProject = await findProjectById(insertedId);
      res.status(201).json({project: newProject});
    } catch(error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  static async updateProject(req, res) {
    try{
      const projectId = req.params.id;
      const project = await findProjectById(projectId);
      if(!project) {
        return res.status(401).json({error: 'Project does not exist'});
      }
      // get the decoded user information
      const decoded = await getUserFromToken(req);
      const user = await findUserById(decoded.id);
      if (!user || user._id != project.userId) {
        return res.status(401).json({error: 'unauthorized'});  
      }
      await Project.updateProject(project, req.body);
      res.status(200).json({project: await findProjectById(projectId)});
    } catch(error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  static async getProjectsByUser(req, res) {
    try{
      const userId = req.query.userId;
      const projects = await Project.findProjects({userId: new ObjectId(userId)});
    } catch(error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  static async getPendingProject(req, res) {
    try{

    } catch(error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  static async getProjectBasedOnId(req, res) {
    try{

    } catch(error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  static async deleteProject(req, res) {
    try{

    } catch(error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  static async acceptProject(req, res) {
    try{

    } catch(error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  static async completeProject(req, res) {
    try{

    } catch(error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  static async expireProject(req, res) {
    try{

    } catch(error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  static async getCompletedProjects(req, res) {
    try{

    } catch(error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  static async getAllProjects(req, res) {
    try{

    } catch(error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  static async getProjectsByAdmin(req, res) {
    try{

    } catch(error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  static async getAllProjectsCount(req, res) {
    try{

    } catch(error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  static async getCompletedProjectCount(req, res) {
    try{

    } catch(error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

}

module.exports = {projectController};