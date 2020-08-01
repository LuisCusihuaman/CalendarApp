import configureStore from 'redux-mock-store'; //ES6 modules
import thunk from 'redux-thunk';
import '@testing-library/jest-dom';
import { startLogin } from '../../actions/auth';
import { types } from '../../types/types';
const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const initialState = {};
let store = mockStore(initialState);

Storage.prototype.setItem = jest.fn();

describe('Pruebas en la acciones Auth', () => {
  beforeEach(() => {
    store = mockStore(initialState);
    jest.clearAllMocks();
  });
  test('startLogin correcto ', async () => {
    await store.dispatch(startLogin('luis@luis.com', '123456'));
    const actions = store.getActions();

    expect(actions[0]).toEqual({
      type: types.authLogin,
      payload: {
        uid: expect.any(String),
        name: expect.any(String),
      },
    });
    expect(localStorage.setItem).toHaveBeenCalledWith('token', expect.any(String));
    expect(localStorage.setItem).toHaveBeenCalledWith('token-init-date', expect.any(Number));
  });
});
