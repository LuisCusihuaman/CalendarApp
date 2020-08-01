const { types } = require('../../types/types');

describe('Pruebas en Types', () => {
  test('los types deben ser iguales', () => {
    expect(types).toEqual({
      uiOpenModal: '[ui] Open Modal',
      uiCloseModal: '[ui] Close Modal',
      eventSetActive: '[event] Set Active',
      eventLogout: '[event] Logout event',
      eventStartAddNew: '[event] Start add new',
      eventAddNew: '[event] Add new',
      eventClearActiveEvent: '[event] Clear active event',
      eventUpdated: '[event] Event updated',
      eventDeleted: '[event] Event deleted',
      eventLoaded: '[event] Events loaded',
      authCheckingFinish: '[auth] Finish checking login state',
      authStartLogin: '[auth] Start login',
      authLogin: '[auth] login',
      authStartRegister: '[auth] Start Register',
      authStartStartTokenRenew: '[auth] Start token renew',
      authLogout: '[auth] Logout',
    });
  });
});
