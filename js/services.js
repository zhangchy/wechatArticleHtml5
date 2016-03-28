wechatArticle.service('ArticlesService',function($http){
    this.getData = function(page,keyword,callback){
        var url = "http://10.118.1.48:8080/articles?page="+ page.articlePage+"&size="+ page.articleSize+"&keyword="+keyword;
        if(page.sort!=null){
            url = url + "&sort="+page.sort.field+","+page.sort.sort;
        }
        $http.get(url).success(function(response) {
            var data = response.result;
            if(response.status == "SUCCESS"){
                if(callback!=null){
                    callback(data);
                }
            }else{
                alert("获取数据失败");
                console.log(data);
            }
        }).error(function(data1,header,config,status){
            //处理响应失败
            alert("请求失败");
            console.log(data1);
        });
    }
});