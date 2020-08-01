const initialState = {
  checking: true,
};
describe('Pruebas en el authReducer', () => {
  test('debe de retornar el estado por defecto', () => {
    const action = {};
    const state = authReducer(initialState, action);
    expect(state).toEqual(initialState);
  });
});
