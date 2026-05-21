
import React from 'react';

// --- Interfaces ---

export type GridLevel = 'Low' | 'Mid' | 'High';

export interface NineBoxConfigItem {
  id: string;
  x: number; // 0-2 (Performance: Low, Mid, High)
  y: number; // 0-2 (Potential: Low, Mid, High)
  name: string;
  colorHex: string; // Standard Web Hex for UI
  description?: string;
}

export interface AxisMappingRule {
  level: GridLevel;
  values: string[]; // e.g. ["S", "A"] or ["80-100"]
}

export interface MappingConfig {
  performance: AxisMappingRule[];
  potential: AxisMappingRule[];
}

export interface DataSourceConfig {
  startDate: string; // Review Period Start
  endDate: string;   // Review Period End
  scope: string[];   // List of group IDs or names
  evalStartDate: string; // Evaluation Data Period Start
  evalEndDate: string;   // Evaluation Data Period End
}

export interface ModificationLog {
  id: string;
  timestamp: string;
  employeeName: string;
  employeeId: string;
  fromBox: string;
  toBox: string;
  changeType: 'Single Axis' | 'Cross Axis' | 'Succession Tier';
  reason: string;
}

export interface IssueItem {
  id: string;
  issue: string;
  action: string;
  isCompleted: boolean;
}

export interface ReviewEmployee {
  id: string;
  name: string;
  position: string;
  dept: string;
  performance: string; // Value to be mapped (e.g. "S", "A", "95")
  potential: string;   // Value to be mapped (e.g. "High", "A", "90")
  history?: { year: string, performance: string, potential: string }[];
}

export interface Successor {
  id: string;
  name: string;
  avatar?: string;
  readiness: string;
  fit: number;
  currentTitle: string;
  age: number;
  location: string;
  mobility: string; 
  languages: string[];
  education: { degree: string; school: string; major: string }[];
  performanceHistory: string[]; 
  retentionRisk: 'Low' | 'Medium' | 'High';
}

export interface PositionPlan {
  id: number;
  position: string;
  incumbent: string;
  risk: 'Low' | 'Medium' | 'High';
  successors: Successor[];
}

// --- Mock Data ---

export const mockReviewEmployees: ReviewEmployee[] = [
  { id: 'E1', name: '李明', position: '高级开发', dept: '研发部', performance: 'S', potential: 'High' },
  { id: 'E2', name: '王芳', position: 'UI设计', dept: '设计部', performance: 'A', potential: 'High' },
  { id: 'E3', name: '陈静', position: '产品经理', dept: '产品部', performance: 'A', potential: 'High' },
  { id: 'E4', name: '吴强', position: '架构师', dept: '研发部', performance: 'A', potential: 'High' },
  { id: 'E5', name: '张伟', position: '技术专家', dept: '研发部', performance: 'S', potential: 'Medium' },
  { id: 'E6', name: '李四', position: '测试主管', dept: '测试部', performance: 'S', potential: 'Medium' },
  { id: 'E7', name: '赵强', position: '高级测试', dept: '测试部', performance: 'A', potential: 'Medium' },
  { id: 'E8', name: '钱七', position: '运维经理', dept: '运维部', performance: 'A', potential: 'Medium' },
  { id: 'E9', name: '孙八', position: 'HRBP', dept: '人力资源', performance: 'A', potential: 'Medium' },
  { id: 'E10', name: '郑秀', position: '销售经理', dept: '销售部', performance: 'B', potential: 'High' },
  { id: 'E11', name: '周一', position: '开发工程师', dept: '研发部', performance: 'B', potential: 'Medium' },
  { id: 'E12', name: '吴二', position: '前端开发', dept: '研发部', performance: 'B', potential: 'Medium' },
  { id: 'E13', name: '郑三', position: '行政专员', dept: '行政部', performance: 'B', potential: 'Medium' },
  { id: 'E14', name: '王五', position: '财务专员', dept: '财务部', performance: 'B', potential: 'Medium' },
  { id: 'E15', name: '刘六', position: '法务', dept: '法务部', performance: 'B', potential: 'Medium' },
  { id: 'E16', name: '陈七', position: '采购', dept: '采购部', performance: 'B', potential: 'Medium' },
  { id: 'E17', name: '张八', position: '客服', dept: '客服部', performance: 'B', potential: 'Medium' },
  { id: 'E18', name: '李九', position: '销售', dept: '销售部', performance: 'B', potential: 'Medium' },
  { id: 'E19', name: '周十', position: '实习生', dept: '研发部', performance: 'C', potential: 'Medium' },
  { id: 'E20', name: '吴十一', position: '实习生', dept: '产品部', performance: 'C', potential: 'Medium' },
  { id: 'E21', name: '陈志', position: '初级开发', dept: '研发部', performance: 'D', potential: 'Low' },
  { id: 'E22', name: '王零', position: '助理', dept: '行政部', performance: 'C', potential: 'High' }, // Dilemma
  { id: 'E23', name: '张负', position: '销售', dept: '销售部', performance: 'B', potential: 'Low' },
  { id: 'E24', name: '李正', position: '开发', dept: '研发部', performance: 'B', potential: 'Low' },
  { id: 'E25', name: '赵哈', position: 'HR', dept: '人力资源', performance: 'B', potential: 'Low' },
  { id: 'E26', name: '钱嘻', position: '财务', dept: '财务部', performance: 'B', potential: 'Low' },
  { id: 'E27', name: '孙呼', position: '前台', dept: '行政部', performance: 'B', potential: 'Low' },
];

export const initialSuccessionData: PositionPlan[] = [
  { 
    id: 1, 
    position: '技术总监 (CTO)', 
    incumbent: '张总', 
    risk: 'Low',
    successors: [
      { 
        id: 'S1', 
        name: '李明', 
        readiness: '一档 (Ready Now)', 
        fit: 95,
        currentTitle: '高级架构师',
        age: 34,
        location: '北京',
        mobility: '全球派遣 (Globally Mobile)',
        languages: ['中文 (母语)', '英语 (流利)'],
        education: [{ degree: '硕士', school: '清华大学', major: '计算机科学' }],
        performanceHistory: ['S', 'S', 'A'],
        retentionRisk: 'Low'
      },
      { 
        id: 'S2', 
        name: '王强', 
        readiness: '二档 (Ready Future)', 
        fit: 85,
        currentTitle: '研发经理',
        age: 31,
        location: '上海',
        mobility: '区域内派遣 (Regional)',
        languages: ['中文 (母语)', '英语 (工作)'],
        education: [{ degree: '本科', school: '上海交通大学', major: '软件工程' }],
        performanceHistory: ['A', 'A', 'A'],
        retentionRisk: 'Medium'
      }
    ]
  },
  { 
    id: 2, 
    position: '产品副总裁 (VP Product)', 
    incumbent: '刘总', 
    risk: 'Medium',
    successors: [
      { 
        id: 'S3', 
        name: '赵敏', 
        readiness: '二档 (Ready Future)', 
        fit: 88,
        currentTitle: '产品总监',
        age: 35,
        location: '深圳',
        mobility: '不可调动 (Restricted)',
        languages: ['中文 (母语)', '日语 (流利)'],
        education: [{ degree: 'MBA', school: '中欧商学院', major: '工商管理' }],
        performanceHistory: ['S', 'A', 'A'],
        retentionRisk: 'Low'
      }
    ]
  },
  { 
    id: 3, 
    position: '销售总监 (Sales Director)', 
    incumbent: '王总', 
    risk: 'High',
    successors: [] // Empty for Risk Scan demo
  },
];

export const DEFAULT_GRID_CONFIG: NineBoxConfigItem[] = [
  // High Potential (y=2)
  { id: '1', x: 0, y: 2, name: '未来之星 (High Potential)', colorHex: '#ecfdf5' }, // green-50
  { id: '2', x: 1, y: 2, name: '超级明星 (Super Star)', colorHex: '#d1fae5' }, // green-100
  { id: '3', x: 2, y: 2, name: '高绩效专家 (High Pro)', colorHex: '#ecfdf5' }, // green-50
  // Mid Potential (y=1)
  { id: '4', x: 0, y: 1, name: '潜力骨干 (Potential Gem)', colorHex: '#fefce8' }, // yellow-50
  { id: '5', x: 1, y: 1, name: '核心骨干 (Core Employee)', colorHex: '#eff6ff' }, // blue-50
  { id: '6', x: 2, y: 1, name: '熟练工 (Effective)', colorHex: '#fefce8' }, // yellow-50
  // Low Potential (y=0)
  { id: '7', x: 0, y: 0, name: '需要关注 (Dilemma)', colorHex: '#fff7ed' }, // orange-50
  { id: '8', x: 1, y: 0, name: '不一致 (Inconsistent)', colorHex: '#fefce8' }, // yellow-50
  { id: '9', x: 2, y: 0, name: '不合格 (Under Performer)', colorHex: '#fef2f2' }, // red-50
];

export const DEFAULT_MAPPING: MappingConfig = {
  performance: [
    { level: 'High', values: ['S', 'A+', '90-100'] },
    { level: 'Mid', values: ['A', 'B+', 'B', '70-89'] },
    { level: 'Low', values: ['C', 'D', '0-69'] }
  ],
  potential: [
    { level: 'High', values: ['High', 'A'] },
    { level: 'Mid', values: ['Medium', 'B'] },
    { level: 'Low', values: ['Low', 'C'] }
  ]
};

export const DEFAULT_DATA_SOURCE: DataSourceConfig = {
  startDate: '2024-03-01', // Review Period Start (Current Cycle)
  endDate: '2024-03-31',   // Review Period End
  scope: ['研发中心', '产品部'],
  evalStartDate: '2023-01-01', // Evaluation Data Source Start (e.g., Last Year)
  evalEndDate: '2023-12-31',   // Evaluation Data Source End
};

// Helper to get or generate a full profile from just a name
export const findOrGenerateProfile = (name: string): Successor => {
    // 1. Search in existing succession plans
    for (const plan of initialSuccessionData) {
        const found = plan.successors.find(s => s.name === name);
        if (found) return found;
    }
    // 3. Fallback generator
    return {
        id: `TR-${name}`,
        name: name,
        readiness: '二档 (Ready Future)',
        fit: 75 + Math.floor(Math.random() * 20),
        currentTitle: '高级员工',
        age: 25 + Math.floor(Math.random() * 15),
        location: '总部',
        mobility: '区域内派遣 (Regional)',
        languages: ['中文', '英语'],
        education: [{ degree: '本科', school: 'XX大学', major: '管理学' }],
        performanceHistory: ['A', 'B', 'B'],
        retentionRisk: 'Medium'
    };
}
