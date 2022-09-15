/* tslint:disable */
/* eslint-disable */

import React, { CSSProperties, SVGAttributes, FunctionComponent } from 'react';
import { getIconColor } from './helper';

interface Props extends Omit<SVGAttributes<SVGElement>, 'color'> {
  size?: number;
  color?: string | string[];
}

const DEFAULT_STYLE: CSSProperties = {
  display: 'block',
};

const IconPeixun: FunctionComponent<Props> = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M864 680H224c-70.4 0-128-57.6-128-128V160c0-70.4 57.6-128 128-128h640c70.4 0 128 57.6 128 128v392c0 70.4-57.6 128-128 128z"
        fill={getIconColor(color, 0, '#E1E1DF')}
      />
      <path
        d="M800 745.6H160c-70.4 0-128-57.6-128-128V225.6c0-70.4 57.6-128 128-128h640c70.4 0 128 57.6 128 128v392c0 70.4-57.6 128-128 128z"
        fill={getIconColor(color, 1, '#4E8DF6')}
      />
      <path
        d="M260.8 361.6c22.4 67.2 83.2 67.2 105.6 0 8-6.4 14.4-14.4 16-24 1.6-9.6 0-22.4-9.6-22.4-1.6-33.6-27.2-59.2-60.8-57.6-32 0-56 27.2-57.6 57.6-9.6 0-11.2 12.8-9.6 22.4 1.6 9.6 8 17.6 16 24z"
        fill={getIconColor(color, 2, '#FFFFFF')}
      />
      <path
        d="M401.6 726.4c25.6 0 46.4-20.8 46.4-46.4v-1.6L627.2 496c4.8-4.8 4.8-12.8 0-17.6-4.8-4.8-12.8-4.8-17.6 0L448 641.6v-155.2c0-33.6-25.6-64-57.6-70.4l-24-4.8c-14.4 28.8-49.6 40-76.8 25.6-11.2-6.4-20.8-14.4-25.6-25.6l-27.2 4.8c-33.6 6.4-57.6 35.2-57.6 70.4v192c0 25.6 20.8 46.4 46.4 46.4 0 12.8 9.6 24 22.4 24h131.2c12.8 0 22.4-9.6 22.4-22.4z"
        fill={getIconColor(color, 3, '#FFFFFF')}
      />
      <path
        d="M212.8 795.2h-96C68.8 795.2 32 832 32 880v112h264v-112c0-48-38.4-84.8-83.2-84.8zM516.8 795.2h-96c-46.4 0-83.2 38.4-83.2 84.8v112h264v-112c-1.6-48-38.4-84.8-84.8-84.8zM820.8 795.2h-96c-46.4 0-83.2 38.4-83.2 84.8v112h264v-112c-1.6-48-38.4-84.8-84.8-84.8z"
        fill={getIconColor(color, 4, '#2166CC')}
      />
    </svg>
  );
};

IconPeixun.defaultProps = {
  size: 18,
};

export default IconPeixun;
