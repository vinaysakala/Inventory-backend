const connectToMongoDB = require("../connections/mongo_db");
const queryPage = require("../queryPage/queries")


let modelsArray;
(async () => {
  modelsArray = await connectToMongoDB();
})();


module.exports = async (_collectionName,_action,_params) => {
  return new Promise((resolve,reject)=>{
    let _data = modelsArray[_collectionName];   
    queryPage(_data,_action,_params).then((result)=>{
       resolve(result)
    }).catch((error)=>{
      reject(error)
       //console.log("rjhsgdfjh",error)
    })
     
  })



 


  // if(!_data){
  //   return {error:"Collection name is not FOUND"}
  // }else{
  //   if(_action==="Find"){
  //       let _v= await _data.find({})
  //   }
  //   else if(_action ==="InsertMany"){

  //   }
  //   else if(_action ==="UpdateOne"){
        
  //   }
  //   else if(_action ==="UpdateMany"){
        
  //   }
  //   else if(_action ==="DelteOne"){
        
  //   }
  //   else if(_action ==="DeleteMany"){
        
  //   }
  // }

  
};
