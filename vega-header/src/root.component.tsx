import React from 'react';
import { BrowserRouter, Link } from 'react-router-dom';
import { Header, NavItemType } from '@gpn-prototypes/vega-header';
import { Text } from '@gpn-prototypes/vega-text';
import { Root as VegaRoot } from '@gpn-prototypes/vega-root';

export default function Root(props) {
  props.fetch();

  const navItems = [
    {
      name: 'Экономика проекта',
      url: 'fem',
      isActive: true,
    },
    {
      name: 'Логика проекта',
      url: 'logic',
    },
  ];
  const menuItems = [
    { name: 'Проекты', url: '/' },
    { name: 'Обучение', url: '' },
    { name: 'Помощь', url: 'help' },
  ];

  const [activeItem, setActiveItem] = React.useState(navItems.find((ni) => ni.isActive));

  // const handleChangeActive = (item: NavItemType): void => {
  //   setActiveItem(item);
  // };

  return (
    <BrowserRouter basename="projects/">
      <VegaRoot defaultTheme="dark">
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
                <Link
                  onClick={menuItemProps.closeMenu}
                  className={menuItemProps.className}
                  to="/login/"
                >
                  <Text>Выйти</Text>
                </Link>
              )}
            </Header.Menu.Item>
          </Header.Menu>
          <div style={{ display: 'flex', width: 400 }}>
            {navItems.map((item) => (
              <Link to={item.url} style={{ color: '#fff', marginRight: 10 }}>
                {item.name}
              </Link>
            ))}
          </div>
          {/* <Header.Nav
            navItems={navItems}
            activeItem={activeItem}
            onChangeItem={handleChangeActive}
          /> */}
        </Header>
      </VegaRoot>
    </BrowserRouter>
  );
}
