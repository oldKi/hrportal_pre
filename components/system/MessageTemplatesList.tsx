import React, { useState } from 'react';
import { Plus, Search, Edit, Trash2, X, CheckCircle, XCircle } from 'lucide-react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';

interface Template {
  id: string;
  code: string;
  name: string;
  description: string;
  subject?: string;
  content: string;
  createTime: string;
}

interface MessageTemplatesListProps {
  type: 'email';
}

export const MessageTemplatesList: React.FC<MessageTemplatesListProps> = ({ type }) => {
  const [templates, setTemplates] = useState<Template[]>([
    {
      id: '1',
      code: 'EMAIL_001',
      name: '入职欢迎邮件',
      description: '发送给新员工的欢迎邮件',
      subject: '欢迎加入我们，{{name}}！',
      content: '亲爱的员工，欢迎加入...',
      createTime: '2024-03-20 10:00:00'
    },
    {
      id: '2',
      code: 'EMAIL_002',
      name: '绩效考核通知邮件',
      description: '季度绩效考核启动通知',
      subject: '关于开始Q3绩效考核的工作通知',
      content: '本季度绩效考核已开始...',
      createTime: '2024-03-15 14:30:00'
    }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTemplate, setCurrentTemplate] = useState<Partial<Template>>({});

  const handleEdit = (template?: Template) => {
    if (template) {
      setCurrentTemplate(template);
    } else {
      setCurrentTemplate({
        code: '',
        name: '',
        description: '',
        subject: '',
        content: ''
      });
    }
    setIsModalOpen(true);
  };

  const handleSave = () => {
    if (currentTemplate.id) {
      setTemplates(prev => prev.map(t => t.id === currentTemplate.id ? { ...t, ...currentTemplate } as Template : t));
    } else {
      const newTemplate: Template = {
        id: Date.now().toString(),
        createTime: new Date().toLocaleString(),
        ...(currentTemplate as Template)
      };
      setTemplates([newTemplate, ...templates]);
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('确定删除该模版吗？')) {
      setTemplates(prev => prev.filter(t => t.id !== id));
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            邮件模版
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            管理系统中的邮件消息模版
          </p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
        <div className="flex justify-between items-center mb-4">
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            <input 
              type="text" 
              placeholder="搜索模版..." 
              className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button 
            onClick={() => handleEdit()}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center text-sm shadow-sm"
          >
            <Plus size={16} className="mr-2" /> 新建模版
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-gray-50 text-gray-500 font-medium border-b border-gray-200">
              <tr>
                <th className="p-4">编码</th>
                <th className="p-4">模板名称</th>
                <th className="p-4">描述</th>
                <th className="p-4">创建时间</th>
                <th className="p-4 text-right">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {templates.map(t => (
                <tr key={t.id} className="hover:bg-gray-50">
                  <td className="p-4 font-medium text-gray-800">{t.code}</td>
                  <td className="p-4">{t.name}</td>
                  <td className="p-4 text-gray-500 truncate max-w-xs">{t.description}</td>
                  <td className="p-4 text-gray-500">{t.createTime}</td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <button 
                        onClick={() => handleEdit(t)}
                        className="p-1.5 text-gray-400 hover:text-blue-600 rounded transition-colors" 
                        title="修改"
                      >
                        <Edit size={16} />
                      </button>
                      <button 
                        onClick={() => handleDelete(t.id)}
                        className="p-1.5 text-gray-400 hover:text-red-600 rounded transition-colors" 
                        title="删除"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl animate-scale-up flex flex-col max-h-[90vh]">
            <div className="p-5 border-b border-gray-100 flex justify-between items-center">
              <h3 className="font-bold text-gray-800 text-lg">{currentTemplate.id ? '修改模版' : '新建模版'}</h3>
              <button onClick={() => setIsModalOpen(false)}><X size={20} className="text-gray-400 hover:text-gray-600"/></button>
            </div>
            <div className="p-6 space-y-5 overflow-y-auto">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">编码</label>
                <input 
                  type="text" 
                  value={currentTemplate.code || ''}
                  onChange={(e) => setCurrentTemplate({...currentTemplate, code: e.target.value})}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="请输入编码..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">模板名称</label>
                <input 
                  type="text" 
                  value={currentTemplate.name || ''}
                  onChange={(e) => setCurrentTemplate({...currentTemplate, name: e.target.value})}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="请输入模板名称..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">描述</label>
                <input 
                  type="text" 
                  value={currentTemplate.description || ''}
                  onChange={(e) => setCurrentTemplate({...currentTemplate, description: e.target.value})}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="请输入模板描述..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">邮件标题</label>
                <input 
                  type="text" 
                  value={currentTemplate.subject || ''}
                  onChange={(e) => setCurrentTemplate({...currentTemplate, subject: e.target.value})}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="请输入邮件标题，支持 {{参数名}} 格式的自定义参数..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">邮件内容</label>
                <div className="border border-gray-300 rounded-md overflow-hidden">
                  <ReactQuill 
                    theme="snow" 
                    value={currentTemplate.content || ''} 
                    onChange={(content) => setCurrentTemplate({...currentTemplate, content})}
                    className="h-48 mb-10"
                    placeholder="请输入邮件内容，支持 {{参数名}} 格式的占位符..."
                  />
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  提示：您可以使用双花括号 <code>{`{{参数名}}`}</code> 来定义自定义参数（例如：<code>{`{{name}}`}</code>），发送时将通过 JSON 数据自动替换。
                </p>
              </div>
            </div>
            <div className="p-5 border-t border-gray-100 flex justify-end space-x-3 bg-gray-50 rounded-b-lg">
              <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 border border-gray-300 rounded text-gray-700 bg-white hover:bg-gray-50">取消</button>
              <button onClick={handleSave} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 shadow-sm">保存</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
