import { getArticlesList } from "@api/index";
import { GET_ARTICLES_LIST } from "@store/constants";

export function setArticleList(articleList) {
    return {
        type: GET_ARTICLES_LIST,
        payload: articleList,
    };
}

export function getArticlesListFromStore() {
    return async (dispatch) => {
        try {
            let list = await getArticlesList(0)
            list = list || []
            await dispatch(setArticleList(list))
            return list
        } catch (error) { }
    };
}