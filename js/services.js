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
                    url: url
                }).success(function (response) {
                    request = false;
                    if (response.status == "SUCCESS") {
                        if (successCallback != null) {
                            successCallback(response.result);
                        }
                    } else {
                        console.log(data);
                    }
                }).error(function (data, header, config, status, statusText) {
                    request = false;
                    //处理响应失败
                    console.log(data);
                    alert(1);
                   /* if (failCallback != null) {
                        failCallback(data);
                    }*/

                });
            }
            return {
                getData: function (page, keyword, callback) {
                    var url = "http://10.118.1.48:8080/articles?page=" + page.articlePage + "&size=" + page.articleSize + "&keyword=" + keyword;
                    if (page.sort != null) {
                        url = url + "&sort=" + page.sort.field + "," + page.sort.sort;
                    }
                    doRequest(url, function (result) {
                        if (callback != null) {
                            callback(result);
                        }
                    }, function (error) {

                    });
                }
            };
        }
    ]
);