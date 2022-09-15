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

const IconXiangji: FunctionComponent<Props> = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1087 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M20.822266 982.355468h36.438965a20.822266 20.822266 0 1 1 0 41.644532H20.822266a20.822266 20.822266 0 0 1 0-41.644532z m960.427019 0h85.891847a20.822266 20.822266 0 0 1 0 41.644532h-85.891847a20.822266 20.822266 0 0 1 0-41.644532z m-832.89064 0h752.204359a20.822266 20.822266 0 0 1 0 41.644532H148.358645a20.822266 20.822266 0 0 1 0-41.644532z"
        fill={getIconColor(color, 0, '#261D50')}
      />
      <path
        d="M27.329224 67.672364l1034.176883 0 0 747.870726-1034.176883 0 0-747.870726Z"
        fill={getIconColor(color, 1, '#FFFFFF')}
      />
      <path
        d="M169.180911 10.411133h67.672365a28.630616 28.630616 0 0 1 28.630615 28.630616v28.630615h-124.933596V39.041749a28.630616 28.630616 0 0 1 28.630616-28.630616z"
        fill={getIconColor(color, 2, '#FF6660')}
      />
      <path
        d="M72.448472 114.522463l944.810319 0 0 653.298596-944.810319 0 0-653.298596Z"
        fill={getIconColor(color, 3, '#72C69C')}
      />
      <path
        d="M688.00671 441.171761m-212.126835 0a212.126835 212.126835 0 1 0 424.25367 0 212.126835 212.126835 0 1 0-424.25367 0Z"
        fill={getIconColor(color, 4, '#FFFFFF')}
      />
      <path
        d="M889.123772 376.232319L608.257432 638.137383a210.500095 210.500095 0 0 0 33.771112 10.33305l255.072759-237.82932a210.825443 210.825443 0 0 0-7.977531-34.408794zM723.768952 650.136214a212.374099 212.374099 0 0 0 169.285023-157.858804zM573.796581 612.760247l292.396671-272.667574 15.616699 16.774938a212.126835 212.126835 0 1 0-292.448726 272.58949z"
        fill={getIconColor(color, 5, '#FDD838')}
      />
      <path
        d="M127.536379 169.180911l190.003177 0 0 105.412722-190.003177 0 0-105.412722Z"
        fill={getIconColor(color, 6, '#FDD838')}
      />
      <path
        d="M1027.669924 825.08229h-965.632585a46.850098 46.850098 0 0 1-46.850099-46.850098V104.11133a46.850098 46.850098 0 0 1 46.850099-46.850099h643.915562a10.411133 10.411133 0 0 1 0 20.822266H62.037339a26.027832 26.027832 0 0 0-26.027833 26.027833v674.120862a26.027832 26.027832 0 0 0 26.027833 26.027832h965.632585a26.027832 26.027832 0 0 0 26.027833-26.027832V104.11133a26.027832 26.027832 0 0 0-26.027833-26.027833h-77.341704a10.411133 10.411133 0 0 1 0-20.822266h77.341704a46.850098 46.850098 0 0 1 46.850099 46.850099v674.120862a46.850098 46.850098 0 0 1-46.850099 46.850098zM905.182945 78.083497h-115.016992a10.411133 10.411133 0 0 1 0-20.822266h115.003978a10.411133 10.411133 0 0 1 0 20.822266z"
        fill={getIconColor(color, 7, '#261D50')}
      />
      <path
        d="M979.947893 778.232192H108.015505a46.850098 46.850098 0 0 1-46.850099-46.850099V150.961428a46.850098 46.850098 0 0 1 46.850099-46.850098h871.932388a46.850098 46.850098 0 0 1 46.850099 46.850098v580.420665a46.850098 46.850098 0 0 1-46.850099 46.850099zM108.015505 124.933596a26.027832 26.027832 0 0 0-26.027833 26.027832v580.420665a26.027832 26.027832 0 0 0 26.027833 26.027833h871.932388a26.027832 26.027832 0 0 0 26.027833-26.027833V150.961428a26.027832 26.027832 0 0 0-26.027833-26.027832z"
        fill={getIconColor(color, 8, '#261D50')}
      />
      <path
        d="M687.134778 724.875135a283.703374 283.703374 0 1 1 200.609519-83.093855A281.842384 281.842384 0 0 1 687.134778 724.875135z m0-546.584482c-144.948999 0-262.881108 117.932109-262.881108 262.881108s117.932109 262.881108 262.881108 262.881108 262.881108-117.932109 262.881108-262.881108-117.919095-262.881108-262.881108-262.881108z"
        fill={getIconColor(color, 9, '#261D50')}
      />
      <path
        d="M687.134778 663.709729c-122.708216 0-222.537968-99.829752-222.537968-222.537968s99.829752-222.537968 222.537968-222.537968 222.537968 99.829752 222.537968 222.537968-99.829752 222.537968-222.537968 222.537968z m0-424.25367c-111.229942 0-201.715702 90.48576-201.715702 201.715702s90.48576 201.715702 201.715702 201.715702 201.715702-90.48576 201.715702-201.715702-90.48576-201.715702-201.715702-201.715702zM275.895024 78.083497H130.139162V39.041749a39.041749 39.041749 0 0 1 39.041749-39.041749h67.672365a39.041749 39.041749 0 0 1 39.041748 39.041749z m-124.933596-20.822266h104.11133V39.041749a18.219483 18.219483 0 0 0-18.219482-18.219483h-67.672365a18.219483 18.219483 0 0 0-18.219483 18.219483zM296.71729 285.004766H148.358645a31.233399 31.233399 0 0 1-31.233399-31.233399v-63.76819a31.233399 31.233399 0 0 1 31.233399-31.233399h148.358645a31.233399 31.233399 0 0 1 31.233399 31.233399v63.76819a31.233399 31.233399 0 0 1-31.233399 31.233399z m-148.358645-105.412722a10.411133 10.411133 0 0 0-10.411133 10.411133v63.76819a10.411133 10.411133 0 0 0 10.411133 10.411133h148.358645a10.411133 10.411133 0 0 0 10.411133-10.411133v-63.76819a10.411133 10.411133 0 0 0-10.411133-10.411133z"
        fill={getIconColor(color, 10, '#261D50')}
      />
    </svg>
  );
};

IconXiangji.defaultProps = {
  size: 18,
};

export default IconXiangji;