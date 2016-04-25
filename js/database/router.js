var articlesService = require("./articles/articlesService");
var publicNumsService = require("./publicNums/publicNumsService");
function route(pathname,params,callback) {
    if((pathname.toString().indexOf("/articles", pathname.length - "/articles".length) !== -1)||(pathname.toString().indexOf("/articles/", pathname.length - "/articles/".length) !== -1)){
        var requestParams = requestArticlesParams(params);
        articlesService.getArticlesByParamsAndPage(requestParams.queryParams,requestParams.page,requestParams.querySort,function(callbackResult){
            if(callback!=null){
                callback(callbackResult);
                return;
            }
        });
    }else if((pathname.toString().indexOf("/publicNums", pathname.length - "/publicNums".length) !== -1)||(pathname.toString().indexOf("/publicNums/", pathname.length - "/publicNums/".length) !== -1)){
        var requestParams = requestArticlesParams(params);
        publicNumsService.getPublicNumsByParamsAndPage(requestParams.queryParams,requestParams.page,function(callbackResult){
            if(callback!=null){
                callback(callbackResult);
                return;
            }
        });
    }else{
        return "cannot get users the url is not correct";
    }
}
//整理请求参数
function requestArticlesParams(params){
    var result = {};
    var page = {
        "page":1,
        "size":10
    };
    var queryParams = null;
    var querySort = null;

    if(params!=null){
        page.page = params.page?params.page:page.page;
        page.size = params.size?params.size:page.size;

        if(params.sort&&params.sort!=""&&params.sort.split(",")){
            var sort = params.sort.split(",");
            querySort = {"field":sort[0],"sort":sort[1]};
        }
        if(params.keyword!=null&&params.keyword!=""){
            if(queryParams==null){
                queryParams = new Array();
            }
            queryParams.push({
                "field":"keyword",
                "value":params.keyword,
                "operator":"like"
            });

        }
    }

    return {"page":page,"queryParams":queryParams,"querySort":querySort};
}
exports.route = route;