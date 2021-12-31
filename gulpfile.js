const gulp = require( 'gulp' );
const babel = require( 'gulp-babel' );

// FIXME: Get new Gulp setup working.
//        This is a broken mixture of old and styles, I think.
function transpile_node( cb ) {
	return gulp.src( 'src/node/**/*.js' )
		.pipe( babel() )
		.pipe( gulp.dest( 'target/node' ) );
}

function transpile_public() {
	return gulp.src( 'src/public/**/*.js' )
		.pipe( babel() )
		.pipe( gulp.dest( 'target/public' ) );
}

// See https://gulpjs.com/docs/en/getting-started/creating-tasks
//exports.default = gulp.parallel( transpile_node, transpile_public );


gulp.task( 'default', function() {
//	return transpile_node()
//		.then( () => { return transpile_public(); } );
	return transpile_node();
} );
