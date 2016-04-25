var publicNumsDao = require("./publicNumsDao");
exports.getPublicNumsByParamsAndPage = function(params,page,callback){
    var fields = null;
    publicNumsDao.findPublicNumsByParamsAndPage(fields,params,page,function(returnData){
        if(callback!=null){
            callback(returnData);
        }
    });
};