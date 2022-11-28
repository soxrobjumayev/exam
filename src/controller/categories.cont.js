import {read ,write} from '../utils/model.js'


let categoriesCont={
    GET:(req,res) =>{
        let categories = read('categories')
        let subCategories = read('subCategories')

        categories.map(categorie =>{
            categorie.sub_category = subCategories.find (subCategorie => subCategorie.category_id ==categorie.category_id)

        
        
        })

        res.json(categories)

    },

    POST:async(req,res) =>{
        let categories = read('categories')

       try {
        let {category_name} = await req.body
        console.log(category_name);

        if(!(category_name.trim() && category_name.length > 3)){
            throw new Error('xato')
        }

        let newCatecory = {category_id:categories.at(-1)?.category_id +1 ||1,category_name}
        categories .push(newCatecory)
        write('categories',categories)
        res.json({ststus:400,message:'ok',data:newCatecory})
       } catch (error) {
        res.writeHead(400,{'Content-Type': 'application.json'})
        res.end(JSON.stringify({ststus:400,message:error.message}))
       }

    },

    DELETE:async(req,res)=>{
        let{category_id} = await req.body
        let categories = read('categories')
    
       try{
        let newCoti =categories.findIndex((category) => category.category_id == category_id )
        if(newCoti == -1){
            throw new Error
        }
        categories.splice(newCoti,1)
        write('categories',categories)
        res.writeHead(200, { 'Content-Type': 'application/json'})
        res.end(JSON.stringify({status:200,message:'ok'}))
       }
    catch(errror){
       
    }},

    PUT:async(req,res)=>{
        let{category_name,category_id} = await req.body
        let categories = read('categories')

      try {
      
      let Ncategory = categories.find((categor) => categor.category_id == category_id)
      if(!Ncategory){
        throw new Error
      
      }
      Ncategory.category_name = category_name
      res.writeHead(200, { 'Content-Type': 'application/json'})
      res.end(JSON.stringify({status:200,message:'ok'}))
      write('categories',categories)
      
      } catch (error) {
      
      }
      
      
      }
    
}

export  {
    categoriesCont
}