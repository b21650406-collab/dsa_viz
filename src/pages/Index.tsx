import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/sections/Hero";
import { ResumeLearning } from "@/components/sections/ResumeLearning";
import { Topics } from "@/components/sections/Topics";
import { TopicDetail } from "@/components/sections/TopicDetail";
import { ProblemDetail } from "@/components/sections/ProblemDetail";
import { Visualizer } from "@/components/sections/Visualizer";
import { Quiz } from "@/components/sections/Quiz";
import { Practice } from "@/components/sections/Practice";
import { Features } from "@/components/sections/Features";
import { Footer } from "@/components/sections/Footer";
import { dsaContent, Topic, Problem } from "@/data/dsaContent";
import { useLearningProgress, ViewedContent } from "@/hooks/useLearningProgress";

type View = 'home' | 'topic' | 'problem';

const Index = () => {
  const [currentView, setCurrentView] = useState<View>('home');
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const [selectedProblem, setSelectedProblem] = useState<Problem | null>(null);
  const { addViewedContent, getRecentContent } = useLearningProgress();

  const handleSelectTopic = (topic: Topic) => {
    setSelectedTopic(topic);
    setCurrentView('topic');
    addViewedContent({
      id: topic.id,
      type: 'topic',
      title: topic.title,
      progress: 0,
    });
  };

  const handleSelectProblem = (problem: Problem) => {
    setSelectedProblem(problem);
    setCurrentView('problem');
    addViewedContent({
      id: problem.id,
      type: 'problem',
      title: problem.title,
      topicId: selectedTopic?.id,
      topicTitle: selectedTopic?.title,
      difficulty: problem.difficulty,
      progress: 0,
    });
  };

  const handleResumeContent = (content: ViewedContent) => {
    if (content.type === 'topic') {
      const topic = dsaContent.find(t => t.id === content.id);
      if (topic) handleSelectTopic(topic);
    } else if (content.type === 'problem' && content.topicId) {
      const topic = dsaContent.find(t => t.id === content.topicId);
      if (topic) {
        setSelectedTopic(topic);
        for (const section of topic.difficulty_sections) {
          const problem = section.problems.find(p => p.id === content.id);
          if (problem) {
            setSelectedProblem(problem);
            setCurrentView('problem');
            return;
          }
        }
      }
    }
  };

  const handleStartLearning = () => {
    document.getElementById('resume-learning')?.scrollIntoView({ behavior: 'smooth' });
  };

  if (currentView === 'problem' && selectedProblem && selectedTopic) {
    return (
      <main className="min-h-screen bg-background">
        <Navbar />
        <ProblemDetail
          problem={selectedProblem}
          topic={selectedTopic}
          onBack={() => setCurrentView('topic')}
        />
        <Footer />
      </main>
    );
  }

  if (currentView === 'topic' && selectedTopic) {
    return (
      <main className="min-h-screen bg-background">
        <Navbar />
        <TopicDetail
          topic={selectedTopic}
          onBack={() => setCurrentView('home')}
          onSelectProblem={handleSelectProblem}
          onViewProblem={(problem) => addViewedContent({
            id: problem.id,
            type: 'problem',
            title: problem.title,
            topicId: selectedTopic.id,
            topicTitle: selectedTopic.title,
            difficulty: problem.difficulty,
          })}
        />
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <Hero onStartLearning={handleStartLearning} />
      <ResumeLearning 
        recentContent={getRecentContent(6)} 
        onSelectContent={handleResumeContent}
      />
      <Topics topics={dsaContent} onSelectTopic={handleSelectTopic} />
      <Visualizer />
      <Quiz />
      <Practice />
      <Features />
      <Footer />
    </main>
  );
};

export default Index;
