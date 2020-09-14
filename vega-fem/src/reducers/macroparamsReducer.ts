import Article, { ArticleValues } from '../../types/Article';
import MacroparameterSet from '../../types/Macroparameters/MacroparameterSet';
import MacroparameterSetGroup from '../../types/Macroparameters/MacroparameterSetGroup';
import { MACROPARAM_ADD_SUCCESS } from '../actions/Macroparameters/addMacroparameter';
import { MACROPARAM_SET_GROUP_ADD_SUCCESS } from '../actions/Macroparameters/addMacroparameterSetGroup';
import {
  MACROPARAM_HIGHLIGHT,
  MACROPARAM_HIGHLIGHT_CLEAR,
} from '../actions/Macroparameters/highlightMacroparameter';
import {
  MACROPARAMS_SET_LIST_ERROR,
  MACROPARAMS_SET_LIST_FETCH,
  MACROPARAMS_SET_LIST_SUCCESS,
  MACROPARAMS_SET_SELECTED,
  MacroparamsAction,
} from '../actions/Macroparameters/macroparameterSetList';
import {
  MACROPARAM_SET_UPDATE_ERROR,
  MACROPARAM_SET_UPDATE_SUCCESS,
} from '../actions/Macroparameters/updateMacroparameterSet';
import { MACROPARAM_UPDATE_VALUE_SUCCESS } from '../actions/Macroparameters/updateMacroparameterValue';
import { MACROPARAM_UPDATE_YEAR_VALUE_SUCCESS } from '../actions/Macroparameters/updateMacroparameterYearValue';

const initialState = {
  macroparameterSetList: [] as MacroparameterSet[],
  selected: {} as MacroparameterSet,
  focusedArticle: {} as any,
};

let groupList: MacroparameterSetGroup[];
let group: MacroparameterSetGroup;
let macroparameterList: Array<Article>;
let macr: Article;
let value: ArticleValues[];
let isNewYearValue: boolean;

export default function macroparamsReducer(state = initialState, action: MacroparamsAction) {
  switch (action.type) {
    case MACROPARAMS_SET_LIST_FETCH:
    case MACROPARAMS_SET_LIST_SUCCESS:
      return {
        ...state,
        macroparameterSetList: action.payload,
      };
    case MACROPARAMS_SET_LIST_ERROR:
    case MACROPARAM_SET_UPDATE_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case MACROPARAMS_SET_SELECTED:
    case MACROPARAM_SET_UPDATE_SUCCESS:
      return {
        ...state,
        selected: action.payload,
        macroparameterSetList: state.macroparameterSetList.map((macroparameterSet) =>
          macroparameterSet.id === action.payload.id ? action.payload : macroparameterSet,
        ),
      };
    case MACROPARAM_SET_GROUP_ADD_SUCCESS:
      /* eslint-disable-line */state?.selected?.macroparameterGroupList?.push(action.payload);
      return {
        ...state,
        selected: { ...state.selected },
      };
    case MACROPARAM_ADD_SUCCESS:
      /* eslint-disable-line */state?.selected?.macroparameterGroupList
        ?.find((group_: MacroparameterSetGroup) => group_.id === action.payload.group?.id)
        ?.macroparameterList?.push(action.payload?.macroparameter);
      return {
        ...state,
        selected: { ...state.selected },
      };
    case MACROPARAM_UPDATE_VALUE_SUCCESS:
      /* eslint-disable-line */groupList = (state?.selected?.macroparameterGroupList ??
        []) as MacroparameterSetGroup[];
      /* eslint-disable-line */group = (groupList?.find(
        (groupItem: MacroparameterSetGroup) => groupItem.id === action.payload.group?.id,
      ) ?? {}) as MacroparameterSetGroup;
      /* eslint-disable-line */macroparameterList = group?.macroparameterList ?? [];
      /* eslint-disable-line */macr = (macroparameterList?.find(
        (macroparameter: Article) => macroparameter.id === action.payload.macroparameter?.id,
      ) ?? {}) as Article;
      return {
        ...state,
        selected: {
          ...state.selected,
          ...{
            macroparameterGroupList: [
              // ...groupList.filter((i) => i.id !== group.id),
              ...groupList.map((groupItem: MacroparameterSetGroup) => {
                if (groupItem.id === group.id) {
                  return {
                    ...{
                      ...action.payload.group,
                      macroparameterList: [
                        ...macroparameterList.map((i: Article) => {
                          if (i.id === macr.id) {
                            return { ...action.payload.macroparameter };
                          }
                          return { ...i };
                        }),
                      ],
                    },
                  };
                }
                return { ...groupItem };
              }),
            ],
          },
        },
      };
    case MACROPARAM_UPDATE_YEAR_VALUE_SUCCESS:
      groupList = (state?.selected?.macroparameterGroupList ?? []) as MacroparameterSetGroup[];
      group = (groupList?.find(
        (groupItem: MacroparameterSetGroup) => groupItem.id === action.payload.group?.id,
      ) ?? {}) as MacroparameterSetGroup;

      macroparameterList = group?.macroparameterList ?? [];
      macr = (macroparameterList?.find(
        (macroparameter: Article) => macroparameter.id === action.payload.macroparameter?.id,
      ) ?? {}) as Article;
      value = (macr?.value as ArticleValues[]).map((i) => {
        const iCopy = i;
        if (iCopy.year === action.payload.value?.year) {
          iCopy.value = action.payload.value?.value;
        }
        return iCopy;
      });

      // обновление значения в ранее незаполненном году
      isNewYearValue = value.filter((i) => i.year === action.payload.value?.year).length === 0;
      if (isNewYearValue) {
        value.push(action.payload.value);
      }

      return {
        ...state,
        selected: {
          ...state.selected,
          ...{
            macroparameterGroupList: [
              // ...groupList.filter((i) => i.id !== group.id),
              ...groupList.map((groupItem: MacroparameterSetGroup) => {
                if (groupItem.id === group.id) {
                  return {
                    ...{
                      ...group,
                      ...{
                        macroparameterList: [
                          ...macroparameterList.map((article: Article) => {
                            if (article.id === macr.id) {
                              return { ...macr, ...{ value } };
                            }
                            return { ...article };
                          }),
                        ],
                      },
                    },
                  };
                }
                return { ...groupItem };
              }),
              /* ...[
                {
                  ...group,
                  ...{
                    macroparameterList: [
                      ...macroparameterList.filter((i: Article) => i.id !== macr.id),
                      ...[
                        {
                          ...macr,
                          ...{ value },
                        },
                      ],
                    ],
                  },
                },
              ], */
            ],
          },
        },
      };
    case MACROPARAM_HIGHLIGHT:
      return {
        ...state,
        focusedArticle: {
          group: action.payload.group,
          article: action.payload.article,
        },
      };
    case MACROPARAM_HIGHLIGHT_CLEAR:
      return {
        ...state,
        focusedArticle: {},
      };
    default:
      return state;
  }
}
