var app = angular.module('wechatArticle', []);
window.articlePage = 1;
window.articleSize = 10;
var items = new Array();
var loadMoreBtn = document.getElementById("loadMore");
app.controller('TaskCtrl', function($scope, $http) {
    var keyword = document.getElementById("searchKey").value;
    loadArticles(window.articlePage,window.articleSize,keyword,$scope,$http);

    loadMoreBtn.onclick = function(){
        loadArticles(window.articlePage,window.articleSize,document.getElementById("searchKey").value,$scope,$http);
    }

    var readAmountSort = document.getElementById("readAmountSort");
    readAmountSort.onclick = function(){
        items = null;
        var sort = {"field":"readAmount","sort":"desc"};
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
                }
            }else{
                alert(data);
            }
        });
}