module.exports = function(grunt){
	//项目配置
	grunt.initConfig({
		//读取配置项
		pkg:grunt.file.readJSON("package.json"),
		//具体任务
		uglify:{
			options:{
				//加注释
				banner:"/* 这个文件 <%= pkg.name %><%= pkg.version%> \n*/"
			},
			build:{
				//被压缩的文件的路径
				src: "src/jquery-1.9.1.js",
				//被压缩后的文件路径
				dest:"dest/jquery-1.9.1.min.js"
			}
		},
		//合并
		concat:{
			options:{
				//加注释
				banner:"/* 这个文件 <%= pkg.name %><%= pkg.version%> 合并的js\n*/"
			},
			build:{
				//被压缩的文件的路径
				src: "src/*.js",
				//被压缩后的文件路径
				dest:"dest/concat.js"
			}
		},
		jshint: {
	    	files: ['Gruntfile.js'],
    		options: {
      		}
    	},
	    watch: {
	      files: ['src/*.html','src/*.css'],
	      tasks: ['jshint']
	    }
	});
	//加载插件
	grunt.loadNpmTasks("grunt-contrib-uglify");
	grunt.loadNpmTasks('grunt-contrib-jshint');
  	grunt.loadNpmTasks('grunt-contrib-watch');
  	grunt.loadNpmTasks('grunt-contrib-concat');
	//默认执行任务
	grunt.registerTask("default",["uglify","concat","jshint",'watch']);
};