'use strict';

// SEE: https://gulpjs.com/docs/en/getting-started/quick-start
const gulp = require( 'gulp' );
const babel = require( 'gulp-babel' );

function transpile_node() {
	return gulp.src( 'src/node/**/*.js' )
		.pipe( babel( { presets: [ '@babel/preset-env' ] } ) )
		.pipe( gulp.dest( 'target/node' ) );
}

//function transpile_public_es6() {
//	return gulp.src( 'src/public/es6/**/*.js' )
//		.pipe( babel( { presets: [ '@babel/preset-env' ] } ) )
//		.pipe( gulp.dest( 'target/public' ) );
//}

//exports.default = gulp.serial( transpile_node /*, tranpile_public_es6 */ );
exports.default = transpile_node;
