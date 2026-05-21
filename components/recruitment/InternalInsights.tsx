
import React, { useState, useMemo } from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  PieChart, 
  Pie, 
  Cell,
  Legend,
  AreaChart,
  Area
} from 'recharts';
import { 
  Briefcase, 
  Users, 
  TrendingUp, 
  Activity, 
  Download, 
  Filter, 
  Calendar,
  ChevronDown,
  XCircle,
  FileText,
  Building2,
  Zap
} from 'lucide-react';

// --- Mock Data ---

const MOCK_MONTHLY_TREND = [
  { month: '1月', published: 12, canceled: 2, applied: 45 },
  { month: '2月', published: 18, canceled: 1, applied: 68 },
  { month: '3月', published: 15, canceled: 3, applied: 120 }, // High spike
  { month: '4月', published: 22, canceled: 2, applied: 85 },
  { month: '5月', published: 20, canceled: 0, applied: 92 },
  { month: '6月', published: 25, canceled: 4, applied: 110 },
];

const MOCK_CATEGORY_DISTRIBUTION = [
  { name: '技术序列', value: 45, color: '#3b82f6' },
  { name: '产品序列', value: 25, color: '#10b981' },
  { name: '专业序列', value: 20, color: '#f59e0b' },
  { name: '职能序列', value: 10, color: '#ef4444' },
];

const MOCK_DEPT_STATS = [
  { name: '研发中心', reqs: 45, applied: 180, hires: 12 },
  { name: '产品部', reqs: 22, applied: 65, hires: 5 },
  { name: '销售部', reqs: 15, applied: 40, hires: 3 },
  { name: '运营部', reqs: 18, applied: 55, hires: 4 },
  { name: '行政部', reqs: 8, applied: 25, hires: 2 },
];

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

export const InternalInsights: React.FC = () => {
  const [timeRange, setTimeRange] = useState<'monthly' | 'yearly'>('monthly');
  const [selectedYear, setSelectedYear] = useState('2024');

  const stats = {
    totalReqs: 112,
    totalApplied: 450,
    published: 85,
    canceled: 12,
    avgAppliedPerJob: 5.3,
    conversionRate: 18.5
  };

  return (
    <div className="space-y-6 animate-fade-in pb-10">
      {/* 1. Header & Controls */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 flex items-center">
            <TrendingUp className="mr-3 text-blue-600" />
            内招洞察报告 (Internal Recruitment Insights)
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            企业内部人才流动分析：多维度评估职位需求、员工参与度及内招效能
          </p>
        </div>
        
        <div className="flex items-center space-x-3 w-full md:w-auto">
          <div className="flex bg-gray-100 p-1 rounded-lg shrink-0">
             <button 
                onClick={() => setTimeRange('monthly')}
                className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${timeRange === 'monthly' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500'}`}
             >
                月度
             </button>
             <button 
                onClick={() => setTimeRange('yearly')}
                className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${timeRange === 'yearly' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500'}`}
             >
                年度
             </button>
          </div>
          <select 
             value={selectedYear}
             onChange={(e) => setSelectedYear(e.target.value)}
             className="bg-white border border-gray-300 rounded-lg px-3 py-1.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
          >
             <option>2024</option>
             <option>2023</option>
          </select>
          <button className="p-2 bg-gray-50 text-gray-400 hover:text-blue-600 rounded-lg border border-gray-200 transition-colors">
             <Download size={18} />
          </button>
        </div>
      </div>

      {/* 2. KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
         <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex items-center group hover:border-blue-200 transition-all">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-xl mr-4 group-hover:scale-110 transition-transform">
               <FileText size={24} />
            </div>
            <div>
               <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">累计职位需求</p>
               <h3 className="text-2xl font-bold text-gray-800">{stats.totalReqs}</h3>
            </div>
         </div>
         <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex items-center group hover:border-blue-200 transition-all">
            <div className="p-3 bg-green-50 text-green-600 rounded-xl mr-4 group-hover:scale-110 transition-transform">
               <Users size={24} />
            </div>
            <div>
               <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">投递申请人次</p>
               <h3 className="text-2xl font-bold text-gray-800">{stats.totalApplied}</h3>
            </div>
         </div>
         <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex items-center group hover:border-blue-200 transition-all">
            <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl mr-4 group-hover:scale-110 transition-transform">
               <Zap size={24} />
            </div>
            <div>
               <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">活跃中岗位 (Published)</p>
               <h3 className="text-2xl font-bold text-gray-800">{stats.published}</h3>
            </div>
         </div>
         <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex items-center group hover:border-red-200 transition-all">
            <div className="p-3 bg-red-50 text-red-600 rounded-xl mr-4 group-hover:scale-110 transition-transform">
               <XCircle size={24} />
            </div>
            <div>
               <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">已取消/关闭岗位</p>
               <h3 className="text-2xl font-bold text-gray-800">{stats.canceled}</h3>
            </div>
         </div>
      </div>

      {/* 3. Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
         {/* Trend Chart */}
         <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
            <div className="flex justify-between items-center mb-8">
               <h3 className="font-bold text-gray-800 flex items-center">
                  <Activity size={18} className="mr-2 text-blue-500"/> 内招岗位发布与取消趋势
               </h3>
               <div className="flex items-center space-x-4 text-xs">
                  <span className="flex items-center"><div className="w-2 h-2 rounded-full bg-blue-500 mr-1"></div> 发布</span>
                  <span className="flex items-center"><div className="w-2 h-2 rounded-full bg-red-400 mr-1"></div> 取消</span>
               </div>
            </div>
            <div className="h-80">
               <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={MOCK_MONTHLY_TREND} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                     <defs>
                        <linearGradient id="colorPub" x1="0" y1="0" x2="0" y2="1">
                           <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                           <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                        </linearGradient>
                     </defs>
                     <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                     <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                     <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                     <Tooltip contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}} />
                     <Area type="monotone" dataKey="published" stroke="#3b82f6" fillOpacity={1} fill="url(#colorPub)" strokeWidth={3} name="发布职位" />
                     <Line type="monotone" dataKey="canceled" stroke="#ef4444" strokeWidth={2} strokeDasharray="5 5" name="取消职位" />
                  </AreaChart>
               </ResponsiveContainer>
            </div>
         </div>

         {/* Applied Distribution */}
         <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex flex-col">
            <h3 className="font-bold text-gray-800 flex items-center mb-8">
               <Users size={18} className="mr-2 text-indigo-500"/> 职位序列申请分布 (人次)
            </h3>
            <div className="flex-1 flex flex-col md:flex-row items-center">
               <div className="w-full md:w-1/2 h-64 relative">
                  <ResponsiveContainer width="100%" height="100%">
                     <PieChart>
                        <Pie
                           data={MOCK_CATEGORY_DISTRIBUTION}
                           cx="50%"
                           cy="50%"
                           innerRadius={60}
                           outerRadius={90}
                           paddingAngle={5}
                           dataKey="value"
                        >
                           {MOCK_CATEGORY_DISTRIBUTION.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                           ))}
                        </Pie>
                        <Tooltip />
                     </PieChart>
                  </ResponsiveContainer>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                     <div className="text-3xl font-extrabold text-gray-800">450</div>
                     <div className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">总投递</div>
                  </div>
               </div>
               <div className="w-full md:w-1/2 space-y-4 px-4">
                  {MOCK_CATEGORY_DISTRIBUTION.map(item => (
                     <div key={item.name} className="flex justify-between items-center text-sm">
                        <div className="flex items-center">
                           <div className="w-3 h-3 rounded-full mr-3" style={{ backgroundColor: item.color }}></div>
                           <span className="text-gray-600 font-medium">{item.name}</span>
                        </div>
                        <div className="flex items-baseline">
                           <span className="text-gray-800 font-bold">{Math.round((item.value / 100) * 450)}</span>
                           <span className="text-[10px] text-gray-400 ml-1">({item.value}%)</span>
                        </div>
                     </div>
                  ))}
               </div>
            </div>
         </div>

         {/* Department Performance */}
         <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm lg:col-span-2">
            <div className="flex justify-between items-center mb-8">
               <h3 className="font-bold text-gray-800 flex items-center">
                  <Building2 size={18} className="mr-2 text-green-500"/> 各部门内招达成与活跃度统计
               </h3>
               <button className="text-blue-600 text-xs font-bold hover:underline">查看部门排行榜 &rarr;</button>
            </div>
            <div className="h-80">
               <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={MOCK_DEPT_STATS} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                     <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                     <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                     <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                     <Tooltip 
                        cursor={{fill: '#f8fafc'}} 
                        contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}} 
                     />
                     <Legend iconType="circle" />
                     <Bar dataKey="reqs" name="职位需求数" fill="#93c5fd" radius={[4, 4, 0, 0]} barSize={24} />
                     <Bar dataKey="hires" name="已录用人数" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={24} />
                     <Bar dataKey="applied" name="投递申请数" fill="#10b981" radius={[4, 4, 0, 0]} barSize={24} />
                  </BarChart>
               </ResponsiveContainer>
            </div>
         </div>
      </div>

      {/* 4. Insight Notes */}
      <div className="bg-indigo-50 border border-indigo-100 p-6 rounded-xl">
         <h4 className="font-bold text-indigo-900 flex items-center mb-2">
            <Activity size={18} className="mr-2" /> 数据洞察摘要
         </h4>
         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
            <div className="space-y-1">
               <p className="text-xs text-indigo-600 font-bold uppercase">需求达成</p>
               <p className="text-sm text-indigo-800 leading-relaxed">
                  本年度内招职位平均在 <strong>22天</strong> 内完成录用，比外部招聘平均周期快了 <strong>12.5%</strong>。
               </p>
            </div>
            <div className="space-y-1">
               <p className="text-xs text-indigo-600 font-bold uppercase">人才流向</p>
               <p className="text-sm text-indigo-800 leading-relaxed">
                  <strong>研发中心</strong> 是目前内部转岗申请最热门的目的地，占总投递量的 <strong>40%</strong>。
               </p>
            </div>
            <div className="space-y-1">
               <p className="text-xs text-indigo-600 font-bold uppercase">风险预警</p>
               <p className="text-sm text-indigo-800 leading-relaxed">
                  <strong>销售部</strong> 发布的职位需求取消率较高 (<strong>15%</strong>)，建议优化部门内部评审环节。
               </p>
            </div>
         </div>
      </div>
    </div>
  );
};
