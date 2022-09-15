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

const IconWangfeimanyou: FunctionComponent<Props> = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M594.304 557.9776a23.4496 23.4496 0 0 0-16.7936 7.8848 88.064 88.064 0 0 1-142.7456-16.3328 19.1232 19.1232 0 0 0 3.0976-4.48 20.0448 20.0448 0 0 0-1.7152-21.0176l-21.504-29.312a20.1472 20.1472 0 0 0-32.512 0l-21.504 29.312a20.1472 20.1472 0 0 0 16.256 32.0768h8.0384a138.0352 138.0352 0 0 0 127.0528 87.04 135.68 135.68 0 0 0 100.3008-44.8512 23.9104 23.9104 0 0 0-0.6656-33.28 23.3984 23.3984 0 0 0-17.3056-7.04z"
        fill={getIconColor(color, 0, '#10C55B')}
      />
      <path
        d="M647.0656 450.8928h-7.424a137.3952 137.3952 0 0 0-127.1808-87.6032 135.2704 135.2704 0 0 0-100.1472 43.7504 24.2432 24.2432 0 0 0 0.9216 33.28l0.256 0.256a23.6544 23.6544 0 0 0 33.6896-1.1008 87.808 87.808 0 0 1 64.7168-28.5696 89.6 89.6 0 0 1 77.6192 46.08 20.0704 20.0704 0 0 0-1.7664 25.8816l21.504 29.312a20.1216 20.1216 0 0 0 32.4864 0l21.504-29.312a20.1728 20.1728 0 0 0-16.256-32.0768z"
        fill={getIconColor(color, 1, '#10C55B')}
      />
      <path
        d="M512 0a512 512 0 1 0 512 512A512 512 0 0 0 512 0z m187.2128 717.312H351.744a178.8928 178.8928 0 0 1-31.0272-355.84 218.8544 218.8544 0 0 1 191.0272-105.984 230.2464 230.2464 0 0 1 143.7696 50.0224 219.904 219.904 0 0 1 73.088 108.032 158.8992 158.8992 0 0 1 84.6336 46.4896 150.5792 150.5792 0 0 1 42.8032 104.192 153.3184 153.3184 0 0 1-156.8256 153.088z"
        fill={getIconColor(color, 2, '#10C55B')}
      />
    </svg>
  );
};

IconWangfeimanyou.defaultProps = {
  size: 18,
};

export default IconWangfeimanyou;
