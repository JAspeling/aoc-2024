import { fetchAoc } from '../../utils/fetch-input'

jest.mock('./2024-1_temp.ts', () => ({
  ...jest.requireActual('./2024-1_temp.ts'),
  run: jest.fn()
}))

describe('fetch 2024', () => {
  it('should fetch day 1 data', async () =>  {
    const data = await fetchAoc(2024, 1);

    expect(data).toBeTruthy();
    expect(localStorage.getItem('2024-1')).toBeTruthy();
  })
})

describe('fetch 2024', () => {
  it('should not execute run', async () =>  {
    expect(require('./2024-1.ts').run).not.toHaveBeenCalled();
  })
})