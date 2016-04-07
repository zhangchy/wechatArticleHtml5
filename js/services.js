wechatArticle.service('ArticlesService',['$http',
        function(http) {
            var request = false;
            var doRequest = function (url, successCallback, failCallback) {
                if(request){
                    return;
                }
                request = true;
                http({
                    method: 'GET',
                    url: url,
                    timeout: 10000
                }).success(function (response) {
                    request = false;
                    if (response.status == "SUCCESS") {
                        if (successCallback != null) {
                            successCallback(response.result);
                        }
                    }
                }).error(function (data,status,headers,config) {
                    request = false;
                    if(status == -1){
                        if (failCallback != null) {
                            failCallback("请求超时,请检查网络");
                        }
                    }else{
                        //处理响应失败
                        if (failCallback != null) {
                            failCallback("系统异常");
                        }
                   /* if (failCallback != null) {
                        failCallback(data);
                    }*/
                    }
                });
            }
            return {
                getData: function (page, keyword, successCallback,failCallback) {
                    var url = "http://10.118.1.48:8080/articles?page=" + page.articlePage + "&size=" + page.articleSize + "&keyword=" + keyword;
                    if (page.sort != null) {
                        url = url + "&sort=" + page.sort.field + "," + page.sort.sort;
                    }
                    doRequest(url, function (result) {
                        if (successCallback != null) {
                            successCallback(result);
                        }
                    }, function (error) {
                        if(failCallback!=null){
                            failCallback(error);
                        }
                    });
                }
            };
        }
    ]
);