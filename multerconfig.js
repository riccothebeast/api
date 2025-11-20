import multer from 'multer';

const storage = multer.diskStorage(
    //where to store files
    {
        destination:(req,file,cb)=>{cb(null,'./uploads/')},
        filename:(req,file,cb)=>{cb(null,Date.now() + '-' + file.originalname)}
    }
)

// Only accept image files
const imageFileFilter = (req, file, cb) => {
    if (file && file.mimetype && file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(new Error('Only image files are allowed!'), false);
    }
}

// file size limit (example: 5 MB)
const limits = { fileSize: 5 * 1024 * 1024 };

//create a multer helper for export with filter and limits
const upload = multer({ storage, fileFilter: imageFileFilter, limits });

export default upload;