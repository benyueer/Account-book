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

const IconYaopin: FunctionComponent<Props> = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M354 554v-90c0-16.6 13.4-30 30-30s30 13.4 30 30v90h90c16.6 0 30 13.4 30 30s-13.4 30-30 30h-90v90c0 16.6-13.4 30-30 30s-30-13.4-30-30v-90h-90c-16.6 0-30-13.4-30-30s13.4-30 30-30h90z"
        fill={getIconColor(color, 0, '#FF098F')}
      />
      <path
        d="M239 94h290c44.2 0 80 35.8 80 80v40c0 22.1-17.9 40-40 40H199c-22.1 0-40-17.9-40-40v-40c0-44.2 35.8-80 80-80z m591 376v-22.5c0-16.5-8-27.5-23-27.5h-28c-13.8 0-25 11.2-25 25s11.2 25 25 25h51z m0 400V572c0-21.3-4.6-42-23-42h-13c-22.1 0-40 17.9-40 40v300h76zM344 344c-33.1 0-60 26.9-60 60v466h280c22.1 0 40-17.9 40-40V639c0-16.6 13.4-30 30-30s30 13.4 30 30v191c0 14.2-3 27.8-8.3 40H694V570c0-25 9.2-47.9 24.4-65.4-15.1-15.4-24.4-36.4-24.4-59.6 0-46.9 38.1-85 85-85h56c46.9 0 85 38.1 85 85 0 23.2-9.3 44.2-24.4 59.6C910.8 522.1 920 545 920 570v322c0 21-17 38-38 38H204c-55.2 0-100-44.8-100-100V414c0-71.8 58.2-130 130-130h300c71.8 0 130 58.2 130 130v115c0 16.6-13.4 30-30 30s-30-13.4-30-30V414c0-38.7-31.3-70-70-70H344z m55-190c-26.1 0-48.3 16.7-56.6 40H549v-20c0-11-9-20-20-20H399z"
        fill={getIconColor(color, 1, '#2D97FF')}
      />
      <path
        d="M830 771.7v56.6c-3.1 1.1-6.5 1.7-10 1.7h-76c-16.6 0-30-13.4-30-30s13.4-30 30-30h76c3.5 0 6.9 0.6 10 1.7z m0-100v56.6c-3.1 1.1-6.5 1.7-10 1.7h-76c-16.6 0-30-13.4-30-30s13.4-30 30-30h76c3.5 0 6.9 0.6 10 1.7z m0-100v56.6c-3.1 1.1-6.5 1.7-10 1.7h-76c-16.6 0-30-13.4-30-30s13.4-30 30-30h76c3.5 0 6.9 0.6 10 1.7z"
        fill={getIconColor(color, 2, '#FF098F')}
      />
    </svg>
  );
};

IconYaopin.defaultProps = {
  size: 18,
};

export default IconYaopin;
