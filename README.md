[![Build Status](https://travis-ci.org/capaj/use-graphql-request.svg?branch=master)](https://travis-ci.org/capaj/use-graphql-request.svg?branch=master)
[![Coverage Status](https://coveralls.io/repos/github/capaj/use-graphql-request/badge.svg?branch=master)](https://coveralls.io/github/capaj/use-graphql-request?branch=master)
[![MIT license](http://img.shields.io/badge/license-MIT-brightgreen.svg)](http://opensource.org/licenses/MIT)

# use-graphql-request

a minimal hook for querying graphql endpoint from react

## Install

```
npm i use-graphql-request
# if you don't already have, also install peer deps
npm i use-graphql-request graphql-request react graphql
```

## Usage

[![Edit react-hooks-1](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/2okylmqojr)

```ts
import { setupClient } from 'use-graphql-request'
import gql from 'graphql-tag'
import { GraphQLClient } from 'graphql-request'

const graphQLClient = new GraphQLClient(
  'https://api.graph.cool/simple/v1/movies'
)
const useGraphQL = setupClient(graphQLClient)

function App() {
  const { data } = useGraphQL(gql`
    {
      Movie(title: "Inception") {
        releaseDate
        actors {
          name
        }
      }
    }
  `)
  console.log('resp', data) // logs undefined and then {"Movie":{"releaseDate":"2010-08-28T20:00:00.000Z","actors":[{"name":"Leonardo DiCaprio"},{"name":"Ellen Page"},{"name":"Tom Hardy"},{"name":"Joseph Gordon-Levitt"},{"name":"Marion Cotillard"}]}}
  return <div className="App">{JSON.stringify(data)}</div>
}
```

## Is this a replacement for apollo/relay?

No, it's only suitable for small and simple apps-see [FAQ on graphql-request](https://github.com/prisma/graphql-request#whats-the-difference-between-graphql-request-apollo-and-relay). It doesn't have any caching, no links, no complex features.
