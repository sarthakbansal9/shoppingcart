const express = require('express');
const app = express();
const {
    db,
    Product,
    Vendor,
    User,
    Cart
} = require('./db.js')


app.use(express.json())
app.use(express.urlencoded({
  extended: true
}))
app.use(express.static(__dirname+'/public'))
app.use(express.static(__dirname+'/script'))
app.use(express.static(__dirname + "/css"))
// app.use(express.static(__dirname + "/public"));


// var options = {
//     root : __dirname + '/public/'
// }
app.get('/',function(req,res){
    res.sendFile(__dirname+"/public/vendor.html",function(err){
        if(err)
            next(err);
        else
            console.log("sent");
    });
})



app.post('/vendor',async function(req,res){
    try {
        const result = await Vendor.create({
          name: req.body.name,
          
        })
        res.send({success: true})
      } catch (e) {
        res.send({success: false, err: e.message})
      }
})

app.delete('/vendor/:id',async function(req,res){
    try
    {
        Vendor.destroy({
        where:
        {
            id : req.params.id
        },
        
    })
    try{
      Product.destroy({
        where:{
          VendorId:null
        }
      })
    }
    catch(e)
    {
      console.log(e.message);
    }
    res.send({success:true})
}
 catch(e)
 {
        res.send({success:false,err: e.message})
 }
})
app.get('/vendor',async function(req,res){
    const vendor  = await Vendor.findAll()
    res.send(vendor);
})






app.get('/shopping',function(req,res){
   res.sendFile(__dirname + "/public/shopping.html")
})



app.post('/usershopping', function(req,res)
{
  console.log(1)
  let result,resultid,newuser,newuserid,globalid;

      result =  User.findOne({
      where:
      {
          name:req.body.name
      }
    })
    result.then(function(data){
      globalid =  data.id;
      console.log(2);
      res.send({success:true,id:globalid }) ;
    })
    .catch( function(err)
    {
      console.log("error");
      console.log(3);
      try{
        newuser =  User.create({
         name:req.body.name
       })
       newuser.then(function(data){
         console.log("new user Id" + data.id);
          globalid = data.id;
          
          res.send({success:true,id:globalid }) ;
       })
     }
     catch(e)
     {
       res.send({success:false,err:e.message})
     }
    })
     // console.log(newuserid);
     console.log(4);
     
      
  
})





app.get('/addproduct',function(req,res){
    res.sendFile(__dirname +  "/public/product.html")
})
 app.get('/product',async function(req,res){
    const product  = await Product.findAll()
    res.send(product);
 })
app.post('/product',async function(req,res){
    try {
        console.log(req.body);
        const result = await Product.create({
          name: req.body.name,
          price:req.body.price,
          VendorId: req.body.vendorId 
        })
       
        res.send({success: true})
      } catch (e) {
        console.log("we are here");
        res.send({success: false, err: e.message})
      }
})





app.get('/Cart',function(req,res){
    res.sendFile(__dirname + "/public/cart.html");
})

// db.sync()
//   .then(() => {
//     app.listen(8989,function(){
//         console.log("server is listening");
//     })
//   })


app.get('/usersproduct/:id',function(req,res){
  let userid = req.params.id;
  let productlist = Cart.findAll({
   include :[
     Product,
     User
   ],
   where:{
     UserId:userid
   }
  })
  productlist.then(function(data){
    console.log(data[0].Product.name)
    res.send(data);
  }).catch(function(err){
    res.send({success:false,message:err.message})
  })
})


app.post('/addcart',function(req,res){
  
  
    // let cartItem = Cart.increment({
    //   Quantity: 1
    // }, {
    //   where: {
    //     ProductId: req.body.ProductId,
    //     UserId: req.body.UserId
    //   }
    // })

    // cartItem.then(function(data){
    //   console("we are found")
    //   res.send({success:true,quantity:data.Quantity})
    // }).catch(function(data){
    //   console.log("we not found");
    //   let newcart = Cart.create({
    //     ProductId:req.body.ProductId,
    //     UserId:req.body.UserId,
    //     Quantity:1
    //   })

    //   newcart.then(function(data)
    //   {
    //     res.send({success:true,quantity:1})
    //   }).catch(function(err){
    //     res.send({success:false,message:err.message})
    //   })
    // })

    Cart.findOne({
      where: {
        ProductId: req.body.ProductId,
        UserId: req.body.UserId
      }
    }).then((item) => {
      item.increment({
      quantity: 1
    })
    res.send({success:true})
    }).catch(function(data){
      Cart.create({
            ProductId:req.body.ProductId,
            UserId:req.body.UserId,
            Quantity:1
          })
          res.send({success:true})
    })

  })
  




app.get('/cart/:userid',function(req,res){
  let userId = req.params.userid;
   res.sendFile(__dirname+"/public/cart.html");
})
  
db.sync({force:true}).then(()=>{
    console.log("sync success");
     Vendor.create({name:"MI"});
     Vendor.create({name:"NOKIA"})
     Vendor.create({name:"APPLE"})
     Product.create({name:"NOTE 4",price:50,VendorId:1})
     Product.create({name:"5.1 PLUS",price:100,VendorId:1})
     User.create({name:"SARTHAK"})
     User.create({name:"SPARSH"})
     User.create({name:"RISHABH"})
     User.create({name:"SAUMAY"})
     User.create({name:"SAGAR"}) 
     Cart.create({ProductId:1,UserId:5,Quantity:10});
     Cart.create({ProductId:2,UserId:1,Quantity:20});
     Cart.create({ProductId:2,UserId:4,Quantity:20});
     Cart.create({ProductId:2,UserId:3,Quantity:20});
     app.listen(8989,function(){
        console.log("server listens");
    })
  })