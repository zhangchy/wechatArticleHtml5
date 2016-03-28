wechatArticle.controller('ArticlesController', function($scope, $http,ArticlesService) {
    $scope.page={
        articlePage:1,
        articleSize:10,
        sort:null
    }
    //加载数据
    $scope.getArticles = function(){
        document.getElementById("loadMoreText").innerHTML = "正在加载....败着急";
        var keyword = document.getElementById("searchKey").value;
        ArticlesService.getData($scope.page,keyword,function(result){
            if(result.count == 0){
                document.getElementById("loadMore").onclick = null;
                document.getElementById("loadMoreText").innerHTML = "无搜索记录";
            }else{
                if(($scope.page.articlePage-1)*$scope.page.articleSize>=result.count){
                    document.getElementById("loadMore").onclick = null;
                    document.getElementById("loadMoreText").innerHTML = "已经到最后";
                }else{
                    document.getElementById("loadMoreText").innerHTML = "加载更多";
                }
            }
            if($scope.page.articlePage == 1){
                $("#articles_list ul").not(":first").remove();
                $scope.articles = result.data;
            }else if($scope.page.articlePage >=2){
                var key = "articles"+($scope.page.articlePage-1);
                $scope[key] = result.data;
            }
            $scope.page.articlePage = $scope.page.articlePage +1;
        });
    }

    $scope.getArticles();

    //初始化参数
    $scope.initParams = function(){
        $scope.articles = null;
        $scope.page.articlePage = 1;
        $scope.page.articleSize = 10;
        $scope.page.sort = null;
    }

    //选择的排序样式
    $scope.sortSelect = function(sortId){
        var sortUpImg = document.getElementById("sort_up_img");
        var sortDownImg = document.getElementById("sort_down_img");
        document.getElementById("readAmountSort").className = "no-click-sort-a";
        document.getElementById("publishSort").className = "no-click-sort-a";
        document.getElementById("updateSort").className = "no-click-sort-a";
        if(sortId!=null){
            document.getElementById(sortId).className = "click-sort-a";
        }

        if(sortId!=null&&sortId =="readAmountSort"){
            if(sortUpImg.className == "sort-up-gray"&&sortDownImg.className == "sort-down-gray"){
                sortUpImg.className = "sort-up-red";
                sortDownImg.className = "sort-down-gray";
                $scope.page.sort.sort = "asc";
            }else if(sortUpImg.className == "sort-up-gray"&&sortDownImg.className == "sort-down-red"){
                sortDownImg.className = "sort-down-gray";
                sortUpImg.className = "sort-up-red";
                $scope.page.sort.sort = "desc";
            }else if(sortUpImg.className == "sort-up-red"&&sortDownImg.className == "sort-down-gray"){
                sortDownImg.className = "sort-down-red";
                sortUpImg.className = "sort-up-gray";
                $scope.page.sort.sort = "asc";
            }
        }else{
            sortUpImg.className = "sort-up-gray";
            sortDownImg.className = "sort-down-gray";
        }
    }

    //阅读量排序
    readAmountSort.onclick = function(){
        $scope.initParams();
        $scope.page.sort = {"field":"readAmount","sort":"desc"};
        $scope.sortSelect("readAmountSort");
        $scope.getArticles();
    }
    //发布时间排序
    publishSort.onclick = function(){
        $scope.initParams();
        $scope.page.sort = {"field":"postDate","sort":"desc"};
        $scope.sortSelect("publishSort");
        $scope.getArticles();
    }
    //更新时间排序
    updateSort.onclick = function(){
        $scope.initParams();
        $scope.page.sort = {"field":"last_up","sort":"desc"};
        $scope.sortSelect("updateSort");
        $scope.getArticles();
    }

    //搜索
    var searchBtn = document.getElementById("searchA");
    searchBtn.onclick = function(){
        $scope.initParams();
        $scope.sortSelect(null);
        $scope.getArticles();
    }

    //表单提交
    var form = document.getElementById("search_form");
    form.submit = function(){
        $scope.getArticles();
    };

});