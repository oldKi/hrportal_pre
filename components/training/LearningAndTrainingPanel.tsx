import React from 'react';
import { BookOpen, AlertCircle, PlayCircle, ChevronRight, Clock, ClipboardList } from 'lucide-react';

interface Task {
  id: string;
  title: string;
  type: string;
  date: string;
  status: 'urgent' | 'routine';
}

interface Course {
  id: string;
  title: string;
  tag: string;
  hint: string;
  action: string;
  progress: number;
}

const ALL_TASKS: Task[] = [
  { id: 'u1', title: '完成 2024 年度合规培训', type: '合规', date: '2024-03-30', status: 'urgent' },
  { id: 'r1', title: '完成团队沟通技巧课程', type: '软技能', date: '2024-04-15', status: 'routine' },
];

const REQUIRED_COURSES: Course[] = [
  { id: 'c1', title: '信息安全实战：防范钓鱼攻击', tag: '必修', hint: '本课程为必修内容，建议尽快学习', action: '去学习', progress: 0 },
  { id: 'c2', title: '2024 年度合规与诚信经营培训', tag: '必修', hint: '本课程为必修内容，建议尽快学习', action: '继续学习', progress: 65 },
];

export const LearningAndTrainingPanel: React.FC = () => {
  return (
    <div className="space-y-6">

      {/* All Tasks */}
      <div>
        <h3 className="text-sm font-bold text-gray-700 mb-2 flex items-center">
          <ClipboardList size={16} className="mr-2 text-blue-600" />
          培训任务
        </h3>
        <div className="space-y-2">
          {ALL_TASKS.map(task => (
            <div 
              key={task.id} 
              className={`p-3 rounded-lg border flex justify-between items-center ${
                task.status === 'urgent' 
                  ? 'bg-red-50 border-red-100' 
                  : 'bg-gray-50 border-gray-100'
              }`}
            >
              <div className="flex-1">
                <div className="flex items-center mb-0.5">
                  <span className={`px-2 py-0.5 text-[10px] font-bold rounded mr-2 ${
                    task.status === 'urgent' 
                      ? 'bg-red-100 text-red-700' 
                      : 'bg-blue-100 text-blue-700'
                  }`}>
                    {task.status === 'urgent' ? '紧急' : '常规'}
                  </span>
                  <h4 className="font-bold text-gray-800">{task.title}</h4>
                </div>
                <p className="text-xs text-gray-500">{task.type} • 截止日期: {task.date}</p>
              </div>
              <button className={`text-sm font-bold hover:underline ${
                task.status === 'urgent' ? 'text-red-600' : 'text-blue-600'
              }`}>
                去处理
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Online Required Courses */}
      <div>
        <h3 className="text-sm font-bold text-gray-700 mb-2 flex items-center">
          <PlayCircle size={16} className="mr-2 text-indigo-500" />
          在线必修课
        </h3>
        <div className="space-y-2">
          {REQUIRED_COURSES.map(course => (
            <div key={course.id} className="p-3 bg-indigo-50 rounded-lg border border-indigo-100 flex justify-between items-center">
              <div className="flex-1">
                <div className="flex items-center mb-0.5">
                  <span className="px-2 py-0.5 bg-indigo-100 text-indigo-700 text-[10px] font-bold rounded mr-2">{course.tag}</span>
                  <h4 className="font-bold text-gray-800">{course.title}</h4>
                </div>
                <p className="text-xs text-gray-500 mb-1.5">{course.hint}</p>
                <div className="w-full bg-indigo-200 rounded-full h-1.5 overflow-hidden">
                    <div className="h-full bg-indigo-600 rounded-full" style={{ width: `${course.progress}%` }}></div>
                </div>
              </div>
              <button className="ml-4 px-4 py-2 bg-indigo-600 text-white text-sm font-bold rounded-lg hover:bg-indigo-700 flex items-center">
                {course.action} <ChevronRight size={16} className="ml-1" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
