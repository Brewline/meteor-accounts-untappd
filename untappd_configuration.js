Template.configureLoginServiceDialogForUntappd.helpers({
  siteUrl: function () {
    return Meteor.absoluteUrl();
  }
});

Template.configureLoginServiceDialogForUntappd.fields = function () {
  return [
    { property: 'clientId', label: 'Client Id' },
    { property: 'secret', label: 'Client Secret' }
  ];
};
