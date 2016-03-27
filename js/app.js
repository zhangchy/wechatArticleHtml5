var wechatArticle = angular.module('wechatArticle', [
    'ngRoute'
]);
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
                templateUrl: '../tpls/footer.html'
            })
            .state('main',{
                url: '/main',
                templateUrl: '../tpls/main.html'
            })
    }
]);*/
/*app.config(function($stateProvider,$urlRouterProvider){
    $stateProvider.otherwise("/index");
    $stateProvider.state('index',{
        templateUrl:"tpls/articles.html",
        controller:"ArticlesController"
    });
});*/
