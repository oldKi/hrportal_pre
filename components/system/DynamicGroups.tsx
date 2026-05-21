import React, { useState, useEffect } from 'react';
import { Users, Target, Plus, Search, Filter, Edit, Trash2, Settings, X, ChevronLeft, ChevronRight } from 'lucide-react';

interface Rule {
  id: string;
  field: string;
  operator: string;
  value: string;
}

interface Group {
  id: string;
  name: string;
  description: string;
  count: number;
  status: string;
  rules?: Rule[];
}

interface Member {
  id: string;
  name: string;
  empId: string;
  department: string;
  position: string;
}

const generateMockGroups = (count: number, prefix: string): Group[] => {
  return Array.from({ length: count }).map((_, i) => ({
    id: `${prefix}-${i + 1}`,
    name: `${prefix}组 ${i + 1}`,
    description: `这是${prefix}组 ${i + 1}的描述信息...`,
    count: Math.floor(Math.random() * 100) + 10,
    status: i % 5 === 0 ? 'Inactive' : 'Active',
    rules: []
  }));
};

const generateMockMembers = (count: number): Member[] => {
  return Array.from({ length: count }).map((_, i) => ({
    id: `M${i}`,
    name: `员工${i + 1}`,
    empId: `E${10000 + i}`,
    department: ['研发部', '产品部', '销售部', 'HR部'][Math.floor(Math.random() * 4)],
    position: ['工程师', '产品经理', '销售专员', 'HR专员'][Math.floor(Math.random() * 4)],
  }));
};

export const DynamicGroups: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'personnel' | 'department'>('personnel');
  const [editingGroup, setEditingGroup] = useState<Group | null>(null);
  
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 20;

  const [viewingMembersGroup, setViewingMembersGroup] = useState<Group | null>(null);
  const [groupMembers, setGroupMembers] = useState<Member[]>([]);

  const [personnelGroups, setPersonnelGroups] = useState<Group[]>([
    { 
      id: '1', name: '核心研发人员', description: '职级在P6及以上且在研发部门的员工', count: 125, status: 'Active',
      rules: [
        { id: 'r1', field: 'energyLevel', operator: 'greater_equals', value: 'P6' },
        { id: 'r2', field: 'departmentName', operator: 'contains', value: '研发' }
      ]
    },
    { id: '2', name: '新入职员工', description: '入职时间在3个月内的所有员工', count: 42, status: 'Active', rules: [] },
    { id: '3', name: '华东区销售经理', description: '岗位包含"销售经理"且工作地在华东大区', count: 18, status: 'Active', rules: [] },
    ...generateMockGroups(45, '人员')
  ]);

  const [departmentGroups, setDepartmentGroups] = useState<Group[]>([
    { id: '1', name: '研发一部', description: '负责核心产品研发的部门集合', count: 85, status: 'Active', rules: [] },
    { id: '2', name: '华南大区一二线门店', description: '华南区域一二线城市的销售门店', count: 35, status: 'Active', rules: [] },
    { id: '3', name: '后台支持职能', description: '包括HR、财务、行政等非业务部门', count: 12, status: 'Active', rules: [] },
    ...generateMockGroups(30, '部门')
  ]);

  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab]);

  const currentGroups = activeTab === 'personnel' ? personnelGroups : departmentGroups;
  const totalPages = Math.ceil(currentGroups.length / ITEMS_PER_PAGE);
  const paginatedGroups = currentGroups.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);


  const jobInfoFields = [
    { value: 'departmentName', label: '部门名称' },
    { value: 'departmentCode', label: '部门代号' },
    { value: 'hrAdmin', label: '人事管理员' },
    { value: 'jobCategory', label: '岗位类别' },
    { value: 'reportingLevel', label: '汇报层级' },
    { value: 'line', label: '条线' },
    { value: 'employeeGroup', label: '员工组' },
    { value: 'employeeSubgroup', label: '员工子组' },
    { value: 'tier12Category', label: '一二线分类' },
    { value: 'personnelSubarea', label: '人事子范围' },
    { value: 'company', label: '公司' },
    { value: 'energyLevel', label: '能级' },
  ];

  const departmentFields = [
    { value: 'level', label: '层级' },
    { value: 'name', label: '名称' },
    { value: 'line', label: '条线' },
  ];

  const operators = [
    { value: 'equals', label: '等于 (=)' },
    { value: 'not_equals', label: '不等于 (!=)' },
    { value: 'contains', label: '包含' },
    { value: 'not_contains', label: '不包含' },
    { value: 'greater_than', label: '大于 (>)' },
    { value: 'less_than', label: '小于 (<)' },
    { value: 'greater_equals', label: '大于等于 (>=)' },
    { value: 'less_equals', label: '小于等于 (<=)' },
  ];

  const handleEditClick = (group: Group) => {
    setEditingGroup({ ...group, rules: group.rules || [] });
  };

  const handleViewMembers = (group: Group) => {
    setViewingMembersGroup(group);
    setGroupMembers(generateMockMembers(group.count));
  };

  const handleAddRule = () => {
    if (editingGroup) {
      const defaultField = activeTab === 'personnel' ? 'departmentName' : 'level';
      setEditingGroup({
        ...editingGroup,
        rules: [...(editingGroup.rules || []), { id: Date.now().toString(), field: defaultField, operator: 'equals', value: '' }]
      });
    }
  };

  const handleRemoveRule = (ruleId: string) => {
    if (editingGroup) {
      setEditingGroup({
        ...editingGroup,
        rules: editingGroup.rules?.filter(r => r.id !== ruleId) || []
      });
    }
  };

  const handleRuleChange = (ruleId: string, key: keyof Rule, value: string) => {
    if (editingGroup) {
      setEditingGroup({
        ...editingGroup,
        rules: editingGroup.rules?.map(r => r.id === ruleId ? { ...r, [key]: value } : r) || []
      });
    }
  };

  const handleSaveGroup = () => {
    if (editingGroup) {
      if (activeTab === 'personnel') {
        setPersonnelGroups(personnelGroups.map(g => g.id === editingGroup.id ? editingGroup : g));
      } else {
        setDepartmentGroups(departmentGroups.map(g => g.id === editingGroup.id ? editingGroup : g));
      }
      setEditingGroup(null);
    }
  };

  return (
    <div className="p-6 h-full flex flex-col bg-gray-50">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">动态分组管理</h1>
          <p className="text-gray-500 mt-1">基于员工属性（如部门、职级、入职时间等）自动维护的动态人员集合</p>
        </div>
        <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm">
          <Plus size={18} className="mr-2" />
          新建动态组
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 flex-1 flex flex-col overflow-hidden">
        <div className="flex border-b border-gray-200 px-6 pt-4">
          <button
            className={`flex items-center pb-3 px-4 font-medium text-sm border-b-2 transition-colors ${
              activeTab === 'personnel' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('personnel')}
          >
            <Users size={16} className="mr-2" />
            人员组
          </button>
          <button
            className={`flex items-center pb-3 px-4 font-medium text-sm border-b-2 transition-colors ${
              activeTab === 'department' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('department')}
          >
            <Target size={16} className="mr-2" />
            部门组
          </button>
        </div>

        <div className="p-6 flex-1 flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <div className="relative w-64">
              <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="搜索组名称或描述..."
                className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <button className="flex items-center px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-600 hover:bg-gray-50">
              <Filter size={16} className="mr-2" />
              筛选
            </button>
          </div>

          <div className="flex-1 overflow-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-y border-gray-200">
                  <th className="py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">组名称</th>
                  <th className="py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">描述 / 规则摘要</th>
                  <th className="py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">当前人数</th>
                  <th className="py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">状态</th>
                  <th className="py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">操作</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {paginatedGroups.map((group) => (
                  <tr key={group.id} className="hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-4">
                      <div className="font-medium text-gray-800">{group.name}</div>
                    </td>
                    <td className="py-4 px-4 text-sm text-gray-600 max-w-md truncate">
                      {group.description}
                    </td>
                    <td className="py-4 px-4">
                      <button 
                        onClick={() => handleViewMembers(group)}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 hover:bg-blue-200 transition-colors cursor-pointer"
                      >
                        {group.count} 人
                      </button>
                    </td>
                    <td className="py-4 px-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        {group.status}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <button 
                          className="p-1.5 text-gray-400 hover:text-blue-600 rounded transition-colors" 
                          title="编辑"
                          onClick={() => handleEditClick(group)}
                        >
                          <Edit size={16} />
                        </button>
                        <button className="p-1.5 text-gray-400 hover:text-red-600 rounded transition-colors" title="删除">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between bg-white mt-auto">
            <div className="text-sm text-gray-500">
              共 {currentGroups.length} 条记录，当前第 {currentPage}/{totalPages || 1} 页
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="p-1 rounded border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages || totalPages === 0}
                className="p-1 rounded border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {editingGroup && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-3xl max-h-[90vh] flex flex-col">
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-800">编辑动态组规则 - {editingGroup.name}</h2>
              <button onClick={() => setEditingGroup(null)} className="text-gray-400 hover:text-gray-600">
                <X size={24} />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto flex-1">
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">组名称</label>
                <input 
                  type="text" 
                  value={editingGroup.name}
                  onChange={(e) => setEditingGroup({...editingGroup, name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">描述</label>
                <textarea 
                  value={editingGroup.description}
                  onChange={(e) => setEditingGroup({...editingGroup, description: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={2}
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium text-gray-800">筛选规则</h3>
                  <button 
                    onClick={handleAddRule}
                    className="flex items-center text-sm text-blue-600 hover:text-blue-700 font-medium"
                  >
                    <Plus size={16} className="mr-1" /> 添加规则
                  </button>
                </div>
                
                <div className="space-y-3">
                  {editingGroup.rules && editingGroup.rules.length > 0 ? (
                    editingGroup.rules.map((rule, index) => (
                      <div key={rule.id} className="flex items-center space-x-3 bg-gray-50 p-3 rounded-lg border border-gray-200">
                        <span className="text-sm font-medium text-gray-500 w-6">{index + 1}.</span>
                        <select 
                          value={rule.field}
                          onChange={(e) => handleRuleChange(rule.id, 'field', e.target.value)}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-blue-500 focus:border-blue-500"
                        >
                          {(activeTab === 'personnel' ? jobInfoFields : departmentFields).map(f => <option key={f.value} value={f.value}>{f.label}</option>)}
                        </select>
                        <select 
                          value={rule.operator}
                          onChange={(e) => handleRuleChange(rule.id, 'operator', e.target.value)}
                          className="w-32 px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-blue-500 focus:border-blue-500"
                        >
                          {operators.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                        </select>
                        <input 
                          type="text" 
                          value={rule.value}
                          onChange={(e) => handleRuleChange(rule.id, 'value', e.target.value)}
                          placeholder="输入比较值..."
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-blue-500 focus:border-blue-500"
                        />
                        <button 
                          onClick={() => handleRemoveRule(rule.id)}
                          className="p-2 text-gray-400 hover:text-red-600 rounded-md hover:bg-red-50 transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8 text-gray-500 bg-gray-50 rounded-lg border border-dashed border-gray-300">
                      暂无规则，点击右上角添加
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 flex justify-end space-x-3 bg-gray-50 rounded-b-xl">
              <button 
                onClick={() => setEditingGroup(null)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
              >
                取消
              </button>
              <button 
                onClick={handleSaveGroup}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                保存配置
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Members Modal */}
      {viewingMembersGroup && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] flex flex-col">
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-800">{viewingMembersGroup.name} - 人员名单 ({viewingMembersGroup.count}人)</h2>
              <button onClick={() => setViewingMembersGroup(null)} className="text-gray-400 hover:text-gray-600">
                <X size={24} />
              </button>
            </div>
            <div className="p-6 overflow-y-auto flex-1">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 border-y border-gray-200">
                    <th className="py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">姓名</th>
                    <th className="py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">工号</th>
                    <th className="py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">部门</th>
                    <th className="py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">职位</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {groupMembers.map(member => (
                    <tr key={member.id} className="hover:bg-gray-50">
                      <td className="py-3 px-4 text-sm text-gray-800">{member.name}</td>
                      <td className="py-3 px-4 text-sm text-gray-600">{member.empId}</td>
                      <td className="py-3 px-4 text-sm text-gray-600">{member.department}</td>
                      <td className="py-3 px-4 text-sm text-gray-600">{member.position}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
