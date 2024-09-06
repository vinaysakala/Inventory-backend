const jwt=require('jsonwebtoken');
const _secretKey="7238459ifsadf@jodfds";

module.exports={
    sign:(_payload)=>{
        return jwt.sign(_payload,_secretKey,{expiresIn:'1h'})
    },
    verify:(_token)=>{
        return new Promise((resolve,reject)=>{
            jwt.verify(_token,_secretKey,(error,decode)=>{
                if(error){
                    reject({ "ERROR" : "ERROR WHILE DECODE TOKEN" });
                }  
                else{
                    resolve(decode)
                }                  

            })
        })
    }
}