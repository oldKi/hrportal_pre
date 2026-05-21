
import React, { useState } from 'react';
import { 
  Monitor, 
  CheckCircle, 
  Eye, 
  EyeOff, 
  GripVertical, 
  Layout, 
  User, 
  CheckSquare, 
  LayoutGrid, 
  Clock, 
  BookOpen, 
  TrendingUp,
  Save,
  RotateCcw
} from 'lucide-react';

interface StageItem {
  id: string;
  title: string;
  icon: React.ReactNode;
  color: string;
  description: string;
  visible: boolean;
}

const INITIAL_STAGES: StageItem[] = [
  { id: 'profile', title: '个人主页', icon: <User size={18} />, color: 'bg-blue-500', description: '员工个人档案、基本信息及标签管理', visible: true },
  { id: 'todo', title: '待办中心', icon: <CheckSquare size={18} />, color: 'bg-indigo-600', description: '集成审批、流程、通知的一站式处理中心', visible: true },
  { id: 'launchpad', title: '应用启动板', icon: <LayoutGrid size={18} />, color: 'bg-purple-600', description: '快速访问 SuccessFactors 等核心系统的快捷方式', visible: true },
  { id: 'etms', title: '工时统计', icon: <Clock size={18} />, color: 'bg-orange-500', description: '查看每周工时明细及年假余额', visible: true },
  { id: 'training', title: '学习培训', icon: <BookOpen size={18} />, color: 'bg-emerald-600', description: '企业课程进度监控与在线学习入口', visible: true },
  { id: 'jobs', title: '内部机会', icon: <TrendingUp size={18} />, color: 'bg-rose-500', description: '推荐内部转岗岗位及投递进度查询', visible: true },
];

export const MyWorkspaceConfig: React.FC = () => {
    const [stages, setStages] = useState<StageItem[]>(INITIAL_STAGES);

    const toggleVisibility = (id: string) => {
        setStages(prev => prev.map(s => s.id === id ? { ...s, visible: !s.visible } : s));
    };

    const handleSave = () => {
        alert('Stage 空间配置已成功同步到服务器，重新进入 Stage 智能空间后生效。');
    };

    const handleReset = () => {
        if (window.confirm('确定要恢复默认布局配置吗？')) {
            setStages(INITIAL_STAGES);
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
            {/* Header */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex justify-between items-center">
                <div className="flex items-center">
                    <div className="p-3 bg-blue-50 text-blue-600 rounded-xl mr-5">
                        <Monitor size={28} />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800">Stage 空间内容管理</h2>
                        <p className="text-sm text-gray-500 mt-1">自定义 Stage 智能空间左侧 Shelf 显示的窗口内容及优先级</p>
                    </div>
                </div>
            </div>

            {/* List */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-4 bg-gray-50/50 border-b border-gray-100 flex justify-between items-center px-6">
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">窗口卡片配置</span>
                    <span className="text-xs text-gray-400">拖拽可调整排序 (模拟)</span>
                </div>
                
                <div className="divide-y divide-gray-50">
                    {stages.map((item) => (
                        <div 
                            key={item.id} 
                            className={`p-6 flex items-center justify-between group transition-all ${!item.visible ? 'bg-gray-50/50 grayscale opacity-60' : 'bg-white hover:bg-blue-50/10'}`}
                        >
                            <div className="flex items-center gap-5">
                                <div className="p-2 cursor-move text-gray-300 group-hover:text-gray-400 transition-colors">
                                    <GripVertical size={20} />
                                </div>
                                <div className={`w-12 h-12 rounded-xl ${item.color} text-white flex items-center justify-center shadow-sm shrink-0`}>
                                    {item.icon}
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-800 mb-0.5">{item.title}</h3>
                                    <p className="text-xs text-gray-400 font-medium">{item.description}</p>
                                </div>
                            </div>
                            
                            <button 
                                onClick={() => toggleVisibility(item.id)}
                                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all border ${
                                    item.visible 
                                        ? 'bg-blue-50 text-blue-600 border-blue-100 hover:bg-blue-100' 
                                        : 'bg-white text-gray-400 border-gray-200 hover:bg-gray-50'
                                }`}
                            >
                                {item.visible ? <><Eye size={14}/> 已开启</> : <><EyeOff size={14}/> 已关闭</>}
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Footer */}
            <div className="flex justify-end gap-3 pt-4">
                <button 
                    onClick={handleReset}
                    className="px-6 py-2.5 bg-white border border-gray-200 text-gray-500 rounded-xl font-bold text-sm hover:bg-gray-50 flex items-center transition-all"
                >
                    <RotateCcw size={16} className="mr-2" /> 恢复默认
                </button>
                <button 
                    onClick={handleSave}
                    className="px-10 py-2.5 bg-blue-600 text-white rounded-xl font-bold text-sm hover:bg-blue-700 shadow-lg shadow-blue-100 flex items-center transition-all active:scale-95"
                >
                    <Save size={16} className="mr-2" /> 保存配置
                </button>
            </div>
        </div>
    );
};
