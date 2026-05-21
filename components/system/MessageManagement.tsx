import React, { useState } from 'react';
import { 
  Bell, 
  Info, 
  Trash2, 
  Search, 
  ChevronLeft,
  ChevronRight,
  Plus,
  X,
  Users,
  User,
  Send
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

const PublishMessageModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onPublish: (msg: any) => void;
}> = ({ isOpen, onClose, onPublish }) => {
  const [formData, setFormData] = useState({
    title: '',
    type: 'system',
    audienceType: 'dept',
    audienceValue: '',
    sender: '系统管理员',
    content: ''
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onPublish({
      ...formData,
      id: Date.now().toString(),
      time: new Date().toLocaleString(),
      isRead: false,
      sender: formData.sender
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-fade-in">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl flex flex-col max-h-[90vh] animate-scale-up">
        <div className="flex justify-between items-center p-4 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <Send size={20} className="text-blue-600" />
            <h3 className="font-bold text-gray-800 text-lg">发布新消息</h3>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-full transition-colors">
            <X size={20} className="text-gray-400 hover:text-gray-600"/>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto custom-scrollbar space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1.5">消息标题</label>
              <input 
                type="text" 
                required
                placeholder="请输入消息标题"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">消息类型</label>
              <select 
                value={formData.type}
                onChange={(e) => setFormData({...formData, type: e.target.value as any})}
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none bg-white"
              >
                <option value="system">系统通知</option>
                <option value="announcement">公司公告</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">通知人群</label>
              <div className="flex gap-4 mt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input 
                    type="radio" 
                    checked={formData.audienceType === 'dept'} 
                    onChange={() => setFormData({...formData, audienceType: 'dept'})}
                    className="w-4 h-4 text-blue-600 border-gray-300"
                  />
                  <span className="text-sm text-gray-700 flex items-center gap-1"><Users size={14}/> 部门组织</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input 
                    type="radio" 
                    checked={formData.audienceType === 'user'} 
                    onChange={() => setFormData({...formData, audienceType: 'user'})}
                    className="w-4 h-4 text-blue-600 border-gray-300"
                  />
                  <span className="text-sm text-gray-700 flex items-center gap-1"><User size={14}/> 指定人员</span>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">选择范围</label>
              <div className="relative">
                <input 
                  type="text" 
                  placeholder={formData.audienceType === 'dept' ? "点击选择部门..." : "点击选择人员..."}
                  value={formData.audienceValue}
                  onChange={(e) => setFormData({...formData, audienceValue: e.target.value})}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                />
                <Search size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">发布内容</label>
            <div className="border border-gray-300 rounded-md overflow-hidden">
              {/* Simple Rich Text Toolbar Simulation */}
              <div className="bg-gray-50 border-b border-gray-200 p-2 flex gap-2">
                <button type="button" className="p-1 hover:bg-gray-200 rounded font-bold text-xs px-2">B</button>
                <button type="button" className="p-1 hover:bg-gray-200 rounded italic text-xs px-2">I</button>
                <button type="button" className="p-1 hover:bg-gray-200 rounded underline text-xs px-2">U</button>
                <div className="w-px h-4 bg-gray-300 mx-1"></div>
                <button type="button" className="p-1 hover:bg-gray-200 rounded text-xs px-2">H1</button>
                <button type="button" className="p-1 hover:bg-gray-200 rounded text-xs px-2">H2</button>
                <div className="w-px h-4 bg-gray-300 mx-1"></div>
                <button type="button" className="p-1 hover:bg-gray-200 rounded text-xs px-2">List</button>
              </div>
              <textarea 
                rows={8}
                required
                placeholder="请输入发布内容..."
                value={formData.content}
                onChange={(e) => setFormData({...formData, content: e.target.value})}
                className="w-full p-3 text-sm focus:outline-none resize-none"
              />
            </div>
          </div>
        </form>

        <div className="p-4 border-t border-gray-100 flex justify-end gap-3 bg-gray-50 rounded-b-lg">
          <button onClick={onClose} className="px-6 py-2 bg-white border border-gray-300 rounded text-sm text-gray-700 hover:bg-gray-50 transition-colors">
            取消
          </button>
          <button onClick={handleSubmit} className="px-6 py-2 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 shadow-sm transition-colors flex items-center gap-2">
            <Send size={16} /> 立即发布
          </button>
        </div>
      </div>
    </div>
  );
};

export const MessageManagement: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>(generateMockMessages());
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isPublishModalOpen, setIsPublishModalOpen] = useState(false);

  const handlePublish = (newMsg: any) => {
    setMessages([newMsg, ...messages]);
  };

  const filteredMessages = messages.filter(msg => {
    if (searchQuery && !msg.title.toLowerCase().includes(searchQuery.toLowerCase()) && !msg.content.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const ITEMS_PER_PAGE = 10;
  const totalPages = Math.ceil(filteredMessages.length / ITEMS_PER_PAGE);
  const currentMessages = filteredMessages.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleDelete = (id: string) => {
    setMessages(prev => prev.filter(m => m.id !== id));
  };

  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-4 rounded-lg shadow-sm border border-gray-100">
         <div className="flex items-center space-x-2">
            <div className="flex items-center gap-2">
              <Bell size={18} className="text-blue-600" />
              <span className="font-bold text-gray-800">消息列表 (已发布)</span>
            </div>
         </div>

         <div className="flex items-center space-x-3 w-full md:w-auto">
            <button 
              onClick={() => setIsPublishModalOpen(true)}
              className="flex items-center px-4 py-1.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm shadow-sm"
            >
               <Plus size={16} className="mr-1.5" /> 发布消息
            </button>
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
         </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="px-4 py-3 font-bold text-gray-700">消息标题</th>
                <th className="px-4 py-3 font-bold text-gray-700">类型</th>
                <th className="px-4 py-3 font-bold text-gray-700">发送人</th>
                <th className="px-4 py-3 font-bold text-gray-700">发布时间</th>
                <th className="px-4 py-3 font-bold text-gray-700 text-center">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {currentMessages.length > 0 ? (
                currentMessages.map((msg) => (
                  <tr key={msg.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-gray-900 truncate max-w-[200px]" title={msg.title}>{msg.title}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-gray-600">
                      <span className={`px-2 py-0.5 rounded text-xs ${msg.type === 'announcement' ? 'bg-green-50 text-green-600 border border-green-100' : 'bg-blue-50 text-blue-600 border border-blue-100'}`}>
                        {msg.type === 'announcement' ? '公告通知' : '系统通知'}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-600">{msg.sender}</td>
                    <td className="px-4 py-3 text-gray-400 whitespace-nowrap">{msg.time}</td>
                    <td className="px-4 py-3">
                      <div className="flex justify-center gap-2">
                        <button className="p-1.5 text-blue-600 hover:bg-blue-50 rounded transition-colors" title="查看明细">
                          <Info size={16} />
                        </button>
                        <button onClick={() => handleDelete(msg.id)} className="p-1.5 text-red-600 hover:bg-red-50 rounded transition-colors" title="删除记录">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-4 py-10 text-center text-gray-400">
                    暂无发布记录
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {currentMessages.length > 0 && (
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
      )}

      <PublishMessageModal 
        isOpen={isPublishModalOpen}
        onClose={() => setIsPublishModalOpen(false)}
        onPublish={handlePublish}
      />
    </div>
  );
};

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

  let items = [...baseMessages];
  for(let i = 0; i < 2; i++) {
      items = items.concat(baseMessages.map(m => ({ ...m, id: m.id + '_copy_' + i, title: m.title + ` (副本 ${i+1})` })));
  }
  return items;
}
