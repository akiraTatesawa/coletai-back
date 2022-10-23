# Coletaí API ♻️

## Description

Coletaí's main objective is to bring recycling cooperatives closer to people who sort recyclable waste at home.

Registered users can request collections from the cooperatives, which in turn have the option of accepting or not the requests.

The cooperative, after carrying out the collection, registers on the system that the request has been completed.

Both users and cooperatives can track the progress and status of collection requests.

![status-finished](https://user-images.githubusercontent.com/97575616/152926720-d042178b-24c0-4d6b-94fb-0ccbd3c082cc.svg)

## Table of Contents

- [Coletaí API ♻️](#coletaí-api-️)
  - [Description](#description)
  - [Table of Contents](#table-of-contents)
  - [Built With](#built-with)
  - [API Reference](#api-reference)

    - <details> <summary>Endpoints</summary>

      - [USERS](#users)
        - [User Registration](#user-registration)
          - [Request](#request)
          - [Response](#response)
        - [User Sign In](#user-sign-in)
          - [Request](#request-1)
          - [Response](#response-1)
      - [COOPERATIVES](#cooperatives)
        - [Cooperative Registration](#cooperative-registration)
          - [Request](#request-2)
          - [Response](#response-2)
        - [Cooperative Sign In](#cooperative-sign-in)
          - [Request](#request-3)
          - [Response](#response-3)
        - [List all Cooperatives names and location](#list-all-cooperatives-names-and-location)
          - [Response](#response-4)
      - [COLLECTIONS](#collections)
        - [Create Collection](#create-collection)
          - [Request](#request-4)
          - [Response](#response-5)
        - [List Collections by User](#list-collections-by-user)
          - [Response](#response-6)
        - [List Collections by Cooperative](#list-collections-by-cooperative)
          - [Response](#response-7)
        - [Cancel Collection](#cancel-collection)
          - [Response](#response-8)
        - [Finish Collection](#finish-collection)
          - [Response](#response-9)
      - [ERROR NOTES](#error-notes)
    </details>

  - [Running the Project](#running-the-project)
  - [Testing the API](#testing-the-api)
    - [Endpoints (Thunder Client)](#endpoints-thunder-client)
    - [Jest](#jest)
      - [Unit tests](#unit-tests)
      - [Integration tests](#integration-tests)

## Built With

![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)

## API Reference

### USERS

#### User Registration

```http
POST /users
```

##### Request

| Body             | Type     | Description                        |
| :--------------- | :------- | :--------------------------------- |
| `name`          | `string` | **Required**|
| `email`          | `string` | **Required**, must be unique and a valid email format|
| `password`       | `string` | **Required** |
| `latitude`| `number` | **Required**, must be a valid latitude  |
| `longitude`| `number` | **Required**, must be a valid longitude  |

```json
{
  "name": "Example",
  "email": "example@gmail.com",
  "password": "pass123",
  "latitude": -50,
  "longitude": -90
}
```

##### Response

| Body             |  Code      |  Description                        |
| :--------------- | :-------   | :--------------------------------- |
| `empty`          |   `201`    | **Created**          |
| `json`           |   `409`    | **Conflict**, email is already being used |
| `json`           |   `422`    | **Unprocessable Entity**, request body is invalid |

#### User Sign In

```http
POST /users/sign-in
```

##### Request

| Body             | Type     | Description                        |
| :--------------- | :------- | :--------------------------------- |
| `email`          | `string` | **Required**, must be a valid email format          |
| `password`       | `string` | **Required** |

```json
{
  "email": "example@gmail.com",
  "password": "pass123",
}
```

##### Response

| Body             |  Code      |  Description                        |
| :--------------- | :-------   | :--------------------------------- |
| `json`           |   `200`    | **OK**, returns a token          |
| `json`           |   `401`    | **Unauthorized**, incorrect password |
| `json`           |   `404`    | **Not Found**, user does not exist |
| `json`           |   `422`    | **Unprocessable Entity**, request body is invalid |

```json
{
  "token": "JWT token"
}
```

### COOPERATIVES

#### Cooperative Registration

```http
POST /cooperatives
```

##### Request

| Body             | Type     | Description                        |
| :--------------- | :------- | :--------------------------------- |
| `name`          | `string` | **Required**, must be unique|
| `email`          | `string` | **Required**, must be unique and a valid email format|
| `password`       | `string` | **Required** |
| `latitude`| `number` | **Required**, must be a valid latitude  |
| `longitude`| `number` | **Required**, must be a valid longitude  |

```json
{
  "name": "Example",
  "email": "example@gmail.com",
  "password": "pass123",
  "latitude": -50,
  "longitude": -90
}
```

##### Response

| Body             |  Code      |  Description                        |
| :--------------- | :-------   | :--------------------------------- |
| `empty`          |   `201`    | **Created**          |
| `json`           |   `409`    | **Conflict**, email or name is already being used |
| `json`           |   `422`    | **Unprocessable Entity**, request body is invalid |

#### Cooperative Sign In

```http
POST /cooperatives/sign-in
```

##### Request

| Body             | Type     | Description                        |
| :--------------- | :------- | :--------------------------------- |
| `email`          | `string` | **Required**, must be a valid email format          |
| `password`       | `string` | **Required** |

```json
{
  "email": "example@gmail.com",
  "password": "pass123",
}
```

##### Response

| Body             |  Code      |  Description                        |
| :--------------- | :-------   | :--------------------------------- |
| `json`           |   `200`    | **OK**, returns a token          |
| `json`           |   `401`    | **Unauthorized**, incorrect password |
| `json`           |   `404`    | **Not Found**, user does not exist |
| `json`           |   `422`    | **Unprocessable Entity**, request body is invalid |

```json
{
  "token": "JWT token"
}
```

#### List all Cooperatives names and location

```http
GET /cooperatives/name-location
```

##### Response

| Body             |  Code      |  Description                        |
| :--------------- | :-------   | :--------------------------------- |
| `json`           |   `200`    | **OK**, returns an array          |

```json
[
  {
    "name": "Example",
    "longitude": -90,
    "latitude": -50
  },
  {
    "name": "Example 2",
    "longitude": -90,
    "latitude": -50
  }
]
```

### COLLECTIONS

- Every `/collections` route is authenticated using **Bearer TOKEN**;
- Only **USERS** are able to create collections;
- Only **COOPERATIVES** are able to cancel or finish a collection;
- The user token must be sent in the Authorization request header;
- The API will return the following errors if the authentication fails:

| Code             | Description  |
| :--------------- | :----------- |
| `401`            | **Unauthorized**, invalid token     |
| `400`            | **Bad Request**, token was not sent     |
| `422`            | **Unprocessable Entity**, token is not in the Bearer format     |

#### Create Collection

```http
POST /collections
```

##### Request

There are only four valid recycling types:

- "Plástico";
- "Metal";
- "Vidro";
- "Papel";

| Body             | Type     | Description                        |
| :--------------- | :------- | :--------------------------------- |
| `types`          | `array`  | **Required**, must have at least one type|
| `description`    | `string` | **Required**, must be a maximum of 140 characters |

```json
{
  "types": [
    {
      "name": "Metal"
    }
  ],
  "description": "Random description"
}
```

##### Response

| Body             |  Code      |  Description                        |
| :--------------- | :-------   | :--------------------------------- |
| `empty`          |   `201`    | **Created**          |
| `json`           |   `404`    | **Not Found**, the recycling type does not exist |
| `json`           |   `422`    | **Unprocessable Entity**, request body is invalid |

#### List Collections by User

```http
GET /collections/user
```

##### Response

| Body             |  Code      |  Description                        |
| :--------------- | :-------   | :--------------------------------- |
| `json`          |   `200`     | **OK**          |

```json
[
  {
    "id": "c0e27d49-4f2f-49c3-a985-4f13e9bb7a2c",
    "description": "Random description",
    "status": "ongoing",
    "created_at": "2022-10-10T15:15:54.374Z",
    "updated_at": "2022-10-10T15:15:54.375Z",
    "cooperative": {
      "id": "4142c078-12b3-4a51-88b1-0211167bba40",
      "name": "Random"
    },
    "user": {
      "id": "2d298149-014b-4b1d-90bd-abf9a77fa942",
      "name": "Random",
      "address": "user address"
    },
    "types": [
      {
        "name": "Metal"
      }
    ]
  },
  {
    "id": "c344936a-a015-446d-95ac-9aca2cf1a5d5",
    "description": "Random description",
    "status": "ongoing",
    "created_at": "2022-10-10T15:15:52.978Z",
    "updated_at": "2022-10-10T15:15:52.979Z",
    "cooperative": {
      "id": "4142c078-12b3-4a51-88b1-0211167bba40",
      "name": "Random"
    },
    "user": {
      "id": "2d298149-014b-4b1d-90bd-abf9a77fa942",
      "name": "Random",
      "address": "user address"
    },
    "types": [
      {
        "name": "Metal"
      }
    ]
  }
]
```

#### List Collections by Cooperative

```http
GET /collections/cooperative
```

##### Response

| Body             |  Code      |  Description                        |
| :--------------- | :-------   | :--------------------------------- |
| `json`          |   `200`     | **OK**          |

```json
[
  {
    "id": "c0e27d49-4f2f-49c3-a985-4f13e9bb7a2c",
    "description": "Random description",
    "status": "ongoing",
    "created_at": "2022-10-10T15:15:54.374Z",
    "updated_at": "2022-10-10T15:15:54.375Z",
    "cooperative": {
      "id": "4142c078-12b3-4a51-88b1-0211167bba40",
      "name": "Random"
    },
    "user": {
      "id": "2d298149-014b-4b1d-90bd-abf9a77fa942",
      "name": "Random",
      "address": "user address"
    },
    "types": [
      {
        "name": "Metal"
      }
    ]
  },
  {
    "id": "c344936a-a015-446d-95ac-9aca2cf1a5d5",
    "description": "Random description",
    "status": "ongoing",
    "created_at": "2022-10-10T15:15:52.978Z",
    "updated_at": "2022-10-10T15:15:52.979Z",
    "cooperative": {
      "id": "4142c078-12b3-4a51-88b1-0211167bba40",
      "name": "Random"
    },
    "user": {
      "id": "2d298149-014b-4b1d-90bd-abf9a77fa942",
      "name": "Random",
      "address": "user address"
    },
    "types": [
      {
        "name": "Metal"
      }
    ]
  }
]
```

#### Cancel Collection

```http
POST /collections/{id}/cancel
```

##### Response

| Body             |  Code      |  Description                        |
| :--------------- | :-------   | :--------------------------------- |
| `empty`          |   `200`    | **OK** |
| `json`           |   `404`    | **Not Found**, collection not found |
| `json`           |   `403`    | **Forbidden**, the collection does not belong to the cooperative|
| `json`           |   `400`    | **Bad Request**, the collection is already cancelled or finished |

#### Finish Collection

```http
POST /collections/{id}/finish
```

##### Response

| Body             |  Code      |  Description                        |
| :--------------- | :-------   | :--------------------------------- |
| `empty`          |   `200`    | **OK** |
| `json`           |   `404`    | **Not Found**, collection not found |
| `json`           |   `403`    | **Forbidden**, the collection does not belong to the cooperative|
| `json`           |   `400`    | **Bad Request**, the collection is already cancelled or finished |

### ERROR NOTES

When a request returns an error, the response is a json:

```json
{
  "name": "Error Name",
  "message": "Error Details"
}
```

## Running the Project

1. Clone the repository:

    ```bash
    git clone https://github.com/akiraTatesawa/coletai-back.git
    ```

2. Navigate to the project directory:

    ```bash
    cd coletai-back/
    ```

3. Install the dependencies:

    ```bash
    npm install
    ```

4. Set your environment variables following the .env.sample file:

    | Name              | Type     |
    | :--------------- | :------- |
    | `DATABASE_URL`   | `string` |
    | `PORT`           | `number` |
    | `JWT_SECRET`     | `string` |

   ```ts
    PORT=
    DATABASE_URL=
    JWT_SECRET=
   ```

5. Run the migrations script:

   ```bash
   npm run migrate
   ```

6. Run the project on dev mode:

    ```bash
    npm run dev
    ```

## Testing the API

### Endpoints (Thunder Client)

1. Import the collection and environments on the `thunder_client/` directory;
2. Set the `URL` environment variable on the Thunder Client DEV env;
3. Go to the Coletaí collection and you are ready to use the API!

### Jest

1. Create a `.env.test` file on the root of the project;
2. Set the `DATABASE_URL` and `JWT_SECRET` variables;
3. Run the script:

    ```bash
    npm run test
    ```

    *This will execute the unit and integration tests all at once*

#### Unit tests

Run the script

```bash
   npm run test:unit
```

#### Integration tests

Run the script

```bash
   npm run test:int
```
