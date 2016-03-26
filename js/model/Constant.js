exports.STATUS={
    "SUCCESS":"SUCCESS",
    "FAIL":"FAIL"
};
function getMysqlConfig(){
    return {
        "host":"10.118.1.138",
        "user":"root",
        "password":"ouer@2015",
        "database":"weixin_sogou"
    };
}
function getServerConfig(){
    return {
        "port":"8080",
        "denyAccess":["./httpserver.js", "./src/requirecache.js"],
        "localIPs":["127.0.0.1"],
        "srcpath":"/src",
        "databasePaths":["/articles"]
    };
}
exports.getServerConfig = getServerConfig;
exports.getMysqlConfig = getMysqlConfig;