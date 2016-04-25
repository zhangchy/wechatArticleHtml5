var articleRequest = false;
wechatArticle.service('ArticlesService',['$http',
        function(http) {

            var doRequest = function (url, successCallback, failCallback) {
                if(articleRequest){
                    return;
                }
                articleRequest = true;
                http({
                    method: 'GET',
                    url: url,
                    timeout: 10000
                }).success(function (response) {
                    articleRequest = false;
                    if (response.status == "SUCCESS") {
                        if (successCallback != null) {
                            successCallback(response.result);
                        }
                    }
                }).error(function (data,status,headers,config) {
                    articleRequest = false;
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
                    var url = "http://"+window.location.host+"/articles?page=" + page.articlePage + "&size=" + page.articleSize + "&keyword=" + keyword;
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

var publicNumRequest = false;
wechatArticle.service('PublicNumsService',['$http',
        function(http) {
            var doRequest = function (url, successCallback, failCallback) {
                if(publicNumRequest){
                    return;
                }
                publicNumRequest = true;
                http({
                    method: 'GET',
                    url: url,
                    timeout: 10000
                }).success(function (response) {
                    publicNumRequest = false;
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
                    var url = "http://"+window.location.host+"/publicNums?page=" + page.page + "&size=" + page.size + "&nickName=" + keyword;
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
