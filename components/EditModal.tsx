import React, { useState } from 'react';
import { DailySpecial } from '../types';
import { generateEnhancedCopy } from '../services/geminiService';
import { Wand2, Loader2, X, Save } from 'lucide-react';

interface EditModalProps {
  special: DailySpecial | null;
  onClose: () => void;
  onSave: (special: DailySpecial) => void;
}

export const EditModal: React.FC<EditModalProps> = ({ special, onClose, onSave }) => {
  const [formData, setFormData] = useState<DailySpecial | null>(special);
  const [isGenerating, setIsGenerating] = useState(false);

  if (!special || !formData) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => prev ? { ...prev, [name]: value } : null);
  };

  const handleGenerateAI = async () => {
    if (!formData) return;
    setIsGenerating(true);
    try {
      const result = await generateEnhancedCopy(formData.title, formData.description, formData.day);
      setFormData(prev => prev ? { 
        ...prev, 
        title: result.title, 
        description: result.description 
      } : null);
    } catch (err) {
      alert("Failed to generate AI content. Please check API key configuration.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData) onSave(formData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="bg-zinc-900 border border-zinc-700 w-full max-w-2xl rounded-2xl shadow-2xl flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-zinc-800">
          <h2 className="text-2xl font-bold text-white font-serif">Edit {special.day}</h2>
          <button onClick={onClose} className="text-zinc-400 hover:text-white transition">
            <X size={24} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto flex-1">
          <form id="edit-form" onSubmit={handleSubmit} className="space-y-6">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="col-span-1">
                 <label className="block text-sm font-medium text-zinc-400 mb-1">Title</label>
                 <input
                   type="text"
                   name="title"
                   value={formData.title}
                   onChange={handleChange}
                   className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-amber-500 focus:outline-none"
                 />
              </div>
              <div className="col-span-1">
                 <label className="block text-sm font-medium text-zinc-400 mb-1">Price</label>
                 <input
                   type="text"
                   name="price"
                   value={formData.price}
                   onChange={handleChange}
                   className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-amber-500 focus:outline-none"
                 />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="block text-sm font-medium text-zinc-400">Description</label>
                <button
                  type="button"
                  onClick={handleGenerateAI}
                  disabled={isGenerating}
                  className="flex items-center gap-1 text-xs text-amber-500 hover:text-amber-400 transition font-semibold disabled:opacity-50"
                >
                  {isGenerating ? <Loader2 size={12} className="animate-spin" /> : <Wand2 size={12} />}
                  {isGenerating ? 'Thinking...' : 'AI Enhance'}
                </button>
              </div>
              <textarea
                name="description"
                rows={3}
                value={formData.description}
                onChange={handleChange}
                className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-amber-500 focus:outline-none resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-1">Image URL</label>
              <div className="flex gap-4">
                <input
                  type="text"
                  name="imageUrl"
                  value={formData.imageUrl}
                  onChange={handleChange}
                  className="flex-1 bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-amber-500 focus:outline-none"
                />
                <div className="w-16 h-10 rounded overflow-hidden bg-zinc-700 shrink-0">
                  <img src={formData.imageUrl} alt="Preview" className="w-full h-full object-cover" />
                </div>
              </div>
              <p className="text-xs text-zinc-500 mt-1">Use valid image URLs (e.g. from Unsplash or your CMS).</p>
            </div>

            <div>
               <label className="block text-sm font-medium text-zinc-400 mb-1">Highlight Color</label>
               <div className="flex gap-3 items-center">
                  <input
                    type="color"
                    name="highlightColor"
                    value={formData.highlightColor}
                    onChange={handleChange}
                    className="h-10 w-20 bg-transparent border-0 cursor-pointer"
                  />
                  <span className="text-zinc-500 text-sm font-mono">{formData.highlightColor}</span>
               </div>
            </div>

          </form>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-zinc-800 flex justify-end gap-4">
          <button 
            type="button" 
            onClick={onClose}
            className="px-4 py-2 text-zinc-300 hover:text-white font-medium transition"
          >
            Cancel
          </button>
          <button 
            type="submit" 
            form="edit-form"
            className="flex items-center gap-2 px-6 py-2 bg-amber-600 hover:bg-amber-500 text-white font-bold rounded-lg transition shadow-lg hover:shadow-amber-500/20"
          >
            <Save size={18} />
            Save Changes
          </button>
        </div>

      </div>
    </div>
  );
};
