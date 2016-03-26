var database = require("./database");
var tables = require("../model/Tables");
/**
 *
 * @param params QueryParam类型查询条件此处
 * @param page   分页查询
 * @param size
 */
exports.findArticlesByParamsAndPage = function(fields,params,page,callback){
    var tableName = tables.Tables.articles;
    database.queryByPage(tableName,fields,params,page,function(callbackData){
        if(callback!=null){
            callback(callbackData);
        }
    });
};