import React, { useMemo, useState } from 'react';
import { unmountComponentAtNode, render } from 'react-dom';
import { Carousel } from '@gpn-prototypes/vega-carousel';
import { Layout } from '@gpn-prototypes/vega-layout';
import { Root as VegaRoot } from '@gpn-prototypes/vega-root';

import '../node_modules/@gpn-prototypes/vega-carousel/dist/src/Carousel.css';

import './style.css';

const MyComponent = () => {
  const [idx, setIdx] = React.useState(0);

  return (
    <div>
      {/* <style>
        {`.VegaCarousel {
        display: block;
        width: 100%;
      }

     .VegaCarousel__Container {
       display: flex;
       align-items: center;
     }

     .VegaCarousel__Track {
       display: flex;
       order: 2;

       overflow: hidden;

       width: 100%;

       border-radius: 8px;
       box-shadow: 0 6px 12px rgba(0, 0, 0, 0.44);
     }

     .VegaCarousel__Slide {
       width: 100%;
       flex-basis: 100%;
       flex-shrink: 0;
     }

     .VegaCarousel__Track_direction_next .VegaCarousel__Slide.is-enter {
           transform: translateX(100%);
         }

     .VegaCarousel__Track_direction_next .VegaCarousel__Slide.is-enter.is-enter-active {
           transition: transform 300ms ease-in;
           transform: translateX(0);
         }

     .VegaCarousel__Track_direction_next .VegaCarousel__Slide.is-exit {
           transform: translateX(-100%);
         }

     .VegaCarousel__Track_direction_next .VegaCarousel__Slide.is-exit.is-exit-active {
           transition: transform 300ms ease-in;
           transform: translateX(-200%);
         }

     .VegaCarousel__Track_direction_prev .VegaCarousel__Slide.is-enter {
           transform: translateX(-100%);
         }

     .VegaCarousel__Track_direction_prev .VegaCarousel__Slide.is-enter.is-enter-active {
           transition: transform 300ms ease-in;
           transform: translateX(0);
         }

     .VegaCarousel__Track_direction_prev .VegaCarousel__Slide.is-exit {
           transform: translateX(-100%);
         }

     .VegaCarousel__Track_direction_prev .VegaCarousel__Slide.is-exit.is-exit-active {
           transition: transform 300ms ease-in;
           transform: translateX(0);
         }

     .VegaCarousel__Caption {
       margin-top: var(--space-2xl);
       margin-right: auto;
       margin-left: auto;

       max-width: 600px;

       text-align: center;
     }

    // .VegaCarousel__Dots {
       margin-top: var(--space-3xl);

       display: flex;
       justify-content: center;
       align-items: center;
     }

     .VegaCarousel__Dot {
       --color: var(--color-control-bg-ghost);
       --color-hover: var(--color-control-bg-ghost-hover);
       padding: 0;

       box-sizing: border-box;
       width: 12px;
       height: 12px;

       cursor: pointer;

      background-color: transparent;
      border: 2px solid var(--color);
      border-radius: 50%;
      -webkit-appearance: none;

       transition: border-color 0.2s ease, background-color 0.2s ease;
     }

     .VegaCarousel__Dot:not(:last-child) {
         margin-right: 8px;
       }

     .VegaCarousel__Dot:hover {
         border-color: var(--color-hover);
       }

     .VegaCarousel__Dot_active {
         background-color: var(--color);
         border-color: transparent;
       }

     .VegaCarousel__Dot_active:hover {
           background-color: var(--color-hover);
           border-color: transparent;
         }

     .VegaCarousel__Arrow_position_left {
         order: 1;
       }

    .VegaCarousel__Arrow_position_right {
        order: 3;
      }`}
      </style> */}
      <Carousel currentIdx={idx} onChange={setIdx}>
        <Carousel.Slide caption="caption 1">
          <img src="https://picsum.photos/1000/560" />
        </Carousel.Slide>
        <Carousel.Slide caption="caption 2">
          <img src="https://picsum.photos/seed/picsum/1000/560" />
        </Carousel.Slide>
      </Carousel>
    </div>
  );
};

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <>
      <button
        type="button"
        onClick={() => {
          console.log(count);
          setCount(count + 1);
        }}
      >
        +1
      </button>
      <span>{count}</span>
      <button
        type="button"
        onClick={() => {
          setCount(count - 1);
        }}
      >
        -1
      </button>
    </>
  );
}

class CarouselWidget extends HTMLElement {
  constructor() {
    super();
    // this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.mount();
  }

  disconnectedCallback() {
    this.unmount();
  }

  mount() {
    render(<MyComponent />, this);
  }

  unmount() {
    unmountComponentAtNode(this.shadowRoot);
  }
}
customElements.define('carousel-widget', CarouselWidget);

class CounterWidget extends HTMLElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.mount();
  }

  disconnectedCallback() {
    this.unmount();
  }

  mount() {
    render(<Counter />, this.shadowRoot);
  }

  unmount() {
    unmountComponentAtNode(this.shadowRoot);
  }
}

customElements.define('counter-widget', CounterWidget);

export default function Root(props) {
  const initialState = useMemo(() => ({}), []);
  // const [widgets, setWidgets] = useState([]);

  // useEffect(() => {
  //   fetchWidgets().then((widgets) => setWidgets(widgets));
  // }, []);

  const App = () => {
    return <MyComponent />;
  };

  const widgets = [
    { name: 'Widget one', component: 'vega-widget-one' },
    {
      name: 'Widget two',
      component: `carousel-widget`,
    },
    {
      name: 'Widget three',
      component: `counter-widget`,
    },
  ];

  const handleChange = ({ state }) => {
    console.log('save layout to backend', state);
    // saveLayoutToBackend(state);
  };

  return (
    <VegaRoot defaultTheme="dark" className="app">
      <Layout widgets={widgets} onChange={handleChange} />
    </VegaRoot>
  );
}
