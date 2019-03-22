export default (state = { searchResults: [] }, action) => {
    switch (action.type) {
        case "FETCH_COURSES":
            let providers = {}
            let subjects = {}
            let universities = {}
            let allCourses = action.payload.map(item => {
                if (!item.Length) item.Length = 1
                if (providers.hasOwnProperty(item.Provider)) {
                    providers[item.Provider].push(item)
                } else {
                    providers[item.Provider] = []
                    providers[item.Provider].push(item)
                }
                if (subjects.hasOwnProperty(item["Parent Subject"])) {
                    subjects[item["Parent Subject"]].push(item)
                } else {
                    subjects[item["Parent Subject"]] = []
                    subjects[item["Parent Subject"]].push(item)
                }
                let Institutions = item.Universities.Institutions.split("|||")
                Institutions.forEach(element => {
                    if (universities.hasOwnProperty(element)) {
                        universities[element].push(item)
                    } else {
                        universities[element] = []
                        universities[element].push(item)
                    }
                })
                return item
            })
            return { ...state, allCourses, providers, subjects, universities }

        case "SET_SEARCH_RESULT":
            return { ...state, searchResults: action.payload.result, searchTerm: action.payload.searchTerm }
        default:
            return state
    }
}
