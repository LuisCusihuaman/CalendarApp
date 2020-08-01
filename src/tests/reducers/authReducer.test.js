const { types } = require('../../types/types');
const { authReducer } = require('../../reducers/authReducer');

const initState = {
  checking: true,
};
describe('Pruebas en el authReducer', () => {
  test('debe de retornar el estado por defecto', () => {
    const action = {};
    const state = authReducer(initState, action);
    expect(state).toEqual(initState);
  });
  test('deberia autenticar el usuario', () => {
    const action = {
      type: types.authLogin,
      payload: { uid: '123', name: 'Luis' },
    };
    const state = authReducer(initState, action);
    expect(state).toEqual({ checking: false, uid: '123', name: 'Luis' });
  });
});
