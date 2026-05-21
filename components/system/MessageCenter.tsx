import React, { useState } from 'react';
import { 
  Bell, 
  Info, 
  Check, 
  Trash2, 
  Mail, 
  MailOpen, 
  Search, 
  Filter,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

interface Message {
  id: string;
  title: string;
  content: string;
  type: 'system' | 'announcement';
  time: string;
  isRead: boolean;
  sender: string;
  targetAudience?: string;
}

export const MessageCenter: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>(generateMockMessages());
  const [activeTab, setActiveTab] = useState<'all' | 'unread'>('all');
  const [selectedType, setSelectedType] = useState<'all' | 'system' | 'announcement'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const filteredMessages = messages.filter(msg => {
    if (activeTab === 'unread' && msg.isRead) return false;
    if (selectedType !== 'all' && msg.type !== selectedType) return false;
    if (searchQuery && !msg.title.toLowerCase().includes(searchQuery.toLowerCase()) && !msg.content.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const unreadCount = messages.filter(m => !m.isRead).length;

  // Pagination Logic
  const totalPages = Math.ceil(filteredMessages.length / ITEMS_PER_PAGE);
  const currentMessages = filteredMessages.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleMarkAsRead = (id: string) => {
    setMessages(prev => prev.map(m => m.id === id ? { ...m, isRead: true } : m));
  };

  const handleMarkAllRead = () => {
    setMessages(prev => prev.map(m => ({ ...m, isRead: true })));
  };

  const handleDelete = (id: string) => {
    setMessages(prev => prev.filter(m => m.id !== id));
  };

  const getTypeStyles = (type: string) => {
    switch(type) {
      case 'system': return { bg: 'bg-blue-100', text: 'text-blue-600', icon: <Bell size={18} /> };
      case 'announcement': return { bg: 'bg-green-100', text: 'text-green-600', icon: <Info size={18} /> };
      default: return { bg: 'bg-gray-100', text: 'text-gray-600', icon: <Bell size={18} /> };
    }
  };

  // Reset page when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [activeTab, selectedType, searchQuery]);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header Stats & Actions */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-4 rounded-lg shadow-sm border border-gray-100">
         <div className="flex items-center space-x-2">
            <div className="relative">
               <button 
                 onClick={() => setActiveTab('all')}
                 className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${activeTab === 'all' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'}`}
               >
                 全部消息
               </button>
               {activeTab === 'all' && <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-4 h-0.5 bg-blue-600"></div>}
            </div>
            <div className="relative">
               <button 
                 onClick={() => setActiveTab('unread')}
                 className={`px-4 py-2 text-sm font-medium rounded-md transition-colors flex items-center ${activeTab === 'unread' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'}`}
               >
                 未读消息
                 {unreadCount > 0 && <span className="ml-2 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">{unreadCount}</span>}
               </button>
               {activeTab === 'unread' && <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-4 h-0.5 bg-blue-600"></div>}
            </div>
         </div>

         <div className="flex items-center space-x-3 w-full md:w-auto">
            <div className="relative flex-1 md:flex-none">
               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
               <input 
                 type="text" 
                 placeholder="搜索消息..." 
                 value={searchQuery}
                 onChange={(e) => setSearchQuery(e.target.value)}
                 className="pl-9 pr-4 py-1.5 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 w-full md:w-64"
               />
            </div>
            <button 
              onClick={handleMarkAllRead}
              className="flex items-center px-3 py-1.5 text-sm text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 whitespace-nowrap"
            >
               <MailOpen size={14} className="mr-1.5" /> 全部已读
            </button>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
         {/* Sidebar Filters */}
         <div className="lg:col-span-1 bg-white rounded-lg shadow-sm border border-gray-100 p-4 h-fit">
            <h3 className="text-sm font-bold text-gray-700 mb-3 flex items-center">
               <Filter size={16} className="mr-2" /> 消息类型
            </h3>
            <div className="space-y-1">
               {[
                 { id: 'all', label: '全部类型', icon: <Bell size={16} /> },
                 { id: 'system', label: '系统通知', icon: <Bell size={16} /> },
                 { id: 'announcement', label: '公告通知', icon: <Info size={16} /> },
               ].map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setSelectedType(type.id as any)}
                    className={`w-full flex items-center justify-between px-3 py-2 text-sm rounded-md transition-colors ${selectedType === type.id ? 'bg-blue-50 text-blue-600 font-medium' : 'text-gray-600 hover:bg-gray-50'}`}
                  >
                     <div className="flex items-center">
                        <span className="mr-3 opacity-70">{type.icon}</span>
                        {type.label}
                     </div>
                     {type.id !== 'all' && (
                        <span className="text-xs text-gray-400 bg-gray-100 px-1.5 rounded-full">
                           {messages.filter(m => m.type === type.id && (activeTab === 'unread' ? !m.isRead : true)).length}
                        </span>
                     )}
                  </button>
               ))}
            </div>
         </div>

         {/* Content Area */}
         <div className="lg:col-span-3 space-y-4">
            {/* Inbox List View */}
            {currentMessages.length > 0 ? (
               <>
                  {currentMessages.map((msg) => {
                     const style = getTypeStyles(msg.type);
                     return (
                        <div 
                          key={msg.id} 
                          className={`bg-white rounded-lg shadow-sm border p-4 transition-all hover:shadow-md ${msg.isRead ? 'border-gray-100' : 'border-l-4 border-l-blue-500 border-y-gray-100 border-r-gray-100'}`}
                        >
                           <div className="flex items-start">
                              <div className={`p-2 rounded-full ${style.bg} ${style.text} mr-4 mt-1 shrink-0`}>
                                 {style.icon}
                              </div>
                              <div className="flex-1 min-w-0">
                                 <div className="flex justify-between items-start">
                                    <div>
                                       <h4 className={`text-base font-bold mb-1 ${msg.isRead ? 'text-gray-700' : 'text-gray-900'}`}>
                                          {msg.title}
                                          {!msg.isRead && <span className="ml-2 inline-block w-2 h-2 bg-red-500 rounded-full"></span>}
                                       </h4>
                                       <div className="flex items-center text-xs text-gray-400 mb-2">
                                          <span className="mr-3">{msg.sender}</span>
                                          <span>{msg.time}</span>
                                       </div>
                                    </div>
                                    <div className="flex space-x-2 ml-4">
                                       {!msg.isRead && (
                                          <button 
                                            onClick={() => handleMarkAsRead(msg.id)}
                                            className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
                                            title="标为已读"
                                          >
                                             <Check size={16} />
                                          </button>
                                       )}
                                       <button 
                                         onClick={() => handleDelete(msg.id)}
                                         className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
                                         title="删除"
                                       >
                                          <Trash2 size={16} />
                                       </button>
                                    </div>
                                 </div>
                                 <p className={`text-sm leading-relaxed ${msg.isRead ? 'text-gray-500' : 'text-gray-700'}`}>
                                    {msg.content}
                                 </p>
                              </div>
                           </div>
                        </div>
                     );
                  })}
                  
                  {/* Pagination Component */}
                  <div className="flex justify-center mt-6">
                     <div className="flex space-x-1 bg-white p-1 rounded-lg border border-gray-200">
                         <button
                           onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                           disabled={currentPage === 1}
                           className="px-2 py-1 rounded-md text-gray-500 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed"
                         >
                           <ChevronLeft size={16} />
                         </button>
                         {Array.from({ length: totalPages }).map((_, idx) => (
                             <button
                               key={idx}
                               onClick={() => setCurrentPage(idx + 1)}
                               className={`w-8 h-8 rounded-md text-sm font-medium transition-colors ${
                                   currentPage === idx + 1 
                                   ? 'bg-blue-600 text-white shadow-sm' 
                                   : 'text-gray-600 hover:bg-gray-100'
                               }`}
                             >
                               {idx + 1}
                             </button>
                         ))}
                         <button
                           onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                           disabled={currentPage === totalPages}
                           className="px-2 py-1 rounded-md text-gray-500 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed"
                         >
                           <ChevronRight size={16} />
                         </button>
                     </div>
                  </div>
               </>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 bg-white rounded-lg border border-gray-100 border-dashed text-gray-400">
                 <Mail size={48} className="mb-4 opacity-20" />
                 <p>暂无消息</p>
              </div>
            )}
         </div>
      </div>
    </div>
  );
};

// Extended Mock Data for Pagination
const generateMockMessages = (): Message[] => {
  const baseMessages: Message[] = [
    { 
      id: '1', 
      title: '系统维护通知', 
      content: '系统将于本周六凌晨 02:00 进行例行维护，预计耗时 2 小时。期间服务不可用，请提前保存工作内容。', 
      type: 'system', 
      time: '2024-03-20 10:00', 
      isRead: false,
      sender: 'IT 运维部'
    },
    { 
      id: '2', 
      title: '2024年五一放假安排', 
      content: '根据国家法定节假日安排，公司将于5月1日至5月5日放假调休，共5天。4月28日（星期日）、5月11日（星期六）上班。请各部门提前安排好工作。', 
      type: 'announcement', 
      time: '2024-03-19 14:30', 
      isRead: false,
      sender: '行政部'
    },
    { 
      id: '3', 
      title: '绩效考核待办提醒', 
      content: '您有一个待处理的 Q1 绩效考核任务即将于 3 天后到期，请尽快前往绩效系统处理，以免影响考评结果。', 
      type: 'system', 
      time: '2024-03-18 09:15', 
      isRead: true,
      sender: 'HR 绩效组'
    },
    { 
      id: '4', 
      title: '新员工入职指引更新 V2.0', 
      content: 'HR部门已更新入职指引文档，新增了远程办公协作指南部分，请各部门经理查阅并传达给新入职员工。', 
      type: 'announcement', 
      time: '2024-03-15 16:45', 
      isRead: true,
      sender: 'HRSSC'
    },
    { 
      id: '5', 
      title: 'API 接口调用异常告警', 
      content: '监控系统检测到外部招聘接口 (Beisen) 响应超时率超过 5%，请及时检查网络连接 or 联系供应商。', 
      type: 'system', 
      time: '2024-03-14 11:20', 
      isRead: true,
      sender: '系统监控'
    },
    { 
      id: '6', 
      title: '关于开展全员信息安全培训的通知', 
      content: '为加强公司信息安全管理，所有员工需在本月底前完成在线信息安全培训课程及考试。', 
      type: 'announcement', 
      time: '2024-03-12 09:00', 
      isRead: true,
      sender: '安全合规部'
    }
  ];

  // Duplicate items to simulate pagination
  let items = [...baseMessages];
  for(let i = 0; i < 2; i++) {
      items = items.concat(baseMessages.map(m => ({ ...m, id: m.id + '_copy_' + i, title: m.title + ` (副本 ${i+1})` })));
  }
  return items;
}

const ITEMS_PER_PAGE = 5;
