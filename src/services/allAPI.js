import { commonAPI } from "./commonAPI"
import { server_url } from "./server_url"

// uploadDataAPI

export const uploadDataAPI = async (data) => {
    return await commonAPI('POST', `${server_url}/leads`, data)
}

// getAllUploadDataAPI

export const getAllDataAPI = async () => {
    return await commonAPI('GET', `${server_url}/leads`,"")
}

// deleteDataAPI

export const deleteDataAPI = async (id) => {
    return await commonAPI('DELETE', `${server_url}/leads/${id}`,{})
}

