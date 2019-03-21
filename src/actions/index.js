import axios from "../apis"

export const fetchCourses = () => async (dispatch, getState) => {
    const response = await axios.get("/bins/1fq8pm")
    dispatch({ type: "FETCH_COURSES", payload: response.data })
}
