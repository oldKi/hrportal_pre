
import React, { useState, useEffect } from 'react';
import { 
  Users, 
  ClipboardList, 
  ScanLine, 
  Download, 
  Plus, 
  AlertCircle, 
  Edit2, 
  X, 
  CheckCircle2, 
  AlertTriangle,
  Search,
  RotateCcw,
  Trash2,
  EyeOff,
  UserPlus,
  MapPin,
  BookOpen,
  GraduationCap,
  Award,
  Shuffle,
  History,
  MoreHorizontal,
  FileText,
  Printer
} from 'lucide-react';
import { 
  PositionPlan, 
  Successor, 
  ModificationLog, 
  IssueItem, 
  ReviewEmployee, 
  initialSuccessionData,
  mockReviewEmployees 
} from './types';

// --- Shared Helper Components for Succession ---

const UserAvatar: React.FC<{ name: string; size?: number; className?: string }> = ({ name, size = 32, className = '' }) => {
  return (
    <div 
      className={`rounded-full flex items-center justify-center font-bold text-xs ${className}`}
      style={{ width: size, height: size }}
    >
      {name.charAt(0)}
    </div>
  );
};

const renderReadinessLight = (readiness: string, onClick?: () => void) => {
  let colorClass = 'bg-gray-300';
  let text = '未评级';
  
  if (readiness.includes('Ready Now') || readiness.includes('一档')) {
      colorClass = 'bg-green-500';
      text = '一档';
  } else if (readiness.includes('Ready Future') || readiness.includes('二档')) {
      colorClass = 'bg-yellow-500';
      text = '二档';
  } else {
      colorClass = 'bg-red-500';
      text = '三档';
  }

  return (
      <div 
        className={`flex items-center space-x-2 bg-gray-50 px-2 py-1 rounded border border-gray-100 w-fit ${onClick ? 'cursor-pointer hover:bg-gray-100 hover:border-blue-300 transition-colors' : ''}`}
        onClick={onClick}
        title={onClick ? "点击修改准备度" : ""}
      >
          <div className={`w-2.5 h-2.5 rounded-full ${colorClass} shadow-sm`}></div>
          <span className="text-xs font-medium text-gray-700">{text}</span>
          {onClick && <Edit2 size={10} className="text-gray-400 ml-1" />}
      </div>
  );
};

const getTier = (r: string) => {
  if (r.includes('一档') || r.includes('Ready Now')) return 1;
  if (r.includes('二档') || r.includes('Ready Future')) return 2;
  return 3;
};

// --- Modals ---

// Detailed Resume Modal matching the specific "Manager Basic Info" PDF layout
const ManagerProfileModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  successor: Successor | null;
}> = ({ isOpen, onClose, successor }) => {
  if (!isOpen || !successor) return null;

  // Mock detailed data that isn't in the basic Successor type
  const profile = {
    ...successor,
    idNum: '10000',
    gender: '男',
    dob: '1989/05/20',
    ethnicity: '汉族',
    hometown: '江苏苏州',
    politics: '中共党员',
    partyDate: '2015/06',
    birthplace: '上海',
    marital: '已婚',
    workDate: '2012/07/20',
    title: '高级工程师',
    currentPos: `${successor.location} - ${successor.currentTitle}`,
    perf2024: 'A',
    perf2023: 'A',
    perf2022: 'B+',
    education: [
       { start: '2007/09', end: '2011/07', type: '全日制', school: '同济大学', major: '车辆工程', degree: '本科', degreeName: '工学学士', role: '班长' },
       { start: '2011/09', end: '2014/03', type: '全日制', school: '上海交通大学', major: '机械工程', degree: '硕士研究生', degreeName: '工学硕士', role: '研会主席' }
    ],
    work: [
       { start: '2014/04', end: '2016/05', dept: '产品研发部', pos: '工程师' },
       { start: '2016/05', end: '2019/12', dept: '底盘工程部', pos: '高级工程师' },
       { start: '2019/12', end: '2022/06', dept: '项目管理部', pos: '项目经理' },
       { start: '2022/06', end: '至今', dept: successor.location, pos: successor.currentTitle }
    ],
    family: [
       { relation: '配偶', name: '王丽', birth: '1990/08', politics: '群众', company: '某外资企业', job: '会计' },
       { relation: '女儿', name: '李小小', birth: '2018/01', politics: '-', company: '-', job: '-' }
    ]
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
       <div className="bg-white shadow-2xl w-full max-w-5xl my-8 animate-scale-up print:shadow-none print:w-full flex flex-col max-h-[95vh]">
          {/* Toolbar */}
          <div className="flex justify-between items-center p-4 border-b border-gray-200 bg-gray-50 print:hidden shrink-0">
             <h3 className="font-bold text-gray-800 flex items-center">
                <FileText size={18} className="mr-2 text-blue-600"/> 个人履历表
             </h3>
             <div className="flex space-x-3">
                <button className="flex items-center px-3 py-1.5 text-gray-600 hover:bg-gray-200 rounded text-sm transition-colors">
                   <Printer size={16} className="mr-1"/> 打印
                </button>
                <button onClick={onClose} className="p-1 hover:bg-gray-200 rounded-full transition-colors">
                   <X size={20} className="text-gray-500"/>
                </button>
             </div>
          </div>

          {/* Form Content - Replicating the PDF Layout */}
          <div className="p-8 md:p-12 overflow-y-auto bg-white flex-1 custom-scrollbar">
             
             {/* Header */}
             <div className="flex justify-between items-end mb-6 relative">
                <div className="absolute top-0 right-0 text-right">
                   <div className="text-xl font-bold text-gray-400 italic">SAIC VOLKSWAGEN</div>
                   <div className="text-sm font-bold text-gray-800">上汽大众</div>
                </div>
                <h1 className="text-2xl md:text-3xl font-bold text-center w-full mt-8 mb-4 tracking-widest text-gray-900">
                   上汽大众经理基本信息表
                </h1>
             </div>

             {/* Main Table */}
             <div className="border-2 border-black">
                <table className="w-full border-collapse text-sm text-center">
                   <colgroup>
                      <col className="w-[4%]" />
                      <col className="w-[10%]" />
                      <col className="w-[14%]" />
                      <col className="w-[10%]" />
                      <col className="w-[14%]" />
                      <col className="w-[10%]" />
                      <col className="w-[14%]" />
                      <col className="w-[14%]" />
                   </colgroup>
                   <tbody>
                      {/* Basic Info Section */}
                      <tr className="border-b border-black">
                         <td rowSpan={5} className="border-r border-black font-bold py-4 px-2 bg-gray-50 writing-vertical-lr text-center align-middle">基本信息</td>
                         <td className="border-r border-black border-b border-gray-300 py-2 bg-gray-50 font-bold">姓 名</td>
                         <td className="border-r border-black border-b border-gray-300 py-2">{profile.name}</td>
                         <td className="border-r border-black border-b border-gray-300 py-2 bg-gray-50 font-bold">工 号</td>
                         <td className="border-r border-black border-b border-gray-300 py-2">{profile.idNum}</td>
                         <td className="border-r border-black border-b border-gray-300 py-2 bg-gray-50 font-bold">性 别</td>
                         <td className="border-r border-black border-b border-gray-300 py-2">{profile.gender}</td>
                         <td rowSpan={4} className="p-1 align-middle">
                            <div className="w-full h-32 bg-gray-100 flex items-center justify-center text-gray-400 border border-gray-200">
                               照片
                            </div>
                         </td>
                      </tr>
                      <tr className="border-b border-black">
                         <td className="border-r border-black border-b border-gray-300 py-2 bg-gray-50 font-bold">出生日期</td>
                         <td className="border-r border-black border-b border-gray-300 py-2">{profile.dob}</td>
                         <td className="border-r border-black border-b border-gray-300 py-2 bg-gray-50 font-bold">民 族</td>
                         <td className="border-r border-black border-b border-gray-300 py-2">{profile.ethnicity}</td>
                         <td className="border-r border-black border-b border-gray-300 py-2 bg-gray-50 font-bold">籍 贯</td>
                         <td className="border-r border-black border-b border-gray-300 py-2">{profile.hometown}</td>
                      </tr>
                      <tr className="border-b border-black">
                         <td className="border-r border-black border-b border-gray-300 py-2 bg-gray-50 font-bold">政治面貌</td>
                         <td className="border-r border-black border-b border-gray-300 py-2">{profile.politics}</td>
                         <td className="border-r border-black border-b border-gray-300 py-2 bg-gray-50 font-bold">入党年月</td>
                         <td className="border-r border-black border-b border-gray-300 py-2">{profile.partyDate}</td>
                         <td className="border-r border-black border-b border-gray-300 py-2 bg-gray-50 font-bold">出生地</td>
                         <td className="border-r border-black border-b border-gray-300 py-2">{profile.birthplace}</td>
                      </tr>
                      <tr className="border-b border-black">
                         <td className="border-r border-black border-b border-black py-2 bg-gray-50 font-bold">婚姻状况</td>
                         <td className="border-r border-black border-b border-black py-2">{profile.marital}</td>
                         <td className="border-r border-black border-b border-black py-2 bg-gray-50 font-bold">参加工作时间</td>
                         <td className="border-r border-black border-b border-black py-2">{profile.workDate}</td>
                         <td className="border-r border-black border-b border-black py-2 bg-gray-50 font-bold">职 称</td>
                         <td className="border-r border-black border-b border-black py-2">{profile.title}</td>
                      </tr>
                      <tr className="border-b border-black">
                         <td className="border-r border-black py-2 bg-gray-50 font-bold">现任岗位</td>
                         <td colSpan={6} className="py-2 text-left px-4 font-bold">{profile.currentPos}</td>
                      </tr>

                      {/* Performance Section */}
                      <tr className="border-b border-black bg-gray-50 font-bold text-xs">
                         <td colSpan={2} className="border-r border-black py-1">2024年绩效</td>
                         <td className="border-r border-black py-1">{profile.perf2024}</td>
                         <td colSpan={2} className="border-r border-black py-1">2023年绩效</td>
                         <td className="border-r border-black py-1">{profile.perf2023}</td>
                         <td className="border-r border-black py-1">2022年绩效</td>
                         <td className="py-1">{profile.perf2022}</td>
                      </tr>

                      {/* Education Section */}
                      <tr className="border-b border-black">
                         <td rowSpan={profile.education.length + 1} className="border-r border-black font-bold py-4 px-2 bg-gray-50 writing-vertical-lr align-middle">教育信息</td>
                         <td className="border-r border-black border-b border-gray-300 py-1 bg-gray-50 font-bold">开始时间</td>
                         <td className="border-r border-black border-b border-gray-300 py-1 bg-gray-50 font-bold">结束时间</td>
                         <td className="border-r border-black border-b border-gray-300 py-1 bg-gray-50 font-bold">学历途径</td>
                         <td className="border-r border-black border-b border-gray-300 py-1 bg-gray-50 font-bold">毕业院校</td>
                         <td className="border-r border-black border-b border-gray-300 py-1 bg-gray-50 font-bold">专 业</td>
                         <td className="border-r border-black border-b border-gray-300 py-1 bg-gray-50 font-bold">学 历</td>
                         <td className="border-b border-gray-300 py-1 bg-gray-50 font-bold">学位 / 职务</td>
                      </tr>
                      {profile.education.map((edu, idx) => (
                         <tr key={idx} className="border-b border-black">
                            <td className="border-r border-black border-b border-gray-200 py-2">{edu.start}</td>
                            <td className="border-r border-black border-b border-gray-200 py-2">{edu.end}</td>
                            <td className="border-r border-black border-b border-gray-200 py-2">{edu.type}</td>
                            <td className="border-r border-black border-b border-gray-200 py-2">{edu.school}</td>
                            <td className="border-r border-black border-b border-gray-200 py-2">{edu.major}</td>
                            <td className="border-r border-black border-b border-gray-200 py-2">{edu.degree}</td>
                            <td className="border-b border-gray-200 py-2">{edu.degreeName} <span className="text-gray-400">|</span> {edu.role}</td>
                         </tr>
                      ))}

                      {/* Work History Section */}
                      <tr className="border-b border-black">
                         <td rowSpan={profile.work.length + 1} className="border-r border-black font-bold py-4 px-2 bg-gray-50 writing-vertical-lr align-middle">履历信息</td>
                         <td className="border-r border-black border-b border-gray-300 py-1 bg-gray-50 font-bold">开始时间</td>
                         <td className="border-r border-black border-b border-gray-300 py-1 bg-gray-50 font-bold">结束时间</td>
                         <td colSpan={3} className="border-r border-black border-b border-gray-300 py-1 bg-gray-50 font-bold">部 门</td>
                         <td colSpan={2} className="border-b border-gray-300 py-1 bg-gray-50 font-bold">职 务</td>
                      </tr>
                      {profile.work.map((w, idx) => (
                         <tr key={idx} className="border-b border-black">
                            <td className="border-r border-black border-b border-gray-200 py-2">{w.start}</td>
                            <td className="border-r border-black border-b border-gray-200 py-2">{w.end}</td>
                            <td colSpan={3} className="border-r border-black border-b border-gray-200 py-2 text-left px-4">{w.dept}</td>
                            <td colSpan={2} className="border-b border-gray-200 py-2">{w.pos}</td>
                         </tr>
                      ))}

                      {/* Spacer Row for Party Work (Empty as in PDF usually if not applicable) */}
                      <tr className="border-b border-black">
                         <td className="border-r border-black font-bold py-8 px-2 bg-gray-50 writing-vertical-lr align-middle">党务工作经历</td>
                         <td colSpan={2} className="border-r border-black align-middle text-gray-300">/</td>
                         <td colSpan={5} className="align-middle text-gray-300">/</td>
                      </tr>

                      {/* Rewards Section (Empty as in PDF usually if not applicable) */}
                      <tr className="border-b border-black">
                         <td className="border-r border-black font-bold py-8 px-2 bg-gray-50 writing-vertical-lr align-middle">奖惩情况</td>
                         <td className="border-r border-black py-2 bg-gray-50 font-bold">日 期</td>
                         <td colSpan={2} className="border-r border-black py-2 bg-gray-50 font-bold">项 目</td>
                         <td className="border-r border-black py-2 bg-gray-50 font-bold">团体/个人</td>
                         <td colSpan={3} className="py-2 bg-gray-50 font-bold">奖惩单位</td>
                      </tr>
                      <tr className="border-b border-black">
                         <td className="border-r border-black font-bold bg-gray-50"></td>
                         <td className="border-r border-black py-2">2023</td>
                         <td colSpan={2} className="border-r border-black py-2">年度优秀员工</td>
                         <td className="border-r border-black py-2">个人</td>
                         <td colSpan={3} className="py-2">上汽大众汽车有限公司</td>
                      </tr>

                      {/* Contact Section */}
                      <tr className="border-b border-black">
                         <td rowSpan={2} className="border-r border-black font-bold py-4 px-2 bg-gray-50 writing-vertical-lr align-middle">联系方式</td>
                         <td className="border-r border-black border-b border-gray-300 py-2 bg-gray-50 font-bold">手机号码</td>
                         <td colSpan={3} className="border-r border-black border-b border-gray-300 py-2 text-left px-4 font-mono">13812345678</td>
                         <td className="border-r border-black border-b border-gray-300 py-2 bg-gray-50 font-bold">手机短号</td>
                         <td colSpan={2} className="border-b border-gray-300 py-2 font-mono">6678</td>
                      </tr>
                      <tr className="border-b border-black">
                         <td className="border-r border-black py-2 bg-gray-50 font-bold">家庭住址</td>
                         <td colSpan={6} className="py-2 text-left px-4">上海市嘉定区安亭镇...</td>
                      </tr>

                      {/* Family Section */}
                      <tr className="border-b border-black">
                         <td rowSpan={profile.family.length + 1} className="border-r border-black font-bold py-4 px-2 bg-gray-50 writing-vertical-lr align-middle">家庭成员基本信息</td>
                         <td className="border-r border-black border-b border-gray-300 py-1 bg-gray-50 font-bold">称 谓</td>
                         <td className="border-r border-black border-b border-gray-300 py-1 bg-gray-50 font-bold">姓 名</td>
                         <td colSpan={2} className="border-r border-black border-b border-gray-300 py-1 bg-gray-50 font-bold">出生年月</td>
                         <td className="border-r border-black border-b border-gray-300 py-1 bg-gray-50 font-bold">政治面貌</td>
                         <td colSpan={2} className="border-b border-gray-300 py-1 bg-gray-50 font-bold">工作单位及职务</td>
                      </tr>
                      {profile.family.map((fam, idx) => (
                         <tr key={idx} className="border-b border-black">
                            <td className="border-r border-black border-b border-gray-200 py-2">{fam.relation}</td>
                            <td className="border-r border-black border-b border-gray-200 py-2">{fam.name}</td>
                            <td colSpan={2} className="border-r border-black border-b border-gray-200 py-2">{fam.birth}</td>
                            <td className="border-r border-black border-b border-gray-200 py-2">{fam.politics}</td>
                            <td colSpan={2} className="border-b border-gray-200 py-2">{fam.company} {fam.job !== '-' ? `- ${fam.job}` : ''}</td>
                         </tr>
                      ))}
                   </tbody>
                </table>
             </div>

             {/* Footer Info */}
             <div className="flex justify-between mt-4 text-xs text-gray-600">
                <div>说明：本表由员工确认并对信息准确性负责。</div>
                <div className="font-bold">人力资源 (HR) 制表</div>
             </div>

          </div>

          {/* Bottom Action Bar */}
          <div className="p-4 border-t border-gray-200 bg-gray-50 flex justify-center shrink-0 print:hidden">
             <button 
                onClick={onClose} 
                className="px-8 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors font-medium shadow-sm"
             >
                关闭履历表
             </button>
          </div>
       </div>
    </div>
  );
};

const IssueTrackerModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  issues: IssueItem[];
  setIssues: React.Dispatch<React.SetStateAction<IssueItem[]>>;
}> = ({ isOpen, onClose, issues, setIssues }) => {
  const [newIssue, setNewIssue] = useState('');
  const [newAction, setNewAction] = useState(''); 
  
  if (!isOpen) return null;

  const handleAdd = () => {
    if (!newIssue.trim()) return;
    setIssues([...issues, { id: Date.now().toString(), issue: newIssue, action: newAction, isCompleted: false }]);
    setNewIssue('');
    setNewAction('');
  };

  const toggleComplete = (id: string) => {
    setIssues(issues.map(i => i.id === id ? { ...i, isCompleted: !i.isCompleted } : i));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
       <div className="bg-white rounded-lg shadow-xl w-full max-w-lg flex flex-col max-h-[80vh] animate-scale-up">
          <div className="p-4 border-b border-gray-100 flex justify-between items-center">
             <h3 className="font-bold text-gray-800">继任计划问题清单</h3>
             <button onClick={onClose}><X size={20} className="text-gray-400 hover:text-gray-600"/></button>
          </div>
          <div className="p-4 flex-1 overflow-y-auto">
             <div className="space-y-2 mb-4 bg-blue-50 p-3 rounded-lg border border-blue-100">
                <input 
                  type="text" 
                  value={newIssue} 
                  onChange={(e) => setNewIssue(e.target.value)} 
                  placeholder="1. 输入新问题描述..." 
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none mb-2"
                />
                <div className="flex space-x-2">
                   <input 
                     type="text" 
                     value={newAction} 
                     onChange={(e) => setNewAction(e.target.value)} 
                     placeholder="2. 输入解决方案/行动..." 
                     className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                   />
                   <button onClick={handleAdd} className="bg-blue-600 text-white px-4 py-2 rounded text-sm whitespace-nowrap">添加</button>
                </div>
             </div>
             
             <div className="space-y-2">
                {issues.map(issue => (
                   <div key={issue.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded border border-gray-100">
                      <input 
                        type="checkbox" 
                        checked={issue.isCompleted} 
                        onChange={() => toggleComplete(issue.id)} 
                        className="mt-1 rounded text-blue-600 focus:ring-blue-500"
                      />
                      <div className="flex-1">
                         <div className={`text-sm font-medium text-gray-800 ${issue.isCompleted ? 'line-through text-gray-400' : ''}`}>Q: {issue.issue}</div>
                         {issue.action && (
                           <div className={`text-xs text-gray-600 mt-1 bg-white p-1.5 rounded border border-gray-100 ${issue.isCompleted ? 'text-gray-400' : ''}`}>
                              A: {issue.action}
                           </div>
                         )}
                      </div>
                   </div>
                ))}
             </div>
          </div>
       </div>
    </div>
  );
};

const RiskScanModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  plans: PositionPlan[];
}> = ({ isOpen, onClose, plans }) => {
  if (!isOpen) return null;

  const risks = plans.filter(p => p.successors.length === 0 || p.risk === 'High');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
       <div className="bg-white rounded-lg shadow-xl w-full max-w-md animate-scale-up">
          <div className="p-6">
             <div className="flex items-center mb-4 text-red-600">
                <AlertTriangle size={24} className="mr-2" />
                <h3 className="text-lg font-bold">风险扫描报告</h3>
             </div>
             <div className="space-y-4">
                {risks.length === 0 ? (
                   <p className="text-green-600 flex items-center"><CheckCircle2 className="mr-2"/> 所有关键岗位均有继任者，风险可控。</p>
                ) : (
                   risks.map(plan => (
                      <div key={plan.id} className="p-3 bg-red-50 border border-red-100 rounded text-sm">
                         <div className="font-bold text-red-800">{plan.position}</div>
                         <div className="text-red-600 mt-1">
                            {plan.successors.length === 0 ? '无继任者' : '离职风险高'}
                         </div>
                      </div>
                   ))
                )}
             </div>
             <div className="mt-6 flex justify-end">
                <button onClick={onClose} className="px-4 py-2 bg-gray-100 text-gray-700 rounded text-sm hover:bg-gray-200">关闭</button>
             </div>
          </div>
       </div>
    </div>
  );
};

const AddSuccessorModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onAdd: (employee: ReviewEmployee) => void;
  candidates: ReviewEmployee[];
}> = ({ isOpen, onClose, onAdd, candidates }) => {
  const [search, setSearch] = useState('');
  
  if (!isOpen) return null;

  const filtered = candidates.filter(c => c.name.toLowerCase().includes(search.toLowerCase()) || c.position.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
       <div className="bg-white rounded-lg shadow-xl w-full max-w-lg flex flex-col max-h-[80vh] animate-scale-up">
          <div className="p-4 border-b border-gray-100 flex justify-between items-center">
             <h3 className="font-bold text-gray-800">添加继任者</h3>
             <button onClick={onClose}><X size={20} className="text-gray-400 hover:text-gray-600"/></button>
          </div>
          <div className="p-4">
             <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                <input 
                  type="text" 
                  placeholder="搜索员工..." 
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
             </div>
             <div className="space-y-2 overflow-y-auto max-h-[300px]">
                {filtered.map(emp => (
                   <div key={emp.id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded border border-transparent hover:border-gray-200 cursor-pointer" onClick={() => onAdd(emp)}>
                      <div className="flex items-center flex-1 min-w-0">
                         <UserAvatar name={emp.name} size={32} className="bg-blue-100 text-blue-600 mr-3 shrink-0" />
                         <div className="flex-1 min-w-0">
                            <div className="text-sm font-medium text-gray-800 truncate">
                              {emp.name} <span className="text-gray-400 font-mono ml-1">{emp.id}</span>
                            </div>
                            <div className="text-xs text-gray-500 truncate">{emp.dept} | {emp.position}</div>
                         </div>
                      </div>
                      <Plus size={16} className="text-gray-400 shrink-0 ml-2" />
                   </div>
                ))}
             </div>
          </div>
       </div>
    </div>
  );
};

const PositionReassignmentModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  plans: PositionPlan[];
  onUpdate: (updatedPlans: PositionPlan[]) => void;
}> = ({ isOpen, onClose, plans, onUpdate }) => {
  const [selectedPosId, setSelectedPosId] = useState<number | ''>('');
  const [attribute, setAttribute] = useState<'Management' | 'Technical'>('Management');
  const [step, setStep] = useState(1);
  const [conflicts, setConflicts] = useState<Successor[]>([]);
  const [reassignmentMap, setReassignmentMap] = useState<Record<string, string>>({}); // successorId -> newPosName

  if (!isOpen) return null;

  const currentPlan = plans.find(p => p.id === Number(selectedPosId));

  const handleAnalyze = () => {
    if (!currentPlan) return;
    if (attribute === 'Technical' && currentPlan.successors.length > 0) {
       setConflicts([currentPlan.successors[currentPlan.successors.length - 1]]);
    } else {
       setConflicts([]);
    }
    setStep(2);
  };

  const handleConfirm = () => {
    const newPlans = [...plans];
    if (currentPlan) {
       const updatedSuccessors = currentPlan.successors.filter(s => !conflicts.find(c => c.id === s.id));
       const planIndex = newPlans.findIndex(p => p.id === currentPlan.id);
       newPlans[planIndex] = { ...currentPlan, successors: updatedSuccessors };
    }
    onUpdate(newPlans);
    onClose();
    setStep(1);
    setConflicts([]);
    setSelectedPosId('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-fade-in">
       <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl flex flex-col max-h-[90vh]">
          <div className="p-4 border-b border-gray-100 flex justify-between items-center">
             <h3 className="font-bold text-gray-800 flex items-center">
                <Shuffle size={18} className="mr-2 text-blue-600" />
                新增/调整岗位属性 (Position Realignment)
             </h3>
             <button onClick={onClose}><X size={20} className="text-gray-400 hover:text-gray-600"/></button>
          </div>
          
          <div className="p-6 space-y-6">
             {step === 1 ? (
               <>
                 <div className="bg-blue-50 border border-blue-100 p-4 rounded-lg text-sm text-blue-800 mb-4">
                    <p className="font-bold mb-1">功能说明:</p>
                    <p>修改岗位关键属性（如：管理序列 &rarr; 技术序列）将自动触发继任者匹配度检查。</p>
                 </div>
                 <div className="grid grid-cols-2 gap-6">
                    <div>
                       <label className="block text-sm font-medium text-gray-700 mb-2">选择/输入岗位</label>
                       <select 
                          className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                          value={selectedPosId}
                          onChange={(e) => setSelectedPosId(e.target.value ? Number(e.target.value) : '')}
                       >
                          <option value="">-- 选择现有岗位 --</option>
                          {plans.map(p => <option key={p.id} value={p.id}>{p.position}</option>)}
                       </select>
                    </div>
                    <div>
                       <label className="block text-sm font-medium text-gray-700 mb-2">岗位属性 (New)</label>
                       <div className="flex space-x-4 mt-2">
                          <label className="flex items-center cursor-pointer">
                             <input type="radio" name="attr" checked={attribute === 'Management'} onChange={() => setAttribute('Management')} className="mr-2 text-blue-600"/>
                             管理序列
                          </label>
                          <label className="flex items-center cursor-pointer">
                             <input type="radio" name="attr" checked={attribute === 'Technical'} onChange={() => setAttribute('Technical')} className="mr-2 text-blue-600"/>
                             技术序列
                          </label>
                       </div>
                    </div>
                 </div>
                 {currentPlan && (
                    <div className="p-4 border border-gray-200 rounded-lg bg-gray-50 mt-4">
                       <h4 className="text-xs font-bold text-gray-500 uppercase mb-2">当前继任者 ({currentPlan.successors.length})</h4>
                       <div className="flex flex-wrap gap-2">
                          {currentPlan.successors.map(s => (
                             <span key={s.id} className="bg-white border border-gray-200 px-2 py-1 rounded text-xs text-gray-700">
                                {s.name}
                             </span>
                          ))}
                       </div>
                    </div>
                 )}
               </>
             ) : (
               <div className="animate-slide-up">
                  <h4 className="font-bold text-gray-800 mb-4 flex items-center">
                     <AlertTriangle size={18} className="mr-2 text-orange-500"/>
                     属性变更差异分析
                  </h4>
                  {conflicts.length > 0 ? (
                     <div className="space-y-4">
                        <p className="text-sm text-gray-600">
                           岗位属性变更为 <strong>{attribute === 'Management' ? '管理序列' : '技术序列'}</strong>。
                           以下继任者能力模型不再匹配，建议重新分配：
                        </p>
                        <div className="border rounded-lg overflow-hidden">
                           <table className="w-full text-sm text-left">
                              <thead className="bg-gray-50 text-gray-500">
                                 <tr>
                                    <th className="p-3">继任者</th>
                                    <th className="p-3">原匹配度</th>
                                    <th className="p-3">操作 (Reassign)</th>
                                 </tr>
                              </thead>
                              <tbody className="divide-y divide-gray-100">
                                 {conflicts.map(c => (
                                    <tr key={c.id}>
                                       <td className="p-3 font-medium">{c.name}</td>
                                       <td className="p-3 text-gray-500">{c.fit}%</td>
                                       <td className="p-3">
                                          <select 
                                             className="border border-gray-300 rounded px-2 py-1 text-xs w-full"
                                             onChange={(e) => setReassignmentMap({...reassignmentMap, [c.id]: e.target.value})}
                                          >
                                             <option value="">放入人才池 (待定)</option>
                                             {plans.filter(p => p.id !== currentPlan?.id).map(p => (
                                                <option key={p.id} value={p.id}>转至: {p.position}</option>
                                             ))}
                                          </select>
                                       </td>
                                    </tr>
                                 ))}
                              </tbody>
                           </table>
                        </div>
                     </div>
                  ) : (
                     <div className="text-center py-8 text-green-600 bg-green-50 rounded-lg border border-green-100">
                        <CheckCircle2 size={32} className="mx-auto mb-2" />
                        <p>未发现继任者匹配冲突，所有人员符合新属性要求。</p>
                     </div>
                  )}
               </div>
             )}
          </div>

          <div className="p-4 border-t border-gray-100 flex justify-end space-x-3 bg-gray-50 rounded-b-lg">
             {step === 2 && (
                <button onClick={() => setStep(1)} className="px-4 py-2 text-gray-600 hover:bg-gray-200 rounded text-sm mr-auto">
                   上一步
                </button>
             )}
             <button onClick={onClose} className="px-4 py-2 border border-gray-300 rounded text-sm text-gray-700 bg-white hover:bg-gray-50">
               取消
             </button>
             {step === 1 ? (
                <button onClick={handleAnalyze} disabled={!selectedPosId} className="px-4 py-2 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 disabled:opacity-50">
                   下一步：差异分析
                </button>
             ) : (
                <button onClick={handleConfirm} className="px-4 py-2 bg-blue-600 text-white rounded text-sm hover:bg-blue-700">
                   确认变更与分配
                </button>
             )}
          </div>
       </div>
    </div>
  );
};

// Extracted Comparison Modal Component
const ComparisonModal: React.FC<{
  title: string;
  subtitle: string;
  successors: Successor[];
  hiddenCount: number;
  onClose: () => void;
  onRestore: () => void;
  onHide: (id: string) => void;
  onRemove: (id: string) => void;
  onUpdateReadiness: (id: string, val: string) => void;
  onAddClick: () => void;
  onViewProfile: (successor: Successor) => void;
}> = ({ 
  title, subtitle, successors, hiddenCount,
  onClose, onRestore, onHide, onRemove, onUpdateReadiness, onAddClick, onViewProfile 
}) => {
  
  return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
           <div className="bg-white rounded-xl shadow-2xl w-full max-w-7xl h-[90vh] flex flex-col overflow-hidden animate-scale-up">
              {/* Header */}
              <div className="bg-indigo-700 p-4 sm:p-6 text-white shrink-0 flex justify-between items-center">
                 <div>
                   <h2 className="text-2xl font-bold flex items-center">
                      <Users className="mr-3" />
                      {title}
                   </h2>
                   <p className="text-indigo-100 text-sm mt-1 opacity-80">
                      {subtitle}
                   </p>
                 </div>
                 <div className="flex items-center space-x-3">
                   {hiddenCount > 0 && (
                      <button 
                         onClick={onRestore}
                         className="flex items-center px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 rounded text-sm text-white transition-colors border border-indigo-400"
                      >
                         <RotateCcw size={14} className="mr-1" /> 恢复全部
                      </button>
                   )}
                   <button 
                     onClick={onClose}
                     className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors text-white"
                   >
                     <X size={24} />
                   </button>
                 </div>
              </div>

              {/* Body - Single Scroll Container for Synchronized Scrolling */}
              <div className="flex-1 overflow-y-auto bg-gray-50 custom-scrollbar">
                 <div className="min-w-full p-6">
                    <div className="grid gap-6" style={{ gridTemplateColumns: `repeat(${successors.length + 1}, minmax(300px, 1fr))` }}>
                       
                       {successors.map((s) => (
                         <div key={s.id} className="bg-white rounded-lg shadow-sm border border-gray-200 flex flex-col h-full hover:border-indigo-300 hover:shadow-md transition-all relative group">
                            {/* Action Buttons */}
                            <div className="absolute top-2 right-2 flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity z-20">
                                <button 
                                  onClick={() => onViewProfile(s)}
                                  className="text-gray-400 hover:text-blue-600 p-1.5 bg-white/80 rounded-full shadow-sm border border-gray-100"
                                  title="查看履历"
                                >
                                  <FileText size={16} />
                                </button>
                                <button 
                                  onClick={() => onRemove(s.id)}
                                  className="text-gray-400 hover:text-red-600 p-1.5 bg-white/80 rounded-full shadow-sm border border-gray-100"
                                  title="移除继任者"
                                >
                                <Trash2 size={16} />
                                </button>
                              <button 
                                 onClick={() => onHide(s.id)}
                                 className="text-gray-400 hover:text-gray-700 p-1.5 bg-white/80 rounded-full shadow-sm border border-gray-100"
                                 title="隐藏此列"
                              >
                                 <EyeOff size={16} />
                              </button>
                            </div>

                            {/* Card Header (Sticky) */}
                            <div className="p-6 border-b border-gray-100 bg-white rounded-t-lg sticky top-0 z-10 shadow-sm">
                               <div className="flex items-start justify-between mb-4">
                                  <div className="flex items-center">
                                     <div className="w-14 h-14 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-xl mr-4 border-2 border-indigo-50">
                                        {s.name.charAt(0)}
                                     </div>
                                     <div>
                                        <h3 className="text-lg font-bold text-gray-800">{s.name}</h3>
                                        <p className="text-sm text-gray-500">{s.currentTitle}</p>
                                     </div>
                                  </div>
                               </div>
                               
                               <div className="bg-gray-50 rounded-lg p-2 text-center border border-gray-100 relative group/select">
                                  <span className="text-xs text-gray-500 uppercase tracking-wide">继任准备度</span>
                                  <select
                                      value={s.readiness}
                                      onChange={(e) => onUpdateReadiness(s.id, e.target.value)}
                                      className="block w-full text-center font-semibold text-gray-800 text-sm bg-transparent border-none focus:ring-0 cursor-pointer appearance-none py-1 hover:bg-gray-100 rounded transition-colors"
                                  >
                                      <option value="一档 (Ready Now)">一档 (Ready Now)</option>
                                      <option value="二档 (Ready Future)">二档 (Ready Future)</option>
                                      <option value="三档 (Ready Long Term)">三档 (Ready Long Term)</option>
                                  </select>
                               </div>
                            </div>

                            {/* Card Content (Scrolls with container) */}
                            <div className="p-6 space-y-8">
                               {/* Basic Info */}
                               <div>
                                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 flex items-center border-b border-gray-100 pb-2">
                                     <Award size={14} className="mr-2" /> 基础信息
                                  </h4>
                                  <div className="space-y-3 text-sm">
                                     <div className="flex justify-between"><span className="text-gray-500">年龄</span> <span className="text-gray-800">{s.age} 岁</span></div>
                                     <div className="flex justify-between"><span className="text-gray-500">当前常驻地</span> <span className="text-gray-800 flex items-center"><MapPin size={12} className="mr-1"/> {s.location}</span></div>
                                  </div>
                               </div>

                               {/* Education */}
                               <div>
                                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 flex items-center border-b border-gray-100 pb-2">
                                     <BookOpen size={14} className="mr-2" /> 教育背景
                                  </h4>
                                  {s.education.map((edu, i) => (
                                     <div key={i} className="mb-2 last:mb-0">
                                        <div className="font-semibold text-gray-800 text-sm">{edu.school}</div>
                                        <div className="text-xs text-gray-500 flex items-center">
                                           <GraduationCap size={12} className="mr-1"/> {edu.degree} | {edu.major}
                                        </div>
                                     </div>
                                  ))}
                               </div>
                            </div>
                         </div>
                       ))}

                       {/* Add Candidate Placeholder */}
                       <div 
                           className="border-2 border-dashed border-gray-200 rounded-lg flex flex-col items-center justify-center text-gray-400 hover:border-indigo-300 hover:text-indigo-500 hover:bg-indigo-50/10 transition-colors cursor-pointer min-h-[500px]"
                           onClick={onAddClick}
                       >
                           <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                           <UserPlus size={24} />
                           </div>
                           <span className="font-medium">添加对比人员</span>
                           <span className="text-xs text-gray-400 mt-1">从人才库中选择</span>
                       </div>
                    </div>
                 </div>
              </div>
           </div>
        </div>
  )
}

// --- Main Succession Planning Component ---

export const SuccessionPlanning: React.FC = () => {
  const [successionPlans, setSuccessionPlans] = useState<PositionPlan[]>(initialSuccessionData);
  const [comparingPositionId, setComparingPositionId] = useState<number | null>(null);
  const [targetPlanId, setTargetPlanId] = useState<number | null>(null);
  const [hiddenSuccessorIds, setHiddenSuccessorIds] = useState<Set<string>>(new Set());
  const [showAddCandidateModal, setShowAddCandidateModal] = useState(false);
  const [successionLogs, setSuccessionLogs] = useState<ModificationLog[]>([]);
  const [showSuccessionLogs, setShowSuccessionLogs] = useState(false);
  const [viewProfileSuccessor, setViewProfileSuccessor] = useState<Successor | null>(null);
  
  const [showIssueModal, setShowIssueModal] = useState(false);
  const [issues, setIssues] = useState<IssueItem[]>([
    { id: '1', issue: '技术总监继任者梯队单一', action: '从外部猎头定向寻访', isCompleted: false },
    { id: '2', issue: '部分高潜人才未纳入计划', action: '下季度盘点时重点关注', isCompleted: true }
  ]);

  const [showRiskModal, setShowRiskModal] = useState(false);
  const [showReassignModal, setShowReassignModal] = useState(false);

  const [editReadinessState, setEditReadinessState] = useState<{
    isOpen: boolean;
    planId: number | null;
    successorId: string | null;
    currentReadiness: string;
    newReadiness: string;
    reason: string;
  }>({
    isOpen: false,
    planId: null,
    successorId: null,
    currentReadiness: '',
    newReadiness: '',
    reason: ''
  });

  const reviewEmployees = mockReviewEmployees;

  // --- Handlers ---

  const handleDownloadSuccessionReport = () => {
    let tableRows = "";
    successionPlans.forEach(plan => {
       if (plan.successors.length === 0) {
           tableRows += `
             <tr>
               <td>${plan.position}</td>
               <td>${plan.incumbent}</td>
               <td>-</td>
               <td>-</td>
               <td>-</td>
             </tr>`;
       } else {
           plan.successors.forEach(s => {
               tableRows += `
                 <tr>
                   <td>${plan.position}</td>
                   <td>${plan.incumbent}</td>
                   <td>${s.name}</td>
                   <td>${s.currentTitle}</td>
                   <td>${s.readiness}</td>
                 </tr>`;
           });
       }
    });

    const excelTemplate = `
      <html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">
      <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <style>
          td { mso-number-format:"\@"; }
          table { border-collapse: collapse; }
          td, th { border: 1px solid #000; padding: 5px; }
        </style>
      </head>
      <body>
        <table>
          <thead>
            <tr style="background-color: #f3f4f6; font-weight: bold;">
              <th>关键岗位 (Position)</th>
              <th>现任者 (Incumbent)</th>
              <th>继任者 (Successor)</th>
              <th>现职位 (Current Title)</th>
              <th>准备度 (Readiness)</th>
            </tr>
          </thead>
          <tbody>
            ${tableRows}
          </tbody>
        </table>
      </body>
      </html>
    `;

    const blob = new Blob([excelTemplate], { type: 'application/vnd.ms-excel' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `succession_planning_${new Date().toISOString().split('T')[0]}.xls`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleAddSuccessor = (employee: ReviewEmployee) => {
    const planId = targetPlanId ?? comparingPositionId;
    if (planId === null) return;
    
    const currentPlan = successionPlans.find(p => p.id === planId);
    if (currentPlan?.successors.some(s => s.name === employee.name)) {
        alert('该员工已在继任列表中');
        return;
    }

    const newSuccessor: Successor = {
        id: `S-NEW-${Date.now()}`,
        name: employee.name,
        readiness: '三档 (Ready Long Term)',
        fit: Math.floor(Math.random() * 20) + 70,
        currentTitle: employee.position,
        age: 30,
        location: employee.dept,
        mobility: 'Regional',
        languages: ['Chinese'],
        education: [],
        performanceHistory: [employee.performance],
        retentionRisk: 'Low'
    };

    setSuccessionPlans(prev => prev.map(p => {
        if (p.id === planId) {
            return { ...p, successors: [...p.successors, newSuccessor] };
        }
        return p;
    }));
    
    // Log Addition
    const newLog: ModificationLog = {
      id: Date.now().toString(),
      timestamp: new Date().toLocaleString(),
      employeeName: newSuccessor.name,
      employeeId: newSuccessor.id,
      fromBox: '-',
      toBox: newSuccessor.readiness,
      changeType: 'Succession Tier',
      reason: '手动添加继任者'
    };
    setSuccessionLogs(prev => [newLog, ...prev]);

    alert('添加成功');
    setShowAddCandidateModal(false);
    setTargetPlanId(null);
  };

  const handleRemoveSuccessor = (planId: number, successorId: string) => {
    if(!window.confirm('确定要移除该继任者吗？')) return;

    // Find details for logging before deleting
    const plan = successionPlans.find(p => p.id === planId);
    const successor = plan?.successors.find(s => s.id === successorId);

    if (!plan || !successor) return;

    setSuccessionPlans(prev => prev.map(p => {
        if (p.id === planId) {
            return { ...p, successors: p.successors.filter(s => s.id !== successorId) };
        }
        return p;
    }));

    // Log Removal
    const newLog: ModificationLog = {
        id: Date.now().toString(),
        timestamp: new Date().toLocaleString(),
        employeeName: successor.name,
        employeeId: successor.id,
        fromBox: successor.readiness,
        toBox: 'Removed',
        changeType: 'Succession Tier',
        reason: '手动移除继任者'
    };
    setSuccessionLogs(prev => [newLog, ...prev]);
  };

  const handleEditReadinessClick = (planId: number, successor: Successor) => {
    setEditReadinessState({
      isOpen: true,
      planId: planId,
      successorId: successor.id,
      currentReadiness: successor.readiness,
      newReadiness: successor.readiness,
      reason: ''
    });
  };

  const handleSaveReadiness = () => {
    if (!editReadinessState.planId || !editReadinessState.successorId || !editReadinessState.reason) return;

    const newPlans = successionPlans.map(plan => {
      if (plan.id === editReadinessState.planId) {
        return {
          ...plan,
          successors: plan.successors.map(s => {
            if (s.id === editReadinessState.successorId) {
              return { ...s, readiness: editReadinessState.newReadiness };
            }
            return s;
          })
        };
      }
      return plan;
    });

    setSuccessionPlans(newPlans);

    const successorName = successionPlans.find(p => p.id === editReadinessState.planId)?.successors.find(s => s.id === editReadinessState.successorId)?.name;
    
    const newLog: ModificationLog = {
      id: Date.now().toString(),
      timestamp: new Date().toLocaleString(),
      employeeName: successorName || 'Unknown',
      employeeId: editReadinessState.successorId || '',
      fromBox: editReadinessState.currentReadiness,
      toBox: editReadinessState.newReadiness,
      changeType: 'Succession Tier',
      reason: editReadinessState.reason
    };
    setSuccessionLogs(prev => [newLog, ...prev]);

    setEditReadinessState({ ...editReadinessState, isOpen: false, reason: '' });
  };

  const handleSuccessorDragStart = (e: React.DragEvent, planId: number, index: number, readiness: string) => {
    e.dataTransfer.setData('application/json', JSON.stringify({ planId, index, readiness }));
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleSuccessorDragOver = (e: React.DragEvent) => {
    e.preventDefault(); 
    e.dataTransfer.dropEffect = 'move';
  };

  const handleSuccessorDrop = (e: React.DragEvent, targetPlanId: number, targetIndex: number, targetReadiness: string) => {
    e.preventDefault();
    try {
      const data = JSON.parse(e.dataTransfer.getData('application/json'));
      
      if (data.planId !== targetPlanId) return;
      
      if (getTier(data.readiness) !== getTier(targetReadiness)) {
        alert("只能在相同档位之间拖拽排序 (Can only reorder within the same readiness tier)");
        return;
      }

      const planIndex = successionPlans.findIndex(p => p.id === targetPlanId);
      if (planIndex === -1) return;

      const newPlans = [...successionPlans];
      const successors = [...newPlans[planIndex].successors];
      const [movedItem] = successors.splice(data.index, 1);
      successors.splice(targetIndex, 0, movedItem);
      newPlans[planIndex].successors = successors;
      
      setSuccessionPlans(newPlans);

      // Log Reorder
      const newLog: ModificationLog = {
        id: Date.now().toString(),
        timestamp: new Date().toLocaleString(),
        employeeName: movedItem.name,
        employeeId: movedItem.id,
        fromBox: `Index ${data.index}`,
        toBox: `Index ${targetIndex}`,
        changeType: 'Succession Tier',
        reason: '手动拖拽调整顺序'
      };
      setSuccessionLogs(prev => [newLog, ...prev]);

    } catch (err) {
      console.error("Drop failed", err);
    }
  };

  useEffect(() => {
    if (comparingPositionId !== null) {
      setHiddenSuccessorIds(new Set());
    }
  }, [comparingPositionId]);

  const selectedPositionPlan = comparingPositionId ? successionPlans.find(p => p.id === comparingPositionId) : null;
  const displayedSuccessors = selectedPositionPlan ? selectedPositionPlan.successors : [];
  const finalSuccessors = displayedSuccessors.filter(s => !hiddenSuccessorIds.has(s.id));

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 flex items-center">
            <Users className="mr-3 text-indigo-600" />
            继任计划管理
          </h2>
          <p className="text-sm text-gray-500 mt-1">关键岗位继任者梯队建设与风险评估</p>
        </div>
        <div className="flex flex-wrap gap-3">
           <button 
             onClick={() => setShowSuccessionLogs(true)}
             className="bg-white border border-gray-300 text-gray-700 px-3 py-2 rounded-md hover:bg-gray-50 text-sm font-medium flex items-center shadow-sm"
           >
             <History size={16} className="mr-2 text-purple-600" /> 变更日志
           </button>
           <button 
             onClick={() => setShowIssueModal(true)}
             className="bg-white border border-gray-300 text-gray-700 px-3 py-2 rounded-md hover:bg-gray-50 text-sm font-medium flex items-center shadow-sm"
           >
             <ClipboardList size={16} className="mr-2 text-blue-600" /> 问题清单
           </button>
           <button 
             onClick={() => setShowRiskModal(true)}
             className="bg-white border border-gray-300 text-gray-700 px-3 py-2 rounded-md hover:bg-gray-50 text-sm font-medium flex items-center shadow-sm"
           >
             <ScanLine size={16} className="mr-2 text-orange-600" /> 风险扫描
           </button>
           <button 
             onClick={handleDownloadSuccessionReport}
             className="bg-white border border-gray-300 text-gray-700 px-3 py-2 rounded-md hover:bg-gray-50 text-sm font-medium flex items-center shadow-sm"
           >
             <Download size={16} className="mr-2" /> 导出报表
           </button>
           <button 
              onClick={() => setShowReassignModal(true)}
              className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 text-sm font-medium shadow-sm flex items-center"
           >
              <Plus size={16} className="mr-2" /> 新增/调整岗位
           </button>
        </div>
      </div>

      {/* Table View */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
         <div className="overflow-x-auto">
           <table className="w-full text-left text-sm border-collapse">
             <thead className="bg-gray-50 text-gray-500 font-medium border-b border-gray-200">
               <tr>
                 <th className="p-4 w-[35%]">关键岗位 (Position)</th>
                 <th className="p-4 w-[25%]">现任者 (Incumbent)</th>
                 <th className="p-4 w-[40%]">继任梯队 (Successors)</th>
               </tr>
             </thead>
             <tbody className="divide-y divide-gray-100">
               {successionPlans.map((pos) => (
                 <tr key={pos.id} className="hover:bg-indigo-50/10 transition-colors group">
                   {/* Position Info */}
                   <td className="p-4 align-top">
                      <div 
                         className="font-bold text-gray-800 text-base cursor-pointer hover:text-indigo-600 transition-colors"
                         onClick={() => setComparingPositionId(pos.id)}
                         title="点击查看对比详情"
                      >
                         {pos.position}
                      </div>
                      <div className="text-xs text-gray-400 mt-1">ID: P-{pos.id}00{pos.id}</div>
                   </td>

                   {/* Incumbent Info */}
                   <td className="p-4 align-top">
                      <div className="flex items-center">
                         <UserAvatar name={pos.incumbent} size={32} className="mr-3 bg-indigo-100 text-indigo-600" />
                         <div>
                            <div className="font-medium text-gray-700">{pos.incumbent}</div>
                            <div className="text-xs text-gray-400">在职</div>
                         </div>
                      </div>
                   </td>

                   {/* Successors List */}
                   <td className="p-4">
                      {pos.successors.length > 0 ? (
                        <div className="space-y-3">
                          {pos.successors.slice(0, 3).map((s, idx) => (
                            <div 
                              key={s.id} 
                              draggable
                              onDragStart={(e) => handleSuccessorDragStart(e, pos.id, idx, s.readiness)}
                              onDragOver={handleSuccessorDragOver}
                              onDrop={(e) => handleSuccessorDrop(e, pos.id, idx, s.readiness)}
                              className="flex items-center justify-between bg-white border border-gray-100 p-2 rounded-lg shadow-sm hover:border-indigo-200 transition-colors cursor-move group/item"
                            >
                               <div className="flex items-center gap-3">
                                  <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-600">
                                     {s.name.charAt(0)}
                                  </div>
                                  <div>
                                     <div className="font-medium text-gray-800 text-sm">{s.name}</div>
                                     <div className="text-xs text-gray-400">{s.currentTitle}</div>
                                  </div>
                               </div>
                               
                               <div className="flex flex-col items-end gap-1 relative">
                                  <div className="flex items-center gap-2">
                                     {renderReadinessLight(s.readiness, () => handleEditReadinessClick(pos.id, s))}
                                  </div>
                                  
                                  {/* Replaced Icon Button with Text Button */}
                                  <button
                                      onClick={() => setViewProfileSuccessor(s)}
                                      className="px-2 py-0.5 text-[10px] text-blue-600 border border-blue-200 rounded hover:bg-blue-50 bg-white transition-colors"
                                  >
                                      查看履历表
                                  </button>

                                  {/* Delete Button (visible on hover) */}
                                  <button 
                                    onClick={() => handleRemoveSuccessor(pos.id, s.id)}
                                    className="absolute -right-8 top-1/2 -translate-y-1/2 p-1.5 text-gray-400 hover:text-red-500 opacity-0 group-hover/item:opacity-100 transition-opacity bg-white border border-gray-100 rounded-full shadow-sm"
                                    title="移除此人"
                                  >
                                    <Trash2 size={14} />
                                  </button>
                               </div>
                            </div>
                          ))}
                          {pos.successors.length > 3 && (
                             <div className="text-xs text-center text-gray-400 pt-1">
                                还有 {pos.successors.length - 3} 位候选人...
                             </div>
                          )}
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center py-4 border-2 border-dashed border-gray-100 rounded-lg bg-gray-50/50 text-gray-400">
                           <AlertCircle size={16} className="mb-1" />
                           <span className="text-xs">暂无继任者</span>
                        </div>
                      )}
                      <button 
                          onClick={() => { setTargetPlanId(pos.id); setShowAddCandidateModal(true); }}
                          className="mt-2 w-full py-1.5 border-2 border-dashed border-gray-200 rounded-lg text-xs text-gray-400 hover:border-blue-400 hover:text-blue-600 flex items-center justify-center transition-colors"
                      >
                          <Plus size={14} className="mr-1" /> 添加继任者
                      </button>
                   </td>
                 </tr>
               ))}
             </tbody>
           </table>
         </div>
      </div>

      {/* Readiness Edit Modal */}
      {editReadinessState.isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
             <div className="bg-white rounded-lg shadow-xl w-full max-md animate-scale-up">
                <div className="p-6">
                   <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                      <Edit2 size={18} className="mr-2 text-indigo-600" /> 修改继任准备度
                   </h3>
                   
                   <div className="space-y-4">
                      <div>
                         <label className="block text-sm font-medium text-gray-700 mb-1">当前准备度</label>
                         <div className="bg-gray-50 px-3 py-2 rounded text-sm text-gray-600 border border-gray-200">
                            {editReadinessState.currentReadiness}
                         </div>
                      </div>

                      <div>
                         <label className="block text-sm font-medium text-gray-700 mb-1">新准备度</label>
                         <select 
                            className="w-full border border-gray-300 rounded p-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none bg-white"
                            value={editReadinessState.newReadiness}
                            onChange={(e) => setEditReadinessState(prev => ({...prev, newReadiness: e.target.value}))}
                         >
                            <option value="一档 (Ready Now)">一档 (Ready Now)</option>
                            <option value="二档 (Ready Future)">二档 (Ready Future)</option>
                            <option value="三档 (Ready Long Term)">三档 (Ready Long Term)</option>
                         </select>
                      </div>

                      <div>
                         <label className="block text-sm font-medium text-gray-700 mb-1">变更原因 <span className="text-red-500">*</span></label>
                         <textarea 
                            className="w-full border border-gray-300 rounded p-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                            rows={3}
                            placeholder="请输入调整原因..."
                            value={editReadinessState.reason}
                            onChange={(e) => setEditReadinessState(prev => ({...prev, reason: e.target.value}))}
                         ></textarea>
                      </div>
                   </div>

                   <div className="flex justify-end space-x-3 mt-6">
                      <button 
                         onClick={() => setEditReadinessState(prev => ({ ...prev, isOpen: false }))}
                         className="px-4 py-2 text-gray-600 hover:bg-gray-50 rounded text-sm border border-gray-200"
                      >
                         取消
                      </button>
                      <button 
                         onClick={handleSaveReadiness}
                         disabled={!editReadinessState.reason.trim() || editReadinessState.currentReadiness === editReadinessState.newReadiness}
                         className="px-4 py-2 bg-indigo-600 text-white rounded text-sm hover:bg-indigo-700 disabled:opacity-50"
                      >
                         保存变更
                      </button>
                   </div>
                </div>
             </div>
          </div>
      )}

      {/* Issue Tracker Modal */}
      <IssueTrackerModal 
         isOpen={showIssueModal}
         onClose={() => setShowIssueModal(false)}
         issues={issues}
         setIssues={setIssues}
      />

      {/* Risk Scan Modal */}
      <RiskScanModal
         isOpen={showRiskModal}
         onClose={() => setShowRiskModal(false)}
         plans={successionPlans}
      />

      {/* Succession Logs Modal */}
      {showSuccessionLogs && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
             <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[80vh] flex flex-col animate-scale-up">
                <div className="p-4 border-b border-gray-100 flex justify-between items-center">
                   <h3 className="font-bold text-gray-800 flex items-center">
                      <History size={18} className="mr-2" /> 继任计划变更日志
                   </h3>
                   <button onClick={() => setShowSuccessionLogs(false)}><X size={20} className="text-gray-400 hover:text-gray-600"/></button>
                </div>
                <div className="flex-1 overflow-auto p-4">
                   <table className="w-full text-left text-sm">
                      <thead className="bg-gray-50 text-gray-500 sticky top-0">
                         <tr>
                            <th className="p-3">时间</th>
                            <th className="p-3">继任者</th>
                            <th className="p-3">变更</th>
                            <th className="p-3">原因</th>
                         </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                         {successionLogs.length > 0 ? successionLogs.map(log => (
                            <tr key={log.id}>
                               <td className="p-3 text-gray-500 text-xs">{log.timestamp}</td>
                               <td className="p-3 font-medium">{log.employeeName}</td>
                               <td className="p-3 text-xs">
                                  <div className="flex flex-col">
                                     <span className="text-gray-500 line-through text-[10px]">{log.fromBox}</span>
                                     <span className="text-indigo-600 font-medium">&darr; {log.toBox}</span>
                                  </div>
                               </td>
                               <td className="p-3 text-gray-600">{log.reason}</td>
                            </tr>
                         )) : (
                            <tr>
                               <td colSpan={4} className="p-8 text-center text-gray-400">暂无变更记录</td>
                            </tr>
                         )}
                      </tbody>
                   </table>
                </div>
             </div>
          </div>
      )}

      {/* Add Successor Search Modal */}
      {showAddCandidateModal && (
          <AddSuccessorModal 
              isOpen={showAddCandidateModal}
              onClose={() => setShowAddCandidateModal(false)}
              onAdd={handleAddSuccessor}
              candidates={reviewEmployees}
          />
      )}

      {/* Reassignment Modal */}
      <PositionReassignmentModal 
         isOpen={showReassignModal} 
         onClose={() => setShowReassignModal(false)} 
         plans={successionPlans} 
         onUpdate={setSuccessionPlans} 
      />

      {/* Comparison Modal */}
      {selectedPositionPlan && (
          <ComparisonModal 
              title="继任梯队对比视图"
              subtitle={`岗位: ${selectedPositionPlan.position} | 现任: ${selectedPositionPlan.incumbent}`}
              successors={finalSuccessors}
              hiddenCount={hiddenSuccessorIds.size}
              onClose={() => setComparingPositionId(null)}
              onRestore={() => setHiddenSuccessorIds(new Set())}
              onHide={(id) => setHiddenSuccessorIds(new Set(hiddenSuccessorIds).add(id))}
              onRemove={(id) => handleRemoveSuccessor(selectedPositionPlan.id, id)}
              onUpdateReadiness={() => {}}
              onAddClick={() => setShowAddCandidateModal(true)}
              onViewProfile={(s) => setViewProfileSuccessor(s)}
          />
      )}

      {/* Manager Profile (Resume) Modal */}
      <ManagerProfileModal 
         isOpen={!!viewProfileSuccessor}
         onClose={() => setViewProfileSuccessor(null)}
         successor={viewProfileSuccessor}
      />
    </div>
  );
};
