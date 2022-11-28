import {read ,write} from '../utils/model.js'


let subCategoriesCont={
    GET:(req,res) =>{
        let categories = read('categories')
        let subCategories = read('subCategories')
        let products = read('products')

        subCategories.map(subCategorie =>{
            subCategorie.sub_category = products.find(product =>product.sub_category_id == subCategorie.sub_category_id)
        })
        res.json(subCategories)
    },

    POST:

   async(req,res) =>{
        let subCategories = read('subCategories')

       try {
        let {category_id,sub_category_name} = await req.body
        // console.log(category_name);

        if(!(sub_category_name.trim() && sub_category_name.length > 3)){
            throw new Error('xato')
        }

        let newsub = {sub_category_id:subCategories.at(-1)?.sub_category_id +1 ||1,sub_category_name,category_id}
        subCategories .push(newsub)
        write('subCategories',subCategories)
        res.json({ststus:400,message:'ok',data:newsub})
       } catch (error) {
        res.writeHead(400,{'Content-Type': 'application.json'})
        res.end(JSON.stringify({ststus:400,message:error.message}))
       }

    },

    DELETE:async(req,res)=>{
        let{sub_category_id} = await req.body
        let subCategories = read('subCategories')
    
       try{
        let newsubd =subCategories.findIndex((subcategory) => subcategory.sub_category_id == sub_category_id )
        if(newsubd == -1){
            throw new Error
        }
        subCategories.splice(newsubd,1)
        write('subCategories',subCategories)
        res.writeHead(200, { 'Content-Type': 'application/json'})
        res.end(JSON.stringify({status:200,message:'ok'}))
       }
    catch(errror){
       
    }},

    PUT:async(req,res)=>{
        let{sub_category_name,sub_category_id} = await req.body
        let subCategories = read('subCategories')

      try {
      
      let Newsub = subCategories.find((categor) => categor.sub_category_id == sub_category_id)
      if(!Newsub){
        throw new Error
      
      }
      Newsub.sub_category_name = sub_category_name
      res.writeHead(200, { 'Content-Type': 'application/json'})
      res.end(JSON.stringify({status:200,message:'ok'}))
      write('subCategories',subCategories)
      
      } catch (error) {
      
      }
      
      
      }
    
}

export  {
    subCategoriesCont
}