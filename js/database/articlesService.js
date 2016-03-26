var articlesDao = require("./articlesDao");
exports.getArticlesByParamsAndPage= function(params,page,callback){
    var fields = null;
    articlesDao.findArticlesByParamsAndPage(fields,params,page,function(returnData){
        if(callback!=null){
            callback(returnData);
        }
    });
};