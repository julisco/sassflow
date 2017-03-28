import gulp from 'gulp';
import gulpMultidest from 'gulp-multidest';
import gulpSass from 'gulp-sass';
import gulpSourcemaps from 'gulp-sourcemaps';
import gulpPostcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import assets from 'postcss-assets';
import scss from 'postcss-scss';
import stylelint from 'stylelint';
import reporter from 'postcss-reporter';
import sorting from 'postcss-sorting';
import csswring from 'csswring';
import sassdoc from 'sassdoc';

const settings = {
  source: 'demo/sass/**/*.scss',
  dest: 'demo/css/',
  browsers: ['last 2 versions'],
  sassdocPath: 'demo/sassdoc/',
  statsPath: 'demo/stats/',
  assets: {
    basePath: 'demo/',
    loadPaths: ['img/'],
  },
  sorting: {
    'sort-order': 'csscomb',
    'empty-lines-between-children-rules': 1,
  }
};

// PostCss Dev Processors.
const devProcessors = [
  autoprefixer({ browsers: settings.browsers }),
  assets(settings.assets),
];

// PostCss Prod Processors.
const prodProcessors = [
  ...devProcessors,
  sorting(settings.sorting),
  csswring,
];

const gulpDest = settings.dest instanceof Array ? gulpMultidest(settings.dest) : gulp.dest(settings.dest);

gulp.task('sass:dev', () => {
  gulp.src(settings.source)
    .pipe(gulpSourcemaps.init())
    .pipe(gulpSass())
    .pipe(gulpPostcss(devProcessors, { syntax: scss }))
    .pipe(gulpSourcemaps.write('.', { charset: 'utf8' }))
    .pipe(gulpDest);
});

gulp.task('sass:watch', () => {
  gulp.watch(settings.source, ['sass:dev']);
});

gulp.task('sass:prod', () => {
  gulp
    .src(settings.source)
    .pipe(gulpSass())
    .pipe(gulpPostcss(prodProcessors, { syntax: scss }))
    .pipe(gulpDest);
});

gulp.task('sass:lint', () => {
  gulp.src(settings.source).pipe(
    gulpPostcss([
      stylelint(),
      reporter({ clearMessages: true })
    ], { syntax: scss })
  );
});

gulp.task('sass:doc', () => {
  gulp
    .src(settings.source)
    .pipe(sassdoc({ dest: settings.sassdocPath }));
});
