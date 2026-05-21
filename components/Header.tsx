import React, { useEffect, useState } from 'react';
import { Bell, Search, Settings, Grid, Sparkles, Menu } from 'lucide-react';
import { useLanguage } from '../LanguageContext';
import { matchPinyin } from './pinyinUtils';
import { MOCK_EMPLOYEE_DETAILS } from './personnel/employeeData';

interface HeaderProps {
  title: string;
  currentView?: string;
  onMenuClick: () => void;
  onNavigate?: (view: string, params?: any) => void;
  onToggleDesktopSidebar: () => void;
  isDesktopSidebarOpen: boolean;
  onOpenSystemAppCenter?: () => void;
  isEditMode?: boolean;
  setIsEditMode?: (val: boolean) => void;
}

export const Header: React.FC<HeaderProps> = ({ 
  title, 
  currentView,
  onMenuClick, 
  onNavigate,
  onToggleDesktopSidebar,
  isDesktopSidebarOpen,
  onOpenSystemAppCenter,
  isEditMode,
  setIsEditMode
}) => {
  const [isShaking, setIsShaking] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showSettingsMenu, setShowSettingsMenu] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [showSearchResults, setShowSearchResults] = useState(false);

  // Derive mock employees dynamically from our unified database
  const mockEmployees = Object.values(MOCK_EMPLOYEE_DETAILS).map(emp => ({
    name: emp.name,
    id: emp.id,
    dept: emp.dept,
    position: emp.position
  }));

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (value.trim()) {
      const filtered = mockEmployees.filter(emp => 
        matchPinyin(emp.name, value, emp.id)
      );
      setSearchResults(filtered);
      setShowSearchResults(true);
    } else {
      setSearchResults([]);
      setShowSearchResults(false);
    }
  };
  // Simulating a state where we have notifications
  const hasNotifications = true;
  const { t, language, setLanguage } = useLanguage();

  useEffect(() => {
    if (hasNotifications) {
      // Shake every 5 seconds
      const interval = setInterval(() => {
        setIsShaking(true);
        // Stop shaking after animation completes (1s)
        setTimeout(() => setIsShaking(false), 1000);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [hasNotifications]);

  const toggleLanguage = () => {
    setLanguage(language === 'zh' ? 'en' : 'zh');
  };

  // Mock Notification Data for Dropdown
  const notifications = [
      { id: 1, title: '系统维护通知', time: '10 分钟前', isRead: false },
      { id: 2, title: '2024年五一放假安排', time: '2 小时前', isRead: false },
      { id: 3, title: '绩效考核待办提醒', time: '1 天前', isRead: true },
      { id: 4, title: '新员工入职指引更新', time: '2 天前', isRead: true },
      { id: 5, title: 'API 接口调用异常', time: '3 前', isRead: true },
  ];

  const handleAiClick = () => {
    window.dispatchEvent(new CustomEvent('toggle-ai-assistant'));
  };

  return (
    <header className={`h-12 bg-[#D4E3FF] shadow-sm flex items-center justify-between px-4 md:px-6 fixed top-0 right-0 z-10 text-slate-800 transition-all duration-300 ${isDesktopSidebarOpen ? 'left-0 md:left-64' : 'left-0 md:left-20'}`}>
      {/* Animation Styles */}
      <style>{`
        @keyframes bell-shake {
          0% { transform: rotate(0); }
          15% { transform: rotate(15deg); }
          30% { transform: rotate(-15deg); }
          45% { transform: rotate(10deg); }
          60% { transform: rotate(-10deg); }
          75% { transform: rotate(5deg); }
          85% { transform: rotate(-5deg); }
          100% { transform: rotate(0); }
        }
        .animate-bell {
          animation: bell-shake 0.8s cubic-bezier(.36,.07,.19,.97) both;
          transform-origin: top center;
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
      `}</style>

      <div className="flex items-center gap-2">
        <button 
          onClick={onMenuClick}
          className="md:hidden mr-3 p-1 hover:bg-white/20 rounded"
        >
          <Menu size={20} />
        </button>

        <button 
          onClick={onToggleDesktopSidebar}
          className="bg-white/30 p-1 rounded-md mr-3 cursor-pointer hover:bg-white/50 transition-colors hidden md:block"
          title="Toggle Sidebar"
        >
          <Grid size={16} className="text-slate-700" />
        </button>
        <h1 className="text-base font-medium truncate text-slate-800 mr-2">{title}</h1>

        {/* Role Switcher */}
        {onNavigate && (
          <div className="hidden md:flex items-center bg-white/40 p-0.5 rounded-lg border border-slate-300/30 shadow-sm">
            <button 
              onClick={() => onNavigate('dashboard-employee')} 
              className={`px-3 py-1 text-xs font-bold rounded-md transition-all ${
                currentView === 'dashboard-employee' 
                  ? 'bg-blue-600 text-white shadow-sm' 
                  : 'text-slate-700 hover:text-slate-900 hover:bg-white/20'
              }`}
            >
              员工
            </button>
            <button 
              onClick={() => onNavigate('dashboard-manager')} 
              className={`px-3 py-1 text-xs font-bold rounded-md transition-all ${
                currentView === 'dashboard-manager' 
                  ? 'bg-blue-600 text-white shadow-sm' 
                  : 'text-slate-700 hover:text-slate-900 hover:bg-white/20'
              }`}
            >
              经理
            </button>
            <button 
              onClick={() => onNavigate('dashboard-hrbp')} 
              className={`px-3 py-1 text-xs font-bold rounded-md transition-all ${
                currentView === 'dashboard-hrbp' 
                  ? 'bg-blue-600 text-white shadow-sm' 
                  : 'text-slate-700 hover:text-slate-900 hover:bg-white/20'
              }`}
            >
              HRBP
            </button>
          </div>
        )}
      </div>

      <div className="flex items-center space-x-2 md:space-x-4">
        {/* Global Search */}
        <div className="relative hidden sm:block">
          <div className="relative flex items-center">
            <Search size={14} className="absolute left-2.5 text-slate-500" />
            <input
              type="text"
              placeholder="搜索员工 (姓名/工号)..."
              value={searchTerm}
              onChange={handleSearch}
              onFocus={() => searchTerm.trim() && setShowSearchResults(true)}
              className="pl-8 pr-3 py-1 bg-white/40 hover:bg-white/60 focus:bg-white/80 rounded-full text-[11px] w-48 transition-all border border-slate-300/50 focus:outline-none focus:ring-1 focus:ring-blue-500/50 text-slate-700 placeholder:text-slate-500"
            />
          </div>

          {showSearchResults && searchResults.length > 0 && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setShowSearchResults(false)}></div>
              <div className="absolute top-10 left-0 w-64 bg-white rounded-lg shadow-xl border border-gray-100 z-20 overflow-hidden animate-fade-in text-gray-800">
                <div className="p-2 border-b border-gray-100 bg-gray-50 text-[10px] font-bold text-gray-500 uppercase">
                  搜索结果
                </div>
                <div className="max-h-64 overflow-y-auto">
                  {searchResults.map(emp => (
                    <div 
                      key={emp.id}
                      className="p-2 border-b border-gray-50 hover:bg-blue-50 cursor-pointer transition-colors flex items-center"
                      onClick={() => {
                        setShowSearchResults(false);
                        setSearchTerm('');
                        if (onNavigate) onNavigate('personnel-details', { personId: emp.id });
                      }}
                    >
                      <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-xs mr-3 shrink-0">
                        {emp.name.charAt(0)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-bold text-gray-900 truncate">
                          {emp.name} <span className="text-gray-400 font-mono ml-1">{emp.id}</span>
                        </div>
                        <div className="text-[10px] text-gray-500 truncate">
                          {emp.dept} | {emp.position}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Language Switcher */}
        <button 
          onClick={toggleLanguage}
          className="px-2 py-0.5 bg-white/40 hover:bg-white/60 rounded text-[10px] font-bold transition-colors border border-slate-300/50 text-slate-700"
        >
          {language === 'zh' ? 'EN' : '中'}
        </button>

        {/* Search Bar Removed */}

        <button 
          onClick={handleAiClick}
          className="p-1.5 hover:bg-white/30 rounded-full transition-colors relative hidden sm:block text-slate-700"
          title="AI 助手"
        >
          <Sparkles size={18} />
        </button>

        <div className="relative">
          <button 
            onClick={() => setShowSettingsMenu(!showSettingsMenu)}
            className="p-1.5 hover:bg-white/30 rounded-full transition-colors text-slate-700"
            title="设置"
          >
            <Settings size={18} />
          </button>

          {/* Settings Dropdown */}
          {showSettingsMenu && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setShowSettingsMenu(false)}></div>
              <div className="absolute top-10 right-0 w-48 bg-white rounded-lg shadow-xl border border-gray-100 z-20 overflow-hidden animate-fade-in text-gray-800 origin-top-right transform">
                <div className="py-2">
                  <button 
                    onClick={() => {
                      setShowSettingsMenu(false);
                      setIsEditMode?.(!isEditMode);
                    }}
                    className="w-full text-left px-4 py-2.5 text-sm hover:bg-blue-50 transition-colors flex items-center gap-2"
                  >
                    <Settings size={16} className={isEditMode ? 'animate-spin-slow' : ''} />
                    {isEditMode ? '退出编辑模式' : '进入编辑模式'}
                  </button>
                  <button 
                    className="w-full text-left px-4 py-2.5 text-sm hover:bg-blue-50 transition-colors flex items-center gap-2"
                  >
                    <Grid size={16} />
                    仪表盘设置
                  </button>
                </div>
              </div>
            </>
          )}
        </div>

        <div className="relative">
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            className={`p-1.5 hover:bg-white/30 rounded-full transition-colors relative text-slate-700 ${isShaking ? 'animate-bell' : ''}`}
          >
            <Bell size={18} />
            {hasNotifications && (
              <span className="absolute top-1 right-1 block h-1.5 w-1.5 rounded-full bg-red-500 ring-1 ring-[#D4E3FF]"></span>
            )}
          </button>

          {/* Notification Dropdown */}
          {showNotifications && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setShowNotifications(false)}></div>
              <div className="absolute top-10 right-0 w-80 bg-white rounded-lg shadow-xl border border-gray-100 z-20 overflow-hidden animate-fade-in text-gray-800 origin-top-right transform">
                  <div className="p-3 border-b border-gray-100 font-bold flex justify-between items-center bg-gray-50">
                      <span>通知消息 ({notifications.length})</span>
                      <span className="text-xs text-blue-600 cursor-pointer hover:underline">全部已读</span>
                  </div>
                  <div className="max-h-[300px] overflow-y-auto">
                      {notifications.map(n => (
                          <div
                            key={n.id}
                            className="p-3 border-b border-gray-50 hover:bg-blue-50 cursor-pointer transition-colors"
                            onClick={() => {
                                setShowNotifications(false);
                                if (onNavigate) onNavigate('sys-messages');
                            }}
                          >
                              <div className="flex justify-between items-start mb-1">
                                  <span className={`text-sm font-medium ${n.isRead ? 'text-gray-600' : 'text-gray-900'}`}>{n.title}</span>
                                  {!n.isRead && <span className="w-2 h-2 bg-red-500 rounded-full shrink-0 mt-1.5"></span>}
                              </div>
                              <div className="text-xs text-gray-400">{n.time}</div>
                          </div>
                      ))}
                  </div>
                  <div
                    className="p-3 text-center text-sm text-blue-600 font-medium cursor-pointer hover:bg-gray-50 transition-colors border-t border-gray-100"
                    onClick={() => {
                        setShowNotifications(false);
                        if (onNavigate) onNavigate('sys-messages');
                    }}
                  >
                      查看更多
                  </div>
              </div>
            </>
          )}
        </div>
        
        {/* Workbench Edit Mode Controls */}
        {isEditMode && (
          <div className="flex items-center bg-white/40 rounded-full px-1 py-0.5 border border-blue-400/30 animate-fade-in">
            <button 
              onClick={() => onOpenSystemAppCenter?.()}
              className="px-3 py-1 text-[10px] hover:bg-white/50 text-slate-700 flex items-center gap-1.5 border-r border-slate-400/30 font-medium"
            >
              <Grid size={12} />
              添加卡片
            </button>
            <button 
              onClick={() => setIsEditMode?.(false)}
              className="px-3 py-1 text-[10px] hover:bg-white/50 text-blue-700 font-bold flex items-center gap-1.5"
            >
              <Settings size={12} className="animate-spin-slow" />
              保存配置
            </button>
          </div>
        )}

        <div className="flex items-center pl-2 md:pl-4 md:border-l border-slate-400/30 ml-2 relative">
          <button 
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center hover:bg-white/20 p-1 rounded transition-colors"
          >
            <div className="h-7 w-7 rounded-full bg-white text-slate-600 flex items-center justify-center font-bold mr-2 shadow-sm text-xs">
              JD
            </div>
            <div className="hidden md:block text-left">
              <p className="text-xs font-medium text-slate-800 leading-tight">{t('header.admin')}</p>
              <p className="text-[10px] text-slate-600 leading-tight">管理员</p>
            </div>
          </button>

          {/* User Identity Dropdown */}
          {showUserMenu && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setShowUserMenu(false)}></div>
              <div className="absolute top-10 right-0 w-48 bg-white rounded-lg shadow-xl border border-gray-100 z-20 overflow-hidden animate-fade-in text-gray-800 origin-top-right transform">
                <div className="py-2 border-b border-gray-100">
                  <button 
                    disabled
                    className="w-full text-left px-4 py-2.5 text-sm flex items-center gap-2 text-gray-400 font-bold cursor-not-allowed opacity-50"
                  >
                    <Settings size={16} />
                    齿轮配置
                  </button>
                </div>
                <div className="p-3 border-b border-gray-100 bg-gray-50">
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">切换身份</p>
                </div>
                <div className="py-1">
                  <button 
                    onClick={() => {
                      setShowUserMenu(false);
                      onNavigate?.('dashboard-employee');
                    }}
                    className="w-full text-left px-4 py-2.5 text-sm hover:bg-blue-50 transition-colors flex items-center gap-2"
                  >
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    员工 (Employee)
                  </button>
                  <button 
                    onClick={() => {
                      setShowUserMenu(false);
                      onNavigate?.('dashboard-manager');
                    }}
                    className="w-full text-left px-4 py-2.5 text-sm hover:bg-blue-50 transition-colors flex items-center gap-2"
                  >
                    <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                    部门经理 (Manager)
                  </button>
                  <button 
                    onClick={() => {
                      setShowUserMenu(false);
                      onNavigate?.('dashboard-hrbp');
                    }}
                    className="w-full text-left px-4 py-2.5 text-sm hover:bg-blue-50 transition-colors flex items-center gap-2"
                  >
                    <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                    HRBP
                  </button>
                </div>
                <div className="border-t border-gray-100 py-1">
                  <button 
                    className="w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
                  >
                    退出登录
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
};
