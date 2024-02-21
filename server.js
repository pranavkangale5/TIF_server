
const express = require('express');
const multer = require('multer');
const path = require('path');


const app = express();
app.get("/", (req,res)=>{
    // res.send("hello frfom server")
    res.sendFile(path.join((__dirname +'/demo.html')));
})

// Multer configuration for handling file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Specify the destination directory based on the input field
    cb(null, 'uploads/' + file.fieldname);
  },
  filename: function (req, file, cb) {
    // Keep the original filename
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage , 
   // limits:{fileSize:Infinity}
}) //.any();// for unlimited filw uploading 

// Define routes for uploading directories
app.post('/upload/Modelimage', upload.array('ModelImage'), (req, res) => { // model image upload
  res.redirect("/")
});

app.post('/upload/Clothimage', upload.array('Clothimage'), (req, res) => { // cloth image upload
    res.redirect("/")
});


app.post('/upload/Resultimage', upload.array('Resultimage'), (req, res) => { // Resault image upload
    res.redirect("/")
});

app.post('/upload/csvFile', upload.single('csvFile'),(req,res)=>{
    res.redirect("/")
})



// csv file upload 
const csvFilter = (req, file ,cb)=>{
    if (file.mimetype.includes("csv")){
        cb(null, true);// checks for csv file 
    }else {
        cb("Please Upload CSV file only !", false); // uploads csv file only 
    }

}



// Serve uploaded files statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

