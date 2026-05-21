
import { ReactNode } from 'react';

export interface NavItem {
  id: string;
  label: string;
  icon: ReactNode;
  subItems?: NavItem[];
}

export interface Employee {
  id: string;
  name: string;
  department: string;
  role: string;
  performanceScore: number;
  status: 'Active' | 'On Leave' | 'Probation';
  tags?: string[];
}

export interface TodoItem {
  id: string | number;
  title: string;
  subtitle?: string;
  date: string;
  type: string;
  initials: string;
  priority?: 'Low' | 'Medium' | 'High';
  daysPending?: number;
  color?: string;
  sourceSystem?: '招聘管理' | 'EC' | 'SuccessFactors' | '内部系统' | 'Employee Central' | '员工中心' | '绩效管理' | '人才盘点' | 'i-学习';
  details?: Record<string, string | number>;
  content?: string;
  targetView?: string;
  targetParams?: Record<string, any>;
  processStatus?: '已通过' | '处理中' | '驳回';
  steps?: string[];
}

export interface InternalApplication {
  id: string;
  candidateName: string;
  candidateId: string;
  currentDept: string;
  appliedPosition: string;
  appliedDept: string;
  applyDate: string;
  status: 'Screening' | 'DeptScreening' | 'Interview' | 'Evaluation' | 'Confirmed' | 'Rejected';
  interviewDate?: string;
  interviewer?: string;
  evaluationId?: string;
}

export interface EvalField {
  id: string;
  labelEn: string;
  labelZh: string;
  type: 'text' | 'textarea' | 'checkbox' | 'radio';
}

export interface EvaluationTemplate {
  id: string;
  name: string;
  positionCategory: string;
  description: string;
  fields: EvalField[];
  updatedAt: string;
}

export interface JobChangeLog {
  id: string;
  timestamp: string;
  operator: string;
  action: 'Create' | 'Edit' | 'Approve' | 'Reject' | 'Publish' | 'Pause' | 'Stop' | 'BatchImport';
  field?: string;
  oldValue?: string;
  newValue?: string;
  comment?: string;
}

export interface ApprovalStep {
  id: string;
  role: 'K3' | 'K2' | 'K1' | 'HRBP' | 'Recruiter' | 'System';
  name: string;
  status: 'Pending' | 'Approved' | 'Rejected' | 'Skipped';
  date?: string;
}

export interface JobRequirement {
  id: string;
  reqNumber: string;
  reqCode?: string;
  latestOpTime?: string;
  latestOpType?: string;
  applyTime?: string;
  title: string;
  externalTitle?: string;
  internalTitle?: string;
  standardTitle?: string;
  type: 'Internal' | 'External';
  department: string;
  category?: string;
  r1Code?: string;
  r2Code?: string;
  r3Code?: string;
  requester: string;
  originatorName?: string;
  hrbpName?: string;
  hrbpEmail?: string;
  recruiterName?: string;
  hiringManager?: string;
  interviewerName?: string;
  recruitmentType?: string;
  laborType?: string;
  workNature?: string;
  jobLevel?: string;
  location: string;
  workPlace?: string;
  workPlaceDetails?: string;
  education?: string;
  major?: string;
  keywords?: string[];
  otherRequirements?: string;
  nonExternalNotes?: string;
  headcount: number;
  filledCount: number;
  status: 'Draft' | 'Approving' | 'Published' | 'Paused' | 'Closed';
  startDate?: string;
  expectedDate?: string;
  publishDate?: string;
  createDate: string;
  description: string;
  requirements: string;
  salaryRange: string;
  approvalFlow: ApprovalStep[];
  logs: JobChangeLog[];
}

export interface JobPosting {
  id: string;
  title: string;
  department: string;
  applicants: number;
  status: 'Published' | 'Draft' | 'Closed';
  publishDate: string;
  beisenStats?: {
    interviewing: number;
    passed: number;
    offerSent: number;
    offerConfirmed: number;
  };
}

export interface Candidate {
  id: string;
  name: string;
  gender: string;
  age: number;
  degree: string;
  experience: string;
  latestScreener: string;
  applyDate: string;
  status: 'Initial' | 'DeptScreening' | 'WrittenTest' | 'FirstInterview' | 'SecondInterview' | 'Offer';
}

export interface TalentTag {
  id: string;
  name: string;
  category: 'Performance' | 'Skill' | 'Potential' | 'General';
  color: string;
  description?: string;
  count?: number;
}

export interface Talent {
  id: string;
  name: string;
  age: number;
  gender: string;
  phone: string;
  email: string;
  position: string;
  department: string;
  location: string;
  performance: string;
  assessmentScore: number;
  potential: string;
  tags: string[];
  education: any[];
  workHistory: any[];
  family: any[];
}
