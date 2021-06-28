const { src, dest, watch, series } = require("gulp");
const sass = require("gulp-sass");
const imagemin = require("gulp-imagemin");
const webp = require("gulp-webp");
const concat = require("gulp-concat");

sass.compiler = require("dart-sass");

function compilarSASS() {
  return src("./src/scss/app.scss").pipe(sass()).pipe(dest("./build/css"));
}

function javascript() {
  return src("src/js/**/*.js")
    .pipe(concat("bundle.js"))
    .pipe(dest("./build/js"));
}

function imagenes() {
  return src("src/img/**/*").pipe(imagemin()).pipe(dest("./build/img"));
}

function versionWebp() {
  return src("src/img/**/*").pipe(webp()).pipe(dest("./build/img"));
}

function watchArchivos() {
  watch("./src/scss/**/*.scss", compilarSASS);
  watch("src/js/**/*.js", javascript);
}
exports.compilarSASS = compilarSASS;
exports.imagenes = imagenes;
exports.watchArchivos = watchArchivos;

exports.default = series(
  compilarSASS,
  javascript,
  imagenes,
  versionWebp,
  watchArchivos
);
