wechatArticle.controller('ArticlesController', ['$scope','$http','ArticlesService','PublicNumsService',function($scope, $http,ArticlesService,PublicNumsService) {
    $scope.hassearch = false;
    $scope.page={
        articlePage:1,
        articleSize:10,
        sort:null
    }
    $scope.publicNumsPage={
        page:1,
        size:10
    }
    $scope.searchKeyWord = "";
    //加载数据
    $scope.getArticles = function(){
        document.getElementById("loadMoreText").innerHTML = "正在加载....败着急";
        var keyword = $scope.searchKeyWord;
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
                $scope.articles = result.data;
            }else if($scope.page.articlePage >=2){
                var key = "articles"+($scope.page.articlePage-1);
                $scope[key] = result.data;
            }
            $scope.page.articlePage = $scope.page.articlePage +1;
            $scope.hassearch = false;
        },function(error){
            $scope.hassearch = false;
            document.getElementById("loadMoreText").innerHTML = "请求超时";
        });
    }
    //获取公众号
    $scope.getPublicNums = function(){
        document.getElementById("loadMoreText").innerHTML = "正在加载....败着急";
            var keyword = $scope.searchKeyWord;
            PublicNumsService.getData($scope.publicNumsPage,keyword,function(result){
                console.log(result);
                if(result.count == 0){
                    document.getElementById("loadMore").onclick = null;
                    document.getElementById("loadMoreText").innerHTML = "无搜索记录";
                }else{
                    if(($scope.publicNumsPage.page-1)*$scope.publicNumsPage.size>=result.count){
                        document.getElementById("loadMore").onclick = null;
                        document.getElementById("loadMoreText").innerHTML = "已经到最后";
                    }else{
                        document.getElementById("loadMoreText").innerHTML = "加载更多";
                    }
                }
                if($scope.publicNumsPage.page == 1){
                    $scope.publicNums = result.data;
                }else if($scope.publicNumsPage.page >=2){
                    var key = "publicNums"+($scope.publicNumsPage.page-1);
                    $scope[key] = result.data;
                }
                console.log($scope.publicNums);
                $scope.publicNumsPage.page = $scope.publicNumsPage.page +1;
                $scope.hassearch = false;
            },function(error){
                $scope.hassearch = false;
                document.getElementById("loadMoreText").innerHTML = "请求超时";
            });
    }

    //初始化参数
    $scope.articlesInitParams = function(){
        $scope.hassearch = true;
        $scope.articles = null;
        $("#articles_list ul").not(":first").remove();
        $scope.page.articlePage = 1;
        $scope.page.articleSize = 10;
        $scope.page.sort = null;
    }
    $scope.publicNumsInitParams = function(){
        $scope.hassearch = true;
        $scope.publicNums = null;
        $("#publicNums_list ul").not(":first").remove();
        $scope.publicNumsPage.page = 1;
        $scope.publicNumsPage.size = 10;
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
                $scope.page.sort.sort = "asc";
            }else if(sortUpImg.className == "sort-up-red"&&sortDownImg.className == "sort-down-gray"){
                sortDownImg.className = "sort-down-red";
                sortUpImg.className = "sort-up-gray";
                $scope.page.sort.sort = "desc";
            }
        }else{
            sortUpImg.className = "sort-up-gray";
            sortDownImg.className = "sort-down-gray";
        }
    }

    //阅读量排序
    readAmountSort.onclick = function(){
        if(!$scope.hassearch){
            $scope.articlesInitParams();
            $scope.page.sort = {"field":"readAmount","sort":"desc"};
            $scope.sortSelect("readAmountSort");
            $scope.getArticles();
        }
    }
    //发布时间排序
    publishSort.onclick = function(){
        if(!$scope.hassearch){
            $scope.articlesInitParams();
            $scope.page.sort = {"field":"postDate","sort":"desc"};
            $scope.sortSelect("publishSort");
            $scope.getArticles();
        }
    }

    //更新时间排序
    updateSort.onclick = function(){
        if(!$scope.hassearch){
            $scope.articlesInitParams();
            $scope.page.sort = {"field":"last_up","sort":"desc"};
            $scope.sortSelect("updateSort");
            $scope.getArticles();
        }
    }

    //搜索
    var searchBtn = document.getElementById("searchA");
    searchBtn.onclick = function(){
        if(!$scope.hassearch){
            $scope.articlesInitParams();
            $scope.publicNumsInitParams();
            if($("#searchTypeValue").val()==1){
                $scope.sortSelect(null);
                $scope.searchKeyWord = document.getElementById("searchKey").value;
                $scope.getArticles();
            }else{
                $scope.searchKeyWord = document.getElementById("searchKey").value;
                $scope.getPublicNums();
            }

        }
    }

    //表单提交
    var form = document.getElementById("search_form");
    form.submit = function(){
        $scope.getArticles();
    };

    //回到顶部效果
    var obj = document.getElementById("stick");
    window.onscroll = function() {
        obj.style.display = (document.body.scrollTop >= window.screen.availHeight*3) ? "block" : "none";
    }
    obj.onclick = function(){
        $('html, body').animate({scrollTop: 0}, 1000);
    }



    //选择搜索类型
    var searchType = document.getElementById("search_type");
    var searchTypeSelect = document.getElementById("search_type_select");
    var searchTypeTriangle = document.getElementsByClassName("search_type_triangle")[0];
    searchType.onclick = function(){
        if(searchTypeSelect.style.display == "none"){
            searchTypeTriangle.style.display="inline-block";searchTypeSelect.style.display="inline-block";
        }else{
            searchTypeTriangle.style.display="none";searchTypeSelect.style.display="none";
        }
    };
    document.getElementById("search_article").onclick = function(){
        $("#searchTypeValue").val(1);
        document.getElementById("searchKey").placeholder = "搜文章";
        searchTypeTriangle.style.display="none";searchTypeSelect.style.display="none";
    };
    document.getElementById("search_public_num").onclick = function(){
        $("#searchTypeValue").val(2);
        document.getElementById("searchKey").placeholder = "搜公众号";
        searchTypeTriangle.style.display="none";searchTypeSelect.style.display="none";
    };
}]);

