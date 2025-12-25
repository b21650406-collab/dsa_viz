import { motion } from "framer-motion";
import { Clock, BookOpen, ArrowRight, History } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ViewedContent } from "@/hooks/useLearningProgress";

type ResumeLearningProps = {
  recentContent: ViewedContent[];
  onSelectContent: (content: ViewedContent) => void;
};

const formatTimeAgo = (timestamp: number) => {
  const seconds = Math.floor((Date.now() - timestamp) / 1000);
  
  if (seconds < 60) return 'Just now';
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  return `${Math.floor(seconds / 86400)}d ago`;
};

const getDifficultyColor = (difficulty?: string) => {
  switch (difficulty) {
    case 'Easy': return 'text-green-400 bg-green-400/10';
    case 'Medium': return 'text-yellow-400 bg-yellow-400/10';
    case 'Hard': return 'text-red-400 bg-red-400/10';
    default: return 'text-primary bg-primary/10';
  }
};

export const ResumeLearning = ({ recentContent, onSelectContent }: ResumeLearningProps) => {
  return (
    <section id="resume-learning" className="py-20 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Resume <span className="gradient-text">Learning</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Pick up where you left off and continue your DSA journey
          </p>
        </motion.div>

        {recentContent.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card p-12 rounded-xl text-center max-w-xl mx-auto"
          >
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <BookOpen className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-3">No Learning History Yet</h3>
            <p className="text-muted-foreground mb-6">
              Start exploring topics and problems to build your learning history. 
              Your progress will be saved automatically.
            </p>
            <Button variant="hero" onClick={() => document.getElementById('topics')?.scrollIntoView({ behavior: 'smooth' })}>
              Explore Topics
              <ArrowRight className="w-4 h-4" />
            </Button>
          </motion.div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {recentContent.map((content, index) => (
              <motion.div
                key={`${content.type}-${content.id}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                onClick={() => onSelectContent(content)}
                className="glass-card p-6 rounded-xl cursor-pointer group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      {content.type === 'topic' ? (
                        <BookOpen className="w-5 h-5 text-primary" />
                      ) : content.type === 'algorithm' ? (
                        <History className="w-5 h-5 text-accent" />
                      ) : (
                        <Clock className="w-5 h-5 text-info" />
                      )}
                    </div>
                    {content.difficulty && (
                      <span className={`px-2 py-1 text-xs font-medium rounded ${getDifficultyColor(content.difficulty)}`}>
                        {content.difficulty}
                      </span>
                    )}
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {formatTimeAgo(content.lastViewed)}
                  </span>
                </div>

                <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                  {content.title}
                </h3>

                {content.topicTitle && (
                  <p className="text-sm text-muted-foreground mb-4">
                    {content.topicTitle}
                  </p>
                )}

                {content.progress !== undefined && content.progress > 0 && (
                  <div className="mt-auto">
                    <div className="flex items-center justify-between text-xs mb-2">
                      <span className="text-muted-foreground">Progress</span>
                      <span className="text-primary font-medium">{content.progress}%</span>
                    </div>
                    <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-primary to-accent"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${content.progress}%` }}
                        viewport={{ once: true }}
                      />
                    </div>
                  </div>
                )}

                <div className="mt-4 flex items-center text-sm text-primary font-medium group-hover:translate-x-1 transition-transform">
                  Continue
                  <ArrowRight className="w-4 h-4 ml-1" />
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
