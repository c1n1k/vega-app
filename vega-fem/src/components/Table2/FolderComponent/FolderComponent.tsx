import React, { useCallback } from 'react';
import { ScrollSyncPane } from 'react-scroll-sync';
import { Text } from '@gpn-prototypes/vega-ui';

import keyGen from '../../../helpers/keyGenerator';
import { cnTable2Wrapper } from '../cn-table2-wrapper';
import { TableArticle, TableGroup } from '../Table2';
import { cnTableCell2 } from '../TableCell2/cn-table-cell2';
import { TableCell2 } from '../TableCell2/TableCell2';
import { cnTableHeaderRow } from '../TableHeaderRow/cn-table-header-row';
import { TableHeaderRow } from '../TableHeaderRow/TableHeaderRow';

import { cnFolderComponentWrapper } from './cn-folder-component-wrapper';

import './FolderComponent.css';

interface FolderComponentProps {
  headerText?: any;
  groups?: TableGroup[];
  containerHeight: number;
  focusedArticle?: { article: TableArticle; group: TableGroup };
}

export const FolderComponent = ({
  headerText,
  groups,
  containerHeight,
  focusedArticle,
}: FolderComponentProps) => {
  const isSelectedArticle = useCallback(
    (group: TableGroup, article: TableArticle): boolean => {
      return group.id === focusedArticle?.group?.id && article.id === focusedArticle?.article?.id;
    },
    [focusedArticle],
  );

  return (
    <ScrollSyncPane>
      <div
        className={` ${cnFolderComponentWrapper()} ${cnTable2Wrapper(
          'scrollable-wrapper',
        )} ${cnTable2Wrapper('shadow')}`}
        style={{ height: `${containerHeight}px` }}
      >
        <div
          className={`${cnTable2Wrapper('table-area')} ${cnFolderComponentWrapper('numerable')}`}
        >
          <TableHeaderRow className={cnTable2Wrapper('sticky-top')}>
            <TableCell2 className={`${cnTableCell2('empty')} ${cnTableCell2('first-column')}`} />
            <TableCell2
              className={`
              ${cnTableCell2('column-header')}
              ${cnTableCell2('second-column')}
              ${cnTableCell2('border-bottom')}
              ${cnTableCell2('full-width')}
            `}
            >
              {headerText}
            </TableCell2>
          </TableHeaderRow>
          {groups?.map((group: TableGroup, index: number) => (
            <React.Fragment key={keyGen(index)}>
              <TableHeaderRow>
                <TableCell2 className={cnTableCell2('first-column', { numerable: true })} />
                <TableCell2
                  className={`${cnTableCell2('second-column', { group: true })} ${cnTableCell2(
                    'full-width',
                  )}`}
                >
                  <Text view="primary" size="s">
                    {group.caption}
                  </Text>
                </TableCell2>
              </TableHeaderRow>
              {group.articleList?.map((article: TableArticle, articleIndex: number) => (
                <TableHeaderRow
                  className={`${cnTableHeaderRow({
                    highlighted: isSelectedArticle(group, article),
                  })}`}
                  key={keyGen(articleIndex)}
                >
                  <TableCell2 className={cnTableCell2('first-column', { numerable: true })} />
                  <TableCell2
                    className={`${cnTableCell2('second-column', { article: true })} ${cnTableCell2(
                      'full-width',
                    )}`}
                  >
                    <Text view="primary" size="s">
                      {article.caption}
                    </Text>
                  </TableCell2>
                </TableHeaderRow>
              ))}
            </React.Fragment>
          ))}
        </div>
      </div>
    </ScrollSyncPane>
  );
};
