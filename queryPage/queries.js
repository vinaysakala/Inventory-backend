module.exports=(_model,_action,_params)=>{
 return new Promise(async (resolve,reject)=>{
       try {
           if(_action =="find"){
            _model.find(_params || {_id:-1}).then((result)=>{
               resolve(result)
            })
           }else if(_action == "delete"){
            console.log('finally', _params)
            _model.findByIdAndDelete(_params).then((result)=>{
                resolve({ status: "SUCCESS", data: result || [] })
                console.log(result)
             }).catch((error)=>{
                reject({ status: "FAIL", data: [], desc: error })
             })
           }
           else if(_action =="insertMany"){
            _model.insertMany(_params).then((result)=>{
                resolve({ status: "SUCCESS", data: result || [] })
             }).catch((error)=>{
                reject({ status: "FAIL", data: [], desc: error })
             })
             
           }else  if(_action =="updateOne"){
            _model.updateOne(_params.filter,_params.query,_params.mode).then((result)=>{
                if(result.modifiedCount && result.modifiedCount >0){
                    resolve({ status: "SUCCESS", data: result._id ? result._id: [] })
                }else{
                    reject({ status: "FAIL", data: [], desc: "no document updated" }) 
                }
              
            }).catch((error)=>{
                reject({ status: "FAIL", data: [], desc: error })
            })
        }
       } catch (error) {
          console.log("error",error)
       }
    })
}