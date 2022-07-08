const initialState = {
    allVideoGames: [],
    allVideoGamesCopy: [],
    allGenres: [],
    allPlatforms: [],
    videogameDetail: []
};


const rootReducer = (state = initialState, action) => {

    switch(action.type) {  
        case 'GET_ALL_VIDEOGAMES':
            return {
                ...state,
                allVideoGames: action.payload,
                allVideoGamesCopy: action.payload
            }
        case 'GET_VIDEOGAME': 
            return {
                ...state,
                allVideoGames: action.payload
            }
        case 'reset_videogame':
            return {
                ...state,
                videogameDetail: [],
            }
        case 'GET_GENRES':
            return {
                ...state,
                allGenres: action.payload
            }
        case 'GET_PLATFORMS':
            return {
                ...state,
                allPlatforms: action.payload
            }
        case 'FILTER_BY_GENRE':
            let videogameCopy = state.allVideoGamesCopy
            let videogameFiltered =
            action.payload === 'all'
            ? videogameCopy
            : videogameCopy.filter(videogame => { 

                for (const el of videogame.genres) {
                    if (el === action.payload) { return videogame }
                }
            })

             if (videogameFiltered.length <= 0) {
                videogameFiltered = videogameCopy;
                alert('Sorry, no results found')
             }
            return {
                ...state,
                allVideoGames: [...videogameFiltered]
            }
        case 'FILTER_BY_PLATFORM':
            let videogameCopy2 = state.allVideoGamesCopy
            let videogameFiltered2 =
            action.payload === 'all'
            ? videogameCopy2
            : videogameCopy2.filter(videogame => {

                for (const el of videogame.platforms) {
                    if (el === action.payload) { return videogame }
                }
            })

            if (videogameFiltered2.length <= 0) {
                videogameFiltered2 = videogameCopy2;
                alert('Sorry, no results found')
             }
            
            return {
                ...state,
                allVideoGames: [...videogameFiltered2]
            }
        case 'GET_DETAIL':
            return {
                ...state,
                videogameDetail: action.payload
            }
        
        default: return {...state}
    };
};

export default rootReducer;