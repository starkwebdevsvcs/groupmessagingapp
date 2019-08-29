# Twilio Messaging Demo App for Individual & Group Texting

View the application online here: <br>

## Table of Contents

- [Description](#description)
- [Technologies](#technologies)
- [Development Team](#development-team)
- [Application Screenshots](#application-screenshots)

---
## Description
This application was developed as an extended branch of the original messaging app created by a team of student developers enrolled in the first Java Programming Bootcamp held by Grand Canyon University in the Spring of 2018.<br>
The intent of the project will be utilize the messaging/communication services from Twilio.com.<br>

---
## Technologies

### Primary
- [**Node.js**](https://nodejs.org/en/)
    - body-parser
    - bootstrap
    - connect-flash
    - console-stamp
    - cookie-parser
    - dateformat
    - debug
    - delay
    - dialog
    - **dotenv**
    - **express**
    - express-messages
    - express-session
    - express-validator
    - http-errors
    - jquery
    - jquery-confirm
    - moment-timezone
    - **mongoose**
    - morgan
    - **passport**
    - passport-local
    - popper
    - process-env
    - **pug**
    - request
    - request-promise
    - **twilio**
- HTML5
- Bootstrap 4
    
### Build Tools
- [npm](https://www.npmjs.com/)

### Service Providers
- [MongoDB](https://www.mongodb.com/) - Database
- [Heroku](https://www.heroku.com/) - Hosting/Deployment
- [Twilio](https://www.twilio.com/) - Text messaging provider

---
## Development Team:<br>

Ted Stark

---
## Application Screenshots

### **Landing Page**

![login1.jpg](/screenshots/login1.jpg)

The initial landing page allows for either an admin or staff user to enter the username and password and log into the app

### **Disclaimer Page**

![login2.jpg](/screenshots/login2.jpg)

The disclaimer page simply reinforces FSWF behavior polices with an Agree button to move into the actual application.

### **Send a Reminder Page**

![remindersend.jpg](/screenshots/remindersend.jpg)

The heart of the application. Creates a text message in a Reminder format.

### **Send a Message Page**

![messagesend.jpg](/screenshots/messagesend.jpg)

Creates a text message in a simple Message format.

### **Preview Page**

![previewmsg.jpeg](/screenshots/previewmsg.jpg)

This page allows the user to preview the details and message before actually sending it through Twilio.

### **Text Msg History Page**

![history.jpeg](/screenshots/history.jpg)

This page allows the user to view text message history pulled from Twilio's records.

### **User Admin Page**

![useradmin.jpeg](/screenshots/useradmin.jpg)

This page allows an admin to view, edit, and delete registered users. User information is stored in the the Mongo database.

### **Reminder Admin Page**

![reminderadmin.jpeg](/screenshots/reminderadmin.jpg)

This page allows an admin to view, edit, and delete registered users. User information is stored in the the Mongo database.

### **Workgroup Admin Page**

![workgroup.jpeg](/screenshots/workgroup.jpg)

This page allows an admin to view, edit, and delete registered users. User information is stored in the the Mongo database.

