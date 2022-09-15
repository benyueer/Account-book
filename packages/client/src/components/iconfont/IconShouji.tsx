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

const IconShouji: FunctionComponent<Props> = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M453.485714 336.457143m-336.457143 0a336.457143 336.457143 0 1 0 672.914286 0 336.457143 336.457143 0 1 0-672.914286 0Z"
        fill={getIconColor(color, 0, '#8CF6FB')}
      />
      <path
        d="M819.2 1024H204.8c-48.274286 0-87.771429-39.497143-87.771429-87.771429V87.771429c0-48.274286 39.497143-87.771429 87.771429-87.771429h614.4c48.274286 0 87.771429 39.497143 87.771429 87.771429v848.457142c0 48.274286-39.497143 87.771429-87.771429 87.771429z m14.628571-936.228571c0-8.777143-5.851429-14.628571-14.628571-14.628572H204.8c-8.777143 0-14.628571 5.851429-14.628571 14.628572v599.771428h643.657142V87.771429z m0 672.914285H190.171429v175.542857c0 8.777143 5.851429 14.628571 14.628571 14.628572h614.4c8.777143 0 14.628571-5.851429 14.628571-14.628572V760.685714z"
        fill={getIconColor(color, 1, '#3C2DCB')}
      />
      <path
        d="M512 848.457143m-58.514286 0a58.514286 58.514286 0 1 0 117.028572 0 58.514286 58.514286 0 1 0-117.028572 0Z"
        fill={getIconColor(color, 2, '#D098FF')}
      />
    </svg>
  );
};

IconShouji.defaultProps = {
  size: 18,
};

export default IconShouji;
