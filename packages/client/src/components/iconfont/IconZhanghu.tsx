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

const IconZhanghu: FunctionComponent<Props> = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M875.794647 185.954981H144.395476c-44.758123 0-81.169533 36.41141-81.169533 81.169533V781.048395c0 44.758123 36.41141 81.169533 81.169533 81.169533h731.399171c44.758123 0 81.169533-36.41141 81.169533-81.169533V267.124514c0-44.758123-36.41141-81.169533-81.169533-81.169533zM119.084007 392.178796h782.021085v124.604796H119.084007V392.178796z m782.022109 388.869599c0 13.950438-11.346697 25.310445-25.310445 25.310445H144.395476c-13.964772 0-25.311469-11.360008-25.311469-25.310445V572.641656h782.021085v208.406739zM119.084007 336.319708V267.124514c0-13.951461 11.346697-25.311469 25.311469-25.311469h731.399171c13.964772 0 25.310445 11.360008 25.310445 25.311469v69.196218H119.084007z"
        fill={getIconColor(color, 0, '#3E3A39')}
      />
      <path
        d="M196.489737 721.576015h285.075272c15.437119 0 27.929544-12.505735 27.929544-27.929543 0-15.423809-12.491401-27.929544-27.929544-27.929544H196.489737c-15.437119 0-27.929544 12.505735-27.929544 27.929544 0.001024 15.423809 12.492425 27.929544 27.929544 27.929543z"
        fill={getIconColor(color, 1, '#3E3A39')}
      />
    </svg>
  );
};

IconZhanghu.defaultProps = {
  size: 18,
};

export default IconZhanghu;
