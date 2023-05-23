import { RequestNetwork } from "@requestnetwork/request-client.js";
import { createContext } from "react";

const requestNetwork = new RequestNetwork({
    nodeConnectionConfig: { baseURL: "https://xdai.gateway.request.network/" },
})

export const RequestContext = createContext<RequestNetwork>(requestNetwork)

export default RequestContext.Provider 
