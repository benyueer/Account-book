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

const IconZhiliao: FunctionComponent<Props> = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M810.666667 234.666667H213.333333A149.333333 149.333333 0 0 0 64 384v384A149.333333 149.333333 0 0 0 213.333333 917.333333h597.333334a149.333333 149.333333 0 0 0 149.333333-149.333333V384A149.333333 149.333333 0 0 0 810.666667 234.666667zM810.666667 298.666667a85.333333 85.333333 0 0 1 85.333333 85.333333v384a85.333333 85.333333 0 0 1-85.333333 85.333333H213.333333a85.333333 85.333333 0 0 1-85.333333-85.333333V384a85.333333 85.333333 0 0 1 85.333333-85.333333h597.333334z"
        fill={getIconColor(color, 0, '#333333')}
      />
      <path
        d="M618.666667 42.666667h-213.333334A106.666667 106.666667 0 0 0 298.666667 149.333333V298.666667h426.666666V149.333333A106.666667 106.666667 0 0 0 618.666667 42.666667z m0 64a42.666667 42.666667 0 0 1 42.666666 42.666666v85.333334h-298.666666v-85.333334a42.666667 42.666667 0 0 1 42.666666-42.666666h213.333334z"
        fill={getIconColor(color, 1, '#333333')}
      />
      <path
        d="M341.333333 554.666667m32 0l277.333334 0q32 0 32 32l0 0q0 32-32 32l-277.333334 0q-32 0-32-32l0 0q0-32 32-32Z"
        fill={getIconColor(color, 2, '#FE6058')}
      />
      <path
        d="M544 416m0 32l0 277.333333q0 32-32 32l0 0q-32 0-32-32l0-277.333333q0-32 32-32l0 0q32 0 32 32Z"
        fill={getIconColor(color, 3, '#FE6058')}
      />
    </svg>
  );
};

IconZhiliao.defaultProps = {
  size: 18,
};

export default IconZhiliao;
