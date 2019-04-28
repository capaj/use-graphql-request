import React from 'react'
import ReactDOM from 'react-dom'
import gql from 'graphql-tag'
import { GraphQLClient } from 'graphql-request'
import { useQuery, UseGraphQLProvider, useMutation } from '../src/use-graphql'
// const graphQLClient = new GraphQLClient(
//   'https://api.graph.cool/simple/v1/movies'
// )
const graphQLClient = new GraphQLClient('http://localhost:3000/graphql') // uses decapi nested-mutation-or-query example

function App() {
  const { data, refetch } = useQuery(gql`
    {
      books {
        id
        name
      }
    }
  `)

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
    <>
      <div className="App">{JSON.stringify(data)}</div>
      <button
        disabled={loading}
        onClick={async () => {
          const data = await execute({
            id: 2,
            name: 'Lord of the Rings II'
          })
          console.log('App -> mutated', data)
        }}
      >
        mutate
      </button>
      <button
        disabled={loading}
        onClick={async () => {
          const data = await refetch()
          console.log('App -> refetch', data)
        }}
      >
        refetch
      </button>
    </>
  )
}

const rootElement = document.getElementById('root')
ReactDOM.render(
  <UseGraphQLProvider client={graphQLClient}>
    <App />
  </UseGraphQLProvider>,
  rootElement
)
