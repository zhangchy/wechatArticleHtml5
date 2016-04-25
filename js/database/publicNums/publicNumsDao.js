var database = require("../database");
var tables = require("../../common/Tables");
/**
 *
 * @param params QueryParam类型查询条件此处
 * @param page   分页查询
 * @param size
 */
exports.findPublicNumsByParamsAndPage = function(fields,params,page,callback){
    var tableName = tables.Tables.posters;
    database.queryByPage(tableName,fields,params,page,null,function(callbackData){
        if(callback!=null){
            callback(callbackData);
        }
    });
};