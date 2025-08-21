import multer from "multer"

//cb is callback
const storage= multer.diskStorage({
    destination: function (req,file, cb){
        cb(null , "./backend/temp")
    },
    filename: function (req, file , cb){
        cb(null, file.originalname)
    }
})

export const upload= multer({storage,
    
})




