wechatArticle.controller('ArticlesController', function($scope, $http) {
    var loadMoreBtn = document.getElementById("loadMore");
    document.getElementById("loadMoreText").innerHTML = "正在加载";

    $scope.items = new Array();
    $scope.articlePage = 1;
    $scope.articleSize = 10;
    $scope.sort = null;

    //加载数据
    $scope.load = function(){
        var keyword = document.getElementById("searchKey").value;
        var url = "http://10.118.1.48:8080/articles?page="+ $scope.articlePage+"&size="+ $scope.articleSize+"&keyword="+keyword;
        if($scope.sort!=null){
            url = url + "&sort="+$scope.sort.field+","+$scope.sort.sort;
        }
        //待优化
        $http.get(url).success(function(response) {
            var data = response.result;
            if(response.status == "SUCCESS"){
                if($scope.items==null||$scope.items.length==0){
                    $scope.items = data.data;
                }else{
                    $scope.items = $scope.items.concat(data.data);
                }
                window.articlePage = window.articlePage + 1;
                if((window.articlePage-1)*window.articleSize>=data.count){
                    document.getElementById("loadMore").onclick = null;
                    document.getElementById("loadMoreText").innerHTML = "已经到最后";
                }else{
                    document.getElementById("loadMoreText").innerHTML = "加载更多";
                }
            }else{
                alert(data);
            }
        });
    }

    $scope.load();

    loadMoreBtn.onclick = function(){
        $scope.load();
    }

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
        $scope.items = null;
        $scope.sort = {"field":"readAmount","sort":"desc"};
        if(sortUpImg.className == "sort-up-gray"&&sortDownImg.className == "sort-down-gray"){
            sortDownImg.className = "sort-down-red";
            sortUpImg.className = "sort-up-gray";
            $scope.sort.sort = "asc";
        }else if(sortUpImg.className == "sort-up-gray"&&sortDownImg.className == "sort-down-red"){
            sortDownImg.className = "sort-down-gray";
            sortUpImg.className = "sort-up-red";
            $scope.sort.sort = "desc";
        }else if(sortUpImg.className == "sort-up-red"&&sortDownImg.className == "sort-down-gray"){
            sortDownImg.className = "sort-down-red";
            sortUpImg.className = "sort-up-gray";
            $scope.sort.sort = "asc";
        }
        $scope.load();
    }

    publishSort.onclick = function(){
        readAmountSort.className="no-click-sort-a";
        publishSort.className = "click-sort-a";
        updateSort.className = "no-click-sort-a";
        sortDownImg.className = "sort-down-gray";
        sortUpImg.className = "sort-up-gray";
        $scope.items = null;
        $scope.sort = {"field":"postDate","sort":"desc"};
        $scope.load();
    }

    updateSort.onclick = function(){
        readAmountSort.className="no-click-sort-a";
        publishSort.className = "no-click-sort-a";
        updateSort.className = "click-sort-a";
        sortDownImg.className = "sort-down-gray";
        sortUpImg.className = "sort-up-gray";
        $scope.items = null;
        $scope.sort = {"field":"last_up","sort":"desc"};
        $scope.load();
    }

    //搜索
    var searchBtn = document.getElementById("searchA");
    searchBtn.onclick = function(){
        readAmountSort.className="no-click-sort-a";
        publishSort.className = "no-click-sort-a";
        updateSort.className = "no-click-sort-a";
        sortDownImg.className = "sort-down-gray";
        sortUpImg.className = "sort-up-gray";
        $scope.items = null;
        $scope.sort = null;
            $scope.load();
    }


});