Package.describe({
    name: 'ohif:user-keycloak',
    summary: 'OHIF Lesion Tracker Tools',
    version: '0.0.1'
});

Npm.depends({
    'isomorphic-fetch': '2.2.1'
});

Package.onUse(function(api) {
    api.versionsFrom('1.6');

    api.use('ecmascript');
    api.use('templating');
    api.use('stylus');
    api.use('service-configuration');

    // Our custom packages
    api.use('ohif:design');
    api.use('ohif:core');
    api.use('ohif:user');

    api.use('mxab:keycloak-oauth@0.0.2');
    api.use('mxab:keycloak-loader');
    api.use('mxab:accounts-keycloak');

    // Load icons
    api.addAssets('assets/user-menu-icons.svg', 'client');

    // Client imports
    api.addFiles('client/index.js', 'client');

    api.addFiles('server/setup.js', 'server');
});
