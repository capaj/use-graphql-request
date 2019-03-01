import { print } from 'graphql'
import { GraphQLClient } from 'graphql-request'
import { useEffect, useState } from 'react'

interface IState<T> {
  loading: boolean
  data?: T
  errors?: object[]
}

export function setupClient(graphQLClient: GraphQLClient) {
  return function useGraphQL<T>(query: any, variables?: object): IState<T> {
    const [state, setState] = useState<IState<T>>({
      loading: true
    })
    const queryAsString = print(query)

    useEffect(() => {
      let isRelevant = true
      graphQLClient.request<T>(queryAsString, variables).then(
        (data: T) => {
          if (isRelevant) {
            setState({ data, loading: false })
          }
        },
        (res) => {
          if (isRelevant) {
            setState({ errors: res.response.errors, loading: false })
          }
        }
      )

      return () => {
        isRelevant = false
      }
    }, [queryAsString, JSON.stringify(variables)])

    return state
  }
}
