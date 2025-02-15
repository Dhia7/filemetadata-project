var express = require('express');
var cors = require('cors');
require('dotenv').config()
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' }); 



var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Middleware to parse JSON and form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.post('/api/fileanalyse', upload.single('upfile'), (req,res) => {
  if (!req.file) {
    return res.status(400).send("File was not found");
  }
  const { originalname, mimetype, size } = req.file;

  return res.status(200).json({
    name: originalname,
    type: mimetype,
    size: size
  });
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
