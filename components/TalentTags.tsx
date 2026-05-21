
import React, { useState } from 'react';
import { 
  Tag, 
  Plus, 
  Search, 
  Edit2, 
  Trash2, 
  Users, 
  CheckSquare, 
  Square, 
  Save, 
  X,
  MoreHorizontal,
  RefreshCw,
  Filter,
  Upload
} from 'lucide-react';
import { TalentTag } from '../types';

// Mock Data: Existing Tags
const initialTags: TalentTag[] = [
  { id: '1', name: '高潜人才', category: 'Potential', color: 'bg-purple-100 text-purple-700', count: 12 },
  { id: '2', name: '技术专家', category: 'Skill', color: 'bg-blue-100 text-blue-700', count: 8 },
  { id: '3', name: '海外背景', category: 'General', color: 'bg-green-100 text-green-700', count: 5 },
  { id: '4', name: '管理新星', category: 'Performance', color: 'bg-orange-100 text-orange-700', count: 6 },
  { id: '5', name: '关键岗位', category: 'General', color: 'bg-red-100 text-red-700', count: 3 },
];

// Mock Data: Employees for tagging
const mockEmployees = [
  { id: 'E001', name: '李明', department: '研发中心', role: '高级开发', tags: ['高潜人才', '技术专家'] },
  { id: 'E002', name: '张芳', department: '产品部', role: '产品总监', tags: ['管理新星'] },
  { id: 'E003', name: '王强', department: '销售部', role: '区域经理', tags: ['海外背景'] },
  { id: 'E004', name: '刘洋', department: '设计部', role: '资深设计', tags: ['高潜人才'] },
  { id: 'E005', name: '赵伟', department: '运维部', role: '运维主管', tags: [] },
  { id: 'E006', name: '孙梅', department: 'HR', role: 'HRBP', tags: ['关键岗位'] },
];

interface BatchOperationModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'tags' | 'employees';
  onConfirm: (operation: 'add' | 'delete', text: string) => void;
}

const BatchOperationModal: React.FC<BatchOperationModalProps> = ({ isOpen, onClose, type, onConfirm }) => {
  const [operation, setOperation] = useState<'add' | 'delete'>('add');
  const [inputText, setInputText] = useState('');

  if (!isOpen) return null;

  const handleConfirm = () => {
    onConfirm(operation, inputText);
    setInputText('');
    onClose();
  };

  const placeholder = type === 'tags' 
    ? (operation === 'add' ? '格式: 标签名称, 分类 (例如: 英语流利, Skill)\n一行一个' : '格式: 标签名称\n一行一个')
    : (operation === 'add' ? '格式: 工号, 姓名, 部门, 职位 (例如: E007, 张三, 销售部, 销售经理)\n一行一个' : '格式: 工号\n一行一个');

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-fade-in">
       <div className="bg-white rounded-lg shadow-xl w-full max-w-lg flex flex-col">
          <div className="flex justify-between items-center p-4 border-b border-gray-100">
             <h3 className="font-bold text-gray-800 flex items-center">
                <Upload className="mr-2 text-blue-600" size={20} /> 
                批量{type === 'tags' ? '标签' : '人员'}操作
             </h3>
             <button onClick={onClose}><X size={20} className="text-gray-400 hover:text-gray-600"/></button>
          </div>
          
          <div className="p-6 space-y-4">
             <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">操作类型</label>
                <div className="flex space-x-4">
                   <label className="flex items-center cursor-pointer">
                      <input type="radio" checked={operation === 'add'} onChange={() => setOperation('add')} className="text-blue-600 mr-2" />
                      <span>批量新建 (Import)</span>
                   </label>
                   <label className="flex items-center cursor-pointer">
                      <input type="radio" checked={operation === 'delete'} onChange={() => setOperation('delete')} className="text-red-600 mr-2" />
                      <span>批量删除 (Delete)</span>
                   </label>
                </div>
             </div>

             <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">数据录入</label>
                <textarea 
                   className="w-full border border-gray-300 rounded-md p-3 text-sm h-48 font-mono focus:ring-2 focus:ring-blue-500 outline-none"
                   placeholder={placeholder}
                   value={inputText}
                   onChange={(e) => setInputText(e.target.value)}
                ></textarea>
                <p className="text-xs text-gray-400 mt-2">支持从 Excel 复制粘贴 (Tab 或逗号分隔)</p>
             </div>
          </div>

          <div className="p-4 border-t border-gray-100 flex justify-end space-x-3 bg-gray-50 rounded-b-lg">
             <button onClick={onClose} className="px-4 py-2 border border-gray-300 rounded text-gray-700 bg-white hover:bg-gray-50">取消</button>
             <button onClick={handleConfirm} className="px-4 py-2 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 shadow-sm">确认执行</button>
          </div>
       </div>
    </div>
  );
};

export const TalentTags: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'library' | 'assign'>('library');
  
  // State for Tag Library
  const [tags, setTags] = useState<TalentTag[]>(initialTags);
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTag, setCurrentTag] = useState<Partial<TalentTag>>({});
  
  // State for Assignment
  const [employees, setEmployees] = useState(mockEmployees);
  const [selectedEmps, setSelectedEmps] = useState<Set<string>>(new Set());
  const [actionType, setActionType] = useState<'add' | 'remove' | 'replace' | null>(null);
  const [selectedTagId, setSelectedTagId] = useState<string>('');
  const [replaceTargetId, setReplaceTargetId] = useState<string>('');

  // State for Batch Operations
  const [isBatchModalOpen, setIsBatchModalOpen] = useState(false);
  const [batchType, setBatchType] = useState<'tags' | 'employees'>('tags');

  // --- Library Logic ---
  const handleSaveTag = () => {
    if (currentTag.id) {
      // Edit
      setTags(tags.map(t => t.id === currentTag.id ? { ...t, name: currentTag.name!, category: currentTag.category as any } : t));
    } else {
      // Create
      const newTag: TalentTag = {
        id: Date.now().toString(),
        name: currentTag.name || '新标签',
        category: (currentTag.category as any) || 'General',
        color: 'bg-gray-100 text-gray-700', // Default color logic simplified
        count: 0
      };
      setTags([...tags, newTag]);
    }
    setIsModalOpen(false);
    setCurrentTag({});
  };

  const handleDeleteTag = (id: string) => {
    if (confirm('确定要删除此标签吗？删除后所有员工将移除此标签。')) {
      setTags(tags.filter(t => t.id !== id));
      // In a real app, also remove from all employees
    }
  };

  const filteredTags = tags.filter(tag => 
    tag.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // --- Assignment Logic ---
  const toggleEmpSelection = (id: string) => {
    const newSet = new Set(selectedEmps);
    if (newSet.has(id)) newSet.delete(id);
    else newSet.add(id);
    setSelectedEmps(newSet);
  };

  const toggleAllEmps = () => {
    if (selectedEmps.size === employees.length) setSelectedEmps(new Set());
    else setSelectedEmps(new Set(employees.map(e => e.id)));
  };

  const handleBatchOperation = () => {
    if (!selectedTagId) return;
    
    const tagName = tags.find(t => t.id === selectedTagId)?.name;
    if (!tagName) return;

    let updatedEmps = [...employees];

    if (actionType === 'add') {
      updatedEmps = employees.map(emp => {
        if (selectedEmps.has(emp.id) && !emp.tags.includes(tagName)) {
          return { ...emp, tags: [...emp.tags, tagName] };
        }
        return emp;
      });
    } else if (actionType === 'remove') {
      updatedEmps = employees.map(emp => {
        if (selectedEmps.has(emp.id)) {
          return { ...emp, tags: emp.tags.filter(t => t !== tagName) };
        }
        return emp;
      });
    } else if (actionType === 'replace') {
      const targetName = tags.find(t => t.id === replaceTargetId)?.name;
      if (!targetName) return;
      updatedEmps = employees.map(emp => {
        if (selectedEmps.has(emp.id)) {
          const newTags = emp.tags.map(t => t === targetName ? tagName : t);
          // Dedupe if replace resulted in duplicate
          return { ...emp, tags: Array.from(new Set(newTags)) };
        }
        return emp;
      });
    }

    setEmployees(updatedEmps);
    setActionType(null);
    setSelectedTagId('');
    setReplaceTargetId('');
    setSelectedEmps(new Set());
    alert('批量操作成功！');
  };

  // --- Batch Upload Logic ---
  const handleBatchConfirm = (operation: 'add' | 'delete', text: string) => {
    const lines = text.split('\n').filter(line => line.trim() !== '');
    
    if (batchType === 'tags') {
       if (operation === 'add') {
          const newTags = lines.map(line => {
             const parts = line.split(/[,，\t]/).map(s => s.trim());
             return {
                id: `TAG-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
                name: parts[0],
                category: (parts[1] as any) || 'General',
                color: 'bg-gray-100 text-gray-700',
                count: 0
             };
          });
          setTags(prev => [...prev, ...newTags]);
       } else {
          // Delete by name match
          const namesToDelete = new Set(lines.map(l => l.trim()));
          setTags(prev => prev.filter(t => !namesToDelete.has(t.name)));
       }
    } else {
       // Employees
       if (operation === 'add') {
          const newEmps = lines.map(line => {
             const parts = line.split(/[,，\t]/).map(s => s.trim());
             return {
                id: parts[0] || `E${Date.now()}`,
                name: parts[1] || 'Unknown',
                department: parts[2] || 'Unknown',
                role: parts[3] || 'Employee',
                tags: []
             };
          });
          setEmployees(prev => [...prev, ...newEmps]);
       } else {
          // Delete by ID match
          const idsToDelete = new Set(lines.map(l => l.trim()));
          setEmployees(prev => prev.filter(e => !idsToDelete.has(e.id)));
       }
    }
    alert(`批量${operation === 'add' ? '新建' : '删除'}成功！处理了 ${lines.length} 条记录。`);
  };

  const openBatchModal = (type: 'tags' | 'employees') => {
    setBatchType(type);
    setIsBatchModalOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 flex items-center">
            <Tag className="mr-3 text-blue-600" />
            人才库管理 (Talent Pool)
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            自定义与管理员工属性标签，支持在人才搜索中作为筛选条件
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 flex overflow-hidden">
        <button
          onClick={() => setActiveTab('library')}
          className={`flex-1 py-4 text-sm font-medium flex items-center justify-center transition-colors ${
            activeTab === 'library' 
              ? 'bg-blue-50 text-blue-700 border-b-2 border-blue-600' 
              : 'text-gray-600 hover:bg-gray-50'
          }`}
        >
          <Tag size={16} className="mr-2" /> 标签库管理
        </button>
        <button
          onClick={() => setActiveTab('assign')}
          className={`flex-1 py-4 text-sm font-medium flex items-center justify-center transition-colors ${
            activeTab === 'assign' 
              ? 'bg-blue-50 text-blue-700 border-b-2 border-blue-600' 
              : 'text-gray-600 hover:bg-gray-50'
          }`}
        >
          <Users size={16} className="mr-2" /> 人员标签操作
        </button>
      </div>

      {/* View 1: Tag Library */}
      {activeTab === 'library' && (
        <div className="space-y-6 animate-fade-in">
          <div className="flex justify-between items-center">
             <div className="relative">
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="搜索标签..." 
                  className="pl-4 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
                />
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
             </div>
             <div className="flex space-x-3">
                <button 
                  onClick={() => openBatchModal('tags')}
                  className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 flex items-center shadow-sm"
                >
                  <Upload size={18} className="mr-2" /> 批量上传
                </button>
                <button 
                  onClick={() => { setCurrentTag({}); setIsModalOpen(true); }}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center shadow-sm"
                >
                  <Plus size={18} className="mr-2" /> 新增标签
                </button>
             </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
             {filteredTags.map(tag => (
               <div key={tag.id} className="bg-white rounded-lg border border-gray-100 shadow-sm p-5 hover:shadow-md transition-shadow relative group">
                  <div className="flex justify-between items-start mb-3">
                     <span className={`px-2 py-1 rounded text-xs font-semibold ${tag.color}`}>
                       {tag.category}
                     </span>
                     <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button 
                          onClick={() => { setCurrentTag(tag); setIsModalOpen(true); }}
                          className="p-1 text-gray-400 hover:text-blue-600"
                        >
                          <Edit2 size={14} />
                        </button>
                        <button 
                          onClick={() => handleDeleteTag(tag.id)}
                          className="p-1 text-gray-400 hover:text-red-600"
                        >
                          <Trash2 size={14} />
                        </button>
                     </div>
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 mb-1">{tag.name}</h3>
                  <div className="flex items-center text-sm text-gray-500 mt-4">
                     <Users size={14} className="mr-1" />
                     <span>使用次数: {tag.count}</span>
                  </div>
               </div>
             ))}
             {/* Add New Placeholder */}
             <button 
                onClick={() => { setCurrentTag({}); setIsModalOpen(true); }}
                className="border-2 border-dashed border-gray-200 rounded-lg p-5 flex flex-col items-center justify-center text-gray-400 hover:border-blue-400 hover:text-blue-500 transition-colors h-full min-h-[140px]"
             >
                <Plus size={24} className="mb-2" />
                <span className="font-medium">创建新标签</span>
             </button>
          </div>
        </div>
      )}

      {/* View 2: Assignment */}
      {activeTab === 'assign' && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 flex flex-col h-[600px] animate-fade-in">
           {/* Assignment Toolbar */}
           <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <span className="font-bold">已选人员: {selectedEmps.size}</span>
                {selectedEmps.size > 0 && (
                  <>
                    <span className="w-px h-4 bg-gray-300 mx-2"></span>
                    <button 
                      onClick={() => setActionType('add')}
                      className="px-3 py-1.5 bg-white border border-gray-300 rounded hover:text-blue-600 hover:border-blue-400"
                    >
                      批量添加
                    </button>
                    <button 
                       onClick={() => setActionType('remove')}
                       className="px-3 py-1.5 bg-white border border-gray-300 rounded hover:text-red-600 hover:border-red-400"
                    >
                      批量移除
                    </button>
                    <button 
                       onClick={() => setActionType('replace')}
                       className="px-3 py-1.5 bg-white border border-gray-300 rounded hover:text-orange-600 hover:border-orange-400"
                    >
                      批量替换
                    </button>
                  </>
                )}
              </div>
              <div className="flex items-center space-x-3">
                 <button 
                    onClick={() => openBatchModal('employees')}
                    className="bg-white border border-gray-300 text-gray-700 px-3 py-1.5 rounded hover:bg-gray-50 flex items-center text-sm shadow-sm"
                 >
                    <Upload size={14} className="mr-2" /> 批量上传
                 </button>
                 <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                    <input 
                       type="text" 
                       placeholder="搜索人员..." 
                       className="pl-8 pr-4 py-1.5 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500" 
                    />
                 </div>
              </div>
           </div>

           {/* Employee Table */}
           <div className="flex-1 overflow-auto">
             <table className="w-full text-left text-sm">
                <thead className="bg-gray-50 text-gray-500 sticky top-12 z-10">
                   <tr>
                      <th className="p-4 w-12">
                        <button onClick={toggleAllEmps} className="text-gray-400 hover:text-blue-600">
                           {selectedEmps.size === employees.length && employees.length > 0 ? <CheckSquare size={18} className="text-blue-600"/> : <Square size={18}/>}
                        </button>
                      </th>
                      <th className="p-4 font-medium">工号</th>
                      <th className="p-4 font-medium">姓名</th>
                      <th className="p-4 font-medium">部门 / 职位</th>
                      <th className="p-4 font-medium">当前标签</th>
                   </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                   {employees.map(emp => (
                      <tr key={emp.id} className={`hover:bg-blue-50/30 transition-colors ${selectedEmps.has(emp.id) ? 'bg-blue-50/50' : ''}`}>
                         <td className="p-4">
                            <button onClick={() => toggleEmpSelection(emp.id)} className="text-gray-400 hover:text-blue-600">
                               {selectedEmps.has(emp.id) ? <CheckSquare size={18} className="text-blue-600"/> : <Square size={18}/>}
                            </button>
                         </td>
                         <td className="p-4 font-mono text-gray-500">{emp.id}</td>
                         <td className="p-4 font-medium text-gray-800">{emp.name}</td>
                         <td className="p-4 text-gray-600">{emp.department} - {emp.role}</td>
                         <td className="p-4">
                            <div className="flex flex-wrap gap-2">
                               {emp.tags.length > 0 ? emp.tags.map(tag => (
                                  <span key={tag} className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded text-xs border border-gray-200">
                                     {tag}
                                  </span>
                               )) : <span className="text-gray-400 text-xs italic">无标签</span>}
                            </div>
                         </td>
                      </tr>
                   ))}
                </tbody>
             </table>
           </div>

           {/* Batch Action Panel (Bottom Overlay) */}
           {actionType && (
              <div className="bg-white border-t border-gray-200 p-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] flex items-center justify-between animate-slide-up">
                 <div className="flex items-center space-x-4">
                    <span className="font-bold text-gray-800">
                       {actionType === 'add' ? '添加标签' : actionType === 'remove' ? '移除标签' : '替换标签'}
                    </span>
                    <span className="text-sm text-gray-500">已选 {selectedEmps.size} 人</span>
                    
                    {actionType === 'replace' && (
                       <select 
                          className="border border-gray-300 rounded px-2 py-1.5 text-sm"
                          value={replaceTargetId}
                          onChange={(e) => setReplaceTargetId(e.target.value)}
                       >
                          <option value="">选择要替换的旧标签...</option>
                          {tags.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
                       </select>
                    )}
                    
                    {(actionType === 'replace' ? replaceTargetId : true) && (
                       <>
                         {actionType === 'replace' && <span className="text-gray-400">替换为 &rarr;</span>}
                         <select 
                            className="border border-gray-300 rounded px-2 py-1.5 text-sm"
                            value={selectedTagId}
                            onChange={(e) => setSelectedTagId(e.target.value)}
                         >
                            <option value="">选择标签...</option>
                            {tags.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
                         </select>
                       </>
                    )}
                 </div>
                 <div className="space-x-3">
                    <button onClick={() => setActionType(null)} className="text-gray-600 text-sm hover:underline">取消</button>
                    <button 
                       onClick={handleBatchOperation}
                       disabled={!selectedTagId || (actionType === 'replace' && !replaceTargetId)}
                       className="bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700 disabled:opacity-50"
                    >
                       确认执行
                    </button>
                 </div>
              </div>
           )}
        </div>
      )}

      {/* Create/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
           <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
              <div className="flex justify-between items-center p-4 border-b border-gray-100">
                 <h3 className="font-bold text-gray-800">{currentTag.id ? '编辑标签' : '新增标签'}</h3>
                 <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600"><X size={20}/></button>
              </div>
              <div className="p-6 space-y-4">
                 <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">标签名称</label>
                    <input 
                      type="text" 
                      value={currentTag.name || ''}
                      onChange={(e) => setCurrentTag({ ...currentTag, name: e.target.value })}
                      className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      placeholder="例如：高潜人才"
                    />
                 </div>
                 <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">分类</label>
                    <select 
                       value={currentTag.category || 'General'}
                       onChange={(e) => setCurrentTag({ ...currentTag, category: e.target.value as any })}
                       className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white"
                    >
                       <option value="General">通用 (General)</option>
                       <option value="Performance">绩效 (Performance)</option>
                       <option value="Skill">技能 (Skill)</option>
                       <option value="Potential">潜力 (Potential)</option>
                    </select>
                 </div>
              </div>
              <div className="p-4 border-t border-gray-100 flex justify-end space-x-3">
                 <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded text-sm">取消</button>
                 <button 
                   onClick={handleSaveTag}
                   className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
                 >
                   保存
                 </button>
              </div>
           </div>
        </div>
      )}

      {/* Batch Operation Modal */}
      <BatchOperationModal 
         isOpen={isBatchModalOpen}
         onClose={() => setIsBatchModalOpen(false)}
         type={batchType}
         onConfirm={handleBatchConfirm}
      />
    </div>
  );
};
