import {read ,write} from '../utils/model.js'


let productsCont={
    GET:( (req, res) => {
        let { model,sub_category_id } = req.query
        let products = read('products');
        let newpro = products.filter(pro =>{
            let newmodel =model ?  pro.model == model:''
            let subid =sub_category_id?  pro.sub_category_id == sub_category_id:''

            return newmodel || subid
        
        })
        if(newpro.length){
          return res.end(JSON.stringify(newpro))
        }
        res.json(products)
      }),


    POST:async(req,res) =>{
        let products = read('products')

       try {
        let {sub_category_id, model,  product_name} = await req.body
        // console.log(category_name);

        if(!(model.trim() && model.length > 3)){
            throw new Error('xato')
        }

        let newproduct = {product_id:products.at(-1)?.product_id +1 ||1,product_name,model,sub_category_id}
        products .push(newproduct)
        write('products',products)
        res.json({ststus:400,message:'ok',data:newproduct})
       } catch (error) {
        res.writeHead(400,{'Content-Type': 'application.json'})
        res.end(JSON.stringify({ststus:400,message:error.message}))
       }

    },

    DELETE:async(req,res)=>{
        let{product_id} = await req.body
        let products = read('products')
    
       try{
        let newproduct =products.findIndex((subcategory) => subcategory.product_id == product_id )
        if(newproduct == -1){
            throw new Error
        }
        products.splice(newproduct,1)
        write('products',products)
        res.writeHead(200, { 'Content-Type': 'application/json'})
        res.end(JSON.stringify({status:200,message:'ok'}))
       }
    catch(errror){
       
    }},

    PUT:async(req,res)=>{
        let{model,product_id} = await req.body
        let products = read('products')

      try {
      
      let Newproduct = products.find((categor) => categor.product_id == product_id)
      if(!Newproduct){
        throw new Error
      
      }
      Newproduct.model = model
      res.writeHead(200, { 'Content-Type': 'application/json'})
      res.end(JSON.stringify({status:200,message:'ok'}))
      write('products',products)
      
      } catch (error) {
      
      }
      
      
      }
    
}

export  {
    productsCont
}