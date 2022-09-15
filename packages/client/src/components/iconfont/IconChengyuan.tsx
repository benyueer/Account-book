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

const IconChengyuan: FunctionComponent<Props> = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M660.48 531.968c76.8-49.152 127.488-135.168 127.488-232.448 0-152.576-124.416-276.48-278.016-276.48s-278.016 123.904-278.016 276.48c0 97.28 50.688 182.784 127.488 232.448-183.808 62.976-316.416 238.08-316.416 443.392 0 20.992 17.408 38.4 38.4 38.4s38.4-17.408 38.4-38.4c0-216.064 175.104-391.68 390.144-391.68s390.144 175.616 390.144 391.68c0 20.992 17.408 38.4 38.4 38.4s38.4-17.408 38.4-38.4c0-205.312-132.608-380.416-316.416-443.392zM309.248 299.52c0-110.08 90.112-199.68 201.216-199.68 111.104 0 201.216 89.6 201.216 199.68s-90.112 199.68-201.216 199.68c-111.104 0-201.216-89.6-201.216-199.68z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </svg>
  );
};

IconChengyuan.defaultProps = {
  size: 18,
};

export default IconChengyuan;
