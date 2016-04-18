exports.STATUS={
    "SUCCESS":"SUCCESS",
    "FAIL":"FAIL"
};
function getMysqlConfig(){
    return {
        "host":"10.8.100.202",
        "user":"root",
        "password":"",
        "database":"weixin_sogou"
    };
}
function getServerConfig(){
    return {
        "port":"8888",
        "denyAccess":["./httpserver.js", "./src/requirecache.js"],
        "localIPs":["127.0.0.1"],
        "srcpath":"/src",
        "databasePaths":["/articles"]
    };
}
exports.getServerConfig = getServerConfig;
exports.getMysqlConfig = getMysqlConfig;