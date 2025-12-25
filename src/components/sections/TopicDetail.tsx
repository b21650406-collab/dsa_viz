import { motion } from "framer-motion";
import { ArrowLeft, ChevronRight, Clock, Target, Lightbulb, AlertTriangle, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Topic, Problem, DifficultySection } from "@/data/dsaContent";
import { useState } from "react";

type TopicDetailProps = {
  topic: Topic;
  onBack: () => void;
  onSelectProblem: (problem: Problem) => void;
  onViewProblem: (problem: Problem) => void;
};

const DifficultyBadge = ({ level }: { level: string }) => {
  const colors = {
    Easy: 'bg-green-500/10 text-green-400 border-green-500/20',
    Medium: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
    Hard: 'bg-red-500/10 text-red-400 border-red-500/20',
  };
  
  return (
    <span className={`px-3 py-1 text-sm font-medium rounded-full border ${colors[level as keyof typeof colors]}`}>
      {level}
    </span>
  );
};

const ProblemCard = ({ 
  problem, 
  onClick 
}: { 
  problem: Problem; 
  onClick: () => void;
}) => {
  return (
    <motion.div
      whileHover={{ x: 5 }}
      onClick={onClick}
      className="glass-card p-4 rounded-lg cursor-pointer group border border-transparent hover:border-primary/30"
    >
      <div className="flex items-start justify-between mb-2">
        <h4 className="font-semibold group-hover:text-primary transition-colors">
          {problem.title}
        </h4>
        <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
      </div>
      
      <div className="flex items-center gap-2 mb-2">
        <span className="px-2 py-0.5 text-xs bg-primary/10 text-primary rounded">
          {problem.core_pattern}
        </span>
        {problem.tags?.slice(0, 2).map(tag => (
          <span key={tag} className="px-2 py-0.5 text-xs bg-secondary text-muted-foreground rounded">
            {tag}
          </span>
        ))}
      </div>
      
      {problem.why_it_matters && (
        <p className="text-sm text-muted-foreground line-clamp-2">
          {problem.why_it_matters}
        </p>
      )}
    </motion.div>
  );
};

const DifficultyTab = ({ 
  section, 
  isActive, 
  onClick 
}: { 
  section: DifficultySection; 
  isActive: boolean;
  onClick: () => void;
}) => {
  const colors = {
    Easy: isActive ? 'bg-green-500 text-white' : 'bg-green-500/10 text-green-400 hover:bg-green-500/20',
    Medium: isActive ? 'bg-yellow-500 text-black' : 'bg-yellow-500/10 text-yellow-400 hover:bg-yellow-500/20',
    Hard: isActive ? 'bg-red-500 text-white' : 'bg-red-500/10 text-red-400 hover:bg-red-500/20',
  };

  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-lg font-medium transition-all ${colors[section.level]}`}
    >
      {section.level} ({section.problems.length})
    </button>
  );
};

export const TopicDetail = ({ topic, onBack, onSelectProblem, onViewProblem }: TopicDetailProps) => {
  const [activeLevel, setActiveLevel] = useState<string>('Easy');
  
  const activeSection = topic.difficulty_sections.find(s => s.level === activeLevel);

  return (
    <section className="py-20 relative min-h-screen">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Button variant="ghost" onClick={onBack} className="mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Topics
          </Button>
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">
                {topic.title}
              </h1>
              <p className="text-muted-foreground max-w-2xl">
                {topic.description}
              </p>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Clock className="w-4 h-4 text-primary" />
              <span className="text-muted-foreground">{topic.lesson_count} lessons</span>
            </div>
          </div>
        </motion.div>

        {/* Difficulty Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex gap-3 mb-8 flex-wrap"
        >
          {topic.difficulty_sections.map((section) => (
            <DifficultyTab
              key={section.level}
              section={section}
              isActive={activeLevel === section.level}
              onClick={() => setActiveLevel(section.level)}
            />
          ))}
        </motion.div>

        {/* Problems Grid */}
        <motion.div
          key={activeLevel}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {activeSection?.problems.map((problem, index) => (
            <motion.div
              key={problem.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <ProblemCard 
                problem={problem} 
                onClick={() => {
                  onViewProblem(problem);
                  onSelectProblem(problem);
                }} 
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
