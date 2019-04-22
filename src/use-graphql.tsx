import { print } from 'graphql'
import { GraphQLClient } from 'graphql-request'
import React, { useEffect, useState, useContext, ReactNode } from 'react'

interface IState<T> {
  loading: boolean
  data?: T
  errors?: object[]
}
const ClientContext = React.createContext<GraphQLClient | null>(null)

export function UseGraphQLProvider({
  client,
  children
}: {
  readonly children?: ReactNode
  readonly client: GraphQLClient
}) {
  return (
    <ClientContext.Provider value={client}>{children}</ClientContext.Provider>
  )
}

export function useGraphQL<T>(query: any, variables?: object): IState<T> {
  const graphQLClient = useContext<GraphQLClient | null>(ClientContext)
  if (!graphQLClient) {
    throw new Error(`missing a UseGraphQLProvider`)
  }
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
