
import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { Dashboard } from './components/Dashboard';
import { InternalRecruitment } from './components/recruitment/InternalRecruitment';
import { ExternalRecruitment } from './components/recruitment/ExternalRecruitment';
import { RecruitmentProgress } from './components/recruitment/RecruitmentProgress';
import { Performance } from './components/Performance';
import { JobPosting } from './components/JobPosting';
import { Organization } from './components/Organization';
import { OrganizationV2 } from './components/organization/OrganizationV2';
import { Reports } from './components/Reports';
import { Onboarding } from './components/Onboarding';
import { TalentSearch } from './components/TalentSearch';
import { TalentTags } from './components/TalentTags';
import { SystemView } from './components/SystemView';
import { MessageTemplateManagement } from './components/system/MessageTemplateManagement';
import { EvaluationTemplateManagement } from './components/system/EvaluationTemplateManagement';
import { InternalJobBoard } from './components/recruitment/InternalJobBoard';
import { ProcessCenter } from './components/process/ProcessCenter';
import { EmployeeProfile } from './components/personnel/EmployeeProfile';
import { EmployeeProfileDetails } from './components/personnel/EmployeeProfileDetails';
import { InternalInsights } from './components/recruitment/InternalInsights';
import { StageWorkspace } from './components/StageWorkspace';
import { AppCenter } from './components/system/AppCenter'; // New
import { MyWorkspaceConfig } from './components/system/MyWorkspaceConfig'; // New
import { TodoView } from './components/TodoView'; // New
import { SystemAppCenterModal } from './components/system/SystemAppCenterModal';
import { DynamicGroups } from './components/system/DynamicGroups';
import { MessageTemplatesList } from './components/system/MessageTemplatesList';
import { 
  Menu, 
  LayoutDashboard, 
  Briefcase, 
  Bell, 
  UserCircle,
  CheckSquare,
  Sparkles,
  X,
  Zap,
  AlertCircle,
  Search
} from 'lucide-react';
import { useLanguage } from './LanguageContext';
import { WorkGuideWidget } from './components/dashboard/WorkGuideWidget';

// Mobile-only bottom navigation component
const MobileBottomNav: React.FC<{ currentView: string; onNavigate: (v: string) => void }> = ({ currentView, onNavigate }) => {
  const tabs = [
    { id: 'dashboard', label: '工作台', icon: <LayoutDashboard size={20} /> },
    { id: 'personnel', label: '我的', icon: <UserCircle size={20} /> },
    { id: 'todo', label: '待办', icon: <CheckSquare size={20} /> },
    { id: 'process-center', label: '办理', icon: <Briefcase size={20} /> },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-2 pb-safe flex justify-between items-center z-40 shadow-[0_-2px_15px_rgba(0,0,0,0.08)]">
      {tabs.map(tab => {
        const isActive = currentView.startsWith(tab.id) || (tab.id === 'dashboard' && currentView === 'dashboard-employee');
        return (
          <button 
            key={tab.id}
            onClick={() => onNavigate(tab.id)}
            className={`flex flex-col items-center gap-1 transition-all px-2 ${isActive ? 'text-blue-600 scale-110' : 'text-gray-400'}`}
          >
            {/* Added <any> to ReactElement cast to fix 'strokeWidth' property error */}
            {React.cloneElement(tab.icon as React.ReactElement<any>, { strokeWidth: isActive ? 2.5 : 2 })}
            <span className={`text-[10px] font-bold ${isActive ? 'opacity-100' : 'opacity-70'}`}>{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
};

function App() {
  const [currentView, setCurrentView] = useState('dashboard-employee'); // Defaulting to employee dashboard for accurate title
  const [viewParams, setViewParams] = useState<any>(null);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  // Default desktop sidebar to closed (mini mode)
  const [isDesktopSidebarOpen, setIsDesktopSidebarOpen] = useState(false);
  const [isSystemAppCenterOpen, setIsSystemAppCenterOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isAiAssistantOpen, setIsAiAssistantOpen] = useState(false);

  useEffect(() => {
    const handleToggle = () => setIsAiAssistantOpen(prev => !prev);
    window.addEventListener('toggle-ai-assistant', handleToggle);
    return () => window.removeEventListener('toggle-ai-assistant', handleToggle);
  }, []);

  // Listen to hash change for deep link routing
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.substring(1);
      if (!hash) return;
      
      const params = new URLSearchParams(hash);
      const view = params.get('view');
      if (view) {
        const viewParams: any = {};
        params.forEach((value, key) => {
          if (key !== 'view') {
            viewParams[key] = value;
          }
        });
        const finalParams = Object.keys(viewParams).length > 0 ? viewParams : null;
        
        setCurrentView(prevView => {
          if (prevView !== view) return view;
          return prevView;
        });
        setViewParams(prevParams => {
          if (JSON.stringify(prevParams) !== JSON.stringify(finalParams)) return finalParams;
          return prevParams;
        });
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    
    // Process initial hash on mount
    const initialHash = window.location.hash.substring(1);
    if (initialHash) {
      handleHashChange();
    } else {
      // Initialize hash based on default view
      const searchParams = new URLSearchParams();
      searchParams.set('view', currentView);
      window.location.hash = searchParams.toString();
    }
    
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);
  
  const getCurrentRole = () => {
    if (currentView === 'dashboard-manager') return 'manager';
    if (currentView === 'dashboard-hrbp') return 'hrbp';
    return 'employee';
  };

  const currentRole = getCurrentRole();

  const getVisibleWidgetsKey = (role: string) => {
    return `${role}VisibleWidgets_v2`;
  };

  const [visibleWidgets, setVisibleWidgets] = useState<string[]>(() => {
    const role = getCurrentRole();
    const saved = localStorage.getItem(getVisibleWidgetsKey(role));
    if (saved) return JSON.parse(saved);
    
    // Default widgets per role
    if (role === 'manager') return ['team', 'approvals', 'budget'];
    if (role === 'hrbp') return ['profile', 'quickAccess', 'orgChart', 'approvals', 'teamTable', 'levelDist', 'ageDist', 'funnel', 'recruitment'];
    return ['jobs', 'todo', 'learning', 'appCenter'];
  });

  // Update visibleWidgets when currentView changes to a different dashboard
  useEffect(() => {
    const role = getCurrentRole();
    const saved = localStorage.getItem(getVisibleWidgetsKey(role));
    if (saved) {
      setVisibleWidgets(JSON.parse(saved));
    } else {
      if (role === 'manager') setVisibleWidgets(['team', 'approvals', 'budget']);
      else if (role === 'hrbp') setVisibleWidgets(['profile', 'quickAccess', 'orgChart', 'approvals', 'teamTable', 'levelDist', 'ageDist', 'funnel', 'recruitment']);
      else setVisibleWidgets(['jobs', 'todo', 'learning', 'appCenter']);
    }
  }, [currentView]);

  const { t } = useLanguage();

  const handleNavigate = React.useCallback((view: string, params?: any) => {
    // Update hash for deep linking
    const searchParams = new URLSearchParams();
    searchParams.set('view', view);
    if (params) {
      Object.keys(params).forEach(key => {
        if (params[key] !== undefined && params[key] !== null) {
          searchParams.set(key, String(params[key]));
        }
      });
    }
    const newHash = '#' + searchParams.toString();
    if (window.location.hash !== newHash) {
      window.location.hash = searchParams.toString();
    }
    
    setCurrentView(view);
    setViewParams(params);
  }, []);

  const handleAddWidget = React.useCallback((id: string) => {
    if (!visibleWidgets.includes(id)) {
      const newWidgets = [...visibleWidgets, id];
      setVisibleWidgets(newWidgets);
      localStorage.setItem(getVisibleWidgetsKey(currentRole), JSON.stringify(newWidgets));
    }
  }, [visibleWidgets, currentRole]);

  const handleRemoveWidget = React.useCallback((id: string) => {
    const newWidgets = visibleWidgets.filter(w => w !== id);
    setVisibleWidgets(newWidgets);
    localStorage.setItem(getVisibleWidgetsKey(currentRole), JSON.stringify(newWidgets));
  }, [visibleWidgets, currentRole]);

  const renderContent = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard onNavigate={handleNavigate} visibleWidgets={visibleWidgets} onRemoveWidget={handleRemoveWidget} isEditMode={isEditMode} />;
      case 'dashboard-stage':
        return <StageWorkspace onNavigate={handleNavigate} />;
      case 'my-workspace-config':
        return <MyWorkspaceConfig />;
      case 'dashboard-employee':
        return <Dashboard initialRole="employee" onNavigate={handleNavigate} visibleWidgets={visibleWidgets} onRemoveWidget={handleRemoveWidget} isEditMode={isEditMode} />;
      case 'dashboard-manager':
        return <Dashboard initialRole="manager" onNavigate={handleNavigate} visibleWidgets={visibleWidgets} onRemoveWidget={handleRemoveWidget} isEditMode={isEditMode} />;
      case 'dashboard-hrbp':
        return <Dashboard initialRole="hrbp" onNavigate={handleNavigate} visibleWidgets={visibleWidgets} onRemoveWidget={handleRemoveWidget} isEditMode={isEditMode} />;
      
      case 'process-center':
        return <ProcessCenter initialTab={viewParams?.tab} />;
      
      case 'organization':
        return <Organization />;
      case 'organization-v2':
        return <OrganizationV2 initialTab={viewParams?.tab} onNavigate={handleNavigate} viewParams={viewParams} />;
      
      // Recruitment Management Routes
      case 'internal-job-board':
        return <InternalJobBoard initialJobId={viewParams?.jobId} />;
      case 'internal-jobs':
        return <InternalRecruitment view="jobs" onNavigate={handleNavigate} />;
      case 'internal-mgmt':
        return <InternalRecruitment view="mgmt" onNavigate={handleNavigate} />;
      case 'internal-candidates':
        return <InternalRecruitment view="candidates" onNavigate={handleNavigate} />;
      case 'external-req-v2':
        return <JobPosting initialType="External" initialJobId={viewParams?.jobId} initialPosition={viewParams?.position} />;
      case 'internal-req-v2':
        return <JobPosting initialType="Internal" initialJobId={viewParams?.jobId} initialPosition={viewParams?.position} />;
      case 'job-postings': 
        return <JobPosting initialJobId={viewParams?.jobId} initialPosition={viewParams?.position} />;
      case 'internal-insights':
        return <InternalInsights />;
      case 'recruitment-progress':
        return <RecruitmentProgress />;
        
      // Candidate/Talent Routes (Consolidated)
      case 'external-candidates':
        return <ExternalRecruitment view="candidates" onNavigate={handleNavigate} />;
        
      case 'performance':
        return <Performance view="dashboard" />;
      case 'talent-review':
        return <Performance view="talent-review" />;
      case 'succession-planning':
        return <Performance view="succession-planning" />;
      case 'talent-tags':
        return <TalentTags />;
      case 'talent-search':
        return <TalentSearch mode="internal" />;
      
      case 'reports':
        return <Reports />;
      
      case 'onboarding':
        return <Onboarding />;

      case 'personnel':
        return <EmployeeProfile onNavigate={handleNavigate} />;
      case 'personnel-details':
        return <EmployeeProfileDetails personId={viewParams?.personId} onBack={() => handleNavigate('personnel')} />;

      // System Management Routes
      case 'sys-app-center':
        return <AppCenter mode="admin" />;
      case 'my-app-center':
        return <AppCenter mode="user" />;
      case 'sys-dynamic-groups':
        return <DynamicGroups />;
      case 'msg-email':
        return <MessageTemplatesList type="email" />;
      case 'sys-menu':
        return <SystemView viewId="sys-menu" />;
      case 'todo':
        return <TodoView onNavigate={handleNavigate} initialTab={viewParams?.tab} />;
      case 'sys-templates':
        return <MessageTemplateManagement />;
      case 'sys-eval-templates':
        return <EvaluationTemplateManagement />;
      case 'sys-recruitment-query':
      case 'sys-users':
      case 'sys-permissions':
      case 'sys-api-logs':
      case 'sys-op-logs':
      case 'sys-message-management':
      case 'sys-messages':
      case 'sys-auth':
      case 'sys-monitor':
      case 'attendance-query':
      case 'leave-extension':
      case 'monthly-attendance':
        return <SystemView viewId={currentView} />;
        
      default:
        return (
          <Dashboard 
            onNavigate={handleNavigate} 
            visibleWidgets={visibleWidgets}
            onRemoveWidget={handleRemoveWidget}
            isEditMode={isEditMode}
            initialRole={getCurrentRole()}
          />
        );
    }
  };

  const getTitle = () => {
    const recruitmentMgmt = t('menu.recruitment_management');
    switch (currentView) {
      case 'dashboard': return t('menu.dashboard');
      case 'dashboard-stage': return t('menu.stage_workspace');
      case 'my-workspace-config': return t('menu.my_workspace');
      case 'dashboard-employee': return `${t('menu.dashboard')} - ${t('menu.dash_employee')}`;
      case 'dashboard-manager': return `${t('menu.dashboard')} - ${t('menu.dash_manager')}`;
      case 'dashboard-hrbp': return `${t('menu.dashboard')} - ${t('menu.dash_hrbp')}`;
      case 'process-center': return '待办中心';
      case 'organization': return t('menu.organization');
      
      case 'internal-job-board': return t('menu.internal_job_board');
      case 'internal-jobs': return `${recruitmentMgmt} - ${t('menu.position_requirements')}`;
      case 'internal-mgmt': return `${recruitmentMgmt} - ${t('menu.internal_mgmt')}`;
      case 'internal-candidates': return `${recruitmentMgmt} - ${t('menu.candidate_screening')}`;
      case 'external-req-v2': return `${recruitmentMgmt} - ${t('menu.recruitment_requirements_v2')}`;
      case 'internal-req-v2': return `${recruitmentMgmt} - ${t('menu.recruitment_internal_req')}`;
      case 'internal-insights': return '内招洞察报告';
      case 'recruitment-progress': return t('menu.recruitment_progress');
      case 'external-candidates': return `${recruitmentMgmt} - ${t('menu.candidate_management')}`;
      
      case 'onboarding': return t('menu.onboarding');
      case 'personnel': return t('menu.personnel');
      case 'personnel-details': return '个人档案';
      case 'performance': return t('menu.performance');
      case 'attendance': return t('menu.attendance');
      case 'attendance-query': return t('menu.attendance_query');
      case 'leave-extension': return t('menu.leave_extension');
      case 'monthly-attendance': return t('menu.monthly_attendance');
      case 'talent-review': return t('menu.talent_review');
      case 'succession-planning': return t('menu.succession_planning');
      case 'talent-tags': return t('menu.talent_tags');
      case 'talent-search': return t('menu.talent_search');
      case 'job-postings': return t('menu.position_management');
      case 'reports': return t('menu.reports');
      
      // System Titles
      case 'sys-app-center': return '应用管理中心';
      case 'my-app-center': return '我的应用中心';
      case 'sys-dynamic-groups': return '系统管理 - 动态分组';
      case 'msg-email': return '邮件模版';
      case 'sys-menu': return '菜单管理';
      case 'todo': return '待办任务';
      case 'sys-templates': return t('menu.message_templates');
      case 'sys-recruitment-query': return t('menu.recruitment_query');
      case 'sys-eval-templates': return '职位评价表模版管理';
      case 'sys-users': return '用户管理';
      case 'sys-permissions': return t('menu.permission_mgmt');
      case 'sys-api-logs': return t('menu.api_logs');
      case 'sys-op-logs': return t('menu.operation_logs');
      case 'sys-message-management': return '消息管理中心';
      case 'sys-messages': return '我的消息';
      case 'sys-auth': return t('menu.auth_mgmt');
      case 'sys-monitor': return t('system_monitor');
      
      default: return t('menu.dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50/50 relative">
      {isMobileSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsMobileSidebarOpen(false)}
        />
      )}

      <Sidebar 
        currentView={currentView} 
        setCurrentView={setCurrentView} 
        isOpen={isMobileSidebarOpen}
        isDesktopOpen={isDesktopSidebarOpen}
        onClose={() => setIsMobileSidebarOpen(false)}
      />
      
      <Header 
        title={getTitle()} 
        currentView={currentView}
        onMenuClick={() => setIsMobileSidebarOpen(true)}
        onToggleDesktopSidebar={() => setIsDesktopSidebarOpen(prev => !prev)}
        isDesktopSidebarOpen={isDesktopSidebarOpen}
        onNavigate={handleNavigate}
        onOpenSystemAppCenter={() => setIsSystemAppCenterOpen(true)}
        isEditMode={isEditMode}
        setIsEditMode={setIsEditMode}
      />
      
      <main className={`pt-12 pb-20 md:pb-8 transition-all duration-300 ${isDesktopSidebarOpen ? 'md:pl-64' : 'md:pl-20'}`}>
        <div className="w-full px-4 md:px-8 py-4 md:py-8">
          {renderContent()}
        </div>
      </main>

      <SystemAppCenterModal 
        isOpen={isSystemAppCenterOpen}
        onClose={() => setIsSystemAppCenterOpen(false)}
        onAddCard={handleAddWidget}
        addedCards={visibleWidgets}
      />

      <MobileBottomNav currentView={currentView} onNavigate={handleNavigate} />

      {/* Global Floating AI Assistant */}
      {!isAiAssistantOpen && (
        <button 
          onClick={() => setIsAiAssistantOpen(true)}
          className="fixed bottom-24 right-8 z-[100] w-14 h-14 bg-blue-600 rounded-full shadow-2xl flex items-center justify-center text-white hover:bg-blue-700 transition-all hover:scale-110 active:scale-95 ring-4 ring-blue-600/20"
        >
          <Sparkles size={24} className="animate-pulse" />
        </button>
      )}

      {isAiAssistantOpen && (
        <div className="fixed bottom-24 right-8 z-[100] w-80 animate-scale-up">
          <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden flex flex-col max-h-[500px] ring-1 ring-black/5">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-4 flex justify-between items-center shrink-0">
              <div className="flex items-center gap-2">
                <div className="bg-white/20 p-1.5 rounded-lg backdrop-blur-sm">
                  <Sparkles size={18} className="text-white animate-pulse" />
                </div>
                <div>
                  <h3 className="text-white font-black text-sm tracking-wider uppercase">HR智能问询</h3>
                  <p className="text-blue-100 text-[10px] opacity-80">您的专属 HR 专家</p>
                </div>
              </div>
              <button 
                onClick={() => setIsAiAssistantOpen(false)}
                className="text-white/70 hover:text-white p-1 hover:bg-white/10 rounded-full transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
              <WorkGuideWidget />
            </div>

            {/* Footer */}
            <div className="p-3 bg-gray-50 border-t border-gray-100 text-center shrink-0">
              <p className="text-[10px] text-gray-400">由 Gemini AI 提供技术支持</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
