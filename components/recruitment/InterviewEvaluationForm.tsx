
import React, { useState } from 'react';
import { 
  ChevronLeft, 
  Printer, 
  Save, 
  PenTool, 
  ShieldCheck, 
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { InternalApplication } from '../../types';

interface InterviewEvaluationFormProps {
  application: InternalApplication;
  onBack: () => void;
}

export const InterviewEvaluationForm: React.FC<InterviewEvaluationFormProps> = ({ application, onBack }) => {
  const [isSigned, setIsSigned] = useState(false);
  const [formState, setFormState] = useState({
    advantages: '',
    disadvantages: '',
    observations: '',
    conclusion: '' // 'high', 'medium', 'low'
  });

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in pb-20">
      {/* Action Bar */}
      <div className="flex justify-between items-center print:hidden">
         <button onClick={onBack} className="flex items-center text-gray-500 hover:text-gray-800 text-sm">
            <ChevronLeft size={16} className="mr-1"/> 返回申请列表
         </button>
         <div className="flex space-x-3">
            <button className="flex items-center px-4 py-2 border border-gray-300 rounded bg-white text-gray-600 text-sm hover:bg-gray-50">
               <Printer size={16} className="mr-2"/> 打印预览
            </button>
            <button className="flex items-center px-6 py-2 bg-blue-600 text-white rounded shadow-sm text-sm font-bold hover:bg-blue-700">
               <Save size={16} className="mr-2"/> 提交评价结果
            </button>
         </div>
      </div>

      {/* Main Form Document */}
      <div className="bg-white shadow-xl border border-gray-200 p-10 md:p-16 min-h-[1000px] text-gray-900 font-sans">
         
         {/* Document Header */}
         <div className="border-b-2 border-black pb-4 mb-8">
            <h1 className="text-3xl font-bold tracking-tight mb-1">内部招聘面试评价表</h1>
            <h2 className="text-2xl font-bold tracking-tight uppercase">Internal Recruitment Interview Form</h2>
         </div>

         {/* Introduction */}
         <div className="space-y-4 mb-8">
            <p className="text-sm font-medium">此表用于内部招聘面试记录和保密承诺，由面试官填写反馈，用做录用与否的依据。</p>
            <p className="text-sm italic font-medium leading-tight">This form is used as internal recruitment interview record and interview evaluation, should be filled by interviewers only.</p>
         </div>

         {/* Basic Info Bar */}
         <div className="flex flex-wrap gap-y-4 gap-x-12 mb-10 text-lg border-b border-gray-200 pb-4">
            <div className="flex items-end">
               <span className="font-bold mr-2 whitespace-nowrap">候选人/工号 Candidate:</span>
               <div className="border-b-2 border-gray-800 min-w-[200px] px-2 text-blue-700 font-bold">
                  {application.candidateName} / {application.candidateId}
               </div>
            </div>
            <div className="flex items-end">
               <span className="font-bold mr-2 whitespace-nowrap">面试部门 Applied dept.:</span>
               <div className="border-b-2 border-gray-800 min-w-[200px] px-2 text-gray-800">
                  {application.appliedDept}
               </div>
            </div>
         </div>

         {/* Interview Record Section */}
         <div className="mb-8">
            <div className="border-b-2 border-black mb-4">
               <h3 className="text-2xl font-bold pb-1 flex items-center">
                  面试记录 Interview record
               </h3>
            </div>

            <div className="space-y-10">
               <section>
                  <label className="block text-lg font-bold mb-2 uppercase">候选人的优势特征 Candidate's advantages:</label>
                  <textarea 
                    value={formState.advantages}
                    onChange={e => setFormState({...formState, advantages: e.target.value})}
                    className="w-full border border-gray-300 p-4 h-40 text-lg focus:ring-1 focus:ring-black outline-none resize-none placeholder:text-gray-300"
                    placeholder="请输入..."
                  />
               </section>

               <section>
                  <label className="block text-lg font-bold mb-2 uppercase">候选人的不足之处 Candidate's disadvantages:</label>
                  <textarea 
                    value={formState.disadvantages}
                    onChange={e => setFormState({...formState, disadvantages: e.target.value})}
                    className="w-full border border-gray-300 p-4 h-40 text-lg focus:ring-1 focus:ring-black outline-none resize-none placeholder:text-gray-300"
                    placeholder="请输入..."
                  />
               </section>

               <section>
                  <label className="block text-lg font-bold mb-2 uppercase">综合评价 General Observations:</label>
                  <textarea 
                    value={formState.observations}
                    onChange={e => setFormState({...formState, observations: e.target.value})}
                    className="w-full border border-gray-300 p-4 h-40 text-lg focus:ring-1 focus:ring-black outline-none resize-none placeholder:text-gray-300"
                    placeholder="请对候选人整体表现进行总结..."
                  />
               </section>
            </div>
         </div>

         {/* Interview Conclusion Section */}
         <div className="mb-12">
            <div className="border-b-2 border-black mb-6">
               <h3 className="text-2xl font-bold pb-1">面试结论 Interview conclusion</h3>
            </div>
            
            <div className="space-y-4">
               <label className="flex items-center space-x-4 cursor-pointer group">
                  <div className={`w-7 h-7 border-2 border-black flex items-center justify-center transition-colors ${formState.conclusion === 'high' ? 'bg-black' : 'bg-white'}`} onClick={() => setFormState({...formState, conclusion: 'high'})}>
                     {formState.conclusion === 'high' && <CheckCircle className="text-white" size={20}/>}
                  </div>
                  <div className="text-xl">
                     <span className="font-bold mr-2">面试通过，本岗位录用优先级高</span>
                     <span className="text-gray-600">Interview passed, high priority</span>
                  </div>
               </label>

               <label className="flex items-center space-x-4 cursor-pointer group">
                  <div className={`w-7 h-7 border-2 border-black flex items-center justify-center transition-colors ${formState.conclusion === 'medium' ? 'bg-black' : 'bg-white'}`} onClick={() => setFormState({...formState, conclusion: 'medium'})}>
                     {formState.conclusion === 'medium' && <CheckCircle className="text-white" size={20}/>}
                  </div>
                  <div className="text-xl">
                     <span className="font-bold mr-2">面试通过，本岗位录用优先级中</span>
                     <span className="text-gray-600">Interview passed, medium priority</span>
                  </div>
               </label>

               <label className="flex items-center space-x-4 cursor-pointer group">
                  <div className={`w-7 h-7 border-2 border-black flex items-center justify-center transition-colors ${formState.conclusion === 'low' ? 'bg-black' : 'bg-white'}`} onClick={() => setFormState({...formState, conclusion: 'low'})}>
                     {formState.conclusion === 'low' && <CheckCircle className="text-white" size={20}/>}
                  </div>
                  <div className="text-xl">
                     <span className="font-bold mr-2">面试淘汰，本岗位录用优先级低</span>
                     <span className="text-gray-600">Interview not passed, low priority</span>
                  </div>
               </label>
            </div>
         </div>

         {/* Confidentiality & Signature Section */}
         <div className="mt-20 pt-8 border-t-2 border-gray-100 flex flex-col md:flex-row justify-between items-end">
            <div className="mb-6 md:mb-0">
               <div className="bg-gray-50 border border-gray-200 p-4 rounded-lg max-w-sm">
                  <div className="flex items-center text-orange-600 font-bold mb-2">
                     <AlertCircle size={18} className="mr-2"/> 保密声明
                  </div>
                  <p className="text-xs text-gray-500 leading-relaxed">
                     作为面试官，我承诺对本次面试的所有相关信息（包括但不限于候选人个人信息、面试题目、评分结果等）严格保密，不向任何未经授权的第三方泄露。
                  </p>
               </div>
            </div>
            
            <div className="text-center">
               {isSigned ? (
                  <div className="mb-2">
                     <div className="font-mono text-2xl italic font-bold border-b-2 border-black px-8 py-2">
                        {application.interviewer || '张三'} (已签)
                     </div>
                     <p className="text-xs text-green-600 mt-2 font-bold flex items-center justify-center">
                        <ShieldCheck size={14} className="mr-1"/> 数字签名已验证 - {new Date().toLocaleDateString()}
                     </p>
                  </div>
               ) : (
                  <button 
                    onClick={() => setIsSigned(true)}
                    className="flex flex-col items-center group"
                  >
                     <div className="w-48 h-20 border-2 border-dashed border-gray-300 rounded flex items-center justify-center text-gray-400 group-hover:border-blue-500 group-hover:text-blue-500 transition-all">
                        <PenTool size={24} className="mr-2"/>
                        <span className="text-sm font-bold">点击确认签署保密协议</span>
                     </div>
                     <p className="text-xs text-gray-400 mt-2 font-bold">面试官签名 / Interviewer Signature</p>
                  </button>
               )}
            </div>
         </div>
      </div>
    </div>
  );
};
