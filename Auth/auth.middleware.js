const jwt = require('jsonwebtoken');
module.exports = {
    checkTcken: (req, res, next) => {
         try{
                    let token = req.get('authorization');
                    if (token) {
                        token = token.slice(7);
                        
                        jwt.verify(token,process.env.SECRET_TOKEN,(err,decoded)=>{
                            if(err){
                           res.status(401).json({
                                status:401,
                                success:false,
                                message:'Invalid Token'
                            })
                            }else{
                                next();
                            }
                        });
                    } else {
                    res.status(401).json({
                            status:401,
                            success: false,
                            message: 'Access denied! unauthorized user '
                        })
                    }
                    
         }
         catch(error){
         return error
         }
    }
}