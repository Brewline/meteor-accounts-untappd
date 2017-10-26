Untappd = {};

Oauth.registerService('untappd', 2, null, function (query) {
  const config =
    ServiceConfiguration.configurations.findOne({ service: 'untappd' });

  const response = getTokenResponse(config, query);
  const accessToken = response.response.access_token;
  const identity = getIdentity(config, accessToken);
  const serviceData = _.extend(identity, { accessToken: accessToken });

  return {
    serviceData: serviceData,
    options: {
      profile: { name: [identity.first_name, identity.last_name].join(' ') },
      services: { untappd: identity }
    }
  };
});

const getTokenResponse = function (config, query) {
  if (!config) {
    throw new ServiceConfiguration.ConfigError();
  }

  var response;

  try {
    const options = {
      params: {
        client_id: config.clientId,
        client_secret: OAuth.openSecret(config.secret),
        response_type: 'code',
        redirect_url: OAuth._redirectUri('untappd', config).replace('?close', ''),
        code: query.code
      }
    };

    response = HTTP.get('https://untappd.com/oauth/authorize/', options);

    if (response.error) { // if the http response was an error
      throw response.error;
    }

    if (typeof response.content === 'string') {
      response.content = JSON.parse(response.content);
    }

    if (response.content.error) {
      throw response.content;
    }
  } catch (err) {
    throw _.extend(
      new Error('Failed to complete OAuth handshake with Untappd. ' + err.message),
      {response: err.response}
    );
  }

  return response.content;
};

const getIdentity = function (config, accessToken) {
  try {
    const options = {
      params: {
        client_id: config.clientId,
        client_secret: OAuth.openSecret(config.secret),
        access_token: accessToken
      }
    };
    const response = HTTP.get('https://api.untappd.com/v4/user/info/', options);

    if (response.statusCode !== 200) {
      throw new Error('Could not retrieve identity');
    }

    if (!response.data || !response.data.meta || response.data.meta.code !== 200) {
      throw new Error('Could not retrieve identity');
    }

    const data = ifNull(response.data.response, {});
    return _.extend(ifNull(data.user, {}), {
      email: ifNull(data.settings, {}).email_address,
      user: data.user_name,
      user_id: data.uid
    });
  } catch (err) {
    throw _.extend(
      new Error('Failed to fetch identity. ' + err.message),
      { response: err.response }
    );
  }
};

const ifNull = function (val, def) {
  return val || def;
};

Untappd.retrieveCredential = function (credentialToken, credentialSecret) {
  return Oauth.retrieveCredential(credentialToken, credentialSecret);
};
