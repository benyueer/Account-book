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

const IconShangjia1: FunctionComponent<Props> = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M915.07007 224H109.07007c-24.3 0-44-19.7-44-44V77c0-24.3 19.7-44 44-44h806c24.3 0 44 19.7 44 44v103c0 24.2-19.7 44-44 44z m-786-64h766V97H129.07007v63z"
        fill={getIconColor(color, 0, '#333333')}
      />
      <path
        d="M980.07007 462.9v-44.8l-19.1 5.5-57.4-199.2H119.77007l-56.5 199-19.2-5.3V463c-13.5 0-26.1-6.2-34.5-17-8.6-11.1-11.6-25.3-8.2-39l0.2-0.9 69.7-245.6h880.3l71 246.5c3.5 13.7 0.5 27.9-8.2 39-8.2 10.7-20.8 16.9-34.3 16.9z m0-64c-6.3 0-12.2 2.9-16 7.7-3.6 4.6-4.8 10.4-3.4 16l19.4-4.9v-18.8zM44.07007 417.7l19.4 4.9c1.4-5.6 0.2-11.4-3.4-16-3.8-4.8-9.7-7.7-16-7.7v18.8z"
        fill={getIconColor(color, 1, '#333333')}
      />
      <path
        d="M152.47007 598.3c-41.1 0-79.6-16.1-108.5-45.3C15.57007 524.3 0.07007 486.3 0.57007 446.1c0-4.2-0.1-8.3-0.2-13-0.1-4.5-0.3-9.7-0.3-15.5 0-17.7 14.3-32 32-32s32 14.3 32 32c0 4.9 0.1 9.4 0.3 13.7 0.1 5 0.3 10.1 0.2 15.6-0.3 23 8.6 44.8 25 61.3 16.8 17 39.1 26.3 63 26.3 48.5 0 87.9-39.4 87.9-87.9 0-17.7 14.3-32 32-32s32 14.3 32 32c-0.1 83.6-68.3 151.7-152 151.7z"
        fill={getIconColor(color, 2, '#333333')}
      />
      <path
        d="M392.37007 598.3c-41.1 0-79.6-16.1-108.5-45.3-28.5-28.8-43.9-66.8-43.4-107 0.2-17.7 14.7-31.8 32.3-31.6 17.7 0.2 31.8 14.7 31.6 32.3-0.3 23 8.6 44.8 25 61.3 16.8 17 39.1 26.3 63 26.3 48.5 0 87.9-39.4 87.9-87.9 0-17.7 14.3-32 32-32s32 14.3 32 32c0 83.8-68.2 151.9-151.9 151.9z"
        fill={getIconColor(color, 3, '#333333')}
      />
      <path
        d="M631.37007 598.3c-41.1 0-79.6-16.1-108.5-45.3-28.5-28.8-43.9-66.8-43.4-107 0.2-17.5 14.5-31.6 32-31.6h0.4c17.7 0.2 31.8 14.7 31.6 32.3-0.3 23 8.6 44.8 25 61.3 16.8 17 39.1 26.3 63 26.3 48.5 0 87.9-39.4 87.9-87.9 0-17.7 14.3-32 32-32s32 14.3 32 32c-0.1 83.8-68.3 151.9-152 151.9z"
        fill={getIconColor(color, 4, '#333333')}
      />
      <path
        d="M871.67007 598.3c-83.8 0-151.9-68.1-151.9-151.9 0-17.7 14.3-32 32-32s32 14.3 32 32c0 48.5 39.4 87.9 87.9 87.9 23.9 0 46.2-9.3 63-26.3 16.3-16.5 25.2-38.3 25-61.3-0.1-5.5 0.1-10.6 0.2-15.6 0.1-4.3 0.3-8.8 0.3-13.7 0-17.7 14.3-32 32-32s32 14.3 32 32c0 5.9-0.1 11-0.3 15.6-0.1 4.7-0.3 8.8-0.2 13 0.4 40.2-15 78.2-43.4 107-29 29.3-67.5 45.3-108.6 45.3zM898.07007 992.2H126.07007c-34.2 0-62-27.8-62-62V558.1c0-17.7 14.3-32 32-32s32 14.3 32 32v370.1h768V649.1c0-17.7 14.3-32 32-32s32 14.3 32 32v281.1c0 34.1-27.8 62-62 62z"
        fill={getIconColor(color, 5, '#333333')}
      />
    </svg>
  );
};

IconShangjia1.defaultProps = {
  size: 18,
};

export default IconShangjia1;