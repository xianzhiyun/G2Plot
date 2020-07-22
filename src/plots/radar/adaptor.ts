import { Geometry } from '@antv/g2';
import { deepMix, get, isFunction, isNil } from '@antv/util';
import { Params } from '../../core/adaptor';
import { tooltip, interaction, animation, theme } from '../../common/adaptor';
import { findGeometry } from '../../common/helper';
import { AXIS_META_CONFIG_KEYS } from '../../constant';
import { flow, pick } from '../../utils';
import { RadarOptions } from './types';

/**
 * 字段
 * @param params
 */
function field(params: Params<RadarOptions>): Params<RadarOptions> {
  const { chart, options } = params;
  const { data, angleField, radiusField, colorField, point, area } = options;

  chart.data(data);
  chart
    .line()
    .position(`${angleField}*${radiusField}`)
    .color(isNil(colorField) ? '' : colorField);

  if (point) {
    chart
      .point()
      .position(`${angleField}*${radiusField}`)
      .color(isNil(colorField) ? '' : colorField);
  }

  if (area) {
    chart
      .area()
      .position(`${angleField}*${radiusField}`)
      .color(isNil(colorField) ? '' : colorField);
  }

  return params;
}

/**
 * meta 配置
 * @param params
 */
function meta(params: Params<RadarOptions>): Params<RadarOptions> {
  const { chart, options } = params;
  const { meta, angleField, radiusField, angleAxis, radiusAxis } = options;

  // meta 直接是 scale 的信息
  const scales = deepMix(
    {
      [angleField]: pick(angleAxis, AXIS_META_CONFIG_KEYS),
      [radiusField]: pick(radiusAxis, AXIS_META_CONFIG_KEYS),
    },
    meta
  );

  chart.scale(scales);

  return params;
}

/**
 * coord 配置
 * @param params
 */
function coord(params: Params<RadarOptions>): Params<RadarOptions> {
  const { chart, options } = params;
  const { radius } = options;

  chart.coordinate('polar', {
    radius,
  });
  return params;
}

/**
 * legend 配置
 * @param params
 */
function legend(params: Params<RadarOptions>): Params<RadarOptions> {
  return params;
}

/**
 * label 配置
 * @param params
 */
function label(params: Params<RadarOptions>): Params<RadarOptions> {
  return params;
}

/**
 * style 配置
 * @param params
 */
function style(params: Params<RadarOptions>): Params<RadarOptions> {
  const { chart, options } = params;
  const { line, point, area, angleField, radiusField } = options;

  const lineGeom = findGeometry(chart, 'line');
  if (lineGeom && line) {
    if (isFunction(line.style)) {
      lineGeom.style(`${angleField}*${radiusField}`, line.style);
    } else {
      lineGeom.style(line.style || {});
    }
  }

  const pointGeom = findGeometry(chart, 'point');
  if (pointGeom && point) {
    if (isFunction(point.style)) {
      pointGeom.style(`${angleField}*${radiusField}`, point.style);
    } else {
      pointGeom.style(point.style || {});
    }
  }

  const areaGeom = findGeometry(chart, 'area');
  if (areaGeom && area) {
    if (isFunction(area.style)) {
      areaGeom.style(`${angleField}*${radiusField}`, area.style);
    } else {
      areaGeom.style(area.style || {});
    }
  }

  return params;
}

/**
 * shape 的配置处理
 * @param params
 */
function shape(params: Params<RadarOptions>): Params<RadarOptions> {
  const { chart, options } = params;
  const { point } = options;

  const pointGeom = chart.geometries.find((g: Geometry) => g.type === 'point');

  if (pointGeom) {
    const shape = get(point, 'shape', 'circle');
    pointGeom.shape(shape);
  }
  return params;
}

/**
 * 雷达图适配器
 * @param chart
 * @param options
 */
export function adaptor(params: Params<RadarOptions>) {
  // flow 的方式处理所有的配置到 G2 API
  flow(field, meta, theme, coord, legend, tooltip, label, style, shape, interaction, animation)(params);
}
