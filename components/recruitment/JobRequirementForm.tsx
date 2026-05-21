
import React, { useState, useEffect, useRef } from 'react';
import { 
  FileText, 
  ChevronRight, 
  Save,
  Search,
  Loader2,
  Database,
  Sparkles,
  X,
  Building2,
  ClipboardList,
  Tags,
  ShieldCheck,
  MapPin,
  Briefcase,
  UserCircle,
  ChevronDown
} from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import Markdown from 'react-markdown';

interface JobRequirementFormProps {
  onBack: () => void;
  type?: 'social' | 'campus';
  initialPosition?: any;
}

// --- Helper Component: SearchableInput ---
const SearchableInput: React.FC<{
  label: string;
  value: string;
  placeholder: string;
  options: string[];
  onChange: (value: string) => void;
  required?: boolean;
  getLabelClass: (field: string) => string;
  fieldId: string;
  isMandatory: (fieldId: string) => boolean;
}> = ({ label, value, placeholder, options, onChange, required, getLabelClass, fieldId, isMandatory }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchValue, setSearchValue] = useState(value);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setSearchValue(value);
  }, [value]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [wrapperRef]);

  const filteredOptions = options.filter(opt => 
    opt.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <div className="relative" ref={wrapperRef}>
      <label className={getLabelClass(fieldId)}>
        {label}
        {isMandatory(fieldId) && <span className="text-red-500 ml-0.5 font-bold">*</span>}
      </label>
      <div className="relative">
        <input 
          type="text" 
          value={searchValue}
          onChange={(e) => {
            setSearchValue(e.target.value);
            onChange(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          placeholder={placeholder}
          className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:ring-1 focus:ring-blue-500 outline-none bg-white text-gray-900 pr-8"
        />
        <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
      </div>
      
      {isOpen && (searchValue || filteredOptions.length > 0) && (
        <div className="absolute z-20 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-xl max-h-48 overflow-y-auto custom-scrollbar animate-fade-in">
           {filteredOptions.length > 0 ? (
             filteredOptions.map((opt) => (
               <button
                 key={opt}
                 onClick={() => {
                   onChange(opt);
                   setSearchValue(opt);
                   setIsOpen(false);
                 }}
                 className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-blue-50 transition-colors border-b border-gray-50 last:border-0"
               >
                 {opt}
               </button>
             ))
           ) : (
             <div className="px-3 py-2 text-xs text-gray-400 italic">未找到匹配项</div>
           )}
        </div>
      )}
    </div>
  );
};

export const JobRequirementForm: React.FC<JobRequirementFormProps> = ({ onBack, type = 'social', initialPosition }) => {
  const [isSearching, setIsSearching] = useState(false);
  const [ecSearchTerm, setEcSearchTerm] = useState('');
  
  // AI State
  const [isCheckingJD, setIsCheckingJD] = useState(false);
  const [jdFeedback, setJdFeedback] = useState<{ suggestions: string; optimized?: string } | null>(null);

  const isCampus = type === 'campus';
  const isSocial = type === 'social';

  const [formData, setFormData] = useState({
    // 分组 1: 职位基本信息
    r1Code: '',
    r2Code: '',
    r3Code: '',
    standardJob: '',
    recruitmentMethod: isCampus ? '校园招聘' : '社会招聘',
    jobTitle: '',
    jobLevel: '',
    positionType: '',
    headcount: 1,
    hiringManager: '', // K2 部门负责人 / BP的R2部门经理
    hrbpName: 'Lisa (HRBP)', // Mock auto-filled / R2的HRP
    hrbpDeptManager: 'John Manager', // HRBP 部门经理

    // 分组 2: 职位详情
    jd: '',
    qualifications: '',
    keywords: '',
    nonExternalNotes: '',
    laborRelation: '全日制劳动合同',
    workLocation: '1',
    
    // Hidden or system fields
    status: '进行中',
    sfJobCode: ''
  });

  useEffect(() => {
    if (initialPosition) {
      setFormData(prev => ({
        ...prev,
        jobTitle: initialPosition.title || '',
        standardJob: initialPosition.title || '',
        jobLevel: initialPosition.level || '',
      }));
    }
  }, [initialPosition]);

  const handleSearchSF = () => {
    const term = ecSearchTerm || formData.jobTitle;
    if (!term) {
      alert("请输入需求名称或 Position ID 进行查询");
      return;
    }
    setIsSearching(true);
    setTimeout(() => {
      setFormData(prev => ({
        ...prev,
        jobTitle: prev.jobTitle || '资深储备干部',
        standardJob: '储备干部',
        r1Code: 'CF',
        r2Code: 'PLAT-SVC-02',
        r3Code: 'NODE-JS-GRP',
        sfJobCode: 'SF-REQ-2024-CAMPUS',
        hiringManager: '张大伟',
        positionType: '技术'
      }));
      setIsSearching(false);
      alert('已成功从 SuccessFactors 同步职位详情！');
    }, 1200);
  };

  const handleAICheckJD = async () => {
    if (!formData.jd.trim()) {
      alert("请先输入职责描述内容再进行校验");
      return;
    }
    setIsCheckingJD(true);
    setJdFeedback(null);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        config: {
          systemInstruction: "你是一个专业的HR招聘助理。请分析并校对以下“职位职责”描述。请给出精炼的“优化建议”和“优化后的版本”。使用 Markdown 格式。",
          temperature: 0.7,
        },
        contents: `待校验内容：\n"${formData.jd}"`,
      });
      
      const text = response.text || "未能生成建议，请稍后重试。";
      setJdFeedback({ suggestions: text });
    } catch (error) {
      setJdFeedback({ suggestions: "AI 校验暂时不可用。" });
    } finally {
      setIsCheckingJD(false);
    }
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const inputStyle = "w-full border border-gray-300 rounded px-3 py-2 text-sm focus:ring-1 focus:ring-blue-500 outline-none bg-white text-gray-900";
  
  const isMandatory = (fieldName: string) => {
    if (isCampus) {
      const campusMandatory = [
        'r1Code', 'recruitmentMethod', 'jobTitle', 'hrbpName', 'hrbpDeptManager',
        'jd', 'qualifications', 'laborRelation', 'workLocation'
      ];
      return campusMandatory.includes(fieldName);
    }
    const socialMandatory = [
      'r1Code', 'r2Code', 'r3Code', 'standardJob', 
      'recruitmentMethod', 'jobTitle', 'jobLevel', 
      'positionType', 'headcount', 'hiringManager', 'hrbpName',
      'hrbpDeptManager', 'jd', 'qualifications', 'laborRelation', 'workLocation'
    ];
    return socialMandatory.includes(fieldName);
  };

  const getLabelClass = (fieldName: string) => {
    return `block text-xs font-bold mb-1 text-gray-800`;
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 animate-fade-in pb-10">
       <div className="flex items-center text-sm text-gray-500 mb-4 cursor-pointer hover:text-gray-800 font-bold" onClick={onBack}>
          <ChevronRight className="transform rotate-180 mr-1" size={16}/> 返回需求列表
       </div>
       
       <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
          <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-gray-50">
             <div>
               <div className="flex items-center">
                 <FileText size={20} className="text-blue-600 mr-2"/>
                 <h2 className="text-lg font-bold text-gray-800">
                    职位需求申请单 ({isCampus ? '校招版' : '社招版'})
                 </h2>
               </div>
             </div>
             <div className="text-sm text-gray-500 flex items-center">
               状态: <span className="bg-gray-200 text-gray-700 px-2 py-0.5 rounded text-xs font-bold uppercase tracking-wider ml-2">草稿</span>
             </div>
          </div>

          <div className="p-8">
             {/* Sync Section */}
             <div className="mb-8 p-6 bg-blue-50/30 border border-blue-100 rounded-xl">
                <div className="flex flex-col md:flex-row items-center gap-4">
                   <div className="flex-1 relative w-full">
                      <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                      <input 
                         type="text" 
                         value={ecSearchTerm}
                         onChange={(e) => setEcSearchTerm(e.target.value)}
                         placeholder="查询SF 空岗"
                         className="w-full pl-12 pr-4 py-3 bg-white border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 outline-none text-sm transition-all"
                      />
                   </div>
                   <button 
                      onClick={handleSearchSF}
                      disabled={isSearching}
                      className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold shadow-md hover:bg-blue-700 active:scale-95 transition-all flex items-center shrink-0 disabled:opacity-50"
                   >
                      {isSearching ? <Loader2 size={18} className="mr-2 animate-spin"/> : <Database size={18} className="mr-2"/>}
                      查询SF空岗
                   </button>
                </div>
             </div>

             <div className="space-y-10">
               {/* Section 1: Basic Info */}
               <section className="space-y-6">
                 <div className="bg-white px-2 text-[15px] font-bold text-blue-600 flex items-center border-b border-blue-50 pb-3">
                    <Building2 size={18} className="mr-2"/> 1. 职位基本信息
                 </div>
                 
                 <div className="grid grid-cols-1 md:grid-cols-4 gap-x-6 gap-y-6">
                    {/* Re-ordered Row 1 to match screenshot: Recruitment Method, Job Title, Level, Type */}
                    <div>
                       <label className={getLabelClass('recruitmentMethod')}>
                         招聘方式
                         {isMandatory('recruitmentMethod') && <span className="text-red-500 ml-0.5 font-bold">*</span>}
                       </label>
                       <select 
                         value={formData.recruitmentMethod}
                         disabled 
                         className={`${inputStyle} bg-gray-50 opacity-80 cursor-not-allowed`}
                       >
                          <option value="社会招聘">社会招聘</option>
                          <option value="校园招聘">校园招聘</option>
                       </select>
                    </div>
                    <div>
                       <label className={getLabelClass('jobTitle')}>
                         职位需求名称
                         {isMandatory('jobTitle') && <span className="text-red-500 ml-0.5 font-bold">*</span>}
                       </label>
                       <input 
                          type="text" 
                          value={formData.jobTitle}
                          onChange={(e) => handleInputChange('jobTitle', e.target.value)}
                          className={inputStyle} 
                          placeholder={isCampus ? "例如：2024届储备开发工程师" : "例如：高级软件工程师"}
                       />
                    </div>
                    <div>
                       <label className={getLabelClass('jobLevel')}>
                         需求能级
                         {isMandatory('jobLevel') && <span className="text-red-500 ml-0.5 font-bold">*</span>}
                       </label>
                       <select 
                         value={formData.jobLevel}
                         onChange={(e) => handleInputChange('jobLevel', e.target.value)}
                         className={inputStyle}
                       >
                          <option value="">请选择能级...</option>
                          <option value="P1">P1 (应届生/实习生)</option>
                          <option value="P2">P2</option>
                          <option value="P5">P5</option>
                          <option value="P6">P6</option>
                          <option value="P7">P7</option>
                       </select>
                    </div>
                    <div>
                       <label className={getLabelClass('positionType')}>
                         岗位类型
                         {isMandatory('positionType') && <span className="text-red-500 ml-0.5 font-bold">*</span>}
                       </label>
                       <select 
                         value={formData.positionType}
                         onChange={(e) => handleInputChange('positionType', e.target.value)}
                         className={inputStyle}
                       >
                          <option value="">请选择...</option>
                          <option value="技术">技术类</option>
                          <option value="产品">产品类</option>
                          <option value="职能">职能类</option>
                          <option value="专业">专业类</option>
                       </select>
                    </div>

                    {/* Re-ordered Row 2: Headcount, Hiring Manager, HRBP, HRBP Dept Manager */}
                    <div>
                       <label className={getLabelClass('headcount')}>
                         需求人数
                         {isMandatory('headcount') && <span className="text-red-500 ml-0.5 font-bold">*</span>}
                       </label>
                       <input 
                         type="number" 
                         value={formData.headcount}
                         onChange={(e) => handleInputChange('headcount', parseInt(e.target.value))}
                         className={inputStyle} 
                         min="1"
                       />
                    </div>
                    <div>
                       <label className={getLabelClass('hiringManager')}>
                         {isCampus ? "BP的R2部门经理" : "K2 部门负责人"}
                         {isMandatory('hiringManager') && <span className="text-red-500 ml-0.5 font-bold">*</span>}
                       </label>
                       <input 
                         type="text" 
                         value={formData.hiringManager}
                         onChange={(e) => handleInputChange('hiringManager', e.target.value)}
                         className={inputStyle}
                         placeholder="请输入负责人姓名"
                       />
                    </div>
                    <div>
                       <label className={getLabelClass('hrbpName')}>
                         {isCampus ? "R2的HRP" : "HRBP"}
                         {isMandatory('hrbpName') && <span className="text-red-500 ml-0.5 font-bold">*</span>}
                       </label>
                       <div className="relative">
                          <input 
                             type="text" 
                             value={formData.hrbpName}
                             onChange={(e) => handleInputChange('hrbpName', e.target.value)}
                             className={`${inputStyle} pr-9`}
                             placeholder="自动带出"
                          />
                          <UserCircle className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                       </div>
                    </div>
                    <div>
                       <label className={getLabelClass('hrbpDeptManager')}>
                         HRBP 部门经理
                         {isMandatory('hrbpDeptManager') && <span className="text-red-500 ml-0.5 font-bold">*</span>}
                       </label>
                       <div className="relative">
                          <input 
                             type="text" 
                             value={formData.hrbpDeptManager}
                             onChange={(e) => handleInputChange('hrbpDeptManager', e.target.value)}
                             className={`${inputStyle} pr-9`}
                             placeholder="自动带出"
                          />
                          <UserCircle className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                       </div>
                    </div>

                    {/* Department Selectors (Black labels, no stars) */}
                    <SearchableInput 
                      label="R1 部门"
                      fieldId="r1Code"
                      value={formData.r1Code}
                      placeholder="请选择 R1 部门"
                      options={['CF', 'CS', 'CI']}
                      onChange={(val) => handleInputChange('r1Code', val)}
                      getLabelClass={getLabelClass}
                      isMandatory={isMandatory}
                    />
                    <SearchableInput 
                      label="R2 部门"
                      fieldId="r2Code"
                      value={formData.r2Code}
                      placeholder="请选择 R2 部门"
                      options={['PLAT-SVC-02', 'PLAT-CORE-01', 'MKT-STRAT-03']}
                      onChange={(val) => handleInputChange('r2Code', val)}
                      getLabelClass={getLabelClass}
                      isMandatory={isMandatory}
                    />
                    <SearchableInput 
                      label="R3 部门"
                      fieldId="r3Code"
                      value={formData.r3Code}
                      placeholder="请选择 R3 部门"
                      options={['NODE-JS-GRP', 'JAVA-EE-GRP', 'FE-ARCH-GRP']}
                      onChange={(val) => handleInputChange('r3Code', val)}
                      getLabelClass={getLabelClass}
                      isMandatory={isMandatory}
                    />
                    <div>
                       <label className={getLabelClass('standardJob')}>
                         岗位名称
                         {isMandatory('standardJob') && <span className="text-red-500 ml-0.5 font-bold">*</span>}
                       </label>
                       <input 
                          type="text" 
                          value={formData.standardJob}
                          onChange={(e) => handleInputChange('standardJob', e.target.value)}
                          className={inputStyle} 
                          placeholder="正式岗位名称"
                       />
                    </div>
                 </div>
               </section>

               {/* Section 2: Details */}
               <section className="space-y-6">
                 <div className="bg-white px-2 text-[15px] font-bold text-blue-600 flex items-center border-b border-blue-50 pb-3">
                    <ClipboardList size={18} className="mr-2"/> 2. 职位详情
                 </div>
                 
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
                    <div className="relative">
                       <div className="flex justify-between items-center mb-2">
                          <label className={getLabelClass('jd')}>
                            工作职责
                            {isMandatory('jd') && <span className="text-red-500 ml-0.5 font-bold">*</span>}
                          </label>
                          <button 
                             onClick={handleAICheckJD}
                             disabled={isCheckingJD || !formData.jd}
                             className={`flex items-center px-2 py-1 rounded text-[10px] font-bold shadow-sm transition-all ${
                                isCheckingJD 
                                ? 'bg-blue-50 text-blue-400 cursor-not-allowed' 
                                : 'bg-blue-600 text-white hover:bg-blue-700 active:scale-95'
                             }`}
                          >
                             {isCheckingJD ? <Loader2 size={12} className="mr-1 animate-spin" /> : <Sparkles size={12} className="mr-1" />}
                             AI 智能润色
                          </button>
                       </div>
                       <textarea 
                         value={formData.jd}
                         onChange={(e) => handleInputChange('jd', e.target.value)}
                         className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-1 focus:ring-blue-500 outline-none bg-white text-gray-900 h-40 resize-none leading-relaxed" 
                         placeholder="描述职位的核心职责与工作内容..."
                       ></textarea>

                       {jdFeedback && (
                          <div className="mt-2 bg-blue-50 border border-blue-100 rounded-lg p-4 animate-fade-in shadow-sm">
                             <div className="flex justify-between items-center mb-2 border-b border-blue-100 pb-1.5">
                                <div className="flex items-center text-blue-700 text-[11px] font-bold">
                                   <Sparkles size={14} className="mr-1.5" /> AI 优化建议
                                </div>
                                <button onClick={() => setJdFeedback(null)} className="text-blue-300 hover:text-blue-500">
                                   <X size={14} />
                                </button>
                             </div>
                             <div className="text-[11px] text-blue-800 space-y-1 max-h-48 overflow-y-auto custom-scrollbar markdown-body">
                                <Markdown>{jdFeedback.suggestions}</Markdown>
                             </div>
                          </div>
                       )}
                    </div>
                    <div>
                       <div className="flex justify-between items-center mb-2">
                          <label className={getLabelClass('qualifications')}>
                            任职资格
                            {isMandatory('qualifications') && <span className="text-red-500 ml-0.5 font-bold">*</span>}
                          </label>
                       </div>
                       <textarea 
                         value={formData.qualifications}
                         onChange={(e) => handleInputChange('qualifications', e.target.value)}
                         className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-1 focus:ring-blue-500 outline-none bg-white text-gray-900 h-40 resize-none leading-relaxed" 
                         placeholder="描述职位所需的教育背景、工作经验及专业技能要求..."
                       ></textarea>
                    </div>

                    <div className="md:col-span-2">
                       <label className={getLabelClass('keywords')}>
                         关键词
                         {isMandatory('keywords') && <span className="text-red-500 ml-0.5 font-bold">*</span>}
                       </label>
                       <div className="relative">
                          <input 
                             type="text" 
                             value={formData.keywords}
                             onChange={(e) => handleInputChange('keywords', e.target.value)}
                             placeholder="输入职位相关搜索关键词，用逗号分隔"
                             className={`${inputStyle} pl-9`}
                          />
                          <Tags className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                       </div>
                    </div>

                    <div className="md:col-span-2">
                       <label className={getLabelClass('nonExternalNotes')}>
                         非对外发布要求
                         {isMandatory('nonExternalNotes') && <span className="text-red-500 ml-0.5 font-bold">*</span>}
                       </label>
                       <div className="relative">
                          <input 
                             type="text" 
                             value={formData.nonExternalNotes}
                             onChange={(e) => handleInputChange('nonExternalNotes', e.target.value)}
                             placeholder="录入仅供内部招聘团队参考的要求，不会同步至外部招聘平台"
                             className={`${inputStyle} pl-9`}
                          />
                          <ShieldCheck className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                       </div>
                    </div>

                    <div>
                       <label className={getLabelClass('laborRelation')}>
                         劳动关系
                         {isMandatory('laborRelation') && <span className="text-red-500 ml-0.5 font-bold">*</span>}
                       </label>
                       <div className="relative">
                          <select 
                            value={formData.laborRelation}
                            onChange={(e) => handleInputChange('laborRelation', e.target.value)}
                            className={`${inputStyle} pl-9`}
                          >
                             <option value="全日制劳动合同">全日制劳动合同</option>
                             <option value="劳务派遣">劳务派遣</option>
                             <option value="兼职">兼职</option>
                             <option value="实习协议">实习协议</option>
                          </select>
                          <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                       </div>
                    </div>
                    <div>
                       <label className={getLabelClass('workLocation')}>
                         工作地点
                         {isMandatory('workLocation') && <span className="text-red-500 ml-0.5 font-bold">*</span>}
                       </label>
                       <div className="relative">
                          <select 
                            value={formData.workLocation}
                            onChange={(e) => handleInputChange('workLocation', e.target.value)}
                            className={`${inputStyle} pl-9`}
                          >
                             <option value="1">上海嘉定</option>
                             <option value="2">江苏仪征</option>
                             <option value="3">浙江宁波</option>
                             <option value="4">江苏南京</option>
                             <option value="5">新疆乌鲁木齐</option>
                             <option value="6">湖南长沙</option>
                          </select>
                          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                       </div>
                    </div>
                 </div>
               </section>
             </div>

             <div className="mt-12 flex justify-end space-x-3">
                <button 
                  onClick={onBack}
                  className="px-6 py-2 border border-gray-300 rounded text-sm text-gray-700 bg-white hover:bg-gray-50"
                >
                  取消
                </button>
                <button 
                  onClick={() => alert('需求已提交审核，您可以前往需求管理列表查看进度。')}
                  className="px-8 py-2 bg-blue-600 text-white rounded text-sm font-bold hover:bg-blue-700 shadow-md flex items-center"
                >
                  <Save size={16} className="mr-2" /> 保存并提交审核
                </button>
             </div>
          </div>
       </div>
    </div>
  );
};
