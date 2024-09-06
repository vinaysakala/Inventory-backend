const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const mongohelper = require("../helper/helper");
const token = require("../Services/token");
const _ = require("lodash");
const cors=require("cors");
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());
app.use(cors());
// app.post('/login',async(req,res)=>{
//     let _tkn= await token.sign(req.body)
// })

// app.use(async(req,res,next)=>{
//     try {
//         await token.verify(req.headers["p-token"])
//         next()
//     } catch (error) {

//     }
// })

async function _prepareUpdateData(_flag, _body) {
  return new Promise((resolve, reject) => {
    try {
      let _data = {
        filter: {},
        query: { $set: {}, $push: {} },
        mode: { upsert: true, new: true, arrayFilters: [] },
      };
      let _params = {};
      _data.filter["_id"] = _body._id;

      if (_flag == "U") {
        _.each(_body, (_v, _k) => {
          if ( _v.constructor.name == "Object" ||_v.constructor.name == "Array") {
            if (_v.constructor.name == "Object") {
              _.each(_v, (_v1, _k1) => {
                if (_k1 == "_id") {
                  _data.filter[`${_k}._id`] = _v1;
                } else {
                  if (
                    _v1.constructor.name == "Object" ||_v1.constructor.name == "Array"
                  ) {
                  } else {
                    _params[`${_k}.${_k1}`] = _v1;
                  }
                }
              });
            } else if (_v.constructor.name == "Array") {
              let _newData = _.filter(_v, (_fo, _fi) => {
                return !_fo._id;
              });
              console.log("dfghkdfjgh", _newData);
              _.each(_v, (_o, _i) => {
                if (!_o._id || _o._id == "") {
                  _data.query.$push[`${_k}`] = _newData;
                } else {
                  _.each(_o, (_v2, _k2) => {
                    if (_k2 == "_id") {
                      _data.filter[`${_k}._id`] = _v2;
                    } else {
                      if (
                        _v2.constructor.name == "Array" ||
                        _v2.constructor.name == "Object"
                      ) {
                      } else {
                        _params[`${_k}.$.${_k2}`] = _v2;
                      }
                    }
                  });
                }
              });
            }
          } else {
            _params[_k] = _v;
          }
        });
        delete _params._id;
        _data.query.$set = _params;
        resolve({ status: "sucess", _payload: _data });
      }
    } catch (error) {
      console.log("gdgh", error);
    }
  });
}


app.post('/updateuser',async(req,res)=>{
  try {
    
     let updateData = await _prepareUpdateData("U",req.body)
     mongohelper('User_Table',"updateOne",updateData._payload).then((result)=>{
        return res.status(200).json({status:true,statusMessage:"success",data:result})
     }).catch((error)=>{
         return res.status(400).json({status:false,statusMessage:"failure",data:[], desc:error})
     })
  } catch (error) {
     console.log("sdfbsjh",error)
  }
 })



app.post('/updateProduct',async(req,res)=>{
  try {
     
     let updateData = await _prepareUpdateData("U",req.body)
     mongohelper('Product_Table',"updateOne",updateData._payload).then((result)=>{
        return res.status(200).json({status:true,statusMessage:"success",data:result})
     }).catch((error)=>{
         return res.status(400).json({status:false,statusMessage:"failure",data:[], desc:error})
     })
  } catch (error) {
     console.log("sdfbsjh",error)
  }
 })



 app.post('/updatestock',async(req,res)=>{
  try {
     
     let updateData = await _prepareUpdateData("U",req.body)
     mongohelper('Stock_Table',"updateOne",updateData._payload).then((result)=>{
        return res.status(200).json({status:true,statusMessage:"success",data:result})
     }).catch((error)=>{
         return res.status(400).json({status:false,statusMessage:"failure",data:[], desc:error})
     })
  } catch (error) {
     console.log("sdfbsjh",error)
  }
 })

 
app.post('/updateemployee',async(req,res)=>{
  try {
     
     let updateData = await _prepareUpdateData("U",req.body)
     mongohelper('Employee_Table',"updateOne",updateData._payload).then((result)=>{
        return res.status(200).json({status:true,statusMessage:"success",data:result})
     }).catch((error)=>{
         return res.status(400).json({status:false,statusMessage:"failure",data:[], desc:error})
     })
  } catch (error) {
     console.log("sdfbsjh",error)
  }
 })



app.get("/stock", async (req, res) => {
  try {
    let products = await mongohelper("Stock_Table", "find", {}); // Assuming "Product_Table" is your MongoDB collection

    return res.status(200).json({
      status: true,
      statusMessage: "success",
      data: products,
    });
  } catch (error) {
    console.log("Error:", error);
    return res.status(500).json({
      status: false,
      statusMessage: "error",
      error: error.message,
    });
  }
});

app.delete("/stockdelete", async (req, res) => {
  try {
    let products = await mongohelper("Stock_Table", "delete",  req.body[0] ); // Assuming "Product_Table" is your MongoDB collection
    //  console.table(products[1])
    return res.status(200).json({
      status: true,
      statusMessage: "success",
      data: products,
    });
  } 
  catch (error) {
     console.log("Error:", error);
     return res.status(500).json({
        status: false,
        statusMessage: "error",
        error: error.message,
    });
  }
});


app.post("/user", async (req, res) => {
  
  try {
    let _insertData = await mongohelper("User_Table","insertMany",req.body);
    return res
      .status(200)
      .json({ status: true, statusMessage: "success", data: _insertData.data });
  } catch (error) {
    console.log("gfdfjgf", error);
  }
});


app.get("/getuser", async (req, res) => {
  try {
    let products = await mongohelper("User_Table", "find", {}); // Assuming "Product_Table" is your MongoDB collection

    return res.status(200).json({
      status: true,
      statusMessage: "success",
      data: products,
    });
  } catch (error) {
    console.log("Error:", error);
    return res.status(500).json({
      status: false,
      statusMessage: "error",
      error: error.message,
    });
  }
});



app.delete("/userdelete", async (req, res) => {
  try {
    let products = await mongohelper("User_Table", "delete",  req.body[0] ); // Assuming "Product_Table" is your MongoDB collection
    //  console.table(products[1])
    return res.status(200).json({
      status: true,
      statusMessage: "success",
      data: products,
    });
  } 
  catch (error) {
     console.log("Error:", error);
     return res.status(500).json({
        status: false,
        statusMessage: "error",
        error: error.message,
    });
  }
});

app.delete("/empdelete", async (req, res) => {
  try {
    let products = await mongohelper("Employee_Table", "delete",  req.body[0] ); // Assuming "Product_Table" is your MongoDB collection
    //  console.table(products[1])
    return res.status(200).json({
      status: true,
      statusMessage: "success",
      data: products,
    });
  } 
  catch (error) {
     console.log("Error:", error);
     return res.status(500).json({
        status: false,
        statusMessage: "error",
        error: error.message,
    });
  }
});


app.get("/employee", async (req, res) => {
  try {
    let products = await mongohelper("Employee_Table", "find", {}); // Assuming "Product_Table" is your MongoDB collection

    return res.status(200).json({
      status: true,
      statusMessage: "success",
      data: products,
    });
  } catch (error) {
    console.log("Error:", error);
    return res.status(500).json({
      status: false,
      statusMessage: "error",
      error: error.message,
    });
  }
});

app.post("/inserts", async (req, res) => {
  console.log('req',req)
  try {
    let _insertData = await mongohelper("Employee_Table","insertMany",req.body);
    return res
      .status(200)
      .json({ status: true, statusMessage: "success", data: _insertData.data });
  } catch (error) {
    console.log("gfdfjgf", error);
  }
});


app.post("/insert", async (req, res) => {
  try {
    let _insertData = await mongohelper("Product_Table","insertMany",req.body);
    return res
      .status(200)
      .json({ status: true, statusMessage: "success", data: _insertData.data });
  } catch (error) {
    console.log("gfdfjgf", error);
  }
});

app.get("/product", async (req, res) => {
  try {
    let products = await mongohelper("Product_Table", "find", {}); // Assuming "Product_Table" is your MongoDB collection

    return res.status(200).json({
      status: true,
      statusMessage: "success",
      data: products,
    });
  } catch (error) {
    console.log("Error:", error);
    return res.status(500).json({
      status: false,
      statusMessage: "error",
      error: error.message,
    });
  }
});


app.delete("/prodelete", async (req, res) => {
  try {
    let products = await mongohelper("Product_Table", "delete",  req.body[0] ); // Assuming "Product_Table" is your MongoDB collection
    //  console.table(products[1])
    return res.status(200).json({
      status: true,
      statusMessage: "success",
      data: products,
    });
  } 
  catch (error) {
     console.log("Error:", error);
     return res.status(500).json({
        status: false,
        statusMessage: "error",
        error: error.message,
    });
  }
});


app.post("/insert-stock", async (req, res) => {
  try {
    
    let get_Products = await mongohelper("Product_Table","find", { Name: req.body.Name });
    console.log(get_Products);
    delete req.body.Name
    if (get_Products === 0) {

      res.status(400).json({ status: false, status: 'Fail', data: 'products not found' });
    }
    req.body['ProductID'] = JSON.parse(JSON.stringify(get_Products))[0]._id

    let insert_data =  await mongohelper("Stock_Table", "insertMany", req.body);

    res.status(200).json({ status: true, statusMSG: 'success', data: insert_data.data });

  } catch (error) {
    console.log("Error MSG:",error);
    
  }
  
   
});


app.post("/authentication", async (req, res) => {
  try {
    let _response = await mongohelper("User_Table", "find", req.body);
    if (!_response) {
      return res
        .status(400)
        .send({ status: "FAIL", data: [], desc: "No User found.." });
    }
    let _verifyData = token.sign({
      Username: _response[0].Username,
      Password: _response[0].Password,
    });
    res.status(200).json({status:"sucess",desc:"login sucessful",data:_verifyData});
  } catch (error) {
    console.log(error);
  }
});

app.use(async function verify(req, res, next) {
  if (!req.headers || !req.headers["x-token"]) {
    return res
      .status(400)
      .send({ status: "FAIL", data: [], desc: "Missing Token ." });
  }
  try {
   token.verify(req.headers['x-token']).then((result,error)=>{
      if(result){
         next()
      }else{
         console.log(error)
      }
   }).catch((error)=>{
      res.send({data:"invalid token",error:error})
   })
  } catch (error) {
   res.send(error)
  }
});


app.post("/user", async (req, res) => {
  
  try {
    let _insertData = await mongohelper("User_Table","insertMany",req.body.params);
    return res
      .status(200)
      .json({ status: true, statusMessage: "success", data: _insertData.data });
  } catch (error) {
    console.log("gfdfjgf", error);
  }
});






app.listen(8080, () => {
  console.log(`https:localhost:8080 connected`);
});
