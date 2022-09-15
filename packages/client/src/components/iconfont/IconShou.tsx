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

const IconShou: FunctionComponent<Props> = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M341.333333 192A64 64 0 0 1 405.333333 256v85.333333A64 64 0 0 1 341.333333 405.333333H256A64 64 0 0 1 192 341.333333V256A64 64 0 0 1 256 192h85.333333zM256 128a128 128 0 0 0-128 128v85.333333a128 128 0 0 0 128 128h85.333333a128 128 0 0 0 128-128V256a128 128 0 0 0-128-128H256zM341.333333 618.666667A64 64 0 0 1 405.333333 682.666667v85.333333A64 64 0 0 1 341.333333 832H256A64 64 0 0 1 192 768v-85.333333A64 64 0 0 1 256 618.666667h85.333333zM256 554.666667a128 128 0 0 0-128 128v85.333333a128 128 0 0 0 128 128h85.333333a128 128 0 0 0 128-128v-85.333333a128 128 0 0 0-128-128H256zM768 192A64 64 0 0 1 832 256v85.333333A64 64 0 0 1 768 405.333333h-85.333333A64 64 0 0 1 618.666667 341.333333V256A64 64 0 0 1 682.666667 192h85.333333zM682.666667 128a128 128 0 0 0-128 128v85.333333a128 128 0 0 0 128 128h85.333333a128 128 0 0 0 128-128V256a128 128 0 0 0-128-128h-85.333333zM768 618.666667a64 64 0 0 1 64 64v85.333333a64 64 0 0 1-64 64h-85.333333a64 64 0 0 1-64-64v-85.333333a64 64 0 0 1 64-64h85.333333zM682.666667 554.666667a128 128 0 0 0-128 128v85.333333a128 128 0 0 0 128 128h85.333333a128 128 0 0 0 128-128v-85.333333a128 128 0 0 0-128-128h-85.333333z"
        fill={getIconColor(color, 0, '#222222')}
      />
    </svg>
  );
};

IconShou.defaultProps = {
  size: 18,
};

export default IconShou;
