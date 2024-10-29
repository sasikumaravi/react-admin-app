import { FETCH_DATA, LOGOUT_DATA } from "../actionStore/ActionStore"

export const fetchData = (data) => {
    return { type: FETCH_DATA, payload: data }
}
export const handleLogout = (data) => {
    return { type: LOGOUT_DATA, payload: data }
}
