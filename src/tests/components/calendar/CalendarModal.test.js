import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moment from 'moment';

import '@testing-library/jest-dom';
import { CalendarModal } from '../../../components/calendar/CalendarModal';
import { eventStartUpdate, eventClearActiveEvent, eventStartAddNew } from '../../../actions/events';
jest.mock('../../../actions/events', () => ({
  eventStartUpdate: jest.fn(),
  eventClearActiveEvent: jest.fn(),
  eventStartAddNew: jest.fn(),
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const now = moment().minutes(0).seconds(0).add(1, 'hours');
const nowPlus1 = now.clone().add(1, 'hours');

const initState = {
  calendar: {
    events: [],
    activeEvent: {
      title: 'Hola Mundo',
      notes: 'Algunas notas',
      start: now.toDate(),
      end: nowPlus1.toDate(),
    },
  },
  auth: {
    uid: '123',
    name: 'Fernando',
  },
  ui: { modalOpen: true },
};

const store = mockStore(initState);
store.dispatch = jest.fn();

const wrapper = mount(
  <Provider store={store}>
    <CalendarModal />
  </Provider>,
);

describe('Pruebas en <CalendarModal />', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  test('debe de mostrar el modal', () => {
    expect(wrapper.find('Modal').prop('isOpen')).toBe(true);
  });
  test('debe de llamar la accion de actualizar y cerrar le modal', () => {
    wrapper.find('form').simulate('submit', { preventDefault() {} });
    expect(eventStartUpdate).toHaveBeenCalledWith(initState.calendar.activeEvent);
    expect(eventClearActiveEvent).toHaveBeenCalled();
  });
  test('debe de mostrar un error en el input si falta el titulo', () => {
    wrapper.find('form').simulate('submit', { preventDefault() {} });
    expect(wrapper.find('input[name="title"]').hasClass('is-invalid')).toBe(true);
  });
  test('debe de crear un nuevo evento', () => {
    const initState = {
      calendar: {
        events: [],
        activeEvent: null,
      },
      auth: {
        uid: '123',
        name: 'Fernando',
      },
      ui: { modalOpen: true },
    };

    const store = mockStore(initState);
    store.dispatch = jest.fn();

    const wrapper = mount(
      <Provider store={store}>
        <CalendarModal />
      </Provider>,
    );

    wrapper
      .find('input[name="title"]')
      .simulate('change', { target: { name: 'title', value: 'Hola pruebas' } });
    wrapper.find('form').simulate('submit', { preventDefault() {} });

    expect(eventStartAddNew).toHaveBeenCalledWith({
      end: expect.anything(),
      start: expect.anything(),
      title: 'Hola pruebas',
      notes: '',
    });
    expect(eventClearActiveEvent).toHaveBeenCalled();
  });
});
