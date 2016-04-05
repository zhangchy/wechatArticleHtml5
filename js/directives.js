//标签指令
wechatArticle.directive('pagination',['$compile',function($compile){
    var contentUrl;
    return{
        restrict:"AEMC",
        templateUrl: "../tpls/pagination.html",
        /*scope:{},*/
        /*template: '<div class="footer-wrapper">'+
                        '<a href="javascript:void(0)" id="loadMore"><span id="loadMoreText">查看更多</span><img src="images/load_more.ico"/></a>'+
                  '</div>',*/
        link:function($scope, el, attr){
            $scope.getArticles();
            var index = 1;
            document.getElementById("loadMore").onclick = function(){
                $scope.getArticles();
                var tmplHtml =
                     '<ul>'+
                        '<li ng-repeat="item in articles'+index+'" class="article-list-li">'+
                            '<a href="{{item.href}}">'+
                                '<div class="article-title">{{item.title}}</div>'+
                            '</a>'+
                            '<div class="article-img-div">'+
                                '<a href="{{item.href}}">'+
                                    '<img class="article-img" src="images/link.jpg" alt=""/>'+
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
                var el = $compile(tmplHtml)($scope); //重新compile一下，再append
                $("#articles_list").append(el);
                index = index + 1;
            };
        }
    }
}]);