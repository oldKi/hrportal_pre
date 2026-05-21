import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowLeft, 
  User, 
  Phone, 
  Mail, 
  MapPin, 
  Briefcase, 
  GraduationCap, 
  Users, 
  ExternalLink, 
  Printer, 
  ShieldAlert, 
  Download, 
  Award, 
  Calendar,
  Building,
  Heart,
  Eye,
  EyeOff,
  Sparkles,
  Search,
  CheckCircle,
  Clock,
  ChevronRight,
  UserCheck,
  FileText,
  Layers
} from 'lucide-react';
import { MOCK_EMPLOYEE_DETAILS } from './employeeData';

export const EmployeeProfileDetails: React.FC<{ personId?: string; onBack: () => void }> = ({ personId, onBack }) => {
  // Fallback to the default profile (Zhang Xiaofeng, ID 10000) if personId is not found or not provided
  const person = (personId && MOCK_EMPLOYEE_DETAILS[personId]) || MOCK_EMPLOYEE_DETAILS['10000'];

  const [activeView, setActiveView] = useState<'modern' | 'table' | 'scan'>('modern');
  const [showWatermark, setShowWatermark] = useState(true);
  const [activeAnchor, setActiveAnchor] = useState('basic-info');

  const contentRef = useRef<HTMLDivElement>(null);

  // Auto-scroll anchor listener
  useEffect(() => {
    if (activeView !== 'modern') return;

    const handleScroll = () => {
      const sections = ['basic-info', 'performance', 'education', 'career', 'party', 'awards', 'contact', 'family'];
      const scrollPosition = window.scrollY + 150;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveAnchor(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeView]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const top = el.offsetTop - 100;
      window.scrollTo({ top, behavior: 'smooth' });
      setActiveAnchor(id);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  // Watermark CSS pattern
  const watermarkStyle = showWatermark ? {
    backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='280' height='180' viewBox='0 0 280 180'><text fill='%23005A9C' font-size='11' font-family='monospace' font-weight='bold' x='20' y='100' transform='rotate(-25 20 100)' opacity='0.08'>admin 1  2026-05-21 17:36  CONFIDENTIAL</text></svg>")`,
    backgroundRepeat: 'repeat',
  } : {};

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-24 font-sans antialiased text-slate-800 relative">
      {/* Watermark layer */}
      {showWatermark && (
        <div 
          className="fixed inset-0 pointer-events-none z-50 transition-opacity duration-300"
          style={watermarkStyle}
        />
      )}

      {/* Print styles */}
      <style dangerouslySetInnerHTML={{__html: `
        @media print {
          body {
            background-color: white !important;
            color: black !important;
          }
          header, footer, nav, button, .no-print {
            display: none !important;
          }
          main, .print-content {
            padding: 0 !important;
            margin: 0 !important;
            width: 100% !important;
            max-width: 100% !important;
            left: 0 !important;
            position: absolute !important;
            top: 0 !important;
          }
          .print-table {
            border-collapse: collapse !important;
            width: 100% !important;
            font-size: 11px !important;
          }
          .print-table th, .print-table td {
            border: 1px solid #000 !important;
            padding: 4px 6px !important;
          }
          .print-watermark {
            display: none !important;
          }
        }
      `}} />

      {/* Top Bar with actions (No Print) */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-100 shadow-sm no-print">
        <div className="flex items-center gap-3">
          <button 
            onClick={onBack} 
            className="flex items-center justify-center w-9 h-9 rounded-xl hover:bg-slate-100 text-slate-500 hover:text-slate-900 transition-all border border-slate-200/60"
          >
            <ArrowLeft size={18} />
          </button>
          <div>
            <h1 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              {person.name} 的个人档案 
              <span className="text-xs px-2.5 py-0.5 bg-blue-50 text-blue-600 rounded-full font-mono font-medium">工号: {person.id}</span>
            </h1>
            <p className="text-xs text-slate-400">系统数据最后同步时间：2026-05-21 16:30</p>
          </div>
        </div>

        {/* View Switches & Toggles */}
        <div className="flex flex-wrap items-center gap-2.5">
          <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200/50">
            <button
              onClick={() => setActiveView('modern')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeView === 'modern' 
                  ? 'bg-white text-blue-600 shadow-sm' 
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <Sparkles size={14} />
              SAP SF 现代版
            </button>
            <button
              onClick={() => setActiveView('table')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeView === 'table' 
                  ? 'bg-white text-blue-600 shadow-sm' 
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <FileText size={14} />
              大众干部表版
            </button>
            <button
              onClick={() => setActiveView('scan')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeView === 'scan' 
                  ? 'bg-white text-blue-600 shadow-sm' 
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <Layers size={14} />
              档案扫描件
            </button>
          </div>

          <div className="h-6 w-px bg-slate-200 hidden sm:block"></div>

          {/* Watermark Toggle */}
          <button
            onClick={() => setShowWatermark(!showWatermark)}
            className={`p-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 border border-slate-200/80 ${
              showWatermark 
                ? 'bg-blue-50 text-blue-600 border-blue-200/50' 
                : 'bg-white text-slate-500 hover:bg-slate-50'
            }`}
            title={showWatermark ? "隐藏机密水印" : "显示机密水印"}
          >
            {showWatermark ? <EyeOff size={16} /> : <Eye size={16} />}
            <span className="hidden sm:inline">水印</span>
          </button>

          {/* Print button */}
          <button
            onClick={handlePrint}
            className="px-3.5 py-2 bg-white hover:bg-slate-50 text-slate-700 hover:text-slate-900 border border-slate-200 rounded-xl text-xs font-bold transition-all shadow-sm flex items-center gap-1.5"
          >
            <Printer size={15} />
            <span>打印档案</span>
          </button>

          <a 
            href="https://hcm15preview.sapsf.cn/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="px-3.5 py-2 bg-[#0066b3] text-white hover:bg-[#005290] rounded-xl text-xs font-bold transition-all shadow-sm flex items-center gap-1.5"
          >
            <ExternalLink size={14} />
            <span>SF 原系统</span>
          </a>
        </div>
      </div>

      {/* Main Content Area */}
      <div ref={contentRef} className="print-content">
        
        {/* ==================== 1. MODERN SF PROFILE VIEW ==================== */}
        {activeView === 'modern' && (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
            
            {/* Left side anchor navigation */}
            <div className="lg:col-span-1 lg:sticky lg:top-20 space-y-4 no-print">
              <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm space-y-1">
                <p className="text-[10px] font-bold text-slate-400 px-3 uppercase tracking-wider mb-2">档案目录 / SECTIONS</p>
                {[
                  { id: 'basic-info', label: '基本信息', icon: <User size={15} /> },
                  { id: 'performance', label: '绩效记录', icon: <Award size={15} /> },
                  { id: 'education', label: '教育经历', icon: <GraduationCap size={15} /> },
                  { id: 'career', label: '工作履历', icon: <Briefcase size={15} /> },
                  { id: 'party', label: '党务经历', icon: <UserCheck size={15} /> },
                  { id: 'awards', label: '荣誉奖惩', icon: <Award size={15} /> },
                  { id: 'contact', label: '联系方式', icon: <Phone size={15} /> },
                  { id: 'family', label: '家庭成员', icon: <Users size={15} /> },
                ].map(item => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-bold transition-all text-left ${
                      activeAnchor === item.id 
                        ? 'bg-blue-50/60 text-blue-600' 
                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                    }`}
                  >
                    <span className={activeAnchor === item.id ? 'text-blue-600' : 'text-slate-400'}>{item.icon}</span>
                    {item.label}
                    {activeAnchor === item.id && (
                      <span className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></span>
                    )}
                  </button>
                ))}
              </div>

              {/* Status Alert Banner */}
              <div className="bg-amber-50/50 border border-amber-200/50 p-4 rounded-2xl space-y-2">
                <div className="flex gap-2 text-amber-800">
                  <ShieldAlert size={18} className="shrink-0 mt-0.5" />
                  <p className="text-xs font-bold">机密安全说明</p>
                </div>
                <p className="text-[11px] text-amber-700 leading-relaxed">
                  本档案包含敏感组织人事数据。根据合规管理要求，您在此处的浏览、打印、导出均会产生安全审计日志。请妥善保管。
                </p>
              </div>
            </div>

            {/* Right side detailed profile */}
            <div className="lg:col-span-3 space-y-6">
              
              {/* Header Profile Card */}
              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden relative">
                <div className="h-28 bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 relative overflow-hidden">
                  <div className="absolute inset-0 opacity-15" style={{
                    backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
                    backgroundSize: '16px 16px'
                  }} />
                  {/* Decorative Glass Circle */}
                  <div className="absolute -right-10 -top-10 w-40 h-40 rounded-full bg-white/10 blur-xl"></div>
                </div>

                <div className="px-6 pb-6 relative flex flex-col sm:flex-row gap-5 items-start sm:items-center -mt-10">
                  <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-md bg-slate-100 shrink-0">
                    <img 
                      src={person.avatar || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200&h=200"} 
                      alt={person.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1 space-y-2 mt-8 sm:mt-10">
                    <div className="flex flex-wrap items-center gap-3">
                      <h2 className="text-2xl font-bold text-slate-900">{person.name}</h2>
                      {person.enName && <span className="text-slate-400 font-medium font-sans">({person.enName})</span>}
                      
                      {/* Political Status & Manager Badges */}
                      {person.politicalStatus && (
                        <span className="px-2 py-0.5 bg-red-50 text-red-600 rounded-md text-[10px] font-bold border border-red-100">
                          {person.politicalStatus}
                        </span>
                      )}
                      <span className="px-2 py-0.5 bg-blue-50 text-blue-600 rounded-md text-[10px] font-bold border border-blue-100">
                        部门经理
                      </span>
                    </div>

                    <p className="text-xs text-slate-500 font-medium flex items-center gap-2 flex-wrap">
                      <span className="flex items-center gap-1"><Building size={13} className="text-slate-400" /> {person.dept}</span>
                      <span className="text-slate-300">|</span>
                      <span className="flex items-center gap-1"><Briefcase size={13} className="text-slate-400" /> {person.position}</span>
                    </p>
                  </div>

                  <div className="sm:self-end flex gap-2 w-full sm:w-auto mt-4 sm:mt-0">
                    <button className="flex-1 sm:flex-none px-4 py-2 border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl text-xs font-bold transition-all shadow-sm">
                      编辑档案
                    </button>
                    <button className="flex-1 sm:flex-none px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-all shadow-sm">
                      智能生成总结
                    </button>
                  </div>
                </div>
              </div>

              {/* Basic Info Section */}
              <div id="basic-info" className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4">
                <h3 className="text-sm font-black text-slate-900 border-l-4 border-blue-500 pl-3 uppercase tracking-wider">
                  基本信息 / Basic Info
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs leading-relaxed">
                  <div className="space-y-1">
                    <p className="text-slate-400">工号 ID</p>
                    <p className="font-bold text-slate-800">{person.id}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-slate-400">性别 Gender</p>
                    <p className="font-bold text-slate-800">{person.gender || '男'}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-slate-400">出生日期 Date of Birth</p>
                    <p className="font-bold text-slate-800">{person.dob || '1992-01-09'}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-slate-400">民族 Ethnicity</p>
                    <p className="font-bold text-slate-800">{person.ethnicity || '汉族'}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-slate-400">籍贯 Native Place</p>
                    <p className="font-bold text-slate-800">{person.nativePlace || '江苏苏州'}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-slate-400">出生地 Place of Birth</p>
                    <p className="font-bold text-slate-800">{person.birthplace || '上海'}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-slate-400">婚姻状况 Marital Status</p>
                    <p className="font-bold text-slate-800">{person.maritalStatus || '已婚'}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-slate-400">参加工作时间 Started Work Date</p>
                    <p className="font-bold text-slate-800">{person.startWorkDate || '2017-07-20'}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-slate-400">专业技术职称 Professional Title</p>
                    <p className="font-bold text-slate-800">{person.title || '工程师'}</p>
                  </div>
                </div>
              </div>

              {/* Performance History Section */}
              <div id="performance" className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4">
                <h3 className="text-sm font-black text-slate-900 border-l-4 border-blue-500 pl-3 uppercase tracking-wider">
                  绩效记录 / Performance
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {[
                    { year: '2024 年度', score: person.perf2024 || 'A', bg: 'bg-emerald-50/50 border-emerald-100', text: 'text-emerald-700' },
                    { year: '2023 年度', score: person.perf2023 || 'A', bg: 'bg-emerald-50/50 border-emerald-100', text: 'text-emerald-700' },
                    { year: '2022 年度', score: person.perf2022 || 'B', bg: 'bg-amber-50/30 border-amber-100', text: 'text-amber-700' }
                  ].map((perf, index) => (
                    <div key={index} className={`p-4 rounded-xl border flex items-center justify-between ${perf.bg}`}>
                      <div>
                        <p className="text-[10px] font-bold text-slate-400">{perf.year}</p>
                        <p className="text-[11px] text-slate-500 mt-1">综合考核等级</p>
                      </div>
                      <div className="w-12 h-12 rounded-xl bg-white border border-slate-100 flex items-center justify-center shadow-sm">
                        <span className={`text-xl font-black ${perf.text}`}>{perf.score}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Education Background Section */}
              <div id="education" className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4">
                <h3 className="text-sm font-black text-slate-900 border-l-4 border-blue-500 pl-3 uppercase tracking-wider">
                  教育经历 / Education
                </h3>
                
                <div className="space-y-4">
                  {person.education?.map((edu, idx) => (
                    <div key={idx} className="flex gap-4 p-4 rounded-xl hover:bg-slate-50/80 transition-colors border border-slate-50">
                      <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center shrink-0 text-slate-500">
                        <GraduationCap size={20} />
                      </div>
                      <div className="flex-1 min-w-0 grid grid-cols-1 md:grid-cols-3 gap-2">
                        <div className="md:col-span-2">
                          <p className="text-xs font-bold text-slate-800 flex items-center gap-2">
                            {edu.school}
                            {edu.pathway && (
                              <span className={`px-1.5 py-0.5 rounded text-[9px] font-extrabold ${
                                edu.pathway === '全日制' 
                                  ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' 
                                  : 'bg-indigo-50 text-indigo-600 border border-indigo-100'
                              }`}>
                                {edu.pathway}
                              </span>
                            )}
                          </p>
                          <p className="text-[11px] text-slate-500 mt-1">专业：{edu.major} | 学位：{edu.degree}</p>
                        </div>
                        <div className="md:text-right space-y-0.5">
                          <p className="text-[10px] font-bold text-slate-400 flex items-center md:justify-end gap-1.5">
                            <Calendar size={11} /> {edu.time}
                          </p>
                          {edu.role && edu.role !== '无' && (
                            <p className="text-[10px] text-slate-500 font-bold">校内职务：{edu.role}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Career Timeline Section */}
              <div id="career" className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-6">
                <h3 className="text-sm font-black text-slate-900 border-l-4 border-blue-500 pl-3 uppercase tracking-wider">
                  工作履历 / Career Timeline
                </h3>

                <div className="relative pl-6 space-y-6 before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-slate-100">
                  {person.workHistory?.map((work, idx) => (
                    <div key={idx} className="relative">
                      {/* Bullet */}
                      <span className={`absolute -left-[20px] top-1.5 w-3 h-3 rounded-full border-2 border-white ring-2 ${
                        idx === person.workHistory!.length - 1 
                          ? 'bg-blue-600 ring-blue-100 animate-pulse' 
                          : 'bg-slate-400 ring-slate-100'
                      }`}></span>

                      <div className="p-4 rounded-xl border border-slate-50 bg-slate-50/30 hover:bg-slate-50/80 transition-all">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                          <p className="text-xs font-bold text-slate-800">{work.company}</p>
                          <span className="text-[10px] font-bold text-slate-400 font-mono flex items-center gap-1.5">
                            <Calendar size={11} /> {work.time}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-600 font-medium">
                          {work.dept ? `${work.dept} — ` : ''} {work.position}
                        </p>
                        
                        {/* Highlights (e.g. 挂职助理) */}
                        {work.note && (
                          <div className="mt-3 p-3 bg-amber-50/50 border border-amber-100 rounded-lg text-[10px] text-amber-800 leading-relaxed font-medium">
                            <span className="font-bold text-amber-900 mr-1.5">干部交流/挂职:</span>
                            {work.note}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Party Work Experience Section */}
              <div id="party" className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4">
                <h3 className="text-sm font-black text-slate-900 border-l-4 border-blue-500 pl-3 uppercase tracking-wider">
                  党务经历 / Party Work Experience
                </h3>

                {person.partyWorkHistory && person.partyWorkHistory.length > 0 ? (
                  <div className="space-y-3">
                    {person.partyWorkHistory.map((party, idx) => (
                      <div key={idx} className="flex gap-4 p-4 rounded-xl border border-red-50 bg-red-50/10">
                        <div className="w-10 h-10 rounded-full bg-red-50 text-red-600 flex items-center justify-center shrink-0">
                          <UserCheck size={18} />
                        </div>
                        <div className="flex-1 min-w-0 grid grid-cols-1 md:grid-cols-3 gap-2">
                          <div className="md:col-span-2">
                            <p className="text-xs font-bold text-slate-800">{party.dept}</p>
                            <p className="text-[11px] text-slate-500 mt-1">党内职务：{party.position}</p>
                          </div>
                          <div className="md:text-right">
                            <p className="text-[10px] font-bold text-slate-400 font-mono mt-0.5">{party.time}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-6 border border-dashed border-slate-200 rounded-xl">
                    <p className="text-xs text-slate-400 font-medium">暂无党务工作经历数据记录</p>
                  </div>
                )}
              </div>

              {/* Awards and Punishments Section */}
              <div id="awards" className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4">
                <h3 className="text-sm font-black text-slate-900 border-l-4 border-blue-500 pl-3 uppercase tracking-wider">
                  荣誉奖惩 / Awards & Punishments
                </h3>

                {person.awardsPunishments && person.awardsPunishments.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {person.awardsPunishments.map((award, idx) => (
                      <div key={idx} className="p-4 rounded-xl border border-amber-100 bg-amber-50/20 flex gap-3.5 items-start">
                        <div className="p-2 bg-amber-100 text-amber-700 rounded-lg shrink-0">
                          <Award size={20} />
                        </div>
                        <div className="space-y-1">
                          <span className="px-1.5 py-0.5 bg-amber-100 text-amber-800 rounded text-[9px] font-bold">
                            {award.category}
                          </span>
                          <p className="text-xs font-bold text-slate-800 mt-1.5">{award.project}</p>
                          <p className="text-[10px] text-slate-400">颁奖单位：{award.org}</p>
                          <p className="text-[10px] font-bold text-slate-500 font-mono mt-1">获奖时间：{award.date} 年</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-6 border border-dashed border-slate-200 rounded-xl">
                    <p className="text-xs text-slate-400 font-medium">暂无奖惩信息记录</p>
                  </div>
                )}
              </div>

              {/* Contact Information Section */}
              <div id="contact" className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4">
                <h3 className="text-sm font-black text-slate-900 border-l-4 border-blue-500 pl-3 uppercase tracking-wider">
                  联系方式 / Contact Info
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div className="flex items-center gap-3 p-3 rounded-xl border border-slate-50 bg-slate-50/20">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                      <Phone size={16} />
                    </div>
                    <div>
                      <p className="text-slate-400 text-[10px]">手机号码 Phone</p>
                      <p className="font-bold text-slate-800 mt-0.5">{person.phone}</p>
                    </div>
                    {person.phoneShort && (
                      <div className="ml-auto bg-slate-100 px-2 py-0.5 rounded font-mono text-[10px] font-bold text-slate-600">
                        短号: {person.phoneShort}
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 rounded-xl border border-slate-50 bg-slate-50/20">
                    <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                      <Mail size={16} />
                    </div>
                    <div>
                      <p className="text-slate-400 text-[10px]">公司邮箱 Email</p>
                      <p className="font-bold text-slate-800 mt-0.5">{person.email}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 rounded-xl border border-slate-50 bg-slate-50/20 md:col-span-2">
                    <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                      <MapPin size={16} />
                    </div>
                    <div>
                      <p className="text-slate-400 text-[10px]">家庭住址 Home Address</p>
                      <p className="font-bold text-slate-800 mt-0.5">{person.homeAddress || '上海市嘉定区于田路7号'}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Family Members Section */}
              <div id="family" className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4">
                <h3 className="text-sm font-black text-slate-900 border-l-4 border-blue-500 pl-3 uppercase tracking-wider">
                  家庭成员 / Family
                </h3>

                <div className="overflow-x-auto rounded-xl border border-slate-100">
                  <table className="w-full text-xs text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-50 text-slate-500 font-bold border-b border-slate-100">
                        <th className="px-4 py-3">称谓</th>
                        <th className="px-4 py-3">姓名</th>
                        <th className="px-4 py-3">出生年月</th>
                        <th className="px-4 py-3">政治面貌</th>
                        <th className="px-4 py-3">工作单位及职务</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50 text-slate-700 font-medium">
                      {person.family?.map((fam, index) => (
                        <tr key={index} className="hover:bg-slate-50/50 transition-colors">
                          <td className="px-4 py-3 font-bold text-slate-900">{fam.relation}</td>
                          <td className="px-4 py-3">{fam.name}</td>
                          <td className="px-4 py-3 font-mono">{fam.birth}</td>
                          <td className="px-4 py-3">
                            <span className={`px-1.5 py-0.5 rounded text-[10px] ${
                              fam.political === '中共党员' 
                                ? 'bg-red-50 text-red-600 font-bold' 
                                : 'text-slate-600'
                            }`}>
                              {fam.political}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-slate-500">{fam.job}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* ==================== 2. TRADITIONAL VW CADRE TABLE VIEW ==================== */}
        {activeView === 'table' && (
          <div className="bg-white p-8 border border-slate-200 shadow-md rounded-2xl max-w-4xl mx-auto overflow-x-auto">
            {/* SAIC-VW Official Cadre Basic Info Layout */}
            <div className="w-[780px] mx-auto text-black">
              {/* Header */}
              <div className="flex justify-between items-end pb-3 mb-4 border-b-2 border-black">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 border border-slate-200 rounded flex items-center justify-center bg-white shadow-sm p-1">
                    <img 
                      src="https://brand2.svw-volkswagen.com/temp/2024/240624_loading%403X.gif?x-oss-process=style/webp" 
                      alt="Logo" 
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold tracking-widest text-slate-900">上汽大众经理基本信息表</h2>
                    <p className="text-[9px] font-mono text-slate-500 leading-none">SAIC VOLKSWAGEN MANAGER PROFILE SHEET</p>
                  </div>
                </div>
                <div className="text-right text-xs">
                  <p className="font-bold">机密/Confidential</p>
                  <p className="text-[10px] text-slate-500">归档号: SVW-HR-P-{person.id}</p>
                </div>
              </div>

              {/* Table Grid (9 columns total) */}
              <table className="w-full border-collapse border border-black text-xs">
                <tbody>
                  {/* Row 1: Basic Info Block */}
                  <tr>
                    <td className="border border-black bg-slate-100/80 px-2 py-3 text-center font-bold w-[90px]">姓　　名</td>
                    <td className="border border-black px-3 py-3 text-center font-semibold w-[100px]">{person.name}</td>
                    <td className="border border-black bg-slate-100/80 px-2 py-3 text-center font-bold w-[80px]">工　　号</td>
                    <td className="border border-black px-3 py-3 text-center font-mono w-[100px]">{person.id}</td>
                    <td className="border border-black bg-slate-100/80 px-2 py-3 text-center font-bold w-[80px]">性　　别</td>
                    <td className="border border-black px-3 py-3 text-center w-[80px]">{person.gender || '男'}</td>
                    {/* Photo cell spanning 3 columns, 4 rows */}
                    <td rowSpan={4} colSpan={3} className="border border-black p-1 text-center w-[150px] align-middle">
                      <div className="w-[120px] h-[135px] border border-dashed border-slate-300 mx-auto flex items-center justify-center bg-slate-50 overflow-hidden">
                        {person.avatar ? (
                          <img src={person.avatar} alt="Photo" className="w-full h-full object-cover" />
                        ) : (
                          <span className="text-[10px] text-slate-400">一寸白底照片</span>
                        )}
                      </div>
                    </td>
                  </tr>

                  {/* Row 2 */}
                  <tr>
                    <td className="border border-black bg-slate-100/80 px-2 py-3 text-center font-bold">出生日期</td>
                    <td className="border border-black px-3 py-3 text-center font-mono">{person.dob || '1992/01/09'}</td>
                    <td className="border border-black bg-slate-100/80 px-2 py-3 text-center font-bold">民　　族</td>
                    <td className="border border-black px-3 py-3 text-center">{person.ethnicity || '汉族'}</td>
                    <td className="border border-black bg-slate-100/80 px-2 py-3 text-center font-bold">籍　　贯</td>
                    <td className="border border-black px-3 py-3 text-center">{person.nativePlace || '江苏苏州'}</td>
                  </tr>

                  {/* Row 3 */}
                  <tr>
                    <td className="border border-black bg-slate-100/80 px-2 py-3 text-center font-bold">政治面貌</td>
                    <td className="border border-black px-3 py-3 text-center text-blue-800 font-bold">{person.politicalStatus || '中共党员'}</td>
                    <td className="border border-black bg-slate-100/80 px-2 py-3 text-center font-bold">入党年月</td>
                    <td className="border border-black px-3 py-3 text-center font-mono text-blue-800 font-bold">{person.joinPartyDate || '2020/06'}</td>
                    <td className="border border-black bg-slate-100/80 px-2 py-3 text-center font-bold">出 生 地</td>
                    <td className="border border-black px-3 py-3 text-center">{person.birthplace || '上海'}</td>
                  </tr>

                  {/* Row 4 */}
                  <tr>
                    <td className="border border-black bg-slate-100/80 px-2 py-3 text-center font-bold">婚姻状况</td>
                    <td className="border border-black px-3 py-3 text-center">{person.maritalStatus || '已婚'}</td>
                    <td className="border border-black bg-slate-100/80 px-2 py-3 text-center font-bold">参加工作</td>
                    <td className="border border-black px-3 py-3 text-center font-mono">{person.startWorkDate || '2017/07/20'}</td>
                    <td className="border border-black bg-slate-100/80 px-2 py-3 text-center font-bold">职　　称</td>
                    <td className="border border-black px-3 py-3 text-center">{person.title || '工程师'}</td>
                  </tr>

                  {/* Row 5 */}
                  <tr>
                    <td className="border border-black bg-slate-100/80 px-2 py-3 text-center font-bold">现任岗位</td>
                    <td colSpan={8} className="border border-black px-4 py-3 text-left font-bold">{person.position}</td>
                  </tr>

                  {/* Row 6: Performance */}
                  <tr>
                    <td className="border border-black bg-slate-100/80 px-2 py-3 text-center font-bold">2024绩效</td>
                    <td className="border border-black px-3 py-3 text-center font-mono font-bold text-lg">{person.perf2024 || 'A'}</td>
                    <td className="border border-black bg-slate-100/80 px-2 py-3 text-center font-bold">2023绩效</td>
                    <td className="border border-black px-3 py-3 text-center font-mono font-bold text-lg">{person.perf2023 || 'A'}</td>
                    <td className="border border-black bg-slate-100/80 px-2 py-3 text-center font-bold">2022绩效</td>
                    <td colSpan={4} className="border border-black px-3 py-3 text-center font-mono font-bold text-lg">{person.perf2022 || 'B'}</td>
                  </tr>

                  {/* Row 7: Education */}
                  <tr>
                    <td className="border border-black bg-slate-100/80 px-2 py-6 text-center font-bold align-middle w-[90px] leading-tight">
                      教　育<br/>信　息
                    </td>
                    <td colSpan={8} className="border border-black p-0">
                      <table className="w-full border-none text-[11px] text-center border-collapse">
                        <thead>
                          <tr className="bg-slate-50 font-bold border-b border-black">
                            <td className="border-r border-black py-2 w-[80px]">开始时间</td>
                            <td className="border-r border-black py-2 w-[80px]">结束时间</td>
                            <td className="border-r border-black py-2 w-[85px]">学历途径</td>
                            <td className="border-r border-black py-2 w-[140px]">毕业院校</td>
                            <td className="border-r border-black py-2 w-[120px]">专业</td>
                            <td className="border-r border-black py-2 w-[70px]">学历</td>
                            <td className="border-r border-black py-2 w-[70px]">学位</td>
                            <td className="py-2">担任职务</td>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-black">
                          {person.education?.map((edu, idx) => (
                            <tr key={idx}>
                              <td className="border-r border-black py-2 font-mono">{edu.time.split(' - ')[0]}</td>
                              <td className="border-r border-black py-2 font-mono">{edu.time.split(' - ')[1]}</td>
                              <td className="border-r border-black py-2">{edu.pathway || '全日制'}</td>
                              <td className="border-r border-black py-2 text-left px-2 font-bold">{edu.school}</td>
                              <td className="border-r border-black py-2 text-left px-2">{edu.major}</td>
                              <td className="border-r border-black py-2">{edu.degree.split(' / ')[0] || edu.degree}</td>
                              <td className="border-r border-black py-2">{edu.degree.split(' / ')[1] || edu.degree}</td>
                              <td className="py-2 text-slate-600">{edu.role || '--'}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </td>
                  </tr>

                  {/* Row 8: Work History */}
                  <tr>
                    <td className="border border-black bg-slate-100/80 px-2 py-10 text-center font-bold align-middle leading-tight">
                      履　历<br/>信　息
                    </td>
                    <td colSpan={8} className="border border-black p-0">
                      <table className="w-full border-none text-[11px] text-left border-collapse">
                        <thead>
                          <tr className="bg-slate-50 font-bold border-b border-black text-center">
                            <td className="border-r border-black py-2 w-[80px]">开始时间</td>
                            <td className="border-r border-black py-2 w-[80px]">结束时间</td>
                            <td className="border-r border-black py-2 w-[340px]">工作单位及部门</td>
                            <td className="py-2">职务</td>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-black">
                          {person.workHistory?.map((work, idx) => (
                            <tr key={idx}>
                              <td className="border-r border-black py-2 text-center font-mono">{work.time.split(' - ')[0]}</td>
                              <td className="border-r border-black py-2 text-center font-mono">{work.time.split(' - ')[1] || '至今'}</td>
                              <td className="border-r border-black py-2 px-3 font-semibold">
                                {work.company} {work.dept ? ` / ${work.dept}` : ''}
                                {work.note && (
                                  <div className="text-[10px] text-blue-900 font-normal italic mt-0.5 bg-blue-50/50 p-1 border border-blue-100/30 rounded">
                                    【{work.note}】
                                  </div>
                                )}
                              </td>
                              <td className="py-2 px-3 font-bold">{work.position}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </td>
                  </tr>

                  {/* Row 9: Party Work Experience */}
                  <tr>
                    <td className="border border-black bg-slate-100/80 px-2 py-4 text-center font-bold align-middle leading-tight">
                      党　务<br/>工　作<br/>经　历
                    </td>
                    <td colSpan={8} className="border border-black p-0">
                      {person.partyWorkHistory && person.partyWorkHistory.length > 0 ? (
                        <table className="w-full border-none text-[11px] text-left border-collapse">
                          <tbody>
                            {person.partyWorkHistory.map((party, idx) => (
                              <tr key={idx} className={idx > 0 ? "border-t border-black" : ""}>
                                <td className="py-2.5 px-3 w-[160px] font-mono text-center border-r border-black">{party.time}</td>
                                <td className="py-2.5 px-3 w-[340px] border-r border-black font-semibold">{party.dept}</td>
                                <td className="py-2.5 px-3 font-bold">{party.position}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      ) : (
                        <div className="py-3 text-center text-slate-400 italic">无党务工作经历记录</div>
                      )}
                    </td>
                  </tr>

                  {/* Row 10: Awards & Punishments */}
                  <tr>
                    <td className="border border-black bg-slate-100/80 px-2 py-4 text-center font-bold align-middle leading-tight">
                      奖　惩<br/>情　况
                    </td>
                    <td colSpan={8} className="border border-black p-0">
                      {person.awardsPunishments && person.awardsPunishments.length > 0 ? (
                        <table className="w-full border-none text-[11px] text-center border-collapse">
                          <thead>
                            <tr className="bg-slate-50 font-bold border-b border-black">
                              <td className="border-r border-black py-2 w-[120px]">日期</td>
                              <td className="border-r border-black py-2 w-[280px]">奖惩项目</td>
                              <td className="border-r border-black py-2 w-[100px]">类别</td>
                              <td className="py-2">奖惩单位</td>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-black">
                            {person.awardsPunishments.map((award, idx) => (
                              <tr key={idx}>
                                <td className="border-r border-black py-2 font-mono">{award.date} 年</td>
                                <td className="border-r border-black py-2 px-3 text-left font-bold">{award.project}</td>
                                <td className="border-r border-black py-2">{award.category}</td>
                                <td className="py-2 text-left px-3">{award.org}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      ) : (
                        <div className="py-3 text-center text-slate-400 italic">无奖惩记录记录</div>
                      )}
                    </td>
                  </tr>

                  {/* Row 11: Contact info */}
                  <tr>
                    <td className="border border-black bg-slate-100/80 px-2 py-3 text-center font-bold align-middle leading-tight">
                      联　系<br/>方　式
                    </td>
                    <td colSpan={8} className="border border-black p-0">
                      <div className="grid grid-cols-8 text-[11px] leading-relaxed">
                        <div className="col-span-1 bg-slate-100/80 px-2 py-2.5 text-center font-bold border-r border-b border-black">手机号码</div>
                        <div className="col-span-3 px-3 py-2.5 font-mono border-r border-b border-black font-semibold">{person.phone}</div>
                        <div className="col-span-1 bg-slate-100/80 px-2 py-2.5 text-center font-bold border-r border-b border-black">手机短号</div>
                        <div className="col-span-3 px-3 py-2.5 font-mono border-b border-black font-semibold">{person.phoneShort || '暂无'}</div>
                        
                        <div className="col-span-1 bg-slate-100/80 px-2 py-2.5 text-center font-bold border-r border-black">家庭住址</div>
                        <div className="col-span-7 px-3 py-2.5 font-semibold">{person.homeAddress || '上海市嘉定区于田路7号'}</div>
                      </div>
                    </td>
                  </tr>

                  {/* Row 12: Family members */}
                  <tr>
                    <td className="border border-black bg-slate-100/80 px-2 py-8 text-center font-bold align-middle leading-tight">
                      家　族<br/>成　员<br/>基　本<br/>信　息
                    </td>
                    <td colSpan={8} className="border border-black p-0">
                      <table className="w-full border-none text-[11px] text-center border-collapse">
                        <thead>
                          <tr className="bg-slate-50 font-bold border-b border-black">
                            <td className="border-r border-black py-2 w-[70px]">称谓</td>
                            <td className="border-r border-black py-2 w-[100px]">姓名</td>
                            <td className="border-r border-black py-2 w-[110px]">出生年月</td>
                            <td className="border-r border-black py-2 w-[100px]">政治面貌</td>
                            <td className="py-2">工作单位及职务</td>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-black">
                          {person.family?.map((fam, idx) => (
                            <tr key={idx}>
                              <td className="border-r border-black py-2 font-bold">{fam.relation}</td>
                              <td className="border-r border-black py-2 font-bold">{fam.name}</td>
                              <td className="border-r border-black py-2 font-mono">{fam.birth}</td>
                              <td className="border-r border-black py-2">{fam.political}</td>
                              <td className="py-2 text-left px-3">{fam.job}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>

              {/* Table Footer */}
              <div className="flex justify-between items-center text-[10px] text-slate-400 mt-4 font-mono">
                <p>上汽大众汽车有限公司人力资源部印制</p>
                <p>报表生成流水号: SVW-REP-20260521-{(Math.random()*100000).toFixed(0)}</p>
              </div>
            </div>
          </div>
        )}

        {/* ==================== 3. DOCUMENT SCAN/SCREENSHOT VIEW ==================== */}
        {activeView === 'scan' && (
          <div className="flex items-center justify-center p-8 bg-slate-800/90 rounded-2xl border border-slate-700/80 shadow-inner max-w-4xl mx-auto overflow-hidden">
            {/* 3D Container styling */}
            <div 
              className="bg-white border-8 border-white shadow-2xl relative transition-transform duration-500 scale-95 origin-center select-none"
              style={{
                transform: 'rotate(-0.8deg) translateY(2px)',
                backgroundImage: 'radial-gradient(rgba(0,0,0,0.01) 15%, transparent 16%)',
                backgroundSize: '4px 4px',
              }}
            >
              {/* Paper overlay textures */}
              <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/5 via-transparent to-slate-500/5 pointer-events-none z-10 mix-blend-overlay"></div>
              
              {/* Faded copy machine noise */}
              <div className="absolute inset-0 bg-repeat opacity-[0.03] pointer-events-none z-10" style={{
                backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100'><filter id='noise'><feTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/></filter><rect width='100' height='100' filter='url(%23noise)'/></svg>")`
              }} />

              {/* Confidential red round stamp */}
              <div className="absolute top-20 right-32 z-20 opacity-60 pointer-events-none transform rotate-12 border-4 border-red-600/80 text-red-600/80 rounded-full w-24 h-24 flex flex-col items-center justify-center font-bold tracking-wider text-[11px] leading-tight uppercase font-mono">
                <div className="border-b border-red-600/60 pb-0.5">SVW-HR</div>
                <div className="font-extrabold text-[12px] my-0.5">机密件</div>
                <div className="border-t border-red-600/60 pt-0.5 text-[9px]">CONFIDENTIAL</div>
              </div>

              {/* Slight vignette or edge shadow */}
              <div className="absolute inset-0 shadow-[inset_0_0_15px_rgba(0,0,0,0.1)] pointer-events-none z-15"></div>

              {/* Render the traditional VW Cadre table inside */}
              <div className="p-8 scale-[0.96] origin-top bg-white select-none">
                <div className="w-[780px] mx-auto text-black">
                  {/* Header */}
                  <div className="flex justify-between items-end pb-3 mb-4 border-b-2 border-black">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 border border-slate-300 rounded flex items-center justify-center bg-white shadow-sm p-1">
                        <img 
                          src="https://brand2.svw-volkswagen.com/temp/2024/240624_loading%403X.gif?x-oss-process=style/webp" 
                          alt="Logo" 
                          className="max-h-full max-w-full object-contain filter grayscale contrast-125"
                        />
                      </div>
                      <div>
                        <h2 className="text-xl font-bold tracking-widest text-slate-800">上汽大众经理基本信息表</h2>
                        <p className="text-[9px] font-mono text-slate-500 leading-none">SAIC VOLKSWAGEN MANAGER PROFILE SHEET (SCAN)</p>
                      </div>
                    </div>
                    <div className="text-right text-xs">
                      <p className="font-bold text-slate-700">机密/Confidential</p>
                      <p className="text-[10px] text-slate-500 font-mono">档案扫描编号: SC-SVW-{person.id}-001</p>
                    </div>
                  </div>

                  {/* Grid Table */}
                  <table className="w-full border-collapse border border-slate-700 text-xs filter contrast-125 saturate-50">
                    <tbody>
                      <tr>
                        <td className="border border-slate-700 bg-slate-50 px-2 py-3 text-center font-bold w-[90px]">姓　　名</td>
                        <td className="border border-slate-700 px-3 py-3 text-center font-bold w-[100px] text-slate-700">{person.name}</td>
                        <td className="border border-slate-700 bg-slate-50 px-2 py-3 text-center font-bold w-[80px]">工　　号</td>
                        <td className="border border-slate-700 px-3 py-3 text-center font-mono w-[100px]">{person.id}</td>
                        <td className="border border-slate-700 bg-slate-50 px-2 py-3 text-center font-bold w-[80px]">性　　别</td>
                        <td className="border border-slate-700 px-3 py-3 text-center w-[80px]">{person.gender || '男'}</td>
                        <td rowSpan={4} colSpan={3} className="border border-slate-700 p-1 text-center w-[150px] align-middle bg-slate-50">
                          <div className="w-[110px] h-[125px] border border-slate-400 mx-auto flex items-center justify-center overflow-hidden bg-white">
                            {person.avatar ? (
                              <img src={person.avatar} alt="Photo" className="w-full h-full object-cover filter grayscale contrast-125 saturate-50" />
                            ) : (
                              <span className="text-[10px] text-slate-400">照片照片</span>
                            )}
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td className="border border-slate-700 bg-slate-50 px-2 py-3 text-center font-bold">出生日期</td>
                        <td className="border border-slate-700 px-3 py-3 text-center font-mono">{person.dob || '1992/01/09'}</td>
                        <td className="border border-slate-700 bg-slate-50 px-2 py-3 text-center font-bold">民　　族</td>
                        <td className="border border-slate-700 px-3 py-3 text-center">{person.ethnicity || '汉族'}</td>
                        <td className="border border-slate-700 bg-slate-50 px-2 py-3 text-center font-bold">籍　　贯</td>
                        <td className="border border-slate-700 px-3 py-3 text-center">{person.nativePlace || '江苏苏州'}</td>
                      </tr>
                      <tr>
                        <td className="border border-slate-700 bg-slate-50 px-2 py-3 text-center font-bold">政治面貌</td>
                        <td className="border border-slate-700 px-3 py-3 text-center text-slate-700 font-bold">{person.politicalStatus || '中共党员'}</td>
                        <td className="border border-slate-700 bg-slate-50 px-2 py-3 text-center font-bold">入党年月</td>
                        <td className="border border-slate-700 px-3 py-3 text-center font-mono text-slate-700 font-bold">{person.joinPartyDate || '2020/06'}</td>
                        <td className="border border-slate-700 bg-slate-50 px-2 py-3 text-center font-bold">出 生 地</td>
                        <td className="border border-slate-700 px-3 py-3 text-center">{person.birthplace || '上海'}</td>
                      </tr>
                      <tr>
                        <td className="border border-slate-700 bg-slate-50 px-2 py-3 text-center font-bold">婚姻状况</td>
                        <td className="border border-slate-700 px-3 py-3 text-center">{person.maritalStatus || '已婚'}</td>
                        <td className="border border-slate-700 bg-slate-50 px-2 py-3 text-center font-bold">参加工作</td>
                        <td className="border border-slate-700 px-3 py-3 text-center font-mono">{person.startWorkDate || '2017/07/20'}</td>
                        <td className="border border-slate-700 bg-slate-50 px-2 py-3 text-center font-bold">职　　称</td>
                        <td className="border border-slate-700 px-3 py-3 text-center">{person.title || '工程师'}</td>
                      </tr>
                      <tr>
                        <td className="border border-slate-700 bg-slate-50 px-2 py-3 text-center font-bold">现任岗位</td>
                        <td colSpan={8} className="border border-slate-700 px-4 py-3 text-left font-bold">{person.position}</td>
                      </tr>
                      <tr>
                        <td className="border border-slate-700 bg-slate-50 px-2 py-3 text-center font-bold">2024绩效</td>
                        <td className="border border-slate-700 px-3 py-3 text-center font-mono font-bold text-lg">{person.perf2024 || 'A'}</td>
                        <td className="border border-slate-700 bg-slate-50 px-2 py-3 text-center font-bold">2023绩效</td>
                        <td className="border border-slate-700 px-3 py-3 text-center font-mono font-bold text-lg">{person.perf2023 || 'A'}</td>
                        <td className="border border-slate-700 bg-slate-50 px-2 py-3 text-center font-bold">2022绩效</td>
                        <td colSpan={4} className="border border-slate-700 px-3 py-3 text-center font-mono font-bold text-lg">{person.perf2022 || 'B'}</td>
                      </tr>
                      <tr>
                        <td className="border border-slate-700 bg-slate-50 px-2 py-6 text-center font-bold align-middle leading-tight">教 育<br/>信 息</td>
                        <td colSpan={8} className="border border-slate-700 p-0">
                          <table className="w-full border-none text-[11px] text-center border-collapse">
                            <thead>
                              <tr className="bg-slate-50 font-bold border-b border-slate-700">
                                <td className="border-r border-slate-700 py-1.5 w-[80px]">开始时间</td>
                                <td className="border-r border-slate-700 py-1.5 w-[80px]">结束时间</td>
                                <td className="border-r border-slate-700 py-1.5 w-[80px]">学历途径</td>
                                <td className="border-r border-slate-700 py-1.5 w-[140px]">毕业院校</td>
                                <td className="border-r border-slate-700 py-1.5 w-[120px]">专业</td>
                                <td className="border-r border-slate-700 py-1.5 w-[70px]">学历</td>
                                <td className="border-r border-slate-700 py-1.5 w-[70px]">学位</td>
                                <td className="py-1.5">担任职务</td>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-700 text-slate-700">
                              {person.education?.map((edu, idx) => (
                                <tr key={idx}>
                                  <td className="border-r border-slate-700 py-1.5 font-mono">{edu.time.split(' - ')[0]}</td>
                                  <td className="border-r border-slate-700 py-1.5 font-mono">{edu.time.split(' - ')[1]}</td>
                                  <td className="border-r border-slate-700 py-1.5">{edu.pathway || '全日制'}</td>
                                  <td className="border-r border-slate-700 py-1.5 text-left px-2 font-bold text-slate-800">{edu.school}</td>
                                  <td className="border-r border-slate-700 py-1.5 text-left px-2">{edu.major}</td>
                                  <td className="border-r border-slate-700 py-1.5">{edu.degree.split(' / ')[0] || edu.degree}</td>
                                  <td className="border-r border-slate-700 py-1.5">{edu.degree.split(' / ')[1] || edu.degree}</td>
                                  <td className="py-1.5">{edu.role || '--'}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </td>
                      </tr>
                      <tr>
                        <td className="border border-slate-700 bg-slate-50 px-2 py-8 text-center font-bold align-middle leading-tight">履 历<br/>信 息</td>
                        <td colSpan={8} className="border border-slate-700 p-0">
                          <table className="w-full border-none text-[11px] text-left border-collapse">
                            <thead>
                              <tr className="bg-slate-50 font-bold border-b border-slate-700 text-center">
                                <td className="border-r border-slate-700 py-1.5 w-[80px]">开始时间</td>
                                <td className="border-r border-slate-700 py-1.5 w-[80px]">结束时间</td>
                                <td className="border-r border-slate-700 py-1.5 w-[340px]">工作单位及部门</td>
                                <td className="py-1.5">职务</td>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-700 text-slate-700">
                              {person.workHistory?.map((work, idx) => (
                                <tr key={idx}>
                                  <td className="border-r border-slate-700 py-1.5 text-center font-mono">{work.time.split(' - ')[0]}</td>
                                  <td className="border-r border-slate-700 py-1.5 text-center font-mono">{work.time.split(' - ')[1] || '至今'}</td>
                                  <td className="border-r border-slate-700 py-1.5 px-3 font-semibold text-slate-800">
                                    {work.company} {work.dept ? ` / ${work.dept}` : ''}
                                    {work.note && (
                                      <div className="text-[10px] text-slate-600 font-normal mt-0.5 border border-slate-200 p-0.5 rounded">
                                        【{work.note}】
                                      </div>
                                    )}
                                  </td>
                                  <td className="py-1.5 px-3 font-bold text-slate-800">{work.position}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </td>
                      </tr>
                      <tr>
                        <td className="border border-slate-700 bg-slate-50 px-2 py-3 text-center font-bold align-middle leading-tight">联 系<br/>方 式</td>
                        <td colSpan={8} className="border border-slate-700 p-0">
                          <div className="grid grid-cols-8 text-[11px] leading-relaxed text-slate-700">
                            <div className="col-span-1 bg-slate-50 px-2 py-2 text-center font-bold border-r border-b border-slate-700">手机号码</div>
                            <div className="col-span-3 px-3 py-2 font-mono border-r border-b border-slate-700">{person.phone}</div>
                            <div className="col-span-1 bg-slate-50 px-2 py-2 text-center font-bold border-r border-b border-slate-700">手机短号</div>
                            <div className="col-span-3 px-3 py-2 font-mono border-b border-slate-700">{person.phoneShort || '暂无'}</div>
                            
                            <div className="col-span-1 bg-slate-50 px-2 py-2 text-center font-bold border-r border-slate-700">家庭住址</div>
                            <div className="col-span-7 px-3 py-2">{person.homeAddress || '上海市嘉定区于田路7号'}</div>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
