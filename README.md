# hasura-dummy-auth-server

hasura-dummy-auth-server helps with the use case where the Hasura GraphQL API is meant to be usable for anyone without authentication.
hasura-dummy-auth-server returns the same constant response for any authorization request.

## Usage

hasura-dummy-auth-server requires three environment variables to be set:
- `HASURA_ROLE`: The role name for table permissions in Hasura console
- `PORT`: The port where the GET requests from Hasura are to be received.
- `WEBHOOK_PATH`: The path in the URL where the GET requests from Hasura are listened to.

For example, run hasura-dummy-auth-server with:
```sh
docker run \
    --name 'hasura-dummy-auth-server' \
    --network 'hasura-net' \
    --env 'HASURA_ROLE=anonymous' \
    --env 'PORT=80' \
    --env 'WEBHOOK_PATH=/' \
    hsldevcom/hasura-dummy-auth-server:latest
```

Then run Hasura with:
```sh
docker run \
    --network 'hasura-net' \
    ...
    hasura/graphql-engine \
    graphql-engine \
    ...
    --auth-hook 'http://hasura-dummy-auth-server/'
```
