var articlesService = require("./articlesService");
function route(pathname,params,callback) {
    if(pathname.toString().endsWith("/articles")||pathname.endsWith("/articles/")){
        var requestParams = requestArticlesParams(params);
        console.log(requestParams);
        articlesService.getArticlesByParamsAndPage(requestParams.queryParams,requestParams.page,function(callbackResult){
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
    var page = {
        "page":1,
        "size":10
    };
    var queryParams = null;
    if(params!=null){
        page.page = params.page?page.page:params.page;
        page.size = params.size?page.size:params.size;
        if(params.title!=null&&params.title!=""){
            if(queryParams==null){
                queryParams = new Array();
            }
            queryParams.push({
                "field":"title",
                "value":params.title,
                "operator":"like"
            });

        }
        if(params.summary!=null&&params.summary!=""){
            if(queryParams==null){
                queryParams = new Array();
            }
            queryParams.push({
                "field":"summary",
                "value":params.summary,
                "operator":"like"
            });
        }
        if(params.postUser!=null&&params.postUser!=""){
            if(queryParams==null){
                queryParams = new Array();
            }
            queryParams.push({
                "field":"postUser",
                "value":params.postUser,
                "operator":"like"
            });
        }
    }
    return {"page":page,"queryParams":queryParams};
}
exports.route = route;