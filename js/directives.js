//标签指令
wechatArticle.directive('pagination',function($compile){
    return{
        restrict:"AEMC",
        /*replace: true,
        templateUrl: "../tpls/pagination.html",*/
        scope:true,
        template: '<div class="footer-wrapper">'+
                        '<a href="javascript:void(0)" id="loadMore"><span id="loadMoreText">查看更多</span><img src="images/load_more.ico"/></a>'+
                  '</div>',
        link:function($scope, el, attr){
            var index = 1;
            var imgIndex = 1;
            document.getElementById("loadMore").onclick = function(){
                $scope.getArticles();
                var tmplHtml =
                     '<ul>'+
                        '<li ng-repeat="item in articles'+index+'"class="article-list-li">'+
                            '<a href="{{item.href}}">'+
                                '<div class="article-a-div">'+
                                    '<div class="article-title-div">'+
                                        '<div class="article-title">'+
                                        '{{item.title}}}'+
                                        '</div>'+
                                        '<div class="article-other-info">'+
                                            '<span class="article-readcount">'+
                                                '阅读 {{item.readAmount}}'+
                                            '</span>'+
                                            '<span class="article-postuser">'+
                                                '{{item.postUser}}'+
                                            '</span>'+
                                        '</div>'+
                                    '</div>'+
                                    '<div class="article-img-div">'+
                                        '<img class="article-img" src="images/article1.jpg" alt=""/>'+
                                    '</div>'+
                                '</div>'+
                            '</a>'+
                        '</li>'+
                    '</ul>';
                var el = $compile(tmplHtml)($scope); //重新compile一下，再append
                $("#articles_list").append(el)
                index = index + 1;
            };
        }
    }
});