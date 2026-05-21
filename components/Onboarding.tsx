
import React, { useState } from 'react';
import { 
  CheckCircle, 
  ChevronRight, 
  User, 
  Lock, 
  CreditCard, 
  BookOpen, 
  PenTool, 
  Monitor, 
  Wifi, 
  Shield, 
  Phone, 
  Mail, 
  MapPin, 
  Calendar,
  Briefcase,
  AlertCircle,
  Camera
} from 'lucide-react';

export const Onboarding: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '张三',
    gender: 'male',
    phone: '17712348360',
    email: 'feilk@delaware.pro',
    country: '中国',
    idNumber: '310101200109019878',
    idType: '身份证',
    dob: '2001-09-01',
    department: '部门A',
    manager: '张三',
    title: '职位A',
    level: 'A',
    deptType: '人力资源部',
    city: '上海',
    virtualManager: ['张三', '李四'],
    hukou: 'yes',
    concurrentRole: ['前端开发', 'UI设计'],
    offerBase: '上海',
    workLocation: '上海',
    socialSecurity: '山东青岛',
    onboardDate: '2022-08-23',
    deadline: '2022-08-31'
  });

  const steps = [
    { id: 1, title: '入职指南', icon: <BookOpen size={18} /> },
    { id: 2, title: '简历简档', icon: <User size={18} /> },
    { id: 3, title: '行政办理', icon: <Briefcase size={18} /> },
    { id: 4, title: 'IT申领', icon: <Monitor size={18} /> },
    { id: 5, title: '联系人', icon: <Phone size={18} /> }
  ];

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(prev => prev + 1);
      window.scrollTo(0, 0);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
      window.scrollTo(0, 0);
    }
  };

  // Step 1: Guide
  const renderGuide = () => (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-8 animate-fade-in">
      <div className="text-center mb-10">
        <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <BookOpen size={40} className="text-blue-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">欢迎加入 Pre-LOGO 大家庭！</h2>
        <p className="text-gray-500 max-w-xl mx-auto">
          很高兴您能成为我们的一员。为了帮助您顺利开始工作，请按照以下流程完成入职手续办理。
          整个过程大约需要 15-20 分钟。
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <div className="p-5 border border-blue-100 bg-blue-50/50 rounded-lg flex items-start">
           <AlertCircle className="text-blue-500 mt-1 mr-3 flex-shrink-0" size={20} />
           <div>
             <h4 className="font-bold text-gray-800 mb-1">准备材料</h4>
             <p className="text-sm text-gray-600">请准备好您的身份证件照片、学历证书扫描件以及白底证件照电子版。</p>
           </div>
        </div>
        <div className="p-5 border border-green-100 bg-green-50/50 rounded-lg flex items-start">
           <CheckCircle className="text-green-500 mt-1 mr-3 flex-shrink-0" size={20} />
           <div>
             <h4 className="font-bold text-gray-800 mb-1">自动保存</h4>
             <p className="text-sm text-gray-600">您的填写进度会自动保存，您可以随时中断并稍后继续。</p>
           </div>
        </div>
      </div>
    </div>
  );

  // Step 2: Profile Review (Based on Screenshot)
  const renderProfile = () => (
    <div className="space-y-6 animate-fade-in">
      {/* Basic Info Card */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="bg-gray-50 px-6 py-3 border-b border-gray-200 flex items-center">
           <Lock size={16} className="text-red-400 mr-2" />
           <span className="font-bold text-gray-800">基本信息</span>
        </div>
        
        <div className="p-8">
           <div className="flex flex-col md:flex-row gap-10">
              {/* Avatar Placeholder */}
              <div className="w-40 h-48 border-2 border-gray-300 bg-gray-50 flex flex-col items-center justify-center text-gray-400 relative">
                 <div className="absolute inset-0 border-t border-b border-gray-300 transform rotate-45 scale-150 opacity-20 pointer-events-none"></div>
                 <div className="absolute inset-0 border-l border-r border-gray-300 transform rotate-45 scale-150 opacity-20 pointer-events-none"></div>
                 <Camera size={32} className="mb-2 opacity-50" />
                 <span className="text-xs">证件照预览</span>
              </div>

              {/* Form Fields */}
              <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                 {/* Row 1 */}
                 <div className="flex items-center">
                    <label className="w-24 text-gray-600 font-medium">姓名</label>
                    <div className="flex-1 text-gray-800 font-medium">{formData.name}</div>
                 </div>
                 <div className="flex items-center">
                    <label className="w-24 text-gray-600 font-medium">
                      <span className="text-red-500 mr-1">*</span>国家/地区
                    </label>
                    <div className="flex-1 text-gray-800">{formData.country}</div>
                 </div>

                 {/* Row 2 */}
                 <div className="flex items-center">
                    <label className="w-24 text-gray-600 font-medium">性别</label>
                    <div className="flex-1 flex items-center space-x-6">
                       <label className="flex items-center cursor-pointer">
                         <input type="radio" name="gender" checked={formData.gender === 'male'} readOnly className="mr-2 text-blue-600 focus:ring-blue-500" />
                         <span className="text-gray-700">男</span>
                       </label>
                       <label className="flex items-center cursor-pointer">
                         <input type="radio" name="gender" checked={formData.gender === 'female'} readOnly className="mr-2 text-blue-600 focus:ring-blue-500" />
                         <span className="text-gray-700">女</span>
                       </label>
                    </div>
                 </div>
                 <div className="flex items-center">
                    <label className="w-24 text-gray-600 font-medium">
                      <span className="text-red-500 mr-1">*</span>证件号码
                    </label>
                    <div className="flex-1 text-gray-800">{formData.idNumber}</div>
                 </div>

                 {/* Row 3 */}
                 <div className="flex items-center">
                    <label className="w-24 text-gray-600 font-medium">联系电话</label>
                    <div className="flex-1 text-gray-800">{formData.phone}</div>
                 </div>
                 <div className="flex items-center">
                    <label className="w-24 text-gray-600 font-medium">
                      <span className="text-red-500 mr-1">*</span>证件类型
                    </label>
                    <div className="flex-1 text-gray-800">{formData.idType}</div>
                 </div>

                 {/* Row 4 */}
                 <div className="flex items-center">
                    <label className="w-24 text-gray-600 font-medium">个人邮箱</label>
                    <div className="flex-1 text-gray-800">{formData.email}</div>
                 </div>
                 <div className="flex items-center">
                    <label className="w-24 text-gray-600 font-medium">
                      <span className="text-red-500 mr-1">*</span>出生日期
                    </label>
                    <div className="flex-1 text-gray-800">{formData.dob}</div>
                 </div>
              </div>
           </div>
        </div>
      </div>

      {/* Employment Info Card */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="bg-gray-50 px-6 py-3 border-b border-gray-200 flex items-center">
           <Lock size={16} className="text-red-400 mr-2" />
           <span className="font-bold text-gray-800">雇佣信息</span>
        </div>
        
        <div className="p-8">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
              {/* Left Column */}
              <div className="space-y-6">
                 <div className="flex items-center">
                    <label className="w-24 text-gray-600 font-medium">部门</label>
                    <div className="flex-1 relative">
                       <input type="text" value={formData.department} readOnly className="w-full border-b border-gray-300 pb-1 focus:outline-none bg-transparent" />
                       <ChevronRight className="absolute right-0 top-0 text-gray-400 transform rotate-90" size={14} />
                    </div>
                 </div>
                 <div className="flex items-center">
                    <label className="w-24 text-gray-600 font-medium">职位</label>
                    <div className="flex-1 relative">
                       <input type="text" value={formData.title} readOnly className="w-full border-b border-gray-300 pb-1 focus:outline-none bg-transparent" />
                       <ChevronRight className="absolute right-0 top-0 text-gray-400 transform rotate-90" size={14} />
                    </div>
                 </div>
                 <div className="flex items-center">
                    <label className="w-24 text-gray-600 font-medium">部门类型</label>
                    <div className="flex-1 relative">
                       <input type="text" value={formData.deptType} readOnly className="w-full border-b border-gray-300 pb-1 focus:outline-none bg-transparent" />
                       <ChevronRight className="absolute right-0 top-0 text-gray-400 transform rotate-90" size={14} />
                    </div>
                 </div>
                 <div className="flex items-center">
                    <label className="w-24 text-gray-600 font-medium">虚拟上级</label>
                    <div className="flex-1 relative flex flex-wrap gap-2 border-b border-gray-300 pb-1">
                       {formData.virtualManager.map((m, idx) => (
                         <span key={idx} className="bg-gray-100 px-2 py-0.5 rounded text-sm text-gray-700 flex items-center">
                           {m} <span className="ml-1 text-gray-400 cursor-not-allowed">×</span>
                         </span>
                       ))}
                       <ChevronRight className="absolute right-0 top-1 text-gray-400 transform rotate-90" size={14} />
                    </div>
                 </div>
                 <div className="flex items-center">
                    <label className="w-24 text-gray-600 font-medium">兼任职位</label>
                    <div className="flex-1 relative flex flex-wrap gap-2 border-b border-gray-300 pb-1">
                       {formData.concurrentRole.map((r, idx) => (
                         <span key={idx} className="bg-gray-100 px-2 py-0.5 rounded text-sm text-gray-700 flex items-center">
                           {r} <span className="ml-1 text-gray-400 cursor-not-allowed">×</span>
                         </span>
                       ))}
                       <ChevronRight className="absolute right-0 top-1 text-gray-400 transform rotate-90" size={14} />
                    </div>
                 </div>
                 <div className="flex items-center">
                    <label className="w-24 text-gray-600 font-medium">实际工作地</label>
                    <div className="flex-1">
                       <input type="text" value={formData.workLocation} readOnly className="w-full border-none p-0 text-gray-800" />
                    </div>
                 </div>
                 <div className="flex items-center">
                    <label className="w-24 text-gray-600 font-medium">预计入职日期</label>
                    <div className="flex-1 text-gray-800 font-mono">{formData.onboardDate}</div>
                 </div>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                 <div className="flex items-center">
                    <label className="w-32 text-gray-600 font-medium">部门负责人</label>
                    <div className="flex-1 text-gray-800">{formData.manager}</div>
                 </div>
                 <div className="flex items-center">
                    <label className="w-32 text-gray-600 font-medium">职级</label>
                    <div className="flex-1 text-gray-800">{formData.level}</div>
                 </div>
                 <div className="flex items-center">
                    <label className="w-32 text-gray-600 font-medium">工作城市户籍</label>
                    <div className="flex-1 text-gray-800">{formData.city}</div>
                 </div>
                 <div className="flex items-center">
                    <label className="w-32 text-gray-600 font-medium">积分及落户需求</label>
                    <div className="flex-1 flex items-center space-x-6">
                       <label className="flex items-center cursor-pointer">
                         <input type="radio" name="hukou" checked={formData.hukou === 'yes'} readOnly className="mr-2 text-blue-600 focus:ring-blue-500" />
                         <span className="text-gray-700">有</span>
                       </label>
                       <label className="flex items-center cursor-pointer">
                         <input type="radio" name="hukou" checked={formData.hukou === 'no'} readOnly className="mr-2 text-blue-600 focus:ring-blue-500" />
                         <span className="text-gray-700">无</span>
                       </label>
                    </div>
                 </div>
                 <div className="flex items-center">
                    <label className="w-32 text-gray-600 font-medium">offer base地</label>
                    <div className="flex-1 text-gray-800">{formData.offerBase}</div>
                 </div>
                 <div className="flex items-center">
                    <label className="w-32 text-gray-600 font-medium">社保缴纳地</label>
                    <div className="flex-1 text-gray-800">{formData.socialSecurity}</div>
                 </div>
                 <div className="flex items-center">
                    <label className="w-32 text-gray-600 font-medium">采集截止时间</label>
                    <div className="flex-1 text-gray-800 font-mono">{formData.deadline}</div>
                 </div>
              </div>
           </div>
        </div>
      </div>
      
      <div className="bg-yellow-50 border border-yellow-100 rounded-lg p-4 flex items-start">
        <AlertCircle size={20} className="text-yellow-600 mt-0.5 mr-3 flex-shrink-0" />
        <div className="text-sm text-yellow-800">
           <p className="font-bold mb-1">注意：</p>
           <p>上述带红色锁定图标 <Lock size={12} className="inline mx-1"/> 的信息来自系统录入，如果您发现信息有误，请在“联系人”步骤中联系您的HRBP进行修正。</p>
        </div>
      </div>
    </div>
  );

  // Step 3: Administration
  const renderAdmin = () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in">
       <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 flex flex-col items-center text-center hover:border-blue-300 transition-colors cursor-pointer group">
          <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-orange-200 transition-colors">
             <CreditCard size={32} className="text-orange-600" />
          </div>
          <h3 className="font-bold text-gray-800 mb-2">门禁卡办理</h3>
          <p className="text-sm text-gray-500 mb-4">请确认您的个人照片已上传，以便制作工牌和门禁权限。</p>
          <button className="mt-auto border border-orange-500 text-orange-600 px-4 py-1.5 rounded-full text-sm font-medium hover:bg-orange-50">
            查看状态: 制作中
          </button>
       </div>

       <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 flex flex-col items-center text-center hover:border-blue-300 transition-colors cursor-pointer group">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-blue-200 transition-colors">
             <PenTool size={32} className="text-blue-600" />
          </div>
          <h3 className="font-bold text-gray-800 mb-2">办公用品申领</h3>
          <p className="text-sm text-gray-500 mb-4">标准入职礼包（笔记本、笔、文化衫等）已为您准备。</p>
          <button className="mt-auto bg-blue-600 text-white px-4 py-1.5 rounded-full text-sm font-medium hover:bg-blue-700">
            确认申领
          </button>
       </div>

       <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 flex flex-col items-center text-center hover:border-blue-300 transition-colors cursor-pointer group">
          <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-purple-200 transition-colors">
             <BookOpen size={32} className="text-purple-600" />
          </div>
          <h3 className="font-bold text-gray-800 mb-2">规章制度</h3>
          <p className="text-sm text-gray-500 mb-4">请阅读并签署《员工手册》及《信息安全承诺书》。</p>
          <button className="mt-auto border border-purple-500 text-purple-600 px-4 py-1.5 rounded-full text-sm font-medium hover:bg-purple-50">
            去签署
          </button>
       </div>
    </div>
  );

  // Step 4: IT Assets
  const renderIT = () => (
    <div className="space-y-6 animate-fade-in">
       <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          <h3 className="font-bold text-gray-800 mb-6 flex items-center">
             <Monitor size={20} className="mr-2 text-blue-600" />
             电脑申领 (Laptop Selection)
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <label className="border-2 border-blue-500 bg-blue-50/20 rounded-lg p-5 cursor-pointer relative">
                <input type="radio" name="laptop" className="absolute top-4 right-4 text-blue-600 w-5 h-5" defaultChecked />
                <div className="flex items-center mb-4">
                   <div className="w-12 h-12 bg-gray-200 text-gray-800 flex items-center justify-center rounded-lg font-bold text-xs mr-4">Mac</div>
                   <div>
                      <h4 className="font-bold text-gray-800">MacBook Pro 14"</h4>
                      <p className="text-xs text-gray-500">M3 Pro / 18GB / 512GB</p>
                   </div>
                </div>
                <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
                   <li>适用于设计、研发岗位</li>
                   <li>macOS Sonoma</li>
                   <li>包含 Magic Mouse</li>
                </ul>
             </label>

             <label className="border border-gray-200 rounded-lg p-5 cursor-pointer hover:border-blue-300 relative">
                <input type="radio" name="laptop" className="absolute top-4 right-4 text-blue-600 w-5 h-5" />
                <div className="flex items-center mb-4">
                   <div className="w-12 h-12 bg-blue-600 text-white flex items-center justify-center rounded-lg font-bold text-xs mr-4">Win</div>
                   <div>
                      <h4 className="font-bold text-gray-800">ThinkPad X1 Carbon</h4>
                      <p className="text-xs text-gray-500">i7 / 32GB / 1TB</p>
                   </div>
                </div>
                <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
                   <li>适用于职能、商务岗位</li>
                   <li>Windows 11 Pro</li>
                   <li>轻薄便携，商务首选</li>
                </ul>
             </label>
          </div>
       </div>

       <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          <h3 className="font-bold text-gray-800 mb-6 flex items-center">
             <Wifi size={20} className="mr-2 text-green-600" />
             IT 权限开通
          </h3>
          <div className="space-y-4">
             <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                   <Shield size={18} className="text-gray-400 mr-3" />
                   <span className="text-gray-700 font-medium">VPN 远程访问权限</span>
                </div>
                <span className="text-green-600 text-sm font-medium flex items-center"><CheckCircle size={14} className="mr-1"/> 已开通</span>
             </div>
             <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                   <Mail size={18} className="text-gray-400 mr-3" />
                   <span className="text-gray-700 font-medium">企业邮箱 (Outlook)</span>
                </div>
                <span className="text-green-600 text-sm font-medium flex items-center"><CheckCircle size={14} className="mr-1"/> 已开通</span>
             </div>
             <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                   <Monitor size={18} className="text-gray-400 mr-3" />
                   <span className="text-gray-700 font-medium">JIRA / Confluence 账号</span>
                </div>
                <span className="text-orange-500 text-sm font-medium">处理中...</span>
             </div>
          </div>
       </div>
    </div>
  );

  // Step 5: Contacts
  const renderContacts = () => (
    <div className="animate-fade-in">
       <h3 className="font-bold text-gray-800 mb-6">您的入职指引伙伴</h3>
       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Mentor */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex items-center space-x-6">
             <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-2xl">
                李
             </div>
             <div className="flex-1">
                <div className="flex justify-between items-start">
                   <div>
                      <h4 className="text-lg font-bold text-gray-800">李四 (Mentor)</h4>
                      <p className="text-blue-600 text-sm font-medium">高级技术专家</p>
                   </div>
                   <span className="bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded">导师</span>
                </div>
                <div className="mt-4 space-y-2 text-sm text-gray-600">
                   <div className="flex items-center"><Phone size={14} className="mr-2"/> 138-0000-0000</div>
                   <div className="flex items-center"><Mail size={14} className="mr-2"/> lisi@delaware.pro</div>
                   <div className="flex items-center"><MapPin size={14} className="mr-2"/> 上海办公室 15F</div>
                </div>
             </div>
          </div>

          {/* HRBP */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex items-center space-x-6">
             <div className="w-20 h-20 rounded-full bg-pink-100 flex items-center justify-center text-pink-600 font-bold text-2xl">
                王
             </div>
             <div className="flex-1">
                <div className="flex justify-between items-start">
                   <div>
                      <h4 className="text-lg font-bold text-gray-800">王五 (HRBP)</h4>
                      <p className="text-pink-600 text-sm font-medium">人力资源经理</p>
                   </div>
                   <span className="bg-pink-50 text-pink-700 text-xs px-2 py-1 rounded">HR伙伴</span>
                </div>
                <div className="mt-4 space-y-2 text-sm text-gray-600">
                   <div className="flex items-center"><Phone size={14} className="mr-2"/> 139-0000-0000</div>
                   <div className="flex items-center"><Mail size={14} className="mr-2"/> wangwu@delaware.pro</div>
                   <div className="flex items-center"><Briefcase size={14} className="mr-2"/> 遇到困难随时联系我</div>
                </div>
             </div>
          </div>
       </div>

       <div className="mt-10 bg-gray-50 rounded-lg p-6 text-center">
          <h3 className="font-bold text-gray-800 mb-2">恭喜您完成入职指引！</h3>
          <p className="text-gray-600 mb-6">请携带身份证件按时前往公司报到，我们期待您的加入。</p>
          <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 shadow-md transition-colors">
            完成并进入工作台
          </button>
       </div>
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto pb-12">
      <h1 className="text-2xl font-bold text-gray-800 mb-8">员工入职</h1>

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between relative">
           <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-full h-1 bg-gray-200 -z-10"></div>
           {steps.map((s) => (
             <div key={s.id} className="flex flex-col items-center bg-gray-50 px-2 rounded-lg py-1">
                <div 
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 border-4 ${
                    currentStep >= s.id 
                      ? 'bg-blue-600 border-blue-100 text-white' 
                      : 'bg-white border-gray-200 text-gray-400'
                  }`}
                >
                  {currentStep > s.id ? <CheckCircle size={20} /> : s.icon}
                </div>
                <span className={`text-xs mt-2 font-medium ${currentStep >= s.id ? 'text-blue-700' : 'text-gray-500'}`}>
                  {s.title}
                </span>
             </div>
           ))}
        </div>
      </div>

      {/* Content Area */}
      <div className="min-h-[500px]">
        {currentStep === 1 && renderGuide()}
        {currentStep === 2 && renderProfile()}
        {currentStep === 3 && renderAdmin()}
        {currentStep === 4 && renderIT()}
        {currentStep === 5 && renderContacts()}
      </div>

      {/* Navigation Footer */}
      {currentStep < 5 && (
        <div className="mt-8 flex justify-between pt-6 border-t border-gray-200">
           <button 
             onClick={handlePrev}
             disabled={currentStep === 1}
             className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
           >
             上一步
           </button>
           <button 
             onClick={handleNext}
             className="px-8 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 shadow-sm flex items-center transition-colors"
           >
             下一步 <ChevronRight size={16} className="ml-2" />
           </button>
        </div>
      )}
    </div>
  );
};
