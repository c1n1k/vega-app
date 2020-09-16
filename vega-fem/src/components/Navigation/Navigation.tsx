import React from 'react';
import { useHistory } from 'react-router-dom';
import { ChoiceGroup } from '@gpn-prototypes/vega-ui';

export interface NavItem {
  title: string;
  path: string;
}

export const Navigation = (): React.ReactElement => {
  const history = useHistory();
  const tabs: Array<NavItem> = [
    {
      title: 'Макропараметры',
      path: '/',
    },
    {
      title: 'Налоговое окружение',
      path: '/tax-environment',
    },
    {
      title: 'Цены',
      path: '/prices',
    },
    {
      title: 'OPEX',
      path: '/OPEX',
    },
    {
      title: 'CAPEX',
      path: '/CAPEX',
    },
    {
      title: 'Профиль добычи',
      path: '/mining-profile',
    },
  ];
  const tab = tabs.find((t) => {
    return t.path === location.pathname;
  });
  return (
    <ChoiceGroup
      size="s"
      view="primary"
      form="default"
      items={tabs}
      value={tab !== undefined ? [tab] : []}
      getItemKey={(item) => item.title}
      getItemLabel={(item) => item.title}
      onChange={({ value }) => {
        if (value?.length === 1) {
          history.push(value[0].path);
        }
      }}
    />
  );
};
