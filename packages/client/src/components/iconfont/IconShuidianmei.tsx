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

const IconShuidianmei: FunctionComponent<Props> = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M512 512m-480 0a480 480 0 1 0 960 0 480 480 0 1 0-960 0Z"
        fill={getIconColor(color, 0, '#DEFCF9')}
      />
      <path
        d="M691.2 441.6L512 179.2c-6.4-6.4-19.2-6.4-25.6 0l-179.2 256c-102.4 147.2-6.4 364.8 172.8 371.2h38.4c179.2-6.4 275.2-217.6 172.8-364.8z"
        fill={getIconColor(color, 1, '#18DFB7')}
      />
      <path
        d="M608 524.8l-128 160c-6.4 6.4-12.8 0-12.8-6.4l12.8-83.2c0-6.4 0-6.4-6.4-6.4H377.6c-6.4-6.4-6.4-12.8 0-12.8L512 409.6c6.4-6.4 12.8 0 12.8 6.4l-25.6 89.6c0 6.4 6.4 6.4 12.8 6.4h96c6.4 0 6.4 6.4 0 12.8z"
        fill={getIconColor(color, 2, '#FFFFFF')}
      />
    </svg>
  );
};

IconShuidianmei.defaultProps = {
  size: 18,
};

export default IconShuidianmei;
