// DSA Learning Data Model

export type Approach = {
  name: string;
  idea: string;
  steps?: string[];
  time_complexity: string;
  space_complexity: string;
  when_to_use?: string;
};

export type Problem = {
  id: string;
  title: string;
  why_it_matters?: string;
  core_pattern: string;
  tags?: string[];
  difficulty: "Easy" | "Medium" | "Hard";
  approaches?: Approach[];
  complexity_summary?: string;
  interview_tip?: string;
};

export type DifficultySection = {
  level: "Easy" | "Medium" | "Hard";
  problems: Problem[];
};

export type Topic = {
  id: string;
  title: string;
  description: string;
  lesson_count: number;
  difficulty_sections: DifficultySection[];
};

export const dsaContent: Topic[] = [
  {
    id: "arrays_hashing",
    title: "Arrays & Hashing",
    description: "Core linear data structure problems using hashing, prefix sums, and greedy scanning.",
    lesson_count: 15,
    difficulty_sections: [
      {
        level: "Easy",
        problems: [
          {
            id: "two_sum",
            title: "Two Sum",
            why_it_matters: "Introduces hashing and fast lookup — every interviewer expects this.",
            core_pattern: "Hash Map",
            tags: ["array", "hashing"],
            difficulty: "Easy",
            approaches: [
              {
                name: "Brute Force",
                idea: "Test every pair.",
                steps: ["Loop i", "Loop j", "Check sum"],
                time_complexity: "O(n²)",
                space_complexity: "O(1)",
                when_to_use: "Small input only"
              },
              {
                name: "Hash Map",
                idea: "Store seen numbers and lookup complement.",
                steps: ["Iterate array", "Compute complement", "Check map", "Insert current"],
                time_complexity: "O(n)",
                space_complexity: "O(n)",
                when_to_use: "Always in interviews"
              }
            ],
            complexity_summary: "Improves from O(n²) to O(n)",
            interview_tip: "Explain lookup and collision handling."
          },
          {
            id: "contains_duplicate",
            title: "Contains Duplicate",
            why_it_matters: "Tests hashing and set understanding.",
            core_pattern: "Hash Set",
            tags: ["hashing"],
            difficulty: "Easy",
            approaches: [
              {
                name: "Sorting",
                idea: "Duplicates become adjacent",
                time_complexity: "O(n log n)",
                space_complexity: "O(1)"
              },
              {
                name: "Hash Set",
                idea: "Track seen numbers",
                time_complexity: "O(n)",
                space_complexity: "O(n)"
              }
            ],
            interview_tip: "Mention expected O(1) set lookup."
          },
          {
            id: "valid_anagram",
            title: "Valid Anagram",
            core_pattern: "Frequency Counting",
            tags: ["string", "hashing"],
            difficulty: "Easy",
            approaches: [
              {
                name: "Sorting",
                idea: "Compare sorted strings",
                time_complexity: "O(n log n)",
                space_complexity: "O(n)"
              },
              {
                name: "Hash Count",
                idea: "Count chars",
                time_complexity: "O(n)",
                space_complexity: "O(1)"
              }
            ]
          },
          {
            id: "plus_one",
            title: "Plus One",
            core_pattern: "Simulation",
            difficulty: "Easy",
            approaches: [
              {
                name: "Reverse Iteration",
                idea: "Handle carry from last digit",
                time_complexity: "O(n)",
                space_complexity: "O(1)"
              }
            ]
          },
          {
            id: "intersection_two_arrays",
            title: "Intersection of Two Arrays",
            core_pattern: "Hashing / Set",
            difficulty: "Easy",
            approaches: [
              {
                name: "Two Sets",
                idea: "Use set intersection",
                time_complexity: "O(n + m)",
                space_complexity: "O(n)"
              }
            ]
          }
        ]
      },
      {
        level: "Medium",
        problems: [
          {
            id: "maximum_subarray",
            title: "Maximum Subarray",
            core_pattern: "Kadane",
            difficulty: "Medium",
            why_it_matters: "Classic DP problem, tests understanding of optimal substructure.",
            approaches: [
              {
                name: "Kadane's Algorithm",
                idea: "Track max ending here and global max",
                steps: ["Initialize maxSoFar and maxEndingHere", "For each element, maxEndingHere = max(element, maxEndingHere + element)", "Update maxSoFar"],
                time_complexity: "O(n)",
                space_complexity: "O(1)"
              }
            ],
            interview_tip: "Explain why greedy works here."
          },
          {
            id: "three_sum",
            title: "3-Sum",
            core_pattern: "Sorting + Two Pointers",
            difficulty: "Medium",
            approaches: [
              {
                name: "Sort + Two Pointers",
                idea: "Fix one element, use two pointers for rest",
                time_complexity: "O(n²)",
                space_complexity: "O(1)"
              }
            ],
            interview_tip: "Handle duplicates carefully."
          },
          {
            id: "subarray_sum_equals_k",
            title: "Subarray Sum Equals K",
            core_pattern: "Prefix Sum + Hash",
            difficulty: "Medium",
            approaches: [
              {
                name: "Prefix Sum + HashMap",
                idea: "Track prefix sums and count complements",
                time_complexity: "O(n)",
                space_complexity: "O(n)"
              }
            ]
          },
          {
            id: "product_except_self",
            title: "Product of Array Except Self",
            core_pattern: "Prefix & Suffix",
            difficulty: "Medium",
            approaches: [
              {
                name: "Left-Right Products",
                idea: "Calculate prefix and suffix products",
                time_complexity: "O(n)",
                space_complexity: "O(1)"
              }
            ]
          },
          {
            id: "longest_consecutive_sequence",
            title: "Longest Consecutive Sequence",
            core_pattern: "Hash Set",
            difficulty: "Medium",
            approaches: [
              {
                name: "Hash Set + Sequence Start",
                idea: "Only start counting from sequence beginnings",
                time_complexity: "O(n)",
                space_complexity: "O(n)"
              }
            ]
          }
        ]
      },
      {
        level: "Hard",
        problems: [
          {
            id: "trapping_rain_water",
            title: "Trapping Rain Water",
            core_pattern: "Two Pointer / Prefix Max",
            difficulty: "Hard",
            why_it_matters: "Tests ability to optimize space from O(n) to O(1).",
            approaches: [
              {
                name: "Prefix Max Arrays",
                idea: "Precompute left and right max heights",
                time_complexity: "O(n)",
                space_complexity: "O(n)"
              },
              {
                name: "Two Pointers",
                idea: "Move pointers from both ends",
                time_complexity: "O(n)",
                space_complexity: "O(1)"
              }
            ],
            interview_tip: "Start with brute force, optimize to two pointers."
          },
          {
            id: "minimum_window_substring",
            title: "Minimum Window Substring",
            core_pattern: "Sliding Window",
            difficulty: "Hard",
            approaches: [
              {
                name: "Sliding Window + HashMap",
                idea: "Expand right, shrink left when valid",
                time_complexity: "O(n)",
                space_complexity: "O(k)"
              }
            ]
          },
          {
            id: "sliding_window_max",
            title: "Sliding Window Maximum",
            core_pattern: "Monotonic Deque",
            difficulty: "Hard",
            approaches: [
              {
                name: "Monotonic Deque",
                idea: "Maintain decreasing deque of indices",
                time_complexity: "O(n)",
                space_complexity: "O(k)"
              }
            ]
          },
          {
            id: "first_missing_positive",
            title: "First Missing Positive",
            core_pattern: "Index Mapping",
            difficulty: "Hard",
            approaches: [
              {
                name: "Cyclic Sort",
                idea: "Place each number at its index",
                time_complexity: "O(n)",
                space_complexity: "O(1)"
              }
            ]
          },
          {
            id: "largest_rectangle_histogram",
            title: "Largest Rectangle in Histogram",
            core_pattern: "Monotonic Stack",
            difficulty: "Hard",
            approaches: [
              {
                name: "Monotonic Stack",
                idea: "Track indices of increasing heights",
                time_complexity: "O(n)",
                space_complexity: "O(n)"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: "two_pointers",
    title: "Two Pointers",
    description: "Fast/slow pointers and inward shrinking window patterns.",
    lesson_count: 10,
    difficulty_sections: [
      {
        level: "Easy",
        problems: [
          { id: "reverse_string", title: "Reverse String", core_pattern: "Two Pointer", difficulty: "Easy", approaches: [{ name: "Two Pointers", idea: "Swap from both ends", time_complexity: "O(n)", space_complexity: "O(1)" }] },
          { id: "valid_palindrome", title: "Valid Palindrome", core_pattern: "Two Pointer", difficulty: "Easy", approaches: [{ name: "Two Pointers", idea: "Compare from both ends, skip non-alphanumeric", time_complexity: "O(n)", space_complexity: "O(1)" }] },
          { id: "merge_sorted_arrays", title: "Merge Sorted Arrays", core_pattern: "Two Pointer Merge", difficulty: "Easy", approaches: [{ name: "Merge from End", idea: "Place larger elements first", time_complexity: "O(n + m)", space_complexity: "O(1)" }] }
        ]
      },
      {
        level: "Medium",
        problems: [
          { id: "container_most_water", title: "Container With Most Water", core_pattern: "Two Pointer", difficulty: "Medium", approaches: [{ name: "Two Pointers", idea: "Move the shorter line inward", time_complexity: "O(n)", space_complexity: "O(1)" }], interview_tip: "Explain why moving shorter line is optimal." },
          { id: "remove_duplicates_sorted", title: "Remove Duplicates from Sorted Array", core_pattern: "Two Pointer", difficulty: "Medium", approaches: [{ name: "Slow/Fast Pointers", idea: "Slow pointer tracks unique position", time_complexity: "O(n)", space_complexity: "O(1)" }] },
          { id: "sort_colors", title: "Sort Colors", core_pattern: "Dutch National Flag", difficulty: "Medium", approaches: [{ name: "Dutch National Flag", idea: "Three pointers for 0, 1, 2 regions", time_complexity: "O(n)", space_complexity: "O(1)" }] },
          { id: "minimum_difference_pair", title: "Minimum Difference Pair", core_pattern: "Two Pointer", difficulty: "Medium", approaches: [{ name: "Sort + Two Pointers", idea: "Compare closest elements in sorted arrays", time_complexity: "O(n log n)", space_complexity: "O(1)" }] }
        ]
      },
      {
        level: "Hard",
        problems: [
          { id: "trapping_rain_water_opt", title: "Trapping Rain Water Optimized", core_pattern: "Two Pointer", difficulty: "Hard", approaches: [{ name: "Two Pointers", idea: "Track left and right max while moving inward", time_complexity: "O(n)", space_complexity: "O(1)" }] },
          { id: "shortest_subarray_sort", title: "Shortest Subarray to Sort", core_pattern: "Two Pointer", difficulty: "Hard", approaches: [{ name: "Find Bounds", idea: "Find leftmost and rightmost out-of-place elements", time_complexity: "O(n)", space_complexity: "O(1)" }] }
        ]
      }
    ]
  },
  {
    id: "sliding_window",
    title: "Sliding Window",
    description: "Dynamic window problems using frequency maps and deques.",
    lesson_count: 8,
    difficulty_sections: [
      {
        level: "Easy",
        problems: [
          { id: "max_sum_k", title: "Max Sum Subarray of Size K", core_pattern: "Fixed Window", difficulty: "Easy", approaches: [{ name: "Sliding Window", idea: "Add new, remove old element", time_complexity: "O(n)", space_complexity: "O(1)" }] },
          { id: "longest_substring_k_distinct_variant", title: "K Distinct Variant", core_pattern: "Variable Window", difficulty: "Easy", approaches: [{ name: "HashMap + Window", idea: "Track character counts", time_complexity: "O(n)", space_complexity: "O(k)" }] }
        ]
      },
      {
        level: "Medium",
        problems: [
          { id: "longest_substring_no_repeat", title: "Longest Substring Without Repeating", core_pattern: "Variable Window", difficulty: "Medium", approaches: [{ name: "Sliding Window + Set", idea: "Shrink window on duplicate", time_complexity: "O(n)", space_complexity: "O(k)" }], interview_tip: "Use set or map for O(1) lookup." },
          { id: "character_replacement", title: "Longest Repeating Character Replacement", core_pattern: "Variable Window", difficulty: "Medium", approaches: [{ name: "Sliding Window", idea: "Track max frequency character", time_complexity: "O(n)", space_complexity: "O(26)" }] },
          { id: "min_size_subarray_sum", title: "Minimum Size Subarray Sum", core_pattern: "Variable Window", difficulty: "Medium", approaches: [{ name: "Sliding Window", idea: "Shrink when sum >= target", time_complexity: "O(n)", space_complexity: "O(1)" }] },
          { id: "fruits_into_baskets", title: "Fruits Into Baskets", core_pattern: "Variable Window", difficulty: "Medium", approaches: [{ name: "Sliding Window", idea: "Max window with 2 distinct fruits", time_complexity: "O(n)", space_complexity: "O(1)" }] }
        ]
      },
      {
        level: "Hard",
        problems: [
          { id: "minimum_window_substring_sw", title: "Minimum Window Substring", core_pattern: "Variable Window", difficulty: "Hard", approaches: [{ name: "Sliding Window + HashMap", idea: "Expand to find, shrink to minimize", time_complexity: "O(n)", space_complexity: "O(k)" }] },
          { id: "sliding_window_max_sw", title: "Sliding Window Maximum", core_pattern: "Monotonic Deque", difficulty: "Hard", approaches: [{ name: "Monotonic Deque", idea: "Maintain decreasing order", time_complexity: "O(n)", space_complexity: "O(k)" }] }
        ]
      }
    ]
  },
  {
    id: "binary_search",
    title: "Searching & Binary Search",
    description: "Classic binary search & binary search on answer.",
    lesson_count: 9,
    difficulty_sections: [
      {
        level: "Easy",
        problems: [
          { id: "binary_search", title: "Binary Search", core_pattern: "Binary Search", difficulty: "Easy", approaches: [{ name: "Iterative Binary Search", idea: "Divide search space in half", time_complexity: "O(log n)", space_complexity: "O(1)" }] },
          { id: "first_last_pos", title: "First and Last Position", core_pattern: "Binary Search", difficulty: "Easy", approaches: [{ name: "Two Binary Searches", idea: "Find left bound then right bound", time_complexity: "O(log n)", space_complexity: "O(1)" }] }
        ]
      },
      {
        level: "Medium",
        problems: [
          { id: "rotated_array", title: "Search in Rotated Array", core_pattern: "Modified Binary Search", difficulty: "Medium", approaches: [{ name: "Binary Search with Pivot", idea: "Identify sorted half, search accordingly", time_complexity: "O(log n)", space_complexity: "O(1)" }], interview_tip: "Handle duplicates separately." },
          { id: "find_peak", title: "Find Peak Element", core_pattern: "Binary Search", difficulty: "Medium", approaches: [{ name: "Binary Search", idea: "Move towards larger neighbor", time_complexity: "O(log n)", space_complexity: "O(1)" }] },
          { id: "kth_smallest_matrix", title: "Kth Smallest in Matrix", core_pattern: "Binary Search on Value", difficulty: "Medium", approaches: [{ name: "Binary Search + Count", idea: "Binary search on value range, count elements <= mid", time_complexity: "O(n log(max-min))", space_complexity: "O(1)" }] }
        ]
      },
      {
        level: "Hard",
        problems: [
          { id: "median_two_arrays", title: "Median of Two Sorted Arrays", core_pattern: "Binary Search", difficulty: "Hard", approaches: [{ name: "Binary Search on Partition", idea: "Binary search to find correct partition", time_complexity: "O(log min(n,m))", space_complexity: "O(1)" }], interview_tip: "Practice the edge cases thoroughly." },
          { id: "aggressive_cows", title: "Aggressive Cows", core_pattern: "Binary Search on Answer", difficulty: "Hard", approaches: [{ name: "Binary Search on Distance", idea: "Binary search on minimum distance, validate placement", time_complexity: "O(n log d)", space_complexity: "O(1)" }] },
          { id: "koko_eating_bananas", title: "Koko Eating Bananas", core_pattern: "Binary Search on Answer", difficulty: "Hard", approaches: [{ name: "Binary Search on Speed", idea: "Binary search on eating speed", time_complexity: "O(n log m)", space_complexity: "O(1)" }] }
        ]
      }
    ]
  },
  {
    id: "linked_list",
    title: "Linked Lists",
    description: "Singly, doubly linked lists and pointer manipulation.",
    lesson_count: 12,
    difficulty_sections: [
      {
        level: "Easy",
        problems: [
          { id: "reverse_linked_list", title: "Reverse Linked List", core_pattern: "Pointer Manipulation", difficulty: "Easy", approaches: [{ name: "Iterative", idea: "Reverse pointers one by one", time_complexity: "O(n)", space_complexity: "O(1)" }] },
          { id: "merge_two_sorted_lists", title: "Merge Two Sorted Lists", core_pattern: "Two Pointers", difficulty: "Easy", approaches: [{ name: "Merge", idea: "Compare heads and link smaller", time_complexity: "O(n + m)", space_complexity: "O(1)" }] },
          { id: "linked_list_cycle", title: "Linked List Cycle", core_pattern: "Fast/Slow Pointers", difficulty: "Easy", approaches: [{ name: "Floyd's Cycle Detection", idea: "Fast and slow pointers meet if cycle exists", time_complexity: "O(n)", space_complexity: "O(1)" }] }
        ]
      },
      {
        level: "Medium",
        problems: [
          { id: "remove_nth_from_end", title: "Remove Nth Node From End", core_pattern: "Two Pointers", difficulty: "Medium", approaches: [{ name: "Two Pass", idea: "Find length then remove", time_complexity: "O(n)", space_complexity: "O(1)" }, { name: "One Pass", idea: "Use gap between two pointers", time_complexity: "O(n)", space_complexity: "O(1)" }] },
          { id: "reorder_list", title: "Reorder List", core_pattern: "Multiple Steps", difficulty: "Medium", approaches: [{ name: "Find Mid + Reverse + Merge", idea: "Split, reverse second half, merge alternately", time_complexity: "O(n)", space_complexity: "O(1)" }] },
          { id: "copy_random_pointer", title: "Copy List with Random Pointer", core_pattern: "HashMap / Interweaving", difficulty: "Medium", approaches: [{ name: "HashMap", idea: "Map old nodes to new nodes", time_complexity: "O(n)", space_complexity: "O(n)" }] }
        ]
      },
      {
        level: "Hard",
        problems: [
          { id: "merge_k_sorted_lists", title: "Merge K Sorted Lists", core_pattern: "Heap / Divide Conquer", difficulty: "Hard", approaches: [{ name: "Min Heap", idea: "Use heap to get minimum efficiently", time_complexity: "O(n log k)", space_complexity: "O(k)" }] },
          { id: "reverse_nodes_k_group", title: "Reverse Nodes in K-Group", core_pattern: "Pointer Manipulation", difficulty: "Hard", approaches: [{ name: "Iterative K-Reverse", idea: "Reverse k nodes at a time", time_complexity: "O(n)", space_complexity: "O(1)" }] }
        ]
      }
    ]
  },
  {
    id: "trees",
    title: "Trees",
    description: "Binary trees, BST, and tree traversal algorithms.",
    lesson_count: 18,
    difficulty_sections: [
      {
        level: "Easy",
        problems: [
          { id: "invert_binary_tree", title: "Invert Binary Tree", core_pattern: "DFS", difficulty: "Easy", approaches: [{ name: "Recursive DFS", idea: "Swap children then recurse", time_complexity: "O(n)", space_complexity: "O(h)" }] },
          { id: "max_depth", title: "Maximum Depth of Binary Tree", core_pattern: "DFS", difficulty: "Easy", approaches: [{ name: "Recursive", idea: "Return 1 + max of children depths", time_complexity: "O(n)", space_complexity: "O(h)" }] },
          { id: "same_tree", title: "Same Tree", core_pattern: "DFS", difficulty: "Easy", approaches: [{ name: "Recursive Comparison", idea: "Compare node values and recurse", time_complexity: "O(n)", space_complexity: "O(h)" }] }
        ]
      },
      {
        level: "Medium",
        problems: [
          { id: "level_order", title: "Binary Tree Level Order Traversal", core_pattern: "BFS", difficulty: "Medium", approaches: [{ name: "BFS with Queue", idea: "Process level by level", time_complexity: "O(n)", space_complexity: "O(n)" }] },
          { id: "validate_bst", title: "Validate BST", core_pattern: "DFS with Range", difficulty: "Medium", approaches: [{ name: "Range Check", idea: "Pass valid range to each node", time_complexity: "O(n)", space_complexity: "O(h)" }] },
          { id: "lca", title: "Lowest Common Ancestor", core_pattern: "DFS", difficulty: "Medium", approaches: [{ name: "Recursive Search", idea: "Return node if found, propagate up", time_complexity: "O(n)", space_complexity: "O(h)" }] },
          { id: "construct_tree", title: "Construct Tree from Preorder/Inorder", core_pattern: "Divide and Conquer", difficulty: "Medium", approaches: [{ name: "HashMap + Recursion", idea: "Use inorder to find root position", time_complexity: "O(n)", space_complexity: "O(n)" }] }
        ]
      },
      {
        level: "Hard",
        problems: [
          { id: "serialize_tree", title: "Serialize and Deserialize Binary Tree", core_pattern: "BFS/DFS", difficulty: "Hard", approaches: [{ name: "Preorder with Nulls", idea: "Encode null as special character", time_complexity: "O(n)", space_complexity: "O(n)" }] },
          { id: "binary_tree_max_path", title: "Binary Tree Maximum Path Sum", core_pattern: "DFS", difficulty: "Hard", approaches: [{ name: "Post-order DFS", idea: "Track max path through each node", time_complexity: "O(n)", space_complexity: "O(h)" }] }
        ]
      }
    ]
  },
  {
    id: "graphs",
    title: "Graphs",
    description: "BFS, DFS, shortest paths, and graph algorithms.",
    lesson_count: 15,
    difficulty_sections: [
      {
        level: "Easy",
        problems: [
          { id: "number_of_islands", title: "Number of Islands", core_pattern: "DFS/BFS", difficulty: "Easy", approaches: [{ name: "DFS Flood Fill", idea: "Mark visited and count components", time_complexity: "O(m*n)", space_complexity: "O(m*n)" }] },
          { id: "flood_fill", title: "Flood Fill", core_pattern: "DFS/BFS", difficulty: "Easy", approaches: [{ name: "DFS", idea: "Recursively fill connected cells", time_complexity: "O(m*n)", space_complexity: "O(m*n)" }] }
        ]
      },
      {
        level: "Medium",
        problems: [
          { id: "clone_graph", title: "Clone Graph", core_pattern: "DFS + HashMap", difficulty: "Medium", approaches: [{ name: "DFS with HashMap", idea: "Map old nodes to cloned nodes", time_complexity: "O(V + E)", space_complexity: "O(V)" }] },
          { id: "course_schedule", title: "Course Schedule", core_pattern: "Topological Sort", difficulty: "Medium", approaches: [{ name: "Kahn's Algorithm", idea: "BFS with indegree tracking", time_complexity: "O(V + E)", space_complexity: "O(V)" }] },
          { id: "rotting_oranges", title: "Rotting Oranges", core_pattern: "Multi-source BFS", difficulty: "Medium", approaches: [{ name: "BFS", idea: "Start from all rotten oranges simultaneously", time_complexity: "O(m*n)", space_complexity: "O(m*n)" }] },
          { id: "pacific_atlantic", title: "Pacific Atlantic Water Flow", core_pattern: "DFS", difficulty: "Medium", approaches: [{ name: "Reverse DFS", idea: "Start from oceans, find intersection", time_complexity: "O(m*n)", space_complexity: "O(m*n)" }] }
        ]
      },
      {
        level: "Hard",
        problems: [
          { id: "word_ladder", title: "Word Ladder", core_pattern: "BFS", difficulty: "Hard", approaches: [{ name: "BFS + Pattern Matching", idea: "Generate neighbors, BFS for shortest path", time_complexity: "O(n*m²)", space_complexity: "O(n*m)" }] },
          { id: "alien_dictionary", title: "Alien Dictionary", core_pattern: "Topological Sort", difficulty: "Hard", approaches: [{ name: "Build Graph + Topo Sort", idea: "Extract order from word pairs", time_complexity: "O(C)", space_complexity: "O(1)" }] }
        ]
      }
    ]
  },
  {
    id: "dynamic_programming",
    title: "Dynamic Programming",
    description: "Memoization, tabulation, and classic DP problems.",
    lesson_count: 20,
    difficulty_sections: [
      {
        level: "Easy",
        problems: [
          { id: "climbing_stairs", title: "Climbing Stairs", core_pattern: "1D DP", difficulty: "Easy", approaches: [{ name: "Bottom-up DP", idea: "dp[i] = dp[i-1] + dp[i-2]", time_complexity: "O(n)", space_complexity: "O(1)" }] },
          { id: "house_robber", title: "House Robber", core_pattern: "1D DP", difficulty: "Easy", approaches: [{ name: "DP", idea: "Rob or skip current house", time_complexity: "O(n)", space_complexity: "O(1)" }] }
        ]
      },
      {
        level: "Medium",
        problems: [
          { id: "coin_change", title: "Coin Change", core_pattern: "Unbounded Knapsack", difficulty: "Medium", approaches: [{ name: "Bottom-up DP", idea: "Min coins for each amount", time_complexity: "O(n*m)", space_complexity: "O(n)" }], interview_tip: "Classic interview problem, know it well." },
          { id: "longest_increasing_subseq", title: "Longest Increasing Subsequence", core_pattern: "1D DP / Binary Search", difficulty: "Medium", approaches: [{ name: "DP", idea: "For each element, find longest ending there", time_complexity: "O(n²)", space_complexity: "O(n)" }, { name: "Binary Search", idea: "Maintain smallest tail for each length", time_complexity: "O(n log n)", space_complexity: "O(n)" }] },
          { id: "unique_paths", title: "Unique Paths", core_pattern: "2D DP", difficulty: "Medium", approaches: [{ name: "DP Grid", idea: "Sum paths from top and left", time_complexity: "O(m*n)", space_complexity: "O(n)" }] },
          { id: "word_break", title: "Word Break", core_pattern: "1D DP", difficulty: "Medium", approaches: [{ name: "DP with Set", idea: "Check if any prefix + suffix works", time_complexity: "O(n²)", space_complexity: "O(n)" }] }
        ]
      },
      {
        level: "Hard",
        problems: [
          { id: "edit_distance", title: "Edit Distance", core_pattern: "2D DP", difficulty: "Hard", approaches: [{ name: "DP Table", idea: "Min of insert, delete, replace", time_complexity: "O(m*n)", space_complexity: "O(m*n)" }] },
          { id: "regular_expression", title: "Regular Expression Matching", core_pattern: "2D DP", difficulty: "Hard", approaches: [{ name: "DP", idea: "Handle . and * cases", time_complexity: "O(m*n)", space_complexity: "O(m*n)" }] },
          { id: "burst_balloons", title: "Burst Balloons", core_pattern: "Interval DP", difficulty: "Hard", approaches: [{ name: "DP on Intervals", idea: "Think of last balloon to burst", time_complexity: "O(n³)", space_complexity: "O(n²)" }] }
        ]
      }
    ]
  }
];

export const getTopicById = (id: string): Topic | undefined => {
  return dsaContent.find(topic => topic.id === id);
};

export const getProblemById = (topicId: string, problemId: string): Problem | undefined => {
  const topic = getTopicById(topicId);
  if (!topic) return undefined;
  
  for (const section of topic.difficulty_sections) {
    const problem = section.problems.find(p => p.id === problemId);
    if (problem) return problem;
  }
  return undefined;
};

export const getAllProblems = (): (Problem & { topicId: string; topicTitle: string })[] => {
  const problems: (Problem & { topicId: string; topicTitle: string })[] = [];
  
  for (const topic of dsaContent) {
    for (const section of topic.difficulty_sections) {
      for (const problem of section.problems) {
        problems.push({ ...problem, topicId: topic.id, topicTitle: topic.title });
      }
    }
  }
  
  return problems;
};
