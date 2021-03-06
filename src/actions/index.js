import { tryParseError } from '../utils/common';
import { setCurrentUserKey, setCurrentSpreadsheetName } from '../utils/session';
import {
    getReviews,
    getStudentByKey,
    getLessons
} from '../api';

export const USER_LOGIN_REQUEST = 'USER_LOGIN_REQUEST';
export const USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS';
export const USER_LOGIN_FAILURE = 'USER_LOGIN_FAILURE';

export const FETCH_REVIEWS_REQUEST = 'FETCH_REVIEWS_REQUEST';
export const FETCH_REVIEWS_SUCCESS = 'FETCH_REVIEWS_SUCCESS';
export const FETCH_REVIEWS_FAILURE = 'FETCH_REVIEWS_FAILURE';

export const FETCH_LESSONS_REQUEST = 'FETCH_LESSONS_REQUEST';
export const FETCH_LESSONS_SUCCESS = 'FETCH_LESSONS_SUCCESS';
export const FETCH_LESSONS_FAILURE = 'FETCH_LESSONS_FAILURE';

export const userLogin = (spreadsheetName, key, loginCallback = undefined) => dispatch => {
    dispatch({
        type: USER_LOGIN_REQUEST
    });

    const call = callback => {
        if (callback && typeof callback === typeof Function) {
            callback();
        }
    };
    getStudentByKey(spreadsheetName, key)
        .then(user => {
            setCurrentSpreadsheetName(spreadsheetName);
            setCurrentUserKey(user.get('key'));

            dispatch({
                type: USER_LOGIN_SUCCESS,
                user
            });

            call(loginCallback);
        })
        .catch(error => {
            dispatch({
                type: USER_LOGIN_FAILURE,
                key,
                error: tryParseError(error)
            });

            call(loginCallback);
        });
};

export const fetchReviews = spreadsheetName => dispatch => {
    dispatch({
        type: FETCH_REVIEWS_REQUEST
    });

    getReviews(spreadsheetName)
        .then(reviews => dispatch({
            type: FETCH_REVIEWS_SUCCESS,
            reviews
        }))
        .catch(error => dispatch({
            type: FETCH_REVIEWS_FAILURE,
            error: tryParseError(error)
        }));
};

export const fetchLessons = (spreadsheetName, studentLogin) => dispatch => {
    dispatch({
        type: FETCH_LESSONS_REQUEST
    });

    getLessons(spreadsheetName, studentLogin)
        .then(lessons => dispatch({
            type: FETCH_LESSONS_SUCCESS,
            lessons
        }))
        .catch(error => dispatch({
            type: FETCH_LESSONS_FAILURE,
            error: tryParseError(error)
        }));
};
