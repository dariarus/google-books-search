import {AppDispatch, AppThunk} from '../types';
import {TBookData, TBooksListData} from '../types/response-data';

import {numberItemsToShow} from '../../utils/constants';
import {GOOGLE_BOOKS_API_URL, GOOGLE_API_KEY} from '../../config';

import {getResponseData} from './json-verification';

import {booksListActions} from '../store-slices/books-list';
import {paginationActions} from '../store-slices/pagination';
import {bookDataActions} from '../store-slices/book-data';
import {searchDataActions} from "../store-slices/search-data";

export const getBooksListBySearchParameters = (value: string, category: string, sortBy: string): AppThunk => {
  return function (dispatch: AppDispatch) {

    dispatch(booksListActions.getBooksList());
    dispatch(searchDataActions.setIsSearching(true));

    return fetch(`${GOOGLE_BOOKS_API_URL}?q=${value}${category !== ''
      ? '+subject:' + category
      : ''}&orderBy=${sortBy}&maxResults=${numberItemsToShow}&key=${GOOGLE_API_KEY}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then(res => getResponseData<{ totalItems: number, items: Array<{ id: string, volumeInfo: TBooksListData }> }>(res))
      .then((res) => {
        dispatch(booksListActions.getFirstBooksListSuccess({totalItems: res.totalItems, items: res.items}));
        dispatch(paginationActions.resetPaginationStartIndex());
      })
      .then((res) => {
        dispatch(paginationActions.updatePaginationStartIndex());
        dispatch(searchDataActions.setIsSearching(false));
        return res;
      })
      .catch((err) => {
        console.log(err.message);
        dispatch(booksListActions.getBooksListFailed({message: err.message}));
      })
  }
}

export const getMoreBooks = (value: string, category: string, sortBy: string, paginationStartIndex: number): AppThunk => {
  return function (dispatch: AppDispatch) {

    dispatch(booksListActions.getBooksList());
    dispatch(searchDataActions.setIsSearching(true));

    return fetch(
      `${GOOGLE_BOOKS_API_URL}?q=${value}${category !== ''
        ? '+subject:' + category
        : ''}&orderBy=${sortBy}&startIndex=${paginationStartIndex}&maxResults=${numberItemsToShow}&key=${GOOGLE_API_KEY}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      })
      .then(res => getResponseData<{ items: Array<{ id: string, volumeInfo: TBooksListData }> }>(res))
      .then((res) => {
        dispatch(booksListActions.updateBooksList({items: res.items}));
        dispatch(searchDataActions.setIsSearching(false));
      })
      .then((res) => {
        dispatch(paginationActions.updatePaginationStartIndex());
        return res;
      })
      .catch((err) => {
        console.log(err.message);
        dispatch(booksListActions.getBooksListFailed({message: err.message}));
      })
  }
}

export const getBookData = (bookId: string): AppThunk => {
  return function (dispatch: AppDispatch) {

    dispatch(bookDataActions.getBookData());

    return fetch(
      `${GOOGLE_BOOKS_API_URL}/${bookId}?key=${GOOGLE_API_KEY}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      })
      .then(res => getResponseData<{ volumeInfo: TBookData }>(res))
      .then((res) => {
        dispatch(bookDataActions.getBookDataSuccess(res.volumeInfo));
      })
      .catch((err) => {
        console.log(err.message);
        dispatch(bookDataActions.getBookDataFailed({message: err.message}));
      })
  }
}