const PINYIN_DICT: Record<string, string> = {
  '张': 'zhang',
  '三': 'san',
  '李': 'li',
  '四': 'si',
  '王': 'wang',
  '五': 'wu',
  '赵': 'zhao',
  '六': 'liu',
  '陈': 'chen',
  '七': 'qi',
  '林': 'lin',
  '八': 'ba',
  '周': 'zhou',
  '九': 'jiu',
  '正': 'zheng',
  '阳': 'yang',
  '徐': 'xu',
  '炯': 'jiong',
  '骏': 'jun',
  '何': 'he',
  '家': 'jia',
  '俊': 'jun',
  '方': 'fang',
  '兔': 'tu',
  '斯': 'si',
  '基': 'ji',
  '朱': 'zhu',
  '晨': 'chen',
  '杰': 'jie',
  '梁': 'liang',
  '敏': 'min',
  '琪': 'qi',
  '沈': 'shen',
  '文': 'wen',
  '君': 'jun',
  '燕': 'yan',
  '华': 'hua',
  '肖': 'xiao',
  '隆': 'long',
  '贵': 'gui',
  '马': 'ma',
  '丽': 'li',
  '郑': 'zheng',
  '庄': 'zhuang',
  '毅': 'yi',
  '廷': 'ting',
  '睿': 'rui',
  '孙': 'sun',
  '洁': 'jie',
  '铭': 'ming',
  '岳': 'yue',
  '海': 'hai',
  '泽': 'ze',
  '夏': 'xia',
  '贾': 'jia',
  '为': 'wei',
  '健': 'jian'
};

/**
 * Gets full pinyin of a Chinese string, skipping non-Chinese chars.
 */
export function getFullPinyin(str: string): string {
  let result = '';
  for (const char of str) {
    result += PINYIN_DICT[char] || char.toLowerCase();
  }
  return result;
}

/**
 * Gets initials of a Chinese string.
 */
export function getPinyinInitials(str: string): string {
  let result = '';
  for (const char of str) {
    const py = PINYIN_DICT[char];
    if (py) {
      result += py[0];
    } else {
      result += char.toLowerCase();
    }
  }
  return result;
}

/**
 * Checks if a name matches the query by Chinese name, full pinyin, pinyin initials, or id/title.
 */
export function matchPinyin(name: string, query: string, id?: string): boolean {
  if (!query) return true;
  const normalizedQuery = query.trim().toLowerCase();
  if (!normalizedQuery) return true;
  
  // 1. Direct name match (case insensitive)
  const normalizedName = name.toLowerCase();
  if (normalizedName.includes(normalizedQuery)) return true;
  
  // 2. ID match if provided
  if (id && id.toLowerCase().includes(normalizedQuery)) return true;
  
  // 3. Full pinyin match
  const fullPinyin = getFullPinyin(name);
  if (fullPinyin.includes(normalizedQuery)) return true;
  
  // 4. Initials match
  const initials = getPinyinInitials(name);
  if (initials.includes(normalizedQuery)) return true;
  
  return false;
}
