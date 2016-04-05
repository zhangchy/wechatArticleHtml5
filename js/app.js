/*angularjs的启动方式*/
var wechatArticle = angular.module('wechatArticle', ['ngRoute']);
//$routeProvider是angularjs自身提供的路由机制
//因此使用路由的时候需要引入angular-route.js
wechatArticle.config(['$routeProvider',function ($routeProvider) {
    $routeProvider.when('/articles',{
        templateUrl:"../tpls/articles.html",
        controller:"ArticlesController"
    }).otherwise({
        templateUrl:"../tpls/articles.html",
        controller:"ArticlesController"
    });
}]);