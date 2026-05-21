
import React, { useState } from 'react';
import { 
  ChevronRight, 
  ChevronDown, 
  Users, 
  User, 
  MapPin, 
  Building2, 
  Network, 
  Phone,
  Mail,
  MoreHorizontal,
  Briefcase,
  GitFork,
  Layers,
  Award,
  CreditCard,
  Calendar,
  BarChart3
} from 'lucide-react';

// --- Types ---

type ViewType = 'department' | 'position' | 'reporting';

interface BaseNode {
  id: string;
  name: string;
  children?: BaseNode[];
}

interface DeptNode extends BaseNode {
  type: 'department';
  manager: string;
  headcount: number;
  location: string;
  description?: string;
  children?: DeptNode[];
  // New fields
  nameEn?: string;
  alias?: string;
  parentDept?: string;
  reportingLevel?: string;
  deptLevel?: string;
  costCenter?: string;
  personnelSubarea?: string;
  personnelArea?: string;
  company?: string;
}

interface PosNode extends BaseNode {
  type: 'position';
  level: string; // e.g. P5, M3
  hc: number;    // Headcount quota
  filled: number;
  salaryRange?: string;
  children?: PosNode[];
}

interface ReportNode extends BaseNode {
  type: 'reporting';
  title: string;
  dept: string;
  avatar?: string; // Initial
  status: 'Active' | 'On Leave';
  children?: ReportNode[];
}

type OrgNode = DeptNode | PosNode | ReportNode;

// --- Mock Data ---

const deptData: DeptNode = {
  id: '50179900',
  type: 'department',
  name: '大众品牌产品线控制',
  nameEn: 'Product Line Controlling VW',
  alias: 'CFPV',
  manager: '肖隆贵 Xiao Longgui (58225)',
  parentDept: '产品线与材料成本控制 (50179885)',
  reportingLevel: 'R3 (R3)',
  deptLevel: 'M',
  costCenter: 'CFPV大众产品线控制 (824V0)',
  personnelSubarea: '安亭本部-SVW Anting (9001)',
  personnelArea: '上汽大众(安亭) (0SVW)',
  company: '上汽大众 (8000)',
  headcount: 125,
  location: '上海安亭',
  description: '负责大众品牌产品线的成本控制、预算管理及财务分析。',
  children: [
    {
      id: '50179901',
      type: 'department',
      name: '产品线 A 控制组',
      manager: '张三 Zhang San',
      headcount: 45,
      location: '上海安亭',
      description: '负责 A 系列产品线的成本控制。'
    },
    {
      id: '50179902',
      type: 'department',
      name: '产品线 B 控制组',
      manager: '李四 Li Si',
      headcount: 30,
      location: '上海安亭',
    }
  ]
};

const posData: PosNode = {
  id: 'POS-CEO',
  type: 'position',
  name: 'Chief Executive Officer',
  level: 'E1',
  hc: 1,
  filled: 1,
  salaryRange: 'Confidential',
  children: [
    {
      id: 'POS-CTO',
      type: 'position',
      name: 'Chief Technology Officer',
      level: 'E2',
      hc: 1,
      filled: 1,
      children: [
        {
          id: 'POS-RD-DIR',
          type: 'position',
          name: '研发总监 (R&D Director)',
          level: 'M4',
          hc: 3,
          filled: 3,
          children: [
             {
               id: 'POS-ARCH',
               type: 'position',
               name: '首席架构师',
               level: 'P9',
               hc: 2,
               filled: 1
             },
             {
               id: 'POS-DEV-MGR',
               type: 'position',
               name: '开发经理',
               level: 'M2',
               hc: 8,
               filled: 7,
               children: [
                 {
                   id: 'POS-SR-DEV',
                   type: 'position',
                   name: '高级开发工程师',
                   level: 'P6-P7',
                   hc: 25,
                   filled: 22
                 },
                 {
                   id: 'POS-DEV',
                   type: 'position',
                   name: '开发工程师',
                   level: 'P4-P5',
                   hc: 40,
                   filled: 35
                 }
               ]
             }
          ]
        }
      ]
    },
    {
      id: 'POS-CHO',
      type: 'position',
      name: 'Chief HR Officer',
      level: 'E2',
      hc: 1,
      filled: 1,
      children: [
        {
          id: 'POS-HRBP-DIR',
          type: 'position',
          name: 'HRBP Director',
          level: 'M4',
          hc: 1,
          filled: 1,
          children: [
            {
              id: 'POS-HRBP',
              type: 'position',
              name: 'HR Business Partner',
              level: 'P6-P7',
              hc: 15,
              filled: 12
            }
          ]
        }
      ]
    }
  ]
};

const reportData: ReportNode = {
  id: 'USER-001',
  type: 'reporting',
  name: 'Alex Johnson',
  title: 'CEO',
  dept: '集团总部',
  avatar: 'A',
  status: 'Active',
  children: [
    {
      id: 'USER-002',
      type: 'reporting',
      name: 'David Chen',
      title: 'CTO',
      dept: '产研中心',
      avatar: 'D',
      status: 'Active',
      children: [
        {
          id: 'USER-005',
          type: 'reporting',
          name: 'Sarah Wu',
          title: '前端架构负责人',
          dept: '前端架构组',
          avatar: 'S',
          status: 'Active',
          children: [
             { id: 'USER-010', type: 'reporting', name: 'Dev A', title: '高级前端', dept: '前端架构组', avatar: 'D', status: 'Active' },
             { id: 'USER-011', type: 'reporting', name: 'Dev B', title: '前端专家', dept: '前端架构组', avatar: 'D', status: 'Active' }
          ]
        },
        {
          id: 'USER-006',
          type: 'reporting',
          name: 'Mike Zhang',
          title: '后端平台负责人',
          dept: '后端平台组',
          avatar: 'M',
          status: 'Active',
          children: [
             { id: 'USER-012', type: 'reporting', name: 'Dev C', title: '高级后端', dept: '后端平台组', avatar: 'C', status: 'On Leave' },
             { id: 'USER-013', type: 'reporting', name: 'Dev D', title: '后端工程师', dept: '后端平台组', avatar: 'D', status: 'Active' }
          ]
        }
      ]
    },
    {
      id: 'USER-003',
      type: 'reporting',
      name: 'Lisa Zhao',
      title: 'CHO',
      dept: '人力资源中心',
      avatar: 'L',
      status: 'Active',
      children: [
        {
          id: 'USER-008',
          type: 'reporting',
          name: 'HR Lead A',
          title: '招聘经理',
          dept: '人才招聘部',
          avatar: 'H',
          status: 'Active'
        }
      ]
    },
    {
      id: 'USER-004',
      type: 'reporting',
      name: 'Robert Qian',
      title: 'CFO',
      dept: '财务中心',
      avatar: 'R',
      status: 'Active'
    }
  ]
};

// --- Helper Components ---

const TreeNode: React.FC<{ 
  node: OrgNode; 
  onSelect: (node: OrgNode) => void; 
  selectedId: string; 
  level?: number;
}> = ({ 
  node, 
  onSelect, 
  selectedId, 
  level = 0 
}) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const hasChildren = (node as any).children && (node as any).children.length > 0;

  // Icon Logic based on Node Type
  const renderIcon = () => {
    if (node.type === 'department') {
      if (level === 0) return <Network size={16} className="mr-2 text-blue-600" />;
      return hasChildren ? <Building2 size={16} className="mr-2 text-blue-500" /> : <div className="w-4 h-4 mr-2 border-l border-b border-gray-300 rounded-bl-sm" />;
    } else if (node.type === 'position') {
      if (level === 0) return <Award size={16} className="mr-2 text-purple-600" />;
      return <Briefcase size={16} className="mr-2 text-purple-500" />;
    } else if (node.type === 'reporting') {
      if (level === 0) return <User size={16} className="mr-2 text-green-600" />;
      return <User size={16} className="mr-2 text-green-500" />;
    }
    return null;
  };

  return (
    <div className="select-none">
      <div 
        className={`flex items-center p-2 cursor-pointer rounded-md transition-all duration-200 border border-transparent ${
          selectedId === node.id 
            ? 'bg-blue-50 text-blue-700 border-blue-100 shadow-sm' 
            : 'hover:bg-gray-50 text-gray-700 hover:text-gray-900'
        }`}
        style={{ marginLeft: `${level * 12}px` }}
        onClick={() => onSelect(node)}
      >
        <span 
          onClick={(e) => {
            e.stopPropagation();
            setIsExpanded(!isExpanded);
          }}
          className={`mr-1 p-0.5 rounded hover:bg-black/5 transition-colors cursor-pointer ${hasChildren ? 'visible' : 'invisible'}`}
        >
          {isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
        </span>
        
        {renderIcon()}
        
        <span className={`text-sm truncate ${selectedId === node.id ? 'font-semibold' : 'font-medium'}`}>
          {node.name}
        </span>
      </div>
      
      {hasChildren && isExpanded && (
        <div className="relative">
           {/* Vertical Guide Line */}
           <div 
             className="absolute left-0 top-0 bottom-0 border-l border-gray-100" 
             style={{ left: `${(level * 12) + 11}px` }}
           />
           {(node as any).children!.map((child: OrgNode) => (
            <TreeNode 
              key={child.id} 
              node={child} 
              onSelect={onSelect} 
              selectedId={selectedId} 
              level={level + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export const Organization: React.FC<{ initialViewType?: ViewType }> = ({ initialViewType }) => {
  const [viewType, setViewType] = useState<ViewType>(initialViewType || 'department');
  const [selectedNode, setSelectedNode] = useState<OrgNode>(deptData);

  // Switch Data based on view
  const rootNode = viewType === 'department' ? deptData : (viewType === 'position' ? posData : reportData);

  const renderDetails = () => {
    if (selectedNode.type === 'department') {
      const node = selectedNode as DeptNode;
      return (
        <>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
               <div className="bg-gray-50 p-5 rounded-xl border border-gray-100 flex items-start">
                   <div className="p-3 bg-blue-100 rounded-lg text-blue-600 mr-4">
                       <User size={20} />
                   </div>
                   <div>
                       <div className="text-gray-500 text-xs uppercase tracking-wider font-semibold mb-1">负责人</div>
                       <div className="font-bold text-gray-800 text-lg">{node.manager}</div>
                       <button className="text-blue-600 text-xs mt-1 hover:underline flex items-center">
                         <Phone size={10} className="mr-1" /> 联系负责人
                       </button>
                   </div>
               </div>

               <div className="bg-gray-50 p-5 rounded-xl border border-gray-100 flex items-start">
                   <div className="p-3 bg-green-100 rounded-lg text-green-600 mr-4">
                       <Users size={20} />
                   </div>
                   <div>
                       <div className="text-gray-500 text-xs uppercase tracking-wider font-semibold mb-1">编制人数</div>
                       <div className="font-bold text-gray-800 text-lg">{node.headcount} 人</div>
                       <div className="text-green-600 text-xs mt-1 bg-green-50 px-1.5 py-0.5 rounded-full inline-block">
                         编制充足
                       </div>
                   </div>
               </div>

               <div className="bg-gray-50 p-5 rounded-xl border border-gray-100 flex items-start">
                   <div className="p-3 bg-orange-100 rounded-lg text-orange-600 mr-4">
                       <MapPin size={20} />
                   </div>
                   <div>
                       <div className="text-gray-500 text-xs uppercase tracking-wider font-semibold mb-1">办公地点</div>
                       <div className="font-bold text-gray-800 text-lg">{node.location}</div>
                       <div className="text-gray-400 text-xs mt-1">
                         主要办公区域
                       </div>
                   </div>
               </div>
           </div>

           <div className="mb-8">
             <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
               <Layers size={18} className="mr-2 text-gray-400" />
               部门属性
             </h3>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4 bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                <div className="flex justify-between border-b border-gray-50 pb-2">
                   <span className="text-gray-500 text-sm">部门编码</span>
                   <span className="text-gray-800 text-sm font-medium">{node.id}</span>
                </div>
                <div className="flex justify-between border-b border-gray-50 pb-2">
                   <span className="text-gray-500 text-sm">部门名称（中文）</span>
                   <span className="text-gray-800 text-sm font-medium">{node.name}</span>
                </div>
                <div className="flex justify-between border-b border-gray-50 pb-2">
                   <span className="text-gray-500 text-sm">部门名称（英文）</span>
                   <span className="text-gray-800 text-sm font-medium">{node.nameEn || '-'}</span>
                </div>
                <div className="flex justify-between border-b border-gray-50 pb-2">
                   <span className="text-gray-500 text-sm">部门代号</span>
                   <span className="text-gray-800 text-sm font-medium">{node.alias || '-'}</span>
                </div>
                <div className="flex justify-between border-b border-gray-50 pb-2">
                   <span className="text-gray-500 text-sm">上级部门</span>
                   <span className="text-gray-800 text-sm font-medium">{node.parentDept || '-'}</span>
                </div>
                <div className="flex justify-between border-b border-gray-50 pb-2">
                   <span className="text-gray-500 text-sm">汇报层级</span>
                   <span className="text-gray-800 text-sm font-medium">{node.reportingLevel || '-'}</span>
                </div>
                <div className="flex justify-between border-b border-gray-50 pb-2">
                   <span className="text-gray-500 text-sm">部门级别</span>
                   <span className="text-gray-800 text-sm font-medium">{node.deptLevel || '-'}</span>
                </div>
                <div className="flex justify-between border-b border-gray-50 pb-2">
                   <span className="text-gray-500 text-sm">成本中心</span>
                   <span className="text-gray-800 text-sm font-medium">{node.costCenter || '-'}</span>
                </div>
                <div className="flex justify-between border-b border-gray-50 pb-2">
                   <span className="text-gray-500 text-sm">人事范围</span>
                   <span className="text-gray-800 text-sm font-medium">{node.personnelArea || '-'}</span>
                </div>
                <div className="flex justify-between border-b border-gray-50 pb-2">
                   <span className="text-gray-500 text-sm">人事子范围</span>
                   <span className="text-gray-800 text-sm font-medium">{node.personnelSubarea || '-'}</span>
                </div>
                <div className="flex justify-between border-b border-gray-50 pb-2">
                   <span className="text-gray-500 text-sm">公司</span>
                   <span className="text-gray-800 text-sm font-medium">{node.company || '-'}</span>
                </div>
                <div className="flex justify-between border-b border-gray-50 pb-2">
                   <span className="text-gray-500 text-sm">负责人</span>
                   <span className="text-gray-800 text-sm font-medium">{node.manager}</span>
                </div>
             </div>
           </div>
           
           {node.description && (
             <div className="mb-8">
               <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center">
                 <Building2 size={18} className="mr-2 text-gray-400" />
                 部门职能
               </h3>
               <div className="p-4 bg-white border border-gray-200 rounded-lg text-gray-600 leading-relaxed text-sm">
                 {node.description}
               </div>
             </div>
           )}
        </>
      );
    } else if (selectedNode.type === 'position') {
      const node = selectedNode as PosNode;
      return (
        <>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
               <div className="bg-gray-50 p-5 rounded-xl border border-gray-100 flex items-start">
                   <div className="p-3 bg-purple-100 rounded-lg text-purple-600 mr-4">
                       <Layers size={20} />
                   </div>
                   <div>
                       <div className="text-gray-500 text-xs uppercase tracking-wider font-semibold mb-1">职级 (Grade)</div>
                       <div className="font-bold text-gray-800 text-lg">{node.level}</div>
                   </div>
               </div>

               <div className="bg-gray-50 p-5 rounded-xl border border-gray-100 flex items-start">
                   <div className="p-3 bg-blue-100 rounded-lg text-blue-600 mr-4">
                       <Briefcase size={20} />
                   </div>
                   <div>
                       <div className="text-gray-500 text-xs uppercase tracking-wider font-semibold mb-1">编制 (HC / Filled)</div>
                       <div className="font-bold text-gray-800 text-lg">{node.filled} / {node.hc}</div>
                       <div className="w-full bg-gray-200 h-1.5 mt-2 rounded-full">
                          <div className={`h-1.5 rounded-full ${node.filled >= node.hc ? 'bg-red-500' : 'bg-green-500'}`} style={{width: `${Math.min((node.filled/node.hc)*100, 100)}%`}}></div>
                       </div>
                   </div>
               </div>

               <div className="bg-gray-50 p-5 rounded-xl border border-gray-100 flex items-start">
                   <div className="p-3 bg-green-100 rounded-lg text-green-600 mr-4">
                       <CreditCard size={20} />
                   </div>
                   <div>
                       <div className="text-gray-500 text-xs uppercase tracking-wider font-semibold mb-1">薪资范围</div>
                       <div className="font-bold text-gray-800 text-lg">{node.salaryRange || '**********'}</div>
                       <div className="text-gray-400 text-xs mt-1">需权限查看</div>
                   </div>
               </div>
           </div>
        </>
      );
    } else {
      const node = selectedNode as ReportNode;
      return (
        <>
           <div className="bg-white border border-gray-200 rounded-xl p-6 mb-8 flex items-center space-x-6">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center text-white text-3xl font-bold shadow-lg">
                 {node.avatar}
              </div>
              <div>
                 <h3 className="text-2xl font-bold text-gray-800 flex items-center">
                    {node.name}
                    <span className={`ml-3 px-2 py-0.5 rounded text-xs border ${node.status === 'Active' ? 'bg-green-50 text-green-600 border-green-200' : 'bg-yellow-50 text-yellow-600 border-yellow-200'}`}>
                       {node.status}
                    </span>
                 </h3>
                 <p className="text-gray-500 mt-1 flex items-center">
                    <Briefcase size={14} className="mr-1" /> {node.title}
                    <span className="mx-2 text-gray-300">|</span>
                    <Building2 size={14} className="mr-1" /> {node.dept}
                 </p>
                 <div className="flex mt-4 space-x-3">
                    <button className="flex items-center px-3 py-1.5 border border-gray-300 rounded text-sm text-gray-700 hover:bg-gray-50">
                       <Mail size={14} className="mr-2" /> 发送邮件
                    </button>
                    <button className="flex items-center px-3 py-1.5 border border-gray-300 rounded text-sm text-gray-700 hover:bg-gray-50">
                       <Calendar size={14} className="mr-2" /> 查看日历
                    </button>
                 </div>
              </div>
           </div>
        </>
      );
    }
  }

  const getHeaderColor = () => {
    switch(viewType) {
      case 'department': return 'from-blue-600 to-blue-800';
      case 'position': return 'from-purple-600 to-indigo-800';
      case 'reporting': return 'from-green-600 to-teal-800';
      default: return 'from-blue-600 to-blue-800';
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[calc(100vh-140px)] min-h-[600px]">
        {/* Left Tree Panel */}
        <div className="lg:col-span-4 bg-white rounded-lg shadow-sm border border-gray-100 flex flex-col overflow-hidden">
            {/* View Switcher Tabs */}
            <div className="flex border-b border-gray-100 bg-gray-50/50">
               <button 
                 onClick={() => setViewType('department')}
                 className={`flex-1 py-3 text-sm font-medium flex items-center justify-center transition-colors ${
                   viewType === 'department' ? 'text-blue-600 border-b-2 border-blue-600 bg-white' : 'text-gray-500 hover:bg-gray-100'
                 }`}
               >
                 <Network size={14} className="mr-1" /> 部门
               </button>
               <button 
                 onClick={() => setViewType('position')}
                 className={`flex-1 py-3 text-sm font-medium flex items-center justify-center transition-colors ${
                   viewType === 'position' ? 'text-purple-600 border-b-2 border-purple-600 bg-white' : 'text-gray-500 hover:bg-gray-100'
                 }`}
               >
                 <Briefcase size={14} className="mr-1" /> 职位
               </button>
               <button 
                 onClick={() => setViewType('reporting')}
                 className={`flex-1 py-3 text-sm font-medium flex items-center justify-center transition-colors ${
                   viewType === 'reporting' ? 'text-green-600 border-b-2 border-green-600 bg-white' : 'text-gray-500 hover:bg-gray-100'
                 }`}
               >
                 <GitFork size={14} className="mr-1" /> 汇报
               </button>
            </div>

            <div className="p-3 overflow-y-auto flex-1 custom-scrollbar bg-white">
                <TreeNode node={rootNode} onSelect={setSelectedNode} selectedId={selectedNode.id} />
            </div>
        </div>
        
        {/* Right Details Panel */}
        <div className="lg:col-span-8 bg-white rounded-lg shadow-sm border border-gray-100 flex flex-col">
            {/* Header Banner */}
            <div className={`h-32 bg-gradient-to-r ${getHeaderColor()} rounded-t-lg relative p-6 flex flex-col justify-end text-white transition-all duration-500`}>
               <div className="absolute top-4 right-4 space-x-2">
                  <button className="p-2 bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-sm transition-colors">
                    <Mail size={16} />
                  </button>
                  <button className="p-2 bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-sm transition-colors">
                    <MoreHorizontal size={16} />
                  </button>
               </div>
               <h2 className="text-3xl font-bold flex items-center">
                 {selectedNode.name}
               </h2>
               <p className="text-white/80 text-sm mt-1 flex items-center">
                 编码: <span className="font-mono ml-1 bg-white/10 px-1.5 rounded">{selectedNode.id}</span>
               </p>
            </div>
            
            <div className="p-6 md:p-8 flex-1 overflow-y-auto">
               {renderDetails()}

               {selectedNode.children && selectedNode.children.length > 0 && (
                 <div>
                   <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                     {viewType === 'department' ? <Network size={18} className="mr-2 text-gray-400" /> : 
                      viewType === 'position' ? <Layers size={18} className="mr-2 text-gray-400" /> : 
                      <Users size={18} className="mr-2 text-gray-400" />}
                     
                     {viewType === 'department' ? '下级部门' : viewType === 'position' ? '下级职位' : '直接下属'} 
                     ({selectedNode.children.length})
                   </h3>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {selectedNode.children.map((child: any) => (
                        <div 
                          key={child.id} 
                          className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-md transition-all cursor-pointer bg-white group"
                          onClick={() => setSelectedNode(child)}
                        >
                           <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 mr-3 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                              {viewType === 'department' ? (child.children ? <Building2 size={18} /> : <Users size={18} />) :
                               viewType === 'position' ? <Briefcase size={18} /> : 
                               <User size={18} />}
                           </div>
                           <div className="flex-1 min-w-0">
                             <div className="font-semibold text-gray-800 truncate group-hover:text-blue-700">{child.name}</div>
                             <div className="text-xs text-gray-500 flex items-center mt-0.5">
                               {viewType === 'department' ? `${child.manager.split(' ')[0]} | ${child.headcount}人` :
                                viewType === 'position' ? `${child.level} | HC: ${child.hc}` :
                                `${child.title}`}
                             </div>
                           </div>
                           <ChevronRight size={16} className="text-gray-300 group-hover:text-blue-400" />
                        </div>
                      ))}
                   </div>
                 </div>
               )}
            </div>
        </div>
    </div>
  );
}
