# Readable API Server

This is the front and backend of the Redux portion of udacity's React nano degree.

## Start Developing and Testing

**To get started:**

* Install and start the API server
    - `cd api-server`
    - `npm install`
    - `node server`
* In another terminal window, install and start the Readables frontent (based on a Create React App project)
    - `cd frontend`
    - `npm install`
    - `npm start`

## Frontend

Information about the frontend and how to use it can be found in its [README file](frontend/README.md).

## API Server

Information about the API server and how to use it can be found in its [README file](api-server/README.md).

## Access The API Server

To accesss the backend server in your code, we have stored the URL to the API server in the environment variable `REACT_APP_BACKEND` which you can access in your code using `process.env.REACT_APP_BACKEND`. You can see this in action in `frontend/src/App.js` in `componentDidMount`.
