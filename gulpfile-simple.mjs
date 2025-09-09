import gulp from "gulp";
import sass from "gulp-sass";
import * as dartSass from "sass";
import cleanCSS from "gulp-clean-css";
import rename from "gulp-rename";

const sassCompiler = sass(dartSass);

// Tarea simple para compilar SCSS
export function css() {
  return gulp
    .src("src/scss/**/*.scss")
    .pipe(
      sassCompiler({
        silenceDeprecations: ["legacy-js-api"],
      }).on("error", function (error) {
        console.error("Error SCSS:", error.message);
        this.emit("end");
      })
    )
    .pipe(cleanCSS())
    .pipe(rename({ suffix: ".min" }))
    .pipe(gulp.dest("css"));
}

// Tarea de watch simplificada
export function watch() {
  gulp.watch("src/scss/**/*.scss", css);
}

// Tarea por defecto
export default css;
