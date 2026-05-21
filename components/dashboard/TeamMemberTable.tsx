
import React, { useState, useMemo } from 'react';
import { 
  Users, 
  Search, 
  ChevronDown, 
  ChevronLeft, 
  ChevronRight, 
  Filter, 
  MoreHorizontal,
  User
} from 'lucide-react';

// --- Mock Data ---
const hrbpTeamList = [
  { id: '100234', name: '李明', age: 32, initials: 'LM', role: '高级Java开发', dept: '部门1', performance: ['A', 'A+', 'S'], level: 'P6', edu: '硕士' },
  { id: '100235', name: '王芳', age: 28, initials: 'WF', role: 'UI设计师', dept: '部门2', performance: ['B+', 'A', 'A'], level: 'P5', edu: '本科' },
  { id: '100236', name: '陈志强', age: 35, initials: 'CZQ', role: '架构师', dept: '部门1', performance: ['S', 'S', 'S'], level: 'P8', edu: '博士' },
  { id: '100237', name: '赵伟', age: 26, initials: 'ZW', role: '前端工程师', dept: '部门2', performance: ['B', 'B+', 'A'], level: 'P4', edu: '本科' },
  { id: '100238', name: '刘洋', age: 30, initials: 'LY', role: '产品经理', dept: '部门1', performance: ['A', 'A', 'A'], level: 'M1', edu: '硕士' },
  { id: '100239', name: '郑华', age: 29, initials: 'ZH', role: '测试开发', dept: '部门2', performance: ['A', 'B+', 'A'], level: 'P5', edu: '本科' },
  { id: '100240', name: '孙梅', age: 27, initials: 'SM', role: 'HRBP', dept: '部门1', performance: ['A', 'A', 'A'], level: 'P4', edu: '本科' },
  { id: '100241', name: '吴强', age: 33, initials: 'WQ', role: '后端专家', dept: '部门2', performance: ['S', 'A', 'A'], level: 'P7', edu: '硕士' },
  { id: '100242', name: '周杰', age: 31, initials: 'ZJ', role: '前端主管', dept: '部门1', performance: ['A+', 'A', 'S'], level: 'P6', edu: '本科' },
  { id: '100243', name: '陈静', age: 34, initials: 'CJ', role: '高级产品', dept: '部门2', performance: ['A', 'A', 'A'], level: 'P6', edu: '硕士' },
];

const PerformanceBadge: React.FC<{ grade: string }> = ({ grade }) => {
  let colorClass = 'bg-gray-100 text-gray-600';
  if (grade === 'S' || grade === 'A+') colorClass = 'bg-green-100 text-green-700';
  else if (grade === 'A') colorClass = 'bg-blue-100 text-blue-700';
  else if (grade === 'B+') colorClass = 'bg-yellow-100 text-yellow-700';
  
  return (
    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${colorClass} mx-0.5`}>
      {grade}
    </span>
  );
};

export const TeamMemberTable: React.FC<{ onNavigate?: (view: string, params?: any) => void }> = ({ onNavigate }) => {
  const [selectedDept, setSelectedDept] = useState('All');
  const [isDeptDropdownOpen, setIsDeptDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Column Configuration State
  const allColumns = [
    { key: 'id', label: '工号' },
    { key: 'name', label: '姓名' },
    { key: 'initials', label: '缩写' },
    { key: 'age', label: '年龄' },
    { key: 'role', label: '职务' },
    { key: 'level', label: '职级' },
    { key: 'edu', label: '学历' },
    { key: 'performance', label: '近3次绩效' },
  ];
  const [visibleColumns] = useState<string[]>(['id', 'name', 'initials', 'age', 'role', 'level', 'edu', 'performance']);

  const filteredTeamList = useMemo(() => {
    return hrbpTeamList.filter(member => {
      const matchesDept = selectedDept === 'All' || member.dept === selectedDept;
      const matchesSearch = member.name.includes(searchTerm) || 
                            member.id.includes(searchTerm) || 
                            member.role.includes(searchTerm);
      return matchesDept && matchesSearch;
    });
  }, [selectedDept, searchTerm]);

  const totalPages = Math.ceil(filteredTeamList.length / itemsPerPage);
  const currentData = filteredTeamList.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden h-full flex flex-col">
       <div className="p-5 border-b border-gray-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-gray-50/30">
          <h3 className="font-bold text-gray-800 flex items-center">
             <Users size={18} className="mr-2 text-blue-600" /> 团队信息概览
          </h3>
          <div className="flex flex-wrap gap-2">
             {/* Department Filter */}
             <div className="relative">
                <button 
                  onClick={() => setIsDeptDropdownOpen(!isDeptDropdownOpen)}
                  className="flex items-center px-3 py-1.5 border border-gray-300 rounded text-sm text-gray-600 hover:bg-gray-50 bg-white transition-colors"
                >
                   <Filter size={14} className="mr-1" />
                   {selectedDept === 'All' ? '全部部门' : selectedDept}
                   <ChevronDown size={14} className="ml-1 text-gray-400" />
                </button>
                {isDeptDropdownOpen && (
                  <div className="absolute right-0 top-full mt-1 w-32 bg-white rounded-lg shadow-xl border border-gray-100 py-1 text-sm z-20 animate-fade-in">
                     <button onClick={() => {setSelectedDept('All'); setCurrentPage(1); setIsDeptDropdownOpen(false);}} className={`w-full text-left px-4 py-2 hover:bg-gray-50 ${selectedDept === 'All' ? 'text-blue-600 font-medium' : 'text-gray-700'}`}>全部</button>
                     <button onClick={() => {setSelectedDept('部门1'); setCurrentPage(1); setIsDeptDropdownOpen(false);}} className={`w-full text-left px-4 py-2 hover:bg-gray-50 ${selectedDept === '部门1' ? 'text-blue-600 font-medium' : 'text-gray-700'}`}>部门1</button>
                     <button onClick={() => {setSelectedDept('部门2'); setCurrentPage(1); setIsDeptDropdownOpen(false);}} className={`w-full text-left px-4 py-2 hover:bg-gray-50 ${selectedDept === '部门2' ? 'text-blue-600 font-medium' : 'text-gray-700'}`}>部门2</button>
                  </div>
                )}
             </div>

             <div className="relative">
                <input 
                  type="text" 
                  placeholder="工号/姓名/职务..." 
                  className="pl-8 pr-3 py-1.5 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 w-48"
                  value={searchTerm}
                  onChange={(e) => {setSearchTerm(e.target.value); setCurrentPage(1);}}
                />
                <Search size={14} className="absolute left-2.5 top-1/2 transform -translate-y-1/2 text-gray-400"/>
             </div>
             
          </div>
       </div>

       {/* Desktop Table View */}
       <div className="hidden md:block flex-1 overflow-auto custom-scrollbar">
          <table className="w-full text-left text-sm whitespace-nowrap">
             <thead className="bg-gray-50 text-gray-500 font-medium border-b border-gray-200">
                <tr>
                   {allColumns.map(col => visibleColumns.includes(col.key) && (
                      <th key={col.key} className="p-4">{col.label}</th>
                   ))}
                   <th className="p-4 text-right">操作</th>
                </tr>
             </thead>
             <tbody className="divide-y divide-gray-100">
                {currentData.map(member => (
                   <tr key={member.id} className="hover:bg-blue-50/30 transition-colors">
                      {visibleColumns.includes('id') && <td className="p-4 font-mono text-gray-500">{member.id}</td>}
                      {visibleColumns.includes('name') && (
                         <td className="p-4 font-bold text-gray-800 flex items-center">
                            <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs mr-2">
                               {member.name.charAt(0)}
                            </div>
                            {member.name}
                         </td>
                      )}
                      {visibleColumns.includes('initials') && <td className="p-4 text-gray-500">{member.initials}</td>}
                      {visibleColumns.includes('age') && <td className="p-4 text-gray-700">{member.age}</td>}
                      {visibleColumns.includes('role') && <td className="p-4 text-gray-700">{member.role}</td>}
                      {visibleColumns.includes('level') && <td className="p-4"><span className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded text-xs border border-gray-200">{member.level}</span></td>}
                      {visibleColumns.includes('edu') && <td className="p-4 text-gray-600">{member.edu}</td>}
                      {visibleColumns.includes('performance') && (
                         <td className="p-4">
                            <div className="flex">
                               {member.performance.map((p, i) => <PerformanceBadge key={i} grade={p} />)}
                            </div>
                         </td>
                      )}
                      <td className="p-4 text-right">
                         <button 
                            onClick={() => onNavigate?.('personnel-details', { personId: member.id })}
                            className="text-blue-600 hover:text-blue-800 text-xs font-bold"
                         >
                            查看档案
                         </button>
                      </td>
                   </tr>
                ))}
             </tbody>
          </table>
       </div>

       {/* Mobile List View (listwidget style) */}
       <div className="md:hidden block flex-1 overflow-y-auto">
          <div className="divide-y divide-gray-50">
             {currentData.length > 0 ? currentData.map(member => (
                <div key={member.id} className="p-4 hover:bg-blue-50/10 active:bg-blue-50/20 transition-colors">
                   <div className="flex items-start justify-between">
                      <div className="flex items-center">
                         <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-sm mr-3 shadow-sm border border-blue-200">
                            {member.name.charAt(0)}
                         </div>
                         <div className="min-w-0">
                            <div className="flex items-center gap-2 mb-0.5">
                               <span className="font-bold text-gray-900 truncate">{member.name}</span>
                               <span className="text-[10px] text-gray-400 font-mono tracking-tighter">#{member.id}</span>
                            </div>
                            <div className="text-[11px] text-gray-600 font-medium flex items-center">
                               {member.role}
                               <span className="mx-1 text-gray-300">|</span>
                               {member.dept}
                            </div>
                         </div>
                      </div>
                      <button className="p-1.5 text-gray-400 hover:text-gray-700">

                      </button>
                   </div>
                   
                   <div className="grid grid-cols-4 gap-2 mt-4 pt-3 border-t border-gray-50">
                      <div className="flex flex-col">
                         <span className="text-[9px] text-gray-400 font-bold uppercase tracking-wider">缩写</span>
                         <span className="text-[11px] text-gray-700 font-bold">{member.initials}</span>
                      </div>
                      <div className="flex flex-col">
                         <span className="text-[9px] text-gray-400 font-bold uppercase tracking-wider">年龄</span>
                         <span className="text-[11px] text-gray-700 font-bold">{member.age} 岁</span>
                      </div>
                      <div className="flex flex-col">
                         <span className="text-[9px] text-gray-400 font-bold uppercase tracking-wider">职级</span>
                         <span className="text-[11px] font-bold text-blue-600">{member.level}</span>
                      </div>
                      <div className="flex flex-col">
                         <span className="text-[9px] text-gray-400 font-bold uppercase tracking-wider">学历</span>
                         <span className="text-[11px] text-gray-700 font-bold">{member.edu}</span>
                      </div>
                   </div>

                   <div className="mt-3 flex items-center justify-between">
                      <div className="flex items-center">
                         <span className="text-[9px] text-gray-400 font-bold uppercase tracking-wider mr-2">绩效表现</span>
                         <div className="flex">
                            {member.performance.map((p, i) => <PerformanceBadge key={i} grade={p} />)}
                         </div>
                      </div>
                      <div 
                        onClick={() => onNavigate?.('personnel-details', { personId: member.id })}
                        className="text-[10px] text-blue-600 font-bold flex items-center cursor-pointer hover:underline"
                      >
                         查看档案 <ChevronRight size={10} className="ml-0.5" />
                      </div>
                   </div>
                </div>
             )) : (
                <div className="py-20 text-center text-gray-400">
                   <Users size={40} className="mx-auto mb-2 opacity-10" />
                   <p className="text-sm">暂无团队成员数据</p>
                </div>
             )}
          </div>
       </div>

       {/* Pagination Footer */}
       <div className="p-4 border-t border-gray-100 bg-gray-50/50 flex items-center justify-between text-sm text-gray-500">
          <div className="hidden sm:block">
             显示 {(currentPage - 1) * itemsPerPage + 1} 到 {Math.min(currentPage * itemsPerPage, filteredTeamList.length)} 共 {filteredTeamList.length} 条
          </div>
          <div className="flex items-center space-x-2 ml-auto sm:ml-0">
             <button 
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="p-1.5 border border-gray-200 rounded hover:bg-white disabled:opacity-30 disabled:cursor-not-allowed bg-gray-50 transition-colors shadow-sm"
             >
                <ChevronLeft size={16} />
             </button>
             {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                // Simplified pagination for mobile
                const pageNum = totalPages > 5 ? (currentPage > 3 ? currentPage - 2 + i : i + 1) : i + 1;
                if (pageNum > totalPages) return null;
                return (
                   <button
                     key={pageNum}
                     onClick={() => handlePageChange(pageNum)}
                     className={`w-8 h-8 rounded border transition-all text-xs font-bold ${
                       currentPage === pageNum 
                         ? 'bg-blue-600 text-white border-blue-600 shadow-sm' 
                         : 'bg-white text-gray-500 border-gray-200 hover:bg-gray-50'
                     }`}
                   >
                     {pageNum}
                   </button>
                );
             })}
             <button 
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="p-1.5 border border-gray-200 rounded hover:bg-white disabled:opacity-30 disabled:cursor-not-allowed bg-gray-50 transition-colors shadow-sm"
             >
                <ChevronRight size={16} />
             </button>
          </div>
       </div>
    </div>
  );
};
