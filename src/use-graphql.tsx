import { print } from 'graphql'
import { GraphQLClient } from 'graphql-request'
import React, {
  useEffect,
  useState,
  useContext,
  ReactNode,
  useRef
} from 'react'

interface IQueryState<T> {
  loading: boolean
  refetch?: () => Promise<T | void>
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

export function useQuery<T>(query: any, variables?: object): IQueryState<T> {
  const graphQLClient = useContext<GraphQLClient | null>(ClientContext)
  if (!graphQLClient) {
    throw new Error(`missing a UseGraphQLProvider`)
  }
  const [state, setState] = useState<IQueryState<T>>({
    loading: true
  })
  const queryAsString = print(query)
  const isMounted = useRef(false)

  useEffect(() => {
    isMounted.current = true

    const refetch = () => {
      setState({
        loading: true,
        ...state
      })
      return graphQLClient.request<T>(queryAsString, variables).then(
        (data: T) => {
          if (isMounted.current) {
            setState({ data, loading: false, refetch })
          }
          return data
        },
        (res) => {
          if (isMounted.current) {
            setState({ errors: res.response.errors, loading: false, refetch })
          }
        }
      )
    }
    graphQLClient.request<T>(queryAsString, variables).then(
      (data: T) => {
        if (isMounted.current) {
          setState({ data, loading: false, refetch })
        }
      },
      (res) => {
        if (isMounted.current) {
          setState({ errors: res.response.errors, loading: false, refetch })
        }
      }
    )

    return () => {
      isMounted.current = false
    }
  }, [queryAsString, JSON.stringify(variables)])

  return state
}

interface IMutationState<T> {
  loading: boolean
  data?: T
  errors?: object[]
}

export function useMutation<T>(
  query: any
): [IMutationState<T>, (vars: any) => Promise<T | void>] {
  const graphQLClient = useContext<GraphQLClient | null>(ClientContext)
  if (!graphQLClient) {
    throw new Error(`missing a UseGraphQLProvider`)
  }
  const [state, setState] = useState<IQueryState<T>>({
    loading: false
  })
  const queryAsString = print(query)

  const execute = (variables?: object) => {
    setState({ loading: true })
    return graphQLClient.request<T>(queryAsString, variables).then(
      (data: T) => {
        setState({ data, loading: false })
        return data as T
      },
      (res) => {
        setState({ errors: res.response.errors, loading: false })
      }
    )
  }

  return [state, execute]
}
