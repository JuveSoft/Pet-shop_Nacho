import gulp from "gulp";
import sass from "gulp-sass";
import * as dartSass from "sass";
import cleanCSS from "gulp-clean-css";
import rename from "gulp-rename";
import autoprefixer from "gulp-autoprefixer";
import uglify from "gulp-uglify";

const sassCompiler = sass(dartSass);

// Tarea para compilar archivos scss a css
export function css() {
  return gulp
    .src("src/scss/**/*.scss") // Carpeta de los archivos scss
    .pipe(
      sassCompiler({
        silenceDeprecations: ["legacy-js-api"],
      }).on("error", function (error) {
        console.error("Error SCSS:", error.message);
        this.emit("end");
      })
    )
    .pipe(
      autoprefixer({
        cascade: false,
        remove: false,
      })
    )
    .pipe(cleanCSS()) // minifica el CSS
    .pipe(rename({ suffix: ".min" })) // Agrega el sufijo .min
    .pipe(gulp.dest("css")); // Carpeta de destino para el css compilado
}

// Tarea de watch
export function watch() {
  gulp.watch("src/scss/**/*.scss", css);
}

// Tarea para minificar JS
export function js() {
  return gulp
    .src("src/js/**/*.js") // Carpeta de tus archivos
    .pipe(uglify()) // Minifica el JS
    .pipe(rename({ suffix: ".min" })) // Agrega el sufijo .min
    .pipe(gulp.dest("js")); // Carpeta de destino
}

// Tarea build para ejecutar tareas principales
export const build = gulp.parallel(css, js);

// Tarea por defecto
export default css;
