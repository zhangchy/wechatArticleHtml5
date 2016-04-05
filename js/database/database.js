//nodejs中引入mysql插件
var mysql  = require('mysql');
var Constant = require("../common/Constant");
function getConAPI(){
    var con = mysql.createConnection({
        host:Constant.getMysqlConfig().host,
        user:Constant.getMysqlConfig().user,
        password:Constant.getMysqlConfig().password,
        database:Constant.getMysqlConfig().database
    });
    return con;
}
/**
 * 根据sql语句进行查询
 * @param sql
 * @param callback
 * @return 返回结果{"status":"","result":""};
 */
function query(sql,callback){
    var con = getConAPI();
    var returnData = {"status":"","result":""};
    con.query(sql,function(e,r){
        if(e){
            returnData.status = Constant.STATUS.FAIL;
            returnData.result = e;
        }else{
            returnData.status = Constant.STATUS.SUCCESS;
            returnData.result = r;
        }
        con.end();
        if(callback!=null){
            callback(returnData);
        }
    });
}
/**
 * 根据条件进行分页查询
 * @param tableName
 * @param fields
 * @param params
 * @param page
 * @param callback
 */
function queryByPage(tableName,fields,params,page,sort,callback){
    var returnData = {"status":"","result":{"count":"","data":""}};
    var con = getConAPI();
    var queryCountSql = "select count(*) cnt from "+tableName+" where 1=1";
    var queryDataSql = "";
    if(fields==null){
        queryDataSql = "select * from "+tableName +" where 1=1";
    }else{
        queryDataSql = "select "+fields+" from "+tableName+" where 1=1";
    }
    if(params!=null){
        params.forEach(function(e){
            if(e.value.indexOf("'")!=-1){
                e.value.replace("'","\'");
            }
            if(e.field == 'keyword'){
                queryDataSql = queryDataSql + " and (title like '%"+ e.value +"%' or summary like '%"+ e.value +"%' or postUser like '%"+ e.value +"%')";
                queryCountSql = queryCountSql + " and (title like '%"+ e.value +"%' or summary like '%"+ e.value +"%' or postUser like '%"+ e.value +"%')";
            }else{
                if(e.operator == "like"){
                    queryDataSql = queryDataSql + " and "+ e.field+" "+ e.operator + " '%"+ e.value +"%' ";
                    queryCountSql = queryCountSql + " and "+ e.field+" "+ e.operator + " '%"+ e.value +"%' ";
                }else{
                    queryDataSql = queryDataSql + " and "+ e.field+" "+ e.operator + " "+ e.value;
                    queryCountSql = queryCountSql + " and "+ e.field+" "+ e.operator + " "+ e.value;
                }
            }

        });
    }

    if(sort!=null){
        queryDataSql = queryDataSql+" order by "+sort.field+" "+sort.sort;
    }
    queryDataSql = queryDataSql + " limit "+ (page.page-1)*page.size+","+page.size;
    console.log("00000000000000000000000000000000000000000");
    console.log(queryDataSql);
    console.log("00000000000000000000000000000000000000000");
    con.query(queryCountSql,function(e,r){
        if(e){
            returnData.status = Constant.STATUS.FAIL;
            returnData.result = e;
        }else{
            returnData.status = Constant.STATUS.SUCCESS;
            returnData.result.count = r[0].cnt;
            var inner_con = getConAPI();
            inner_con.query(queryDataSql,function(inner_e,inner_r){
                if(inner_e){
                    returnData.status = Constant.STATUS.FAIL;
                    returnData.result = e;
                }else{
                    returnData.status = Constant.STATUS.SUCCESS;
                    returnData.result.data = inner_r;
                }
                inner_con.end();
                con.end();
                if(callback!=null){
                    callback(returnData);
                }
            });
        }
    });

}
exports.getCon = getConAPI;
exports.query = query;
exports.queryByPage = queryByPage;