import { GraphQLClient } from 'graphql-request';
interface IState<T> {
    loading: boolean;
    data?: T;
    errors: object[];
}
export declare function setupClient(graphQLClient: GraphQLClient): <T>(query: any, variables: object) => IState<T>;
export {};
