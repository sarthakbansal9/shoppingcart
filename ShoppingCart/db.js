const Sequelize  = require("sequelize");
const Model = Sequelize.Model;
const db = new Sequelize({
    dialect:'sqlite',
    storage :__dirname+"/shoppingkart.db"
})
db
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

class Vendor extends Model{}
Vendor.init({
    name:
    {
        type:Sequelize.STRING,
        allowNull:false
    }
},{sequelize:db});


// const Vendor = db.define('vendor',{
//     name:
//     {
//         type : Sequelize.STRING,
//         allowNull : false
//     }
// })

// Vendor.sync({ force: true }).then(() => {
//     // Now the `users` table in the database corresponds to the model definition
//     return Vendor.create({
//         name:'Apple'
//     });
//   });


class Product extends Model{}
Product.init({
    name:
    {
        type : Sequelize.STRING,
        allowNull:false
    },
    price :
    {
         type:Sequelize.INTEGER,
         allowNull : false   
    }     
},{sequelize:db})


class User extends Model{}
User.init({
    name :
    {
        type:Sequelize.STRING,
        allowNull : false
    }
},{sequelize:db})


class Cart extends Model{}
Cart.init({
    UserId :
    {
        type: Sequelize.INTEGER,
        allowNull:false
    },
    ProductId:
    {
        type:Sequelize.INTEGER,
        allowNull:false
    },
    Quantity:
    {
      type:Sequelize.INTEGER,
      allowNull:false
    }
},{sequelize:db})
Product.belongsTo(Vendor);
 Vendor.hasMany(Product,{onDelete:"CASCADE"});


// User.belongsToMany(Product,{
//     through:
//     {
//         model:Cart,
//         unique:false
//     },
//     foreignKey:'UserId',
//     constraints:false
// });

// Product.belongsToMany(User,{
//     through:
//     {
//         model:Cart,
//         unique:false
//     },
//     foreignKey:'ProductId',
    
// })

Cart.belongsTo(Product,{onDelete:"CASCADE"})
Cart.belongsTo(User,{onDelete:"CASCADE"})


User.hasMany(Cart,{onDelete:"CASCADE"})
Product.hasMany(Cart,{onDelete:"CASCADE"})




module.exports={
    db,
    Product,
    Vendor,
    User,
    Cart
}
