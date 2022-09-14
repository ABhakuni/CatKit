# Steps to run the server and get the api's up and running
1. Prerequesites - Mongo db, Node js, npm installed and running in the system
2. Run `npm install` from the root directory of the project
3. Run `npm start` (env variables can be changed from .env file and config.js in root directory)

# Steps to see database on Mongo DB GUI
4. Open Mongo DB Compass on your system
5. Copy the Mongo DB URI from the `.env` file and enter in the mongo db uri input in the application and connect

# Steps to run the tests
6. Close the existing server started using `npm start` in step 3 using `Ctrl + C`
7. Run `npm test` to run all the tests for api's