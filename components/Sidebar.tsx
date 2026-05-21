
import React, { useState, useRef, useEffect } from 'react';
import { 
  LayoutDashboard, 
  Users, 
  FileText, 
  UserPlus, 
  Briefcase, 
  TrendingUp, 
  Award, 
  Settings, 
  ChevronDown, 
  ChevronRight, 
  LogOut,
  X,
  Globe,
  PieChart,
  GitPullRequest,
  Network,
  BarChart2,
  Search,
  Tag,
  Shield,
  Activity,
  Bell,
  Key,
  Server,
  User,
  Headphones,
  Zap,
  Clock,
  Calendar,
  ClipboardList,
  Database,
  Mail,
  MessageSquare,
  ClipboardCheck,
  CheckCircle,
  BarChart3,
  SearchCode,
  ActivitySquare,
  Monitor,
  Component,
  AppWindow,
  Home,
  Menu as MenuIcon
} from 'lucide-react';
import { NavItem } from '../types';
import { useLanguage } from '../LanguageContext';

interface SidebarProps {
  currentView: string;
  setCurrentView: (view: string) => void;
  isOpen: boolean;
  isDesktopOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentView, setCurrentView, isOpen, isDesktopOpen, onClose }) => {
  const [expandedMenus, setExpandedMenus] = useState<string[]>(['recruitment', 'system']);
  const [flyoutMenu, setFlyoutMenu] = useState<{ id: string, top: number } | null>(null);
  const flyoutTimerRef = useRef<number | null>(null);
  const { t } = useLanguage();

  // The sidebar is effectively open only if it's toggled open
  // Removed isHovered expansion to support stable mini-mode with flyout panels
  const isEffectiveOpen = isDesktopOpen;

  const toggleMenu = (id: string, e: React.MouseEvent) => {
    if (!isEffectiveOpen) return;
    setExpandedMenus(prev => 
      prev.includes(id) ? [] : [id]
    );
  };

  const handleItemClick = (id: string) => {
    setCurrentView(id);
    if (window.innerWidth < 768) {
      onClose();
    }
  };

  const handleMouseEnter = (item: NavItem, e: React.MouseEvent) => {
    if (isEffectiveOpen || !item.subItems) {
      setFlyoutMenu(null);
      return;
    }
    
    if (flyoutTimerRef.current) {
      window.clearTimeout(flyoutTimerRef.current);
    }

    if (!e.currentTarget) return;

    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    setFlyoutMenu({
      id: item.id,
      top: rect.top
    });
  };

  const handleMouseLeave = () => {
    flyoutTimerRef.current = window.setTimeout(() => {
      setFlyoutMenu(null);
    }, 200);
  };

  const menuItems: NavItem[] = [
    { 
      id: 'dashboard', 
      label: '工作台', 
      icon: <LayoutDashboard size={20} />
    },
    { id: 'process-center', label: '待办中心', icon: <GitPullRequest size={20} /> },
    
    { id: 'organization-v2', label: '组织架构', icon: <Network size={20} /> },
    { id: 'sys-messages', label: '我的消息', icon: <Bell size={20} /> },
    { id: 'my-app-center', label: '我的应用中心', icon: <AppWindow size={20} /> },
    { 
      id: 'recruitment', 
      label: '招聘管理', 
      icon: <Users size={20} />,
      subItems: [
        { id: 'external-req-v2', label: t('menu.recruitment_requirements_v2'), icon: <Globe size={16} /> },
        { id: 'internal-req-v2', label: t('menu.recruitment_internal_req'), icon: <ClipboardCheck size={16} /> },
        { id: 'recruitment-progress', label: t('menu.recruitment_progress'), icon: <ActivitySquare size={16} /> },
        { id: 'internal-job-board', label: t('menu.internal_job_board'), icon: <Briefcase size={16} /> },
        { id: 'internal-mgmt', label: t('menu.internal_mgmt'), icon: <ClipboardList size={16} /> },
        { id: 'internal-insights', label: '内招洞察报告', icon: <BarChart3 size={16} /> }
      ]
    },
    { id: 'personnel-details', label: '个人档案', icon: <User size={20} /> },
    { 
      id: 'attendance', 
      label: '考勤管理', 
      icon: <Clock size={20} />,
      subItems: [
        { id: 'attendance-query', label: t('menu.attendance_query'), icon: <Search size={16} /> },
        { id: 'leave-extension', label: t('menu.leave_extension'), icon: <Calendar size={16} /> },
        { id: 'monthly-attendance', label: t('menu.monthly_attendance'), icon: <ClipboardList size={16} /> }
      ]
    },
    { 
      id: 'performance', 
      label: '绩效管理', 
      icon: <TrendingUp size={20} />,
      subItems: [
        { id: 'talent-review', label: t('menu.talent_review'), icon: <PieChart size={16} /> },
        { id: 'succession-planning', label: t('menu.succession_planning'), icon: <GitPullRequest size={16} /> },
        { id: 'talent-tags', label: t('menu.talent_tags'), icon: <Tag size={16} /> },
        { id: 'talent-search', label: t('menu.talent_search'), icon: <Search size={16} /> }
      ]
    },
    { id: 'system', label: '系统管理', icon: <Server size={20} />, 
      subItems: [
        { id: 'sys-users', label: '用户管理', icon: <Users size={16} /> },
        { id: 'sys-message-management', label: '消息管理中心', icon: <Bell size={16} /> },
        { id: 'sys-app-center', label: '应用管理中心', icon: <AppWindow size={16} /> },
        { id: 'sys-menu', label: '菜单管理', icon: <MenuIcon size={16} /> },
        { id: 'sys-permissions', label: t('menu.permission_mgmt'), icon: <Shield size={16} /> },
        { id: 'sys-dynamic-groups', label: '动态分组', icon: <Users size={16} /> },
        { id: 'sys-api-logs', label: t('menu.api_logs'), icon: <FileText size={16} /> },
        { id: 'sys-op-logs', label: t('menu.operation_logs'), icon: <FileText size={16} /> },
      ]
    },
    { 
      id: 'msg-templates', 
      label: '消息模版', 
      icon: <Mail size={20} />,
      subItems: [
        { id: 'msg-email', label: '邮件模版', icon: <Mail size={16} /> },
      ]
    },
  ];

  return (
    <>
      <div 
        className={`fixed inset-y-0 left-0 z-50 bg-[#D4E3FF] border-r border-[#95AAB7] transition-all duration-300 ease-in-out overflow-x-hidden
          ${isOpen ? 'translate-x-0 w-64' : 'max-md:-translate-x-full'} 
          ${isEffectiveOpen ? 'md:w-64' : 'md:w-20'} 
          shadow-xl md:shadow-none flex flex-col h-full`}
      >
        <div className="h-16 flex items-center px-4 bg-[#0066b3] text-white font-bold text-xl tracking-wide shadow-md z-10 shrink-0">
          <div className={`flex items-center transition-all duration-300 ${isEffectiveOpen ? 'w-full' : 'w-10 mx-auto'}`}>
            <img 
              src="https://brand2.svw-volkswagen.com/temp/2024/240624_loading%403X.gif?x-oss-process=style/webp"
              alt="VW Logo"
              className="h-8 w-auto object-contain shrink-0"
            />
            <div className={`ml-3 transition-opacity duration-300 ${isEffectiveOpen ? 'opacity-100' : 'opacity-0 md:hidden'}`}>
              <div className="text-sm font-black leading-tight tracking-tighter">上汽大众</div>
              <div className="text-[8px] font-normal leading-none opacity-80 uppercase">SAIC VOLKSWAGEN</div>
            </div>
          </div>
          <button onClick={onClose} className="md:hidden ml-auto text-slate-600 hover:text-slate-900">
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto no-scrollbar py-2">
          <nav className="space-y-0.5">
            {menuItems.map((item) => {
              const isActive = currentView.startsWith(item.id);
              return (
                <div key={item.id} className="relative">
                  {item.subItems ? (
                    <div>
                      <button
                        onClick={(e) => isEffectiveOpen ? toggleMenu(item.id, e) : handleItemClick(item.subItems![0].id)}
                        onMouseEnter={(e) => handleMouseEnter(item, e)}
                        onMouseLeave={handleMouseLeave}
                        className={`w-full flex transition-all relative group/item mb-1 ${
                          isEffectiveOpen 
                            ? 'flex-row items-center px-4 py-3' 
                            : 'flex-col items-center justify-center py-4'
                        } ${
                          isActive
                            ? 'text-[#0066b3] bg-white border-y border-[#91A5B2]' 
                            : 'text-black hover:bg-[#9BB0BD]'
                        }`}
                      >
                        {/* Active Indicator Bar (Mini Mode) */}
                        {isActive && !isEffectiveOpen && (
                          <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#0066b3]"></div>
                        )}
                        
                        <div className="relative shrink-0">
                          <span className={`transition-colors shrink-0 ${isEffectiveOpen ? 'mr-3' : 'mb-1'} ${isActive ? 'text-[#0066b3]' : 'text-slate-700/80'}`}>
                            {item.icon}
                          </span>
                          {/* Mock Badge for Dashboard */}
                          {item.id === 'dashboard' && !isEffectiveOpen && (
                            <div className="absolute -top-2 -right-2 bg-red-500 text-white text-[9px] font-bold px-1 rounded-full min-w-[16px] h-4 flex items-center justify-center border-2 border-white shadow-sm">
                              43
                            </div>
                          )}
                        </div>

                        <span className={`truncate transition-all duration-200 font-medium ${
                          isEffectiveOpen ? 'text-sm opacity-100' : 'text-[11px] leading-tight text-center px-1'
                        }`}>
                          {item.label}
                        </span>

                        {isEffectiveOpen && (
                          <div className="ml-auto">
                            {item.subItems && item.subItems.length > 0 ? (
                               expandedMenus.includes(item.id) ? (
                                 <ChevronDown size={14} className={isActive ? "text-[#0066b3]" : "text-slate-500"} />
                               ) : (
                                 <ChevronDown size={14} className={isActive ? "text-[#0066b3]" : "text-slate-500"} /> // Use ChevronDown for expansion as shown in img
                               )
                            ) : (
                               <ChevronRight size={14} className={isActive ? "text-[#0066b3]" : "text-slate-500"} />
                            )}
                          </div>
                        )}
                      </button>
                      
                      {expandedMenus.includes(item.id) && isEffectiveOpen && item.subItems && (
                        <div className="bg-[#9BB0BD]/20 animate-fade-in divide-y divide-white/5 border-b border-[#91A5B2]">
                          {item.subItems.map((sub) => (
                            <button
                              key={sub.id}
                              onClick={() => handleItemClick(sub.id)}
                              className={`group w-full flex items-center px-10 py-3 text-sm font-medium transition-colors ${
                                currentView === sub.id
                                  ? 'text-[#0066b3] bg-white/80'
                                  : 'text-black hover:text-black hover:bg-white/40'
                              }`}
                            >
                               {sub.icon && (
                                 <span className={`mr-3 transition-opacity ${currentView === sub.id ? 'text-[#0066b3]' : 'opacity-60 text-slate-800'}`}>
                                    {sub.icon}
                                 </span>
                               )}
                              {sub.label}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <button
                      onClick={() => handleItemClick(item.id)}
                      onMouseEnter={() => setFlyoutMenu(null)}
                      className={`w-full flex transition-all relative group/item mb-1 ${
                        isEffectiveOpen 
                          ? 'flex-row items-center px-4 py-3' 
                          : 'flex-col items-center justify-center py-4'
                      } ${
                        isActive
                          ? 'text-[#0066b3] bg-white border-y border-[#91A5B2]'
                          : 'text-black hover:bg-[#9BB0BD]'
                      }`}
                    >
                      {/* Active Indicator Bar */}
                      {isActive && !isEffectiveOpen && (
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#0066b3]"></div>
                      )}
                      
                      {isActive && isEffectiveOpen && (
                         <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#0066b3]"></div>
                      )}

                      <span className={`transition-colors shrink-0 ${isEffectiveOpen ? 'mr-3' : 'mb-1'} ${isActive ? 'text-[#0066b3]' : 'text-slate-900 font-bold'}`}>
                        {item.icon}
                      </span>
                      
                      <span className={`truncate transition-all duration-200 font-medium ${
                        isEffectiveOpen ? 'text-sm opacity-100' : 'text-[11px] leading-tight text-center px-1'
                      }`}>
                        {item.label}
                      </span>

                      {isEffectiveOpen && !item.subItems && (
                        <div className="ml-auto">
                           <ChevronRight size={14} className={isActive ? "text-[#0066b3]" : "text-slate-500"} />
                        </div>
                      )}
                    </button>
                  )}
                </div>
              );
            })}
          </nav>
        </div>

        <div className="p-4 border-t border-gray-200 shrink-0">
          <button 
            className={`flex items-center text-sm font-medium text-gray-500 hover:text-red-600 transition-all w-full ${isEffectiveOpen ? 'px-2 py-2' : 'flex-col gap-1 py-3'}`}
          >
            <LogOut size={18} className="shrink-0" />
            <span className={`truncate transition-all duration-200 ${isEffectiveOpen ? 'ml-2' : 'text-[10px]'}`}>
              {t('menu.logout')}
            </span>
          </button>
        </div>
      </div>

      {/* Flyout Panel for Mini Mode */}
      {flyoutMenu && (
        <div 
          className="fixed left-[85px] bg-white shadow-[0_10px_30px_rgba(0,0,0,0.15)] rounded-2xl border border-gray-100 py-4 w-56 z-[100] animate-fade-in pointer-events-auto"
          style={{ top: flyoutMenu.top }}
          onMouseEnter={() => {
            if (flyoutTimerRef.current) window.clearTimeout(flyoutTimerRef.current);
          }}
          onMouseLeave={handleMouseLeave}
        >
          <div className="px-5 pb-3 mb-2 border-b border-gray-50 flex items-center justify-between">
            <span className="font-extrabold text-[#0066b3] text-sm">{menuItems.find(m => m.id === flyoutMenu.id)?.label}</span>
            <div className="w-1.5 h-1.5 rounded-full bg-[#0066b3]"></div>
          </div>
          <div className="space-y-1 px-3">
            {menuItems.find(m => m.id === flyoutMenu.id)?.subItems?.map(sub => (
              <button 
                key={sub.id}
                onClick={() => { handleItemClick(sub.id); setFlyoutMenu(null); }}
                className={`w-full text-left px-4 py-2.5 rounded-xl text-[13px] font-bold transition-all flex items-center justify-between group/sub ${
                  currentView === sub.id ? 'text-[#0066b3] bg-blue-50' : 'text-slate-800 hover:bg-gray-50 hover:text-[#0066b3]'
                }`}
              >
                {sub.label}
                <ChevronRight size={12} className={`opacity-0 group-hover/sub:opacity-100 group-hover/sub:translate-x-1 transition-all ${currentView === sub.id ? 'opacity-100 text-blue-400' : ''}`} />
              </button>
            ))}
          </div>
          {/* Subtle pointer tail */}
          <div className="absolute left-[-6px] top-4 w-3 h-3 bg-white border-l border-t border-gray-100 transform -rotate-45"></div>
        </div>
      )}
    </>
  );
};
