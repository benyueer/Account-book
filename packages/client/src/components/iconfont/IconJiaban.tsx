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

const IconJiaban: FunctionComponent<Props> = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M507.6992 510.1056m-437.248 0a437.248 437.248 0 1 0 874.496 0 437.248 437.248 0 1 0-874.496 0Z"
        fill={getIconColor(color, 0, '#80B7F9')}
      />
      <path
        d="M751.2576 747.264m-202.2912 0a202.2912 202.2912 0 1 0 404.5824 0 202.2912 202.2912 0 1 0-404.5824 0Z"
        fill={getIconColor(color, 1, '#80B7F9')}
      />
      <path
        d="M924.4672 642.7136c-35.4304-58.5728-99.7376-97.7408-173.2096-97.7408-111.7184 0-202.2912 90.5728-202.2912 202.2912 0 75.3664 41.216 141.0048 102.3488 175.8208 129.5872-45.056 231.424-149.248 273.152-280.3712z"
        fill={getIconColor(color, 2, '#3E8BF8')}
      />
      <path
        d="M514.6624 585.9328H266.2912c-22.6304 0-40.96-18.3296-40.96-40.96s18.3296-40.96 40.96-40.96h207.4112v-197.12c0-22.6304 18.3296-40.96 40.96-40.96s40.96 18.3296 40.96 40.96v238.08c0 22.6304-18.3296 40.96-40.96 40.96zM852.992 708.5568h-56.7296V651.776c0-22.6304-18.3296-40.96-40.96-40.96s-40.96 18.3296-40.96 40.96v56.7296h-56.7296c-22.6304 0-40.96 18.3296-40.96 40.96s18.3296 40.96 40.96 40.96h56.7296v56.7808c0 22.6304 18.3296 40.96 40.96 40.96s40.96-18.3296 40.96-40.96v-56.7808h56.7296c22.6304 0 40.96-18.3296 40.96-40.96s-18.3296-40.9088-40.96-40.9088z"
        fill={getIconColor(color, 3, '#FFFFFF')}
      />
    </svg>
  );
};

IconJiaban.defaultProps = {
  size: 18,
};

export default IconJiaban;
