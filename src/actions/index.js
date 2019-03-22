import axios from "../apis"
import history from "../history"
export const fetchCourses = () => async (dispatch, getState) => {
    const response = await axios.get("/bins/1fq8pm")
    dispatch({ type: "FETCH_COURSES", payload: response.data })
}

export const setSearchResult = (result,searchTerm) => {
    history.push("/search")
    return {
        type: "SET_SEARCH_RESULT",
        payload: {result,searchTerm}
    }
}
