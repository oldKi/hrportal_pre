
import React, { useState } from 'react';
import { 
  Activity, Grid, MoreVertical, Eye, EyeOff, RefreshCw, X, User, Briefcase, TrendingUp, 
  Calendar, Zap, Smile, PieChart, List, FileText, Monitor, Coffee, ClipboardList,
  Plus, Save
} from 'lucide-react';

interface WidgetConfig {
  id: string;
  title: string;
  type: 'banner' | 'quick-action' | 'chart-widget' | 'list-widget';
  visible: boolean;
  gridSpan?: number;
  color?: string; // Tailwind class
  icon?: string;
  subTitle?: string;
  category?: string;
}

interface RoleConfig {
  banner: WidgetConfig;
  quickActions: WidgetConfig[];
  widgets: WidgetConfig[];
}

const WIDGET_LIBRARY: WidgetConfig[] = [
  { id: 'lib_1', title: '团队日历', type: 'chart-widget', visible: true, subTitle: '查看团队成员假期', icon: 'Calendar', category: '效率' },
  { id: 'lib_2', title: '快速审批', type: 'quick-action', visible: true, color: 'bg-indigo-500', icon: 'Zap', category: '办公' },
  { id: 'lib_3', title: '员工满意度', type: 'chart-widget', visible: true, subTitle: '季度调研结果', icon: 'Smile', category: '人事' },
  { id: 'lib_4', title: '部门HC使用率', type: 'chart-widget', visible: true, subTitle: '编制情况', icon: 'PieChart', category: '人事' },
  { id: 'lib_5', title: '内推排行榜', type: 'list-widget', visible: true, subTitle: '本月Top 5', icon: 'List', category: '招聘' },
  { id: 'lib_6', title: '最新政策公告', type: 'list-widget', visible: true, subTitle: '公司新闻', icon: 'FileText', category: '行政' },
  { id: 'lib_7', title: 'IT服务台', type: 'quick-action', visible: true, color: 'bg-gray-600', icon: 'Monitor', category: 'IT' },
  { id: 'lib_8', title: '食堂菜单', type: 'quick-action', visible: true, color: 'bg-yellow-500', icon: 'Coffee', category: '生活' },
];

const INITIAL_CONFIG: Record<string, RoleConfig> = {
  employee: {
    banner: { id: 'eb1', title: '我的年假档案', type: 'banner', visible: true, color: 'from-blue-500 to-blue-600', subTitle: '2024年法定年假15天' },
    quickActions: [
      { id: 'eqa1', title: '请假申请', type: 'quick-action', visible: true, color: 'bg-blue-500' },
      { id: 'eqa2', title: '我的薪资', type: 'quick-action', visible: true, color: 'bg-teal-500' },
      { id: 'eqa3', title: '学习培训', type: 'quick-action', visible: true, color: 'bg-orange-400' },
      { id: 'eqa4', title: '工作证明', type: 'quick-action', visible: true, color: 'bg-teal-400' },
      { id: 'eqa5', title: '个人信息', type: 'quick-action', visible: true, color: 'bg-indigo-500' },
      { id: 'eqa6', title: '内部竞聘', type: 'quick-action', visible: true, color: 'bg-blue-500' },
    ],
    widgets: [
      { id: 'ew1', title: '个人培训技能进度', type: 'chart-widget', visible: true },
      { id: 'ew2', title: '我的课程', type: 'list-widget', visible: true },
      { id: 'ew3', title: '公告', type: 'list-widget', visible: true },
    ]
  },
  manager: {
    banner: { id: 'mb1', title: '团队概览', type: 'banner', visible: true, color: 'from-indigo-500 to-purple-600', subTitle: '研发中心 - 后端组' },
    quickActions: [
      { id: 'mqa1', title: '审批中心', type: 'quick-action', visible: true, color: 'bg-indigo-500' },
      { id: 'mqa2', title: '招聘需求', type: 'quick-action', visible: true, color: 'bg-blue-500' },
      { id: 'mqa3', title: '团队绩效', type: 'quick-action', visible: true, color: 'bg-purple-500' },
      { id: 'mqa4', title: '考勤异常', type: 'quick-action', visible: true, color: 'bg-orange-500' },
      { id: 'mqa5', title: '人才盘点', type: 'quick-action', visible: true, color: 'bg-teal-500' },
      { id: 'mqa6', title: '部门预算', type: 'quick-action', visible: true, color: 'bg-gray-600' },
    ],
    widgets: [
      { id: 'mw1', title: '待办事项', type: 'list-widget', visible: true },
      { id: 'mw2', title: '部门招聘进度', type: 'chart-widget', visible: true },
      { id: 'mw3', title: '团队培训覆盖率', type: 'chart-widget', visible: true },
    ]
  },
  hrbp: {
    banner: { id: 'hb1', title: '组织效能仪表盘', type: 'banner', visible: true, color: 'from-orange-500 to-red-500', subTitle: '营销中心 (BU)' },
    quickActions: [
      { id: 'hqa1', title: '编制管理', type: 'quick-action', visible: true, color: 'bg-red-500' },
      { id: 'hqa2', title: '核心招聘', type: 'quick-action', visible: true, color: 'bg-orange-500' },
      { id: 'hqa3', title: '人才盘点', type: 'quick-action', visible: true, color: 'bg-purple-500' },
      { id: 'hqa4', title: '绩效校准', type: 'quick-action', visible: true, color: 'bg-blue-500' },
      { id: 'hqa5', title: '继任计划', type: 'quick-action', visible: true, color: 'bg-indigo-500' },
      { id: 'hqa6', title: '组织诊断', type: 'quick-action', visible: true, color: 'bg-teal-500' },
    ],
    widgets: [
      { id: 'hw1', title: '核心岗位招聘漏斗', type: 'chart-widget', visible: true },
      { id: 'hw2', title: '核心人才流失预警', type: 'list-widget', visible: true },
      { id: 'hw3', title: '绩效分布 (Bell Curve)', type: 'chart-widget', visible: true },
    ]
  }
};

export const ViewConfig: React.FC = () => {
  const [activeRole, setActiveRole] = useState('manager');
  const [config, setConfig] = useState(INITIAL_CONFIG);
  const [modalOpen, setModalOpen] = useState(false);
  const [replacingItem, setReplacingItem] = useState<{role: string, section: 'quickActions' | 'widgets', index: number} | null>(null);

  const currentRoleConfig = config[activeRole];

  const handleToggleVisibility = (section: 'banner' | 'quickActions' | 'widgets', id: string) => {
    const newConfig = { ...config };
    if (section === 'banner') {
      newConfig[activeRole].banner.visible = !newConfig[activeRole].banner.visible;
    } else {
      const items = newConfig[activeRole][section] as WidgetConfig[];
      const itemIndex = items.findIndex(i => i.id === id);
      if (itemIndex > -1) {
        items[itemIndex].visible = !items[itemIndex].visible;
      }
    }
    setConfig(newConfig);
  };

  const handleReplaceClick = (section: 'quickActions' | 'widgets', index: number) => {
    setReplacingItem({ role: activeRole, section, index });
    setModalOpen(true);
  };

  const confirmReplace = (newItem: WidgetConfig) => {
    if (!replacingItem) return;
    
    const newConfig = { ...config };
    const { role, section, index } = replacingItem;
    
    // Assign new properties but keep id to avoid key issues if possible, or gen new ID
    const targetArray = newConfig[role][section] as WidgetConfig[];
    
    // Construct new item based on library selection + existing context
    const replacement: WidgetConfig = {
      ...newItem,
      id: `${newItem.id}_${Date.now()}`, // Ensure unique
      visible: true,
      color: targetArray[index].color || newItem.color || 'bg-blue-500' // Preserve layout color if needed or use new
    };

    targetArray[index] = replacement;
    setConfig(newConfig);
    setModalOpen(false);
    setReplacingItem(null);
  };

  // Helper Wrapper for Configurable Items
  const ConfigItem = ({ item, section, index, children, className = '' }: any) => {
    const [showMenu, setShowMenu] = useState(false);
    
    return (
      <div className={`relative group transition-all duration-200 ${!item.visible ? 'opacity-60 grayscale' : ''} ${className}`}>
         {/* Visual Indicator for Editing - Dotted Border on Hover/Menu Open */}
         <div className={`absolute -inset-1 border-2 border-dashed border-transparent rounded-xl pointer-events-none transition-colors z-0 ${showMenu ? 'border-blue-400 bg-blue-50/10' : 'group-hover:border-blue-300'}`}></div>
         
         {/* Content */}
         <div className="relative z-10 h-full">
            {children}
            
            {/* Hidden Overlay */}
            {!item.visible && (
              <div className="absolute inset-0 bg-gray-100/50 flex items-center justify-center rounded-xl backdrop-blur-[1px]">
                  <span className="bg-white px-2 py-1 rounded text-xs border shadow-sm flex items-center text-gray-500">
                    <EyeOff size={12} className="mr-1"/> 已隐藏
                  </span>
              </div>
            )}
         </div>

         {/* Action Menu Trigger */}
         <div className={`absolute -top-2 -right-2 z-20 transition-all duration-200 ${showMenu ? 'opacity-100 scale-100' : 'opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100'}`}>
            <div className="relative">
                <button 
                  onClick={(e) => { e.stopPropagation(); setShowMenu(!showMenu); }}
                  className={`p-1.5 rounded-full shadow-md border border-gray-200 hover:text-blue-600 transition-colors ${showMenu ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-500'}`}
                >
                  <MoreVertical size={14} />
                </button>

                {showMenu && (
                  <>
                    <div className="fixed inset-0 z-10 cursor-default" onClick={() => setShowMenu(false)}></div>
                    <div className="absolute right-0 top-full mt-1 w-32 bg-white rounded-lg shadow-xl border border-gray-100 py-1 text-xs z-30 overflow-hidden animate-scale-up origin-top-right">
                        <button 
                          onClick={() => { handleToggleVisibility(section, item.id); setShowMenu(false); }}
                          className="w-full text-left px-3 py-2.5 hover:bg-gray-50 flex items-center text-gray-700"
                        >
                          {item.visible ? <EyeOff size={14} className="mr-2 text-gray-400"/> : <Eye size={14} className="mr-2 text-blue-500"/>}
                          {item.visible ? '隐藏卡片' : '显示卡片'}
                        </button>
                        {section !== 'banner' && (
                          <button 
                            onClick={() => { handleReplaceClick(section, index); setShowMenu(false); }}
                            className="w-full text-left px-3 py-2.5 hover:bg-gray-50 flex items-center text-gray-700 border-t border-gray-50"
                          >
                            <RefreshCw size={14} className="mr-2 text-gray-400"/>
                            替换卡片
                          </button>
                        )}
                    </div>
                  </>
                )}
            </div>
         </div>
      </div>
    );
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Role Switcher Tabs */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-1 flex overflow-x-auto">
         {['employee', 'manager', 'hrbp'].map(role => (
           <button
             key={role}
             onClick={() => setActiveRole(role)}
             className={`flex-1 min-w-[120px] py-2 text-sm font-medium rounded-md transition-all ${
               activeRole === role 
                 ? 'bg-blue-100 text-blue-700 shadow-sm' 
                 : 'text-gray-600 hover:bg-gray-50'
             }`}
           >
             {role === 'employee' ? <span className="flex items-center justify-center"><User size={14} className="mr-2"/>员工视图 (Employee)</span> : 
              role === 'manager' ? <span className="flex items-center justify-center"><Briefcase size={14} className="mr-2"/>经理视图 (Manager)</span> :
              <span className="flex items-center justify-center"><TrendingUp size={14} className="mr-2"/>HRBP 视图</span>}
           </button>
         ))}
      </div>

      {/* Configuration Area - Simulating Dashboard Layout */}
      <div className="grid grid-cols-12 gap-6">
         
         {/* Banner Section */}
         <div className="col-span-12 lg:col-span-4">
            <ConfigItem item={currentRoleConfig.banner} section="banner" index={0} className="h-full">
               <div className={`h-full bg-gradient-to-br ${currentRoleConfig.banner.color || 'from-blue-500 to-blue-600'} rounded-xl p-6 text-white shadow-sm relative overflow-hidden flex flex-col justify-between min-h-[220px]`}>
                  <div className="relative z-10">
                     <h3 className="text-xl font-bold mb-1">{currentRoleConfig.banner.title}</h3>
                     <p className="text-white/80 text-sm">{currentRoleConfig.banner.subTitle}</p>
                  </div>
                  <div className="relative z-10 flex justify-between items-end">
                     <div>
                       <span className="text-4xl font-bold">12</span>
                       <p className="text-white/80 text-xs mt-1">核心指标</p>
                     </div>
                  </div>
                  {/* Decorative Icon */}
                  <div className="absolute top-0 right-0 p-4 opacity-10 transform scale-150">
                     <Activity size={100} />
                  </div>
               </div>
            </ConfigItem>
         </div>

         {/* Quick Actions Section */}
         <div className="col-span-12 lg:col-span-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-full">
               {currentRoleConfig.quickActions.map((action, idx) => (
                 <ConfigItem key={action.id} item={action} section="quickActions" index={idx}>
                    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex items-center h-full min-h-[100px]">
                       <div className={`p-3 rounded-lg mr-4 ${action.color || 'bg-blue-500'} text-white`}>
                          {/* Simplified Icon Logic */}
                          <Grid size={24} />
                       </div>
                       <span className="font-medium text-gray-700">{action.title}</span>
                    </div>
                 </ConfigItem>
               ))}
            </div>
         </div>

         {/* Widgets Section */}
         <div className="col-span-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               {currentRoleConfig.widgets.map((widget, idx) => (
                 <ConfigItem key={widget.id} item={widget} section="widgets" index={idx} className="h-full">
                    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-5 flex flex-col h-full min-h-[250px]">
                       <div className="flex justify-between items-center mb-4">
                          <h3 className="font-bold text-gray-800 text-lg">{widget.title}</h3>
                          <span className="text-gray-400"><MoreVertical size={16} /></span>
                       </div>
                       <div className="flex-1 bg-gray-50 rounded border border-gray-100 flex items-center justify-center text-gray-400 flex-col">
                          {widget.type === 'chart-widget' ? (
                             <>
                                <Activity size={32} className="mb-2 opacity-50" />
                                <span className="text-xs">图表组件预览</span>
                             </>
                          ) : (
                             <>
                                <ClipboardList size={32} className="mb-2 opacity-50" />
                                <span className="text-xs">列表组件预览</span>
                             </>
                          )}
                       </div>
                    </div>
                 </ConfigItem>
               ))}
               
               {/* ADDED: Add New Widget Placeholder */}
               <button 
                  onClick={() => setModalOpen(true)}
                  className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-5 flex flex-col items-center justify-center text-gray-400 hover:border-blue-400 hover:text-blue-500 transition-colors h-full min-h-[250px]"
               >
                  <Plus size={32} className="mb-2" />
                  <span className="font-medium">添加新组件</span>
               </button>
            </div>
         </div>
      </div>

      <div className="flex justify-end pt-6 border-t border-gray-100">
         <button className="bg-blue-600 text-white px-6 py-2.5 rounded-md hover:bg-blue-700 shadow-md flex items-center text-sm font-medium transition-transform active:scale-95">
           <Save size={16} className="mr-2" /> 保存视图配置
         </button>
      </div>

      {/* Library Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-fade-in">
           <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl flex flex-col max-h-[85vh] animate-scale-up">
              <div className="flex justify-between items-center p-5 border-b border-gray-100">
                 <div>
                    <h3 className="font-bold text-gray-800 text-lg">添加组件 (Widget Library)</h3>
                    <p className="text-sm text-gray-500 mt-1">从应用库中选择替换当前卡片</p>
                 </div>
                 <button onClick={() => setModalOpen(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors"><X size={20} className="text-gray-500"/></button>
              </div>
              
              <div className="p-6 overflow-y-auto bg-gray-50/50 flex-1 custom-scrollbar">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {WIDGET_LIBRARY.map(item => (
                      <div 
                        key={item.id} 
                        onClick={() => confirmReplace(item as WidgetConfig)}
                        className="bg-white border border-gray-200 rounded-xl p-4 hover:border-blue-400 hover:shadow-md cursor-pointer transition-all group"
                      >
                         <div className="flex items-start">
                            <div className={`w-10 h-10 rounded-lg mr-4 flex-shrink-0 flex items-center justify-center text-blue-600 bg-blue-50 group-hover:bg-blue-600 group-hover:text-white transition-colors`}>
                              <Grid size={20} />
                            </div>
                            <div className="flex-1">
                               <div className="flex justify-between">
                                  <h4 className="font-bold text-gray-800 text-sm mb-1">{item.title}</h4>
                                  <span className="text-[10px] bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded border border-gray-200">{item.category}</span>
                               </div>
                               <p className="text-xs text-gray-500 line-clamp-2">此处为组件的功能描述，展示该组件的主要用途。</p>
                            </div>
                         </div>
                      </div>
                    ))}
                 </div>
              </div>
              
              <div className="p-4 border-t border-gray-100 flex justify-end bg-white rounded-b-xl">
                 <button onClick={() => setModalOpen(false)} className="px-4 py-2 border border-gray-300 rounded text-gray-700 bg-white hover:bg-gray-50 text-sm">
                   取消
                 </button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};
