# Quoteworthy

## Overview

The Quoteworthy app allows users to add and manage important quotations they encounter while reading books. Reading is one of my favorite things to do, and one of my favorite things about reading is gleaning wisdom from other people's perspectives. I designed this app to be a repository of wisdom. 😊

**LIVE LINK:** https://quoteworthy-9aea783adab7.herokuapp.com/

## Features

-   Login and registration allows users to maintain their own collection of quotations.

-   User passwords are hashed using bcrypt before the user profile is stored.

-   After logging in, users can create a new quotation entry by clicking on the "Add Quotation" link at the top of the home page.

-   Quotation entries require full citation information (author first and last name, book title, publisher, place of publication, year published, page number(s)) in order to be created.

-   Users have the option to add their own comments to quotation entries.

-   Created quotations are added to the list of quotations displayed on the home page. Quotations are sorted by author's last name.

-   Each displayed quotation on the home page comes with an "Actions" dropdown button, allowing users to view their quotation entry on its own page, edit their quotation, or delete their quotation.

-   The application uses JSON Web Tokens to authenticate users and protect back-end routes, contributing to a more secure user experience.

## Running the Project

-   Fork this GitHub repository and clone it to your local machine.

-   Inside the "server" folder, create a `.env` file that contains your own values for the secret used to sign the JWT, the URL for your MongoDB Atlas cluster, and your MongoDB Atlas password. In the source code, these values are accessed using the following variable names:

    -   `SECRET_KEY`

    -   `DATABASE`

    -   `DATABASE_PASSWORD`

        -   Note that on line 3 in `server/config/mongoose.config`, the code expects to find the string literal `"<PASSWORD>"` in the database URL stored in the `DATABASE` environment variable. It will then insert the password stored in the `DATABASE_PASSWORD` environment variable. Be sure to write your database URL accordingly.

-   Open two separate command lines / terminals, one for the front-end server and the other for the back-end server.

-   **Front-end command line / terminal:**

    -   `cd client`
    -   `npm install`
    -   `npm start`

-   **Back-end command line / terminal:**
    -   `cd server`
    -   `npm install`
    -   `node server.js`
        -   You may wish to install the nodemon package globally, which will restart the server each time it detects file changes. If so, you can run `nodemon server.js`

## Dev Dependencies

-   [axios](https://www.npmjs.com/package/axios)
-   [bcrypt](https://www.npmjs.com/package/bcrypt)
-   [cookie-parser](https://www.npmjs.com/package/cookie-parser)
-   [cors](https://www.npmjs.com/package/cors)
-   [dotenv](https://www.npmjs.com/package/dotenv)
-   [express](https://www.npmjs.com/package/express)
-   [js-cookie](https://www.npmjs.com/package/js-cookie)
-   [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
-   [mongoose](https://www.npmjs.com/package/mongoose)
-   [react](https://www.npmjs.com/package/react)
-   [react-router-dom](https://www.npmjs.com/package/react-router-dom)
-   [validator](https://www.npmjs.com/package/validator)
