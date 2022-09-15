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

const IconQianbi: FunctionComponent<Props> = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M512 938.666667C277.333333 938.666667 85.333333 746.666667 85.333333 512S277.333333 85.333333 512 85.333333s426.666667 192 426.666667 426.666667-192 426.666667-426.666667 426.666667z m0-797.866667c-204.8 0-371.2 166.4-371.2 371.2 0 204.8 166.4 371.2 371.2 371.2 204.8 0 371.2-166.4 371.2-371.2 0-204.8-166.4-371.2-371.2-371.2z"
        fill={getIconColor(color, 0, '#6A3906')}
      />
      <path
        d="M512 512m-311.466667 0a311.466667 311.466667 0 1 0 622.933334 0 311.466667 311.466667 0 1 0-622.933334 0Z"
        fill={getIconColor(color, 1, '#F5CB2B')}
      />
      <path
        d="M512 695.466667L328.533333 512 512 328.533333l183.466667 183.466667-183.466667 183.466667zM405.333333 512l106.666667 106.666667 106.666667-106.666667L512 405.333333 405.333333 512z"
        fill={getIconColor(color, 2, '#6A3906')}
      />
    </svg>
  );
};

IconQianbi.defaultProps = {
  size: 18,
};

export default IconQianbi;
