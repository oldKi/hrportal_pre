
import React, { useState, useMemo, useEffect } from 'react';
import { 
  PieChart, 
  Settings, 
  FileSpreadsheet, 
  RotateCcw, 
  RefreshCw, 
  Calendar, 
  Clock, 
  Users, 
  History, 
  Database,
  ListFilter,
  X,
  AlertTriangle,
  RotateCcw as RestoreIcon,
  Trash2,
  EyeOff,
  MapPin,
  BookOpen,
  GraduationCap,
  Award,
  UserPlus,
  CheckCircle2,
  Info,
  TrendingUp
} from 'lucide-react';
import { 
  NineBoxConfigItem, 
  MappingConfig, 
  DataSourceConfig, 
  ReviewEmployee, 
  ModificationLog, 
  GridLevel, 
  AxisMappingRule,
  DEFAULT_GRID_CONFIG,
  DEFAULT_MAPPING,
  DEFAULT_DATA_SOURCE,
  mockReviewEmployees,
  findOrGenerateProfile,
  Successor
} from './types';

// --- Helper Functions ---

const hexToRgb565 = (hex: string): string => {
  if (!hex || !hex.startsWith('#')) return '0x0000';
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, (m, r, g, b) => r + r + g + g + b + b);
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return '0x0000';
  const r = parseInt(result[1], 16);
  const g = parseInt(result[2], 16);
  const b = parseInt(result[3], 16);
  const rgb565 = ((r & 0xf8) << 8) | ((g & 0xfc) << 3) | (b >> 3);
  return '0x' + rgb565.toString(16).toUpperCase().padStart(4, '0');
};

// --- Shared Helper Components ---

const NineBoxCell: React.FC<{ 
  box: NineBoxConfigItem | undefined; 
  employees: ReviewEmployee[]; 
  total: number;
  onClick: () => void;
  onDragStart: (employee: ReviewEmployee) => void;
  onDrop: (boxId: string) => void;
}> = ({ box, employees, total, onClick, onDragStart, onDrop }) => {
  if (!box) return <div className="border border-gray-200 bg-gray-50 rounded-lg"></div>;

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    onDrop(box.id);
  };

  return (
    <div 
      className="border border-gray-200 rounded-lg p-2 flex flex-col h-full relative group transition-all hover:shadow-md"
      style={{ backgroundColor: box.colorHex }}
      onClick={onClick}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <div className="flex justify-between items-center mb-2">
        <span className="text-xs font-bold text-gray-700">{box.name}</span>
        <span className="text-xs font-bold text-gray-500">
          {employees.length}人 <span className="opacity-75">({total > 0 ? Math.round((employees.length / total) * 100) : 0}%)</span>
        </span>
      </div>
      <div className="flex-1 overflow-y-auto custom-scrollbar content-start flex flex-wrap content-start gap-1">
        {employees.map(emp => (
          <div 
            key={emp.id}
            draggable
            onDragStart={() => onDragStart(emp)}
            className="bg-white border border-gray-200 rounded px-1.5 py-0.5 text-[10px] text-gray-700 shadow-sm cursor-grab active:cursor-grabbing hover:border-purple-400 hover:text-purple-600 truncate max-w-full"
            title={`${emp.name} (${emp.position})`}
          >
            {emp.name}
          </div>
        ))}
      </div>
      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
         <div className="bg-white/80 rounded-full p-1 shadow-sm cursor-pointer">
            <Settings size={12} className="text-gray-500" />
         </div>
      </div>
    </div>
  );
};

interface SettingsModalProps {
  gridConfig: NineBoxConfigItem[];
  setGridConfig: React.Dispatch<React.SetStateAction<NineBoxConfigItem[]>>;
  mappingConfig: MappingConfig;
  setMappingConfig: React.Dispatch<React.SetStateAction<MappingConfig>>;
  dataSourceConfig: DataSourceConfig;
  onSaveConfig: (newConfig: DataSourceConfig) => void;
  onClose: () => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ 
  gridConfig, setGridConfig, 
  mappingConfig, setMappingConfig,
  dataSourceConfig, onSaveConfig,
  onClose 
}) => {
  const [activeTab, setActiveTab] = useState<'grid' | 'mapping' | 'plan'>('grid');
  const [localDataConfig, setLocalDataConfig] = useState(dataSourceConfig);
  
  // Local state for Grid Config to allow editing before saving
  const [localGridConfig, setLocalGridConfig] = useState(gridConfig);
  // Local state for Mapping Config
  const [localMappingConfig, setLocalMappingConfig] = useState(mappingConfig);

  const departments = ['研发中心', '产品部', '销售部', '市场部', '人力资源部', '财务部'];

  const handleSave = () => {
    onSaveConfig(localDataConfig);
    setGridConfig(localGridConfig);
    setMappingConfig(localMappingConfig);
    onClose();
  };

  const updateGridItem = (id: string, field: keyof NineBoxConfigItem, value: string) => {
    setLocalGridConfig(prev => prev.map(item => item.id === id ? { ...item, [field]: value } : item));
  };

  const updateMappingRule = (axis: 'performance' | 'potential', level: GridLevel, valueString: string) => {
    const values = valueString.split(/[,，]/).map(s => s.trim()).filter(s => s);
    setLocalMappingConfig(prev => ({
      ...prev,
      [axis]: prev[axis].map(rule => rule.level === level ? { ...rule, values } : rule)
    }));
  };

  const toggleScope = (dept: string) => {
    setLocalDataConfig(prev => {
      const newScope = prev.scope.includes(dept) 
        ? prev.scope.filter(s => s !== dept)
        : [...prev.scope, dept];
      return { ...prev, scope: newScope };
    });
  };

  const getMappingValueString = (axis: 'performance' | 'potential', level: GridLevel) => {
    return localMappingConfig[axis].find(r => r.level === level)?.values.join(', ') || '';
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-5xl h-[85vh] flex flex-col animate-scale-up overflow-hidden">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
          <div className="flex items-center">
             <Settings className="mr-2 text-gray-700" size={20} />
             <h3 className="font-bold text-lg text-gray-800">九宫格配置</h3>
          </div>
          <button onClick={onClose}><X size={20} className="text-gray-400 hover:text-gray-600"/></button>
        </div>

        {/* Tabs */}
        <div className="px-6 border-b border-gray-100 flex space-x-8">
           <button 
             onClick={() => setActiveTab('grid')}
             className={`py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === 'grid' ? 'border-purple-600 text-purple-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
           >
             格子名称与颜色
           </button>
           <button 
             onClick={() => setActiveTab('mapping')}
             className={`py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === 'mapping' ? 'border-purple-600 text-purple-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
           >
             数据映射规则 (Mapping)
           </button>
           <button 
             onClick={() => setActiveTab('plan')}
             className={`py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === 'plan' ? 'border-purple-600 text-purple-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
           >
             盘点计划 (Plan)
           </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto bg-gray-50 p-6 custom-scrollbar">
           
           {/* TAB 1: Grid Config */}
           {activeTab === 'grid' && (
             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[...localGridConfig].sort((a, b) => {
                    // Sort by Y descending (2->0), then X ascending (0->2) to match visual grid top-left to bottom-right
                    if (b.y !== a.y) return b.y - a.y;
                    return a.x - b.x;
                }).map(item => (
                   <div key={item.id} className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                      <div className="flex justify-between items-center mb-3">
                         <span className="text-xs text-gray-400 font-mono">坐标 ({item.x},{item.y})</span>
                         <div className="w-3 h-3 rounded-full border border-gray-200" style={{ backgroundColor: item.colorHex }}></div>
                      </div>
                      
                      <div className="mb-3">
                         <label className="block text-xs font-medium text-gray-500 mb-1">显示名称</label>
                         <input 
                           type="text" 
                           value={item.name} 
                           onChange={(e) => updateGridItem(item.id, 'name', e.target.value)}
                           className="w-full border border-gray-300 rounded px-2 py-1.5 text-sm focus:ring-1 focus:ring-purple-500 outline-none"
                         />
                      </div>

                      <div>
                         <label className="block text-xs font-medium text-gray-500 mb-1">背景颜色 (Hex)</label>
                         <div className="flex items-center space-x-2">
                            <input 
                              type="color" 
                              value={item.colorHex} 
                              onChange={(e) => updateGridItem(item.id, 'colorHex', e.target.value)}
                              className="w-8 h-8 rounded border border-gray-200 p-0.5 cursor-pointer"
                            />
                            <input 
                              type="text" 
                              value={item.colorHex} 
                              onChange={(e) => updateGridItem(item.id, 'colorHex', e.target.value)}
                              className="flex-1 border border-gray-300 rounded px-2 py-1.5 text-sm font-mono uppercase focus:ring-1 focus:ring-purple-500 outline-none"
                            />
                         </div>
                         <div className="text-[10px] text-gray-400 mt-1 font-mono">
                            RGB565: {hexToRgb565(item.colorHex)}
                         </div>
                      </div>
                   </div>
                ))}
             </div>
           )}

           {/* TAB 2: Mapping Config */}
           {activeTab === 'mapping' && (
             <div className="space-y-6 max-w-4xl mx-auto">
                {/* Evaluation Period */}
                <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                   <h4 className="text-sm font-bold text-gray-800 mb-4 flex items-center">
                      <Calendar className="mr-2 text-purple-600" size={18} /> 考核期间 (Evaluation Period)
                   </h4>
                   <div className="grid grid-cols-2 gap-6">
                      <div>
                         <label className="block text-xs font-medium text-gray-500 mb-1">考核开始日期</label>
                         <input 
                           type="date" 
                           value={localDataConfig.evalStartDate} 
                           onChange={(e) => setLocalDataConfig({...localDataConfig, evalStartDate: e.target.value})}
                           className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:ring-1 focus:ring-purple-500 outline-none"
                         />
                      </div>
                      <div>
                         <label className="block text-xs font-medium text-gray-500 mb-1">考核结束日期</label>
                         <input 
                           type="date" 
                           value={localDataConfig.evalEndDate} 
                           onChange={(e) => setLocalDataConfig({...localDataConfig, evalEndDate: e.target.value})}
                           className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:ring-1 focus:ring-purple-500 outline-none"
                         />
                      </div>
                   </div>
                   <div className="mt-3 flex items-start text-xs text-gray-500 bg-gray-50 p-2 rounded">
                      <Clock size={14} className="mr-1.5 mt-0.5" />
                      注：该日期用于从源系统获取员工的绩效结果（例如：2023年度绩效），不同于“盘点计划”中的人才盘点实施期间。
                   </div>
                </div>

                {/* X-Axis Mapping */}
                <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                   <h4 className="text-sm font-bold text-gray-800 mb-4 flex items-center">
                      <Award className="mr-2 text-blue-600" size={18} /> 绩效轴 (X-Axis) 映射配置
                   </h4>
                   <div className="space-y-4">
                      {['High', 'Mid', 'Low'].map((level) => (
                         <div key={level} className="flex items-center">
                            <div className="w-24 shrink-0 bg-gray-100 text-gray-700 text-sm font-medium py-2 px-3 rounded-l border border-r-0 border-gray-300 text-center">
                               {level === 'High' ? 'High (高)' : level === 'Mid' ? 'Mid (中)' : 'Low (低)'}
                            </div>
                            <input 
                               type="text" 
                               value={getMappingValueString('performance', level as GridLevel)}
                               onChange={(e) => updateMappingRule('performance', level as GridLevel, e.target.value)}
                               className="flex-1 border border-gray-300 rounded-r px-3 py-2 text-sm focus:ring-1 focus:ring-purple-500 outline-none"
                               placeholder="支持文本匹配 (如 'S') 或 数值范围 (如 '90-100')"
                            />
                         </div>
                      ))}
                   </div>
                   <div className="mt-3 text-xs text-gray-400 pl-24">支持文本匹配 (如 "S", "A") 或 数值范围 (如 "90-100")，多个值用逗号分隔。</div>
                </div>

                {/* Y-Axis Mapping */}
                <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                   <h4 className="text-sm font-bold text-gray-800 mb-4 flex items-center">
                      <TrendingUp className="mr-2 text-green-600" size={18} /> 潜力轴 (Y-Axis) 映射配置
                   </h4>
                   <div className="space-y-4">
                      {['High', 'Mid', 'Low'].map((level) => (
                         <div key={level} className="flex items-center">
                            <div className="w-24 shrink-0 bg-gray-100 text-gray-700 text-sm font-medium py-2 px-3 rounded-l border border-r-0 border-gray-300 text-center">
                               {level === 'High' ? 'High (高)' : level === 'Mid' ? 'Mid (中)' : 'Low (低)'}
                            </div>
                            <input 
                               type="text" 
                               value={getMappingValueString('potential', level as GridLevel)}
                               onChange={(e) => updateMappingRule('potential', level as GridLevel, e.target.value)}
                               className="flex-1 border border-gray-300 rounded-r px-3 py-2 text-sm focus:ring-1 focus:ring-purple-500 outline-none"
                               placeholder="支持文本匹配 (如 'High', 'A') 或 数值范围"
                            />
                         </div>
                      ))}
                   </div>
                </div>
             </div>
           )}

           {/* TAB 3: Plan Config */}
           {activeTab === 'plan' && (
             <div className="space-y-6 max-w-4xl mx-auto">
                <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                   <h4 className="text-sm font-bold text-gray-800 mb-4 flex items-center">
                      <Calendar className="mr-2 text-purple-600" size={18} /> 盘点期间 (Review Period)
                   </h4>
                   <div className="grid grid-cols-2 gap-6">
                      <div>
                         <label className="block text-xs font-medium text-gray-500 mb-1">开始日期 (Start Date)</label>
                         <input 
                           type="date" 
                           value={localDataConfig.startDate} 
                           onChange={(e) => setLocalDataConfig({...localDataConfig, startDate: e.target.value})}
                           className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:ring-1 focus:ring-purple-500 outline-none"
                         />
                      </div>
                      <div>
                         <label className="block text-xs font-medium text-gray-500 mb-1">结束日期 (End Date)</label>
                         <input 
                           type="date" 
                           value={localDataConfig.endDate} 
                           onChange={(e) => setLocalDataConfig({...localDataConfig, endDate: e.target.value})}
                           className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:ring-1 focus:ring-purple-500 outline-none"
                         />
                      </div>
                   </div>
                   <div className="mt-2 text-xs text-gray-400">指当前人才盘点项目实施的起止时间。</div>
                </div>

                <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                   <h4 className="text-sm font-bold text-gray-800 mb-4 flex items-center">
                      <ListFilter className="mr-2 text-blue-600" size={18} /> 盘点范围 (Review Scope)
                   </h4>
                   <p className="text-sm text-gray-600 mb-4">请选择参与本次人才盘点的组织/部门：</p>
                   <div className="grid grid-cols-3 gap-4">
                      {departments.map(dept => (
                         <label key={dept} className="flex items-center space-x-2 cursor-pointer p-3 border border-gray-200 rounded hover:bg-gray-50 transition-colors">
                            <input 
                              type="checkbox" 
                              checked={localDataConfig.scope.includes(dept)}
                              onChange={() => toggleScope(dept)}
                              className="rounded text-purple-600 focus:ring-purple-500 w-4 h-4 border-gray-300" 
                            />
                            <span className="text-sm text-gray-700">{dept}</span>
                         </label>
                      ))}
                   </div>
                   
                   <div className="mt-6 bg-blue-50 border border-blue-100 rounded-lg p-3 flex items-start text-sm text-blue-700">
                      <Info size={16} className="mr-2 mt-0.5 shrink-0" />
                      <div>
                         <span className="font-bold">注：</span>
                         此处仅配置盘点范围，详细的人员名单将在后续步骤中通过Excel导入或系统自动同步。
                         <span className="underline cursor-pointer hover:text-blue-900 ml-1">点击“开始盘点”后配置生效。</span>
                      </div>
                   </div>
                </div>
             </div>
           )}

        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-100 flex justify-end space-x-3 bg-white">
           <button onClick={onClose} className="px-6 py-2 border border-gray-300 rounded text-sm text-gray-700 bg-white hover:bg-gray-50 transition-colors">取消</button>
           <button onClick={handleSave} className="px-6 py-2 bg-purple-600 text-white rounded text-sm hover:bg-purple-700 transition-colors shadow-sm">完成配置</button>
        </div>
      </div>
    </div>
  );
};

// Simplified Read-Only Comparison Modal for Talent Review
const ReviewComparisonModal: React.FC<{
  title: string;
  subtitle: string;
  successors: Successor[];
  onClose: () => void;
}> = ({ 
  title, subtitle, successors, onClose 
}) => {
  return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
           <div className="bg-white rounded-xl shadow-2xl w-full max-w-7xl h-[90vh] flex flex-col overflow-hidden animate-scale-up">
              {/* Header */}
              <div className="bg-purple-700 p-4 sm:p-6 text-white shrink-0 flex justify-between items-center">
                 <div>
                   <h2 className="text-2xl font-bold flex items-center">
                      <Users className="mr-3" />
                      {title}
                   </h2>
                   <p className="text-purple-100 text-sm mt-1 opacity-80">
                      {subtitle}
                   </p>
                 </div>
                 <button onClick={onClose} className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors text-white">
                   <X size={24} />
                 </button>
              </div>

              {/* Body */}
              <div className="flex-1 overflow-y-auto bg-gray-50 custom-scrollbar">
                 <div className="min-w-full p-6">
                    <div className="grid gap-6" style={{ gridTemplateColumns: `repeat(${successors.length}, minmax(300px, 1fr))` }}>
                       {successors.map((s) => (
                         <div key={s.id} className="bg-white rounded-lg shadow-sm border border-gray-200 flex flex-col h-full hover:border-purple-300 hover:shadow-md transition-all">
                            <div className="p-6 border-b border-gray-100 bg-white rounded-t-lg sticky top-0 z-10 shadow-sm">
                               <div className="flex items-start justify-between mb-4">
                                  <div className="flex items-center">
                                     <div className="w-14 h-14 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center font-bold text-xl mr-4 border-2 border-purple-50">
                                        {s.name.charAt(0)}
                                     </div>
                                     <div>
                                        <h3 className="text-lg font-bold text-gray-800">{s.name}</h3>
                                        <p className="text-sm text-gray-500">{s.currentTitle}</p>
                                     </div>
                                  </div>
                               </div>
                               <div className="bg-gray-50 rounded-lg p-2 text-center border border-gray-100">
                                  <span className="text-xs text-gray-500 uppercase tracking-wide">档级</span>
                                  <div className="text-sm font-semibold text-gray-800 py-1">
                                     {s.readiness.split(' ')[0]}
                                  </div>
                               </div>
                            </div>
                            <div className="p-6 space-y-8">
                               <div>
                                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 flex items-center border-b border-gray-100 pb-2">
                                     <Award size={14} className="mr-2" /> 基础信息
                                  </h4>
                                  <div className="space-y-3 text-sm">
                                     <div className="flex justify-between"><span className="text-gray-500">年龄</span> <span className="text-gray-800">{s.age} 岁</span></div>
                                     <div className="flex justify-between"><span className="text-gray-500">当前常驻地</span> <span className="text-gray-800 flex items-center"><MapPin size={12} className="mr-1"/> {s.location}</span></div>
                                  </div>
                               </div>
                               <div>
                                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 flex items-center border-b border-gray-100 pb-2">
                                     <BookOpen size={14} className="mr-2" /> 教育背景
                                  </h4>
                                  {s.education.map((edu, i) => (
                                     <div key={i} className="mb-2 last:mb-0">
                                        <div className="font-semibold text-gray-800 text-sm">{edu.school}</div>
                                        <div className="text-xs text-gray-500 flex items-center">
                                           <GraduationCap size={12} className="mr-1"/> {edu.degree} | {edu.major}
                                        </div>
                                     </div>
                                  ))}
                               </div>
                            </div>
                         </div>
                       ))}
                    </div>
                 </div>
              </div>
           </div>
        </div>
  )
}

// --- Main Talent Review Component ---

export const TalentReview: React.FC = () => {
  const [gridConfig, setGridConfig] = useState<NineBoxConfigItem[]>(DEFAULT_GRID_CONFIG);
  const [mappingConfig, setMappingConfig] = useState<MappingConfig>(DEFAULT_MAPPING);
  const [dataSourceConfig, setDataSourceConfig] = useState<DataSourceConfig>(DEFAULT_DATA_SOURCE);
  const [reviewEmployees, setReviewEmployees] = useState<ReviewEmployee[]>(mockReviewEmployees);
  const [reviewingBoxId, setReviewingBoxId] = useState<string | null>(null);
  const [showSettings, setShowSettings] = useState(false);
  const [isFetching, setIsFetching] = useState(false);

  // Drag and Drop State (9-Box)
  const [draggedEmployee, setDraggedEmployee] = useState<ReviewEmployee | null>(null);
  const [modificationLogs, setModificationLogs] = useState<ModificationLog[]>([]);
  const [showLogs, setShowLogs] = useState(false);
  const [moveConfirmation, setMoveConfirmation] = useState<{
    isOpen: boolean;
    employee: ReviewEmployee | null;
    targetBox: NineBoxConfigItem | null;
    reason: string;
  }>({ isOpen: false, employee: null, targetBox: null, reason: '' });

  // --- Logic Helpers ---

  const matchLevel = (value: string, rules: AxisMappingRule[]): number => {
    // 1. Try exact match (string)
    for (const rule of rules) {
      if (rule.values.includes(value)) {
        return rule.level === 'High' ? 2 : rule.level === 'Mid' ? 1 : 0;
      }
    }
    // 2. Try numeric range
    const numVal = parseFloat(value);
    if (!isNaN(numVal)) {
      for (const rule of rules) {
        for (const val of rule.values) {
          if (val.includes('-')) {
            const [min, max] = val.split('-').map(Number);
            if (numVal >= min && numVal <= max) {
              return rule.level === 'High' ? 2 : rule.level === 'Mid' ? 1 : 0;
            }
          }
        }
      }
    }
    return 1; // Default to Mid
  };

  const getFirstValueForLevel = (levelIndex: number, axis: 'performance' | 'potential'): string => {
    const levels: GridLevel[] = ['Low', 'Mid', 'High'];
    const targetLevel = levels[levelIndex];
    const rules = mappingConfig[axis];
    const rule = rules.find(r => r.level === targetLevel);
    return rule && rule.values.length > 0 ? rule.values[0] : (axis === 'potential' ? 'Medium' : 'B');
  };

  const calculateDistribution = useMemo(() => {
    const distribution: Record<string, ReviewEmployee[]> = {};
    gridConfig.forEach(box => distribution[box.id] = []);

    reviewEmployees.forEach(emp => {
      const x = matchLevel(emp.performance, mappingConfig.performance); // 0, 1, 2
      const y = matchLevel(emp.potential, mappingConfig.potential);     // 0, 1, 2
      
      const box = gridConfig.find(b => b.x === x && b.y === y);
      if (box) {
        distribution[box.id].push(emp);
      }
    });

    return distribution;
  }, [gridConfig, mappingConfig, reviewEmployees]);

  // --- Handlers ---

  const handleDragStart = (employee: ReviewEmployee) => {
    setDraggedEmployee(employee);
  };

  const handleDrop = (targetBoxId: string) => {
    if (!draggedEmployee) return;

    const targetBox = gridConfig.find(b => b.id === targetBoxId);
    if (!targetBox) return;

    // Determine current box
    const currentX = matchLevel(draggedEmployee.performance, mappingConfig.performance);
    const currentY = matchLevel(draggedEmployee.potential, mappingConfig.potential);
    const currentBox = gridConfig.find(b => b.x === currentX && b.y === currentY);

    if (!currentBox || currentBox.id === targetBoxId) {
      setDraggedEmployee(null);
      return; // No change
    }

    const isXChange = currentX !== targetBox.x;
    const isYChange = currentY !== targetBox.y;

    if (isXChange && isYChange) {
      // Cross-Move (Diagonal): Require Confirmation
      setMoveConfirmation({
        isOpen: true,
        employee: draggedEmployee,
        targetBox: targetBox,
        reason: ''
      });
    } else {
      // Single Axis Change: Auto Log
      executeUpdate(draggedEmployee, targetBox, 'Single Axis', 'Manual Adjustment (Single Axis)');
    }
    setDraggedEmployee(null);
  };

  const executeUpdate = (employee: ReviewEmployee, targetBox: NineBoxConfigItem, type: 'Single Axis' | 'Cross Axis', reason: string) => {
    const newPerformance = getFirstValueForLevel(targetBox.x, 'performance');
    const newPotential = getFirstValueForLevel(targetBox.y, 'potential');

    const updatedEmployees = reviewEmployees.map(emp => 
      emp.id === employee.id 
        ? { ...emp, performance: newPerformance, potential: newPotential } 
        : emp
    );
    setReviewEmployees(updatedEmployees);

    const currentX = matchLevel(employee.performance, mappingConfig.performance);
    const currentY = matchLevel(employee.potential, mappingConfig.potential);
    const currentBox = gridConfig.find(b => b.x === currentX && b.y === currentY);

    const newLog: ModificationLog = {
      id: Date.now().toString(),
      timestamp: new Date().toLocaleString(),
      employeeName: employee.name,
      employeeId: employee.id,
      fromBox: currentBox?.name || 'Unknown',
      toBox: targetBox.name,
      changeType: type,
      reason: reason
    };
    setModificationLogs(prev => [newLog, ...prev]);
  };

  const handleConfirmMove = () => {
    if (moveConfirmation.employee && moveConfirmation.targetBox) {
      executeUpdate(
        moveConfirmation.employee, 
        moveConfirmation.targetBox, 
        'Cross Axis', 
        moveConfirmation.reason || 'Cross-box movement'
      );
      setMoveConfirmation({ isOpen: false, employee: null, targetBox: null, reason: '' });
    }
  };

  const handleDownloadReport = () => {
    let tableRows = "";
    reviewEmployees.forEach(emp => {
       const x = matchLevel(emp.performance, mappingConfig.performance);
       const y = matchLevel(emp.potential, mappingConfig.potential);
       const box = gridConfig.find(b => b.x === x && b.y === y);
       const gridLoc = box?.name || 'Unknown';
       
       tableRows += `
         <tr>
           <td>${emp.id}</td>
           <td>${emp.name}</td>
           <td>${emp.dept}</td>
           <td>${emp.position}</td>
           <td>${emp.performance}</td>
           <td>${emp.potential}</td>
           <td>${gridLoc}</td>
         </tr>`;
    });

    const excelTemplate = `
      <html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">
      <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <style>
          td { mso-number-format:"\@"; }
          table { border-collapse: collapse; }
          td, th { border: 1px solid #000; padding: 5px; }
        </style>
      </head>
      <body>
        <table>
          <thead>
            <tr style="background-color: #f3f4f6; font-weight: bold;">
              <th>ID</th>
              <th>Name</th>
              <th>Department</th>
              <th>Position</th>
              <th>Performance</th>
              <th>Potential</th>
              <th>Grid Location</th>
            </tr>
          </thead>
          <tbody>
            ${tableRows}
          </tbody>
        </table>
      </body>
      </html>
    `;

    const blob = new Blob([excelTemplate], { type: 'application/vnd.ms-excel' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `talent_review_report_${new Date().toISOString().split('T')[0]}.xls`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleSaveConfig = (newConfig: DataSourceConfig) => {
    setDataSourceConfig(newConfig);
  };

  const handleStartReview = () => {
    setIsFetching(true);
    setTimeout(() => {
        const updatedEmployees = mockReviewEmployees.map(emp => {
            const isEvenYear = dataSourceConfig.endDate.includes('2024') || dataSourceConfig.endDate.includes('2022');
            let newPerf = emp.performance;
            let newPot = emp.potential;

            if (isEvenYear) {
                if (emp.performance === 'A') newPerf = Math.random() > 0.5 ? 'S' : 'B';
                if (emp.potential === 'High') newPot = Math.random() > 0.7 ? 'Medium' : 'High';
            }
            return { ...emp, performance: newPerf, potential: newPot };
        });
        
        setReviewEmployees(updatedEmployees);
        setIsFetching(false);
    }, 1500);
  };

  // Determine modal data
  const selectedNineBox = reviewingBoxId ? gridConfig.find(b => b.id === reviewingBoxId) : null;
  const selectedNineBoxEmployees = reviewingBoxId ? calculateDistribution[reviewingBoxId] : [];
  const successorsForComparison = selectedNineBoxEmployees.map(e => findOrGenerateProfile(e.name));

  return (
    <div className="space-y-6 animate-fade-in relative">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 flex items-center">
            <PieChart className="mr-3 text-purple-600" />
            人才盘点 (Talent Review)
          </h2>
          <div className="flex items-center mt-1 text-sm text-gray-500">
             <Calendar size={14} className="mr-1" />
             <span>考评期间: {dataSourceConfig.startDate} 至 {dataSourceConfig.endDate}</span>
             <span className="mx-2">|</span>
             <Clock size={14} className="mr-1" />
             <span>绩效源: {dataSourceConfig.evalStartDate} ~ {dataSourceConfig.evalEndDate}</span>
             <span className="mx-2">|</span>
             <Users size={14} className="mr-1" />
             <span>范围: {dataSourceConfig.scope.join(', ') || '全公司'}</span>
          </div>
        </div>
        <div className="flex space-x-3">
           <button 
             onClick={() => setShowLogs(true)}
             className="bg-white border border-gray-300 text-gray-700 px-3 py-2 rounded-md hover:bg-gray-50 text-sm font-medium flex items-center shadow-sm"
           >
             <History size={16} className="mr-2" /> 日志 ({modificationLogs.length})
           </button>
           <button 
             onClick={() => setShowSettings(true)}
             className="bg-white border border-gray-300 text-gray-700 px-3 py-2 rounded-md hover:bg-gray-50 text-sm font-medium flex items-center shadow-sm"
           >
             <Settings size={16} className="mr-2" /> 配置
           </button>
           <button 
              onClick={handleDownloadReport}
              className="bg-white border border-gray-300 text-gray-700 px-3 py-2 rounded-md hover:bg-gray-50 text-sm font-medium flex items-center shadow-sm"
           >
             <FileSpreadsheet size={16} className="mr-2" /> 下载报告
           </button>
           <button 
              onClick={handleStartReview}
              disabled={isFetching}
              className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 text-sm font-medium shadow-sm flex items-center disabled:opacity-70 disabled:cursor-not-allowed"
           >
             {isFetching ? <RefreshCw size={16} className="mr-2 animate-spin" /> : <RotateCcw size={16} className="mr-2" />}
             {isFetching ? '盘点计算中...' : '开始盘点'}
           </button>
        </div>
      </div>

      {/* 9-Box Grid Container */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-8 relative">
         {isFetching && (
            <div className="absolute inset-0 bg-white/80 z-20 flex items-center justify-center backdrop-blur-sm rounded-lg">
               <div className="flex flex-col items-center">
                  <RefreshCw className="animate-spin text-purple-600 mb-2" size={32} />
                  <span className="text-purple-800 font-medium">正在获取最新绩效数据...</span>
               </div>
            </div>
         )}
         <div className="flex relative">
            {/* Y Axis Label (Vertical) */}
            <div className="flex items-center justify-center w-12 mr-2">
               <div className="-rotate-90 whitespace-nowrap font-bold text-gray-500 tracking-widest text-lg">
                  潜力 (Potential)
               </div>
            </div>

            {/* Grid Content */}
            <div className="flex-1">
               <div className="grid grid-cols-3 gap-4 h-[600px]">
                  {/* Rows */}
                  {[2, 1, 0].map(y => (
                      [0, 1, 2].map(x => {
                          const box = gridConfig.find(b => b.x === x && b.y === y);
                          const employees = box ? calculateDistribution[box.id] : [];
                          return (
                              <NineBoxCell 
                                  key={`${y}-${x}`} 
                                  box={box} 
                                  employees={employees} 
                                  total={reviewEmployees.length} 
                                  onClick={() => box && setReviewingBoxId(box.id)}
                                  onDragStart={handleDragStart}
                                  onDrop={handleDrop}
                              />
                          );
                      })
                  ))}
               </div>

               {/* X Axis Label */}
               <div className="text-center font-bold text-gray-500 tracking-widest text-lg mt-4">
                  绩效 (Performance)
               </div>
            </div>
         </div>
      </div>

      {/* Configuration Modal */}
      {showSettings && (
        <SettingsModal 
          gridConfig={gridConfig} 
          setGridConfig={setGridConfig}
          mappingConfig={mappingConfig}
          setMappingConfig={setMappingConfig}
          dataSourceConfig={dataSourceConfig}
          onSaveConfig={handleSaveConfig}
          onClose={() => setShowSettings(false)} 
        />
      )}

      {/* Comparison Modal */}
      {selectedNineBox && (
          <ReviewComparisonModal 
              title="人才盘点对比视图"
              subtitle={`九宫格: ${selectedNineBox.name} | 人数: ${selectedNineBoxEmployees.length}`}
              successors={successorsForComparison}
              onClose={() => setReviewingBoxId(null)}
          />
      )}

      {/* Move Confirmation Modal */}
      {moveConfirmation.isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
             <div className="bg-white rounded-lg shadow-xl w-full max-w-md animate-scale-up">
                <div className="p-6">
                   <div className="flex items-center mb-4 text-orange-600">
                      <AlertTriangle size={24} className="mr-2" />
                      <h3 className="text-lg font-bold">跨象限变更确认</h3>
                   </div>
                   <p className="text-sm text-gray-600 mb-4">
                      您正在将 <strong>{moveConfirmation.employee?.name}</strong> 移动到 <strong>{moveConfirmation.targetBox?.name}</strong>。
                      <br/>由于涉及绩效与潜力双重变更，请填写变更原因。
                   </p>
                   <div className="mb-4">
                      <label className="block text-xs font-medium text-gray-500 mb-1">变更原因 <span className="text-red-500">*</span></label>
                      <textarea 
                         className="w-full border border-gray-300 rounded p-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                         rows={3}
                         placeholder="请输入调整原因..."
                         value={moveConfirmation.reason}
                         onChange={(e) => setMoveConfirmation(prev => ({...prev, reason: e.target.value}))}
                      ></textarea>
                   </div>
                   <div className="flex justify-end space-x-3">
                      <button 
                         onClick={() => setMoveConfirmation({ isOpen: false, employee: null, targetBox: null, reason: '' })}
                         className="px-4 py-2 text-gray-600 hover:bg-gray-50 rounded text-sm"
                      >
                         取消
                      </button>
                      <button 
                         onClick={handleConfirmMove}
                         disabled={!moveConfirmation.reason.trim()}
                         className="px-4 py-2 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 disabled:opacity-50"
                      >
                         确认变更
                      </button>
                   </div>
                </div>
             </div>
          </div>
      )}

      {/* Logs Modal */}
      {showLogs && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
             <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[80vh] flex flex-col animate-scale-up">
                <div className="p-4 border-b border-gray-100 flex justify-between items-center">
                   <h3 className="font-bold text-gray-800 flex items-center">
                      <History size={18} className="mr-2" /> 盘点修改日志
                   </h3>
                   <button onClick={() => setShowLogs(false)}><X size={20} className="text-gray-400 hover:text-gray-600"/></button>
                </div>
                <div className="flex-1 overflow-auto p-4">
                   <table className="w-full text-left text-sm">
                      <thead className="bg-gray-50 text-gray-500 sticky top-0">
                         <tr>
                            <th className="p-3">时间</th>
                            <th className="p-3">员工</th>
                            <th className="p-3">变更类型</th>
                            <th className="p-3">原位置 -{'>'} 新位置</th>
                            <th className="p-3">原因</th>
                         </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                         {modificationLogs.length > 0 ? modificationLogs.map(log => (
                            <tr key={log.id}>
                               <td className="p-3 text-gray-500 text-xs">{log.timestamp}</td>
                               <td className="p-3 font-medium">{log.employeeName}</td>
                               <td className="p-3">
                                  <span className={`px-2 py-0.5 rounded text-xs ${log.changeType === 'Cross Axis' ? 'bg-orange-100 text-orange-700' : 'bg-blue-100 text-blue-700'}`}>
                                     {log.changeType}
                                  </span>
                               </td>
                               <td className="p-3 text-xs">
                                  <div className="flex items-center">
                                     <span className="text-gray-500">{log.fromBox}</span>
                                     <span className="mx-2 text-gray-300">-{'>'}</span>
                                     <span className="text-gray-800 font-medium">{log.toBox}</span>
                                  </div>
                               </td>
                               <td className="p-3 text-gray-600 truncate max-w-xs" title={log.reason}>{log.reason}</td>
                            </tr>
                         )) : (
                            <tr>
                               <td colSpan={5} className="p-8 text-center text-gray-400">暂无变更记录</td>
                            </tr>
                         )}
                      </tbody>
                   </table>
                </div>
             </div>
          </div>
      )}
    </div>
  );
};
