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

const IconShangjia: FunctionComponent<Props> = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1025 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M795.591194 63.739684 226.198359 63.739684 63.510452 343.589491c0 0 0 95.998913 0 111.940741 3.323858 28.184228 15.217293 56.068613 32.532465 77.631732l0 321.099211c0 61.817823 48.02504 106.019608 111.790308 106.019608l606.125149 0c63.766291 0 102.096063-44.200762 102.096063-106.019608L916.054438 533.161964c19.59009-23.062335 31.508086-40.402067 43.150799-77.631732 0-30.63414 0-111.940741 0-111.940741L795.591194 63.739684zM247.110624 106.416669l517.872013 0 129.480028 234.721885L117.629573 341.138555 247.110624 106.416669zM808.15902 918.254652 203.935265 918.254652c-31.883657 0-64.742572-33.08303-64.742572-63.990406l0.001023 0 0-65.038322 735.729003 0 0.299843 59.116165C875.224608 879.275049 840.01914 918.254652 808.15902 918.254652zM874.923742 746.546891 139.195763 746.546891l-0.001023 0 0.001023 0L139.195763 554.500968c17.865737 14.76804 50.024676 21.362542 64.742572 21.362542 30.082552 0 76.258389-35.206492 96.423605-76.208245 22.637642 39.878109 57.441956 76.208245 97.796948 76.208245 42.651402 0 97.046828-33.780958 112.736912-70.386377 15.69213 35.756034 61.267258 70.386377 103.044714 70.386377 41.427469 0 84.70414-38.828146 106.416669-80.432655 25.388421 42.003618 56.370503 80.432655 109.367003 80.432655 8.197076 0 38.355356-7.046825 45.499399-8.395607L874.923742 746.546891zM813.76803 508.146044c-45.000002-0.023537-97.420353-34.982377-97.420353-63.666002l-21.59075 0c0 28.207765-43.100655 63.666002-86.251454 63.666002-41.380394 0-86.355836-36.330136-86.355836-63.666002l-21.588703 0c0 28.207765-57.670164 63.666002-99.073072 63.666002-43.150799 0-95.149528-27.585565-95.149528-63.666002l-21.563119 0c0 28.134084-45.449255 64.538924-86.926868 64.538924-42.103907 0-85.703959-25.909309-85.703959-64.538924L112.144389 382.508716l798.420771 0 0 61.971326 0.002047 0C910.169121 483.109657 852.773217 508.169581 813.76803 508.146044z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </svg>
  );
};

IconShangjia.defaultProps = {
  size: 18,
};

export default IconShangjia;