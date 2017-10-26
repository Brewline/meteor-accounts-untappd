Accounts.oauth.registerService('untappd');

if (Meteor.isClient) {
  Meteor.loginWithUntappd = function (options, callback) {
    // support a callback without options
    if (!callback && typeof options === "function") {
      callback = options;
      options = null;
    }

    var credentialRequestCompleteCallback =
      Accounts.oauth.credentialRequestCompleteHandler(callback);

    Untappd.requestCredential(options, credentialRequestCompleteCallback);
  };
} else {
  Accounts.addAutopublishFields({
    forLoggedInUser: ['services.untappd'],
    forOtherUsers: [
      'services.untappd.username',
      'services.untappd.full_name',
      'services.untappd.profile_picture'
    ]
  });
}
