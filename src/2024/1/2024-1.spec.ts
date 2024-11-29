import { fetchAoc } from '../../utils/fetch-input'

describe('fetch 2024', () => {
  it('should fetch day 1 data', async () =>  {
    const data = await fetchAoc(2024, 1);

    expect(data).toBeTruthy();
    expect(localStorage.getItem('2024-1')).toBeTruthy();
  })
})