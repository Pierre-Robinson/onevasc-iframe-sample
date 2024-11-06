# Onevasc iframe API

This project is intended to show an example of Onevasc iframe API implementation.

## Javascript or Typescript

The API uses the javascript native postMessage function. In order to communicate with an embedded Onevasc iframe, one should perform several steps. It is possible to implement all the code in plain javascript, which this sample provides.

### The iframe itself

First of all you need to create an iframe to embed Onevasc

```
    <iframe style="display:none" id="onevasc" src="https://vasc-map.firebaseapp.com" height="1000" width="100%" title="Onevasc"></iframe>
```

While this is a basic example, you may configure its sizing to serve your needs. But keep in mind that Onevasc still needs some room to be practically usable.

### Receiving API messages

In order to receive messages from the Onevasc API, you need to implement a javascript listener for the *message* event

```
    addEventListener("message", listener, false);
    async function listener(e) {
        let msg = JSON.parse(e.data);

        if(!msg.onevasc)
            return;

        // Handle the message here
    }
```

All messages sent & received by Onevasc are expected to contain a **onevasc** *boolean* field set to *true*. This field should be used to filter out all messages that are not from the Onevasc API.

If the message is a Onevasc API proper message :

* The field **command** indicates the type of the message and how it should be handled. Please refer to the *iframe-message.ts* file for more information about the existing commands.
* If set, the **data** field should be valid json content, not all messages require data.
* If the **error** field is set, it means something went wrong. The error will be valid json containing information about what happened, and usually the root message that caused the error will be embedded here.

**Warning** : do not mistake the **data** field within Onevasc messages with the native *data* field in the javascript event object itself.

### Sending API messages

Once you are able to receive Onevasc messages, you may implement some code in order to send responses back to Onevasc. One example would be the login message.

When login is required, Onevasc sends a specific message : **IFRAME_CMD_LOGIN_REQUEST** (string value "onevLoginRequest"). The login credentials are expected in response to this message.

```
    async function listener(e) {
        let msg = JSON.parse(e.data);

        // [...]

        // For example purpose, of course you'll need more custom code to retrieve these
        var email = "user@example.com";
        var pwd = "NotVerySecure";

        if(msg.command == IFRAME_CMD_LOGIN_REQUEST) {
            // When receiving a login request, we are expected to send back the credentials
            sendOnevascMessage(IFRAME_CMD_LOGIN_WITH_CREDENTIALS, {
                username: email,
                password: pwd
            });
        }

    function sendOnevascMessage(cmd, data = "") {
        // In our example, the Onevasc iframe uses the *onevasc* id. So sending a message is as simple as the following line :
        $('#onevasc')[0].contentWindow.postMessage(JSON.stringify({ onevasc: true, command: cmd, data: data }), '*')
    }

```

## index.html

This file contains an ugly yet working Onevasc iframe implementation. You may host it on you local computer with the http server of your choice. But keep in mind that you will need a valid account, authorized to use the API, for the Onevasc instance you want to embed.

By default, the iframe loads an application from localhost, to customize this you may use the GET parameter **iframe_url** :

```
    // Embed the production instance of Onevasc located at https://app.onevasc.com :
    http://localhost:8080?iframe_url=https%3A%2F%2Fapp.onevasc.com
```