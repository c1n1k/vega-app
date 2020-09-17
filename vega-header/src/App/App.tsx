import React from 'react';
import { BrowserRouter, Link, useHistory, useLocation } from 'react-router-dom';
import { Header, NavItemType } from '@gpn-prototypes/vega-header';
import { Text } from '@gpn-prototypes/vega-text';
import { Root as VegaRoot } from '@gpn-prototypes/vega-root';

interface NavLinkType extends NavItemType {
  url: string;
}

function VegaHeader() {
  const history = useHistory();
  const location = useLocation();

  const navItems: NavLinkType[] = [
    {
      name: 'Экономика проекта',
      url: '/fem',
      isActive: location.pathname.startsWith('/fem'),
    },
    {
      name: 'Логика проекта',
      url: '/logic',
      isActive: location.pathname.startsWith('/logic')
    },
  ];

  const menuItems = [
    { name: 'Проекты', url: '/' },
    { name: 'Обучение', url: '/' },
    { name: 'Помощь', url: '/help' },
  ];

  const activeItem = navItems.find((ni) => ni.isActive);

  const handleChangeActive = (item: NavLinkType): void => {
    history.push(item.url);
  };

  return (
    <Header>
      <Header.Menu title="Вега">
        {menuItems.map((menuItem) => (
          <Header.Menu.Item key={menuItem.name}>
            {(menuItemProps): React.ReactNode => (
              <Link
                onClick={menuItemProps.closeMenu}
                className={menuItemProps.className}
                to={menuItem.url}
              >
                <Text>{menuItem.name}</Text>
              </Link>
            )}
          </Header.Menu.Item>
        ))}
        <Header.Menu.Delimiter />
        <Header.Menu.Item>
          {(menuItemProps): React.ReactNode => (
            <Link onClick={menuItemProps.closeMenu} className={menuItemProps.className} to="/login">
              <Text>Выйти</Text>
            </Link>
          )}
        </Header.Menu.Item>
      </Header.Menu>
      <Header.Nav activeItem={activeItem} navItems={navItems} onChangeItem={handleChangeActive} />
    </Header>
  );
}

export function App(props) {
  props.fetch();

  return (
    <BrowserRouter basename="/projects">
      <VegaRoot defaultTheme="dark">
        <VegaHeader />
      </VegaRoot>
    </BrowserRouter>
  );
}
