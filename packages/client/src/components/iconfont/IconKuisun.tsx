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

const IconKuisun: FunctionComponent<Props> = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M286.4128 147.2l-3.2768 0.1536A32 32 0 0 0 254.4128 179.2l-0.0256 349.8752H191.2832c-29.44 0-43.264 36.4544-21.1968 55.9872l320.7168 283.6992a32 32 0 0 0 42.3936 0l320.7168-283.6992 2.2272-2.1504c18.8416-19.9168 4.992-53.8112-23.424-53.8112l-63.1552-0.0256L769.5872 179.2c0-17.664-14.336-32-32-32H286.4128z m419.1744 64v349.8752l0.1536 3.2768a32 32 0 0 0 31.8208 28.7232l10.7008-0.0256L512 802.048l-236.288-208.9984 10.6752 0.0256 3.2768-0.1536a32 32 0 0 0 28.7232-31.8464V211.2h387.2z"
        fill={getIconColor(color, 0, '#333333')}
      />
      <path
        d="M396.3904 401.8688m32 0l167.2192 0q32 0 32 32l0 0q0 32-32 32l-167.2192 0q-32 0-32-32l0 0q0-32 32-32Z"
        fill={getIconColor(color, 1, '#333333')}
      />
      <path
        d="M396.3904 492.0832m32 0l167.2192 0q32 0 32 32l0 0q0 32-32 32l-167.2192 0q-32 0-32-32l0 0q0-32 32-32Z"
        fill={getIconColor(color, 2, '#333333')}
      />
      <path
        d="M544 408.4736m0 32l0 167.2192q0 32-32 32l0 0q-32 0-32-32l0-167.2192q0-32 32-32l0 0q32 0 32 32Z"
        fill={getIconColor(color, 3, '#333333')}
      />
      <path
        d="M436.693042 283.815808m22.627417 22.627417l72.226716 72.226716q22.627417 22.627417 0 45.254834l0 0q-22.627417 22.627417-45.254834 0l-72.226716-72.226716q-22.627417-22.627417 0-45.254834l0 0q22.627417-22.627417 45.254834 0Z"
        fill={getIconColor(color, 4, '#333333')}
      />
      <path
        d="M629.57409 328.704744m-22.627417 22.627417l-72.226715 72.226715q-22.627417 22.627417-45.254834 0l0 0q-22.627417-22.627417 0-45.254834l72.226715-72.226715q22.627417-22.627417 45.254834 0l0 0q22.627417 22.627417 0 45.254834Z"
        fill={getIconColor(color, 5, '#333333')}
      />
    </svg>
  );
};

IconKuisun.defaultProps = {
  size: 18,
};

export default IconKuisun;
