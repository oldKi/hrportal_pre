
import React from 'react';
import { 
  Shield, FileText, Bell, Key, Activity, Server, Clock, Calendar as CalendarIcon, ClipboardList, LayoutDashboard, SearchCode, Menu as MenuIcon, Users
} from 'lucide-react';
import { useLanguage } from '../LanguageContext';
import { AttendanceQuery } from './system/AttendanceQuery';
import { LeaveExtension } from './system/LeaveExtension';
import { MonthlyAttendance } from './system/MonthlyAttendance';
import { ViewConfig } from './system/ViewConfig';
import { PermissionManagement } from './system/PermissionManagement';
import { SystemMonitor } from './system/SystemMonitor';
import { SystemLogs } from './system/SystemLogs';
import { MessageCenter } from './system/MessageCenter';
import { MessageManagement } from './system/MessageManagement';
import { RecruitmentQuery } from './system/RecruitmentQuery';
import { MenuManagement } from './system/MenuManagement';
import { UserManagement } from './system/UserManagement';

interface SystemViewProps {
  viewId: string;
}

// --- Main SystemView Component ---
export const SystemView: React.FC<SystemViewProps> = ({ viewId }) => {
  const { t } = useLanguage();

  // Helper to render content based on viewId
  const renderContent = () => {
    switch (viewId) {
      case 'sys-users':
        return <UserManagement />;

      case 'attendance-query':
        return <AttendanceQuery />;

      case 'leave-extension':
        return <LeaveExtension />;

      case 'monthly-attendance':
        return <MonthlyAttendance />;

      case 'sys-view-config':
        return <ViewConfig />;

      case 'sys-permissions':
        return <PermissionManagement />;
      
      case 'sys-menu':
        return <MenuManagement />;
      
      case 'sys-monitor':
        return <SystemMonitor />;

      case 'sys-api-logs':
        return <SystemLogs type="api" />;
      
      case 'sys-op-logs':
        return <SystemLogs type="operation" />;

      case 'sys-message-management':
        return <MessageManagement />;

      case 'sys-messages':
        return <MessageCenter />;
      
      case 'sys-recruitment-query':
        return <RecruitmentQuery />;

      default:
        return (
           <div className="flex flex-col items-center justify-center h-96 bg-white rounded-lg border border-gray-100 border-dashed">
              <div className="p-4 bg-gray-50 rounded-full mb-4">
                 <Server size={32} className="text-gray-400" />
              </div>
              <h3 className="text-lg font-bold text-gray-700">功能模块建设中</h3>
              <p className="text-gray-500 text-sm mt-2">该系统管理模块 ({t(`menu.${viewId.replace('sys-', '').replace('-', '_')}`) || viewId}) 正在开发中...</p>
           </div>
        );
    }
  };

  const getTitle = () => {
     switch(viewId) {
        case 'sys-users': return '用户管理';
        case 'sys-permissions': return t('menu.permission_mgmt');
        case 'sys-menu': return '菜单管理';
        case 'sys-view-config': return t('menu.view_config');
        case 'sys-api-logs': return t('menu.api_logs');
        case 'sys-op-logs': return t('menu.operation_logs');
        case 'sys-message-management': return '消息管理中心';
        case 'sys-messages': return t('menu.message_center');
        case 'sys-auth': return t('menu.auth_mgmt');
        case 'sys-monitor': return t('menu.system_monitor');
        case 'sys-recruitment-query': return t('menu.recruitment_query');
        case 'attendance-query': return t('menu.attendance_query');
        case 'leave-extension': return t('menu.leave_extension');
        case 'monthly-attendance': return t('menu.monthly_attendance');
        default: return '系统管理';
     }
  };

  const getIcon = () => {
    switch(viewId) {
        case 'sys-users': return <Users className="mr-3 text-blue-600" />;
        case 'sys-permissions': return <Shield className="mr-3 text-blue-600" />;
        case 'sys-menu': return <MenuIcon className="mr-3 text-blue-600" />;
        case 'sys-view-config': return <LayoutDashboard className="mr-3 text-blue-600" />;
        case 'sys-api-logs': return <FileText className="mr-3 text-orange-500" />;
        case 'sys-op-logs': return <FileText className="mr-3 text-orange-500" />;
        case 'sys-message-management': return <Bell className="mr-3 text-yellow-500" />;
        case 'sys-messages': return <Bell className="mr-3 text-yellow-500" />;
        case 'sys-auth': return <Key className="mr-3 text-purple-600" />;
        case 'sys-monitor': return <Activity className="mr-3 text-green-600" />;
        case 'sys-recruitment-query': return <SearchCode className="mr-3 text-blue-600" />;
        case 'attendance-query': return <Clock className="mr-3 text-blue-600" />;
        case 'leave-extension': return <CalendarIcon className="mr-3 text-blue-600" />;
        case 'monthly-attendance': return <ClipboardList className="mr-3 text-blue-600" />;
        default: return <Server className="mr-3 text-gray-600" />;
    }
  };

  // Special handling for full-width views
  if (viewId === 'sys-recruitment-query') {
    return renderContent();
  }

  return (
    <div className="animate-fade-in">
      <div className="mb-6 px-4 md:px-0">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center">
           {getIcon()}
           {getTitle()}
        </h2>
        <p className="text-sm text-gray-500 mt-1 ml-9">
           {viewId.startsWith('sys-') ? '系统管理中心' : '考勤管理'} / {getTitle()}
        </p>
      </div>
      
      {renderContent()}
    </div>
  );
};
