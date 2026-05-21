
import React, { useState } from 'react';
import { 
  ChevronRight, 
  ChevronDown, 
  Search, 
  X, 
  User, 
  FileText, 
  Filter, 
  Eye, 
  MoreHorizontal,
  BarChart2,
  Settings,
  LayoutGrid
} from 'lucide-react';

interface PipelineStage {
  id: string;
  label: string;
  count: number;
  active?: boolean;
  hasStar?: boolean;
}

interface CandidateData {
  id: string;
  name: string;
  status: string;
  referrer: string;
  type: string;
  score: number;
  source: string;
  phone: string;
  lastUpdated: string;
}

export const RecruitmentQuery: React.FC = () => {
  const [activeTab, setActiveTab] = useState('候选人');
  
  const pipelineStages: PipelineStage[] = [
    { id: 'forwarded', label: '已转发', count: 3 },
    { id: 'invited', label: '已发送申请邀请', count: 0 },
    { id: 'new', label: '新申请人', count: 1 },
    { id: 'screen1', label: '简历初筛', count: 1 },
    { id: 'screen2', label: '简历复筛', count: 1 },
    { id: 'interview', label: '面试', count: 3, active: true },
    { id: 'background', label: '背景核查', count: 1 },
    { id: 'test', label: '综合能力测试', count: 1 },
    { id: 'offer', label: 'Offer', count: 1 },
    { id: 'pre-hire', label: '准备录用', count: 1, hasStar: true },
    { id: 'hired', label: '已录用', count: 0 },
    { id: 'onboarded', label: '入职', count: 2 },
    { id: 'rejected', label: '不成功', count: 0 },
    { id: 'cancelled', label: '已自动取消资格', count: 0 },
    { id: 'closed', label: '申请已关闭', count: 0 },
  ];

  const candidateList: CandidateData[] = [
    { id: '1', name: 'FonchillasRickey', status: '第二轮面试', referrer: '--', type: '外部', score: 33.0, source: '职位公告板: RCM Redirect', phone: '213.345.5674', lastUpdated: '2019年 12月 21日' },
    { id: '2', name: 'SchwartzKasey', status: '第一轮面试', referrer: '--', type: '外部', score: 33.0, source: '职位公告板: RCM Redirect', phone: '555.555.5555', lastUpdated: '2019年 12月 21日' },
    { id: '3', name: 'WatsonGus', status: '已完成', referrer: '--', type: '外部', score: 33.0, source: '职位公告板: RCM Redirect', phone: '555.555.5555', lastUpdated: '2019年 12月 21日' },
  ];

  return (
    <div className="bg-white min-h-screen text-[#333] font-sans">
      {/* 1. Header Area */}
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-2">
            <h1 className="text-xl font-bold text-gray-800">Project Manager <span className="text-gray-400 font-normal">(2700)</span></h1>
          </div>
          <div className="flex items-center space-x-6">
            <div className="flex space-x-1">
              <button className="p-1.5 hover:bg-gray-100 rounded text-gray-400"><LayoutGrid size={18}/></button>
              <button className="p-1.5 hover:bg-gray-100 rounded text-gray-400"><BarChart2 size={18}/></button>
              <button className="p-1.5 hover:bg-gray-100 rounded text-gray-400"><Settings size={18}/></button>
            </div>
            <div className="flex flex-col items-end text-xs text-gray-500">
              <div className="flex items-center space-x-4">
                <span>雇员经理: <span className="font-bold text-gray-800">BakerJada</span></span>
                <span>时间: <span className="bg-yellow-100 text-yellow-800 px-1 rounded font-bold">52d</span></span>
              </div>
            </div>
          </div>
        </div>

        {/* 2. Top Nav Tabs */}
        <div className="flex items-center space-x-6 overflow-x-auto no-scrollbar">
           {['职位需求详情', '职位档案', '候选人', '自职位发布 (1)', '候选人搜索', '查看候选人评分 (4)', '活动 URL 生成器'].map(tab => (
             <button 
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-2 px-1 text-sm font-medium whitespace-nowrap transition-all relative ${
                  activeTab === tab ? 'text-blue-600 font-bold border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-800'
                }`}
             >
                {tab}
             </button>
           ))}
        </div>
      </div>

      {/* 3. Pipeline Section */}
      <div className="bg-[#fcfcfc] border-b border-gray-200">
        <div className="px-6 py-2 flex items-center space-x-4 text-xs">
          <button className="flex items-center text-gray-500 font-bold group">
            <ChevronDown size={14} className="mr-1 group-hover:text-gray-800" /> 人才管道
          </button>
          <span className="text-gray-800 font-bold border-b-2 border-gray-800 pb-0.5">查看活动的候选人 15</span>
          <span className="text-gray-500 font-medium cursor-pointer hover:text-gray-800">查看所有候选人 (15)</span>
        </div>
        
        <div className="flex overflow-x-auto no-scrollbar border-t border-gray-100 shadow-inner">
          {pipelineStages.map((stage, idx) => (
            <div 
              key={stage.id}
              className={`flex flex-col items-center justify-center min-w-[100px] py-3 px-2 border-r border-gray-100 transition-all cursor-pointer relative ${
                stage.active ? 'bg-blue-50/50' : 'hover:bg-white'
              }`}
            >
              <div className="relative">
                <span className={`text-2xl font-bold ${stage.active ? 'text-blue-600' : 'text-gray-700'}`}>{stage.count}</span>
                {stage.hasStar && <span className="absolute -top-1 -right-2 text-red-500 text-xs font-bold">*</span>}
              </div>
              <span className={`text-[11px] mt-1 text-center whitespace-nowrap leading-tight ${stage.active ? 'text-blue-600 font-bold' : 'text-gray-500'}`}>
                {stage.label}
              </span>
              {stage.active && (
                <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-blue-600 rounded-t-full"></div>
              )}
            </div>
          ))}
          <div className="flex items-center px-2 bg-gray-50/50 cursor-pointer hover:bg-gray-100">
             <ChevronRight size={18} className="text-gray-400" />
          </div>
        </div>
      </div>

      {/* 4. Toolbar */}
      <div className="px-6 py-3 bg-[#f8f9fb] border-b border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center space-x-4">
           <span className="text-xs text-gray-500">已选定 0 名</span>
           <div className="flex space-x-1">
              <button className="text-blue-600 text-xs font-bold flex items-center hover:bg-white px-2 py-1.5 rounded border border-transparent hover:border-gray-200 transition-all">
                操作 <ChevronDown size={14} className="ml-1" />
              </button>
              <button className="text-gray-600 text-xs font-bold flex items-center hover:bg-white px-2 py-1.5 rounded border border-transparent hover:border-gray-200 transition-all">
                <Eye size={14} className="mr-1.5 text-gray-400" /> 显示选项
              </button>
              <button className="text-gray-600 text-xs font-bold flex items-center hover:bg-white px-2 py-1.5 rounded border border-transparent hover:border-gray-200 transition-all">
                <Filter size={14} className="mr-1.5 text-gray-400" /> 过滤选项
              </button>
           </div>
        </div>

        <div className="flex items-center space-x-3">
           <span className="text-xs text-gray-500 font-medium">突出显示候选人</span>
           <div className="relative">
              <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input 
                type="text" 
                placeholder="输入申请人姓名"
                className="pl-8 pr-8 py-1.5 border border-gray-300 rounded text-xs focus:ring-1 focus:ring-blue-500 outline-none bg-white w-48 shadow-inner"
              />
              <X size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-300 cursor-pointer hover:text-gray-500" />
           </div>
        </div>
      </div>

      {/* 5. Main Content Area */}
      <div className="overflow-x-auto px-6 py-4 bg-[#f4f7fa]">
        <div className="bg-white rounded border border-gray-200 shadow-sm overflow-hidden">
          <div className="p-3 border-b border-gray-100 flex justify-between items-center bg-gray-50/30">
            <span className="text-xs text-gray-500 font-medium">候选人：查看 多个申请状态 (3)</span>
          </div>
          
          <table className="w-full text-left text-xs whitespace-nowrap">
            <thead className="bg-[#fcfcfc] text-gray-600 font-bold border-b border-gray-200">
              <tr>
                <th className="p-3 w-8"><input type="checkbox" className="rounded border-gray-300" /></th>
                <th className="p-3">名称</th>
                <th className="p-3">新</th>
                <th className="p-3">状态</th>
                <th className="p-3">转发者</th>
                <th className="p-3">候选人类型</th>
                <th className="p-3">评分</th>
                <th className="p-3">来源</th>
                <th className="p-3">候选人来源</th>
                <th className="p-3">电话号码</th>
                <th className="p-3">上次更新的</th>
                <th className="p-3">面试结果</th>
                <th className="p-3">入职初始化状态</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {candidateList.map(candidate => (
                <tr key={candidate.id} className="hover:bg-blue-50 transition-colors group">
                  <td className="p-3"><input type="checkbox" className="rounded border-gray-300" /></td>
                  <td className="p-3">
                    <div className="flex items-center">
                       <MoreHorizontal size={14} className="text-gray-300 mr-2 cursor-pointer hover:text-gray-600" />
                       <User size={14} className="text-blue-500 mr-1.5" />
                       <span className="text-blue-600 font-bold hover:underline cursor-pointer">{candidate.name}</span>
                       <FileText size={14} className="text-orange-400 ml-1.5" />
                    </div>
                  </td>
                  <td className="p-3"></td>
                  <td className="p-3 text-gray-700 font-medium">{candidate.status}</td>
                  <td className="p-3 text-gray-500">{candidate.referrer}</td>
                  <td className="p-3 text-gray-700">{candidate.type}</td>
                  <td className="p-3 text-gray-700 font-mono">{candidate.score.toFixed(1)}</td>
                  <td className="p-3 text-gray-600 max-w-[200px] truncate" title={candidate.source}>{candidate.source}</td>
                  <td className="p-3 text-gray-600 max-w-[200px] truncate" title={candidate.source}>{candidate.source}</td>
                  <td className="p-3 text-gray-600 font-mono">{candidate.phone}</td>
                  <td className="p-3 text-gray-500">{candidate.lastUpdated}</td>
                  <td className="p-3"></td>
                  <td className="p-3"></td>
                </tr>
              ))}
              {/* Fill empty rows to match look */}
              {[...Array(4)].map((_, i) => (
                <tr key={`empty-${i}`} className="opacity-0 h-10 pointer-events-none">
                  <td colSpan={13}></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* 6. Simple Footer / Pagination Info */}
        <div className="mt-4 flex justify-between items-center text-[10px] text-gray-400 uppercase font-bold tracking-widest px-1">
           <div className="flex items-center gap-6">
              <span>每页显示: 10</span>
              <span>当前 1-3 / 总计 3 名候选人</span>
           </div>
           <div className="flex items-center gap-3">
              <span className="text-gray-300 hover:text-blue-600 cursor-pointer transition-colors">上一页</span>
              <div className="flex gap-1">
                 <span className="bg-blue-600 text-white px-1.5 rounded">1</span>
              </div>
              <span className="text-gray-300 hover:text-blue-600 cursor-pointer transition-colors">下一页</span>
           </div>
        </div>
      </div>
    </div>
  );
};
