import { useState, useEffect, useCallback } from 'react';

export type ViewedContent = {
  id: string;
  type: 'topic' | 'problem' | 'algorithm';
  title: string;
  topicId?: string;
  topicTitle?: string;
  difficulty?: string;
  lastViewed: number;
  progress?: number; // 0-100
};

const STORAGE_KEY = 'dsa-learning-progress';

export const useLearningProgress = () => {
  const [viewedContent, setViewedContent] = useState<ViewedContent[]>([]);

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setViewedContent(parsed);
      } catch (e) {
        console.error('Failed to parse learning progress:', e);
      }
    }
  }, []);

  // Save to localStorage when viewedContent changes
  useEffect(() => {
    if (viewedContent.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(viewedContent));
    }
  }, [viewedContent]);

  const addViewedContent = useCallback((content: Omit<ViewedContent, 'lastViewed'>) => {
    setViewedContent(prev => {
      const existingIndex = prev.findIndex(c => c.id === content.id && c.type === content.type);
      const newContent: ViewedContent = {
        ...content,
        lastViewed: Date.now(),
        progress: content.progress ?? (existingIndex >= 0 ? prev[existingIndex].progress : 0)
      };
      
      if (existingIndex >= 0) {
        // Update existing
        const updated = [...prev];
        updated[existingIndex] = newContent;
        return updated;
      } else {
        // Add new
        return [newContent, ...prev];
      }
    });
  }, []);

  const updateProgress = useCallback((id: string, type: string, progress: number) => {
    setViewedContent(prev => {
      const index = prev.findIndex(c => c.id === id && c.type === type);
      if (index >= 0) {
        const updated = [...prev];
        updated[index] = { ...updated[index], progress, lastViewed: Date.now() };
        return updated;
      }
      return prev;
    });
  }, []);

  const getRecentContent = useCallback((limit: number = 5) => {
    return [...viewedContent]
      .sort((a, b) => b.lastViewed - a.lastViewed)
      .slice(0, limit);
  }, [viewedContent]);

  const clearProgress = useCallback(() => {
    setViewedContent([]);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  return {
    viewedContent,
    addViewedContent,
    updateProgress,
    getRecentContent,
    clearProgress,
  };
};
