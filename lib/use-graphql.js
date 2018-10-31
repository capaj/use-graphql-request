"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const react_1 = require("react");
function setupClient(graphQLClient) {
    return function useGraphQL(query, variables) {
        const [state, setState] = react_1.useState({ loading: true });
        const queryAsString = graphql_1.print(query);
        react_1.useEffect(() => {
            let isRelevant = true;
            graphQLClient.request(queryAsString).then((data) => {
                if (isRelevant) {
                    setState({ data, loading: false });
                }
            }, (res) => {
                if (isRelevant) {
                    setState({ errors: res.response.errors, loading: false });
                }
            });
            return () => {
                isRelevant = false;
            };
        }, [queryAsString, JSON.stringify(variables)]);
        return state;
    };
}
exports.setupClient = setupClient;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlLWdyYXBocWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvdXNlLWdyYXBocWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxxQ0FBK0I7QUFHL0IsaUNBQTJDO0FBUTNDLFNBQWdCLFdBQVcsQ0FBQyxhQUE0QjtJQUN0RCxPQUFPLFNBQVMsVUFBVSxDQUFJLEtBQVUsRUFBRSxTQUFpQjtRQUN6RCxNQUFNLENBQUMsS0FBSyxFQUFFLFFBQVEsQ0FBQyxHQUFHLGdCQUFRLENBQUMsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQTtRQUNyRCxNQUFNLGFBQWEsR0FBRyxlQUFLLENBQUMsS0FBSyxDQUFDLENBQUE7UUFFbEMsaUJBQVMsQ0FDUCxHQUFHLEVBQUU7WUFDSCxJQUFJLFVBQVUsR0FBRyxJQUFJLENBQUE7WUFDckIsYUFBYSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQyxJQUFJLENBQ3ZDLENBQUMsSUFBSSxFQUFFLEVBQUU7Z0JBQ1AsSUFBSSxVQUFVLEVBQUU7b0JBQ2QsUUFBUSxDQUFDLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFBO2lCQUNuQztZQUNILENBQUMsRUFDRCxDQUFDLEdBQUcsRUFBRSxFQUFFO2dCQUNOLElBQUksVUFBVSxFQUFFO29CQUNkLFFBQVEsQ0FBQyxFQUFFLE1BQU0sRUFBRSxHQUFHLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQTtpQkFDMUQ7WUFDSCxDQUFDLENBQ0YsQ0FBQTtZQUVELE9BQU8sR0FBRyxFQUFFO2dCQUNWLFVBQVUsR0FBRyxLQUFLLENBQUE7WUFDcEIsQ0FBQyxDQUFBO1FBQ0gsQ0FBQyxFQUNELENBQUMsYUFBYSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FDM0MsQ0FBQTtRQUVELE9BQU8sS0FBSyxDQUFBO0lBQ2QsQ0FBQyxDQUFBO0FBQ0gsQ0FBQztBQTlCRCxrQ0E4QkMifQ==