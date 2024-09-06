const mongoose=require('mongoose');

const User_Table= new mongoose.Schema({
    "_id": {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        auto: true,
    },
    Username:{    
        type:String,
        required:true
    },
    Password:{
        type:String,
        required:true
    },
    Email:{
        type:String,
        required:true
    },
    Role:{
        type:String,
        required:true
    },
    mobile:{
        type:String,
        required:true
    }
})

const Employee_Table= new mongoose.Schema([
    {
        "_id": {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            auto: true,
        },
        Username:{
            type:String,
            required:true
        },
        
        Department:{
            type:String,
            required:true
        },
        Position:{
            type:String,
            required:true
        },
        mobile:{
            type:String,
            required:true
        }
        

    }
])

const Product_Table= new mongoose.Schema([
    {
        "_id": {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            auto: true,
        },
        Name:{
            type:String,
            required:true
        },
        Category:{
            type:String,
            required:true
        },
        Price:{
            type:Number,
            required:true
        },
        Stock:{
            type:Number,
            required:true
        }

    }
])

const Stock_Table= new mongoose.Schema([
    {
        "_id": {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            auto: true,
        },
        ProductID:{
            type:String,
            required:true
        },
        Quantity:{
            type:Number,
            required:true
        },
        Location:{
            type:String,
            required:true
        },
        TranscationType:{
             type:String,
             required:true
        },
        lastUpdated:{
            type:Date,
            default:()=>{
                return new Date().toISOString();
            }
        }  

    }
])

module.exports = [
    { "coll": 'User_Table', "schema": User_Table, "db": "IMS" },
    { "coll": 'Employee_Table', "schema": Employee_Table, "db": "IMS" },
    { "coll": 'Product_Table', "schema": Product_Table, "db": "IMS" },
    { "coll": 'Stock_Table', "schema": Stock_Table, "db": "IMS" }
];