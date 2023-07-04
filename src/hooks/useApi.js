import { useContext } from "react"
import { ApiContext } from "../context/ApiCalls"

const useApi = () => {
    return useContext(ApiContext)
}
export default useApi