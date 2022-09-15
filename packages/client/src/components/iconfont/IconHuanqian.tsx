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

const IconHuanqian: FunctionComponent<Props> = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M426.7008 611.35872c-138.79296 0-251.70944-118.74816-251.70944-264.704S287.90784 81.92 426.7008 81.92s251.6992 118.784 251.6992 264.704-112.90624 264.73472-251.6992 264.73472z m0-475.59168c-110.5664 0-200.51456 94.59712-200.51456 210.87744s89.94816 210.87744 200.51456 210.87744S627.2 462.9248 627.2 346.624s-89.9328-210.85696-200.4992-210.85696zM921.6 614.35392a26.28096 26.28096 0 0 1 25.6 26.91584V877.568a25.63072 25.63072 0 1 1-51.2 0v-236.29824a26.28096 26.28096 0 0 1 25.6-26.91584z m-822.93248 21.79584c20.9664-31.03232 51.1744-43.6992 85.0688-35.70176 24.66304 5.82656 46.22336 21.3248 59.10528 30.58176 2.16064 1.536 4.096 2.93888 5.72416 4.04992 10.5984 7.168 65.99168 40.13056 148.1728 88.17664a6.31808 6.31808 0 0 0 5.88288 0.28672l275.456-126.90944a55.17824 55.17824 0 0 1 31.95392-4.41344l97.94048 15.75424a43.008 43.008 0 0 1 35.42016 43.37152v201.79456a42.88512 42.88512 0 0 1-41.72288 43.87328H747.9808c-1.35168 0-2.688-0.04096-4.096-0.14848-3.98336-0.32256-40.73472-2.56-101.08928 15.5648-42.5472 12.8-98.6368 29.63968-152.85248 29.63968-32.86016 0-65.024-6.1952-93.09696-23.23968-61.15328-37.16608-248.68352-147.08736-262.016-154.92608-7.52128-3.81952-41.39008-22.8352-50.688-59.1872-3.968-15.5648-4.6848-40.1408 14.52544-68.56704z m34.90304 54.5024c3.02592 12.1856 18.56512 22.3232 23.61344 24.83712l1.82784 0.9728c1.9968 1.16736 200.00256 117.20704 263.43424 155.74528 55.53152 33.74592 146.23744 6.49216 206.26944-11.5456a380.52352 380.52352 0 0 1 107.52-17.87392c5.8112 0 9.78432 0.23552 11.776 0.38912h44.19584v-183.296l-89.9072-14.45888a6.2208 6.2208 0 0 0-3.67104 0.512l-258.4064 119.06048 15.0016 13.09696a6.36416 6.36416 0 0 0 6.75328 1.1008l125.7472-53.68832a25.1904 25.1904 0 0 1 33.34656 14.848 27.41248 27.41248 0 0 1-14.09536 35.06688l-125.7472 53.6576a55.33696 55.33696 0 0 1-21.77536 4.48 56.08448 56.08448 0 0 1-36.93056-14.03904L361.984 766.67392a26.36288 26.36288 0 0 1-3.99872-4.46976c-50.21696-29.40416-122.59328-72.0128-137.11872-81.83808a300.78976 300.78976 0 0 1-6.92224-4.88448c-39.78752-28.60032-58.368-30.65856-73.55392-8.14592-9.22112 13.66016-7.41376 20.92544-6.82496 23.31648z"
        fill={getIconColor(color, 0, '#2966C1')}
      />
      <path
        d="M348.672 377.07264h53.64224v-16.85504H348.672a26.81344 26.81344 0 0 1 0-53.55008h22.87616l-37.0688-39.07584a27.81184 27.81184 0 0 1 0-37.888 24.49408 24.49408 0 0 1 35.92192 0l58.4704 61.63968 58.4704-61.63968a24.49408 24.49408 0 0 1 35.92192 0 27.80672 27.80672 0 0 1 0 37.888L486.21056 306.688h20.52096a26.81344 26.81344 0 0 1 0 53.55008H453.12v16.85504h53.61152a26.81344 26.81344 0 0 1 0 53.55008H453.12v36.69504a25.43616 25.43616 0 1 1-50.79552 0v-36.71552H348.672a26.81344 26.81344 0 0 1 0-53.55008z"
        fill={getIconColor(color, 1, '#FD9A16')}
      />
    </svg>
  );
};

IconHuanqian.defaultProps = {
  size: 18,
};

export default IconHuanqian;