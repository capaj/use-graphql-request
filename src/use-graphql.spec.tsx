import { setupClient } from './use-graphql'
import { GraphQLClient } from 'graphql-request'
import gql from 'graphql-tag'
import { renderToStaticMarkup } from 'react-dom/server'
import React from 'react'

describe('useGraphQL', () => {
  it('should query', async () => {
    const graphQLClient = new GraphQLClient(
      'https://api.graph.cool/simple/v1/movies'
    )
    const useG = setupClient(graphQLClient)
    function App() {
      // console.log('aaaa')
      const res = useG<{ Movie: any }>(gql`
        {
          Movie(title: "Inception") {
            releaseDate
            actors {
              name
            }
          }
        }
      `)
      console.log('resp', res) // logs undefined and then {"Movie":{"releaseDate":"2010-08-28T20:00:00.000Z","actors":[{"name":"Leonardo DiCaprio"},{"name":"Ellen Page"},{"name":"Tom Hardy"},{"name":"Joseph Gordon-Levitt"},{"name":"Marion Cotillard"}]}}
      expect(res).toMatchInlineSnapshot(`
Object {
  "loading": true,
}
`)
      return <div className="App">{JSON.stringify(res)}</div>
    }
    renderToStaticMarkup(<App />)
  })
})
