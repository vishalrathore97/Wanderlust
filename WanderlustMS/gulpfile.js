var gulp = require('gulp');
var eslint = require('gulp-eslint');
var fs = require('fs');
var istanbul = require('gulp-istanbul');
var jasmine = require('gulp-jasmine');
var reporters = require('jasmine-reporters');
var exit = require('gulp-exit');
gulp.task('lint', () => {
    return gulp.src(['src/**/*.js', '!node_modules/**', '!src/coverage/lcov-report/prettify.js'])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.format('html', fs.createWriteStream('lintReports/lint_report.html')))
        .pipe(eslint.format('checkstyle', fs.createWriteStream('lintReports/checkstyle.xml')))
        .pipe(eslint.failAfterError());
});
gulp.task('test', (done) => {
    return gulp.src(['spec/*.js'])
        // gulp-jasmine works on filepaths so you can't have any plugins before it
        .pipe(jasmine({
            reporter: new reporters.JUnitXmlReporter({
                savePath: 'testReport/JUnit/'
            })
        }), done())
    // .pipe(exit())
});
gulp.task('pre-coverage', function () {
    return gulp.src(['src/**/*.js', '!gulpfile.js', '!node_modules/**'])
        // Covering files
        .pipe(istanbul())
        // Force `require` to return covered files
        .pipe(istanbul.hookRequire())
});
gulp.task('coverage', gulp.series('pre-coverage', function (done) {
    return gulp.src(['spec/*.js'])
        .pipe(jasmine(), done())
        // Creating the reports after tests ran
        .pipe(istanbul.writeReports({
            dir: './coverage',
            reporters: ['lcovonly', 'json', 'text', 'text-summary', 'cobertura'],
            reportOpts: {
                lcov: { dir: 'coverage/lcovonly', file: 'lcov.info' },
                json: { dir: 'coverage/json', file: 'converage.json' },
                cobertura: { dir: 'coverage/cobertura', file: 'cobertura-coverage.xml' }
            }
        }))
        // Enforce a coverage of at least 60%
        .pipe(istanbul.enforceThresholds({ thresholds: { global: 60 } }))
        .pipe(exit());
})
)
