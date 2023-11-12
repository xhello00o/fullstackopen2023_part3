# fullstackopen2023_part3
## Course Content
In this part our focus shifts towards the backend, that is, towards implementing functionality on the server side of the stack. We will implement a simple REST API in Node.js by using the Express library, and the application's data will be stored in a MongoDB database. At the end of this part, we will deploy our application to the internet.

The project here would be to create a **phonebook**.

More details [here](https://fullstackopen.com/en/part3)


### Node.js and Express ( Exercises 3.1 - 3.8 )
Created several endpoints to handle incoming request for GET, DELETE and POST. Eerror handling was also included that sends back an error with an error message to explain the error. A middleware Morgan was finally used for logging the incoming requests. A JSON-server was also used to temporarily stored the phonebook entries

__GET__
- /api/persons --> for retrieving all the phonebook entries
- /api/persons/:id --> for retrieving each individual phonebook entry
- /api/info --> to get the total number of 'persons' we have saved in the phonebook.

__DELETE__
- /api/persons/:id --> to delete the entry of the phonebook with that particular id

__POST__
- /api/persons --> to create a new entry

### Deploying the app to the internet ( Exercise 3.9 - 3.11 )
Using render to host the phonebook application, the frontend of the app was done in [fullstackopenPart2](https://github.com/xhello00o/fullstackopen23/blob/main/part2/part%202.15%20to%202.17/src/app.js) and the static app was created using ```npm run build```.
The build folder was then copied to the this backend and served using ```express.static(frontend)``` 

Backend server
: https://phonebook-backend-zip0.onrender.com/

### Saving the Data to MongoDB ( Exercise 3.12 to 3.18 )
A command-line interface was build to save new entries directly from the command line to the cloud-base MongoDB Database for (_./part3.12_). A new endpoint was added to handle PUT request to update the entries. The entries are all saved in the MongoDB cloud. (_./part3.13 to 3.18_). A seperate error handling middleware was also created to handle all the various errors encountered when saving the data to mongoDB.

__PUT__
- /api/persons/:id
### Validation and ESlint ( Exercise 3.19 to 3.22 )[^1]
Validation was added using ```{validate: ... } ``` option under mongoose. ESLint was also created to help with structure of the code.



[^1]: There is no seperate folder created. Instead, the exercises are done on top of the previous exercises. 

