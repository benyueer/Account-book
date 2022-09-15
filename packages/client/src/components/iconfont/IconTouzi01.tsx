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

const IconTouzi01: FunctionComponent<Props> = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M654.336 675.84s-26.624 31.744-65.536 0c-39.936-31.744-175.104-183.296-175.104-183.296s-31.744-38.912-68.608 0-149.504 204.8-149.504 204.8-34.816 60.416-86.016 0c-44.032-51.2-81.92-29.696-91.136-22.528V901.12c0 38.912 31.744 69.632 69.632 69.632h841.728c38.912 0 69.632-31.744 69.632-69.632V283.648c-3.072 0-5.12 2.048-8.192 3.072L654.336 675.84z"
        fill={getIconColor(color, 0, '#FE765F')}
      />
      <path
        d="M141.312 590.848c45.056 0 81.92-36.864 81.92-81.92 0-11.264-2.048-22.528-7.168-32.768l143.36-177.152c8.192 3.072 16.384 4.096 25.6 4.096 12.288 0 23.552-3.072 33.792-8.192l125.952 125.952c-3.072 8.192-4.096 16.384-4.096 25.6 0 45.056 36.864 81.92 81.92 81.92s81.92-36.864 81.92-81.92c0-10.24-2.048-19.456-5.12-28.672l195.584-228.352c8.192 2.048 16.384 4.096 24.576 4.096 45.056 0 81.92-36.864 81.92-81.92s-36.864-81.92-81.92-81.92-81.92 36.864-81.92 81.92c0 10.24 2.048 20.48 6.144 29.696L649.216 368.64c-8.192-3.072-16.384-4.096-25.6-4.096-10.24 0-19.456 2.048-28.672 5.12L463.872 241.664c2.048-6.144 3.072-13.312 3.072-19.456 0-45.056-36.864-81.92-81.92-81.92s-81.92 36.864-81.92 81.92c0 10.24 2.048 19.456 5.12 28.672L162.816 430.08c-7.168-2.048-14.336-3.072-21.504-3.072-45.056 0-81.92 36.864-81.92 81.92s35.84 81.92 81.92 81.92z"
        fill={getIconColor(color, 1, '#F4C9A8')}
      />
    </svg>
  );
};

IconTouzi01.defaultProps = {
  size: 18,
};

export default IconTouzi01;
