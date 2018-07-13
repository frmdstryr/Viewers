import { Meteor } from 'meteor/meteor';
import session from 'express-session';
import Keycloak from "keycloak-connect";
import { ServiceConfiguration } from 'meteor/service-configuration';

MeteorKeycloak = {};

/**
 *
 * @param {Grant} grant
 * @param expiresAt
 * @returns {{serviceData: {accessToken: *, expiresAt: *}, options: {profile: {name}}}}
 */
MeteorKeycloak.handleAuthFromAccessToken = function handleAuthFromAccessToken(grant, expiresAt) {

    const content = grant.access_token.content;


    const identity = {
        id: content.sub,
        email: content.email,
        name: content.name,
        given_name: content.given_name,
        family_name: content.family_name
    };

    const serviceData = {
        accessToken: grant.access_token.token,
        expiresAt: expiresAt
    };

    _.extend(serviceData, identity);

    return {
        serviceData: serviceData,
        options: { profile: { name: identity.name } }
    };
};

OAuth.registerService('keycloak', 2, null, function(query) {
    const grant = getGrant(query);
    const expiresIn = grant.expires_in;

    return MeteorKeycloak.handleAuthFromAccessToken(grant, (+new Date) + (1000 * expiresIn));
});


/**
 *
 * @param query
 * @returns {Grant}
 */
function getGrant(query) {
    const config = getKeycloakConfig();
    const keycloak = new Keycloak(config, config);
    const redirectUri = OAuth._redirectUri('keycloak', config);
    const code = query.code;

    config.store =  new session.MemoryStore();

    return Meteor.wrapAsync(function(keycloak, auth_redirect_uri, code, callback) {
        const request = {
            session: {
                auth_redirect_uri
            }
        };

        const sessionId = null;
        const sessionHost = null;

        keycloak.grantManager.obtainFromCode(request, code, sessionId, sessionHost, callback);
    })(keycloak, redirectUri, code);
}

MeteorKeycloak.retrieveCredential = function(credentialToken, credentialSecret) {
    return OAuth.retrieveCredential(credentialToken, credentialSecret);
};

function getKeycloakConfig() {
    const config = ServiceConfiguration.configurations.findOne({ service: 'keycloak' });
    if (!config) {
        throw new ServiceConfiguration.ConfigError();
    }
    return config;
}
