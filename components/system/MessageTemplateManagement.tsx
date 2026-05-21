
import React, { useState } from 'react';
import { 
  Mail, 
  MessageSquare, 
  Bell, 
  Plus, 
  Edit3, 
  Send, 
  Clock, 
  Users, 
  Search, 
  Calendar, 
  CheckCircle, 
  X, 
  Filter,
  MoreHorizontal,
  Trash2,
  FileText
} from 'lucide-react';

// --- Types ---

type ChannelType = 'email' | 'notice';
type TargetType = 'all' | 'department' | 'position' | 'specific';

interface MessageTemplate {
  id: string;
  title: string; // This is the template name
  subject?: string; // This is the email/message subject
  channel: ChannelType;
  content: string;
  updatedAt: string;
  updatedBy: string;
}

interface PublishRecord {
  id: string;
  templateTitle: string;
  subject?: string;
  channel: ChannelType;
  targetType: TargetType;
  targetDetail: string;
  scheduleTime: string; // ISO string
  status: 'Sent' | 'Scheduled' | 'Failed';
  sentCount: number;
  operator: string;
}

// --- Mock Data ---

const MOCK_TEMPLATES: MessageTemplate[] = [
  { id: '1', title: '入职欢迎邮件', subject: '欢迎加入公司，${name}！', channel: 'email', content: '亲爱的 ${name}，欢迎加入公司！您的入职引导已准备就绪...', updatedAt: '2024-03-20', updatedBy: 'Admin' },
  { id: '3', title: '节日放假通知', subject: '2024年节日放假安排', channel: 'notice', content: '根据国家法定节假日安排，公司将于...', updatedAt: '2024-03-15', updatedBy: 'Admin' },
  { id: '4', title: '绩效考核提醒', subject: 'Q1 绩效考核通道已开启', channel: 'notice', content: 'Q1 绩效考核通道已开启，请于本周五前完成自评。', updatedAt: '2024-03-10', updatedBy: 'HR_Tom' },
  { id: '5', title: '工资单发放通知', subject: '本月工资单已发放', channel: 'email', content: '本月工资单已发送至您的个人邮箱，请查收。', updatedAt: '2024-03-01', updatedBy: 'Finance' },
];

const MOCK_HISTORY: PublishRecord[] = [
  { id: '101', templateTitle: '节日放假通知', subject: '2024年节日放假安排', channel: 'notice', targetType: 'all', targetDetail: '全员', scheduleTime: '2024-03-15 10:00', status: 'Sent', sentCount: 1250, operator: 'Admin' },
  { id: '102', templateTitle: '绩效考核提醒', subject: 'Q1 绩效考核通道已开启', channel: 'notice', targetType: 'department', targetDetail: '研发中心, 产品部', scheduleTime: '2024-03-10 09:00', status: 'Sent', sentCount: 450, operator: 'HR_Tom' },
  { id: '103', templateTitle: '入职欢迎邮件', subject: '欢迎加入公司，${name}！', channel: 'email', targetType: 'specific', targetDetail: '张三 (E001)', scheduleTime: '2024-03-21 08:30', status: 'Scheduled', sentCount: 1, operator: 'HR_Lisa' },
];

// --- Components ---

export const MessageTemplateManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'templates' | 'history'>('templates');
  const [templates, setTemplates] = useState<MessageTemplate[]>(MOCK_TEMPLATES);
  const [history, setHistory] = useState<PublishRecord[]>(MOCK_HISTORY);
  
  // Modal States
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isPublishModalOpen, setIsPublishModalOpen] = useState(false);
  const [currentTemplate, setCurrentTemplate] = useState<Partial<MessageTemplate>>({});
  
  // Publish Form State
  const [publishForm, setPublishForm] = useState({
    title: '',
    channel: 'email' as ChannelType,
    targetType: 'all' as TargetType,
    targetDetail: '', // IDs or Names separated by comma
    scheduleType: 'now' as 'now' | 'scheduled',
    scheduleDate: '',
    scheduleTime: ''
  });

  // --- Handlers ---

  const handleEdit = (template?: MessageTemplate) => {
    if (template) {
      setCurrentTemplate(template);
    } else {
      setCurrentTemplate({ channel: 'email', title: '', content: '' });
    }
    setIsEditModalOpen(true);
  };

  const handleSaveTemplate = () => {
    if (currentTemplate.id) {
      setTemplates(prev => prev.map(t => t.id === currentTemplate.id ? { ...t, ...currentTemplate, updatedAt: new Date().toISOString().split('T')[0] } as MessageTemplate : t));
    } else {
      const newT: MessageTemplate = {
        id: Date.now().toString(),
        updatedAt: new Date().toISOString().split('T')[0],
        updatedBy: 'Me',
        ...(currentTemplate as MessageTemplate)
      };
      setTemplates([newT, ...templates]);
    }
    setIsEditModalOpen(false);
  };

  const handleDeleteTemplate = (id: string) => {
    if (window.confirm('确定删除该模版吗？')) {
      setTemplates(prev => prev.filter(t => t.id !== id));
    }
  };

  const handlePublishClick = (template: MessageTemplate) => {
    setCurrentTemplate(template);
    setPublishForm({
      title: template.channel === 'email' ? (template.subject || template.title) : template.title,
      channel: template.channel,
      targetType: 'all',
      targetDetail: '',
      scheduleType: 'now',
      scheduleDate: '',
      scheduleTime: ''
    });
    setIsPublishModalOpen(true);
  };

  const handleConfirmPublish = () => {
    const newRecord: PublishRecord = {
      id: Date.now().toString(),
      templateTitle: currentTemplate.title || publishForm.title,
      subject: publishForm.channel === 'email' ? publishForm.title : undefined,
      channel: publishForm.channel,
      targetType: publishForm.targetType,
      targetDetail: publishForm.targetType === 'all' ? '全员' : publishForm.targetDetail || '未指定',
      scheduleTime: publishForm.scheduleType === 'now' ? new Date().toLocaleString() : `${publishForm.scheduleDate} ${publishForm.scheduleTime}`,
      status: publishForm.scheduleType === 'now' ? 'Sent' : 'Scheduled',
      sentCount: 0, // Mock
      operator: 'Me'
    };
    setHistory([newRecord, ...history]);
    setIsPublishModalOpen(false);
    alert(publishForm.scheduleType === 'now' ? '消息已发送！' : '消息已加入发送队列。');
  };

  const getChannelIcon = (channel: string) => {
    switch (channel) {
      case 'email': return <Mail size={18} />;
      case 'notice': return <Bell size={18} />;
      default: return <FileText size={18} />;
    }
  };

  const getChannelName = (channel: string) => {
    switch (channel) {
      case 'email': return '邮件';
      case 'notice': return '站内公告';
      default: return '未知';
    }
  };

  const getChannelColor = (channel: string) => {
     switch (channel) {
      case 'email': return 'bg-blue-100 text-blue-600';
      case 'notice': return 'bg-orange-100 text-orange-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
         <div>
            <h2 className="text-2xl font-bold text-gray-800 flex items-center">
               <Send className="mr-3 text-blue-600" /> 消息模版与发布
            </h2>
            <p className="text-sm text-gray-500 mt-1">管理系统消息模版，向员工发送通知、公告或提醒</p>
         </div>
         <div className="flex bg-gray-100 p-1 rounded-lg">
            <button 
               onClick={() => setActiveTab('templates')}
               className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${activeTab === 'templates' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
            >
               模版库
            </button>
            <button 
               onClick={() => setActiveTab('history')}
               className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${activeTab === 'history' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
            >
               发布记录
            </button>
         </div>
      </div>

      {activeTab === 'templates' && (
         <>
            <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow-sm border border-gray-100">
               <div className="relative w-64">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                  <input type="text" placeholder="搜索模版..." className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"/>
               </div>
               <button 
                  onClick={() => handleEdit()}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center text-sm shadow-sm"
               >
                  <Plus size={16} className="mr-2" /> 新建模版
               </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
               {templates.map(t => (
                  <div key={t.id} className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all group flex flex-col h-full">
                     <div className="p-5 border-b border-gray-100">
                        <div className="flex justify-between items-start mb-3">
                           <div className={`p-2 rounded-lg ${getChannelColor(t.channel)}`}>
                              {getChannelIcon(t.channel)}
                           </div>
                           <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                              <button 
                                 onClick={() => handleEdit(t)}
                                 className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-gray-100 rounded" title="编辑"
                              >
                                 <Edit3 size={16} />
                              </button>
                              <button 
                                 onClick={() => handleDeleteTemplate(t.id)}
                                 className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-gray-100 rounded" title="删除"
                              >
                                 <Trash2 size={16} />
                              </button>
                           </div>
                        </div>
                        <h3 className="font-bold text-gray-800 text-lg line-clamp-1">{t.title}</h3>
                        <div className="text-xs text-gray-400 mt-2 flex items-center">
                           <Clock size={12} className="mr-1" /> 更新于 {t.updatedAt} by {t.updatedBy}
                        </div>
                     </div>
                     <div className="p-5 flex-1 bg-gray-50/50">
                        <p className="text-sm text-gray-600 line-clamp-3 leading-relaxed">{t.content}</p>
                     </div>
                     <div className="p-4 border-t border-gray-100">
                        <button 
                           onClick={() => handlePublishClick(t)}
                           className="w-full py-2 bg-white border border-blue-200 text-blue-600 rounded-md hover:bg-blue-50 text-sm font-medium flex items-center justify-center transition-colors"
                        >
                           <Send size={16} className="mr-2" /> 发布通知
                        </button>
                     </div>
                  </div>
               ))}
            </div>
         </>
      )}

      {activeTab === 'history' && (
         <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
             <table className="w-full text-left text-sm whitespace-nowrap">
               <thead className="bg-gray-50 text-gray-500 font-medium border-b border-gray-200">
                  <tr>
                     <th className="p-4">模版标题</th>
                     <th className="p-4">渠道</th>
                     <th className="p-4">发送对象</th>
                     <th className="p-4">发布时间</th>
                     <th className="p-4">操作人</th>
                     <th className="p-4">状态</th>
                     <th className="p-4">发送数量</th>
                     <th className="p-4 text-right">操作</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-gray-100">
                  {history.map(record => (
                     <tr key={record.id} className="hover:bg-gray-50">
                        <td className="p-4 font-medium text-gray-800">{record.templateTitle}</td>
                        <td className="p-4">
                           <span className={`px-2 py-0.5 rounded text-xs border ${
                              record.channel === 'email' ? 'bg-blue-50 text-blue-600 border-blue-100' :
                              'bg-orange-50 text-orange-600 border-orange-100'
                           }`}>
                              {getChannelName(record.channel)}
                           </span>
                        </td>
                        <td className="p-4 text-gray-600 max-w-xs truncate" title={record.targetDetail}>
                           <span className="font-bold mr-1">
                              {record.targetType === 'all' ? '全员' : record.targetType === 'department' ? '部门' : record.targetType === 'position' ? '职位' : '个人'}
                           </span>
                           {record.targetType !== 'all' && `- ${record.targetDetail}`}
                        </td>
                        <td className="p-4 text-gray-600 font-mono text-xs">{record.scheduleTime}</td>
                        <td className="p-4 text-gray-600">{record.operator}</td>
                        <td className="p-4">
                           {record.status === 'Sent' ? (
                              <span className="flex items-center text-green-600 text-xs"><CheckCircle size={12} className="mr-1"/> 已发送</span>
                           ) : record.status === 'Scheduled' ? (
                              <span className="flex items-center text-blue-600 text-xs"><Clock size={12} className="mr-1"/> 待发送</span>
                           ) : (
                              <span className="flex items-center text-red-600 text-xs"><X size={12} className="mr-1"/> 失败</span>
                           )}
                        </td>
                        <td className="p-4 font-mono">{record.sentCount}</td>
                        <td className="p-4 text-right">
                           <button className="text-gray-400 hover:text-blue-600"><MoreHorizontal size={16}/></button>
                        </td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
      )}

      {/* Edit Template Modal */}
      {isEditModalOpen && (
         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl animate-scale-up flex flex-col max-h-[90vh]">
               <div className="p-5 border-b border-gray-100 flex justify-between items-center">
                  <h3 className="font-bold text-gray-800 text-lg">{currentTemplate.id ? '编辑模版' : '新建模版'}</h3>
                  <button onClick={() => setIsEditModalOpen(false)}><X size={20} className="text-gray-400 hover:text-gray-600"/></button>
               </div>
               <div className="p-6 space-y-5 overflow-y-auto">
                  <div>
                     <label className="block text-sm font-medium text-gray-700 mb-2">通知渠道</label>
                     <div className="flex space-x-4">
                        {['email', 'notice'].map(c => (
                           <label key={c} className={`flex-1 border rounded-lg p-3 cursor-pointer flex items-center justify-center transition-all ${currentTemplate.channel === c ? 'border-blue-500 bg-blue-50 text-blue-700 ring-1 ring-blue-500' : 'border-gray-200 hover:border-gray-300'}`}>
                              <input 
                                 type="radio" 
                                 name="channel" 
                                 className="sr-only"
                                 checked={currentTemplate.channel === c}
                                 onChange={() => setCurrentTemplate({ ...currentTemplate, channel: c as ChannelType })}
                              />
                              {getChannelIcon(c)}
                              <span className="ml-2 text-sm font-medium">{getChannelName(c)}</span>
                           </label>
                        ))}
                     </div>
                  </div>
                  <div>
                     <label className="block text-sm font-medium text-gray-700 mb-1">模版标题</label>
                     <input 
                        type="text" 
                        value={currentTemplate.title || ''}
                        onChange={(e) => setCurrentTemplate({...currentTemplate, title: e.target.value})}
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                        placeholder="请输入模版名称..."
                     />
                  </div>
                  {currentTemplate.channel === 'email' && (
                     <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">邮件标题</label>
                        <input 
                           type="text" 
                           value={currentTemplate.subject || ''}
                           onChange={(e) => setCurrentTemplate({...currentTemplate, subject: e.target.value})}
                           className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                           placeholder="请输入邮件标题，支持 ${name} 等变量..."
                        />
                     </div>
                  )}
                  <div>
                     <label className="block text-sm font-medium text-gray-700 mb-1">内容</label>
                     <textarea 
                        value={currentTemplate.content || ''}
                        onChange={(e) => setCurrentTemplate({...currentTemplate, content: e.target.value})}
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none h-48"
                        placeholder="请输入内容，支持 ${name} 等变量..."
                     ></textarea>
                     <p className="text-xs text-gray-400 mt-2">可用变量: ${'{'}name{'}'}, ${'{'}time{'}'}, ${'{'}location{'}'}</p>
                  </div>
               </div>
               <div className="p-5 border-t border-gray-100 flex justify-end space-x-3 bg-gray-50 rounded-b-lg">
                  <button onClick={() => setIsEditModalOpen(false)} className="px-4 py-2 border border-gray-300 rounded text-gray-700 bg-white hover:bg-gray-50">取消</button>
                  <button onClick={handleSaveTemplate} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 shadow-sm">保存</button>
               </div>
            </div>
         </div>
      )}

      {/* Publish Modal */}
      {isPublishModalOpen && (
         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-lg animate-scale-up flex flex-col">
               <div className="p-5 border-b border-gray-100 flex justify-between items-center bg-blue-50">
                  <div>
                     <h3 className="font-bold text-blue-800 text-lg">发布消息</h3>
                     <p className="text-xs text-blue-600 mt-1">模版: {currentTemplate.title}</p>
                  </div>
                  <button onClick={() => setIsPublishModalOpen(false)}><X size={20} className="text-blue-400 hover:text-blue-600"/></button>
               </div>
               
               <div className="p-6 space-y-6">
                  {/* Message Info */}
                  <div>
                     <label className="block text-sm font-bold text-gray-800 mb-3 flex items-center">
                        <Mail size={16} className="mr-2 text-blue-600"/> 消息设置
                     </label>
                     
                     <div className="mb-4">
                        <label className="block text-xs font-medium text-gray-500 mb-1">消息主题</label>
                        <input 
                           type="text" 
                           value={publishForm.title}
                           onChange={(e) => setPublishForm({...publishForm, title: e.target.value})}
                           className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                     </div>

                     <div className="mb-4">
                        <label className="block text-xs font-medium text-gray-500 mb-2">发布渠道</label>
                        <div className="flex space-x-4">
                           <label className="flex items-center cursor-pointer">
                              <input 
                                 type="radio" 
                                 name="pub_channel" 
                                 checked={publishForm.channel === 'email'}
                                 onChange={() => setPublishForm({...publishForm, channel: 'email'})}
                                 className="text-blue-600 focus:ring-blue-500 mr-2"
                              />
                              <span className="text-sm text-gray-700">邮件</span>
                           </label>
                           <label className="flex items-center cursor-pointer">
                              <input 
                                 type="radio" 
                                 name="pub_channel" 
                                 checked={publishForm.channel === 'notice'}
                                 onChange={() => setPublishForm({...publishForm, channel: 'notice'})}
                                 className="text-blue-600 focus:ring-blue-500 mr-2"
                              />
                              <span className="text-sm text-gray-700">站内公告</span>
                           </label>
                        </div>
                     </div>
                  </div>

                  <div className="border-t border-gray-100 my-4"></div>

                  {/* Target Audience */}
                  <div>
                     <label className="block text-sm font-bold text-gray-800 mb-3 flex items-center">
                        <Users size={16} className="mr-2 text-blue-600"/> 发布人群
                     </label>
                     <div className="space-y-3">
                        <label className="flex items-center cursor-pointer">
                           <input 
                              type="radio" 
                              name="targetType" 
                              checked={publishForm.targetType === 'all'}
                              onChange={() => setPublishForm({...publishForm, targetType: 'all'})}
                              className="text-blue-600 focus:ring-blue-500 mr-2"
                           />
                           <span className="text-sm text-gray-700">全员发送</span>
                        </label>
                        <label className="flex items-center cursor-pointer">
                           <input 
                              type="radio" 
                              name="targetType" 
                              checked={publishForm.targetType === 'department'}
                              onChange={() => setPublishForm({...publishForm, targetType: 'department'})}
                              className="text-blue-600 focus:ring-blue-500 mr-2"
                           />
                           <span className="text-sm text-gray-700">按部门</span>
                        </label>
                        {publishForm.targetType === 'department' && (
                           <select 
                              className="w-full mt-2 ml-6 border border-gray-300 rounded px-3 py-1.5 text-sm"
                              value={publishForm.targetDetail}
                              onChange={(e) => setPublishForm({...publishForm, targetDetail: e.target.value})}
                           >
                              <option value="">请选择部门...</option>
                              <option value="研发中心">研发中心</option>
                              <option value="销售部">销售部</option>
                              <option value="市场部">市场部</option>
                              <option value="人力资源部">人力资源部</option>
                           </select>
                        )}

                        <label className="flex items-center cursor-pointer">
                           <input 
                              type="radio" 
                              name="targetType" 
                              checked={publishForm.targetType === 'position'}
                              onChange={() => setPublishForm({...publishForm, targetType: 'position'})}
                              className="text-blue-600 focus:ring-blue-500 mr-2"
                           />
                           <span className="text-sm text-gray-700">按职位</span>
                        </label>
                         {publishForm.targetType === 'position' && (
                           <select 
                              className="w-full mt-2 ml-6 border border-gray-300 rounded px-3 py-1.5 text-sm"
                              value={publishForm.targetDetail}
                              onChange={(e) => setPublishForm({...publishForm, targetDetail: e.target.value})}
                           >
                              <option value="">请选择职位...</option>
                              <option value="经理">经理</option>
                              <option value="高级工程师">高级工程师</option>
                              <option value="实习生">实习生</option>
                           </select>
                        )}

                        <label className="flex items-center cursor-pointer">
                           <input 
                              type="radio" 
                              name="targetType" 
                              checked={publishForm.targetType === 'specific'}
                              onChange={() => setPublishForm({...publishForm, targetType: 'specific'})}
                              className="text-blue-600 focus:ring-blue-500 mr-2"
                           />
                           <span className="text-sm text-gray-700">指定员工</span>
                        </label>
                        {publishForm.targetType === 'specific' && (
                           <input 
                              type="text" 
                              placeholder="输入员工姓名或工号 (逗号分隔)" 
                              className="w-full mt-2 ml-6 border border-gray-300 rounded px-3 py-1.5 text-sm"
                              value={publishForm.targetDetail}
                              onChange={(e) => setPublishForm({...publishForm, targetDetail: e.target.value})}
                           />
                        )}
                     </div>
                  </div>

                  <div className="border-t border-gray-100 my-4"></div>

                  {/* Schedule */}
                  <div>
                     <label className="block text-sm font-bold text-gray-800 mb-3 flex items-center">
                        <Clock size={16} className="mr-2 text-blue-600"/> 发布时间
                     </label>
                     <div className="flex items-center space-x-6">
                        <label className="flex items-center cursor-pointer">
                           <input 
                              type="radio" 
                              name="scheduleType" 
                              checked={publishForm.scheduleType === 'now'}
                              onChange={() => setPublishForm({...publishForm, scheduleType: 'now'})}
                              className="text-blue-600 focus:ring-blue-500 mr-2"
                           />
                           <span className="text-sm text-gray-700">立即发布</span>
                        </label>
                        <label className="flex items-center cursor-pointer">
                           <input 
                              type="radio" 
                              name="scheduleType" 
                              checked={publishForm.scheduleType === 'scheduled'}
                              onChange={() => setPublishForm({...publishForm, scheduleType: 'scheduled'})}
                              className="text-blue-600 focus:ring-blue-500 mr-2"
                           />
                           <span className="text-sm text-gray-700">定时发布</span>
                        </label>
                     </div>
                     {publishForm.scheduleType === 'scheduled' && (
                        <div className="mt-3 flex space-x-2 ml-1">
                           <input 
                              type="date" 
                              className="border border-gray-300 rounded px-3 py-1.5 text-sm"
                              value={publishForm.scheduleDate}
                              onChange={(e) => setPublishForm({...publishForm, scheduleDate: e.target.value})}
                           />
                           <input 
                              type="time" 
                              className="border border-gray-300 rounded px-3 py-1.5 text-sm"
                              value={publishForm.scheduleTime}
                              onChange={(e) => setPublishForm({...publishForm, scheduleTime: e.target.value})}
                           />
                        </div>
                     )}
                  </div>
               </div>

               <div className="p-5 border-t border-gray-100 flex justify-end space-x-3 bg-gray-50 rounded-b-lg">
                  <button onClick={() => setIsPublishModalOpen(false)} className="px-5 py-2 border border-gray-300 rounded text-gray-700 bg-white hover:bg-gray-50">取消</button>
                  <button onClick={handleConfirmPublish} className="px-5 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 shadow-md flex items-center">
                     <Send size={16} className="mr-2" /> 确认发布
                  </button>
               </div>
            </div>
         </div>
      )}
    </div>
  );
};
