import React, { useState, useEffect } from 'react';
import { DepartmentArchitecture } from './DepartmentArchitecture';
import { PositionArchitecture } from './PositionArchitecture';
import { ReportingRelationship } from './ReportingRelationship';
import { Maximize2 } from 'lucide-react';

export const OrganizationV2 = ({ initialTab, onNavigate, viewParams }: { initialTab?: 'department' | 'position' | 'reporting', onNavigate?: (view: string, params?: any) => void, viewParams?: any }) => {
  const [activeTab, setActiveTab] = useState<'department' | 'position' | 'reporting'>(initialTab || 'department');

  useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab]);

  return (
    <div className="h-full flex flex-col bg-gray-50">
      {/* Tabs */}
      <div className="bg-white px-6 border-b border-gray-200">
        <div className="flex justify-center space-x-12">
          <button
            onClick={() => setActiveTab('department')}
            className={`py-4 text-[15px] font-bold border-b-2 transition-colors ${
              activeTab === 'department' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-400 hover:text-gray-700'
            }`}
          >
            部门架构
          </button>
          <button
            onClick={() => setActiveTab('position')}
            className={`py-4 text-[15px] font-bold border-b-2 transition-colors ${
              activeTab === 'position' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-400 hover:text-gray-700'
            }`}
          >
            岗位汇报关系
          </button>
          <button
            onClick={() => setActiveTab('reporting')}
            className={`py-4 text-[15px] font-bold border-b-2 transition-colors ${
              activeTab === 'reporting' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-400 hover:text-gray-700'
            }`}
          >
            汇报关系
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-6">
        {activeTab === 'department' && <DepartmentArchitecture onNavigate={onNavigate} />}
        {activeTab === 'position' && <PositionArchitecture onNavigate={onNavigate} />}
        {activeTab === 'reporting' && <ReportingRelationship onNavigate={onNavigate} viewParams={viewParams} />}
      </div>
    </div>
  );
};
