import express = require("express");
import multer = require('multer')// sirve para mandar archivos del front al back


//Using express and router
const app = express();
const router = express.Router()

//Setting necessities for app
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(express.urlencoded({extended: true})) //Esta parte del código sirve para parsear el contenido que recibo

//Setting routes
app.use('/api', router)//Uso de router
app.use('/api/products', require('./productRoutes'))//Usar router importando rutas desde otro archivo

//Stablish main route
app.get('/api', (req, res) => {

    res.send("Ruta principal")

})

app.get('/subirArchivo', (req, res) => {
    res.sendFile(__dirname+'/index.html')
})

//Funcionalidad para subir archivos. Es necesario fixearlo
var storage = multer.diskStorage({
    destination: function (req,file,cb){
        cb(null,'uploads')
    },
    filename: function (req,file,cb){
        cb(null,file.fieldname + '-' + Date.now())
    }
})
var upload = multer({storage:storage});

app.post('/uploadfile',upload.single('myFile'),(req,res,next)=>{

    const file = req.file;

    if(!file){
        const error = new Error('Elegi un archivo');
        error.message = "Not Found";
        next(error)

    }
    res.send('EL archivo creado exitosamente!!!')
})

//Setting server path
const server = app.listen('3335', () => {
    console.log(`Running port 3335`)
})