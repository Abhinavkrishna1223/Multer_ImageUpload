const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const server = express();
const port = 4000 || process.env.PORT;





main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/imageUpload');
  console.log("Database connected successfully");
}


server.get("/", (req, res) => {
  res.json({ status: "success" })
});

const upload = multer({
  storage:multer.diskStorage({
    destination:function(req, file, cb){ //Here cb stands for callback function //
      cb(null, "uploads")
    },
    filename:function(req,file,cb){
      cb(null,file.fieldname+ "-"+Date.now()+".jpg")
    }
  })
}).single("file_upload")

server.post('/upload',upload, (req,res)=>{
  res.json({
    message:"Image Uploaded"
  })
});




server.listen(port, () => {
  console.log(`Server ${port} started successfully`);
})