import React from 'react';
import { X, MapPin, Clock, Contact, Network, Camera, Info, Phone, Smartphone, Hash, Mail, Award, Calendar } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface PersonDetailDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  person: any;
}

const PERSONAL_INFO_MAP: Record<string, {
  phone: string;
  mobile: string;
  ext: string;
  email: string;
  jobLevel: string;
  age: string;
  englishName?: string;
}> = {
  '徐廷睿': {
    phone: '+86 (021) 5905 1234',
    mobile: '138 1234 5678',
    ext: '85678',
    email: 'tingrui.xu@csvw.com',
    jobLevel: 'M4',
    age: '46',
    englishName: 'Xu Tingrui'
  },
  '徐廷睿 Xu Tingrui': {
    phone: '+86 (021) 5905 1234',
    mobile: '138 1234 5678',
    ext: '85678',
    email: 'tingrui.xu@csvw.com',
    jobLevel: 'M4',
    age: '46',
    englishName: 'Xu Tingrui'
  },
  '孙洁': {
    phone: '+86 (021) 5905 2345',
    mobile: '139 2345 6789',
    ext: '86789',
    email: 'jie.sun@csvw.com',
    jobLevel: 'M5',
    age: '39',
    englishName: 'Sun Jie'
  },
  '孙洁 Sun Jie': {
    phone: '+86 (021) 5905 2345',
    mobile: '139 2345 6789',
    ext: '86789',
    email: 'jie.sun@csvw.com',
    jobLevel: 'M5',
    age: '39',
    englishName: 'Sun Jie'
  },
  '李铭': {
    phone: '+86 (021) 5905 3456',
    mobile: '137 3456 7890',
    ext: '87890',
    email: 'ming.li1@csvw.com',
    jobLevel: 'M5',
    age: '41',
    englishName: 'Li Ming'
  },
  '李铭 Li Ming': {
    phone: '+86 (021) 5905 3456',
    mobile: '137 3456 7890',
    ext: '87890',
    email: 'ming.li1@csvw.com',
    jobLevel: 'M5',
    age: '41',
    englishName: 'Li Ming'
  },
  '岳海文': {
    phone: '+86 (021) 5905 4567',
    mobile: '136 4567 8901',
    ext: '88901',
    email: 'haiwen.yue@csvw.com',
    jobLevel: 'M5',
    age: '38',
    englishName: 'Yue Haiwen'
  },
  '岳海文 Yue Haiwen': {
    phone: '+86 (021) 5905 4567',
    mobile: '136 4567 8901',
    ext: '88901',
    email: 'haiwen.yue@csvw.com',
    jobLevel: 'M5',
    age: '38',
    englishName: 'Yue Haiwen'
  },
  '何泽夏': {
    phone: '+86 (021) 5905 5678',
    mobile: '135 5678 9012',
    ext: '89012',
    email: 'zexia.he@csvw.com',
    jobLevel: 'M6',
    age: '35',
    englishName: 'He Zexia'
  },
  '何泽夏 He Zexia': {
    phone: '+86 (021) 5905 5678',
    mobile: '135 5678 9012',
    ext: '89012',
    email: 'zexia.he@csvw.com',
    jobLevel: 'M6',
    age: '35',
    englishName: 'He Zexia'
  },
  '贾为健': {
    phone: '+86 (021) 5905 6789',
    mobile: '134 6789 0123',
    ext: '80123',
    email: 'weijian.jia@csvw.com',
    jobLevel: 'M6',
    age: '33',
    englishName: 'Jia Weijian'
  },
  '贾为健 Jia Weijian': {
    phone: '+86 (021) 5905 6789',
    mobile: '134 6789 0123',
    ext: '80123',
    email: 'weijian.jia@csvw.com',
    jobLevel: 'M6',
    age: '33',
    englishName: 'Jia Weijian'
  },
  'Oliver Blume': {
    phone: '+49 5361 9-0',
    mobile: '+49 171 1234567',
    ext: '90',
    email: 'oliver.blume@volkswagen.de',
    jobLevel: 'R0',
    age: '57',
    englishName: 'Oliver Blume'
  },
  'Ralf Brandstätter': {
    phone: '+86 (021) 5905 0001',
    mobile: '138 0000 0001',
    ext: '80001',
    email: 'ralf.brandstaetter@volkswagen.com.cn',
    jobLevel: 'R0',
    age: '55',
    englishName: 'Ralf Brandstätter'
  },
  'Stephan Mecha': {
    phone: '+86 (021) 5905 0002',
    mobile: '138 0000 0002',
    ext: '80002',
    email: 'stephan.mecha@volkswagen.com.cn',
    jobLevel: 'R1',
    age: '52',
    englishName: 'Stephan Mecha'
  },
  '李正阳': {
    phone: '+86 (021) 5905 0003',
    mobile: '138 0000 0003',
    ext: '80003',
    email: 'zhengyang.li@csvw.com',
    jobLevel: 'M4',
    age: '48',
    englishName: 'Li Zhengyang'
  },
  '徐炯': {
    phone: '+86 (021) 5905 0004',
    mobile: '138 0000 0004',
    ext: '80004',
    email: 'jiong.xu@csvw.com',
    jobLevel: 'M5',
    age: '43',
    englishName: 'Xu Jiong'
  },
  '张骏': {
    phone: '+86 (021) 5905 0005',
    mobile: '138 0000 0005',
    ext: '80005',
    email: 'jun.zhang2@csvw.com',
    jobLevel: 'M5',
    age: '40',
    englishName: 'Zhang Jun'
  }
};

const BlueIconWrapper = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-blue-600 p-1 rounded text-white flex items-center justify-center">
    {children}
  </div>
);

export const PersonDetailDrawer: React.FC<PersonDetailDrawerProps & { onNavigate?: (view: string, params?: any) => void }> = ({ isOpen, onClose, person, onNavigate }) => {
  if (!person) return null;

  const cleanName = person.name ? person.name.trim() : '';
  let info = PERSONAL_INFO_MAP[cleanName];
  if (!info) {
    const key = Object.keys(PERSONAL_INFO_MAP).find(k => cleanName.startsWith(k) || k.startsWith(cleanName));
    info = key ? PERSONAL_INFO_MAP[key] : {
      phone: '+86 (021) 5905 9999',
      mobile: '139 9999 9999',
      ext: '89999',
      email: 'pinyinnames@csvw.com',
      jobLevel: 'M6',
      age: '35',
      englishName: cleanName
    };
  }

  const englishName = person.englishName || info.englishName || 'Sun Yujie';

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[110] bg-black/30 backdrop-blur-[1px]"
          />
          
          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 z-[111] h-full w-[400px] bg-white shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Close Button */}
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 z-10 p-1 bg-white/80 backdrop-blur-sm rounded-full text-gray-500 hover:text-gray-700 transition-colors shadow-sm"
            >
              <X size={20} />
            </button>
 
            {/* Banner */}
            <div className="h-40 w-full relative shrink-0 cursor-pointer" onClick={() => { onClose(); onNavigate?.('personnel-details', { personId: person.id }); }}>
              <img 
                src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=1000" 
                alt="Banner" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
 
            {/* Profile Info Section */}
            <div className="px-6 pb-6 relative overflow-y-auto custom-scrollbar flex-1">
              {/* Profile Picture */}
              <div className="absolute -top-16 left-6 cursor-pointer" onClick={() => { onClose(); onNavigate?.('personnel-details', { personId: person.id }); }}>
                <div className="relative">
                  <div className="w-32 h-32 rounded-full border-4 border-white overflow-hidden bg-gray-100 shadow-md">
                    <img 
                      src={person.avatar || "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=150&h=150"} 
                      alt={person.name} 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <button className="absolute bottom-1 right-1 bg-white p-1.5 rounded-full shadow-md text-blue-600 hover:bg-gray-50 transition-colors border border-gray-100">
                    <Camera size={16} />
                  </button>
                </div>
              </div>
 
              {/* Action Buttons */}
              <div className="flex justify-end gap-2 mt-4 items-center">
                <button className="bg-gray-100 p-2 rounded-xl text-gray-600 hover:bg-gray-200 transition-colors border border-gray-200/50" title="个人信息">
                  <Contact size={20} />
                </button>
                <button 
                  onClick={() => {
                    onClose();
                    onNavigate?.('organization-v2', { tab: 'reporting', focusPersonName: person.name, focusPersonId: person.id });
                  }}
                  className="bg-blue-50 text-blue-600 px-3.5 py-2 rounded-xl text-xs font-bold hover:bg-blue-100 transition-all border border-blue-100 flex items-center gap-1.5 shadow-sm"
                  title="查看组织架构"
                >
                  <Network size={16} />
                  <span>组织架构</span>
                </button>
              </div>
 
              {/* Name and Title */}
              <div className="mt-8 cursor-pointer" onClick={() => { onClose(); onNavigate?.('personnel-details', { personId: person.id }); }}>
                <h1 className="text-[28px] font-bold text-[#1a2b4b] mb-1 leading-tight">
                  {person.name.split(' ')[0]} <span className="text-[#1a2b4b] text-[20px] font-semibold">{englishName}</span>
                </h1>
                <p className="text-gray-500 font-medium text-lg mb-1">{person.title || '市场研究专员'}</p>
                <p className="text-gray-500 text-base">{person.departmentName || '电气规划'} ({person.departmentCode || '50003038'})</p>
              </div>
 
              {/* Details */}
              <div className="mt-8 space-y-5">
                <div className="flex items-center gap-4 text-[#1a2b4b]">
                  <div className="w-6 flex justify-center">
                    <MapPin size={22} className="text-[#1a2b4b]" />
                  </div>
                  <span className="font-bold text-[17px]">{person.location || '安亭本部-SVW Anting (9001)'}</span>
                </div>
                <div className="flex items-center gap-4 text-[#1a2b4b]">
                  <div className="w-6 flex justify-center">
                    <Clock size={22} className="text-[#1a2b4b]" />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-[17px]">{person.localTime || '14:16'}</span>
                    <span className="text-gray-500 text-[15px] font-medium">(本地时间)</span>
                  </div>
                </div>
              </div>

              {/* Contact Info Section */}
              <div className="mt-8 pt-6 border-t border-gray-100">
                <h3 className="text-gray-500 text-xs font-bold mb-4 uppercase tracking-wider">联系信息</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 text-[#1a2b4b]">
                    <div className="w-6 flex justify-center text-gray-400">
                      <Phone size={18} />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs text-gray-400">电话</span>
                      <span className="font-bold text-[15px]">{info.phone}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 text-[#1a2b4b]">
                    <div className="w-6 flex justify-center text-gray-400">
                      <Smartphone size={18} />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs text-gray-400">手机</span>
                      <span className="font-bold text-[15px]">{info.mobile}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-[#1a2b4b]">
                    <div className="w-6 flex justify-center text-gray-400">
                      <Hash size={18} />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs text-gray-400">短号</span>
                      <span className="font-bold text-[15px]">{info.ext}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-[#1a2b4b]">
                    <div className="w-6 flex justify-center text-gray-400">
                      <Mail size={18} />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs text-gray-400">邮件地址</span>
                      <span className="font-bold text-[15px] break-all">{info.email}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sensitive Info Section */}
              <div className="mt-8 pt-6 border-t border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-gray-500 text-xs font-bold uppercase tracking-wider">敏感信息</h3>
                  <span className="text-[11px] bg-amber-50 text-amber-700 px-2 py-0.5 rounded-full font-bold border border-amber-200 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                    仅 HR / 管理员可见
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-4 bg-amber-50/30 p-4 rounded-xl border border-amber-100/50">
                  <div className="flex items-center gap-3 text-[#1a2b4b]">
                    <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center text-amber-600">
                      <Award size={18} />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs text-gray-400">职位能级</span>
                      <span className="font-bold text-[15px]">{info.jobLevel}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 text-[#1a2b4b]">
                    <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center text-amber-600">
                      <Calendar size={18} />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs text-gray-400">年龄</span>
                      <span className="font-bold text-[15px]">{info.age} 岁</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Manager Section */}
              <div className="mt-12 pt-8 border-t border-gray-100">
                <h3 className="text-gray-500 text-sm font-bold mb-6">直接经理</h3>
                <div className="flex items-center gap-5 group cursor-pointer">
                  <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-100 border-2 border-gray-50 shadow-sm">
                    <img 
                      src={person.managerAvatar || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150&h=150"} 
                      alt={person.managerName || "徐炯"} 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-bold text-[18px] text-[#1a2b4b] group-hover:text-blue-600 transition-colors">
                        {person.managerName || '徐炯 Xu Jiong'}
                      </h4>
                      <div 
                        className="text-blue-600 bg-blue-50 p-1 rounded cursor-pointer hover:bg-blue-100 transition-colors"
                        onClick={() => { onClose(); onNavigate?.('personnel-details', { personId: person.managerId || 'default' }); }}
                      >
                        <Contact size={18} />
                      </div>
                    </div>
                    <p className="text-gray-500 font-medium">{person.managerTitle || 'PMIF-5经理'}</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
