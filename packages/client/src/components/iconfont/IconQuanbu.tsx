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

const IconQuanbu: FunctionComponent<Props> = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M362.666667 234.666667A64 64 0 0 1 426.666667 298.666667v85.333333a64 64 0 0 1-64 64H256A64 64 0 0 1 192 384V298.666667A64 64 0 0 1 256 234.666667h106.666667zM256 170.666667a128 128 0 0 0-128 128v85.333333a128 128 0 0 0 128 128h106.666667a128 128 0 0 0 128-128V298.666667a128 128 0 0 0-128-128H256zM362.666667 618.666667A64 64 0 0 1 426.666667 682.666667v85.333333a64 64 0 0 1-64 64H256A64 64 0 0 1 192 768v-85.333333A64 64 0 0 1 256 618.666667h106.666667zM256 554.666667a128 128 0 0 0-128 128v85.333333a128 128 0 0 0 128 128h106.666667a128 128 0 0 0 128-128v-85.333333a128 128 0 0 0-128-128H256zM768 234.666667A64 64 0 0 1 832 298.666667v85.333333a64 64 0 0 1-64 64h-106.666667A64 64 0 0 1 597.333333 384V298.666667a64 64 0 0 1 64-64H768zM661.333333 170.666667a128 128 0 0 0-128 128v85.333333a128 128 0 0 0 128 128H768a128 128 0 0 0 128-128V298.666667a128 128 0 0 0-128-128h-106.666667zM640 725.333333a32 32 0 0 1 32-32h149.333333a32 32 0 0 1 0 64h-149.333333A32 32 0 0 1 640 725.333333zM554.666667 608a32 32 0 0 1 32-32h234.666666a32 32 0 0 1 0 64h-234.666666a32 32 0 0 1-32-32zM554.666667 842.666667a32 32 0 0 1 32-32h234.666666a32 32 0 0 1 0 64h-234.666666a32 32 0 0 1-32-32z"
        fill={getIconColor(color, 0, '#222222')}
      />
    </svg>
  );
};

IconQuanbu.defaultProps = {
  size: 18,
};

export default IconQuanbu;
