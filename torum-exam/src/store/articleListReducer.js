import { GET_ARTICLES_LIST } from "@store/constants";

const initialState = {
    articleList: []
};

const articleListReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ARTICLES_LIST:
            return {
                ...state,
                articleList: [...state.articleList, ...action.payload]
            };
        default:
            return state;
    }
}

export default articleListReducer;