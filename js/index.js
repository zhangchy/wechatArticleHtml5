var app = angular.module('wechatArticle', []);
window.articlePage = 1;
window.articleSize = 10;
var items = new Array();
var loadMoreBtn = document.getElementById("loadMore");
document.getElementById("loadMoreText").innerHTML = "正在加载";
app.controller('TaskCtrl', function($scope, $http) {
    var keyword = document.getElementById("searchKey").value;
    loadArticles(window.articlePage,window.articleSize,keyword,$scope,$http);

    loadMoreBtn.onclick = function(){
        loadArticles(window.articlePage,window.articleSize,document.getElementById("searchKey").value,$scope,$http);
    }

    var readAmountSort = document.getElementById("readAmountSort");
    var publishSort = document.getElementById("publishSort");
    var updateSort = document.getElementById("updateSort");
    readAmountSort.onclick = function(){
        readAmountSort.className="click-sort-a";
        publishSort.className = "no-click-sort-a";
        updateSort.className = "no-click-sort-a";
        items = null;
        var readAmountImage = document.getElementById("readAmountImage");
        var sortUpImg = document.getElementById("sort_up_img");
        var sortDownImg = document.getElementById("sort_down_img");
        var sort = {"field":"readAmount","sort":"desc"};
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
        loadArticles(window.articlePage,window.articleSize,document.getElementById("searchKey").value,$scope,$http,sort);
    }

    publishSort.onclick = function(){
        readAmountSort.className="no-click-sort-a";
        publishSort.className = "click-sort-a";
        updateSort.className = "no-click-sort-a";
        items = null;
        var sort = {"field":"postDate","sort":"desc"};
        loadArticles(window.articlePage,window.articleSize,document.getElementById("searchKey").value,$scope,$http,sort);
    }

    updateSort.onclick = function(){
        readAmountSort.className="no-click-sort-a";
        publishSort.className = "no-click-sort-a";
        updateSort.className = "click-sort-a";
        items = null;
        var sort = {"field":"last_up","sort":"desc"};
        loadArticles(window.articlePage,window.articleSize,document.getElementById("searchKey").value,$scope,$http,sort);
    }
});

function loadArticles(page,size,key,$scope,$http,sort){
    if(!page){
        page = 1;
    }
    if(!size){
        size = 10;
    }
    var url = "http://10.118.1.48:8080/articles?page="+page+"&size="+size+"&keyword="+key;
    if(sort!=null){
        url = url + "&sort="+sort.field+","+sort.sort;
    }
    //待优化
    $http.get(url)
        .success(function(response) {
            var data = response.result;
            if(response.status == "SUCCESS"){
                if(items==null||items.length==0){
                    $scope.items = data.data;
                    items = $scope.items;
                }else{
                    items = items.concat(data.data);
                    $scope.items=items;
                }
                window.articlePage = window.articlePage + 1;
                if((window.articlePage-1)*window.articleSize>=data.count){
                    loadMoreBtn.onclick = null;
                    document.getElementById("loadMoreText").innerHTML = "已经到最后";
                }else{
                    document.getElementById("loadMoreText").innerHTML = "加载更多";
                }
            }else{
                alert(data);
            }
        });
}