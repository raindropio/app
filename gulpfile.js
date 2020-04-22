var gulp = require('gulp');
var sftp = require('gulp-sftp');

gulp.task('deploy-web', function () {
    return gulp.src('./build/web/**/*.*')
        .pipe(sftp({
            host: 'raindrop.io',
            user: 'root',
            pass: process.argv[process.argv.length-1],
            remotePath: "/root/oblako4/app/"
        }));
});

gulp.task('deploy-win', function () {
    return gulp.src('../Desktop/dist/win/*')
        .pipe(sftp({
            host: 'raindrop.io',
            user: 'root',
            pass: process.argv[process.argv.length-1],
            remotePath: "/root/oblako2/public/releases/win/"
        }));
});

gulp.task('deploy-mac', function() {
	var fse = require('fs-extra'),
		fs = require('fs');

	var pathRelease = __dirname+"/build/desktop/",
		pathTemp = __dirname+'/../Desktop/dist/';

	var platforms = {
		mac: {
			files: [".zip", ".dmg"]
		}
	}

	for(var i in platforms){
		var version = "";
		
		fse.removeSync(pathRelease+i);

		fs.readdirSync(pathTemp+i).forEach(function(file){
			for(var j in platforms[i].files){
				var ext = platforms[i].files[j];

				if (file.indexOf(ext)!=-1){
					var tempFileName = pathTemp+i+"/"+file;
					version = tempFileName.match(/\-(\d+\.\d+\.\d+)/)[1];

					fse.copySync(tempFileName, pathRelease+i+"/Raindrop"+ext);
				}
			}
		});

		fse.writeJSONSync(pathRelease+i+"/"+i+"-update.json", {
			"url": "https://raindrop.io/releases/"+i+"/Raindrop.zip",
			"name": "Raindrop.io",
			"notes": version
		})
	}

	return gulp.src('./build/desktop/**/*')
        .pipe(sftp({
            host: 'raindrop.io',
            user: 'root',
            pass: process.argv[process.argv.length-1],
            remotePath: "/root/oblako2/public/releases/"
        }));
});


//SAFARI
gulp.task('deploy-safari-release', function () {
    return gulp.src('./build/clipper/safari.safariextz')
        .pipe(sftp({
            host: 'raindrop.io',
            user: 'root',
            pass: process.argv[process.argv.length-1],
            remotePath: "/root/oblako2/public/releases/"
        }));
});
gulp.task('deploy-safari-update', function () {
    return gulp.src('./build/clipper/safari.safariextension/safari-update.plist')
        .pipe(sftp({
            host: 'raindrop.io',
            user: 'root',
            pass: process.argv[process.argv.length-1],
            remotePath: "/root/oblako2/private/"
        }));
});

gulp.task('deploy', ['deploy-web']);
gulp.task('deploy-safari', ['deploy-safari-release', 'deploy-safari-update']);
gulp.task('deploy-all', ['deploy-web', 'deploy-win', 'deploy-mac']);
gulp.task('deploy-webmac', ['deploy-web', 'deploy-mac']);