import React from 'react';

// --- Department Mock Data ---

export interface DepartmentNode {
  id: string;
  name: string;
  code: string;
  externalId: string;
  leader?: string;
  leaderAvatar?: string;
  leaders?: { name: string; enName?: string; id?: string; avatar?: string }[];
  count1: number;
  count2: number;
  subCount?: number;
  parentId?: string;
  childrenIds?: string[];
  personnel?: any[];
  positions?: any[];
  effectiveDate?: string;
  status?: string;
  nameEn?: string;
  reportingLevel?: string;
  deptLevel?: string;
  costCenter?: string;
  hrSubarea?: string;
  hrArea?: string;
}


export const MOCK_DEPARTMENTS: Record<string, DepartmentNode> = {
  'corp': {
    id: 'corp',
    name: '大众汽车（中国）',
    code: 'VGC',
    externalId: '10000000',
    leader: 'Ralf Brandstätter',
    leaderAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200&h=200',
    count1: 6,
    count2: 8,
    subCount: 8,
    childrenIds: ['prod-ctrl'],
    personnel: [
      { id: 'p1', name: 'Ralf Brandstätter', title: 'VGC CEO', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200&h=200' },
      { id: 'p2', name: 'Stephan Mecha', title: 'VGC HR Director', avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=150&h=150' },
      { id: 'p_corp3', name: 'Dr. Jürgen Unser', title: 'Executive VP', avatar: null },
      { id: 'p_corp4', name: 'Marcus Hafkemeyer', title: 'CTO', avatar: null },
      { id: 'p_corp5', name: 'Jens Pfitzinger', title: 'Executive VP HR', avatar: null },
      { id: 'p_corp6', name: 'Dr. Oliver Grünberg', title: 'Executive VP Production', avatar: null },
    ],
    positions: [
      { id: 'pos1', title: 'CEO', status: '已占', occupant: 'Ralf Brandstätter' },
      { id: 'pos2', title: 'Managing Director', status: '已占', occupant: 'Stephan Mecha' },
      { id: 'pos_c3', title: 'Executive VP', status: '已占', occupant: 'Dr. Jürgen Unser' },
      { id: 'pos_c4', title: 'Chief Technology Officer', status: '已占', occupant: 'Marcus Hafkemeyer' },
      { id: 'pos_c5', title: 'Executive VP HR', status: '已占', occupant: 'Jens Pfitzinger' },
      { id: 'pos_c6', title: 'Executive VP Production', status: '已占', occupant: 'Dr. Oliver Grünberg' },
      { id: 'pos_c7', title: 'Board Assistant', status: '空缺', occupant: '待招募' },
      { id: 'pos_c8', title: 'Chief Strategy Officer', status: '空缺', occupant: '待招募' },
    ],
    effectiveDate: "2024 年 1 月 1 日",
    status: "活动",
    nameEn: "Volkswagen Group China",
    reportingLevel: "Board (R0)",
    deptLevel: "HQ",
    costCenter: "VGC-HQ (10000)",
    hrSubarea: "北京总部-VGC Beijing (9000)",
    hrArea: "大众中国 (VGC)"
  },
  'prod-ctrl': {
    id: 'prod-ctrl',
    name: '大众品牌产品线控制',
    code: 'CFPV',
    externalId: '50179900',
    leader: '肖隆贵 Xiao Longgui',
    leaderAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150&h=150',
    count1: 4,
    count2: 5,
    subCount: 6,
    parentId: 'corp',
    childrenIds: ['child1', 'child2', 'child3', 'cig', 'c-exec', 'sales-marketing'],
    personnel: [
      { id: 'p3', name: '肖隆贵', title: '产品线控制负责人', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150&h=150' },
      { id: 'p_pc2', name: '顾捷', title: '副负责人', avatar: null },
      { id: 'p_pc3', name: '陈文', title: '高级项目助理', avatar: null },
      { id: 'p_pc4', name: '林美慧', title: '行政秘书', avatar: null },
    ],
    positions: [
      { id: 'pos3', title: '产品线控制负责人', status: '已占', occupant: '肖隆贵' },
      { id: 'pos_pc2', title: '产品线控制副负责人', status: '已占', occupant: '顾捷' },
      { id: 'pos_pc3', title: '高级项目助理', status: '已占', occupant: '陈文' },
      { id: 'pos_pc4', title: '行政秘书', status: '已占', occupant: '林美慧' },
      { id: 'pos_pc5', title: '产品线战略规划专家', status: '空缺', occupant: '待招募' },
    ],
    effectiveDate: "2024 年 6 月 15 日",
    status: "活动",
    nameEn: "Volkswagen Brand Product Line Control",
    reportingLevel: "R1 (R1)",
    deptLevel: "Division",
    costCenter: "CFPV-HQ (84001)",
    hrSubarea: "安亭本部-SVW Anting (9001)",
    hrArea: "上汽大众 (安亭) (0SVW)"
  },
  'child1': {
    id: 'child1',
    name: 'A0/A级车产品线控制',
    code: 'CFPV-1',
    externalId: '50179904',
    leader: '朱文君 Zhu Wenjun',
    leaderAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=150&h=150',
    count1: 4,
    count2: 6,
    subCount: 1,
    parentId: 'prod-ctrl',
    personnel: [
      { id: 'p4', name: '朱文君', title: '部门经理', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=150&h=150' },
      { id: 'p5', name: '何家俊', title: '高级分析师', avatar: null },
      { id: 'p_c1_3', name: '孙浩', title: '项目专员', avatar: null },
      { id: 'p_c1_4', name: '戴芳', title: '产品规划师', avatar: null },
    ],
    positions: [
      { id: 'pos4', title: '部门经理', status: '已占', occupant: '朱文君' },
      { id: 'pos5', title: '高级分析师', status: '已占', occupant: '何家俊' },
      { id: 'pos_c1_3', title: '项目专员', status: '已占', occupant: '孙浩' },
      { id: 'pos_c1_4', title: '产品规划师', status: '已占', occupant: '戴芳' },
      { id: 'pos6', title: '车型控制分析师', status: '空缺', occupant: '待招募' },
      { id: 'pos_c1_6', title: '商务控制支持', status: '空缺', occupant: '待招募' },
    ],
    effectiveDate: "2025 年 3 月 10 日",
    status: "活动",
    nameEn: "A0/A Class Car Product Line Control",
    reportingLevel: "R2 (R2)",
    deptLevel: "Department",
    costCenter: "CFPV-A (84005)",
    hrSubarea: "安亭本部-SVW Anting (9001)",
    hrArea: "上汽大众 (安亭) (0SVW)"
  },
  'child2': {
    id: 'child2',
    name: 'B/C级车产品线控制',
    code: 'CFPV-2',
    externalId: '50179905',
    leader: '马丽 Ma Li',
    leaderAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=150&h=150',
    count1: 3,
    count2: 5,
    subCount: 1,
    parentId: 'prod-ctrl',
    personnel: [
      { id: 'p6', name: '马丽', title: '部门经理', avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=150&h=150' },
      { id: 'p_c2_2', name: '钱海林', title: '财务控制顾问', avatar: null },
      { id: 'p_c2_3', name: '赵莉', title: '产品分析师', avatar: null },
    ],
    positions: [
      { id: 'pos7', title: '部门经理', status: '已占', occupant: '马丽' },
      { id: 'pos_c2_2', title: '财务控制顾问', status: '已占', occupant: '钱海林' },
      { id: 'pos_c2_3', title: '产品分析师', status: '已占', occupant: '赵莉' },
      { id: 'pos_c2_4', title: '项目主管', status: '空缺', occupant: '待招募' },
      { id: 'pos_c2_5', title: '车型成本控制专家', status: '空缺', occupant: '待招募' },
    ],
    effectiveDate: "2025 年 3 月 10 日",
    status: "活动",
    nameEn: "B/C Class Car Product Line Control",
    reportingLevel: "R2 (R2)",
    deptLevel: "Department",
    costCenter: "CFPV-BC (84006)",
    hrSubarea: "安亭本部-SVW Anting (9001)",
    hrArea: "上汽大众 (安亭) (0SVW)"
  },
  'child3': {
    id: 'child3',
    name: 'SUV/MPV级车产品线控制',
    code: 'CFPV-3',
    externalId: '50179906',
    leader: '郑庄毅 Zheng Zhuangyi',
    leaderAvatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=150&h=150',
    count1: 4,
    count2: 6,
    parentId: 'prod-ctrl',
    personnel: [
       { id: 'p7', name: '郑庄毅', title: '部门经理', avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=150&h=150' },
       { id: 'p_c3_2', name: '梁杰', title: '产品规划专家', avatar: null },
       { id: 'p_c3_3', name: '许佳', title: '高级控制顾问', avatar: null },
       { id: 'p_c3_4', name: '周航', title: '项目协调员', avatar: null },
    ],
    positions: [
      { id: 'pos8', title: '部门经理', status: '已占', occupant: '郑庄毅' },
      { id: 'pos_c3_2', title: '产品规划专家', status: '已占', occupant: '梁杰' },
      { id: 'pos_c3_3', title: '高级控制顾问', status: '已占', occupant: '许佳' },
      { id: 'pos_c3_4', title: '项目协调员', status: '已占', occupant: '周航' },
      { id: 'pos_c3_5', title: '平台化控制专家', status: '空缺', occupant: '待招募' },
      { id: 'pos_c3_6', title: '商务开发助理', status: '空缺', occupant: '待招募' },
    ],
    effectiveDate: "2025 年 3.月 10 日",
    status: "活动",
    nameEn: "SUV/MPV Class Car Product Line Control",
    reportingLevel: "R2 (R2)",
    deptLevel: "Department",
    costCenter: "CFPV-SUV (84007)",
    hrSubarea: "安亭本部-SVW Anting (9001)",
    hrArea: "上汽大众 (安亭) (0SVW)"
  },
  'cig': {
    id: 'cig',
    name: 'IT规划与治理',
    code: 'CIG',
    externalId: '50179910',
    count1: 10,
    count2: 13,
    parentId: 'prod-ctrl',
    personnel: [
      { id: 'cig1', name: '王敏', title: 'IT规划专家', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=150&h=150' },
      { id: 'cig2', name: '李超', title: '系统架构师', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150&h=150' },
      { id: 'cig3', name: '孙磊', title: '安全合规顾问', avatar: null },
      { id: 'cig4', name: '张倩', title: '业务系统分析师', avatar: null },
      { id: 'cig5', name: '赵云', title: '数据治理专家', avatar: null },
      { id: 'cig6', name: '钱进', title: '云基础设施工程师', avatar: null },
      { id: 'cig7', name: '孙丽', title: 'IT采购合规专员', avatar: null },
      { id: 'cig8', name: '周建', title: '网络工程师', avatar: null },
      { id: 'cig9', name: '吴迪', title: '质量管理专家', avatar: null },
      { id: 'cig10', name: '郑峰', title: '项目管理办公室PMO', avatar: null },
    ],
    positions: [
      { id: 'cigpos1', title: 'IT规划专家', status: '已占', occupant: '王敏' },
      { id: 'cigpos2', title: '系统架构师', status: '已占', occupant: '李超' },
      { id: 'cigpos3', title: '安全合规顾问', status: '已占', occupant: '孙磊' },
      { id: 'cigpos4', title: '业务系统分析师', status: '已占', occupant: '张倩' },
      { id: 'cigpos5', title: '数据治理专家', status: '已占', occupant: '赵云' },
      { id: 'cigpos6', title: '云基础设施工程师', status: '已占', occupant: '钱进' },
      { id: 'cigpos7', title: 'IT采购合规专员', status: '已占', occupant: '孙丽' },
      { id: 'cigpos8', title: '网络工程师', status: '已占', occupant: '周建' },
      { id: 'cigpos9', title: '质量管理专家', status: '已占', occupant: '吴迪' },
      { id: 'cigpos10', title: '项目管理办公室PMO', status: '已占', occupant: '郑峰' },
      { id: 'cigpos11', title: 'IT架构总监', status: '空缺', occupant: '待招募' },
      { id: 'cigpos12', title: '敏捷教练', status: '空缺', occupant: '待招募' },
      { id: 'cigpos13', title: '信息安全主管', status: '空缺', occupant: '待招募' },
    ],
    effectiveDate: "2025 年 5 月 14 日",
    status: "活动",
    nameEn: "IT Planning & Governance",
    reportingLevel: "R1 (R1)",
    deptLevel: "TM/UM",
    costCenter: "CIG信息规划中心 (84010)",
    hrSubarea: "安亭本部-SVW Anting (9001)",
    hrArea: "上汽大众 (安亭) (0SVW)"
  },
  'c-exec': {
    id: 'c-exec',
    name: '第一副总经理兼商务执行副总经理',
    code: 'C',
    externalId: '50179915',
    leader: 'Santel Holger 沈鸿广',
    leaderAvatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=150&h=150',
    count1: 1,
    count2: 1,
    parentId: 'prod-ctrl',
    personnel: [
      { id: 'c1', name: 'Santel Holger 沈鸿广', title: '第一副总经理', avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=150&h=150' }
    ],
    positions: [
      { id: 'cpos1', title: '第一副总经理', status: '已占', occupant: 'Santel Holger 沈鸿广' }
    ],
    effectiveDate: "2024 年 1 月 1 日",
    status: "活动",
    nameEn: "First Executive VP & Commercial VP",
    reportingLevel: "R1 (R1)",
    deptLevel: "TM/UM",
    costCenter: "Commercial VP (84000)",
    hrSubarea: "安亭本部-SVW Anting (9001)",
    hrArea: "上汽大众 (安亭) (0SVW)"
  },
  'sales-marketing': {
    id: 'sales-marketing',
    name: '销售与市场执行副总经理',
    code: 'S',
    externalId: '50179920',
    leaders: [
      { name: '尹丹', enName: 'Yin Dan', id: '62545', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150&h=150' },
      { name: '席诺德', enName: 'HillesKnut', id: '81063', avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=150&h=150' }
    ],
    count1: 2,
    count2: 2,
    subCount: 7,
    parentId: 'prod-ctrl',
    personnel: [
      { id: 'sm1', name: '尹丹', title: '执行副总经理 (中方)', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150&h=150' },
      { id: 'sm2', name: '席诺德', title: '执行副总经理 (外方)', avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=150&h=150' }
    ],
    positions: [
      { id: 'smpos1', title: '执行副总经理 (中方)', status: '已占', occupant: '尹丹' },
      { id: 'smpos2', title: '执行副总经理 (外方)', status: '已占', occupant: '席诺德' }
    ],
    effectiveDate: "2025 年 5 月 14 日",
    status: "活动",
    nameEn: "Sales & Marketing Executive VP",
    reportingLevel: "R1 (R1)",
    deptLevel: "TM/UM",
    costCenter: "CI信息系统 (84000)",
    hrSubarea: "安亭本部-SVW Anting (9001)",
    hrArea: "上汽大众 (安亭) (0SVW)"
  }
};

// --- Position Mock Data ---

export interface PositionNode {
  id: string;
  department: string;
  title: string;
  occupant: string;
  avatar?: string;
  subCount?: string;
  isEmpty?: boolean;
  parentId?: string;
  childrenIds?: string[];
  code?: string;
  externalId?: string;
  effectiveDate?: string;
  standardPosition?: string;
  company?: string;
  hrSubarea?: string;
  hrArea?: string;
  costCenter?: string;
}

export const MOCK_POSITIONS: Record<string, PositionNode> = {
  'ceo': {
    id: 'ceo',
    department: '大众集团',
    title: 'CEO',
    occupant: 'Oliver Blume',
    avatar: 'OB',
    subCount: '12个直属职位',
    childrenIds: ['root'],
    code: '60110001',
    externalId: '50000001',
    effectiveDate: '2024 年 1 月 1 日',
    standardPosition: '董事会主席 (50000001)',
    company: '大众汽车集团 (1000)',
    hrSubarea: '沃尔夫斯堡总部-VW Wolfsburg (1001)',
    hrArea: '大众集团 (VWAG)',
    costCenter: '董事会办公室 (10000)'
  },
  'root': {
    id: 'root',
    department: 'MP 研发',
    title: 'MP4负责人',
    occupant: '徐廷睿 Xu Tingrui',
    avatar: 'XT',
    subCount: '4个直接下属岗位',
    parentId: 'ceo',
    childrenIds: ['child1', 'child2', 'child3', 'vacant-cia'],
    code: '60111039',
    externalId: '50093190',
    effectiveDate: '2024 年 9 月 14 日',
    standardPosition: '部门经理 (50091818)',
    company: '上汽大众 (8000)',
    hrSubarea: '安亭本部-SVW Anting (9001)',
    hrArea: '上汽大众 (安亭) (0SVW)',
    costCenter: 'MP产品开发中心 (LA001)'
  },
  'vacant-cia': {
    id: 'vacant-cia',
    department: '管理与支持系统',
    title: 'CIA经理',
    occupant: '待招募',
    isEmpty: true,
    parentId: 'root',
    code: '60111045',
    externalId: '50093210',
    effectiveDate: '2025 年 3 月 1 日',
    standardPosition: '专业经理 (50091820)',
    company: '上汽大众 (8000)',
    hrSubarea: '安亭本部-SVW Anting (9001)',
    hrArea: '上汽大众 (安亭) (0SVW)',
    costCenter: '管理与支持系统控制中心 (LA002)'
  },
  'child1': {
    id: 'child1',
    department: 'MP 研发3',
    title: 'MP4-3项目经理',
    occupant: '孙洁 Sun Jie',
    avatar: 'SJ',
    parentId: 'root',
    code: '60111040',
    externalId: '50093191',
    effectiveDate: '2024 年 9 月 14 日',
    standardPosition: '项目经理 (50091819)',
    company: '上汽大众 (8000)',
    hrSubarea: '安亭本部-SVW Anting (9001)',
    hrArea: '上汽大众 (安亭) (0SVW)',
    costCenter: 'MP产品开发中心 (LA001)'
  },
  'child2': {
    id: 'child2',
    department: 'MP 研发1',
    title: 'MP4-1项目经理',
    occupant: '李铭 Li Ming',
    avatar: 'LM',
    parentId: 'root',
    childrenIds: ['g1', 'g2'],
    code: '60111041',
    externalId: '50093192',
    effectiveDate: '2024 年 9 月 14 日',
    standardPosition: '项目经理 (50091819)',
    company: '上汽大众 (8000)',
    hrSubarea: '安亭本部-SVW Anting (9001)',
    hrArea: '上汽大众 (安亭) (0SVW)',
    costCenter: 'MP产品开发中心 (LA001)'
  },
  'child3': {
    id: 'child3',
    department: 'MP 研发2',
    title: 'MP4-2项目经理',
    occupant: '岳海文 Yue Haiwen',
    avatar: 'YH',
    parentId: 'root',
    code: '60111042',
    externalId: '50093193',
    effectiveDate: '2024 年 9 月 14 日',
    standardPosition: '项目经理 (50091819)',
    company: '上汽大众 (8000)',
    hrSubarea: '安亭本部-SVW Anting (9001)',
    hrArea: '上汽大众 (安亭) (0SVW)',
    costCenter: 'MP产品开发中心 (LA001)'
  },
  'g1': {
    id: 'g1',
    department: 'MP 研发1',
    title: 'MP 专业经理',
    occupant: '何泽夏 He Zexia',
    avatar: 'HZ',
    parentId: 'child2',
    code: '60111043',
    externalId: '50093194',
    effectiveDate: '2024 年 9 月 14 日',
    standardPosition: '专业经理 (50091820)',
    company: '上汽大众 (8000)',
    hrSubarea: '安亭本部-SVW Anting (9001)',
    hrArea: '上汽大众 (安亭) (0SVW)',
    costCenter: 'MP产品开发中心 (LA001)'
  },
  'g2': {
    id: 'g2',
    department: 'MP 研发1',
    title: 'MP 车身附件开发...',
    occupant: '贾为健 Jia Weijian',
    avatar: 'JW',
    parentId: 'child2',
    code: '60111044',
    externalId: '50093195',
    effectiveDate: '2024 年 9 月 14 日',
    standardPosition: '专业经理 (50091820)',
    company: '上汽大众 (8000)',
    hrSubarea: '安亭本部-SVW Anting (9001)',
    hrArea: '上汽大众 (安亭) (0SVW)',
    costCenter: 'MP产品开发中心 (LA001)'
  }
};

// --- Reporting Relationship Mock Data ---

export interface PersonNode {
  id: string;
  name: string;
  enName?: string;
  title: string;
  count?: string;
  avatar: string | null;
  parentId?: string;
  subordinates?: PersonNode[];
}

// Flat list for easy upward traversal mapping
export const MOCK_PEOPLE: PersonNode[] = [
  {
    id: 'ceo',
    name: 'Oliver Blume',
    enName: '',
    title: 'Volkswagen AG CEO',
    count: '12 / 600000',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150&h=150',
  },
  {
    id: 'vgc-ceo',
    name: 'Ralf Brandstätter',
    enName: '',
    title: 'VGC CEO / Member of Board',
    count: '8 / 3500',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=150&h=150',
    parentId: 'ceo'
  },
  {
    id: 'vgc-hr',
    name: 'Stephan Mecha',
    enName: '',
    title: 'VGC HR Director',
    count: '15 / 200',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=150&h=150',
    parentId: 'vgc-ceo'
  },
  {
    id: 'm1',
    name: '李正阳',
    enName: 'Li Zhengyang',
    title: 'PMIF部门经理',
    count: '8 / 56',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=150&h=150',
    parentId: 'vgc-hr'
  },
  {
    id: 'm2',
    name: '徐炯',
    enName: 'Xu Jiong',
    title: 'PMIF-5经理',
    count: '11 / 17',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150&h=150',
    parentId: 'm1'
  },
  {
    id: 'm3',
    name: '张骏',
    enName: 'Zhang Jun',
    title: 'CIA-2经理',
    count: '6 / 6',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=150&h=150',
    parentId: 'm2'
  }
];

export const MOCK_SUBORDINATES: Record<string, PersonNode[]> = {
  'm3': [
    {
      id: 's1',
      name: '何家俊',
      enName: 'He',
      title: 'CIA-2道一开发',
      avatar: null,
      count: '2'
    },
    {
      id: 's2',
      name: '方兔斯基',
      enName: '',
      title: '项目经理',
      avatar: null,
      count: '5'
    },
    {
      id: 's3',
      name: '朱晨杰',
      enName: 'Zhu Chenjie',
      title: 'CIA-2系统分析员',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150&h=150',
    },
    {
      id: 's4',
      name: '梁敏琪',
      enName: 'liang',
      title: 'CIA-2道一开发',
      avatar: null,
    },
    {
      id: 's5',
      name: '沈文君',
      enName: 'Shen Wenjun',
      title: 'CIA-2系统分析员',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150&h=150',
    },
    {
      id: 's6',
      name: '沈燕华',
      enName: 'Shen Yanhua',
      title: 'CIA-2系统分析员',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=150&h=150',
    }
  ]
};
