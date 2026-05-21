
import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'zh' | 'en';

const translations = {
  zh: {
    menu: {
      dashboard: '工作台',
      stage_workspace: 'Stage 智能空间',
      my_workspace: '我的空间配置',
      dash_employee: '员工工作台',
      dash_manager: '经理工作台',
      dash_hrssc: 'HRSSC工作台',
      dash_hrbp: 'HRBP工作台',
      dash_coe: 'COE工作台',
      organization: '组织架构',
      recruitment_management: '招聘管理',
      recruitment_progress: '招聘进度追踪',
      position_requirements: '年度招聘计划',
      recruitment_requirements_v2: '外招需求管理',
      recruitment_internal_req: '内招需求管理',
      candidate_screening: '候选人筛选',
      internal_mgmt: '内招管理',
      internal_job_board: '内部招聘岗位',
      external_recruitment: '外部招聘',
      position_management: '职位需求',
      candidate_management: '候选人管理',
      talent_pool: '人才库',
      onboarding: '员工入职',
      personnel: '个人信息维护',
      attendance: '考勤管理',
      attendance_query: '打卡查询',
      leave_extension: '假期延长申请及查询',
      monthly_attendance: '月度考勤提交',
      performance: '继任发展',
      talent_review: '人才盘点',
      succession_planning: '继任计划',
      talent_tags: '人才库(内)',
      talent_search: '人才搜索',
      promotion: '晋升管理',
      training: '培训中心',
      learning: '学习与培训',
      reports: '统计报告',
      
      // System Management
      system_management: '系统管理',
      app_center: '企业应用中心',
      permission_mgmt: '权限管理',
      view_config: '视图配置',
      message_templates: '消息模版',
      recruitment_query: '招聘回传查询',
      api_logs: '接口日志',
      operation_logs: '操作日志',
      message_center: '消息中心',
      auth_mgmt: '认证管理',
      system_monitor: '系统监控',

      logout: '退出登录',
      main_menu: '主菜单'
    },
    header: {
      search_placeholder: '搜索功能或员工...',
      admin: '管理员'
    },
    dashboard: {
      my_leave: '我的年假档案',
      legal_leave: '2024年法定年假15天',
      remaining: '剩余年假',
      used: '已休年假',
      todo_list: '待办事项',
      pending_approval: '待审批',
      pending_submission: '待提交',
      pending_review: '待阅示',
      handle: '办理',
      announcement: '公告',
      project_name: '项目名称',
      status: '项目状态',
      assignee: '责任人',
      not_started: '未开始',
      in_progress: '进行中',
      completed: '已完成',
      more: '更多',
      quick_actions: {
        onboarding: '员工入职',
        recruitment: '招聘发布',
        contract: '合同续签',
        development: '人才发展',
        certificate: '工作证明',
        training: '学习培训'
      },
      categories: {
        recommend: '首推',
        upgrade: '升级',
        security: '安全',
        salary: '薪资',
        other: '其他'
      }
    },
    common: {
      loading: '加载中...',
      success: '成功',
      error: '错误',
      confirm: '确认',
      cancel: '取消'
    }
  },
  en: {
    menu: {
      dashboard: 'Workspace',
      stage_workspace: 'Stage Workspace',
      my_workspace: 'Workspace Settings',
      dash_employee: 'Employee',
      dash_manager: 'Manager',
      dash_hrssc: 'HRSSC',
      dash_hrbp: 'HRBP',
      dash_coe: 'COE',
      organization: 'Organization',
      recruitment_management: 'Recruitment Mgmt',
      recruitment_progress: 'Recruitment Progress',
      position_requirements: 'Annual Plan',
      recruitment_requirements_v2: 'Ext. Recruitment Reqs',
      recruitment_internal_req: 'Int. Recruitment Reqs',
      internal_job_board: 'Internal Job Openings',
      candidate_screening: 'Screening',
      internal_mgmt: 'Internal Mgmt',
      external_recruitment: 'External Hiring',
      position_management: 'Job Mgmt',
      candidate_management: 'Candidate Mgmt',
      talent_pool: 'Talent Pool',
      onboarding: 'Onboarding',
      personnel: 'Profile Maintenance',
      attendance: 'Attendance',
      attendance_query: 'Clock-in Query',
      leave_extension: 'Leave Extension',
      monthly_attendance: 'Monthly Submission',
      performance: 'Succession & Development',
      talent_review: 'Talent Review',
      succession_planning: 'Succession',
      talent_tags: 'Talent Pool (Int)',
      talent_search: 'Talent Search',
      promotion: 'Promotion',
      training: 'Training Center',
      reports: 'Reports',

      // System Management
      system_management: 'System Admin',
      app_center: 'App Center',
      permission_mgmt: 'Permissions',
      view_config: 'View Config',
      message_templates: 'Message Templates',
      recruitment_query: 'Recruitment Query',
      api_logs: 'API Logs',
      operation_logs: 'Audit Logs',
      message_center: 'Message Center',
      auth_mgmt: 'Auth Mgmt',
      system_monitor: 'Monitoring',

      logout: 'Logout',
      main_menu: 'MAIN MENU'
    },
    header: {
      search_placeholder: 'Search features or employees...',
      admin: 'Admin'
    },
    dashboard: {
      my_leave: 'My Leave Profile',
      legal_leave: '15 Days Annual Leave (2024)',
      remaining: 'Remaining',
      used: 'Used',
      todo_list: 'To-Do List',
      pending_approval: 'Pending Approval',
      pending_submission: 'Pending Submission',
      pending_review: 'Pending Review',
      handle: 'Handle',
      announcement: 'News',
      project_name: 'Project Name',
      status: 'Status',
      assignee: 'Assignee',
      not_started: 'Not Started',
      in_progress: 'In Progress',
      completed: 'Completed',
      more: 'More',
      quick_actions: {
        onboarding: 'Onboarding',
        recruitment: 'Job Post',
        contract: 'Renew Contract',
        development: 'Development',
        certificate: 'Certificate',
        training: 'Training'
      },
      categories: {
        recommend: 'Top',
        upgrade: 'Update',
        security: 'Security',
        salary: 'Salary',
        other: 'Other'
      }
    },
    common: {
      loading: 'Loading...',
      success: 'Success',
      error: 'Error',
      confirm: 'Confirm',
      cancel: 'Cancel'
    }
  }
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('zh');

  const t = (key: string): string => {
    const keys = key.split('.');
    let value: any = translations[language];
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k as keyof typeof value];
      } else {
        return key; // Fallback to key if not found
      }
    }
    
    return typeof value === 'string' ? value : key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
