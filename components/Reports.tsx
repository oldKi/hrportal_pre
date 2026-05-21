import React, { useState } from 'react';
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
  AreaChart,
  Area,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Legend
} from 'recharts';
import { 
  Briefcase, 
  Users, 
  TrendingUp, 
  Activity, 
  Download, 
  Filter, 
  UserCheck, 
  Clock, 
  AlertTriangle,
  Target,
  DollarSign
} from 'lucide-react';

// Mock Data for HRBP (Operational Focus)
const hrbpRecruitmentData = [
  { name: '研发部', target: 20, filled: 15, active: 5 },
  { name: '销售部', target: 35, filled: 28, active: 7 },
  { name: '市场部', target: 10, filled: 8, active: 2 },
  { name: '产品部', target: 8, filled: 4, active: 4 },
  { name: '职能端', target: 5, filled: 5, active: 0 },
];

const hrbpTurnoverData = [
  { month: '1月', rate: 2.1 },
  { month: '2月', rate: 1.8 },
  { month: '3月', rate: 2.5 },
  { month: '4月', rate: 1.2 },
  { month: '5月', rate: 1.5 },
  { month: '6月', rate: 1.9 },
];

// Mock Data for HRD (Strategic Focus)
const hrdHeadcountTrend = [
  { month: 'Jan', total: 1200, budget: 1250 },
  { month: 'Feb', total: 1230, budget: 1250 },
  { month: 'Mar', total: 1280, budget: 1300 },
  { month: 'Apr', total: 1310, budget: 1350 },
  { month: 'May', total: 1340, budget: 1400 },
  { month: 'Jun', total: 1380, budget: 1450 },
];

const hrdTalentDensity = [
  { name: 'High Potential (A)', value: 15, color: '#10b981' }, // Green
  { name: 'Core Contributors (B)', value: 65, color: '#3b82f6' }, // Blue
  { name: 'Under Performers (C)', value: 20, color: '#f59e0b' }, // Amber
];

const hrdCostData = [
  { department: 'R&D', salary: 450, training: 50, benefits: 120 },
  { department: 'Sales', salary: 320, training: 80, benefits: 90 },
  { department: 'MKT', salary: 210, training: 40, benefits: 50 },
  { department: 'G&A', salary: 150, training: 10, benefits: 40 },
];

const managerRadarData = [
  { subject: '战略规划', A: 85, fullMark: 100 },
  { subject: '运营决策', A: 92, fullMark: 100 },
  { subject: '变革引领', A: 88, fullMark: 100 },
  { subject: '团队管理', A: 95, fullMark: 100 },
  { subject: '执行落地', A: 89, fullMark: 100 },
  { subject: '追求卓越', A: 93, fullMark: 100 },
];

const managerBudgetStatus = [
  { name: '已用预算', value: 45, color: '#3b82f6' },
  { name: '锁定预算', value: 15, color: '#10b981' },
  { name: '剩余预算', value: 20, color: '#cbd5e1' },
];

const personnelDivisionData = [
  { name: '研发中心', value: 1450, color: '#3b82f6' },
  { name: '销售服务', value: 1100, color: '#10b981' },
  { name: '市场公关', value: 450, color: '#f59e0b' },
  { name: '运营中心', value: 350, color: '#8b5cf6' },
  { name: '职能后台', value: 150, color: '#ec4899' },
];

const personnelFlowData = [
  { month: '1月', entry: 45, exit: 12 },
  { month: '2月', entry: 32, exit: 15 },
  { month: '3月', entry: 55, exit: 28 },
  { month: '4月', entry: 60, exit: 18 },
  { month: '5月', entry: 48, exit: 22 },
  { month: '6月', entry: 65, exit: 20 },
];

export const Reports: React.FC = () => {
  const [role, setRole] = useState<'MANAGER' | 'PERSONNEL' | 'HRBP' | 'HRD'>('MANAGER');

  return (
    <div className="space-y-6">
      {/* Header & Role Toggle */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 flex items-center">
            <Activity className="mr-3 text-blue-600" />
            数据报告中心
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            {role === 'MANAGER' && '经理端报告视图：关注部门预算执行率、下属核心能力雷达及HC达成率'}
            {role === 'PERSONNEL' && '人员统计报表视图：关注集团总人数分布、男女比例与人员流入流出流动趋势'}
            {role === 'HRBP' && '业务合作伙伴视图：关注招聘进度、团队稳定性与人效指标'}
            {role === 'HRD' && '人力资源总监视图：关注组织效能、人力成本ROI与人才密度'}
          </p>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="flex bg-gray-100 p-1 rounded-lg">
            <button 
              onClick={() => setRole('MANAGER')}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${
                role === 'MANAGER' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              经理端报告
            </button>
            <button 
              onClick={() => setRole('PERSONNEL')}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${
                role === 'PERSONNEL' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              人员统计报表
            </button>
            <button 
              onClick={() => setRole('HRBP')}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${
                role === 'HRBP' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              HRBP 视图
            </button>
            <button 
              onClick={() => setRole('HRD')}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${
                role === 'HRD' ? 'bg-white text-purple-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              HRD 视图
            </button>
          </div>
          <button className="flex items-center text-gray-600 hover:text-blue-600 transition-colors">
            <Download size={20} />
          </button>
        </div>
      </div>

      {/* Manager View Content */}
      {role === 'MANAGER' && (
        <div className="animate-fade-in space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-lg border border-gray-100 shadow-sm">
              <p className="text-xs text-gray-500 uppercase font-semibold">部门 HC 达成率</p>
              <h3 className="text-2xl font-bold text-gray-800 mt-1">75.0%</h3>
              <span className="text-xs text-green-500">已入职 15 / 目标 20</span>
            </div>
            <div className="bg-white p-5 rounded-lg border border-gray-100 shadow-sm">
              <p className="text-xs text-gray-500 uppercase font-semibold">月度预算使用率</p>
              <h3 className="text-2xl font-bold text-gray-800 mt-1">75.0%</h3>
              <span className="text-xs text-blue-500">已用 45万 / 额度 80万</span>
            </div>
            <div className="bg-white p-5 rounded-lg border border-gray-100 shadow-sm">
              <p className="text-xs text-gray-500 uppercase font-semibold">团队培训完成率</p>
              <h3 className="text-2xl font-bold text-gray-800 mt-1">92.0%</h3>
              <span className="text-xs text-green-500">已完成 23 / 应参加 25</span>
            </div>
            <div className="bg-white p-5 rounded-lg border border-gray-100 shadow-sm">
              <p className="text-xs text-gray-500 uppercase font-semibold">绩效沟通确认进度</p>
              <h3 className="text-2xl font-bold text-gray-800 mt-1">100%</h3>
              <span className="text-xs text-gray-400">已确认 30 / 30 人</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm">
              <h3 className="font-bold text-gray-800 mb-6 flex items-center">
                团队核心管理能力雷达
              </h3>
              <div className="h-80 flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="70%" data={managerRadarData}>
                    <PolarGrid stroke="#e2e8f0" />
                    <PolarAngleAxis dataKey="subject" tick={{ fill: '#475569', fontSize: 12 }} />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: '#94a3b8' }} />
                    <Radar name="我的团队" dataKey="A" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.3} />
                    <Tooltip />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm">
              <h3 className="font-bold text-gray-800 mb-6 flex items-center">
                部门预算状态分布 (万元)
              </h3>
              <div className="h-60 relative flex items-center justify-center mt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={managerBudgetStatus}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {managerBudgetStatus.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                  <div className="text-3xl font-bold text-gray-800">80万</div>
                  <div className="text-xs text-gray-500">部门预算总额</div>
                </div>
              </div>
              <div className="mt-4 flex justify-around text-sm">
                {managerBudgetStatus.map((item) => (
                  <div key={item.name} className="flex items-center">
                    <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: item.color }}></div>
                    <span className="text-gray-600 mr-2">{item.name}</span>
                    <span className="font-medium text-gray-800">{item.value}万</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Personnel Stats View Content */}
      {role === 'PERSONNEL' && (
        <div className="animate-fade-in space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-lg border border-gray-100 shadow-sm">
              <p className="text-xs text-gray-500 uppercase font-semibold">集团总人数</p>
              <h3 className="text-2xl font-bold text-gray-800 mt-1">3,500 人</h3>
              <span className="text-xs text-green-500">较上月 +1.2%</span>
            </div>
            <div className="bg-white p-5 rounded-lg border border-gray-100 shadow-sm">
              <p className="text-xs text-gray-500 uppercase font-semibold">男女比例</p>
              <h3 className="text-2xl font-bold text-gray-800 mt-1">62% : 38%</h3>
              <span className="text-xs text-slate-500">男 2170 / 女 1330</span>
            </div>
            <div className="bg-white p-5 rounded-lg border border-gray-100 shadow-sm">
              <p className="text-xs text-gray-500 uppercase font-semibold">平均工作年限</p>
              <h3 className="text-2xl font-bold text-gray-800 mt-1">5.4 年</h3>
              <span className="text-xs text-blue-500">稳定性良好</span>
            </div>
            <div className="bg-white p-5 rounded-lg border border-gray-100 shadow-sm">
              <p className="text-xs text-gray-500 uppercase font-semibold">年度主动流失率</p>
              <h3 className="text-2xl font-bold text-gray-800 mt-1">1.8%</h3>
              <span className="text-xs text-green-500">低于行业平均 (8.5%)</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm">
              <h3 className="font-bold text-gray-800 mb-6 flex items-center">
                各中心人数占比
              </h3>
              <div className="h-60 relative flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={personnelDivisionData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {personnelDivisionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                  <div className="text-2xl font-bold text-gray-800">3500人</div>
                  <div className="text-[10px] text-gray-500">在职总人数</div>
                </div>
              </div>
              <div className="mt-4 space-y-2">
                {personnelDivisionData.map((item) => (
                  <div key={item.name} className="flex justify-between items-center text-xs">
                    <div className="flex items-center">
                      <div className="w-2.5 h-2.5 rounded-full mr-2" style={{ backgroundColor: item.color }}></div>
                      <span className="text-gray-600">{item.name}</span>
                    </div>
                    <span className="font-medium text-gray-800">{item.value}人 ({(item.value / 35).toFixed(1)}%)</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-2 bg-white p-6 rounded-lg border border-gray-100 shadow-sm">
              <h3 className="font-bold text-gray-800 mb-6 flex items-center">
                人员流入流出流动趋势
              </h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={personnelFlowData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorEntry" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorExit" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#f43f5e" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8' }} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8' }} />
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                    <Area type="monotone" dataKey="entry" stroke="#3b82f6" fillOpacity={1} fill="url(#colorEntry)" name="入职人员" strokeWidth={3} />
                    <Area type="monotone" dataKey="exit" stroke="#f43f5e" fillOpacity={1} fill="url(#colorExit)" name="离职人员" strokeWidth={2} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* HRBP View Content */}
      {role === 'HRBP' && (
        <div className="animate-fade-in space-y-6">
          {/* Metrics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-lg border border-gray-100 shadow-sm">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-xs text-gray-500 uppercase font-semibold">平均招聘周期 (TTF)</p>
                  <h3 className="text-2xl font-bold text-gray-800 mt-1">24.5 天</h3>
                  <span className="text-xs text-green-500 flex items-center mt-1">
                    <TrendingUp size={12} className="mr-1" /> 较上月 -2.1天
                  </span>
                </div>
                <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                  <Clock size={20} />
                </div>
              </div>
            </div>
            <div className="bg-white p-5 rounded-lg border border-gray-100 shadow-sm">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-xs text-gray-500 uppercase font-semibold">Offer 接受率</p>
                  <h3 className="text-2xl font-bold text-gray-800 mt-1">88.2%</h3>
                  <span className="text-xs text-red-500 flex items-center mt-1">
                    <TrendingUp size={12} className="mr-1 transform rotate-180" /> 较上月 -1.5%
                  </span>
                </div>
                <div className="p-2 bg-green-50 text-green-600 rounded-lg">
                  <UserCheck size={20} />
                </div>
              </div>
            </div>
            <div className="bg-white p-5 rounded-lg border border-gray-100 shadow-sm">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-xs text-gray-500 uppercase font-semibold">核心人才流失率</p>
                  <h3 className="text-2xl font-bold text-gray-800 mt-1">1.2%</h3>
                  <span className="text-xs text-green-500 flex items-center mt-1">
                    <TrendingUp size={12} className="mr-1 transform rotate-180" /> 低于警戒线 (5%)
                  </span>
                </div>
                <div className="p-2 bg-orange-50 text-orange-600 rounded-lg">
                  <AlertTriangle size={20} />
                </div>
              </div>
            </div>
            <div className="bg-white p-5 rounded-lg border border-gray-100 shadow-sm">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-xs text-gray-500 uppercase font-semibold">试用期转正率</p>
                  <h3 className="text-2xl font-bold text-gray-800 mt-1">96.5%</h3>
                  <span className="text-xs text-gray-400 mt-1">
                    本季度累计转正 45 人
                  </span>
                </div>
                <div className="p-2 bg-teal-50 text-teal-600 rounded-lg">
                  <Target size={20} />
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Chart 1: Recruitment Progress */}
            <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm">
              <h3 className="font-bold text-gray-800 mb-6 flex items-center">
                <Briefcase size={18} className="mr-2 text-blue-500" />
                各部门招聘达成情况 (Q2)
              </h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={hrbpRecruitmentData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                    <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                    <Tooltip cursor={{fill: '#f8fafc'}} contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                    <Bar dataKey="filled" stackId="a" fill="#3b82f6" name="已入职" radius={[0, 0, 4, 4]} barSize={32} />
                    <Bar dataKey="active" stackId="a" fill="#93c5fd" name="招聘中" radius={[4, 4, 0, 0]} barSize={32} />
                    <Bar dataKey="target" fill="#e2e8f0" name="目标HC" radius={[4, 4, 4, 4]} barSize={12} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Chart 2: Turnover Trend */}
            <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm">
              <h3 className="font-bold text-gray-800 mb-6 flex items-center">
                <Users size={18} className="mr-2 text-orange-500" />
                离职率月度趋势
              </h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={hrbpTurnoverData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                    <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b'}} domain={[0, 5]} unit="%" />
                    <Tooltip contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                    <Line type="monotone" dataKey="rate" stroke="#f97316" strokeWidth={3} dot={{r: 4, fill: '#f97316', strokeWidth: 2, stroke: '#fff'}} activeDot={{r: 6}} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* HRD View Content */}
      {role === 'HRD' && (
        <div className="animate-fade-in space-y-6">
          {/* Summary Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
             <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg p-6 text-white shadow-lg">
                <h3 className="text-purple-100 text-sm font-semibold mb-2">人力资本投资回报率 (HCROI)</h3>
                <div className="text-4xl font-bold mb-4">1 : 4.25</div>
                <div className="flex items-center text-sm text-purple-100">
                   <TrendingUp size={16} className="mr-2" />
                   同比去年增长 12.5%
                </div>
             </div>
             <div className="bg-white rounded-lg p-6 border border-gray-100 shadow-sm">
                <h3 className="text-gray-500 text-sm font-semibold mb-2">年度人力成本预算执行</h3>
                <div className="flex items-end mb-2">
                   <span className="text-3xl font-bold text-gray-800">4,250万</span>
                   <span className="text-sm text-gray-400 ml-2 mb-1">/ 9,800万</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2 mb-2">
                   <div className="bg-purple-600 h-2 rounded-full" style={{width: '43%'}}></div>
                </div>
                <p className="text-xs text-gray-500">Q2 结束，预算使用进度正常 (43%)</p>
             </div>
             <div className="bg-white rounded-lg p-6 border border-gray-100 shadow-sm">
                <h3 className="text-gray-500 text-sm font-semibold mb-2">关键岗位继任准备度</h3>
                <div className="flex items-center justify-between mt-2">
                   <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">85%</div>
                      <div className="text-xs text-gray-400">Ready Now</div>
                   </div>
                   <div className="w-px h-8 bg-gray-200"></div>
                   <div className="text-center">
                      <div className="text-2xl font-bold text-yellow-500">12%</div>
                      <div className="text-xs text-gray-400">1-2 Year</div>
                   </div>
                   <div className="w-px h-8 bg-gray-200"></div>
                   <div className="text-center">
                      <div className="text-2xl font-bold text-red-500">3%</div>
                      <div className="text-xs text-gray-400">Vacancy Risk</div>
                   </div>
                </div>
             </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
             {/* Chart 1: Total Headcount Trend */}
             <div className="lg:col-span-2 bg-white p-6 rounded-lg border border-gray-100 shadow-sm">
                <h3 className="font-bold text-gray-800 mb-6 flex items-center">
                   <Users size={18} className="mr-2 text-purple-600" />
                   总编制 vs 在职人数趋势
                </h3>
                <div className="h-80">
                   <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={hrdHeadcountTrend} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                        <defs>
                          <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#94a3b8'}} />
                        <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8'}} />
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                        <Tooltip contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                        <Area type="monotone" dataKey="total" stroke="#8b5cf6" fillOpacity={1} fill="url(#colorTotal)" name="在职人数" strokeWidth={3} />
                        <Area type="monotone" dataKey="budget" stroke="#cbd5e1" fill="transparent" strokeDasharray="5 5" name="预算编制" strokeWidth={2} />
                      </AreaChart>
                   </ResponsiveContainer>
                </div>
             </div>

             {/* Chart 2: Talent Density */}
             <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm">
                <h3 className="font-bold text-gray-800 mb-6 flex items-center">
                   <Target size={18} className="mr-2 text-green-600" />
                   人才密度分布
                </h3>
                <div className="h-60 relative">
                   <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={hrdTalentDensity}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={80}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {hrdTalentDensity.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                   </ResponsiveContainer>
                   <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                      <div className="text-3xl font-bold text-gray-800">15%</div>
                      <div className="text-xs text-gray-500">High Potential</div>
                   </div>
                </div>
                <div className="mt-4 space-y-2">
                   {hrdTalentDensity.map((item) => (
                     <div key={item.name} className="flex justify-between items-center text-sm">
                        <div className="flex items-center">
                           <div className="w-3 h-3 rounded-full mr-2" style={{backgroundColor: item.color}}></div>
                           <span className="text-gray-600">{item.name}</span>
                        </div>
                        <span className="font-medium text-gray-800">{item.value}%</span>
                     </div>
                   ))}
                </div>
             </div>
          </div>

          {/* Chart 3: Cost Structure */}
          <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm">
             <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-gray-800 flex items-center">
                   <DollarSign size={18} className="mr-2 text-blue-600" />
                   人力成本结构分析 (按部门)
                </h3>
                <button className="text-sm text-blue-600 hover:underline">查看明细 &gt;</button>
             </div>
             <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                   <BarChart data={hrdCostData} layout="vertical" margin={{ top: 5, right: 30, left: 40, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                      <XAxis type="number" axisLine={false} tickLine={false} tick={{fill: '#94a3b8'}} />
                      <YAxis dataKey="department" type="category" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontWeight: 600}} />
                      <Tooltip cursor={{fill: '#f8fafc'}} contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                      <Bar dataKey="salary" stackId="a" fill="#3b82f6" name="薪资支出" radius={[0, 0, 0, 0]} barSize={24} />
                      <Bar dataKey="benefits" stackId="a" fill="#10b981" name="福利社保" radius={[0, 0, 0, 0]} barSize={24} />
                      <Bar dataKey="training" stackId="a" fill="#f59e0b" name="培训发展" radius={[0, 4, 4, 0]} barSize={24} />
                   </BarChart>
                </ResponsiveContainer>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};