import { Accounts } from 'meteor/accounts-base';

Accounts.onLogout(() => {
    const authServerUrl = Meteor.settings.public.custom.keycloak.authServerUrl;
    const realm = Meteor.settings.public.custom.keycloak.realmName;
    const redirectUri = Meteor.absoluteUrl('login');
    const logoutUrl = `${authServerUrl}/realms/${realm}/protocol/openid-connect/logout?redirect_uri=${redirectUri}`;
    window.location = logoutUrl;
});
