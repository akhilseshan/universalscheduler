# Universal Scheduler

### A web-app that allows users to create meetings by inviting any other using their email ids. The other user will be able either accept or reject the meeting. The web-app also shows the history of the past meetings between those two users. The users will be able to see the active time of the meeting and cancel started meetings.

## Testing

Create a file keys.js in /config and include these details to the keys.js file. (PS: changes are be made in your Google API Console that includes the authorised redirect URL and authorised Javascript URL)

```javascript
module.exports = {
  google: {
    clientID: <your CLIENTID obtained from Google API Console>
    clientSecret: <your CLIENTSECRET obtained from Google API Console>
  },
  mongodb: {
    dbURI: <URL of your database which is hosted>
  },
  session: {
    cookieKey: <your cookie key>
  }
}
```

Initialize node package manager in the directory(``` npm init ```) and Install the necessary dependencies using ``` npm install <package-name> ```

Run the application using ```node app.js ``` or ``` npm start ``` . You will be able to view the web-app in localhost on port 3000(``` http://localhost:3000 ```).
