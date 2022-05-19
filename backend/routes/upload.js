const router = require("express").Router();
const multer = require("multer");

const storage = multer.diskStorage(
  {
    destination: (req, file, cb) => {
      cb(null, "public/images");
    },
    filename: (req, file,cb) => {
      cb(null, file.req.body.name);
    }
  }
)

const upload = multer(storage);
//upload picture API
router.post("/", upload.single("file"), (req, res) => {
  try{
    return res.status(200).json("imaga upload success");
  } catch (err){
    console.log(err);
  }
})

module.exports = router;