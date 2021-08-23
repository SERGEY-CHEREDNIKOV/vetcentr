"use strict";

import gulp from 'gulp';
import plumber from 'gulp-plumber';
import gulpSass from 'gulp-sass';
import compiler from 'sass';
import autoprefixer from 'gulp-autoprefixer';
import cssbeautify from 'gulp-cssbeautify';
import nano from 'cssnano';
import postcss from 'gulp-postcss';
import removeComments from 'gulp-strip-css-comments';
import rename from 'gulp-rename';
import imagemin, { gifsicle, mozjpeg, optipng, svgo } from 'gulp-imagemin';
import del from 'del';
import webpack from 'webpack-stream';
import browsersync from 'browser-sync';

const sass = gulpSass(compiler);


/* Paths */
let path = {
  dist: {
    html: "dist/",
    js: "dist/js/",
    css: "dist/css/",
    images: "dist/img/",
    fonts: "dist/fonts/"
  },
  src: {
    html: "src/*.html",
    js: "src/js/*.js",
    css: "src/scss/style.scss",
    images: "src/img/**/*.{jpg,png,svg,gif,ico}",
    fonts: "src/fonts/*.{woff,woff2}"
  },
  watch: {
    html: "src/**/*.html",
    js: "src/js/**/*.js",
    css: "src/scss/**/*.scss",
    images: "src/img/**/*.{jpg,png,svg,gif,ico}",
    fonts: "src/fonts/*.{woff,woff2}",
  },
  clean: "./dist"
}

export const browserSync = () => {
  browsersync.init({
    server: {
      baseDir: "./dist/"
    },
    port: 3000
  });
}

export const browserSyncReload = () => {
  browsersync.reload();
}

export const html = () => {
  return gulp.src(path.src.html, { base: "src/" })
    .pipe(plumber())
    .pipe(gulp.dest(path.dist.html))
    .pipe(browsersync.stream());
}

export const css = () => {
  return gulp.src(path.src.css, { base: "src/scss/" })
    .pipe(plumber())
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(cssbeautify())
    .pipe(gulp.dest(path.dist.css))
    .pipe(browsersync.stream())
    .pipe(postcss([
      nano(
        {
          zindex: false,
          discardComments: {
            removeAll: true
          }
        }
      )
    ]))
    .pipe(removeComments())
    .pipe(rename({
      suffix: ".min",
      extname: ".css"
    }))
    .pipe(gulp.dest('dist/css/'))
    .pipe(browsersync.stream());
}

export const buildJs = () => {
  return gulp.src(path.src.js, { base: './src/js/' })
    .pipe(webpack({
      mode: 'development',
      output: {
        filename: 'script.js'
      },
      watch: false,
      devtool: "source-map",
      // target: ['web', 'es5'],
      module: {
        rules: [
          {
            test: /\.m?js$/,
            exclude: /(node_modules|bower_components)/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: [['@babel/preset-env', {
                  debug: true,
                  corejs: 3,
                  useBuiltIns: "usage"
                }]]
              }
            }
          }
        ]
      }
    }))
    .pipe(gulp.dest(path.dist.js))
    .on("end", browsersync.reload);
}

export const buildProdJs = () => {
  return gulp.src(path.src.js, { base: './src/js/' })
    .pipe(webpack({
      mode: 'production',
      output: {
        filename: 'script.js'
      },
      module: {
        rules: [
          {
            test: /\.m?js$/,
            exclude: /(node_modules|bower_components)/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: [['@babel/preset-env', {
                  corejs: 3,
                  useBuiltIns: "usage"
                }]]
              }
            }
          }
        ]
      }
    }))
    .pipe(gulp.dest(path.dist.js));
};

export const img = () => {
  return gulp.src(path.src.images)
    .pipe(imagemin([
      gifsicle({ interlaced: true }),
      mozjpeg({ quality: 70, progressive: true }),
      optipng({ optimizationLevel: 5 }),
      svgo(),
    ]))
    .pipe(gulp.dest(path.dist.images));
}

export const fonts = () => {
  return gulp.src(path.src.fonts)
    .pipe(gulp.dest(path.dist.fonts));
}


export const clean = () => del(path.clean);

export const watchFiles = () => {
  gulp.watch([path.watch.html], html);
  gulp.watch([path.watch.css], css);
  gulp.watch([path.watch.js], buildJs);
  gulp.watch([path.watch.images], img);
  gulp.watch([path.watch.fonts], fonts);
};

const build = gulp.series(clean, gulp.parallel(html, css, buildJs, img, fonts));
const watch = gulp.parallel(build, watchFiles, browserSync, browserSyncReload);
/*
 * Export a default task
 */
export default watch;







