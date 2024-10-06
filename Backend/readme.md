# Backend Server Setup

Follow these steps to start the backend server:

## Prerequisites

Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (which includes npm)

## Starting the Server

To start the backend server, run:
```sh
npm start
```

The server should now be running and accessible at `http://localhost:3000`.


## Sample API Call

To test the API, you can use the following example:

### Get directions 

Fetch using location name:
```
http://localhost:3000/api?origin=CUNY Queens College&destination=Columbia University
```

Fetch using coordinates:
```
http://localhost:3000/api?origin=40.737004,-73.8251979&destination=40.737004,-73.96161411567529
```

Fetch using mixed mode:
```
http://localhost:3000/api?origin=CUNY Queens College&destination=40.737004,-73.96161411567529
```
### Response

A successful response will look like this:
```json
{
  "id": 1,
  "name": "NewItem",
  "description": "This is a new item."
}
```


## Troubleshooting

If you encounter any issues, check the following:
- Ensure all dependencies are installed correctly.
- Verify that no other application is using port 3000.

For further assistance, refer to the project's documentation or open an issue on GitHub.
