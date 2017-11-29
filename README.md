# Meteor Acccounts Untappd
#### Untappd account login for meteor

## Install

`cd <your-meteor-project>`

`meteor add brewline:accounts-untappd`

and also add following package as pre-req -

`meteor add service-configuration`


## Setup and Usage

1. Register your app with Untappd Developer Site at following url- http://untappd.com/developer/clients/register

2. Fill out the given form but make sure that redirect url as shown as follows-

  OAuth redirect_url: `<your-server-domain>:<port>/_oauth/untappd`

  For e.g.redirect url for localhost : `http://localhost:3000/_oauth/untappd`

  In your client code, overwrite `Untappd.rootUrl` to provide the domain or hostname. This is useful in multitenant applications.

3. After registration, note down the clientid and client secret.
4. Now in your app do create the `accounts.js` (or `accounts.coffee` if you use coffeescript) and put following code inside

 so, it file looks in directory tree- `<your-app-directory>/server/accounts.js`  and put the client id and client secret from previous step

    ```
    ServiceConfiguration.configurations.remove({
      service: 'untappd'
    });
    ServiceConfiguration.configurations.insert({
      service: 'untappd',
      scope: 'basic',
      clientId: '<your-client-id>',
      secret: '<your-client-secret>'
    });
    ```
5. Now, all things are setup, you are ready to use this package
6. Add following button code for login
```
      Meteor.loginWithUntappd(function (err) {
          if (err) {
            console.log('login failed', err);
          } else {
            console.log('login success', Meteor.user());
          }
      });
```
