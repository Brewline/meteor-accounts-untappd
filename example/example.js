if (Meteor.isClient) {
  Template.hello.events({
    'click button': function () {
      // increment the counter when button is clicked
      Session.set("counter", Session.get("counter") + 1);
      Meteor.loginWithUntappd({
        // loginStyle: 'popup'
        loginStyle: 'redirect' // you can use redirect for mobile web app
      }, function () {
        console.log('in call back', arguments);
      });
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
    Accounts.loginServiceConfiguration.remove({
      service: 'untappd'
    });

    Accounts.loginServiceConfiguration.insert({
      service: 'untappd',
      clientId: 'USE_AN_ACTUAL_CLIENT_ID',
      secret: 'USE_AN_ACTUAL_SECRET'
    });
  });
}

Untappd.rootUrl = function () {
  return "local.example.com";
}
