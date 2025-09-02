import gulp from "gulp";
import sass from "gulp-sass";
import * as dartSass from "sass";
import cleanCSS from "gulp-clean-css";
import rename from "gulp-rename";
import autoprefixer from "gulp-autoprefixer";
import imagemin from "gulp-imagemin";
import browserSync from "browser-sync";
import webp from "gulp-webp";
import avif from "gulp-avif";
import uglify from "gulp-uglify";
import notify from "gulp-notify";
const sassCompiler = sass(dartSass);
const bs = browserSync.create();

// Tarea para compilar archivos scss a css

export function css() {
  return gulp
    .src("src/scss/**/*.scss") // Carpeta de los archivos scss
    .pipe(
      sassCompiler({
        silenceDeprecations: ["legacy-js-api"],
      }).on(
        "error",
        notify.onError({
          title: "Error en SCSS",
          message: "<%= error.message %>",
        })
      )
    )
    .pipe(
      autoprefixer({
        cascade: false,
        remove: false,
      })
    )
    .pipe(cleanCSS()) // minifica el CSS
    .pipe(rename({ suffix: ".min" })) // Agrega el sufijo .min
    .pipe(gulp.dest("css")) // Carpeta de destino para el css compilado
    .pipe(bs.stream()); // Recarga automática del navegador
}

export function images() {
  return gulp.src("src/img/**/*").pipe(imagemin()).pipe(gulp.dest("img"));
}

export function webpTask() {
  return gulp
    .src("src/img/**/*.{jpg,jpeg,png}")
    .pipe(webp())
    .pipe(gulp.dest("img/webp"));
}

export function avifTask() {
  return gulp
    .src("src/img/**/*.{jpg,jpeg,png}")
    .pipe(avif())
    .pipe(gulp.dest("img/avif"));
}

export function serve() {
  bs.init({ server: "./" });
  gulp.watch("src/scss/**/*.scss", css).on("change", bs.reload);
  gulp.watch("*.html").on("change", bs.reload);
}

export function watch() {
  gulp.watch("src/scss/**/*.scss", css);
  gulp.watch("src/img/**/*.{jpg,jpeg,png}", gulp.series(webpTask, avifTask));
}

// Tarea para minificar JS
export function js() {
  return gulp
    .src("src/js/**/*.js") // Carpeta de tus archivos
    .pipe(uglify()) // Minifica el JS
    .pipe(rename({ suffix: ".min" })) // Agrega el sufijo .min
    .pipe(gulp.dest("js")); // Carpeta de destino
}

// Tarea build par ejecutar todo en paralelo
export const build = gulp.parallel(css, webpTask, avifTask, js);
