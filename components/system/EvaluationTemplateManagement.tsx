
import React, { useState } from 'react';
import { 
  ClipboardCheck, 
  Plus, 
  Search, 
  Edit3, 
  Trash2, 
  Settings, 
  ChevronRight, 
  Layout,
  Layers,
  Save,
  X
} from 'lucide-react';
import { EvaluationTemplate, EvalField } from '../../types';

const MOCK_TEMPLATES: EvaluationTemplate[] = [
  { 
    id: 'T1', 
    name: '通用社招模版', 
    positionCategory: 'General', 
    description: '适用于大部分非技术岗位的通用面试评价', 
    fields: [], 
    updatedAt: '2024-03-01' 
  },
  { 
    id: 'T2', 
    name: '技术序列评价表', 
    positionCategory: 'Technical', 
    description: '侧重代码能力、架构思维和工程化实践', 
    fields: [], 
    updatedAt: '2024-03-15' 
  },
  { 
    id: 'T3', 
    name: '中高级管理岗模版', 
    positionCategory: 'Management', 
    description: '侧重领导力、战略思维、组织协调能力', 
    fields: [], 
    updatedAt: '2024-02-20' 
  },
];

export const EvaluationTemplateManagement: React.FC = () => {
  const [templates, setTemplates] = useState<EvaluationTemplate[]>(MOCK_TEMPLATES);
  const [isEditing, setIsEditing] = useState(false);
  const [currentTemp, setCurrentTemp] = useState<Partial<EvaluationTemplate>>({});

  const handleEdit = (temp?: EvaluationTemplate) => {
    setCurrentTemp(temp || { name: '', positionCategory: 'General', description: '' });
    setIsEditing(true);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="bg-white p-4 rounded-lg border border-gray-100 shadow-sm flex justify-between items-center">
         <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16}/>
            <input type="text" placeholder="搜索模版名称..." className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"/>
         </div>
         <button 
           onClick={() => handleEdit()}
           className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm flex items-center hover:bg-blue-700 shadow-sm"
         >
           <Plus size={18} className="mr-2"/> 新建模版
         </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map(t => (
          <div key={t.id} className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-all group">
             <div className="p-5 border-b border-gray-100">
                <div className="flex justify-between items-start mb-3">
                   <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                      <Layout size={20} />
                   </div>
                   <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => handleEdit(t)} className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-gray-50 rounded"><Edit3 size={16}/></button>
                      <button className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-gray-50 rounded"><Trash2 size={16}/></button>
                   </div>
                </div>
                <h3 className="font-bold text-gray-800 text-lg">{t.name}</h3>
                <span className="inline-block mt-1 px-2 py-0.5 bg-gray-100 text-gray-500 text-[10px] font-bold rounded uppercase">{t.positionCategory}</span>
             </div>
             <div className="p-5 bg-gray-50/50 flex-1">
                <p className="text-sm text-gray-500 leading-relaxed min-h-[40px] line-clamp-2">{t.description}</p>
             </div>
             <div className="p-4 border-t border-gray-100 flex justify-between items-center text-xs text-gray-400">
                <span>更新于 {t.updatedAt}</span>
                <button className="text-blue-600 font-medium hover:underline flex items-center">
                  配置字段 <ChevronRight size={14}/>
                </button>
             </div>
          </div>
        ))}
      </div>

      {isEditing && (
         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-lg flex flex-col">
               <div className="p-5 border-b border-gray-100 flex justify-between items-center">
                  <h3 className="font-bold text-gray-800">模版基础信息</h3>
                  <button onClick={() => setIsEditing(false)}><X size={20} className="text-gray-400"/></button>
               </div>
               <div className="p-6 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">模版名称</label>
                    <input type="text" value={currentTemp.name} onChange={e => setCurrentTemp({...currentTemp, name: e.target.value})} className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"/>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">职位类别</label>
                    <select value={currentTemp.positionCategory} onChange={e => setCurrentTemp({...currentTemp, positionCategory: e.target.value})} className="w-full border border-gray-300 rounded px-3 py-2 text-sm bg-white">
                       <option value="General">通用 (General)</option>
                       <option value="Technical">技术类 (Technical)</option>
                       <option value="Management">管理类 (Management)</option>
                       <option value="Function">职能类 (Function)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">描述说明</label>
                    <textarea value={currentTemp.description} onChange={e => setCurrentTemp({...currentTemp, description: e.target.value})} className="w-full border border-gray-300 rounded px-3 py-2 text-sm h-24 focus:ring-2 focus:ring-blue-500 outline-none" placeholder="描述该评价表模版的适用场景..."/>
                  </div>
               </div>
               <div className="p-4 border-t border-gray-100 flex justify-end space-x-3 bg-gray-50 rounded-b-lg">
                  <button onClick={() => setIsEditing(false)} className="px-4 py-2 border border-gray-300 rounded text-sm text-gray-700 bg-white">取消</button>
                  <button className="px-6 py-2 bg-blue-600 text-white rounded text-sm font-bold flex items-center">
                    <Save size={16} className="mr-2"/> 保存并下一步
                  </button>
               </div>
            </div>
         </div>
      )}
    </div>
  );
};
