import { useContext } from "react"
import {RequestContext} from "../context/RequestContext"

export default function useRequestContext() {
    return useContext(RequestContext)
}
