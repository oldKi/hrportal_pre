
import React, { useState, useMemo } from 'react';
import { Shield, ChevronDown, ChevronRight, X, Edit, Database, Users, Search, Trash2, Plus, UserPlus, Filter } from 'lucide-react';

interface DeptNode {
  id: number;
  label: string;
  children?: DeptNode[];
}

const DEPT_TREE_DATA: DeptNode[] = [
  {
    id: 100,
    label: '上海汽车',
    children: [
      {
        id: 101,
        label: '大众总公司',
        children: [
          { id: 103, label: '研发部门' },
          { id: 104, label: '市场部门' },
          { id: 105, label: '测试部门' },
          { id: 106, label: '财务部门' },
          { id: 107, label: '运维部门' },
        ]
      },
      {
        id: 102,
        label: '长沙分公司',
        children: [
          { id: 108, label: '市场部门' },
          { id: 109, label: '财务部门' },
        ]
      }
    ]
  }
];

// Recursive Tree Node Component
const DeptTreeItem: React.FC<{
  node: DeptNode;
  level: number;
  selectedIds: Set<number>;
  expandedIds: Set<number>;
  onToggleSelect: (id: number) => void;
  onToggleExpand: (id: number) => void;
}> = ({ node, level, selectedIds, expandedIds, onToggleSelect, onToggleExpand }) => {
  const isSelected = selectedIds.has(node.id);
  const isExpanded = expandedIds.has(node.id);
  const hasChildren = node.children && node.children.length > 0;

  return (
    <div className="select-none">
      <div 
        className="flex items-center py-1.5 hover:bg-blue-50 rounded cursor-pointer transition-colors"
        style={{ paddingLeft: `${level * 20}px` }}
      >
        <button 
          onClick={(e) => { e.stopPropagation(); onToggleExpand(node.id); }}
          className={`p-1 mr-1 text-gray-400 hover:text-gray-600 ${!hasChildren && 'invisible'}`}
        >
          {isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
        </button>
        
        <div 
          className="flex items-center flex-1"
          onClick={() => onToggleSelect(node.id)}
        >
           <input 
            type="checkbox" 
            checked={isSelected} 
            onChange={() => {}} // Handled by parent div click
            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 mr-2 cursor-pointer w-4 h-4"
          />
          <span className="text-sm text-gray-700">{node.label}</span>
        </div>
      </div>
      
      {hasChildren && isExpanded && (
        <div>
           {node.children!.map(child => (
             <DeptTreeItem 
                key={child.id} 
                node={child} 
                level={level + 1}
                selectedIds={selectedIds}
                expandedIds={expandedIds}
                onToggleSelect={onToggleSelect}
                onToggleExpand={onToggleExpand}
             />
           ))}
        </div>
      )}
    </div>
  );
};

const DYNAMIC_GROUPS = [
  { id: 'dg1', label: '所有下属' },
  { id: 'dg2', label: '同级及下属' },
  { id: 'dg3', label: '直接下属' },
  { id: 'dg4', label: '跨部门项目组成员' },
  { id: 'dg5', label: '特定职级人员' },
  { id: 'dg6', label: '人事范围' },
  { id: 'dg7', label: '人事子范围' },
];

const PERSONNEL_AREAS = ['上海总部', '长沙工厂', '北京分公司', '广州研发中心'];
const PERSONNEL_SUBAREAS = ['研发中心', '生产车间', '行政部', '市场部', '财务部'];

const DataPermissionModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  roleName: string;
}> = ({ isOpen, onClose, roleName }) => {
  const [scope, setScope] = useState('2'); // Default to designated for demo
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set([100, 101, 103, 104]));
  const [expandedIds, setExpandedIds] = useState<Set<number>>(new Set([100, 101]));
  const [checkStrictly, setCheckStrictly] = useState(true);
  const [selectedDynamicGroups, setSelectedDynamicGroups] = useState<Set<string>>(new Set(['dg1', 'dg3']));
  const [personnelArea, setPersonnelArea] = useState('');
  const [personnelSubarea, setPersonnelSubarea] = useState('');

  if (!isOpen) return null;

  const toggleSelect = (id: number) => {
    const newSet = new Set(selectedIds);
    if (newSet.has(id)) newSet.delete(id);
    else newSet.add(id);
    setSelectedIds(newSet);
  };

  const toggleDynamicGroup = (id: string) => {
    const newSet = new Set(selectedDynamicGroups);
    if (newSet.has(id)) newSet.delete(id);
    else newSet.add(id);
    setSelectedDynamicGroups(newSet);
  };

  const toggleExpand = (id: number) => {
    const newSet = new Set(expandedIds);
    if (newSet.has(id)) newSet.delete(id);
    else newSet.add(id);
    setExpandedIds(newSet);
  };

  const handleSelectAll = () => {
     if (selectedIds.size > 0) setSelectedIds(new Set());
     else setSelectedIds(new Set([100, 101, 102, 103, 104, 105, 106, 107, 108, 109]));
  };

  const handleExpandAll = () => {
    if (expandedIds.size > 0) setExpandedIds(new Set());
    else setExpandedIds(new Set([100, 101, 102]));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-fade-in">
       <div className="bg-white rounded-lg shadow-xl w-full max-w-lg flex flex-col max-h-[90vh] animate-scale-up">
          {/* Header */}
          <div className="flex justify-between items-center p-4 border-b border-gray-100">
             <h3 className="font-bold text-gray-800 text-lg">分配数据权限</h3>
             <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-full transition-colors">
               <X size={20} className="text-gray-400 hover:text-gray-600"/>
             </button>
          </div>
          
          {/* Body */}
          <div className="p-6 overflow-y-auto space-y-5 custom-scrollbar">
             {/* Form Fields */}
             <div>
               <label className="block text-sm font-medium text-gray-700 mb-1.5">角色名称</label>
               <input 
                 type="text" 
                 value={roleName} 
                 disabled 
                 className="w-full bg-gray-50 border border-gray-300 rounded px-3 py-2 text-sm text-gray-500"
               />
             </div>
             
             <div>
               <label className="block text-sm font-medium text-gray-700 mb-1.5">角色标识</label>
               <input 
                 type="text" 
                 value={roleName === '超级管理员' ? 'admin' : 'common'} 
                 disabled 
                 className="w-full bg-gray-50 border border-gray-300 rounded px-3 py-2 text-sm text-gray-500"
               />
             </div>
             
             <div>
               <label className="block text-sm font-medium text-gray-700 mb-1.5">权限范围</label>
               <select 
                 value={scope} 
                 onChange={(e) => setScope(e.target.value)}
                 className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none bg-white"
               >
                 <option value="1">1. 全部数据权限</option>
                 <option value="2">2. 指定部门数据权限</option>
                 <option value="3">3. 本部门数据权限</option>
                 <option value="4">4. 本部门及以下数据权限</option>
                 <option value="5">5. 仅本人数据权限</option>
                 <option value="6">6. 动态分组</option>
               </select>
             </div>

             {/* Dynamic Group Area - Only show for 'Dynamic Group' */}
             {scope === '6' && (
               <div className="space-y-4">
                  <label className="block text-sm font-medium text-gray-700">系统自定义权限范围分组</label>
                  <div className="border border-gray-200 rounded-md p-4 bg-gray-50">
                     <div className="space-y-3">
                        {DYNAMIC_GROUPS.map(group => (
                          <div key={group.id} className="space-y-2">
                            <label className="flex items-center cursor-pointer hover:text-blue-600">
                              <input 
                                type="checkbox" 
                                className="mr-3 rounded border-gray-300 text-blue-600 focus:ring-blue-500 w-4 h-4 cursor-pointer" 
                                checked={selectedDynamicGroups.has(group.id)} 
                                onChange={() => toggleDynamicGroup(group.id)}
                              /> 
                              <span className="text-sm text-gray-700">{group.label}</span>
                            </label>
                            
                            {/* Personnel Area Dropdown */}
                            {group.id === 'dg6' && selectedDynamicGroups.has('dg6') && (
                              <div className="ml-7 animate-fade-in">
                                <select 
                                  value={personnelArea}
                                  onChange={(e) => setPersonnelArea(e.target.value)}
                                  className="w-full border border-gray-300 rounded px-3 py-1.5 text-xs focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                                >
                                  <option value="">请选择人事范围</option>
                                  {PERSONNEL_AREAS.map(area => (
                                    <option key={area} value={area}>{area}</option>
                                  ))}
                                </select>
                              </div>
                            )}

                            {/* Personnel Subarea Dropdown */}
                            {group.id === 'dg7' && selectedDynamicGroups.has('dg7') && (
                              <div className="ml-7 animate-fade-in">
                                <select 
                                  value={personnelSubarea}
                                  onChange={(e) => setPersonnelSubarea(e.target.value)}
                                  className="w-full border border-gray-300 rounded px-3 py-1.5 text-xs focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                                >
                                  <option value="">请选择人事子范围</option>
                                  {PERSONNEL_SUBAREAS.map(sub => (
                                    <option key={sub} value={sub}>{sub}</option>
                                  ))}
                                </select>
                              </div>
                            )}
                          </div>
                        ))}
                     </div>
                  </div>
               </div>
             )}

             {/* Tree Area - Only show for 'Designated Department' */}
             {scope === '2' && (
               <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">数据权限</label>
                  <div className="border border-gray-200 rounded-md p-4">
                      <div className="flex items-center space-x-4 mb-3 text-xs text-gray-600 border-b border-gray-100 pb-2">
                        <label className="flex items-center cursor-pointer hover:text-blue-600">
                          <input type="checkbox" className="mr-1 rounded text-blue-600 focus:ring-blue-500" checked={checkStrictly} onChange={(e) => setCheckStrictly(e.target.checked)}/> 
                          父子联动(选中父节点自动选中子节点)
                        </label>
                      </div>
                      <div className="flex items-center space-x-4 mb-3 text-xs text-gray-600">
                         <button onClick={handleExpandAll} className="hover:text-blue-600">展开/折叠</button>
                         <button onClick={handleSelectAll} className="hover:text-blue-600">全选/全不选</button>
                      </div>
                      
                      <div className="border rounded bg-gray-50 p-2 h-48 overflow-y-auto custom-scrollbar">
                         {DEPT_TREE_DATA.map(node => (
                           <DeptTreeItem 
                             key={node.id} 
                             node={node} 
                             level={0}
                             selectedIds={selectedIds}
                             expandedIds={expandedIds}
                             onToggleSelect={toggleSelect}
                             onToggleExpand={toggleExpand}
                           />
                         ))}
                      </div>
                  </div>
               </div>
             )}
          </div>
          
          {/* Footer */}
          <div className="p-4 border-t border-gray-100 flex justify-end space-x-3 bg-gray-50 rounded-b-lg">
             <button onClick={onClose} className="px-4 py-2 border border-gray-300 rounded text-sm text-gray-700 bg-white hover:bg-gray-50 transition-colors">
               取消
             </button>
             <button onClick={onClose} className="px-4 py-2 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 shadow-sm transition-colors">
               确定
             </button>
          </div>
       </div>
    </div>
  );
};

interface Member {
  id: string;
  name: string;
  dept: string;
  role: string;
}

const MOCK_MEMBERS: Member[] = [
  { id: '17150', name: '喻言', dept: '信息系统', role: '超级管理员' },
  { id: '10234', name: '张三', dept: '研发部门', role: '超级管理员' },
  { id: '10567', name: '李四', dept: '市场部门', role: '超级管理员' },
  { id: '10890', name: '王五', dept: '财务部门', role: '超级管理员' },
];

const MOCK_EMPLOYEES = [
  { id: '17150', name: '喻言', dept: '信息系统', avatar: 'https://picsum.photos/seed/yuyan/100/100' },
  { id: '10234', name: '张三', dept: '研发部门', avatar: 'https://picsum.photos/seed/zhangsan/100/100' },
  { id: '10567', name: '李四', dept: '市场部门', avatar: 'https://picsum.photos/seed/lisi/100/100' },
  { id: '10890', name: '王五', dept: '财务部门', avatar: 'https://picsum.photos/seed/wangwu/100/100' },
  { id: '11001', name: '赵六', dept: '人力资源', avatar: 'https://picsum.photos/seed/zhaoliu/100/100' },
  { id: '11002', name: '孙七', dept: '行政部', avatar: 'https://picsum.photos/seed/sunqi/100/100' },
  { id: '11003', name: '周八', dept: '法务部', avatar: 'https://picsum.photos/seed/zhouba/100/100' },
];

const MemberAuthorizationModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  roleName: string;
}> = ({ isOpen, onClose, roleName }) => {
  const [members, setMembers] = useState<Member[]>(MOCK_MEMBERS);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState<typeof MOCK_EMPLOYEES[0] | null>(null);
  const [showSearchResults, setShowSearchResults] = useState(false);

  if (!isOpen) return null;

  const filteredMembers = members.filter(m => 
    m.name.includes(searchTerm) || m.id.includes(searchTerm)
  );

  const searchResults = searchQuery ? MOCK_EMPLOYEES.filter(e => 
    e.name.includes(searchQuery) || e.id.includes(searchQuery)
  ).filter(e => !members.some(m => m.id === e.id)) : [];

  const handleDelete = (id: string) => {
    setMembers(members.filter(m => m.id !== id));
  };

  const handleConfirmAdd = () => {
    if (!selectedEmployee) return;
    const newMember: Member = {
      id: selectedEmployee.id,
      name: selectedEmployee.name,
      dept: selectedEmployee.dept,
      role: roleName
    };
    setMembers([...members, newMember]);
    setSelectedEmployee(null);
    setSearchQuery('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-fade-in">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl flex flex-col max-h-[90vh] animate-scale-up">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <Users size={20} className="text-blue-600" />
            <h3 className="font-bold text-gray-800 text-lg">成员授权 - {roleName}</h3>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-full transition-colors">
            <X size={20} className="text-gray-400 hover:text-gray-600"/>
          </button>
        </div>

        {/* Search & Add Bar */}
        <div className="p-4 border-b border-gray-50 bg-gray-50/50 space-y-4">
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input 
                type="text" 
                placeholder="在已授权名单中搜索..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
            
            <div className="relative w-72">
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <UserPlus className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                  <input 
                    type="text" 
                    placeholder="输入姓名或工号查找员工..." 
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setShowSearchResults(true);
                      setSelectedEmployee(null);
                    }}
                    onFocus={() => setShowSearchResults(true)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
              </div>

              {/* Search Results Dropdown */}
              {showSearchResults && searchQuery && searchResults.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-xl z-20 max-h-60 overflow-y-auto custom-scrollbar">
                  {searchResults.map(emp => (
                    <div 
                      key={emp.id}
                      onClick={() => {
                        setSelectedEmployee(emp);
                        setShowSearchResults(false);
                      }}
                      className="p-3 hover:bg-blue-50 cursor-pointer flex items-center gap-3 border-b border-gray-50 last:border-0"
                    >
                      <img src={emp.avatar} alt={emp.name} className="w-8 h-8 rounded-full" referrerPolicy="no-referrer" />
                      <div>
                        <div className="text-sm font-bold text-gray-800">{emp.name}</div>
                        <div className="text-xs text-gray-500">{emp.id} · {emp.dept}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Selected Employee Card */}
          {selectedEmployee && (
            <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 flex items-center justify-between animate-fade-in">
              <div className="flex items-center gap-4">
                <img src={selectedEmployee.avatar} alt={selectedEmployee.name} className="w-12 h-12 rounded-full border-2 border-white shadow-sm" referrerPolicy="no-referrer" />
                <div>
                  <div className="text-base font-bold text-gray-800">{selectedEmployee.name}</div>
                  <div className="text-sm text-gray-600">工号：{selectedEmployee.id} | 部门：{selectedEmployee.dept}</div>
                </div>
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={() => setSelectedEmployee(null)}
                  className="px-3 py-1.5 text-sm text-gray-600 hover:text-gray-800"
                >
                  取消
                </button>
                <button 
                  onClick={handleConfirmAdd}
                  className="px-4 py-1.5 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 shadow-sm"
                >
                  确认加入授权
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Member List */}
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-50 sticky top-0 z-10">
              <tr>
                <th className="px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider border-b border-gray-100">工号</th>
                <th className="px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider border-b border-gray-100">姓名</th>
                <th className="px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider border-b border-gray-100">部门</th>
                <th className="px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider border-b border-gray-100 text-right">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredMembers.length > 0 ? filteredMembers.map((member) => (
                <tr key={member.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 text-sm font-mono text-gray-600">{member.id}</td>
                  <td className="px-6 py-4 text-sm font-bold text-gray-800">{member.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{member.dept}</td>
                  <td className="px-6 py-4 text-right">
                    <button 
                      onClick={() => handleDelete(member.id)}
                      className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                      title="移除授权"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-gray-400">
                    <div className="flex flex-col items-center gap-2">
                      <Users size={32} className="opacity-20" />
                      <p>未找到匹配的成员</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-100 flex justify-between items-center bg-gray-50 rounded-b-lg">
          <span className="text-xs text-gray-500">共 {filteredMembers.length} 位授权成员</span>
          <button onClick={onClose} className="px-6 py-2 bg-white border border-gray-300 rounded text-sm text-gray-700 hover:bg-gray-50 transition-colors">
            关闭
          </button>
        </div>
      </div>
    </div>
  );
};

const RoleModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onSave: (role: { name: string; code: string; description: string }) => void;
  initialData?: { name: string; code: string; description?: string } | null;
}> = ({ isOpen, onClose, onSave, initialData }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    description: ''
  });

  const [wizardOpen, setWizardOpen] = useState(false);
  const [editingAuth, setEditingAuth] = useState<AuthGroup | null>(null);

  // Functional matching
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set(['m1', 'm1-1', 'm2', 'm3']));
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set(['m1', 'm2', 'm3']));
  const [checkStrictly, setCheckStrictly] = useState(true);

  const [activeTab, setActiveTab] = useState<'functional' | 'data'>('functional');

  React.useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name,
        code: initialData.code,
        description: initialData.description || ''
      });
    } else {
      setFormData({ name: '', code: '', description: '' });
    }
    setCurrentStep(1);
    setActiveTab('functional');
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!formData.name || !formData.code) return;
    onSave(formData);
    setFormData({ name: '', code: '', description: '' });
    onClose();
  };

  const toggleSelect = (id: string) => {
    const newSet = new Set(selectedIds);
    if (newSet.has(id)) newSet.delete(id);
    else newSet.add(id);
    setSelectedIds(newSet);
  };

  const toggleExpand = (id: string) => {
    const newSet = new Set(expandedIds);
    if (newSet.has(id)) newSet.delete(id);
    else newSet.add(id);
    setExpandedIds(newSet);
  };

  const handleExpandAll = () => {
    if (expandedIds.size > 0) setExpandedIds(new Set());
    else setExpandedIds(new Set(['m1', 'm1-1', 'm2', 'm2-1', 'm2-2', 'm3', 'm3-1', 'm3-2']));
  };

  const handleSelectAll = () => {
    if (selectedIds.size > 0) setSelectedIds(new Set());
    else {
      const allIds: string[] = [];
      const traverse = (nodes: MenuNode[]) => {
        nodes.forEach(n => {
          allIds.push(n.id);
          if (n.children) traverse(n.children);
        });
      };
      traverse(MENU_TREE_DATA);
      setSelectedIds(new Set(allIds));
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-[#f0f2f5] animate-fade-in overflow-hidden">
      {/* Header */}
      <div className="bg-white px-8 py-4 border-b border-gray-100 shrink-0">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div>
            <h2 className="text-xl font-medium text-gray-900 flex items-center gap-2">
              {initialData ? '编辑角色' : '新增角色'} {formData.name && <span className="font-extrabold">{formData.name}</span>}
            </h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <X size={24} className="text-gray-400" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
         <div className="max-w-7xl mx-auto space-y-6">
            
            {/* Basic Info Section */}
            <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-lg font-bold text-gray-800 mb-6">基础信息</h3>
              <div className="grid grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      权限名称 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="请输入权限名称"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full border border-gray-300 rounded-md px-4 py-2.5 text-sm focus:ring-2 focus:ring-[#0070ad] focus:border-[#0070ad] outline-none transition-shadow"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      权限编码 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="请输入权限编码"
                      value={formData.code}
                      onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                      className="w-full border border-gray-300 rounded-md px-4 py-2.5 text-sm focus:ring-2 focus:ring-[#0070ad] focus:border-[#0070ad] outline-none transition-shadow"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    配置说明（选填）
                  </label>
                  <textarea
                    placeholder="请描述该角色的业务场景或主要用途"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full border border-gray-300 rounded-md px-4 py-2.5 text-sm focus:ring-2 focus:ring-[#0070ad] focus:border-[#0070ad] outline-none transition-shadow min-h-[140px] resize-y"
                  />
                </div>
              </div>
            </div>

            {/* Permissions Section */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden flex flex-col min-h-[500px]">
              <div className="flex border-b border-gray-100 px-6 bg-white shrink-0">
                <button 
                  onClick={() => setActiveTab('functional')}
                  className={`px-6 py-4 text-sm font-bold transition-all relative ${
                    activeTab === 'functional' ? 'text-[#0070ad]' : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  功能权限
                  {activeTab === 'functional' && (
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#0070ad] rounded-t-full" />
                  )}
                </button>
                <button 
                  onClick={() => setActiveTab('data')}
                  className={`px-6 py-4 text-sm font-bold transition-all relative ${
                    activeTab === 'data' ? 'text-[#0070ad]' : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  数据权限 (授权组)
                  {activeTab === 'data' && (
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#0070ad] rounded-t-full" />
                  )}
                </button>
              </div>

              <div className="flex-1 p-6">
                {activeTab === 'functional' && (
                  <div className="space-y-4 animate-fade-in h-full flex flex-col">
                     <div className="flex justify-between items-center bg-gray-50/80 p-3 rounded-lg border border-gray-100 shrink-0">
                       <label className="flex items-center gap-2 cursor-pointer group">
                         <input 
                           type="checkbox" 
                           checked={checkStrictly}
                           onChange={(e) => setCheckStrictly(e.target.checked)}
                           className="rounded border-gray-300 text-[#0070ad] focus:ring-[#0070ad] cursor-pointer"
                         />
                         <span className="text-sm text-gray-700 group-hover:text-gray-900 transition-colors">父子节点联动</span>
                       </label>
                       
                       <div className="space-x-3">
                         <button onClick={handleSelectAll} className="text-sm text-[#0070ad] hover:text-[#005c8f] hover:bg-blue-50 px-2 py-1 rounded transition-colors">
                           {selectedIds.size > 0 ? '取消全选' : '全选'}
                         </button>
                         <button onClick={handleExpandAll} className="text-sm text-gray-600 hover:text-[#0070ad] hover:bg-blue-50 px-2 py-1 rounded transition-colors">
                           {expandedIds.size > 0 ? '折叠全部' : '展开全部'}
                         </button>
                       </div>
                     </div>
                     
                     <div className="border border-gray-200 rounded-lg p-2 flex-1 overflow-y-auto custom-scrollbar bg-white">
                        {MENU_TREE_DATA.map(node => (
                          <MenuTreeItem 
                             key={node.id} 
                             node={node} 
                             level={0}
                             selectedIds={selectedIds}
                             expandedIds={expandedIds}
                             onToggleSelect={toggleSelect}
                             onToggleExpand={toggleExpand}
                          />
                        ))}
                     </div>
                  </div>
                )}

                {activeTab === 'data' && (
                  <div className="space-y-4 animate-fade-in">
                     <div className="flex justify-between items-center mb-6">
                       <h4 className="font-bold text-gray-800">分配授权组</h4>
                       <button 
                         onClick={() => { setEditingAuth(null); setWizardOpen(true); }}
                         className="bg-[#0070ad] text-white px-4 py-2 rounded-md text-sm font-bold shadow-sm hover:bg-[#005c8f] transition-colors flex items-center gap-1.5"
                       >
                         <Plus size={16} /> 新增分配
                       </button>
                     </div>
                     
                     <div className="border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm">
                       <table className="w-full text-left">
                         <thead className="bg-gray-50 border-b border-gray-100 text-[11px] uppercase tracking-wider text-gray-500 font-bold">
                           <tr>
                             <th className="px-6 py-4">ID</th>
                             <th className="px-6 py-4">名称</th>
                             <th className="px-6 py-4">授权访问组</th>
                             <th className="px-6 py-4">目标组</th>
                             <th className="px-6 py-4 text-right whitespace-nowrap">操作</th>
                           </tr>
                         </thead>
                         <tbody className="divide-y divide-gray-100">
                           {MOCK_AUTH_GROUPS.map(group => (
                             <tr key={group.id} className="hover:bg-blue-50/30 transition-colors group">
                               <td className="px-6 py-4 text-sm font-mono text-gray-500">
                                 {group.id}
                               </td>
                               <td className="px-6 py-4">
                                 <span className="text-sm font-bold text-gray-800 group-hover:text-[#0070ad] transition-colors">
                                   {group.name}
                                 </span>
                               </td>
                               <td className="px-6 py-4">
                                 <span className="px-2 py-0.5 bg-blue-50 text-blue-600 border border-blue-100 rounded text-[11px] font-bold">
                                   {group.accessAuthGroup}
                                 </span>
                               </td>
                               <td className="px-6 py-4">
                                 <span className="px-2 py-0.5 bg-green-50 text-green-600 border border-green-100 rounded text-[11px] font-bold">
                                   {group.targetGroup}
                                 </span>
                               </td>
                               <td className="px-6 py-4 text-right">
                                 <div className="flex justify-end gap-2">
                                   <button 
                                     onClick={() => { setEditingAuth(group); setWizardOpen(true); }}
                                     className="p-1.5 text-gray-400 hover:text-[#0070ad] hover:bg-blue-50 rounded transition-colors"
                                   >
                                     <Edit size={14} />
                                   </button>
                                   <button className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded transition-colors"><Trash2 size={14} /></button>
                                 </div>
                               </td>
                             </tr>
                           ))}
                         </tbody>
                       </table>
                     </div>
                  </div>
                )}
              </div>
            </div>
         </div>
      </div>

      {/* Footer */}
      <div className="bg-white px-8 py-5 border-t border-gray-100 shrink-0">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <button 
            onClick={onClose}
            className="px-6 py-2.5 border border-gray-300 text-gray-600 rounded-lg text-sm font-bold hover:bg-gray-50 transition-colors"
          >
            取消
          </button>
          
          <button 
            onClick={() => handleSubmit()}
            className="px-8 py-2.5 bg-[#0070ad] text-white rounded-lg text-sm font-bold hover:bg-[#005c8f] shadow-md transition-all"
          >
            完成
          </button>
        </div>
      </div>

      {wizardOpen && (
        <DataAuthorizationWizard 
          isOpen={wizardOpen}
          onClose={() => setWizardOpen(false)}
          roleName={formData.name || '新角色'}
          initialData={editingAuth}
        />
      )}
    </div>
  );
};

interface MenuNode {
  id: string;
  label: string;
  type: 'directory' | 'menu' | 'button';
  children?: MenuNode[];
}

const MENU_TREE_DATA: MenuNode[] = [
  {
    id: 'm1',
    label: '工作台',
    type: 'directory',
    children: [
      { id: 'm1-1', label: '仪表盘', type: 'menu', children: [
        { id: 'm1-1-1', label: '查看数据', type: 'button' }
      ]}
    ]
  },
  {
    id: 'm2',
    label: '招聘管理',
    type: 'directory',
    children: [
      { id: 'm2-1', label: '招聘需求', type: 'menu', children: [
        { id: 'm2-1-1', label: '新增需求', type: 'button' },
        { id: 'm2-1-2', label: '修改需求', type: 'button' },
        { id: 'm2-1-3', label: '删除需求', type: 'button' }
      ]},
      { id: 'm2-2', label: '招聘进度', type: 'menu', children: [
        { id: 'm2-2-1', label: '查看进度', type: 'button' },
        { id: 'm2-2-2', label: '导出报表', type: 'button' }
      ]}
    ]
  },
  {
    id: 'm3',
    label: '系统管理',
    type: 'directory',
    children: [
      { id: 'm3-1', label: '用户管理', type: 'menu', children: [
        { id: 'm3-1-1', label: '新增用户', type: 'button' },
        { id: 'm3-1-2', label: '重置密码', type: 'button' }
      ]},
      { id: 'm3-2', label: '角色管理', type: 'menu', children: [
        { id: 'm3-2-1', label: '分配权限', type: 'button' },
        { id: 'm3-2-2', label: '成员授权', type: 'button' }
      ]},
      { id: 'm3-3', label: '菜单管理', type: 'menu' }
    ]
  }
];

const MenuTreeItem: React.FC<{
  node: MenuNode;
  level: number;
  selectedIds: Set<string>;
  expandedIds: Set<string>;
  onToggleSelect: (id: string) => void;
  onToggleExpand: (id: string) => void;
}> = ({ node, level, selectedIds, expandedIds, onToggleSelect, onToggleExpand }) => {
  const isSelected = selectedIds.has(node.id);
  const isExpanded = expandedIds.has(node.id);
  const hasChildren = node.children && node.children.length > 0;

  const getTypeIcon = () => {
    switch (node.type) {
      case 'directory': return <span className="px-1.5 py-0.5 bg-blue-100 text-blue-600 text-[10px] rounded mr-2">目录</span>;
      case 'menu': return <span className="px-1.5 py-0.5 bg-green-100 text-green-600 text-[10px] rounded mr-2">菜单</span>;
      case 'button': return <span className="px-1.5 py-0.5 bg-orange-100 text-orange-600 text-[10px] rounded mr-2">按钮</span>;
      default: return null;
    }
  };

  return (
    <div className="select-none">
      <div 
        className="flex items-center py-1.5 hover:bg-slate-50 rounded cursor-pointer transition-colors"
        style={{ paddingLeft: `${level * 24}px` }}
      >
        <button 
          onClick={(e) => { e.stopPropagation(); onToggleExpand(node.id); }}
          className={`p-1 mr-1 text-gray-400 hover:text-gray-600 ${!hasChildren && 'invisible'}`}
        >
          {isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
        </button>
        
        <div 
          className="flex items-center flex-1"
          onClick={() => onToggleSelect(node.id)}
        >
           <input 
            type="checkbox" 
            checked={isSelected} 
            onChange={() => {}}
            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 mr-2 cursor-pointer w-4 h-4"
          />
          {getTypeIcon()}
          <span className={`text-sm ${node.type === 'button' ? 'text-gray-500 italic' : 'text-gray-700 font-medium'}`}>{node.label}</span>
        </div>
      </div>
      
      {hasChildren && isExpanded && (
        <div>
           {node.children!.map(child => (
             <MenuTreeItem 
                key={child.id} 
                node={child} 
                level={level + 1}
                selectedIds={selectedIds}
                expandedIds={expandedIds}
                onToggleSelect={onToggleSelect}
                onToggleExpand={onToggleExpand}
             />
           ))}
        </div>
      )}
    </div>
  );
};

const MenuPermissionModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  roleName: string;
}> = ({ isOpen, onClose, roleName }) => {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set(['m1', 'm1-1', 'm2', 'm3']));
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set(['m1', 'm2', 'm3']));
  const [checkStrictly, setCheckStrictly] = useState(true);

  if (!isOpen) return null;

  const toggleSelect = (id: string) => {
    const newSet = new Set(selectedIds);
    if (newSet.has(id)) newSet.delete(id);
    else newSet.add(id);
    setSelectedIds(newSet);
  };

  const toggleExpand = (id: string) => {
    const newSet = new Set(expandedIds);
    if (newSet.has(id)) newSet.delete(id);
    else newSet.add(id);
    setExpandedIds(newSet);
  };

  const handleExpandAll = () => {
    if (expandedIds.size > 0) setExpandedIds(new Set());
    else setExpandedIds(new Set(['m1', 'm1-1', 'm2', 'm2-1', 'm2-2', 'm3', 'm3-1', 'm3-2']));
  };

  const handleSelectAll = () => {
    if (selectedIds.size > 0) setSelectedIds(new Set());
    else {
      const allIds: string[] = [];
      const traverse = (nodes: MenuNode[]) => {
        nodes.forEach(n => {
          allIds.push(n.id);
          if (n.children) traverse(n.children);
        });
      };
      traverse(MENU_TREE_DATA);
      setSelectedIds(new Set(allIds));
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-fade-in">
       <div className="bg-white rounded-lg shadow-xl w-full max-w-xl flex flex-col max-h-[90vh] animate-scale-up">
          <div className="flex justify-between items-center p-4 border-b border-gray-100">
             <div className="flex items-center gap-2">
               <Edit size={20} className="text-blue-600" />
               <h3 className="font-bold text-gray-800 text-lg">分配菜单权限 - {roleName}</h3>
             </div>
             <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-full transition-colors">
               <X size={20} className="text-gray-400 hover:text-gray-600"/>
             </button>
          </div>
          
          <div className="p-6 overflow-y-auto custom-scrollbar">
             <div className="mb-4 flex items-center justify-between bg-blue-50/50 p-3 rounded-lg border border-blue-100">
                <div className="flex items-center space-x-4 text-xs text-gray-600">
                  <label className="flex items-center cursor-pointer hover:text-blue-600">
                    <input 
                      type="checkbox" 
                      className="mr-1.5 rounded text-blue-600 focus:ring-blue-500" 
                      checked={checkStrictly} 
                      onChange={(e) => setCheckStrictly(e.target.checked)}
                    /> 
                    父子联动
                  </label>
                </div>
                <div className="flex items-center space-x-3 text-xs">
                   <button onClick={handleExpandAll} className="text-blue-600 hover:underline">全部展开/折叠</button>
                   <button onClick={handleSelectAll} className="text-blue-600 hover:underline">全选/全不选</button>
                </div>
             </div>
             
             <div className="border border-gray-200 rounded-lg p-4 bg-white min-h-[400px]">
                {MENU_TREE_DATA.map(node => (
                  <MenuTreeItem 
                    key={node.id} 
                    node={node} 
                    level={0}
                    selectedIds={selectedIds}
                    expandedIds={expandedIds}
                    onToggleSelect={toggleSelect}
                    onToggleExpand={toggleExpand}
                  />
                ))}
             </div>
          </div>
          
          <div className="p-4 border-t border-gray-100 flex justify-end space-x-3 bg-gray-50 rounded-b-lg">
             <button onClick={onClose} className="px-6 py-2 border border-gray-300 rounded text-sm text-gray-700 bg-white hover:bg-gray-50 transition-colors">
               取消
             </button>
             <button onClick={onClose} className="px-6 py-2 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 shadow-sm transition-colors">
               保存权限
             </button>
          </div>
       </div>
    </div>
  );
};

interface PermissionRole {
  id: string;
  name: string;
  code: string;
  type: string;
  memberCount: number;
  status: 'active' | 'inactive';
  createTime: string;
  description?: string;
}

const INITIAL_ROLES: PermissionRole[] = [
  { id: '1', name: '超级管理员', code: 'admin', type: '系统角色', memberCount: 1, status: 'active', createTime: '2024-01-01 10:00:00', description: '系统最高权限，拥有所有功能和数据访问权限' },
  { id: '2', name: 'HRBP', code: 'hrbp', type: '业务角色', memberCount: 12, status: 'active', createTime: '2024-01-02 11:00:00', description: '负责所辖业务部门的人事管理工作' },
  { id: '3', name: '部门经理', code: 'manager', type: '业务角色', memberCount: 45, status: 'active', createTime: '2024-01-03 14:30:00', description: '负责本部门团队成员的管理和审批' },
  { id: '4', name: '普通员工', code: 'employee', type: '基础角色', memberCount: 1200, status: 'active', createTime: '2024-01-04 09:15:00', description: '基础员工自助服务权限' },
  { id: '5', name: '面试官', code: 'interviewer', type: '业务角色', memberCount: 80, status: 'inactive', createTime: '2024-01-05 16:45:00', description: '负责招聘面试评估工作' },
];

interface AuthGroup {
  id: string;
  name: string;
  accessAuthGroup: string;
  targetGroup: string;
}

const MOCK_AUTH_GROUPS: AuthGroup[] = [
  { id: 'ag1', name: '研发中心授权组', accessAuthGroup: '研发中心访问组', targetGroup: '研发全量数据' },
  { id: 'ag2', name: '项目A授权组', accessAuthGroup: '项目A访问组', targetGroup: '项目A成员数据' },
];

const AuthGroupModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  roleName: string;
}> = ({ isOpen, onClose, roleName }) => {
  const [activeTab, setActiveTab] = useState<'functional' | 'authGroup'>('authGroup');
  const [wizardOpen, setWizardOpen] = useState(false);
  const [editingAuth, setEditingAuth] = useState<AuthGroup | null>(null);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-fade-in">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl flex flex-col h-[80vh] animate-scale-up border border-gray-200">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-gray-100 bg-gray-50/50">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-600 text-white rounded-lg">
               <Shield size={20} />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 text-lg">角色授权配置</h3>
              <p className="text-xs text-gray-500 font-medium">角色名称：<span className="text-blue-600 font-bold">{roleName}</span></p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400">
            <X size={20} />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-100 px-6 bg-white shrink-0">
          <button 
            onClick={() => setActiveTab('functional')}
            className={`px-6 py-4 text-sm font-bold transition-all relative ${
              activeTab === 'functional' ? 'text-blue-600' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            功能权限
            {activeTab === 'functional' && (
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-blue-600 rounded-full" />
            )}
          </button>
          <button 
            onClick={() => setActiveTab('authGroup')}
            className={`px-6 py-4 text-sm font-bold transition-all relative ${
              activeTab === 'authGroup' ? 'text-blue-600' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            授权组
            {activeTab === 'authGroup' && (
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-blue-600 rounded-full" />
            )}
          </button>
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-y-auto p-6 bg-[#f8f9fa] custom-scrollbar">
          {activeTab === 'functional' ? (
            <div className="space-y-4">
               <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                  <div className="flex justify-between items-center mb-6">
                     <h4 className="font-bold text-gray-800">功能菜单权限树</h4>
                     <div className="flex gap-2 text-xs">
                        <button className="px-3 py-1 bg-gray-100 text-gray-600 rounded font-bold">全部展开</button>
                        <button className="px-3 py-1 bg-gray-100 text-gray-600 rounded font-bold">全选</button>
                     </div>
                  </div>
                  <div className="border border-gray-100 rounded-lg p-4 bg-gray-50/30">
                    {MENU_TREE_DATA.map(node => (
                      <div key={node.id} className="py-1">
                        <span className="text-sm font-bold text-gray-700 flex items-center gap-2">
                           <input type="checkbox" defaultChecked className="rounded border-gray-300 text-blue-600" />
                           {node.label}
                        </span>
                        {node.children && (
                          <div className="ml-6 mt-1 space-y-1">
                             {node.children.map(child => (
                               <div key={child.id} className="text-xs text-gray-500 flex items-center gap-2">
                                  <input type="checkbox" defaultChecked className="rounded border-gray-300 text-blue-600" />
                                  {child.label}
                               </div>
                             ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
               </div>
            </div>
          ) : (
            <div className="space-y-6 animate-fade-in">
              <div className="flex justify-between items-center">
                 <h4 className="font-bold text-gray-800 flex items-center gap-2">
                   <Users size={18} className="text-blue-600" /> 已分配授权组列表
                 </h4>
                 <button 
                  onClick={() => { setEditingAuth(null); setWizardOpen(true); }}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg text-xs font-bold hover:bg-blue-700 shadow-lg shadow-blue-100 transition-all flex items-center gap-2"
                >
                   <Plus size={14} /> 新增分配
                 </button>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                <table className="w-full text-left border-collapse">
                  <thead className="bg-gray-50 border-b border-gray-100 text-[11px] uppercase tracking-wider text-gray-500 font-bold">
                    <tr>
                      <th className="px-6 py-4">ID</th>
                      <th className="px-6 py-4">名称</th>
                      <th className="px-6 py-4">授权访问组</th>
                      <th className="px-6 py-4">目标组</th>
                      <th className="px-6 py-4 text-right whitespace-nowrap">操作</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {MOCK_AUTH_GROUPS.map(group => (
                      <tr key={group.id} className="hover:bg-blue-50/30 transition-colors group">
                        <td className="px-6 py-4 text-sm font-mono text-gray-500">
                          {group.id}
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
                            {group.name}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="px-2 py-0.5 bg-blue-50 text-blue-600 border border-blue-100 rounded text-[11px] font-bold">
                            {group.accessAuthGroup}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="px-2 py-0.5 bg-green-50 text-green-600 border border-green-100 rounded text-[11px] font-bold">
                            {group.targetGroup}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex justify-end gap-2">
                            <button 
                              onClick={() => { setEditingAuth(group); setWizardOpen(true); }}
                              className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
                            >
                              <Edit size={14} />
                            </button>
                            <button className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded transition-colors"><Trash2 size={14} /></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-6">
                <h5 className="text-[13px] font-bold text-blue-800 mb-4 flex items-center gap-2">
                  <Database size={16} /> 授权内容明细说明
                </h5>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <div className="space-y-1">
                      <p className="text-[11px] text-gray-500 font-bold uppercase tracking-wider">授权组</p>
                      <p className="text-sm text-gray-700 font-medium">定义访问权限的逻辑集合</p>
                   </div>
                   <div className="space-y-1">
                      <p className="text-[11px] text-gray-500 font-bold uppercase tracking-wider">数据权限组</p>
                      <p className="text-sm text-gray-700 font-medium">数据过滤条件的配置集合</p>
                   </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-100 bg-white flex justify-end gap-3 shrink-0 rounded-b-lg">
          <button onClick={onClose} className="px-6 py-2 border border-gray-300 text-gray-600 rounded-lg text-sm font-bold hover:bg-gray-50 transition-colors">
            取消
          </button>
          <button onClick={onClose} className="px-8 py-2 bg-blue-600 text-white rounded-lg text-sm font-bold hover:bg-blue-700 shadow-md shadow-blue-100 transition-all">
            保存配置
          </button>
        </div>
      </div>

      {wizardOpen && (
        <DataAuthorizationWizard 
          isOpen={wizardOpen}
          onClose={() => setWizardOpen(false)}
          roleName={roleName}
          initialData={editingAuth}
        />
      )}
    </div>
  );
};

const DataAuthorizationWizard: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  roleName: string;
  initialData?: AuthGroup | null;
}> = ({ isOpen, onClose, roleName, initialData }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [showGroupSelector, setShowGroupSelector] = useState(false);
  const [formData, setFormData] = useState({
    name: initialData?.name || `Role Assignment ${Date.now()}`,
    description: '',
    status: 'active',
    startDate: '',
    endDate: '',
    
    // Step 2
    grantTargetRole: '经理',
    grantAccessType: 'startGroup',
    startGroup: 'EC-组织岗位-R1领导 (SR)',

    // Step 3
    groupCategory: 'personnel',
    selectedDepartmentGroup: '',
    accessType: 'filter',
    filterByGroup: true,
    filterByAttribute: true,
    selectedAttribute: '授权用户的员工子组',
    excludeSelf: false,
    excludeType: 'user'
  });

  const steps = [
    { id: 1, label: '基本信息' },
    { id: 2, label: '授予访问权限' },
    { id: 3, label: '定义目标组' },
    { id: 4, label: '预览' }
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex flex-col bg-[#f0f2f5] animate-fade-in overflow-hidden">
      {/* Header */}
      <div className="bg-white px-8 py-4 border-b border-gray-100 shrink-0">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div>
            <h2 className="text-xl font-medium text-gray-900 flex items-center gap-2">
              {initialData ? '修改' : '添加'} <span className="font-extrabold">{roleName}</span> 的角色分配
            </h2>
            <p className="text-sm text-gray-500 mt-1">有条件地将角色分配给用户或组。</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <X size={24} className="text-gray-400" />
          </button>
        </div>
      </div>

      {/* Stepper */}
      <div className="bg-white px-8 py-4 border-b border-gray-100 shrink-0">
         <div className="max-w-7xl mx-auto">
            <div className="flex items-center">
               {steps.map((step, idx) => (
                 <React.Fragment key={step.id}>
                    <div className="flex items-center gap-3 relative">
                       <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all border-2 ${
                         currentStep >= step.id 
                           ? 'bg-[#0070ad] border-[#0070ad] text-white shadow-md' 
                           : 'bg-white border-gray-200 text-gray-400'
                       }`}>
                         {step.id}
                       </div>
                       <span className={`text-[13px] font-medium whitespace-nowrap ${
                         currentStep === step.id ? 'text-[#0070ad] font-bold' : 'text-gray-500'
                       }`}>
                         {step.label}
                       </span>
                       {currentStep === step.id && (
                         <div className="absolute -bottom-[20px] left-0 right-0 h-0.5 bg-[#0070ad]" />
                       )}
                    </div>
                    {idx < steps.length - 1 && (
                      <div className="flex-1 mx-6 h-[1px] bg-gray-200 min-w-[30px]" />
                    )}
                 </React.Fragment>
               ))}
            </div>
         </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-12 custom-scrollbar">
         <div className="max-w-7xl mx-auto">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-12 animate-slide-up">
               <h3 className="text-2xl font-bold text-gray-800 mb-10 flex items-center gap-3">
                 <span className="text-[#0070ad] text-3xl opacity-50">{currentStep}.</span> {steps[currentStep - 1].label}
               </h3>

               {currentStep === 1 && (
                 <div className="space-y-8 max-w-3xl ml-4">
                    <div className="grid grid-cols-[150px_1fr] items-center gap-6">
                       <label className="text-sm font-bold text-gray-600 text-right">授权名称：<span className="text-red-500">*</span></label>
                       <div className="relative group">
                          <input 
                            type="text" 
                            className="w-full border border-gray-300 rounded px-4 py-2.5 text-sm focus:border-[#0070ad] focus:ring-1 focus:ring-[#0070ad] outline-none transition-all pr-10 bg-white"
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                          />
                          <button 
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors opacity-0 group-hover:opacity-100"
                            onClick={() => setFormData({...formData, name: ''})}
                          >
                            <X size={16} />
                          </button>
                       </div>
                    </div>

                    <div className="grid grid-cols-[150px_1fr] items-start gap-6">
                       <label className="text-sm font-bold text-gray-600 text-right mt-2">描述：</label>
                       <textarea 
                         className="w-full border border-gray-300 rounded px-4 py-2.5 text-sm focus:border-[#0070ad] focus:ring-1 focus:ring-[#0070ad] outline-none resize-none bg-white"
                         rows={3}
                         value={formData.description}
                         onChange={(e) => setFormData({...formData, description: e.target.value})}
                       />
                    </div>

                    <div className="grid grid-cols-[150px_1fr] items-center gap-6">
                       <label className="text-sm font-bold text-gray-600 text-right">状态：</label>
                       <div className="flex gap-8">
                          <label className="flex items-center gap-2 cursor-pointer group">
                             <input 
                              type="radio" 
                              name="auth_status" 
                              className="w-4 h-4 text-[#0070ad] focus:ring-[#0070ad] border-gray-300 cursor-pointer"
                              checked={formData.status === 'active'}
                              onChange={() => setFormData({...formData, status: 'active'})}
                             />
                             <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900 transition-colors">活动</span>
                          </label>
                          <label className="flex items-center gap-2 cursor-pointer group">
                             <input 
                              type="radio" 
                              name="auth_status" 
                              className="w-4 h-4 text-[#0070ad] focus:ring-[#0070ad] border-gray-300 cursor-pointer"
                              checked={formData.status === 'inactive'}
                              onChange={() => setFormData({...formData, status: 'inactive'})}
                             />
                             <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900 transition-colors">非活动</span>
                          </label>
                       </div>
                    </div>
                 </div>
               )}

               {currentStep === 2 && (
                 <div className="max-w-xl mx-auto space-y-6 pt-4">
                   <select
                     className="w-full h-10 px-3 border border-gray-300 rounded-md shadow-sm focus:ring-[#0070ad] focus:border-[#0070ad] text-sm text-gray-800 bg-white"
                     value={formData.grantTargetRole}
                     onChange={(e) => setFormData({...formData, grantTargetRole: e.target.value})}
                   >
                     <option value="员工">员工</option>
                     <option value="经理">经理</option>
                     <option value="人事经理">人事经理</option>
                     <option value="二级经理">二级经理</option>
                     <option value="跨部门经理">跨部门经理</option>
                   </select>

                   <div className="space-y-4 pt-2">
                     <label className="flex items-center gap-3 cursor-pointer group">
                        <input 
                          type="radio" 
                          name="grant_access_type" 
                          className="w-4 h-4 text-[#0070ad] focus:ring-[#0070ad] border-gray-400 cursor-pointer"
                          checked={formData.grantAccessType === 'all'}
                          onChange={() => setFormData({...formData, grantAccessType: 'all'})}
                        />
                        <span className="text-sm text-gray-800 transition-colors">所有</span>
                     </label>

                     <div className="space-y-3 relative">
                        <div className="flex items-center gap-3">
                          <label className="flex items-center gap-3 cursor-pointer group">
                             <input 
                               type="radio" 
                               name="grant_access_type" 
                               className="w-4 h-4 text-[#0070ad] focus:ring-[#0070ad] border-gray-400 cursor-pointer"
                               checked={formData.grantAccessType === 'startGroup'}
                               onChange={() => setFormData({...formData, grantAccessType: 'startGroup'})}
                             />
                             <span className="text-sm text-gray-800 transition-colors">起始组：</span>
                          </label>
                          <button 
                            className="text-sm text-[#0070ad] hover:underline"
                            onClick={() => setShowGroupSelector(!showGroupSelector)}
                          >
                            选择组
                          </button>
                        </div>
                        {formData.grantAccessType === 'startGroup' && formData.startGroup && (
                          <div className="ml-7 flex items-center relative">
                             <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded border border-gray-300 text-[13px] text-gray-800 bg-white shadow-sm hover:border-[#0070ad] transition-colors">
                               {formData.startGroup}
                               <button 
                                 className="text-gray-500 hover:text-gray-800 ml-1 leading-none text-base"
                                 onClick={() => setFormData({...formData, startGroup: ''})}
                               ><X size={14} /></button>
                             </span>
                          </div>
                        )}
                        {formData.grantAccessType === 'startGroup' && showGroupSelector && (
                                  <div className="absolute top-full left-0 mt-2 w-64 bg-white border border-gray-200 shadow-lg rounded-lg z-10 py-2 animate-fade-in divide-y divide-gray-50">
                                     <div className="px-4 py-2 bg-gray-50/50">
                                        <span className="text-xs font-bold text-gray-500 uppercase">动态分组</span>
                                     </div>
                                     {DYNAMIC_GROUPS.map(group => (
                                       <button
                                         key={group.id}
                                         className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-[#0070ad] transition-colors"
                                         onClick={() => {
                                           setFormData({...formData, startGroup: group.label});
                                           setShowGroupSelector(false);
                                         }}
                                       >
                                         {group.label}
                                       </button>
                                     ))}
                                  </div>
                                )}
                      </div>
                    </div>
                  </div>
                )}

               {currentStep === 3 && (
                 <div className="space-y-6 max-w-3xl ml-4">
                    <div className="grid grid-cols-[150px_1fr] items-center gap-6">
                       <label className="text-sm font-bold text-gray-600 text-right">分类：</label>
                       <div className="flex gap-6">
                          <label className="flex items-center gap-2 cursor-pointer group">
                             <input 
                               type="radio" 
                               name="groupCategory" 
                               className="w-4 h-4 text-[#0070ad] focus:ring-[#0070ad] border-gray-300 cursor-pointer"
                               checked={formData.groupCategory === 'personnel'}
                               onChange={() => setFormData({...formData, groupCategory: 'personnel'})}
                             />
                             <span className="text-sm font-medium text-gray-700 transition-colors group-hover:text-gray-900">人员组</span>
                          </label>
                          <label className="flex items-center gap-2 cursor-pointer group">
                             <input 
                               type="radio" 
                               name="groupCategory" 
                               className="w-4 h-4 text-[#0070ad] focus:ring-[#0070ad] border-gray-300 cursor-pointer"
                               checked={formData.groupCategory === 'department'}
                               onChange={() => setFormData({...formData, groupCategory: 'department'})}
                             />
                             <span className="text-sm font-medium text-gray-700 transition-colors group-hover:text-gray-900">部门组</span>
                          </label>
                       </div>
                    </div>

                    {formData.groupCategory === 'personnel' && (
                       <div className="space-y-4">
                         <label className="flex items-center gap-3 cursor-pointer group">
                           <input 
                             type="radio" 
                             name="access_type" 
                             className="w-4 h-4 text-[#0070ad] focus:ring-[#0070ad] border-gray-300 cursor-pointer"
                             checked={formData.accessType === 'all'}
                             onChange={() => setFormData({...formData, accessType: 'all'})}
                           />
                           <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                             {formData.grantTargetRole === '经理' ? '所有下属' :
                              formData.grantTargetRole === '人事经理' ? '所有人事下属' :
                              formData.grantTargetRole === '二级经理' ? '所有二级下属员工' :
                              formData.grantTargetRole === '跨部门经理' ? '所有虚线下属' :
                              '所有人'}
                           </span>
                         </label>
                         <label className="flex items-start gap-3 cursor-pointer group">
                           <input 
                             type="radio" 
                             name="access_type" 
                             className="w-4 h-4 text-[#0070ad] focus:ring-[#0070ad] border-gray-300 cursor-pointer mt-0.5"
                             checked={formData.accessType === 'filter'}
                             onChange={() => setFormData({...formData, accessType: 'filter'})}
                           />
                           <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900 mt-0.5">过滤方式：</span>
                         </label>
                         
                         {formData.accessType === 'filter' && (
                           <div className="ml-7 pl-4 border-l-2 border-transparent space-y-4 animate-fade-in">
                              <div className="space-y-3">
                                 <label className="flex items-center gap-2 cursor-pointer group">
                                    <input 
                                      type="checkbox" 
                                      className="rounded border-gray-300 text-[#0070ad] focus:ring-[#0070ad] cursor-pointer"
                                      checked={formData.filterByGroup}
                                      onChange={(e) => setFormData({...formData, filterByGroup: e.target.checked})}
                                    />
                                    <span className="text-sm text-gray-700">目标组</span>
                                    <button className="text-sm text-[#0070ad] hover:underline ml-2">选择组</button>
                                 </label>
                                 {formData.filterByGroup && (
                                   <div className="ml-6 flex items-center gap-2">
                                     <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-white border border-gray-200 text-sm text-gray-700 shadow-sm">
                                       EC-人事-目标组-SV所有员工信息
                                       <button className="text-gray-400 hover:text-gray-600"><X size={14} /></button>
                                     </span>
                                   </div>
                                 )}
                              </div>

                           </div>
                         )}
                       </div>
                    )}

                    {formData.groupCategory === 'department' && (
                       <div className="grid grid-cols-[150px_1fr] items-center gap-6 animate-fade-in">
                          <label className="text-sm font-bold text-gray-600 text-right">部门自定义组：</label>
                          <select 
                            className="w-full max-w-[250px] border border-gray-300 rounded px-4 py-2.5 text-sm focus:border-[#0070ad] focus:ring-1 focus:ring-[#0070ad] outline-none bg-white appearance-none cursor-pointer"
                            value={formData.selectedDepartmentGroup}
                            onChange={(e) => setFormData({...formData, selectedDepartmentGroup: e.target.value})}
                          >
                            <option value="">请选择部门组</option>
                            <option value="研发中心组">研发中心组</option>
                            <option value="销售大区组">销售大区组</option>
                            <option value="职能支持组">职能支持组</option>
                          </select>
                       </div>
                    )}
                 </div>
               )}

               {currentStep === 4 && (
                 <div className="space-y-8 animate-fade-in">
                    <div className="border border-gray-200 rounded-lg bg-gray-50 overflow-hidden shadow-sm">
                       <div className="px-6 py-4 border-b border-gray-200 bg-gray-100 flex justify-between items-center">
                          <h4 className="font-bold text-gray-800 flex items-center gap-3">
                             <div className="w-6 h-6 rounded bg-white border border-gray-300 flex justify-center items-center text-xs text-[#0070ad] font-bold shadow-sm">1</div>
                             基本信息
                          </h4>
                          <button onClick={() => setCurrentStep(1)} className="text-sm font-medium text-[#0070ad] hover:text-[#005c8d] underline transition-colors">修改</button>
                       </div>
                       <div className="p-8 grid grid-cols-2 gap-y-6 gap-x-12 bg-white">
                          <div className="flex flex-col gap-1.5">
                             <span className="text-[11px] text-gray-400 font-bold uppercase tracking-wider">授权名称</span>
                             <span className="text-sm font-medium text-gray-900">{formData.name || '-'}</span>
                          </div>
                          <div className="flex flex-col gap-1.5">
                             <span className="text-[11px] text-gray-400 font-bold uppercase tracking-wider">状态</span>
                             <span className="text-sm font-medium text-gray-900">
                               <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-bold shadow-sm border ${formData.status === 'active' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-gray-50 text-gray-600 border-gray-200'}`}>
                                  {formData.status === 'active' ? '活动' : '非活动'}
                               </span>
                             </span>
                          </div>
                          <div className="flex flex-col gap-1.5 col-span-2">
                             <span className="text-[11px] text-gray-400 font-bold uppercase tracking-wider">描述</span>
                             <span className="text-sm font-medium text-gray-900 bg-gray-50 p-3 rounded border border-gray-100 min-h-[60px]">{formData.description || '-'}</span>
                          </div>
                       </div>
                    </div>

                    <div className="border border-gray-200 rounded-lg bg-gray-50 overflow-hidden shadow-sm">
                       <div className="px-6 py-4 border-b border-gray-200 bg-gray-100 flex justify-between items-center">
                          <h4 className="font-bold text-gray-800 flex items-center gap-3">
                             <div className="w-6 h-6 rounded bg-white border border-gray-300 flex justify-center items-center text-xs text-[#0070ad] font-bold shadow-sm">2</div>
                             授予访问权限
                          </h4>
                          <button onClick={() => setCurrentStep(2)} className="text-sm font-medium text-[#0070ad] hover:text-[#005c8d] underline transition-colors">修改</button>
                       </div>
                       <div className="p-8 grid grid-cols-2 gap-y-6 gap-x-12 bg-white">
                          <div className="flex flex-col gap-1.5 col-span-2">
                             <span className="text-[11px] text-gray-400 font-bold uppercase tracking-wider">授予范围</span>
                             <div className="text-sm font-medium text-gray-900 flex items-center gap-4">
                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-gray-50 border border-gray-200 font-bold text-gray-800">
                                  {formData.grantTargetRole}
                                </span>
                                {formData.grantAccessType === 'all' ? (
                                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-blue-50 border border-blue-100 text-blue-700 font-bold">所有</span>
                                ) : (
                                   <div className="flex items-center gap-2">
                                      <span className="text-gray-500">起始组：</span>
                                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-gray-50 border border-gray-200 text-[13px] font-bold text-gray-800 whitespace-pre">
                                         {formData.startGroup || '-'}
                                      </span>
                                   </div>
                                )}
                             </div>
                          </div>
                       </div>
                    </div>

                    <div className="border border-gray-200 rounded-lg bg-gray-50 overflow-hidden shadow-sm">
                       <div className="px-6 py-4 border-b border-gray-200 bg-gray-100 flex justify-between items-center">
                          <h4 className="font-bold text-gray-800 flex items-center gap-3">
                             <div className="w-6 h-6 rounded bg-white border border-gray-300 flex justify-center items-center text-xs text-[#0070ad] font-bold shadow-sm">3</div>
                             定义目标组
                          </h4>
                          <button onClick={() => setCurrentStep(3)} className="text-sm font-medium text-[#0070ad] hover:text-[#005c8d] underline transition-colors">修改</button>
                       </div>
                       <div className="p-8 grid grid-cols-2 gap-y-6 gap-x-12 bg-white">
                          <div className="flex flex-col gap-1.5 border-b border-gray-100 pb-4">
                             <span className="text-[11px] text-gray-400 font-bold uppercase tracking-wider">授予哪些对象访问权限</span>
                             <span className="text-sm font-bold text-gray-800">{formData.groupCategory === 'personnel' ? '按组织结构' : '按地理位置'}</span>
                          </div>
                          <div className="flex flex-col gap-1.5 border-b border-gray-100 pb-4">
                             <span className="text-[11px] text-gray-400 font-bold uppercase tracking-wider">选择部门组</span>
                             <span className="text-sm font-bold text-gray-800">{formData.selectedDepartmentGroup || '-'}</span>
                          </div>
                          <div className="flex flex-col gap-1.5">
                             <span className="text-[11px] text-gray-400 font-bold uppercase tracking-wider">过滤类型</span>
                             <span className="text-sm font-bold text-gray-800">{formData.accessType === 'filter' ? '筛选条件' : '排除自身数据'}</span>
                          </div>
                          {formData.accessType === 'filter' && (
                            <div className="flex flex-col gap-1.5">
                               <span className="text-[11px] text-gray-400 font-bold uppercase tracking-wider">具体筛选条件</span>
                               <div className="text-sm font-bold text-gray-800 flex flex-col gap-2">
                                  {formData.filterByGroup && <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-[#0070ad]" /> 包含选定的部门/组织树</span>}
                               </div>
                            </div>
                          )}
                       </div>
                    </div>
                 </div>
               )}
            </div>
         </div>
      </div>

      {/* Footer */}
      <div className="bg-[#f0f2f5] px-12 py-6 border-t border-gray-200 shrink-0">
         <div className="max-w-7xl mx-auto flex justify-between">
            <button 
              onClick={onClose}
              className="px-6 py-2 bg-white border border-gray-300 text-gray-600 rounded text-sm font-bold hover:bg-gray-50 transition-all"
            >
              取消
            </button>
            <div className="flex gap-3">
               {currentStep > 1 && (
                 <button 
                   onClick={() => setCurrentStep(currentStep - 1)}
                   className="px-8 py-2 bg-white border border-gray-300 text-gray-600 rounded text-sm font-bold hover:bg-gray-50 transition-all flex items-center gap-2"
                 >
                   上一步
                 </button>
               )}
               {currentStep < steps.length && (
                 <button 
                   onClick={() => setCurrentStep(currentStep + 1)}
                   className="px-10 py-2 bg-[#0070ad] text-white rounded text-sm font-bold hover:bg-[#005c8d] shadow-md shadow-blue-100 transition-all flex items-center gap-2"
                 >
                   下一步
                 </button>
               )}
               {currentStep === steps.length && (
                 <button 
                   onClick={onClose}
                   className="px-10 py-2 bg-green-600 text-white rounded text-sm font-bold hover:bg-green-700 shadow-md shadow-green-100 transition-all flex items-center gap-2"
                 >
                   完成并保存
                 </button>
               )}
            </div>
         </div>
      </div>
    </div>
  );
};

export const PermissionManagement: React.FC = () => {
  const [dataPermModal, setDataPermModal] = useState({ open: false, role: '' });
  const [memberModal, setMemberModal] = useState({ open: false, role: '' });
  const [addRoleModalOpen, setAddRoleModalOpen] = useState(false);
  const [editingRole, setEditingRole] = useState<PermissionRole | null>(null);
  
  const [roles, setRoles] = useState<PermissionRole[]>(INITIAL_ROLES);
  const [quickSearch, setQuickSearch] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  
  // Column filters
  const [filters, setFilters] = useState({
    name: '',
    code: '',
    type: '',
    status: '',
    createTime: ''
  });

  const handleSaveRole = (roleData: { name: string; code: string; description: string }) => {
    if (editingRole) {
      setRoles(roles.map(r => r.id === editingRole.id ? { ...r, ...roleData } : r));
    } else {
      const newRole: PermissionRole = {
        id: Date.now().toString(),
        name: roleData.name,
        code: roleData.code,
        description: roleData.description,
        type: '自定义角色',
        memberCount: 0,
        status: 'active',
        createTime: new Date().toISOString().replace('T', ' ').substring(0, 19)
      };
      setRoles([...roles, newRole]);
    }
    setEditingRole(null);
  };

  const filteredRoles = useMemo(() => {
    return roles.filter(role => {
      // Quick search (name or code)
      if (quickSearch && !role.name.includes(quickSearch) && !role.code.includes(quickSearch)) {
        return false;
      }
      
      // Column filters
      if (filters.name && !role.name.includes(filters.name)) return false;
      if (filters.code && !role.code.includes(filters.code)) return false;
      if (filters.type && !role.type.includes(filters.type)) return false;
      if (filters.status && role.status !== filters.status) return false;
      if (filters.createTime && !role.createTime.includes(filters.createTime)) return false;
      
      return true;
    });
  }, [roles, quickSearch, filters]);

  const handleFilterChange = (key: keyof typeof filters, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
         <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
           <div>
             <h3 className="font-bold text-gray-800">权限角色管理</h3>
             <p className="text-sm text-gray-500">管理系统角色及其对应的功能访问权限</p>
           </div>
           
           <div className="flex items-center gap-3 w-full md:w-auto">
             {/* Quick Search */}
             <div className="relative flex-1 md:w-64">
               <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
               <input 
                 type="text" 
                 placeholder="快速检索权限名称/编码..." 
                 value={quickSearch}
                 onChange={(e) => setQuickSearch(e.target.value)}
                 className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 outline-none"
               />
             </div>
             
             <button 
               onClick={() => setShowFilters(!showFilters)}
               className={`p-2 border rounded-md transition-colors flex items-center gap-1 ${showFilters ? 'bg-blue-50 border-blue-200 text-blue-600' : 'border-gray-300 text-gray-600 hover:bg-gray-50'}`}
               title="高级筛选"
             >
               <Filter size={18} />
               <span className="text-sm hidden sm:inline">筛选</span>
             </button>

             <button 
               onClick={() => setAddRoleModalOpen(true)}
               className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700 flex items-center gap-1 whitespace-nowrap"
             >
               <Plus size={16} /> 新增角色
             </button>
           </div>
         </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">权限名称</th>
                <th className="px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">权限编码</th>
                <th className="px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">权限类型</th>
                <th className="px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">描述</th>
                <th className="px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">状态</th>
                <th className="px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">创建时间</th>
                <th className="px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredRoles.length > 0 ? filteredRoles.map((role) => (
                <tr 
                  key={role.id} 
                  className="hover:bg-slate-50 transition-colors cursor-pointer"
                  onClick={() => {
                    setEditingRole(role);
                    setAddRoleModalOpen(true);
                  }}
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 bg-blue-50 text-blue-600 rounded-md">
                        <Shield size={16} />
                      </div>
                      <span className="font-bold text-gray-800 text-sm">{role.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm font-mono text-gray-600">{role.code}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{role.type}</td>
                  <td className="px-6 py-4 text-sm text-gray-500 w-64 truncate" title={role.description}>{role.description || '-'}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                      role.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {role.status === 'active' ? '正常' : '停用'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">{role.createTime}</td>
                  <td className="px-6 py-4 text-right space-x-2" onClick={(e) => e.stopPropagation()}>
                    <button 
                      onClick={() => {
                        setEditingRole(role);
                        setAddRoleModalOpen(true);
                      }}
                      className="text-blue-600 hover:text-blue-800 text-sm font-bold transition-colors"
                      title="编辑"
                    >
                      <Edit size={16} />
                    </button>
                    <button 
                      onClick={() => setRoles(roles.filter(r => r.id !== role.id))}
                      className="text-gray-400 hover:text-red-500 text-sm font-bold transition-colors ml-2"
                      title="删除"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-gray-400">
                    <div className="flex flex-col items-center gap-2">
                      <Shield size={32} className="opacity-20" />
                      <p>未找到匹配的权限记录</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination (Mock) */}
        <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between bg-gray-50">
          <span className="text-sm text-gray-500">
            显示 {filteredRoles.length > 0 ? 1 : 0} 到 {filteredRoles.length} 条，共 {filteredRoles.length} 条记录
          </span>
          <div className="flex gap-1">
            <button className="px-3 py-1 border border-gray-300 rounded bg-white text-gray-500 hover:bg-gray-50 disabled:opacity-50" disabled>上一页</button>
            <button className="px-3 py-1 border border-blue-500 rounded bg-blue-50 text-blue-600 font-medium">1</button>
            <button className="px-3 py-1 border border-gray-300 rounded bg-white text-gray-500 hover:bg-gray-50 disabled:opacity-50" disabled>下一页</button>
          </div>
        </div>
      </div>

      <DataPermissionModal 
        isOpen={dataPermModal.open} 
        onClose={() => setDataPermModal({ open: false, role: '' })}
        roleName={dataPermModal.role}
      />

      <MemberAuthorizationModal 
        isOpen={memberModal.open}
        onClose={() => setMemberModal({ open: false, role: '' })}
        roleName={memberModal.role}
      />

      <RoleModal 
        isOpen={addRoleModalOpen}
        onClose={() => {
          setAddRoleModalOpen(false);
          setEditingRole(null);
        }}
        onSave={handleSaveRole}
        initialData={editingRole}
      />

      {/* Filter Drawer */}
      {showFilters && (
        <div className="fixed inset-0 z-50 flex justify-end animate-fade-in">
          <div 
            className="absolute inset-0 bg-black/20 backdrop-blur-sm" 
            onClick={() => setShowFilters(false)}
          />
          <div className="relative w-80 bg-white h-full shadow-2xl flex flex-col animate-slide-in-right">
            <div className="flex justify-between items-center p-4 border-b border-gray-100">
              <h3 className="font-bold text-gray-800 flex items-center gap-2">
                <Filter size={18} className="text-blue-600" /> 高级筛选
              </h3>
              <button onClick={() => setShowFilters(false)} className="p-1 hover:bg-gray-100 rounded-full transition-colors">
                <X size={20} className="text-gray-400 hover:text-gray-600"/>
              </button>
            </div>
            
            <div className="p-5 flex-1 overflow-y-auto space-y-5 custom-scrollbar">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">权限名称</label>
                <input 
                  type="text" 
                  value={filters.name} 
                  onChange={(e) => handleFilterChange('name', e.target.value)} 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 outline-none" 
                  placeholder="请输入权限名称" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">权限编码</label>
                <input 
                  type="text" 
                  value={filters.code} 
                  onChange={(e) => handleFilterChange('code', e.target.value)} 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 outline-none" 
                  placeholder="请输入权限编码" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">权限类型</label>
                <input 
                  type="text" 
                  value={filters.type} 
                  onChange={(e) => handleFilterChange('type', e.target.value)} 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 outline-none" 
                  placeholder="请输入权限类型" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">状态</label>
                <select 
                  value={filters.status} 
                  onChange={(e) => handleFilterChange('status', e.target.value)} 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                >
                  <option value="">全部</option>
                  <option value="active">正常</option>
                  <option value="inactive">停用</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">创建时间</label>
                <input 
                  type="text" 
                  value={filters.createTime} 
                  onChange={(e) => handleFilterChange('createTime', e.target.value)} 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 outline-none" 
                  placeholder="请输入创建时间" 
                />
              </div>
            </div>
            
            <div className="p-4 border-t border-gray-100 flex gap-3 bg-gray-50">
              <button 
                onClick={() => setFilters({name: '', code: '', type: '', status: '', createTime: ''})} 
                className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-sm text-gray-700 bg-white hover:bg-gray-50 transition-colors"
              >
                重置
              </button>
              <button 
                onClick={() => setShowFilters(false)} 
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700 transition-colors shadow-sm"
              >
                查看结果
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
