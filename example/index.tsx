import React from 'react'
import ReactDOM from 'react-dom'
import gql from 'graphql-tag'
import { GraphQLClient } from 'graphql-request'
import { useGraphQL, UseGraphQLProvider } from '../src/use-graphql'
const graphQLClient = new GraphQLClient(
  'https://api.graph.cool/simple/v1/movies'
)

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
  console.log('data', data)
  return <div className="App">{JSON.stringify(data)}</div>
}

const rootElement = document.getElementById('root')
ReactDOM.render(
  <UseGraphQLProvider client={graphQLClient}>
    <App />
  </UseGraphQLProvider>,
  rootElement
)
