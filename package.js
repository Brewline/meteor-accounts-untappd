Package.describe({
  summary: "Untappd account login for meteor",
  "version": "0.1.0",
  "git": "https://github.com/Brewline/meteor-accounts-untappd",
  "name": "brewline:accounts-untappd"
});

Package.on_use(function (api) {
  api.versionsFrom('METEOR@0.9.0');
  api.use('accounts-base', ['client', 'server']);
  api.imply('accounts-base', ['client', 'server']);
  api.use('accounts-oauth', ['client', 'server']);
  api.imply('accounts-oauth', ['client', 'server']);

  api.use('oauth', ['client', 'server']);
  api.use('oauth2', ['client', 'server']);
  api.use('http', ['server']);
  api.use('templating', 'client');
  api.use('underscore', 'server');
  api.use('random', 'client');
  api.use('service-configuration', ['client', 'server']);

  api.add_files('untappd_client.js', 'client');
  api.add_files('untappd_server.js', 'server');
  api.add_files("untappd.js");

  api.export('Untappd');

  api.add_files([
    'untappd_configuration.html',
    'untappd_configuration.js',
    'untappd_login_button.css'
  ],'client');
});
