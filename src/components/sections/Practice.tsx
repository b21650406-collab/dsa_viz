import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Code2, ExternalLink, Filter, Search } from "lucide-react";

  const problems = [
  // Easy
  { id: 1, title: "Two Sum", difficulty: "Easy", category: "Arrays", acceptance_rate: "49.5%", status: null, link: "https://leetcode.com/problems/two-sum/" },
  { id: 2, title: "Valid Anagram", difficulty: "Easy", category: "Strings", acceptance_rate: "61.2%", status: null, link: "https://leetcode.com/problems/valid-anagram/" },
  { id: 3, title: "Best Time to Buy and Sell Stock", difficulty: "Easy", category: "Greedy", acceptance_rate: "49.9%", status: null, link: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/" },
  { id: 4, title: "Move Zeroes", difficulty: "Easy", category: "Arrays", acceptance_rate: "57.4%", status: null, link: "https://leetcode.com/problems/move-zeroes/" },
  { id: 5, title: "Contains Duplicate", difficulty: "Easy", category: "Hashing", acceptance_rate: "55.3%", status: null, link: "https://leetcode.com/problems/contains-duplicate/" },
  { id: 6, title: "Majority Element", difficulty: "Easy", category: "Greedy", acceptance_rate: "52.1%", status: null, link: "https://leetcode.com/problems/majority-element/" },
  { id: 7, title: "Reverse Linked List", difficulty: "Easy", category: "Linked Lists", acceptance_rate: "43.8%", status: null, link: "https://leetcode.com/problems/reverse-linked-list/" },
  { id: 8, title: "Merge Two Sorted Lists", difficulty: "Easy", category: "Linked Lists", acceptance_rate: "49.0%", status: null, link: "https://leetcode.com/problems/merge-two-sorted-lists/" },
  { id: 9, title: "Binary Search", difficulty: "Easy", category: "Searching", acceptance_rate: "61.0%", status: null, link: "https://leetcode.com/problems/binary-search/" },
  { id: 10, title: "Valid Parentheses", difficulty: "Easy", category: "Stack", acceptance_rate: "42.7%", status: null, link: "https://leetcode.com/problems/valid-parentheses/" },
  { id: 11, title: "Palindrome Linked List", difficulty: "Easy", category: "Linked Lists", acceptance_rate: "44.2%", status: null, link: "https://leetcode.com/problems/palindrome-linked-list/" },
  { id: 12, title: "Remove Duplicates from Sorted Array", difficulty: "Easy", category: "Two Pointers", acceptance_rate: "47.9%", status: null, link: "https://leetcode.com/problems/remove-duplicates-from-sorted-array/" },
  { id: 13, title: "Intersection of Two Linked Lists", difficulty: "Easy", category: "Linked Lists", acceptance_rate: "49.6%", status: null, link: "https://leetcode.com/problems/intersection-of-two-linked-lists/" },
  { id: 14, title: "Climbing Stairs", difficulty: "Easy", category: "DP", acceptance_rate: "48.9%", status: null, link: "https://leetcode.com/problems/climbing-stairs/" },
  { id: 15, title: "Flood Fill", difficulty: "Easy", category: "DFS", acceptance_rate: "41.2%", status: null, link: "https://leetcode.com/problems/flood-fill/" },

  // Medium
  { id: 16, title: "3Sum", difficulty: "Medium", category: "Arrays", acceptance_rate: "30.1%", status: null, link: "https://leetcode.com/problems/3sum/" },
  { id: 17, title: "Group Anagrams", difficulty: "Medium", category: "Hashing", acceptance_rate: "55.0%", status: null, link: "https://leetcode.com/problems/group-anagrams/" },
  { id: 18, title: "Longest Substring Without Repeating Characters", difficulty: "Medium", category: "Sliding Window", acceptance_rate: "26.8%", status: null, link: "https://leetcode.com/problems/longest-substring-without-repeating-characters/" },
  { id: 19, title: "Subarray Sum Equals K", difficulty: "Medium", category: "Prefix Sum", acceptance_rate: "36.7%", status: null, link: "https://leetcode.com/problems/subarray-sum-equals-k/" },
  { id: 20, title: "Product of Array Except Self", difficulty: "Medium", category: "Arrays", acceptance_rate: "53.9%", status: null, link: "https://leetcode.com/problems/product-of-array-except-self/" },
  { id: 21, title: "Sort Colors", difficulty: "Medium", category: "Two Pointers", acceptance_rate: "49.3%", status: null, link: "https://leetcode.com/problems/sort-colors/" },
  { id: 22, title: "Lowest Common Ancestor of a BST", difficulty: "Medium", category: "Trees", acceptance_rate: "49.7%", status: null, link: "https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/" },
  { id: 23, title: "Kth Smallest Element in a BST", difficulty: "Medium", category: "Trees", acceptance_rate: "47.2%", status: null, link: "https://leetcode.com/problems/kth-smallest-element-in-a-bst/" },
  { id: 24, title: "Number of Islands", difficulty: "Medium", category: "Graphs", acceptance_rate: "45.0%", status: null, link: "https://leetcode.com/problems/number-of-islands/" },
  { id: 25, title: "Clone Graph", difficulty: "Medium", category: "Graphs", acceptance_rate: "35.8%", status: null, link: "https://leetcode.com/problems/clone-graph/" },
  { id: 26, title: "Course Schedule", difficulty: "Medium", category: "Graphs", acceptance_rate: "43.5%", status: null, link: "https://leetcode.com/problems/course-schedule/" },
  { id: 27, title: "Implement Trie", difficulty: "Medium", category: "Trie", acceptance_rate: "37.1%", status: null, link: "https://leetcode.com/problems/implement-trie-prefix-tree/" },
  { id: 28, title: "Jump Game", difficulty: "Medium", category: "Greedy", acceptance_rate: "30.0%", status: null, link: "https://leetcode.com/problems/jump-game/" },
  { id: 29, title: "Set Matrix Zeroes", difficulty: "Medium", category: "Matrix", acceptance_rate: "44.4%", status: null, link: "https://leetcode.com/problems/set-matrix-zeroes/" },
  { id: 30, title: "Spiral Matrix", difficulty: "Medium", category: "Matrix", acceptance_rate: "32.0%", status: null, link: "https://leetcode.com/problems/spiral-matrix/" },

  // Hard
  { id: 31, title: "Trapping Rain Water", difficulty: "Hard", category: "Arrays", acceptance_rate: "40.6%", status: null, link: "https://leetcode.com/problems/trapping-rain-water/" },
  { id: 32, title: "Median of Two Sorted Arrays", difficulty: "Hard", category: "Binary Search", acceptance_rate: "30.5%", status: null, link: "https://leetcode.com/problems/median-of-two-sorted-arrays/" },
  { id: 33, title: "Sliding Window Maximum", difficulty: "Hard", category: "Deque", acceptance_rate: "31.1%", status: null, link: "https://leetcode.com/problems/sliding-window-maximum/" },
  { id: 34, title: "Edit Distance", difficulty: "Hard", category: "DP", acceptance_rate: "22.4%", status: null, link: "https://leetcode.com/problems/edit-distance/" },
  { id: 35, title: "Word Ladder", difficulty: "Hard", category: "Graphs", acceptance_rate: "24.9%", status: null, link: "https://leetcode.com/problems/word-ladder/" },
  { id: 36, title: "Course Schedule II", difficulty: "Hard", category: "Graphs", acceptance_rate: "39.2%", status: null, link: "https://leetcode.com/problems/course-schedule-ii/" },
  { id: 37, title: "Largest Rectangle in Histogram", difficulty: "Hard", category: "Stack", acceptance_rate: "30.8%", status: null, link: "https://leetcode.com/problems/largest-rectangle-in-histogram/" },
  { id: 38, title: "Regular Expression Matching", difficulty: "Hard", category: "DP", acceptance_rate: "18.7%", status: null, link: "https://leetcode.com/problems/regular-expression-matching/" },
  { id: 39, title: "Kth Largest Element in an Array", difficulty: "Hard", category: "Heap", acceptance_rate: "52.3%", status: null, link: "https://leetcode.com/problems/kth-largest-element-in-an-array/" },
  { id: 40, title: "Serialize and Deserialize Binary Tree", difficulty: "Hard", category: "Trees", acceptance_rate: "45.9%", status: null, link: "https://leetcode.com/problems/serialize-and-deserialize-binary-tree/" }
];

export const Practice = () => {
  const [query, setQuery] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState<string>("All");
  const [categoryFilter, setCategoryFilter] = useState<string>("All");
  const [statusFilter, setStatusFilter] = useState<string>("All");

  const categories = useMemo(() => {
    const set = new Set<string>();
    problems.forEach(p => set.add(p.category));
    return ["All", ...Array.from(set).sort()];
  }, []);

  const filtered = useMemo(() => {
    return problems.filter((p) => {
      // search
      const q = query.trim().toLowerCase();
      if (q) {
        if (!p.title.toLowerCase().includes(q)) return false;
      }

      // difficulty
      if (difficultyFilter !== "All" && p.difficulty !== difficultyFilter) return false;

      // category
      if (categoryFilter !== "All" && p.category !== categoryFilter) return false;

      // status
      if (statusFilter !== "All") {
        if (statusFilter === "Solved" && p.status !== "solved") return false;
        if (statusFilter === "Attempted" && p.status !== "attempted") return false;
        if (statusFilter === "Unattempted" && p.status) return false;
      }

      return true;
    });
  }, [query, difficultyFilter, categoryFilter, statusFilter]);

  return (
    <section id="practice" className="py-20 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/5 to-transparent" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Practice <span className="gradient-text-accent">Problems</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Sharpen your skills with curated coding challenges across all difficulty levels
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card p-4 rounded-xl mb-6 flex flex-wrap items-center gap-4"
        >
          <div className="flex-1 min-w-[200px] relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search problems..."
              aria-label="Search problems"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-secondary/50 border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary"
            />
          </div>
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            Difficulty
          </Button>
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            Category
          </Button>
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            Status
          </Button>
        </motion.div>

        {/* Problems List */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="glass-card rounded-xl overflow-hidden"
        >
          <div className="grid grid-cols-12 gap-4 p-4 bg-secondary/30 text-sm font-medium text-muted-foreground border-b border-border">
            <div className="col-span-1">Status</div>
            <div className="col-span-5">Title</div>
            <div className="col-span-2">Category</div>
            <div className="col-span-2">Difficulty</div>
            <div className="col-span-2">Acceptance Rate</div>
          </div>

          {problems.map((problem, index) => (
            <motion.div
              key={problem.id}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="grid grid-cols-12 gap-4 p-4 items-center border-b border-border/50 hover:bg-secondary/20 transition-colors cursor-pointer group"
            >
              <div className="col-span-1">
                {problem.status === "solved" ? (
                  <div className="w-5 h-5 rounded-full bg-success/20 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-success" />
                  </div>
                ) : problem.status === "attempted" ? (
                  <div className="w-5 h-5 rounded-full bg-warning/20 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-warning" />
                  </div>
                ) : (
                  <div className="w-5 h-5 rounded-full bg-muted" />
                )}
              </div>
              <div className="col-span-5 flex items-center gap-2">
                <Code2 className="w-4 h-4 text-muted-foreground" />
                <span className="font-medium group-hover:text-primary transition-colors">
                  {problem.id}. {problem.title}
                </span>
                {problem.link && (
                  <a href={problem.link} target="_blank" rel="noreferrer noopener" className="ml-2 text-muted-foreground hover:text-primary" aria-label={`Open ${problem.title} on external site`}>
                    <ExternalLink className="w-3 h-3 transition-colors" />
                  </a>
                )}
              </div>
              <div className="col-span-2">
                <span className="text-sm text-muted-foreground">{problem.category}</span>
              </div>
              <div className="col-span-2">
                <span
                  className={`text-xs font-medium px-2 py-1 rounded-full ${
                    problem.difficulty === "Easy"
                      ? "bg-success/20 text-success"
                      : problem.difficulty === "Medium"
                      ? "bg-warning/20 text-warning"
                      : "bg-destructive/20 text-destructive"
                  }`}
                >
                  {problem.difficulty}
                </span>
              </div>
              <div className="col-span-2 text-sm text-muted-foreground">
                {problem.acceptance_rate ?? "—"}
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div className="flex justify-center mt-8">
          <Button variant="hero-outline" size="lg">
            View All Problems
          </Button>
        </div>
      </div>
    </section>
  );
};

export const placementProblemSetSummary = {
  total_problems: 40,
  source_priority_note: "Concept reference & editorial learning recommended from GeeksforGeeks; practice coding on LeetCode.",
  difficulty_groups: [
    { difficulty: "Easy", count: 15 },
    { difficulty: "Medium", count: 15 },
    { difficulty: "Hard", count: 10 }
  ]
};
