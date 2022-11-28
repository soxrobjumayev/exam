import http from 'http'
import Express from './lib/express.js'
import {read ,write} from './utils/model.js'
import {categoriesCont} from './controller/categories.cont.js'
import { subCategoriesCont } from './controller/subCategories.cont.js'
import { productsCont } from './controller/products.cont.js'


function httpServer(req,res){
    const app = new Express(req,res )


    app.get('/products',productsCont.GET)
    app.post('/products',productsCont.POST)
    app.delete('/products',productsCont.DELETE)
    app.put('/products',productsCont.PUT)






    app.get('/subCategories',subCategoriesCont.GET)
    app.post('/subCategories',subCategoriesCont.POST)
    app.delete('/subCategories',subCategoriesCont.DELETE)
    app.put('/subCategories',subCategoriesCont.PUT)






    app.get('/categories',categoriesCont.GET)
    app.post('/categories',categoriesCont.POST)
    app.delete('/categories',categoriesCont.DELETE)
    app.put('/categories',categoriesCont.PUT)



  
  

}

const server = http.createServer(httpServer)

server.listen(5000,()=> console.log('ok')) 