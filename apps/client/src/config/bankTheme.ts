/**
 * 银行 Logo 和主题色配置
 * 主题色使用低饱和度，适合作为卡片背景色
 */

export interface BankConfig {
  /** 银行名称关键词（匹配时使用 includes） */
  keywords: string[]
  /** 主题渐变色（低饱和度，适合背景） */
  gradient: string
  /** 主题色（用于其他场景） */
  primaryColor: string
}

export const bankConfigs: BankConfig[] = [
  // 国有大行 - 红色系（降低饱和度）
  {
    keywords: ['工商', 'ICBC'],
    gradient: 'linear-gradient(135deg, #c45c5c 0%, #8b3a3a 100%)',
    primaryColor: '#b91c1c',
  },
  {
    keywords: ['中国银行', 'BOC'],
    gradient: 'linear-gradient(135deg, #b87333 0%, #8b5a2b 100%)',
    primaryColor: '#a52a2a',
  },
  {
    keywords: ['建设', 'CCB'],
    gradient: 'linear-gradient(135deg, #4a7ab8 0%, #2d5a8a 100%)',
    primaryColor: '#1d4ed8',
  },
  {
    keywords: ['农业', 'ABC'],
    gradient: 'linear-gradient(135deg, #5d9b68 0%, #3d7a48 100%)',
    primaryColor: '#047857',
  },
  {
    keywords: ['交通', 'BCM'],
    gradient: 'linear-gradient(135deg, #5b7fa8 0%, #3b5f88 100%)',
    primaryColor: '#1e3a8a',
  },
  // 股份制银行
  {
    keywords: ['招商', 'CMB'],
    gradient: 'linear-gradient(135deg, #c96b4a 0%, #a84b2a 100%)',
    primaryColor: '#c2410c',
  },
  {
    keywords: ['民生', 'CMBC'],
    gradient: 'linear-gradient(135deg, #6b8f5d 0%, #4b7a3d 100%)',
    primaryColor: '#3d7a3d',
  },
  {
    keywords: ['中信', 'CITIC'],
    gradient: 'linear-gradient(135deg, #6b5ab8 0%, #4b3a98 100%)',
    primaryColor: '#4b3a98',
  },
  {
    keywords: ['浦发', 'SPDB', '浦发银行'],
    gradient: 'linear-gradient(135deg, #5a8ab8 0%, #3a6a98 100%)',
    primaryColor: '#1e3a8a',
  },
  {
    keywords: ['兴业', 'CIB'],
    gradient: 'linear-gradient(135deg, #5a7ab8 0%, #3a5a98 100%)',
    primaryColor: '#1d4ed8',
  },
  {
    keywords: ['光大', 'CEB'],
    gradient: 'linear-gradient(135deg, #8b7ab8 0%, #6b5a98 100%)',
    primaryColor: '#6d28d9',
  },
  {
    keywords: ['平安', 'PA'],
    gradient: 'linear-gradient(135deg, #d98b4a 0%, #b96b2a 100%)',
    primaryColor: '#c2410c',
  },
  {
    keywords: ['广发', 'CGB'],
    gradient: 'linear-gradient(135deg, #a85a8a 0%, #883a6a 100%)',
    primaryColor: '#883a6a',
  },
  {
    keywords: ['华夏', 'HXB'],
    gradient: 'linear-gradient(135deg, #b85a5a 0%, #983a3a 100%)',
    primaryColor: '#983a3a',
  },
  // 邮政
  {
    keywords: ['邮政', 'PSBC'],
    gradient: 'linear-gradient(135deg, #5d9b68 0%, #3d7b48 100%)',
    primaryColor: '#047857',
  },
  // 地方银行
  {
    keywords: ['北京银行', 'BOB'],
    gradient: 'linear-gradient(135deg, #5a8a8a 0%, #3a6a6a 100%)',
    primaryColor: '#1e3a3a',
  },
  {
    keywords: ['上海银行', 'SHB'],
    gradient: 'linear-gradient(135deg, #6a7a9a 0%, #4a5a7a 100%)',
    primaryColor: '#1e3a5a',
  },
  {
    keywords: ['江苏银行', 'JSB'],
    gradient: 'linear-gradient(135deg, #7a8ab8 0%, #5a6a98 100%)',
    primaryColor: '#1d4e9a',
  },
  {
    keywords: ['南京银行', 'NJCB'],
    gradient: 'linear-gradient(135deg, #6a8aa8 0%, #4a6a88 100%)',
    primaryColor: '#1e3a6a',
  },
  {
    keywords: ['宁波银行', 'NBCB'],
    gradient: 'linear-gradient(135deg, #5a8a7a 0%, #3a6a5a 100%)',
    primaryColor: '#1e4a4a',
  },
  {
    keywords: ['浙商银行', 'CZSB'],
    gradient: 'linear-gradient(135deg, #9a6a4a 0%, #7a4a2a 100%)',
    primaryColor: '#7a3a1a',
  },
  {
    keywords: ['恒丰银行', 'HFB'],
    gradient: 'linear-gradient(135deg, #8a7a6a 0%, #6a5a4a 100%)',
    primaryColor: '#5a4a3a',
  },
  {
    keywords: ['渤海银行'],
    gradient: 'linear-gradient(135deg, #5a8aaa 0%, #3a6a8a 100%)',
    primaryColor: '#1e4a6a',
  },
  {
    keywords: ['余杭农商', 'YHRCB'],
    gradient: 'linear-gradient(135deg, #6a9a5a 0%, #4a7a3a 100%)',
    primaryColor: '#2a6a2a',
  },
]

/**
 * 根据银行名称获取主题配置
 */
export function getBankTheme(bankName: string, cardType: string): string {
  const name = bankName || ''

  // 查找匹配的银行配置
  for (const config of bankConfigs) {
    if (config.keywords.some(keyword => name.includes(keyword))) {
      return config.gradient
    }
  }

  // 默认主题色
  return cardType === 'credit'
    ? 'linear-gradient(135deg, #7c7c9a 0%, #5c5c7a 100%)'
    : 'linear-gradient(135deg, #6a7a8a 0%, #4a5a6a 100%)'
}

/**
 * 根据银行名称获取主题色
 */
export function getBankPrimaryColor(bankName: string): string {
  const name = bankName || ''

  for (const config of bankConfigs) {
    if (config.keywords.some(keyword => name.includes(keyword))) {
      return config.primaryColor
    }
  }

  return '#475569'
}

/**
 * 根据银行名称获取本地 Logo 路径
 * 返回 public/logos 目录下的 SVG 文件路径
 */
export function getBankLogo(bankName: string): string | null {
  const name = bankName || ''

  // 银行名称到 logo 文件名的映射
  const logoMap: Record<string, string> = {
    工商: '/logos/icbc.svg',
    ICBC: '/logos/icbc.svg',
    农业: '/logos/abc.svg',
    ABC: '/logos/abc.svg',
    中国银行: '/logos/boc.svg',
    BOC: '/logos/boc.svg',
    建设: '/logos/ccb.svg',
    CCB: '/logos/ccb.svg',
    交通: '/logos/bcm.svg',
    BCM: '/logos/bcm.svg',
    招商: '/logos/cmb.svg',
    CMB: '/logos/cmb.svg',
    民生: '/logos/cmbc.svg',
    CMBC: '/logos/cmbc.svg',
    中信: '/logos/citic.svg',
    CITIC: '/logos/citic.svg',
    浦发: '/logos/shb.svg',
    SPDB: '/logos/shb.svg',
    兴业: '/logos/cib.svg',
    CIB: '/logos/cib.svg',
    光大: '/logos/ceb.svg',
    CEB: '/logos/ceb.svg',
    平安: '/logos/pa.svg',
    PA: '/logos/pa.svg',
    广发: '/logos/cgb.svg',
    CGB: '/logos/cgb.svg',
    华夏: '/logos/hxb.svg',
    HXB: '/logos/hxb.svg',
    邮政: '/logos/psbc.svg',
    PSBC: '/logos/psbc.svg',
    北京银行: '/logos/bob.svg',
    BOB: '/logos/bob.svg',
    上海银行: '/logos/shb.svg',
    SHB: '/logos/shb.svg',
    江苏银行: '/logos/jsb.svg',
    JSB: '/logos/jsb.svg',
    南京银行: '/logos/njcb.svg',
    NJCB: '/logos/njcb.svg',
    宁波银行: '/logos/nbcb.svg',
    NBCB: '/logos/nbcb.svg',
    浙商银行: '/logos/czsb.svg',
    CZSB: '/logos/czsb.svg',
    恒丰银行: '/logos/hfb.svg',
    HFB: '/logos/hfb.svg',
    渤海银行: '/logos/bhb.svg',
    余杭农商: '/logos/yhrcb.svg',
    YHRCB: '/logos/yhrcb.svg',
  }

  // 遍历映射表，查找匹配的银行
  for (const [keyword, logoPath] of Object.entries(logoMap)) {
    if (name.includes(keyword)) {
      return logoPath
    }
  }

  return null
}
