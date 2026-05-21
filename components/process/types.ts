export interface ProcessCategory {
  id: string;
  name: string;
  icon?: string;
  count?: number;
  color?: string;
}

export interface ProcessTemplate {
  id: string;
  categoryId: string;
  name: string;
  description?: string;
  icon?: string;
  color?: string;
}

export interface BPMTask {
  id: string;
  categoryId: string;
  category: string; // Added field
  title: string;
  processName: string;
  requester: string;
  applicant: string; // Added field
  requestTime: string;
  status: 'Pending' | 'InProgress' | 'Completed' | 'Rejected';
  priority: 'Low' | 'Medium' | 'High';
  content?: string;
  isRead?: boolean;
  targetView?: string;
  targetParams?: any;
}

export const PROCESS_CATEGORIES: ProcessCategory[] = [
  { id: 'info', name: '信息', count: 0 },
  { id: 'process', name: '办理', count: 4, color: 'text-blue-600 bg-blue-50' },
  { id: 'protection', name: '保障', count: 0 },
  { id: 'survey', name: '调研', count: 0 },
  { id: '0', name: '绩效评估', count: 0 },
  { id: '2', name: '360度评估', count: 0 },
  { id: '12', name: '校准会话', count: 0 },
  { id: '14', name: 'HRIS变更', count: 0 },
  { id: '58', name: '开始完成您的档案', count: 0 },
  { id: '53', name: '完成新录用员工任务', count: 0 },
  { id: '54', name: '提供入职文件的数据', count: 0 },
  { id: '55', name: '完成其他入职任务', count: 0 },
];

export const PROCESS_TEMPLATES: ProcessTemplate[] = [
  // 办理 (Process)
  { id: 'pt-cert', categoryId: 'process', name: '证明开具', description: '在职证明', color: 'bg-blue-100 text-blue-600' },
  { id: 'pt-residence', categoryId: 'process', name: '居住证积分', description: '申请续签', color: 'bg-red-100 text-red-600' },
  { id: 'pt-resume', categoryId: 'process', name: '复工申请', description: '销假', color: 'bg-teal-100 text-teal-600' },
  { id: 'pt-seal', categoryId: 'process', name: '印章申请', description: '用印审批', color: 'bg-slate-100 text-slate-600' },
  
  // Others (placeholders)
  { id: 'pt-info-1', categoryId: 'info', name: '个人信息修改', description: '修改基本信息' },
  { id: 'pt-prot-1', categoryId: 'protection', name: '社保公积金', description: '查询及变更' },
  { id: 'pt-surv-1', categoryId: 'survey', name: '满意度调查', description: '年度员工调研' },
];
