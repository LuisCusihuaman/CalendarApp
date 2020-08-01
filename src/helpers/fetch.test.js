const { fetchSinToken, fetchConToken } = require('./fetch');

describe('Pruebas en el helper fetch', () => {
  let token = '';

  test('fetchSinToken debe de funcionar', async () => {
    const resp = await fetchSinToken(
      'auth',
      { email: 'luis@luis.com', password: '123456' },
      'POST',
    );
    expect(resp instanceof Response).toBe(true);
    const body = await resp.json();
    expect(body.ok).toBe(true);
    token = body.token;
  });
  test('fetchConToken debe de funcionar', async () => {
    localStorage.setItem('token', token);
    const resp = await fetchConToken('events/5f23c45b1363046c94b3f9e6', {}, 'DELETE');
    const body = await resp.json();
    expect(body.msg).toBe('Evento no existe con ese id');
  });
});
