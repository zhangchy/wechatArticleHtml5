var articlesDao = require("./articlesDao");
exports.getArticlesByParamsAndPage= function(params,page,sort,callback){
    var fields = null;
    articlesDao.findArticlesByParamsAndPage(fields,params,page,sort,function(returnData){
        if(callback!=null){
            callback(returnData);
        }
    });
};