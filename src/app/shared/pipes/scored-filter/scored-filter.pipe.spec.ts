import { ScoredFilterPipe } from './scored-filter.pipe';

const mockData = [
  {
    label: 'abacate',
    type: 'bonito'
  },
  {
    label: 'abacaxi',
    type: 'maduro'
  },
  {
    label: 'banana',
    type: 'verde'
  },
  {
    label: 'caqui',
    type: 'bonito'
  },
  {
    label: 'Jaboticaba',
    type: 'maduro'
  },
  {
    label: 'limão',
    type: 'azedo'
  },
  {
    label: 'picles',
    type: 'azedo'
  }
];

describe('ScoredFilterPipe', () => {
  it('create an instance', () => {
    const pipe = new ScoredFilterPipe();
    expect(pipe).toBeTruthy();
  });

  it('should filter by key value or values', ()=>{
    const pipe = new ScoredFilterPipe();

    const expected1 = pipe.transform(mockData, 'bonito', 'type');
    const expected2 = pipe.transform(mockData, 'bo', ['label', 'type']);

    expect(expected1).toEqual(mockData.filter(d => d.type === 'bonito'));
    expect(expected2).toEqual([
      {
        label: 'abacate',
        type: 'bonito'
      },
      {
        label: 'caqui',
        type: 'bonito'
      },
      {
        label: 'Jaboticaba',
        type: 'maduro'
      }
    ]);
  });
});
