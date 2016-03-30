/*angularjs的启动方式*/
var wechatArticle = angular.module('wechatArticle', [
    'ngRoute'
]);
console.log(angular);
var counterF = 0;
var counterP = 0;
for(var p in angular){
    /*p是angular对象里面的一个field取出里面的内容 angular[p]判断他是否为一个function*/
    if(angular.isFunction(angular[p])){
        counterF = counterF + 1;
        console.log("function - >"+p);
    }else{
        counterP = counterP + 1;
        console.log("property - >"+p);
    }
}
console.log("function counter:"+counterF);
console.log("property counter:"+counterP);
//$routeProvider是angularjs自身提供的路由机制
//因此使用路由的时候需要引入angular-route.js

wechatArticle.config(function($routeProvider){
    $routeProvider.when('/articles',{
        templateUrl:"../tpls/articles.html",
        controller:"ArticlesController"
    }).otherwise({
        templateUrl:"../tpls/articles.html",
        controller:"ArticlesController"
    });
});
/*wechatArticle.config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {
        $urlRouterProvider
            // 错误的路由重定向
            .when('/c?id', '/contacts/:id')
            .when('/user/:id', '/contacts/:id')
            .otherwise('/main');
        $stateProvider
            .state('header', {
                url: '/header',
                templateUrl: '../tpls/header.html'
            })
            .state('body',{
                url: '/body',
                templateUrl: '../tpls/body.html'
            })
            .state('footer',{
                url: '/footer',
                templateUrl: '../tpls/pagination.html'
            })
            .state('main',{
                url: '/main',
                templateUrl: '../tpls/main.html'
            })
    }
]);*/
