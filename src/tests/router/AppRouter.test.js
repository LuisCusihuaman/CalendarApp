import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store'; //ES6 modules
import thunk from 'redux-thunk';
import '@testing-library/jest-dom';
import { AppRouter } from '../../router/AppRouter';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('Pruebas en <AppRouter/>', () => {
  test('debe de mostrar el espere', () => {
    const initialState = { auth: { checking: true } };
    const store = mockStore(initialState);
    const wrapper = mount(
      <Provider store={store}>
        <AppRouter />
      </Provider>,
    );
    expect(wrapper.find('h5').exists()).toBe(true);
  });
  test('debe de mostrar la ruta publica', () => {
    const initialState = { auth: { checking: false, uid: null } };
    const store = mockStore(initialState);
    const wrapper = mount(
      <Provider store={store}>
        <AppRouter />
      </Provider>,
    );
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('.login-container').exists()).toBe(true);
  });
  test('debe de mostrar la ruta privada', () => {
    const initialState = {
      ui: { modalOpen: false },
      calendar: {
        events: [],
      },
      auth: { checking: false, uid: '123', name: 'Pepito' },
    };
    const store = mockStore(initialState);
    const wrapper = mount(
      <Provider store={store}>
        <AppRouter />
      </Provider>,
    );
    expect(wrapper.find('.calendar-screen').exists()).toBe(true);
  });
});
