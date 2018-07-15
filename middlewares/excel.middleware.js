import { unlink } from 'fs';
import bodyParser from 'body-parser';
import convertor from '../utils/xlsx-convertor';
import multer from 'multer';
import path from 'path';
var storage = multer.diskStorage({ //multers disk storage settings
  destination: (req, file, cb) => {
      cb(null, (path.join(__dirname, '/uploads')))
  },
  filename: (req, file, cb) => {
      var datetimestamp = Date.now();
      cb(null, `${file.fieldname}-${datetimestamp}.${file.originalname.split('.')[file.originalname.split('.').length - 1]}`);
  }
});
var upload = multer({ //multer settings
  storage: storage,
  fileFilter: (req, file, callback) => { //file filter
      if (['xls', 'xlsx'].indexOf(file.originalname.split('.')[file.originalname.split('.').length - 1]) === -1) {
          return callback(new Error('Wrong extension type'));
      }
      callback(null, true);
  }
}).single('file');
const handleUpload = (req, res) => {
    upload(req, res, err => {
      if (err) {
        res.json({ error_code: 1, err_desc: err });
        return;
      }
      /** Multer gives us file info in req.file object */
      if (!req.file) {
        res.json({ error_code: 1, err_desc: "No file passed" });
        return;
      }
      /** Check the extension of the incoming file and
       *  use the convertor
       */
      if (
        req.file.originalname.split(".")[
          req.file.originalname.split(".").length - 1
        ] === "xlsx"
      ) {
        try {
          convertor(
            {
              input: req.file.path,
              output: null, //since we don't need output.json
              lowerCaseHeaders: true
            },
            (err, result) => {
              if (err) {
                return res.json({ error_code: 1, err_desc: err, data: null });
              }
              res.json({ data: result });
              unlink(req.file.path, err => {
                if (err) throw err;
              });
            }
          );
        } catch (e) {
          console.log(e);
          res.json({ error_code: 1, err_desc: "Corupted excel file" });
        }
      }
    });
  }
  export default handleUpload;