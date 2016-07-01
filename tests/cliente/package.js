// Using the "wrapper package" version format
Package.describe({
  name: 'test-package',
  summary: 'Test package for the mocha package',
});

Package.onUse(function (api) {
  api.versionsFrom('1.3');

  api.use([
    'meteor',
    'mongo',
    'coffeescript',
    'practicalmeteor:loglevel',
    'practicalmeteor:chai',
    'ecmascript',
  ]);

});

Package.onTest(function (api) {
  api.use([
    'coffeescript',
    'practicalmeteor:loglevel',
    'practicalmeteor:chai',
    'practicalmeteor:mocha@2.4.5_1',
    'ecmascript',
    'test-package',
  ]);

  api.addFiles('colaborador.js');
  //api.addFiles('mocha-globals-tests.js');
});
