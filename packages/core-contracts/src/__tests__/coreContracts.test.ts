import { coreContracts } from '../coreContracts';

describe('coreContracts', () => {
  it('should return "ok!"', () => {
    expect(coreContracts()).toEqual('ok!');
  });
});
