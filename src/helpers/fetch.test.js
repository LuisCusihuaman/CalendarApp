const { fetchSinToken } = require('./fetch');

describe('Pruebas en el helper fetch', () => {
  test('fetchSinToken debe de funcionar', async () => {
    const resp = await fetchSinToken(
      'auth',
      { email: 'luis@luis.com', password: '123456' },
      'POST',
    );
    expect(resp instanceof Response).toBe(true);
    const body = await resp.json();
    expect(body.ok).toBe(true);
  });
});
