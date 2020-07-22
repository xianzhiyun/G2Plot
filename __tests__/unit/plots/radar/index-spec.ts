import { Radar } from '../../../../src';
import { POSITIVE_NEGATIVE_DATA } from '../../../data/common';
import { createDiv } from '../../../utils/dom';

describe('radar', () => {
  const data = POSITIVE_NEGATIVE_DATA.filter((o) => o.value > 0);
  it('radiusField*angleField', () => {
    const radar = new Radar(createDiv(), {
      width: 400,
      height: 300,
      data,
      angleField: 'type',
      radiusField: 'value',
      radius: 0.8,
    });

    radar.render();
    expect(radar.chart).toBeDefined();
  });
});
