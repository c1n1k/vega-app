import { AnyAction } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';

import Article, { ArticleValues } from '../../../types/Article';
import headers from '../../helpers/headers';
import { projectIdFromLocalStorage } from '../../helpers/projectIdToLocalstorage';

export const OPEX_MKOS_CHANGE_EXPENSE_YEAR_VALUE_INIT = 'OPEX_MKOS_CHANGE_EXPENSE_YEAR_VALUE_INIT';
export const OPEX_MKOS_CHANGE_EXPENSE_YEAR_VALUE_SUCCESS =
  'OPEX_MKOS_CHANGE_EXPENSE_YEAR_VALUE_SUCCESS';
export const OPEX_MKOS_CHANGE_EXPENSE_YEAR_VALUE_ERROR =
  'OPEX_MKOS_CHANGE_EXPENSE_YEAR_VALUE_ERROR';

export interface OPEXAction {
  type: string;
  // TODO: replace any
  payload?: any;
  errorMessage?: any;
}

const OPEXMKOSChangeExpenseYearValueInit = (): OPEXAction => ({
  type: OPEX_MKOS_CHANGE_EXPENSE_YEAR_VALUE_INIT,
});

const OPEXMKOSChangeExpenseYearValueSuccess = (
  article: Article,
  value: ArticleValues,
): OPEXAction => ({
  type: OPEX_MKOS_CHANGE_EXPENSE_YEAR_VALUE_SUCCESS,
  payload: { article, value },
});

const OPEXMKOSChangeExpenseYearValueError = (message: any): OPEXAction => ({
  type: OPEX_MKOS_CHANGE_EXPENSE_YEAR_VALUE_ERROR,
  errorMessage: message,
});

export function MKOSChangeExpenseYearValue(
  article: Article,
  value: ArticleValues,
): ThunkAction<Promise<void>, {}, {}, AnyAction> {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
    dispatch(OPEXMKOSChangeExpenseYearValueInit());

    try {
      const response = await fetch(`graphql/${projectIdFromLocalStorage()}`, {
        method: 'POST',
        headers: headers(),
        body: JSON.stringify({
          query:
            `mutation {setOpexMkosExpenseYearValue(` +
            `expenseId: ${article.id},` +
            `year: ${value.year?.toString()},` +
            `value: ${value.value?.toString()}` +
            `){ok}}`,
        }),
      });
      const body = await response.json();

      if (response.ok) {
        dispatch(OPEXMKOSChangeExpenseYearValueSuccess(article, value));
      } else {
        dispatch(OPEXMKOSChangeExpenseYearValueError(body.message));
      }
    } catch (e) {
      dispatch(OPEXMKOSChangeExpenseYearValueError(e));
    }
  };
}
