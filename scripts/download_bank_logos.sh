#!/bin/bash

# 下载中国前20大银行的logo (SVG格式)
# 使用 GitHub icongo/bank-logos 仓库

OUTPUT_DIR="apps/client/public/logos"
mkdir -p "$OUTPUT_DIR"

# 银行名称:GitHub仓库中的文件名
banks=(
  "icbc:icbc-rect"
  "abc:abchina-rect"
  "boc:boc-rect"
  "ccb:ccb-rect"
  "bcm:bankcomm-rect"
  "cmb:cmbchina-rect"
  "cmbc:cmbc-rect"
  "citic:citicbank-rect"
  "cib:cib-rect"
  "hxb:huaxia-rect"
  "bob:bankofbeijing-rect"
  "shb:spdb-rect"
  "gdhb:cgbchina-rect"
  "njcb:nanjing-rect"
  "jsb:jiangsu-rect"
  "nxb:bankofnx-rect"
  "dlb:bankofdl-rect"
  "bocd:bocd-rect"
  "hsb:hsbank-rect"
  "psbc:psbc-rect"
)

BASE_URL="https://raw.githubusercontent.com/icongo/bank-logos/main/logos"

success=0
failed=0

echo "开始下载银行 logo (GitHub)..."
echo "========================================"

for bank in "${banks[@]}"; do
  name="${bank%%:*}"
  filename="${bank##*:}"
  url="$BASE_URL/$filename.svg"
  
  echo -n "下载 $name ($filename) ... "
  
  curl -sL --max-time 30 -o "$OUTPUT_DIR/$name.svg" "$url"
  
  if [ -s "$OUTPUT_DIR/$name.svg" ]; then
    if file "$OUTPUT_DIR/$name.svg" | grep -qE "SVG"; then
      echo "✓"
      ((success++))
    else
      echo "✗ (无效文件)"
      rm -f "$OUTPUT_DIR/$name.svg"
      ((failed++))
    fi
  else
    echo "✗"
    rm -f "$OUTPUT_DIR/$name.svg"
    ((failed++))
  fi
done

echo "========================================"
echo "完成! 成功: $success, 失败: $failed"
ls -la "$OUTPUT_DIR"
