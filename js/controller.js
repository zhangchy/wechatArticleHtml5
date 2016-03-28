wechatArticle.controller('ArticlesController', function($scope, $http) {
    var articlePage = 1;
    var articleSize = 10;
    var sort = null;
    var loadIndex = 0;
    //加载数据
    $scope.getArticles = function(){
        document.getElementById("loadMoreText").innerHTML = "正在加载....败着急";
        var keyword = document.getElementById("searchKey").value;
        var url = "http://10.118.1.48:8080/articles?page="+ articlePage+"&size="+ articleSize+"&keyword="+keyword;
        if(sort!=null){
            url = url + "&sort="+sort.field+","+sort.sort;
        }
        if(loadIndex == 0){
            articlePage = 1;
            articleSize = 10;
        }
        $http.get(url).success(function(response) {
            var data = response.result;
            if(response.status == "SUCCESS"){

                articlePage = articlePage + 1;
                if(data.count == 0){
                    document.getElementById("loadMore").onclick = null;
                    document.getElementById("loadMoreText").innerHTML = "无搜索记录";
                }else{
                    if((articlePage-1)*articleSize>=data.count){
                        document.getElementById("loadMore").onclick = null;
                        document.getElementById("loadMoreText").innerHTML = "已经到最后";
                    }else{
                        document.getElementById("loadMoreText").innerHTML = "加载更多";
                    }
                }
                if(loadIndex == 0){
                    $("#articles_list ul").not(":first").remove();
                    $scope.articles = data.data;
                }else if(loadIndex >=1){
                    var key = "articles"+loadIndex;
                    $scope[key] = data.data;
                }
                loadIndex = loadIndex +1;
            }else{
                alert(data);
            }
        });
    }
    $scope.getArticles();

    var readAmountSort = document.getElementById("readAmountSort");
    var publishSort = document.getElementById("publishSort");
    var updateSort = document.getElementById("updateSort");
    var readAmountImage = document.getElementById("readAmountImage");
    var sortUpImg = document.getElementById("sort_up_img");
    var sortDownImg = document.getElementById("sort_down_img");
    readAmountSort.onclick = function(){
        readAmountSort.className="click-sort-a";
        publishSort.className = "no-click-sort-a";
        updateSort.className = "no-click-sort-a";
        $scope.articles = null;
        loadIndex = 0;
        sort = {"field":"readAmount","sort":"desc"};
        if(sortUpImg.className == "sort-up-gray"&&sortDownImg.className == "sort-down-gray"){
            sortDownImg.className = "sort-down-red";
            sortUpImg.className = "sort-up-gray";
            sort.sort = "asc";
        }else if(sortUpImg.className == "sort-up-gray"&&sortDownImg.className == "sort-down-red"){
            sortDownImg.className = "sort-down-gray";
            sortUpImg.className = "sort-up-red";
            sort.sort = "desc";
        }else if(sortUpImg.className == "sort-up-red"&&sortDownImg.className == "sort-down-gray"){
            sortDownImg.className = "sort-down-red";
            sortUpImg.className = "sort-up-gray";
            sort.sort = "asc";
        }
        $scope.getArticles();
    }

    publishSort.onclick = function(){
        readAmountSort.className="no-click-sort-a";
        publishSort.className = "click-sort-a";
        updateSort.className = "no-click-sort-a";
        sortDownImg.className = "sort-down-gray";
        sortUpImg.className = "sort-up-gray";
        loadIndex = 0;
        $scope.articles = null;
        sort = {"field":"postDate","sort":"desc"};
        $scope.getArticles();
    }

    updateSort.onclick = function(){
        readAmountSort.className="no-click-sort-a";
        publishSort.className = "no-click-sort-a";
        updateSort.className = "click-sort-a";
        sortDownImg.className = "sort-down-gray";
        sortUpImg.className = "sort-up-gray";
        $scope.articles = null;
        loadIndex = 0;
        sort = {"field":"last_up","sort":"desc"};
        $scope.getArticles();
    }

    //搜索
    var searchBtn = document.getElementById("searchA");
    searchBtn.onclick = function(){
        readAmountSort.className="no-click-sort-a";
        publishSort.className = "no-click-sort-a";
        updateSort.className = "no-click-sort-a";
        sortDownImg.className = "sort-down-gray";
        sortUpImg.className = "sort-up-gray";
        $scope.articles = null;
        sort = null;
        loadIndex = 0;
        $scope.getArticles();
    }

    //表单提交
    var form = document.getElementById("search_form");
    form.submit = function(){
        $scope.getArticles();
    };

});