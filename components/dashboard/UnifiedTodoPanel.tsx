
import React, { useState, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { 
  CheckSquare, 
  X, 
  MessageSquare, 
  AlertCircle, 
  CheckCircle,
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  ThumbsUp,
  Square,
  MoreHorizontal,
  History,
  MessageCircle,
  Maximize2,
  Clock,
  User,
  ExternalLink
} from 'lucide-react';
import { TodoItem } from '../../types';
import { DashboardWidget } from './Shared';

export interface TodoTab {
  id: string;
  label: string;
  tasks: TodoItem[];
  icon?: React.ReactNode;
}

interface UnifiedTodoPanelProps {
  title?: string;
  icon?: React.ReactNode;
  tasks?: TodoItem[]; 
  tabs?: TodoTab[];   
  primaryActionLabel?: string;
  batchActionLabel?: string;
  showBatchActions?: boolean;
  onProcessTasks: (ids: (string | number)[], comment: string) => void;
  onFooterClick?: (tabId: string) => void;
  onNavigate?: (view: string, params?: any) => void;
  footerLabel?: string;
  className?: string;
  onHide?: () => void;
  onExpand?: () => void;
  activeTab?: string;
}

export const UnifiedTodoPanel: React.FC<UnifiedTodoPanelProps> = ({
  title,
  icon,
  tasks: singleTasks,
  tabs,
  primaryActionLabel = '办理',
  batchActionLabel = '批量处理',
  showBatchActions = false,
  onProcessTasks,
  onFooterClick,
  onNavigate,
  footerLabel,
  className = '',
  onHide,
  onExpand,
  activeTab: initialActiveTab
}) => {
  const [activeTabId, setActiveTabId] = useState<string>(initialActiveTab || (tabs ? tabs[0].id : 'pending'));
  const [selectedIds, setSelectedIds] = useState<(string | number)[]>([]);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [currentViewTask, setCurrentViewTask] = useState<TodoItem | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const currentTasks = useMemo(() => {
    if (tabs) {
      return tabs.find(t => t.id === activeTabId)?.tasks || [];
    }
    return activeTabId === 'pending' ? (singleTasks || []) : [];
  }, [tabs, activeTabId, singleTasks]);

  const totalPages = Math.ceil(currentTasks.length / itemsPerPage);
  const displayTasks = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return currentTasks.slice(start, start + itemsPerPage);
  }, [currentTasks, currentPage, itemsPerPage]);

  const handleTaskClick = (task: TodoItem) => {
    if (task.targetView && onNavigate) {
      onNavigate(task.targetView, task.targetParams);
    } else {
      setCurrentViewTask(task);
      setIsDetailModalOpen(true);
    }
  };

  const handleTabChange = (id: string) => {
    setActiveTabId(id);
    setSelectedIds([]);
    setCurrentPage(1);
  };

  const toggleSelection = (e: React.MouseEvent, id: string | number) => {
    e.stopPropagation();
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(t => t !== id) : [...prev, id]
    );
  };

  const widgetTitle = (
    <div className="flex items-center">
      {icon && <div className="text-blue-600 mr-2">{icon}</div>}
      <h3 className="font-bold text-gray-800 text-base mr-4 shrink-0">{title}</h3>
      {tabs && (
        <div className="flex-1 flex justify-center gap-12 px-4 transition-all">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              className={`group flex flex-col items-center justify-center min-w-[56px] transition-all duration-300 rounded-lg p-0.5 ${
                activeTabId === tab.id 
                  ? 'bg-blue-50/50' 
                  : 'hover:bg-gray-50'
              }`}
            >
              <div className={`w-12 h-12 flex items-center justify-center shrink-0 font-black text-xl rounded shadow-md transition-all ${
                activeTabId === tab.id 
                  ? ((tab.id === 'pending' || tab.id === 'approvals') ? 'bg-[#ff4d4f] text-white scale-110 shadow-red-100' : 
                     tab.id === 'cc' ? 'bg-[#ffa940] text-white scale-110 shadow-orange-100' : 
                     (tab.id === 'read' || tab.id === 'my-apps') ? 'bg-[#1890ff] text-white scale-110 shadow-blue-100' : 
                     tab.id === 'done' ? 'bg-[#52c41a] text-white scale-110 shadow-green-100' :
                     'bg-blue-500 text-white scale-110')
                  : ((tab.id === 'pending' || tab.id === 'approvals') ? 'text-[#ff4d4f] bg-red-50 border border-red-100' : 
                     tab.id === 'cc' ? 'text-[#ffa940] bg-orange-50 border border-orange-100' : 
                     (tab.id === 'read' || tab.id === 'my-apps') ? 'text-[#1890ff] bg-blue-50 border border-blue-100' : 
                     tab.id === 'done' ? 'text-[#52c41a] bg-green-50 border border-green-100' :
                     'text-blue-500 bg-blue-50 border border-blue-100')
              }`}>
                {tab.tasks.length}
              </div>
              <span className={`text-[16px] font-black transition-all duration-300 whitespace-nowrap overflow-hidden ${
                activeTabId === tab.id 
                  ? 'text-gray-900 opacity-100 max-h-10 mt-1.5' 
                  : 'text-gray-400 opacity-0 max-h-0 translate-y-1 group-hover:opacity-100 group-hover:max-h-10 group-hover:translate-y-0 group-hover:mt-1.5'
              }`}>
                {tab.label}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <DashboardWidget 
      title={widgetTitle}
      className={`${className} flex flex-col`}
      onHide={onHide}
      onExpand={onExpand}
      headerRight={
        <div className="flex items-center gap-4">
          {showBatchActions && (
            <button 
                className="text-[12px] px-3 py-1 bg-gray-100 text-gray-400 rounded-md font-bold transition-all hover:bg-gray-200"
            >
                {batchActionLabel}
            </button>
          )}
        </div>
      }
    >
      <div className="space-y-1.5 overflow-y-auto flex-1 custom-scrollbar pr-1">
        {displayTasks.length > 0 ? displayTasks.map(item => (
          <div 
            key={item.id} 
            onClick={() => handleTaskClick(item)}
            className="flex justify-between items-center p-1.5 rounded-lg border border-gray-100 transition-all cursor-pointer group hover:bg-gray-50/50 hover:border-blue-200 shadow-sm"
          >
            <div className="flex items-center min-w-0 flex-1">
              <div className="min-w-0 flex-1">
                <p className="text-[13px] font-bold text-gray-800 truncate leading-tight mb-1 group-hover:text-blue-600 transition-colors">
                  {item.title}
                </p>
                {item.content && (
                  <p className="text-xs text-gray-500 truncate mb-1">
                    {item.content}
                  </p>
                )}
                <div className="flex items-center gap-3 text-[11px] text-gray-400 font-medium">
                  {item.sourceSystem && (
                    <span className="bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded text-[10px] font-bold flex items-center gap-1">
                      {item.sourceSystem}
                      <ExternalLink size={10} className="opacity-50" />
                    </span>
                  )}
                  {item.type && (
                    <span className="bg-blue-50 text-blue-600 px-1.5 py-0.5 rounded text-[10px] font-bold border border-blue-100">
                      {item.type}
                    </span>
                  )}
                  <span className="font-mono">{item.date.split(' ')[0]}</span>
                  {item.processStatus && (
                    <span className={`hidden px-1.5 py-0.5 rounded text-[10px] font-bold ${
                      item.processStatus === '已通过' ? 'bg-green-50 text-green-600 border border-green-100' : 
                      item.processStatus === '处理中' ? 'bg-blue-50 text-blue-600 border border-blue-100' : 
                      'bg-red-50 text-red-600 border border-red-100'
                    }`}>
                      {item.processStatus}
                    </span>
                  )}
                  {item.steps && item.steps.filter(s => s !== 'HRBP确认' && s !== '招聘管理员').length > 0 && (
                    <div className="flex gap-1">
                      {item.steps
                        .filter(step => step !== 'HRBP确认' && step !== '招聘管理员')
                        .map((step, idx) => (
                          <span key={idx} className="bg-orange-50 text-orange-600 px-1.5 py-0.5 rounded text-[10px] font-bold border border-orange-100">
                            {step}
                          </span>
                        ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="flex items-center">
              <ChevronRight size={18} className="text-gray-300 group-hover:text-blue-500 group-hover:translate-x-1 transition-all" />
            </div>
          </div>
        )) : (
          <div className="flex flex-col items-center justify-center py-20 opacity-30">
             <CheckCircle size={48} className="text-gray-300 mb-3" />
             <p className="text-sm font-bold">暂无事项</p>
          </div>
        )}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="mt-auto pt-4 border-t border-gray-50 flex justify-center items-center space-x-2">
          <button 
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="p-1.5 rounded border border-gray-300 text-gray-500 disabled:opacity-30 hover:bg-gray-50 transition-colors"
          >
            <ChevronLeft size={16} />
          </button>
          <div className="flex items-center space-x-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-7 h-7 rounded text-[10px] font-bold transition-colors ${
                  currentPage === page 
                    ? 'bg-blue-600 text-white' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {page}
              </button>
            ))}
          </div>
          <button 
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="p-1.5 rounded border border-gray-300 text-gray-500 disabled:opacity-30 hover:bg-gray-50 transition-colors"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      )}

      {onFooterClick && currentTasks.length > 0 && !totalPages && (
        <div className="mt-auto pt-4 border-t border-gray-50 flex justify-end">
        </div>
      )}

      {/* Large Detail Modal */}
      {isDetailModalOpen && currentViewTask && createPortal(
        <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/40 backdrop-blur-[2px] p-4 animate-fade-in">
          <div className="bg-[#f0f2f5] rounded-xl shadow-2xl w-full max-w-[95vw] h-[90vh] flex overflow-hidden animate-scale-up border border-gray-300">
            {/* Sidebar List */}
            <div className="w-[300px] border-r border-gray-200 bg-[#f8f9fa] flex flex-col shrink-0">
               <div className="p-4 border-b border-gray-200 flex justify-between items-center bg-white">
                  <span className="text-sm font-bold text-gray-700 flex items-center gap-2">
                    所有时间 <ChevronDown size={14} className="text-gray-400" />
                  </span>
                  <button className="p-1 hover:bg-gray-100 rounded text-gray-400"><History size={16}/></button>
               </div>
               <div className="flex-1 overflow-y-auto p-3 space-y-3 custom-scrollbar">
                  {currentTasks.map(task => (
                    <div 
                      key={task.id}
                      onClick={() => setCurrentViewTask(task)}
                      className={`p-4 rounded-lg border transition-all cursor-pointer relative ${
                        currentViewTask.id === task.id 
                          ? 'border-blue-600 bg-white shadow-sm ring-1 ring-blue-600' 
                          : 'border-gray-200 bg-white hover:border-blue-300'
                      }`}
                    >
                       <h4 className="text-[13px] font-bold text-gray-900 mb-3">{task.title}</h4>
                       <div className="space-y-1.5">
                          {task.sourceSystem && (
                            <p className="text-[11px] text-gray-500 font-medium">来源系统：{task.sourceSystem}</p>
                          )}
                          <p className="text-[11px] text-gray-500 font-medium">任务日期：{task.date.split(' ')[0]}</p>
                          <p className="text-[11px] text-gray-500 font-medium">任务类别：{task.type}</p>
                       </div>
                       <div className="flex justify-between items-center mt-5">
                          <div className="flex items-center gap-2">
                            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold text-white ${
                              task.type === 'Training' ? 'bg-blue-400' : 'bg-purple-400'
                            }`}>{task.initials}</div>
                            <span className="text-[11px] text-gray-500 font-medium">{activeTabId === 'done' ? '进行中' : activeTabId === 'my-apps' ? '审批中' : '直线经理确认'}</span>
                          </div>
                       </div>
                    </div>
                  ))}
               </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 flex flex-col bg-white overflow-hidden">
               <div className="h-14 border-b border-gray-200 flex items-center justify-between px-6 bg-[#fcfcfc] shrink-0">
                  <div className="flex gap-2">
                     {activeTabId !== 'done' && activeTabId !== 'cc' && activeTabId !== 'read' && (
                       <button 
                         onClick={() => {
                           if (currentViewTask.targetView && onNavigate) {
                             onNavigate(currentViewTask.targetView, currentViewTask.targetParams);
                             setIsDetailModalOpen(false);
                           } else {
                             alert(activeTabId === 'my-apps' ? '催办功能开发中' : '办理功能开发中');
                           }
                         }}
                         className="px-4 py-1.5 bg-[#e2e8f0] text-gray-700 rounded text-xs font-bold hover:bg-gray-200 transition-colors"
                       >
                         {activeTabId === 'my-apps' ? '催办' : '办理'}
                       </button>
                     )}
                  </div>
                  <div className="flex items-center gap-4">
                     <button className="p-2 text-gray-400 hover:text-blue-600"><Maximize2 size={16}/></button>
                     <button onClick={() => setIsDetailModalOpen(false)} className="p-2 text-gray-400 hover:text-red-500"><X size={20}/></button>
                  </div>
               </div>

               <div className="flex-1 overflow-y-auto p-10 custom-scrollbar">
                  <div className="max-w-4xl">
                    <div className="flex items-center gap-3 mb-6">
                       <h2 className="text-lg font-bold text-gray-900">{currentViewTask.title}</h2>
                       <span className={`${activeTabId === 'done' ? 'bg-green-100 text-green-600' : activeTabId === 'my-apps' ? 'bg-orange-100 text-orange-600' : 'bg-blue-100 text-blue-600'} px-2 py-0.5 rounded text-[11px] font-bold`}>
                         {activeTabId === 'done' ? '进行中' : activeTabId === 'my-apps' ? '审批中' : '直线经理确认'}
                       </span>
                       {currentViewTask.sourceSystem && (
                         <span className="bg-purple-100 text-purple-600 px-2 py-0.5 rounded text-[11px] font-bold border border-purple-200">
                           {currentViewTask.sourceSystem}
                         </span>
                       )}
                    </div>

                    <div className="flex items-center gap-4 mb-10 text-sm text-gray-500">
                       <div className="flex items-center gap-2">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-white ${
                            currentViewTask.type === 'Training' ? 'bg-blue-400' : 'bg-purple-400'
                          }`}>{currentViewTask.initials}</div>
                          <span className="font-bold text-gray-800">{currentViewTask.type} 相关任务</span>
                       </div>
                       <span className="text-gray-300">|</span>
                       <span className="font-medium">研发中心-RD</span>
                    </div>

                    <div className="flex border-b border-gray-200 mb-8">
                       <button className="pb-4 text-sm font-bold transition-all relative text-blue-600">
                          审批详情
                          <div className="absolute bottom-[-1px] left-0 right-0 h-[3px] bg-blue-600 rounded-full"></div>
                       </button>
                    </div>

                    <div className="space-y-10 animate-fade-in">
                       <div>
                          <div className="flex items-center gap-3 mb-6 border-l-4 border-gray-900 pl-3">
                             <h3 className="text-base font-extrabold text-gray-900">任务说明</h3>
                          </div>
                          <div className="grid grid-cols-1 gap-y-6">
                             {currentViewTask.details ? (
                               Object.entries(currentViewTask.details).map(([key, value], i) => (
                                 <div key={i} className="flex max-w-xl">
                                    <span className="w-48 text-gray-500 font-medium text-sm">{key}</span>
                                    <span className="text-gray-900 font-bold text-sm">{value}</span>
                                 </div>
                               ))
                             ) : (
                               [
                                 { label: '任务名称', value: currentViewTask.title },
                                 { label: '任务类别', value: currentViewTask.type },
                                 { label: '任务工单号', value: `TASK-${currentViewTask.id}-2024` },
                                 { label: '重要程度', value: '普通' },
                                 { label: '所属项目', value: '企业数字转型 2024' }
                               ].map((field, i) => (
                                 <div key={i} className="flex max-w-xl">
                                    <span className="w-48 text-gray-500 font-medium text-sm">{field.label}</span>
                                    <span className="text-gray-900 font-bold text-sm">{field.value}</span>
                                 </div>
                               ))
                             )}
                          </div>
                       </div>
                    </div>
                  </div>
               </div>

               {activeTabId !== 'done' && activeTabId !== 'cc' && activeTabId !== 'read' && (
                 <div className="p-4 border-t border-gray-100 bg-white flex justify-end px-8 shrink-0">
                    {activeTabId === 'my-apps' ? (
                       <div className="flex gap-3">
                          <button className="px-6 py-2.5 bg-white border border-gray-300 text-gray-700 rounded font-bold text-sm hover:bg-gray-50 transition-all active:scale-95">撤回</button>
                          <button className="px-10 py-2.5 bg-blue-600 text-white rounded font-bold text-sm hover:bg-blue-700 shadow-md shadow-blue-100 transition-all active:scale-95">催办</button>
                       </div>
                    ) : (
                       <button className="px-10 py-2.5 bg-blue-600 text-white rounded font-bold text-sm hover:bg-blue-700 shadow-md shadow-blue-100 transition-all active:scale-95">办理</button>
                    )}
                 </div>
               )}
            </div>
          </div>
        </div>,
        document.body
      )}
    </DashboardWidget>
  );
};
