import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import Article, { ArticleValues } from '../../../types/Article';
import { OPEXGroup } from '../../../types/OPEX/OPEXGroup';
import { opexChangeCaseExpenseYearValue } from '../../actions/OPEX/changeOPEXCaseExpenseYearValue';
import { FolderComponent } from '../../components/Table2/FolderComponent/FolderComponent';
import {
  Table2,
  TableArticle,
  TableArticleValue,
  TableGroup,
} from '../../components/Table2/Table2';

interface OPEXEconomyTableContainerProps {
  opexCaseList?: OPEXGroup[];
}

export const OPEXEconomyTableContainer = ({ opexCaseList }: OPEXEconomyTableContainerProps) => {
  const dispatch = useDispatch();

  /* const focusedArticleSelector = (state: any) => state.highlightReducer.focusedArticle;
  const focusedArticle: { article: Article; group: MacroparameterSetGroup } = useSelector(
    focusedArticleSelector,
  ); */

  const [yearsColumns, setYearsColumns] = useState([] as string[]);
  const [groupsList, setGroupsList] = useState([] as TableGroup[]);
  const [containerHeight, setContainerHeight] = useState(0);

  /* const [convertedFocusedArticle, setConvertedFocusedArticle] = useState(
    {} as { article: TableArticle; group: TableGroup },
  ); */

  const calculateYearsRange = useCallback((start: number, end: number): string[] => {
    const result: string[] = [];
    for (let i = start; i <= end; i += 1) {
      result.push(i.toString());
    }
    return result;
  }, []);

  const convertToTableArticles = useCallback((nonPrepearedArticles: Article[]): TableArticle[] => {
    const result: TableArticle[] = [];
    if (nonPrepearedArticles.length) {
      nonPrepearedArticles.forEach((article: Article) => {
        if (article) {
          result.push({
            id: article.id,
            caption: article?.caption,
            value: article.value as TableArticleValue[],
            valueTotal: article.valueTotal,
          } as TableArticle);
        }
      });
    }
    return result;
  }, []);

  const convertToTableGroups = useCallback(
    (nonPrepearedGroups: OPEXGroup[]): TableGroup[] => {
      const result: TableGroup[] = [];

      nonPrepearedGroups.forEach((group: OPEXGroup) => {
        result.push({
          id: group?.id,
          caption: group?.caption,
          articleList: convertToTableArticles(group?.opexExpenseList || []),
        } as TableGroup);
      });

      return result;
    },
    [convertToTableArticles],
  );

  const updateExpenseYearValue = useCallback(
    (article: TableArticle, group: TableGroup, value: TableArticleValue) => {
      dispatch(
        opexChangeCaseExpenseYearValue(
          { id: group.id } as OPEXGroup,
          { ...article } as Article,
          { ...value } as ArticleValues,
        ),
      );
    },
    [dispatch],
  );

  const calcHeight = useCallback((): number => {
    const rowHeight = 30;
    let result: number = rowHeight;
    for (let i = 0; i < groupsList.length; i += 1) {
      result += rowHeight + groupsList[i].articleList.length * rowHeight;
    }
    return result;
  }, [groupsList]);

  useEffect(() => {
    let minYear = Infinity;
    let maxYear = -Infinity;

    /* eslint-disable-line */opexCaseList?.forEach((opexCaseListItem: OPEXGroup) => {
      if (opexCaseListItem.yearStart < minYear) {
        minYear = opexCaseListItem.yearStart;
      }

      if (opexCaseListItem.yearEnd > maxYear) {
        maxYear = opexCaseListItem.yearEnd;
      }
    });

    setYearsColumns(calculateYearsRange(minYear, maxYear));

    setGroupsList(convertToTableGroups(opexCaseList || []));
  }, [opexCaseList, calculateYearsRange, convertToTableGroups]);

  useEffect(() => {
    setContainerHeight(calcHeight());
  }, [groupsList, calcHeight]);

  /* useEffect(() => {
    setConvertedFocusedArticle({
      article: convertToTableArticles([focusedArticle?.article || {}])[0],
      group: convertToTableGroups([focusedArticle?.group || {}])[0],
    });
  }, [focusedArticle, convertToTableArticles, convertToTableGroups]); */

  return (
    <Table2
      leftSideComponent={
        /* eslint-disable-line */<FolderComponent
          headerText="Заголовок"
          groups={groupsList}
          containerHeight={containerHeight}
          // focusedArticle={convertedFocusedArticle}
        />
      }
      valuesColumns={yearsColumns}
      groups={groupsList}
      additionalColumns={[
        {
          label: 'Суммарное',
          value: 'valueTotal',
        },
      ]}
      updateValueCallback={updateExpenseYearValue}
      containerHeight={containerHeight}
    />
  );
};
