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

const IconExerciseCycle: FunctionComponent<Props> = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M666.4 571.6l-62 19 66.4-283c2.8-12.2 13.8-21 26.4-21 17.4 0 30.2 16 26.4 33l-57.2 252zM387.2 657.6l-54.6 16.8-26-75.4-48.8-142.8-39.8-114.8h57l35.6 100 50.4 142.4z"
        fill={getIconColor(color, 0, '#E3F3F7')}
      />
      <path
        d="M218 341.4l26.4 76.2H302l-27-76.2z"
        fill={getIconColor(color, 1, '#D1DBC6')}
      />
      <path
        d="M190.4 771.2c0-27.6 15.4-53 39.8-65.8L678.4 568c107.2-34.8 215.2 28.4 215.2 139 0 81.2-65.8 138.4-147 138.4h-482c-41 0-74.2-33.4-74.2-74.2z"
        fill={getIconColor(color, 2, '#E3F3F7')}
      />
      <path
        d="M339 785.8c-11.8 0-23-7.6-26.6-19.6-4.6-14.8 3.6-30.4 18.4-35l358.2-111.4c18.6-5.8 37.2-8.2 55.2-7 43 2.8 75.8 27.2 90.4 67.2 5.2 14.4-2.2 30.4-16.6 35.8-14.4 5.2-30.4-2.2-35.8-16.6-7-19.2-20.6-29.2-41.6-30.6-11.2-0.8-23 0.8-35 4.6l-358.2 111.4c-2.8 0.8-5.6 1.2-8.4 1.2z"
        fill={getIconColor(color, 3, '#D1DBC6')}
      />
      <path
        d="M746.4 790.4H265.6c-5.8 0-11.4-2.4-15.2-6.6-3.6-4-5.4-9-5-14.2v-0.6c0.6-6.8 5.6-12.6 12.6-14.8 42.6-13 437.4-134.2 437.4-134.2 14-4.6 28.2-6.8 42.4-6.8 48.6 0 101 29.2 101 93.6-0.2 55-46.6 83.6-92.4 83.6z m-8.6-160.4c-12.4 0-24.8 2-37.2 6-0.2 0-394.8 121.2-437.4 134.2-0.6 0.2-1 0.6-1 0.6 0 0.6 0.4 1.2 0.6 1.4 0.8 0.8 1.8 1.4 3 1.4h480.8c37.4 0 75.4-23 75.4-66.8 0-52.8-43.8-76.8-84.2-76.8z"
        fill={getIconColor(color, 4, '#434244')}
      />
      <path
        d="M175.4 863.4m-54.6 0a54.6 54.6 0 1 0 109.2 0 54.6 54.6 0 1 0-109.2 0Z"
        fill={getIconColor(color, 5, '#6A6B6D')}
      />
      <path
        d="M175.4 926.2c-34.6 0-62.8-28.2-62.8-62.8s28.2-62.8 62.8-62.8 62.8 28.2 62.8 62.8-28.2 62.8-62.8 62.8z m0-109c-25.4 0-46.2 20.6-46.2 46.2 0 25.4 20.6 46.2 46.2 46.2s46.2-20.6 46.2-46.2c-0.2-25.4-20.8-46.2-46.2-46.2z"
        fill={getIconColor(color, 6, '#434244')}
      />
      <path
        d="M866.4 863.4m-54.6 0a54.6 54.6 0 1 0 109.2 0 54.6 54.6 0 1 0-109.2 0Z"
        fill={getIconColor(color, 7, '#6A6B6D')}
      />
      <path
        d="M866.4 926.2c-34.6 0-62.8-28.2-62.8-62.8s28.2-62.8 62.8-62.8c34.6 0 62.8 28.2 62.8 62.8s-28.2 62.8-62.8 62.8z m0-109c-25.4 0-46.2 20.6-46.2 46.2 0 25.4 20.6 46.2 46.2 46.2 25.4 0 46.2-20.6 46.2-46.2-0.2-25.4-20.8-46.2-46.2-46.2z"
        fill={getIconColor(color, 8, '#434244')}
      />
      <path
        d="M746.4 853.6H264.6c-45.6 0-82.6-37-82.6-82.6 0-30.8 17-58.8 44.4-73.2l1.4-0.6L676 560c20.2-6.6 41.2-10 61.8-10 93.6 0 164.2 67.4 164.2 156.8 0 83.8-67 146.8-155.6 146.8z m-513-140.4c-21.4 11.4-34.6 33.6-34.6 58 0 36.4 29.6 65.8 65.8 65.8h481.8c79 0 138.6-56 138.6-130 0-81.2-62-140.2-147.4-140.2-19 0-38 3-56.8 9.2l-447.4 137.2z"
        fill={getIconColor(color, 9, '#434244')}
      />
      <path
        d="M593 602.8l69.6-297.2c3.8-16.2 18-27.4 34.6-27.4 10.8 0 21 4.8 27.6 13.4 6.8 8.4 9.2 19.4 6.8 30l-58.2 256.6-80.4 24.6z m104.2-307.8c-8.8 0-16.2 6-18.2 14.4L616 578.4l43.4-13.4 56-247.2c1.2-5.6 0-11.4-3.6-15.8s-9-7-14.6-7z"
        fill={getIconColor(color, 10, '#434244')}
      />
      <path
        d="M387.2 657.6l-54.6 16.8L218 345.2h57.8z"
        fill={getIconColor(color, 11, '#57C0EE')}
      />
      <path
        d="M327.2 684.8l-121-351.8h74.6l117.2 330-70.8 21.8z m-97.4-335l108 314.2 38.6-11.8-107.4-302.4h-39.2z"
        fill={getIconColor(color, 12, '#434244')}
      />
      <path
        d="M149.6 265.6h87.4c16.4 0 32.6 3.8 47.4 11 15 7.2 37.6 15.4 63.2 15.4 1.4 0 2.8 0 4.2 0.2 33 2.4 30.2 52.2-2.8 52.2H129.4c-17.2 0-29.8-16.4-25.2-33.2 5.8-21.4 18.6-45.6 45.4-45.6z"
        fill={getIconColor(color, 13, '#6A6B6D')}
      />
      <path
        d="M693 353.8c-7.6 0-15-3.8-19-10.8-6.4-10.6-3-24.2 7.4-30.6l124.4-75.4 44.8-116.6c4.4-11.6 17.4-17.2 28.8-12.8 11.6 4.4 17.2 17.4 12.8 28.8l-47.6 123.8c-1.8 4.6-5 8.6-9.2 11l-130.8 79.4c-3.6 2.2-7.6 3.2-11.6 3.2z"
        fill={getIconColor(color, 14, '#57C0EE')}
      />
      <path
        d="M693 362.2c-10.8 0-20.6-5.6-26.2-14.8-4.2-7-5.6-15.2-3.6-23.2 2-8 6.8-14.6 13.8-19l122-74 43.8-114c4.6-11.8 16-19.6 28.6-19.6 3.8 0 7.4 0.6 11 2 15.8 6 23.6 23.8 17.6 39.6l-47.6 123.8c-2.4 6.4-7 11.8-12.8 15.2l-130.8 79.4c-4.8 3-10.2 4.6-15.8 4.6z m178.4-247.8c-5.8 0-11 3.6-13 9l-45.8 119.2-126.8 77c-3.2 2-5.4 5-6.4 8.6-0.8 3.6-0.4 7.4 1.6 10.6 2.6 4.2 7 6.8 12 6.8 2.6 0 5-0.8 7.2-2l130.8-79.4c2.6-1.6 4.6-4 5.8-7l47.6-123.8c2.8-7.2-0.8-15.2-8-18-1.6-0.6-3.2-1-5-1z"
        fill={getIconColor(color, 15, '#434244')}
      />
      <path
        d="M516.8 616.2h38.2v116.2h-38.2z"
        fill={getIconColor(color, 16, '#D1DBC6')}
      />
      <path
        d="M563.4 741h-54.8V608h54.8v133z m-38.2-16.8h21.4v-99.6h-21.4v99.6z"
        fill={getIconColor(color, 17, '#434244')}
      />
      <path
        d="M485.8 600.4H586V632h-100.2z"
        fill={getIconColor(color, 18, '#D1DBC6')}
      />
      <path
        d="M594.4 640.4h-117v-48.2h117v48.2z m-100.2-16.8h83.4v-14.8h-83.4v14.8z"
        fill={getIconColor(color, 19, '#434244')}
      />
      <path
        d="M536 734m-24 0a24 24 0 1 0 48 0 24 24 0 1 0-48 0Z"
        fill={getIconColor(color, 20, '#D1DBC6')}
      />
      <path
        d="M536 766.4c-17.8 0-32.4-14.4-32.4-32.4 0-17.8 14.4-32.4 32.4-32.4s32.4 14.4 32.4 32.4c-0.2 17.8-14.6 32.4-32.4 32.4z m0-48c-8.6 0-15.6 7-15.6 15.6s7 15.6 15.6 15.6 15.6-7 15.6-15.6-7-15.6-15.6-15.6z"
        fill={getIconColor(color, 21, '#434244')}
      />
      <path
        d="M353 343c-1.4 0-2.8-0.2-4.4-0.4-1.8-0.2-44.6-7-60.8-10.4-13.4-2.8-40.8-14-53.2-19.4H147c-15.4 0-27.8-12.4-27.8-27.8s12.4-27.8 27.8-27.8h93.2c3.8 0 7.6 0.8 11 2.2 17.8 7.6 41.2 16.8 48.2 18.2 14.6 3.2 57.2 9.8 57.6 9.8 15.2 2.4 25.6 16.6 23.2 31.8-1.8 14-13.8 23.8-27.2 23.8z"
        fill={getIconColor(color, 22, '#B1B2B5')}
      />
      <path
        d="M348.8 352.8H129.4c-10.8 0-21-5-27.6-13.6-6.6-8.6-8.8-19.6-5.8-30 11.8-42.8 35.6-51.8 53.6-51.8h87.4c17.4 0 35.2 4 51 11.8 13.8 6.6 35.4 14.6 59.6 14.6 1.6 0 3.2 0 4.8 0.2 21.2 1.6 31.6 18.8 31 35-0.6 16.8-12.6 33.8-34.6 33.8zM149.6 274c-17.6 0-30.2 13.2-37.6 39.4-1.4 5.4-0.4 11 3 15.4s8.6 7 14.2 7h219.6c13.6 0 17.6-11.2 17.8-17.6 0.2-7.6-3.6-17-15.6-17.8-1.2 0-2.4-0.2-3.6-0.2-27.4 0-51.4-8.8-66.8-16.4-13.6-6.6-28.8-10-43.6-10H149.6z"
        fill={getIconColor(color, 23, '#434244')}
      />
    </svg>
  );
};

IconExerciseCycle.defaultProps = {
  size: 18,
};

export default IconExerciseCycle;
