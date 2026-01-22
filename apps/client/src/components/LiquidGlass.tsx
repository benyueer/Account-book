import React, { useMemo, useEffect, useRef } from 'react';

const LiquidGlass = ({ 
  children, 
  strength = 10,    // 折射强度
  blur = 1,        // 模糊度
  borderRadius = 40, 
  className = "" 
}) => {
  const id = useMemo(() => `glass-filter-${Math.random().toString(36).substr(2, 9)}`, []);
  const canvasRef = useRef(null);
  const [mapUrl, setMapUrl] = React.useState("");

  // 核心：动态生成位移贴图
  useEffect(() => {
    const canvas = document.createElement('canvas');
    const size = 256; // 纹理分辨率
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');

    // 绘制位移图逻辑：
    // R通道 (X位移): 128是中性，>128向右偏移，<128向左偏移
    // G通道 (Y位移): 同理
    const imageData = ctx.createImageData(size, size);
    for (let i = 0; i < imageData.data.length; i += 4) {
      const x = (i / 4) % size;
      const y = Math.floor((i / 4) / size);
      
      // 计算到边缘的距离，生成折射梯度（此处为简化算法）
      const centerX = size / 2;
      const centerY = size / 2;
      const dist = Math.sqrt((x - centerX)**2 + (y - centerY)**2);
      
      imageData.data[i]     = 128 + (x - centerX) / size * 127; // R
      imageData.data[i + 1] = 128 + (y - centerY) / size * 127; // G
      imageData.data[i + 2] = 0;   // B
      imageData.data[i + 3] = 255; // A
    }
    ctx.putImageData(imageData, 0, 0);
    setMapUrl(canvas.toDataURL());
  }, []);

  return (
    <div style={{ position: 'relative', borderRadius, overflow: 'hidden' }} className={className}>
      {/* 隐藏的 SVG 滤镜定义 */}
      <svg style={{ position: 'absolute', width: 0, height: 0 }}>
        <filter id={id} colorInterpolationFilters="sRGB">
          <feImage href={mapUrl} result="map" x="0" y="0" width="100%" height="100%" preserveAspectRatio="none" />
          <feDisplacementMap in="SourceGraphic" in2="map" scale={strength} xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </svg>

      {/* 实际显示效果的容器 */}
      <div style={{
        width: '100%',
        height: '100%',
        backdropFilter: `url(#${id}) blur(${blur}px)`,
        WebkitBackdropFilter: `url(#${id}) blur(${blur}px)`,
        background: 'rgba(255, 255, 255, 0.05)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        borderRadius: borderRadius
      }}>
        {children}
      </div>
    </div>
  );
};

export default LiquidGlass;