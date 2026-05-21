import React from 'react';
import { UnifiedTodoPanel, TodoTab } from './dashboard/UnifiedTodoPanel';
import { CheckSquare } from 'lucide-react';

const MOCK_TODO_TABS: TodoTab[] = [
  {
    id: 'pending',
    label: '待办',
    tasks: [
      { 
        id: 't1', 
        title: '高级前端工程师 招聘需求审批', 
        type: '招聘', 
        date: '2024-03-25', 
        initials: 'BS',
        sourceSystem: '招聘管理',
        content: '申请招聘2名高级前端工程师，负责核心业务模块开发，期望5月1日前到岗。',
        targetView: 'job-postings',
        targetParams: { jobId: 'req-1' },
        details: {
          '需求名称': '高级前端工程师',
          '需求部门': '研发中心',
          '招聘人数': 2,
          '期望到岗日期': '2024-05-01',
          '申请人': '张三'
        }
      },
      { 
        id: 't2', 
        title: '2024年Q1部门团建费用报销申请', 
        type: '流程', 
        date: '2024-03-26', 
        initials: 'OA',
        sourceSystem: 'EC',
        content: '报销2024年Q1研发中心部门团建活动费用，共计5000元。',
        details: {
          '流程标题': '2024年Q1部门团建费用报销申请',
          '流程类型': '费用报销',
          '创建人': '李四',
          '节点名称': '部门经理审批',
          '接收时间': '2024-03-11 10:00'
        }
      },
      { 
        id: 't3', 
        title: '王五 晋升审批 (P5 -> P6)', 
        type: '审批', 
        date: '2024-03-24', 
        initials: 'SF',
        sourceSystem: 'SuccessFactors',
        content: '王五在过去一年表现优异，主导了多个核心项目，申请晋升至P6级别。',
        details: {
          '审批主题': '王五 晋升审批',
          '员工姓名': '王五',
          '业务类型': '晋升',
          '生效日期': '2024-04-01',
          '发起人': 'HRBP-赵六'
        }
      }
    ]
  },
  {
    id: 'done',
    label: '已办',
    tasks: [
      { 
        id: 'd1', 
        title: '完成 2023 年度年终绩效确认', 
        date: '2024-01-20', 
        type: 'Perf', 
        initials: 'PF',
        sourceSystem: '内部系统',
        processStatus: '已通过',
        details: {
          '考核周期': '2023年度',
          '考核对象': '全体员工',
          '确认时间': '2024-01-20 15:30'
        }
      }
    ]
  },
  {
    id: 'cc',
    label: '知会',
    tasks: [
      { 
        id: 'cc1', 
        title: '抄送：张三的入职申请已通过', 
        date: '2024-03-20', 
        type: '通知', 
        initials: 'CC',
        sourceSystem: 'EC',
        processStatus: '已通过',
        details: {
          '主题': '入职申请抄送',
          '申请人': '张三',
          '审批状态': '已通过'
        }
      },
      { 
        id: 'cc2', 
        title: '抄送：李四的请假申请处理中', 
        date: '2024-03-21', 
        type: '通知', 
        initials: 'CC',
        processStatus: '处理中'
      }
    ]
  },
  {
    id: 'my-apps',
    label: '创建',
    tasks: [
      { 
        id: 'm1', 
        title: '居住证积分续办申请', 
        date: '2024-03-01', 
        type: '申请', 
        initials: 'ES', 
        processStatus: '处理中' 
      },
      { 
        id: 'm2', 
        title: '收入证明开具申请', 
        date: '2024-03-05', 
        type: '申请', 
        initials: 'ES', 
        processStatus: '处理中' 
      }
    ]
  }
];

export const TodoView: React.FC<{ onNavigate?: (view: string, params?: any) => void; initialTab?: string }> = ({ onNavigate, initialTab }) => {
  return (
    <div className="animate-fade-in max-w-4xl mx-auto h-[calc(100vh-120px)] flex flex-col">
      <UnifiedTodoPanel 
        title="待办任务"
        icon={<CheckSquare size={24} />}
        tabs={MOCK_TODO_TABS}
        activeTab={initialTab}
        onProcessTasks={(ids, comment) => console.log('Process', ids, comment)}
        onNavigate={onNavigate}
        className="flex-1 shadow-sm border border-gray-100 rounded-xl"
      />
    </div>
  );
};
