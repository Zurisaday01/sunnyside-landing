const { src, dest, watch, series } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const cssnano = require('cssnano');
const terser = require('gulp-terser');
const browsersync = require('browser-sync').create();

//Sass Task
function scssTask() {
	return src('src/scss/style.scss', { sourcemaps: true })
		.pipe(sass())
		.pipe(postcss([cssnano()]))
		.pipe(dest('dist', { sourcemaps: '.' }));
}

//JS Task
function jsTask() {
	return src('src/js/*.js')
		.pipe(terser())
		.pipe(dest('dist', { sourcemaps: '.' }));
}

//Browsersync Task
function browsersyncServe(cb) {
	browsersync.init({
		server: {
			baseDir: './dist',
		},
		open: 'external',
		host: '192.168.3.7',

		port: 3000,
	});
	cb();
}

//Imagemin Task
function imageTask() {
	return src('src/img/*.{gif,png,jpg,svg}').pipe(
		dest('dist', { sourcemaps: '.' })
	);
}

function browsersyncReload(cb) {
	browsersync.reload();
	cb();
}

// Watch Task
function watchTask() {
	watch('*.html', browsersyncReload);
	watch(
		['src/scss/**/*.scss', 'src/js/**/*.js'],
		series(scssTask, jsTask, browsersyncReload)
	);
}

//Default Gulp Task
exports.default = series(
	scssTask,
	jsTask,
	browsersyncServe,
	watchTask,
	imageTask
);
