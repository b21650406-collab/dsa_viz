import { motion } from "framer-motion";
import {
  Binary,
  GitBranch,
  Layers,
  Network,
  Repeat,
  Search,
  SortAsc,
  TreeDeciduous,
  LucideIcon,
} from "lucide-react";
import { Topic } from "@/data/dsaContent";

const iconMap: Record<string, LucideIcon> = {
  arrays_hashing: Layers,
  two_pointers: GitBranch,
  sliding_window: Repeat,
  binary_search: Search,
  linked_list: GitBranch,
  trees: TreeDeciduous,
  graphs: Network,
  dynamic_programming: Binary,
};

const colorMap: Record<string, string> = {
  arrays_hashing: "from-primary to-info",
  two_pointers: "from-info to-primary",
  sliding_window: "from-accent to-pink-500",
  binary_search: "from-primary to-accent",
  linked_list: "from-success to-emerald-400",
  trees: "from-success to-emerald-400",
  graphs: "from-warning to-orange-400",
  dynamic_programming: "from-info to-accent",
};

type TopicsProps = {
  topics: Topic[];
  onSelectTopic: (topic: Topic) => void;
};

export const Topics = ({ topics, onSelectTopic }: TopicsProps) => {
  return (
    <section id="topics" className="py-20 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Explore <span className="gradient-text">DSA Topics</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Comprehensive coverage of all essential data structures and algorithms
            with interactive visualizations
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {topics.map((topic, index) => {
            const Icon = iconMap[topic.id] || Layers;
            const color = colorMap[topic.id] || "from-primary to-info";
            
            return (
              <motion.div
                key={topic.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                onClick={() => onSelectTopic(topic)}
                className="glass-card p-6 rounded-xl cursor-pointer group"
              >
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                >
                  <Icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                  {topic.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-3">
                  {topic.description}
                </p>
                <span className="text-xs font-medium text-primary">
                  {topic.lesson_count} lessons
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
