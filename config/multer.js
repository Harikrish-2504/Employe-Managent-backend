const multer = require("multer");
const path = require("path");
const storage =  multer.diskStorage({
    destination: (req,file,callback)=>{
        const destination = path.resolve(__dirname,"..","public","uploads")
        callback(null,destination)
    },
    filename:(req,file,callback)=>{
        callback(null,req.params.id + ".jpg")
    },

})
const upload = multer({storage:storage});
module.exports = upload; 