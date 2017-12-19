
var gulp = require('gulp');
var imagemin = require('gulp-imagemin');
var imageResize = require('gulp-image-resize');
function processImg (filesrc) {
 return gulp.src(filesrc)
  // compress and save
  .pipe(imagemin({optimizationLevel: 5}))
  .pipe(gulp.dest('./public/assets/upload'))
  // save 300 x 200
  .pipe(imageResize({
    width: 300,
    height: 200,
    crop: true
  }))

  .pipe(gulp.dest('./public/assets/upload'));
}

process.on('message', function (images) {
  console.log('Image processing started...');
  var stream = processImg(images);
  stream.on('end', function () {
    process.send('Image processing complete');
    process.exit();
  });
  stream.on('error', function (err) {
    process.send(err);
    process.exit(1);
  });
});
module.exports = {};
