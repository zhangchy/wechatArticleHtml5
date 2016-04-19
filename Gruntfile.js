module.exports = function(grunt){
	//项目配置
	grunt.initConfig({
		//读取配置项
		pkg:grunt.file.readJSON("package.json"),
        //具体任务
        cssmin:{
            "options": {
                "keepSpecialComments": 0
            },
            "compress": {
                "files": {
                    "dest/css/style.css": [
                        "css/style.css"
                    ]
                }
            }
        },
        imagemin: {
            /* 压缩图片大小 */
            dist: {
                options: {
                    optimizationLevel: 3 //定义 PNG 图片优化水平
                },
                files: [
                    {
                        expand: true,
                        cwd: 'images/',
                        src: ['**/*.{png,jpg,jpeg}'], // 优化 img 目录下所有 png/jpg/jpeg 图片
                        dest: 'dest/images/' // 优化后的图片保存位置，覆盖旧图片，并且不作提示
                    }
                ]
            }
        },
		uglify:{
			options:{
				//加注释
				banner:"/* 这个文件 <%= pkg.name %><%= pkg.version%> \n*/"
			},
			build:{
                files: [
                    {
                        "dest/js/index.min.js": ['js/angularjs_1.5.3/angular.min.js','js/angularjs_1.5.3/angular-route.min.js','js/jquery/jquery-1.7.1.min.js','js/app.js','js/controller.js','js/directives.js','js/services.js']
                    }
                ]
			}
		},
		jshint: {
	    	files: ['Gruntfile.js'],
    		options: {
      		}
    	},
	    watch: {
	      files: ['js/*.js','css/*.css','images/*'],
	      tasks: ['uglify','cssmin','imagemin']
	    }
	});
	//加载插件
	grunt.loadNpmTasks("grunt-contrib-uglify");
	grunt.loadNpmTasks('grunt-contrib-jshint');
  	grunt.loadNpmTasks('grunt-contrib-watch');
  	grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    //默认执行任务
	grunt.registerTask("default",["uglify",'imagemin']);
};