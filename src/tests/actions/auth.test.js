import configureStore from 'redux-mock-store'; //ES6 modules
import thunk from 'redux-thunk';
import Swal from 'sweetalert2';
import '@testing-library/jest-dom';
import { startLogin, startRegister } from '../../actions/auth';
import { types } from '../../types/types';
import * as fetchModule from '../../helpers/fetch';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const initialState = {};
let store = mockStore(initialState);

Storage.prototype.setItem = jest.fn();
jest.mock('sweetalert2', () => ({ fire: jest.fn() }));

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
  test('should startLogin incorrectly', async () => {
    await store.dispatch(startLogin('luis@luis.com', '123456789'));
    let actions = store.getActions();
    expect(actions).toEqual([]);
    expect(Swal.fire).toHaveBeenCalledWith('Error', 'Password incorrecto', 'error');
    await store.dispatch(startLogin('noexists@no.com', '123456'));
    actions = store.getActions();
    expect(Swal.fire).toHaveBeenCalledWith('Error', 'Un usuario no existe con ese email', 'error');
  });
  test('startRegister correcto', async () => {
    fetchModule.fetchSinToken = jest.fn(() => ({
      json() {
        return {
          ok: true,
          uid: '123',
          name: 'carlos',
          token: 'ABC123ABC',
        };
      },
    }));
    await store.dispatch(startRegister('pepin@pepin.com', '123456', 'pepin'));
    let actions = store.getActions();
    expect(actions[0]).toEqual({
      type: types.authLogin,
      payload: {
        uid: '123',
        name: 'carlos',
      },
    });
    expect(localStorage.setItem).toHaveBeenCalledWith('token', 'ABC123ABC');
    expect(localStorage.setItem).toHaveBeenCalledWith('token-init-date', expect.any(Number));
  });
});
