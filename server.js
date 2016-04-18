var http = require('http');
var url = require('url');
var fs = require('fs');
var path = require('path');

var router = require("./js/database/router");

var Constant = require("./js/common/Constant");

//配置
var config = Constant.getServerConfig();
var timeout = {
    request_timeout : null,
    request_finish : false
}
//开始HTTP服务器
http.createServer(processRequestRoute).listen(config.port);


//路由URL
function processRequestRoute(request, response) {

    var pathname = url.parse(request.url).pathname;
    if (pathname === '/') {
        pathname = "/index.html"; //默认页面
    }
    var ext = path.extname(pathname);
    var localPath = ''; //本地相对路径
    var staticres = false; //是否是静态资源
    if (ext.length > 0) {
        localPath = '.' + pathname;
        staticRes = true;
    } else {
        localPath = '.' + config.srcpath + pathname + '.js';
        staticRes = false;
    }

    //禁止远程访问
    /*if (config.denyAccess && config.denyAccess.length > 0) {
        var islocal = false;
        var remoteAddress = request.connection.remoteAddress;
        for (var j = 0; j < config.localIPs.length; j++) {
            if (remoteAddress === config.localIPs[j]) {
                islocal = true;
                break;
            }
        }
        if (!islocal) {
            for (var i = 0; i < config.denyAccess.length; i++) {
                if (localPath === config.denyAccess[i]) {
                    response.writeHead(403, { 'Content-Type': 'text/plain' });
                    response.end('403:Deny access to this page');
                    return;
                }
            }
        }
    }*/
    //获取数据库中的数据
    var databaseUrl = false;   //查看当前路径是否是获取数据库的路径
    if(config.databasePaths && config.databasePaths.length>0){

        for(var j  = 0;j<config.databasePaths.length;j++){
            if(pathname&&pathname.indexOf(config.databasePaths[j], pathname.length - config.databasePaths[j].length) !== -1){
                databaseUrl = true;
            }
        }
    }

    //禁止访问后端js
    if (staticRes && localPath.indexOf(config.srcpath) >= 0) {
        response.writeHead(403, { 'Content-Type': 'text/plain' });
        response.end('403:Deny access to this page');
        return;
    }

    fs.exists(localPath, function (exists) {
        if (exists) {
            if (staticRes) {
                staticResHandler(localPath, ext, response); //静态资源
            } else {
                try {
                    var handler = require(localPath);
                    if (handler.processRequest && typeof handler.processRequest === 'function') {
                        //clearTimeout(request_timer);
                        handler.processRequest(request, response); //动态资源


                        //server.start(router.route);
                    } else {
                        response.writeHead(404, { 'Content-Type': 'text/plain' });
                        response.end('404:Handle Not found');
                    }
                } catch (exception) {
                    response.writeHead(500, { "Content-Type": "text/plain" });
                    response.end("Server Error:" + exception);
                }
            }
        } else { //资源不存在
            if(databaseUrl){
                var params = url.parse(request.url,true).query;
                getDatabaseData(pathname,params,response);
            }else{
                response.writeHead(404, { 'Content-Type': 'text/plain' });
                response.end('404:File Not found');
            }
        }
    });
}

//处理静态资源
function staticResHandler(localPath, ext, response) {
    fs.readFile(localPath, "binary", function (error, file) {
        if (error) {
            response.writeHead(500, { "Content-Type": "text/plain" });
            response.end("Server Error:" + error);
        } else {
            response.writeHead(200, { "Content-Type": getContentTypeByExt(ext) });
            response.end(file, "binary");
        }
    });
}

//得到ContentType
function getContentTypeByExt(ext) {
    ext = ext.toLowerCase();
    if (ext === '.htm' || ext === '.html')
        return 'text/html';
    else if (ext === '.js')
        return 'application/x-javascript';
    else if (ext === '.css')
        return 'text/css';
    else if (ext === '.jpe' || ext === '.jpeg' || ext === '.jpg')
        return 'image/jpeg';
    else if (ext === '.png')
        return 'image/png';
    else if (ext === '.ico')
        return 'image/x-icon';
    else if (ext === '.zip')
        return 'application/zip';
    else if (ext === '.doc')
        return 'application/msword';
    else
        return 'text/plain';
}

//获取数据库的资源
function getDatabaseData(pathname,params,response){
    router.route(pathname,params,function(result){
        response.writeHead(200, {"Content-Type": "text/plain"});
        response.write(JSON.stringify(result));
        response.end();
    });

}