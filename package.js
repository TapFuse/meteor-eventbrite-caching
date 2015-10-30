Package.describe({
  name: 'tapfuse:eventbrite-caching',
  version: '0.0.1',
  summary: 'Eventbrite caching for meteor',
  git: 'https://github.com/TapFuse/meteor-eventbrite-caching.git',
  documentation: 'README.md'
});

var S = 'server';
var C = 'client';
var CS = [C, S];

Package.onUse(function(api) {
  api.versionsFrom('1.2.0.1');
  api.use('ecmascript');

  //Dependency
  api.use('tapfuse:collection-global@1.0.0');
  api.use('tapfuse:eventbrite-api');
  api.use('mongo');
  api.use('iron:router@1.0.8');
  api.use('iron:core@1.0.8');
  api.use('percolate:synced-cron@1.3.0');

  //Files
  api.addFiles('eventbrite-caching-server.js', S);
  api.addFiles('eventbrite-caching-both.js', CS);
  api.addFiles('globals-client.js', C);
  api.addFiles('globals-server.js', S);
});

Package.onTest(function(api) {
  api.use('ecmascript');
  api.use('tinytest');
  api.use('tapfuse:eventbrite-caching');
  api.addFiles('eventbrite-caching-tests.js');
});
