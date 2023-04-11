const express = require('express');
const app = express();

// Create an instance of the multer middleware
// const upload = multer();

// // Handle formdata using the `upload` middleware
// app.post('/submit-form', upload.single(), (req, res) => {
//   // Process form data here
//   console.log(req.body);
//   res.send('Form data submitted successfully!');
// });

// Start the server
app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
