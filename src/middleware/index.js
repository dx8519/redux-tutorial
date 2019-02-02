import { ADD_ARTICLE, DATA_LOADED, ERROR_FETCH, GET_DATA } from "../constants/action-types";

const forbiddenWords = ["spam", "money"];

export function forbiddenWordsMiddleware({ dispatch }) {
  return function(next){
    return function(action){
      if (action.type === ADD_ARTICLE) {
        const foundWord = forbiddenWords.filter(word =>
              action.payload.title.includes(word)
        );
        if (foundWord.length) {
          return dispatch({ type: "FOUND_BAD_WORD" });
        }
      }
      return next(action);
    };
  };
}

export function remoteArticleMiddleware({ dispatch }) {
  return function(next) {
    return function(action) {
      if (action.type === GET_DATA) {
        return fetch("https://jsonplaceholder.typicode.com/posts")
        .then(response => response.json())
        .then(json => {
          dispatch({ type: DATA_LOADED, payload: json });})
        .catch(() => {
          dispatch({ type: ERROR_FETCH, payload: [{id: 1, title: "Failed to fetch articles"}]});
        });
      }
      return next(action);
    }
  }
}

