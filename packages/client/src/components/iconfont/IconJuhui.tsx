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

const IconJuhui: FunctionComponent<Props> = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M791.3 290m-113.1 0a113.1 113.1 0 1 0 226.2 0 113.1 113.1 0 1 0-226.2 0Z"
        fill={getIconColor(color, 0, '#E02727')}
      />
      <path
        d="M508.4 252m-143.3 0a143.3 143.3 0 1 0 286.6 0 143.3 143.3 0 1 0-286.6 0Z"
        fill={getIconColor(color, 1, '#282727')}
      />
      <path
        d="M225.7 290m-113.1 0a113.1 113.1 0 1 0 226.2 0 113.1 113.1 0 1 0-226.2 0Z"
        fill={getIconColor(color, 2, '#282727')}
      />
      <path
        d="M795.9 423c-42.3-0.1-82.9 16.2-113.4 45.5 37.7 38.8 58.8 90.7 58.7 144.8v218.5H960V587.1c0-90.6-73.5-164.1-164.1-164.1z"
        fill={getIconColor(color, 3, '#282727')}
      />
      <path
        d="M502.8 420.6h18.9c109.6 0 198.5 88.9 198.5 198.5V900H304.3V619.1c0-109.7 88.9-198.5 198.5-198.5z"
        fill={getIconColor(color, 4, '#282727')}
      />
      <path
        d="M285.3 613.3c-0.1-54 20.9-105.9 58.5-144.6-30.5-29.4-71.2-45.7-113.6-45.7-90.6 0-164.1 73.5-164.1 164.1v244.7h219.2V613.3z"
        fill={getIconColor(color, 5, '#282727')}
      />
    </svg>
  );
};

IconJuhui.defaultProps = {
  size: 18,
};

export default IconJuhui;
