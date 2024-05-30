import express from 'express';
import multer from 'multer';
const app = express(); 

app.use(express.static('public'));

//Date.now() = miliseconds from 1st. January 1970
const storage = multer.diskStorage({
    destination: function (req, res, cb) {
        cb(null, 'uploads/')
    }, 
    filename: function (req, file, cb) {
        cb(null, Date.now() + '_' + file.originalname)
    }
})


const upload = multer({ storage: storage });

// Middleware to handle JSON and form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.post('/upload', upload.single('file'), (req, res) => {
  try {
    console.log("Todays date is: " + Date.now())
    res.send({
      status: 'success',
      message: 'File uploaded successfully',
      file: req.file
    });
  } catch (err) {
    res.status(400).send({
      status: 'error',
      message: 'File upload failed',
      error: err.message
    });
  }
});



app.listen(3000, () => {
    console.log('Server is running on port 3000');
})