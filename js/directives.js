//标签指令
wechatArticle.directive('pagination',['$compile',function($compile){
    var contentUrl;
    var articleIndex = 0;
    var getArticlesContent = function(scope){
        scope.getArticles();
        var tmplHtml =
            '<ul>'+
                '<li ng-repeat="item in articles"'+articleIndex+'  class="article-list-li">'+
                    '<a href="{{item.href}}">'+
                        '<div class="article-title">{{item.title}}</div>'+
                    '</a>'+
                    '<div class="article-img-div">'+
                        '<a href="{{item.href}}">'+
                            '<img class="article-img" src="dest/images/link.jpg" alt=""/>'+
                        '</a>'+
                    '</div>'+
                    '<div class="article-title-div">'+
                        '<a href="{{item.href}}">'+
                            '<div class="article-summary">{{item.summary}}</div>'+
                        '</a>'+
                        '<div class="article-other-info">'+
                            '<span class="article-readcount">'+
                                '阅读 {{item.showReadAmount}}'+
                            '</span>'+
                            '<span class="article-postuser">'+
                                '{{item.postUser}}'+
                            '</span>'+
                            '<span class="article-posterCode">'+
                                '{{item.postUser}}'+
                            '</span>'+
                        '</div>'+
                    '</div>'+
                '</li>'+
            '</ul>';
        var el = $compile(tmplHtml)(scope); //重新compile一下，再append
        $("#articles_list").append(el);
        articleIndex = articleIndex + 1;
    };
    var getPublicNumsContent = function(scope){
        scope.getPublicNums();
        var index = 1;
        scope.getPublicNums();
        var tmplHtml =
            '<ul>'+
            '<li ng-repeat="item in publicNums'+index+'">aaaa</li>'+
            '</ul>';
        var el = $compile(tmplHtml)(scope); //重新compile一下，再append
        $("#publicNums_list").append(el);
        index = index + 1;
    };
    return{
        restrict:"AEMC",
        templateUrl: "../tpls/pagination.html",
        /*scope:{
            searchType:'@forSearchType'
        },*/
        /*template: '<div class="footer-wrapper">'+
         '<a href="javascript:void(0)" id="loadMore"><span id="loadMoreText">查看更多</span><img src="images/load_more.ico"/></a>'+
         '</div>',*/
        link:function($scope, el, attr){
            $scope.getArticles();
            document.getElementById("loadMore").onclick = function(){
                var searchType = $("#searchTypeValue").val();
                if(searchType == 2){
                    getPublicNumsContent($scope);
                }else{
                    getArticlesContent($scope);
                }
            }

        }
    }
}]);