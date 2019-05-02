[![Build Status](https://travis-ci.org/capaj/use-graphql-request.svg?branch=master)](https://travis-ci.org/capaj/use-graphql-request.svg?branch=master)
[![Coverage Status](https://coveralls.io/repos/github/capaj/use-graphql-request/badge.svg?branch=master)](https://coveralls.io/github/capaj/use-graphql-request?branch=master)
[![MIT license](http://img.shields.io/badge/license-MIT-brightgreen.svg)](http://opensource.org/licenses/MIT)

# use-graphql-request

lightweight react hooks for querying graphql endpoint from react

## Install

```sh
npm i use-graphql-request
# also install peer deps if you don't already have them
npm i use-graphql-request graphql-request react graphql
```

## API

Library offers 3 components:

### UseGraphQLProvider

Register a client-a `graphql-request` instance to put into react context.

### useQuery

Runs a GQL query upon mount and whenever props change.

### useMutation

Returns a function and state to run GQL mutations.

## Code samples

all assume this wrapper:

```tsx
import { UseGraphQLProvider } from 'graphql-request'

const rootElement = document.getElementById('root')
ReactDOM.render(
  <UseGraphQLProvider
    client={new GraphQLClient('https://api.graph.cool/simple/v1/movies')}
  >
    <App />
  </UseGraphQLProvider>,
  rootElement
)
```

## Sample Query

[![Edit react-hooks-1](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/2okylmqojr)

```tsx
import gql from 'graphql-tag'
import { useQuery } from 'graphql-request'

function App() {
  const { data, loading, refetch } = useQuery<{ Movie: any }>(gql`
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
  return (
    <>
      <div className="App">{JSON.stringify(data)}</div>
      <button disabled={loading} onClick={refetch}>
        refetch
      </button>
    </>
  )
}
```

## Sample mutation

```tsx
import gql from 'graphql-tag'
import { useMutation } from 'graphql-request'

const [{ loading }, execute] = useMutation(gql`
  mutation($id: Float!, $name: String!) {
    book(bookId: $id) {
      edit(name: $name) {
        id
        name
      }
    }
  }
`)

return (
  <button
    disabled={loading}
    onClick={async () => {
      const data = await execute({
        id: 2,
        name: 'Lord of the Rings III'
      })
      console.log('App -> mutated', data)
    }}
  >
    mutate
  </button>
)
```

## Is this a replacement for apollo/relay?

No, it's only suitable for small and simple apps-see [FAQ on graphql-request](https://github.com/prisma/graphql-request#whats-the-difference-between-graphql-request-apollo-and-relay). It doesn't have any caching, no links, doesn't support SSR, no complex features.
