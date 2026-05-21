
import React, { useState } from 'react';
import { 
  RefreshCw, 
  Plus, 
  ChevronRight, 
  Settings, 
  Search, 
  MoreHorizontal,
  User,
  X,
  GripVertical
} from 'lucide-react';
import { Candidate } from '../../types';

interface CandidateListProps {
  candidates: Candidate[];
  isExternal: boolean;
  stages: { id: string; label: string; count: number }[];
}

export const CandidateList: React.FC<CandidateListProps> = ({ candidates, isExternal, stages }) => {
  const [activeStage, setActiveStage] = useState('All');
  const [showColumnSettings, setShowColumnSettings] = useState(false);
  const [visibleColumns, setVisibleColumns] = useState<string[]>(['id', 'name', 'gender', 'age', 'degree', 'experience', 'latestScreener', 'applyDate']);

  const allColumns = [
    { id: 'id', label: '应聘者ID', required: true },
    { id: 'name', label: '姓名', required: true },
    { id: 'gender', label: '性别', required: false },
    { id: 'age', label: '年龄', required: false },
    { id: 'degree', label: '最高学历', required: false },
    { id: 'experience', label: '工作年限', required: false },
    { id: 'latestScreener', label: '最近筛选人', required: false },
    { id: 'applyDate', label: '申请创建时间', required: false },
  ];

  const filteredCandidates = activeStage === 'All' 
    ? candidates 
    : candidates.filter(c => c.status === activeStage);

  const toggleColumn = (columnId: string) => {
    if (visibleColumns.includes(columnId)) {
      setVisibleColumns(visibleColumns.filter(id => id !== columnId));
    } else {
      setVisibleColumns([...visibleColumns, columnId]);
    }
  };

  return (
    <div className="space-y-4">
      {/* Header with Title & Beisen Sync */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-2">
         <div>
           <h2 className="text-2xl font-bold text-gray-800">
             {isExternal ? '候选人管理' : '候选人筛选'} ({isExternal ? '外部' : '内部'})
           </h2>
           <p className="text-sm text-gray-500 mt-1">
             {isExternal ? '招聘管理系统实时同步' : '内部员工竞聘管理'}
           </p>
         </div>
         {isExternal && (
           <div className="flex space-x-2">
              <button className="bg-white border border-gray-300 text-gray-700 px-3 py-1.5 rounded-md hover:bg-gray-50 flex items-center shadow-sm text-sm">
                <RefreshCw size={14} className="mr-2" /> 同步数据
              </button>
              <button className="bg-blue-600 text-white px-4 py-1.5 rounded-md hover:bg-blue-700 flex items-center shadow-sm text-sm">
                <Plus size={16} className="mr-2" /> 新建应聘者
              </button>
           </div>
         )}
      </div>

      {/* Pipeline Tabs */}
      <div className="bg-white border-b border-gray-200 sticky top-12 z-10 overflow-x-auto hide-scrollbar">
        <div className="flex min-w-max">
          {stages.map((stage) => (
            <button
              key={stage.id}
              onClick={() => setActiveStage(stage.id)}
              className={`relative flex flex-col items-start justify-center px-6 py-3 min-w-[120px] transition-colors border-r border-gray-100 group ${
                activeStage === stage.id ? 'bg-blue-50/50' : 'hover:bg-gray-50'
              }`}
            >
              <span className={`text-xs mb-1 ${activeStage === stage.id ? 'text-blue-600 font-medium' : 'text-gray-500'}`}>
                {stage.label}
              </span>
              <span className={`text-xl font-bold ${activeStage === stage.id ? 'text-blue-700' : 'text-gray-800'}`}>
                {stage.count}
              </span>
              {activeStage === stage.id && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"></div>
              )}
            </button>
          ))}
          <div className="flex-1 border-b border-gray-200 min-w-[50px]"></div>
        </div>
      </div>

      {/* Toolbar & Filters */}
      <div className="bg-white p-4 rounded-t-lg border border-gray-200 border-b-0 flex justify-between items-center mt-4">
         <div className="flex space-x-2">
           <button className="bg-blue-600 text-white px-3 py-1.5 rounded text-sm font-medium">
             下一阶段
           </button>
           <button className="bg-white border border-gray-300 text-gray-700 px-3 py-1.5 rounded text-sm hover:bg-gray-50">
             发业务筛选
           </button>
           <button className="bg-white border border-gray-300 text-gray-700 px-3 py-1.5 rounded text-sm hover:bg-gray-50">
             转移
           </button>
           <button className="bg-white border border-gray-300 text-gray-700 px-3 py-1.5 rounded text-sm hover:bg-gray-50 flex items-center">
             更多操作 <ChevronRight size={14} className="ml-1 rotate-90" />
           </button>
         </div>
         
         <div className="flex items-center space-x-3">
            {/* Settings Cog - Toggles Modal */}
            <button 
              onClick={() => setShowColumnSettings(true)}
              className="p-2 text-gray-400 hover:text-blue-600 hover:bg-gray-100 rounded transition-colors relative"
              title="设置显示字段"
            >
              <Settings size={20} />
            </button>
            
            <div className="relative">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
              <input 
                type="text" 
                placeholder="搜索候选人..." 
                className="pl-8 pr-3 py-1.5 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-blue-500 focus:outline-none w-48"
              />
            </div>
         </div>
      </div>

      {/* Data Table */}
      <div className="bg-white border border-gray-200 rounded-b-lg overflow-x-auto min-h-[400px]">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead className="bg-gray-50 text-gray-500">
            <tr>
              <th className="p-4 w-10">
                <input type="checkbox" className="rounded border-gray-300" />
              </th>
              {allColumns.filter(col => visibleColumns.includes(col.id)).map(col => (
                <th key={col.id} className="p-4 font-medium cursor-pointer hover:bg-gray-100 transition-colors">
                  <div className="flex items-center space-x-1">
                     <span>{col.label}</span>
                  </div>
                </th>
              ))}
              <th className="p-4 font-medium text-right">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredCandidates.length > 0 ? filteredCandidates.map((candidate) => (
              <tr key={candidate.id} className="hover:bg-blue-50/30 transition-colors group">
                <td className="p-4">
                  <input type="checkbox" className="rounded border-gray-300" />
                </td>
                {visibleColumns.includes('id') && <td className="p-4 text-gray-500 font-mono">{candidate.id}</td>}
                {visibleColumns.includes('name') && <td className="p-4 font-medium text-blue-600 hover:underline cursor-pointer">{candidate.name}</td>}
                {visibleColumns.includes('gender') && <td className="p-4 text-gray-700">{candidate.gender}</td>}
                {visibleColumns.includes('age') && <td className="p-4 text-gray-700">{candidate.age}</td>}
                {visibleColumns.includes('degree') && <td className="p-4 text-gray-700">{candidate.degree}</td>}
                {visibleColumns.includes('experience') && <td className="p-4 text-gray-700">{candidate.experience}</td>}
                {visibleColumns.includes('latestScreener') && <td className="p-4 text-gray-700">{candidate.latestScreener}</td>}
                {visibleColumns.includes('applyDate') && <td className="p-4 text-gray-500">{candidate.applyDate}</td>}
                
                <td className="p-4 text-right">
                  <button className="p-1 hover:bg-gray-100 rounded text-gray-400 hover:text-blue-600">
                    <MoreHorizontal size={16} />
                  </button>
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan={visibleColumns.length + 2} className="p-12 text-center text-gray-400">
                  <User size={48} className="mx-auto mb-3 opacity-20" />
                  <p>当前阶段暂无候选人数据</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Column Settings Modal */}
      {showColumnSettings && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl overflow-hidden animate-fade-in">
            <div className="flex justify-between items-center p-4 border-b border-gray-100 bg-blue-600 text-white">
              <h3 className="font-medium">编辑显示字段</h3>
              <button onClick={() => setShowColumnSettings(false)} className="hover:bg-blue-500 p-1 rounded transition-colors">
                <X size={20} />
              </button>
            </div>
            
            <div className="flex h-[400px]">
              {/* Left Panel: Available (Hidden) Fields - Simulated */}
              <div className="w-1/2 p-4 border-r border-gray-100 bg-gray-50 overflow-y-auto">
                 <div className="text-xs font-semibold text-gray-400 uppercase mb-3">隐藏字段</div>
                 <div className="space-y-2">
                    <div className="p-2 bg-white border border-gray-200 rounded text-sm text-gray-500 cursor-move flex items-center opacity-70">
                      <GripVertical size={14} className="mr-2 text-gray-300" />
                      手机号码
                    </div>
                    <div className="p-2 bg-white border border-gray-200 rounded text-sm text-gray-500 cursor-move flex items-center opacity-70">
                      <GripVertical size={14} className="mr-2 text-gray-300" />
                      邮箱地址
                    </div>
                 </div>
                 <p className="text-xs text-gray-400 mt-4 text-center">拖动到右侧以显示</p>
              </div>

              {/* Right Panel: Displayed Fields - Actual Toggles */}
              <div className="w-1/2 p-4 overflow-y-auto">
                 <div className="flex justify-between items-center mb-3">
                    <div className="text-xs font-semibold text-gray-400 uppercase">显示字段 ({visibleColumns.length})</div>
                 </div>
                 
                 <div className="space-y-2">
                   {allColumns.map((col) => (
                     <div key={col.id} className={`flex items-center justify-between p-2 rounded border ${visibleColumns.includes(col.id) ? 'border-blue-200 bg-blue-50' : 'border-gray-100'}`}>
                       <div className="flex items-center">
                          <GripVertical size={14} className="mr-2 text-gray-400 cursor-move" />
                          <span className="text-sm text-gray-700">{col.label}</span>
                       </div>
                       
                       {col.required ? (
                         <span className="text-xs text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded">必选</span>
                       ) : (
                         <label className="relative inline-flex items-center cursor-pointer">
                            <input 
                              type="checkbox" 
                              className="sr-only peer" 
                              checked={visibleColumns.includes(col.id)}
                              onChange={() => toggleColumn(col.id)}
                            />
                            <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
                          </label>
                       )}
                     </div>
                   ))}
                 </div>
              </div>
            </div>

            <div className="p-4 border-t border-gray-100 bg-gray-50 flex justify-end space-x-3">
               <button onClick={() => setShowColumnSettings(false)} className="px-4 py-2 text-gray-600 hover:text-gray-800 text-sm">取消</button>
               <button onClick={() => setShowColumnSettings(false)} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm">确定</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
