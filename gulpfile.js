const {src, dest, watch, parallel} = require('gulp');

//CSS
const sass = require('gulp-sass')(require('sass'));
const plumber = require('gulp-plumber');//encapsula errores de codigo para no detener el flujo del watch
const autoprefixer = require('autoprefixer');//adapta a navegadores que no tengan mucho soporte
const cssnano = require('cssnano'); //comprime el archivo css
const postcss = require('gulp-postcss'); //enlaca las transformaciones 
const sourcemaps = require('gulp-sourcemaps'); //realiza un mapeo y nos da la ubicacion de los eleemtnos en lso archovs


//IMAGENES
    const cache = require('gulp-cache');
    const imagemin = require('gulp-imagemin');
    const webp = require('gulp-webp');
    const avif = require('gulp-avif');

//javascript

    const terser = require('gulp-terser-js');

function css(done){
    // identificar el archivo de SASS
    //Compilarlo
    //Almacenarla en el Discoduro

    src('src/scss/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(plumber())//evita errores y detencion del workflow
        .pipe(sass())  //compilarlo
        .pipe(postcss([autoprefixer(),cssnano()]))
        .pipe(sourcemaps.write('.'))
        .pipe(dest('build/css'));//almacenarla en el disco duro



    done();
}
function javascript(done){
    src('src/js/**/*.js')
        .pipe(sourcemaps.init())
        .pipe(terser())
        .pipe(sourcemaps.write())
        .pipe(dest('build/js'));

    done();
}
function dev(done){
    watch('src/scss/**/*.scss',css);
    watch('src/js/**/*.js',javascript);
    done();
}

function imagenes(done){

    const opciones = {
        optimizationLevel: 3
    }
    src('src/img/**/*.{png,jpg}')//ubicar el archivo sobre el que queremos trabajar
        .pipe(cache(imagemin(opciones)))
        .pipe(dest('build/img'))

    done();
}

function versionWbp(done){
    
    const opciones ={
        quality: 50
    };

    src('src/img/**/*.{png,jpg}')//ubicar el archivo sobre el que queremos trabajar
        .pipe(webp(opciones))//ejecutar la funcion webp sobre el archivo, la funcion recibe un objeto que lee para fijar los parametros de ejecucion
        .pipe(dest('build/img'))//guardar en memoria en la carpeta de preferencia
    
    done();
}
function versionAvif(done){
    
    const opciones ={
        quality: 50
    };

    src('src/img/**/*.{jpg, png}')//ubicar el archivo sobre el que queremos trabajar
        .pipe(avif(opciones))//ejecutar la funcion webp sobre el archivo, la funcion recibe un objeto que lee para fijar los parametros de ejecucion
        .pipe(dest('build/img'))//guardar en memoria en la carpeta de preferencia
    
    done();
}
exports.imagenes = imagenes;
exports.js = javascript;
exports.css = css;
exports.versionWbp = versionWbp;
exports.versionAvif = versionAvif;
exports.dev = parallel(imagenes,versionWbp,versionAvif,javascript,dev);