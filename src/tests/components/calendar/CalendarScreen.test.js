import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store'; //ES6 modules
import thunk from 'redux-thunk';
import '@testing-library/jest-dom';
import { CalendarScreen } from '../../../components/calendar/CalendarScreen';
import { messages } from '../../../helpers/calendar-messages-es';
import { types } from '../../../types/types';
import { eventSetActive } from '../../../actions/events';
import { act } from 'react-dom/test-utils';

jest.mock('../../../actions/events', () => ({
  eventSetActive: jest.fn(),
  eventStartLoading: jest.fn(),
}));
Storage.prototype.setItem = jest.fn();

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
  test('pruebas con las interacciones del calendario ', () => {
    const calendar = wrapper.find('Calendar');
    const calendarMessages = calendar.prop('messages');
    expect(calendarMessages).toEqual(messages);

    calendar.prop('onDoubleClickEvent')();
    expect(store.dispatch).toHaveBeenCalledWith({ type: types.uiOpenModal });

    calendar.prop('onSelectEvent')({ start: 'March' });
    expect(eventSetActive).toHaveBeenCalledWith({ start: 'March' });

    act(() => {
      calendar.prop('onView')('week');
    });
    expect(localStorage.setItem).toHaveBeenCalledWith('lastView', 'week');
  });
});
