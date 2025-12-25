import { motion } from "framer-motion";
import { ArrowLeft, Clock, Target, Lightbulb, AlertTriangle, Zap, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Problem, Topic } from "@/data/dsaContent";
import { useState } from "react";

type ProblemDetailProps = {
  problem: Problem;
  topic: Topic;
  onBack: () => void;
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

const ApproachCard = ({ 
  approach, 
  index, 
  isExpanded, 
  onToggle 
}: { 
  approach: NonNullable<Problem['approaches']>[0];
  index: number;
  isExpanded: boolean;
  onToggle: () => void;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="glass-card rounded-xl overflow-hidden"
    >
      <button
        onClick={onToggle}
        className="w-full p-4 flex items-center justify-between hover:bg-secondary/50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <span className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold text-sm">
            {index + 1}
          </span>
          <div className="text-left">
            <h4 className="font-semibold">{approach.name}</h4>
            <p className="text-sm text-muted-foreground">{approach.idea}</p>
          </div>
        </div>
        {isExpanded ? (
          <ChevronUp className="w-5 h-5 text-muted-foreground" />
        ) : (
          <ChevronDown className="w-5 h-5 text-muted-foreground" />
        )}
      </button>
      
      {isExpanded && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="px-4 pb-4 border-t border-border"
        >
          <div className="pt-4 space-y-4">
            {approach.steps && approach.steps.length > 0 && (
              <div>
                <h5 className="text-sm font-medium mb-2 text-muted-foreground">Steps</h5>
                <ol className="space-y-2">
                  {approach.steps.map((step, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <span className="w-5 h-5 rounded-full bg-secondary text-foreground flex items-center justify-center text-xs flex-shrink-0 mt-0.5">
                        {i + 1}
                      </span>
                      {step}
                    </li>
                  ))}
                </ol>
              </div>
            )}
            
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-secondary/50 rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <Clock className="w-4 h-4 text-primary" />
                  <span className="text-xs font-medium text-muted-foreground">Time</span>
                </div>
                <span className="font-mono text-sm">{approach.time_complexity}</span>
              </div>
              <div className="p-3 bg-secondary/50 rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <Target className="w-4 h-4 text-accent" />
                  <span className="text-xs font-medium text-muted-foreground">Space</span>
                </div>
                <span className="font-mono text-sm">{approach.space_complexity}</span>
              </div>
            </div>
            
            {approach.when_to_use && (
              <div className="p-3 bg-primary/5 rounded-lg border border-primary/20">
                <div className="flex items-center gap-2 mb-1">
                  <Lightbulb className="w-4 h-4 text-primary" />
                  <span className="text-xs font-medium text-primary">When to Use</span>
                </div>
                <p className="text-sm">{approach.when_to_use}</p>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export const ProblemDetail = ({ problem, topic, onBack }: ProblemDetailProps) => {
  const [expandedApproach, setExpandedApproach] = useState<number | null>(0);

  return (
    <section className="py-20 relative min-h-screen">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
      
      <div className="container mx-auto px-4 relative z-10 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Button variant="ghost" onClick={onBack} className="mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to {topic.title}
          </Button>
          
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <DifficultyBadge level={problem.difficulty} />
            <span className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">
              {problem.core_pattern}
            </span>
            {problem.tags?.map(tag => (
              <span key={tag} className="px-3 py-1 bg-secondary text-muted-foreground text-sm rounded-full">
                {tag}
              </span>
            ))}
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            {problem.title}
          </h1>
          
          {problem.why_it_matters && (
            <div className="glass-card p-4 rounded-xl mb-6">
              <div className="flex items-center gap-2 mb-2">
                <Target className="w-5 h-5 text-primary" />
                <span className="font-medium">Why It Matters</span>
              </div>
              <p className="text-muted-foreground">{problem.why_it_matters}</p>
            </div>
          )}
        </motion.div>

        {/* Approaches */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Zap className="w-5 h-5 text-accent" />
            Approaches
          </h2>
          
          <div className="space-y-4">
            {problem.approaches?.map((approach, index) => (
              <ApproachCard
                key={approach.name}
                approach={approach}
                index={index}
                isExpanded={expandedApproach === index}
                onToggle={() => setExpandedApproach(expandedApproach === index ? null : index)}
              />
            )) || (
              <p className="text-muted-foreground">No approaches documented yet.</p>
            )}
          </div>
        </motion.div>

        {/* Complexity Summary */}
        {problem.complexity_summary && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-card p-4 rounded-xl mb-8"
          >
            <div className="flex items-center gap-2 mb-2">
              <Clock className="w-5 h-5 text-primary" />
              <span className="font-medium">Complexity Summary</span>
            </div>
            <p className="text-muted-foreground">{problem.complexity_summary}</p>
          </motion.div>
        )}

        {/* Interview Tip */}
        {problem.interview_tip && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-accent/10 border border-accent/20 p-4 rounded-xl"
          >
            <div className="flex items-center gap-2 mb-2">
              <Lightbulb className="w-5 h-5 text-accent" />
              <span className="font-medium text-accent">Interview Tip</span>
            </div>
            <p className="text-foreground">{problem.interview_tip}</p>
          </motion.div>
        )}
      </div>
    </section>
  );
};
