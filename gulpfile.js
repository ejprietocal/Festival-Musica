const {src, dest, watch} = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const plumber = require('gulp-plumber');

function css(done){
    // identificar el archivo de SASS
    //Compilarlo
    //Almacenarla en el Discoduro

    src('src/scss/**/*.scss')
        .pipe(plumber())//evita errores y detencion del workflow
        .pipe(sass())  //compilarlo
        .pipe(dest('build/css'));//almacenarla en el disco duro



    done();
}
function dev(done){
    watch('src/scss/**/*.scss',css);

    done();
}

exports.css = css;
exports.dev = dev;