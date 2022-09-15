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

const IconShangyiqu: FunctionComponent<Props> = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M512.2048 509.696m-432.3328 0a432.3328 432.3328 0 1 0 864.6656 0 432.3328 432.3328 0 1 0-864.6656 0Z"
        fill={getIconColor(color, 0, '#37F7AD')}
      />
      <path
        d="M287.232 415.5904c-85.0432 0-160.4096 41.3696-207.104 105.0624 4.5568 182.7328 122.368 337.3056 285.952 396.032 103.2192-33.28 177.92-130.048 177.92-244.3776 0-141.7728-114.944-256.7168-256.768-256.7168z"
        fill={getIconColor(color, 1, '#83FFCF')}
      />
      <path
        d="M478.72 335.0016L269.1584 455.9872c-41.3696 23.8592-41.3696 83.6096 0 107.4688l209.5616 120.9856c41.3696 23.8592 93.0816-5.9904 93.0816-53.76V388.7104c0-47.7184-51.712-77.6192-93.0816-53.7088z"
        fill={getIconColor(color, 2, '#FFFFFF')}
      />
      <path
        d="M683.8784 692.8384c-21.4528 0-38.8096-17.3568-38.8096-38.8096V365.4144c0-21.4528 17.3568-38.8096 38.8096-38.8096 21.4528 0 38.8096 17.3568 38.8096 38.8096v288.6656c0 21.4016-17.3568 38.7584-38.8096 38.7584z"
        fill={getIconColor(color, 3, '#C5FFEE')}
      />
    </svg>
  );
};

IconShangyiqu.defaultProps = {
  size: 18,
};

export default IconShangyiqu;
