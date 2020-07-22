import { Options } from '../../types';
import { ShapeStyle } from '../../types/style';

export interface RadarOptions extends Options {
  /** 角度字段 */
  readonly angleField: string;
  /** 径向字段 */
  readonly radiusField: string;
  /** 分组字段 */
  readonly colorField?: string;
  /** 是否平滑 */
  readonly smooth?: boolean;
  /** 折线图形样式 */
  readonly line?: {
    size?: number;
    color?: string;
    style?: ShapeStyle | ((...args: any[]) => ShapeStyle);
  };
  /** 数据点图形样式 */
  readonly point?: {
    shape?: string;
    size?: number;
    color?: string;
    style?: ShapeStyle | ((...args: any[]) => ShapeStyle);
  };
  /** area 图形样式 */
  readonly area?: {
    style?: ShapeStyle | ((...args: any[]) => ShapeStyle);
  };
  /** 角度轴配置 */
  readonly angleAxis?: any;
  /** 径向轴配置 */
  readonly radiusAxis?: any;
  /** 雷达图半径 */
  readonly radius?: number;
}
