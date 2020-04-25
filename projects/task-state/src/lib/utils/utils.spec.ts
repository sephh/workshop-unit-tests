import {uid} from './utils';

describe('TaskState utils', () => {
  it('should return a uid', () => {
    const id = uid();
    expect(id.length).toBeTruthy();
  });
})
