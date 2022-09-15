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

const IconQita: FunctionComponent<Props> = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M512.292571 76.141714a435.785143 435.785143 0 0 1 308.150858 743.862857 435.785143 435.785143 0 1 1-616.228572-616.228571 432.859429 432.859429 0 0 1 308.077714-127.634286m0-75.337143a511.122286 511.122286 0 1 0 0.073143 1022.244572 511.122286 511.122286 0 0 0 0-1022.244572z"
        fill={getIconColor(color, 0, '#353535')}
      />
      <path
        d="M512.292571 447.341714a64.512 64.512 0 1 0 0 129.097143 64.512 64.512 0 0 0 0-129.097143z m-226.011428 0a64.512 64.512 0 1 0 0 129.097143 64.512 64.512 0 0 0 0-129.097143z m452.022857 0a64.512 64.512 0 1 0-0.073143 129.097143 64.512 64.512 0 0 0 0-129.097143z"
        fill={getIconColor(color, 1, '#353535')}
      />
    </svg>
  );
};

IconQita.defaultProps = {
  size: 18,
};

export default IconQita;
