const express = require('express');
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const {userRouter} = require('./routers/userRouter');
const {projectRoute} = require('./routers/projectRoute');
const {errorHandler} = require('./midddlewares/error.middleware');
const {notFoundHandler} = require('./midddlewares/not-found.middleware');

// // Handle formdata using the `upload` middleware
// app.post('/submit-form', upload.single(), (req, res) => {
//   // Process form data here
//   console.log(req.body);
//   res.send('Form data submitted successfully!');
// });
const apiRouter =  express.Router();
app.use("/api", apiRouter);
apiRouter.use('/users/', userRouter);
apiRouter.use('/projects', projectRoute);


app.use(errorHandler);
app.use(notFoundHandler);
// Start the server
app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
