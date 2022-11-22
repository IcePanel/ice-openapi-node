# ice-openapi-node

A minimalist NodeJS REST API powered by an OpenAPI spec

See our [blog post](http://u.icepanel.io/8aff2d69) about this repository.

## Getting started

1. Generate the OpenAPI spec in the [`api`](/packages/api) package.

```bash
yarn --cwd packages/api
yarn --cwd packages/api gen
```

2. Generate the Typescript client in the [`api-client`](/packages/api-client) package.

```bash
yarn --cwd packages/api-client
yarn --cwd packages/api-client gen
```

3. Boot up the api

```bash
yarn --cwd packages/api dev
```

4. Test requests on the api

```bash
# get the api spec
curl http://localhost:8080

# register a user
curl -d '{"name":"Rahul Ligma","email":"rahul@twitter.com"}' -H "Content-Type: application/json" -X POST http://localhost:8080/user/register
```
