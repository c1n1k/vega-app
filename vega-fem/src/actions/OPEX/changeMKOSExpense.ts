import { AnyAction } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';

import Article from '../../../types/Article';
import headers from '../../helpers/headers';
import { projectIdFromLocalStorage } from '../../helpers/projectIdToLocalstorage';

export const OPEX_MKOS_CHANGE_EXPENSE_INIT = 'OPEX_MKOS_CHANGE_EXPENSE_INIT';
export const OPEX_MKOS_CHANGE_EXPENSE_SUCCESS = 'OPEX_MKOS_CHANGE_EXPENSE_SUCCESS';
export const OPEX_MKOS_CHANGE_EXPENSE_ERROR = 'OPEX_MKOS_CHANGE_EXPENSE_ERROR';

export interface OPEXAction {
  type: string;
  // TODO: replace any
  payload?: any;
  errorMessage?: any;
}

const OPEXMKOSChangeExpenseInit = (): OPEXAction => ({
  type: OPEX_MKOS_CHANGE_EXPENSE_INIT,
});

const OPEXMKOSChangeExpenseSuccess = (expense: Article): OPEXAction => ({
  type: OPEX_MKOS_CHANGE_EXPENSE_SUCCESS,
  payload: expense,
});

const OPEXMKOSChangeExpenseError = (message: any): OPEXAction => ({
  type: OPEX_MKOS_CHANGE_EXPENSE_ERROR,
  errorMessage: message,
});

export function MKOSChangeExpense(article: Article): ThunkAction<Promise<void>, {}, {}, AnyAction> {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
    dispatch(OPEXMKOSChangeExpenseInit());

    try {
      const response = await fetch(`/graphql/${projectIdFromLocalStorage()}`, {
        method: 'POST',
        headers: headers(),
        body: JSON.stringify({
          query:
            `mutation {changeOpexMkosExpense(` +
            `expenseId: ${article.id?.toString()},` +
            `name: "${article.name?.toString()}",` +
            `caption: "${article.caption?.toString()}",` +
            `unit: "${article.unit?.toString()}",` +
            `value: ${article.value?.toString()}` +
            `){opexExpense{id,name,caption,unit,valueTotal,value{year,value}}, ok}}`,
        }),
      });
      const body = await response.json();

      if (response.ok) {
        dispatch(OPEXMKOSChangeExpenseSuccess(body.data?.changeOpexMkosExpense?.opexExpense));
      } else {
        dispatch(OPEXMKOSChangeExpenseError(body.message));
      }
    } catch (e) {
      dispatch(OPEXMKOSChangeExpenseError(e));
    }
  };
}
