
import React, { useState, useEffect } from 'react';
import { useLanguage } from '../LanguageContext';
import { EmployeeDashboard } from './dashboard/EmployeeDashboard';
import { ManagerDashboard } from './dashboard/ManagerDashboard';
import { HRBPDashboard } from './dashboard/HRBPDashboard';

export type Role = 'employee' | 'manager' | 'hrbp';

interface DashboardProps {
  initialRole?: Role;
  onNavigate?: (view: string) => void;
  visibleWidgets?: string[];
  onRemoveWidget?: (id: string) => void;
  isEditMode?: boolean;
}

export const Dashboard: React.FC<DashboardProps> = ({ 
  initialRole = 'employee', 
  onNavigate,
  visibleWidgets,
  onRemoveWidget,
  isEditMode
}) => {
  const [role, setRole] = useState<Role>(initialRole);
  const { t } = useLanguage();

  useEffect(() => {
    // Ensure initialRole is a valid role, fallback if it was 'hrssc' or invalid
    if (initialRole === 'hrssc' as any) {
        setRole('employee');
    } else {
        setRole(initialRole);
    }
  }, [initialRole]);

  return (
    <div className="space-y-4 animate-fade-in">
       {/* View Content based on Role */}
       {role === 'manager' && (
         <ManagerDashboard 
           onNavigate={onNavigate} 
           visibleWidgets={visibleWidgets} 
           onRemoveWidget={onRemoveWidget} 
           isEditMode={isEditMode}
         />
       )}
       {role === 'employee' && (
         <EmployeeDashboard 
           onNavigate={onNavigate} 
           visibleWidgets={visibleWidgets} 
           onRemoveWidget={onRemoveWidget} 
           isEditMode={isEditMode}
         />
       )}
       {role === 'hrbp' && (
         <HRBPDashboard 
           onNavigate={onNavigate} 
           visibleWidgets={visibleWidgets} 
           onRemoveWidget={onRemoveWidget} 
           isEditMode={isEditMode}
         />
       )}
    </div>
  );
};
