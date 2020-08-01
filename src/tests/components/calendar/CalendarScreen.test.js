import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store'; //ES6 modules
import thunk from 'redux-thunk';
import '@testing-library/jest-dom';
import { CalendarScreen } from '../../../components/calendar/CalendarScreen';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const initialState = {
  calendar: { events: [] },
  auth: { uid: '123', name: 'Luis' },
  ui: { uiOpenModal: false },
};
const store = mockStore(initialState);
store.dispatch = jest.fn();

const wrapper = mount(
  <Provider store={store}>
    <CalendarScreen />
  </Provider>,
);
describe('Pruebas en <CalendarScreen/>', () => {
  test('debe de mosrarse correctamente', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
