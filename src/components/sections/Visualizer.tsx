import { motion } from "framer-motion";
import { useState, useMemo, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ChevronRight, Code, Pause, Play, RotateCcw, SkipForward } from "lucide-react";
import { Slider } from "@/components/ui/slider";
const algorithms = ["Bubble Sort", "Quick Sort", "Merge Sort", "Binary Search", "BFS", "DFS"];

type AlgorithmStep = {
  description: string;
  highlight: number[];
  array?: number[];
  sorted?: number[];
  pivot?: number;
  left?: number;
  right?: number;
  mid?: number;
  found?: boolean;
  visited?: number[];
  queue?: number[];
  stack?: number[];
  current?: number;
  codeLine?: number[];
};

// Algorithm code snippets
const algorithmCode: Record<string, string[]> = {
  "Bubble Sort": [
    "function bubbleSort(arr) {",
    "  for (let i = 0; i < n-1; i++) {",
    "    for (let j = 0; j < n-i-1; j++) {",
    "      if (arr[j] > arr[j+1]) {",
    "        swap(arr[j], arr[j+1]);",
    "      }",
    "    }",
    "  }",
    "  return arr;",
    "}",
  ],
  "Quick Sort": [
    "function quickSort(arr, low, high) {",
    "  if (low < high) {",
    "    pivot = arr[high];",
    "    i = low - 1;",
    "    for (j = low; j < high; j++) {",
    "      if (arr[j] < pivot) {",
    "        i++; swap(arr[i], arr[j]);",
    "      }",
    "    }",
    "    swap(arr[i+1], arr[high]);",
    "    pi = i + 1;",
    "    quickSort(arr, low, pi-1);",
    "    quickSort(arr, pi+1, high);",
    "  }",
    "}",
  ],
  "Merge Sort": [
    "function mergeSort(arr) {",
    "  if (arr.length <= 1) return arr;",
    "  mid = arr.length / 2;",
    "  left = mergeSort(arr[0..mid]);",
    "  right = mergeSort(arr[mid..n]);",
    "  return merge(left, right);",
    "}",
    "",
    "function merge(left, right) {",
    "  result = [];",
    "  while (left && right) {",
    "    if (left[0] <= right[0])",
    "      result.push(left.shift());",
    "    else",
    "      result.push(right.shift());",
    "  }",
    "  return [...result, ...left, ...right];",
    "}",
  ],
  "Binary Search": [
    "function binarySearch(arr, target) {",
    "  left = 0, right = arr.length - 1;",
    "  while (left <= right) {",
    "    mid = Math.floor((left+right)/2);",
    "    if (arr[mid] === target) {",
    "      return mid; // Found!",
    "    }",
    "    if (arr[mid] < target) {",
    "      left = mid + 1;",
    "    } else {",
    "      right = mid - 1;",
    "    }",
    "  }",
    "  return -1; // Not found",
    "}",
  ],
  "BFS": [
    "function BFS(graph, start) {",
    "  visited = new Set();",
    "  queue = [start];",
    "  while (queue.length > 0) {",
    "    node = queue.shift();",
    "    if (visited.has(node)) continue;",
    "    visited.add(node);",
    "    for (neighbor of graph[node]) {",
    "      if (!visited.has(neighbor)) {",
    "        queue.push(neighbor);",
    "      }",
    "    }",
    "  }",
    "  return visited;",
    "}",
  ],
  "DFS": [
    "function DFS(graph, start) {",
    "  visited = new Set();",
    "  stack = [start];",
    "  while (stack.length > 0) {",
    "    node = stack.pop();",
    "    if (visited.has(node)) continue;",
    "    visited.add(node);",
    "    for (neighbor of graph[node]) {",
    "      if (!visited.has(neighbor)) {",
    "        stack.push(neighbor);",
    "      }",
    "    }",
    "  }",
    "  return visited;",
    "}",
  ],
};

// Generate algorithm-specific steps
const generateBubbleSortSteps = (): AlgorithmStep[] => {
  const arr = [64, 34, 25, 12, 22, 11, 90];
  const steps: AlgorithmStep[] = [];
  const sorted: number[] = [];
  
  steps.push({
    description: "Initial array - we'll compare adjacent elements and swap if needed",
    highlight: [],
    array: [...arr],
    sorted: [],
    codeLine: [0],
  });

  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      steps.push({
        description: `Compare ${arr[j]} and ${arr[j + 1]}`,
        highlight: [j, j + 1],
        array: [...arr],
        sorted: [...sorted],
        codeLine: [2, 3],
      });
      
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        steps.push({
          description: `${arr[j + 1]} > ${arr[j]}, swap them`,
          highlight: [j, j + 1],
          array: [...arr],
          sorted: [...sorted],
          codeLine: [3, 4],
        });
      } else {
        steps.push({
          description: `${arr[j]} ≤ ${arr[j + 1]}, no swap needed`,
          highlight: [j, j + 1],
          array: [...arr],
          sorted: [...sorted],
          codeLine: [3],
        });
      }
    }
    sorted.unshift(arr.length - 1 - i);
  }
  sorted.unshift(0);
  
  steps.push({
    description: "Array is now sorted!",
    highlight: [],
    array: [...arr],
    sorted: Array.from({ length: arr.length }, (_, i) => i),
    codeLine: [8],
  });

  return steps;
};

const generateQuickSortSteps = (): AlgorithmStep[] => {
  const steps: AlgorithmStep[] = [];
  const arr = [64, 34, 25, 12, 22, 11, 90];
  
  steps.push({
    description: "Initial array - Quick Sort uses divide and conquer with a pivot",
    highlight: [],
    array: [...arr],
    sorted: [],
    codeLine: [0, 1],
  });

  const quickSort = (array: number[], low: number, high: number, sorted: number[]) => {
    if (low < high) {
      const pivot = array[high];
      steps.push({
        description: `Choose pivot: ${pivot} (last element)`,
        highlight: [high],
        array: [...array],
        pivot: high,
        sorted: [...sorted],
        codeLine: [2],
      });

      let i = low - 1;
      
      for (let j = low; j < high; j++) {
        steps.push({
          description: `Compare ${array[j]} with pivot ${pivot}`,
          highlight: [j, high],
          array: [...array],
          pivot: high,
          sorted: [...sorted],
          codeLine: [4, 5],
        });
        
        if (array[j] < pivot) {
          i++;
          if (i !== j) {
            [array[i], array[j]] = [array[j], array[i]];
            steps.push({
              description: `${array[j]} < ${pivot}, swap to position ${i}`,
              highlight: [i, j],
              array: [...array],
              pivot: high,
              sorted: [...sorted],
              codeLine: [6],
            });
          }
        }
      }
      
      [array[i + 1], array[high]] = [array[high], array[i + 1]];
      const pivotIndex = i + 1;
      sorted.push(pivotIndex);
      
      steps.push({
        description: `Place pivot ${pivot} at correct position ${pivotIndex}`,
        highlight: [pivotIndex],
        array: [...array],
        sorted: [...sorted],
        codeLine: [9, 10],
      });

      quickSort(array, low, pivotIndex - 1, sorted);
      quickSort(array, pivotIndex + 1, high, sorted);
    } else if (low === high) {
      sorted.push(low);
    }
  };

  const sortedIndices: number[] = [];
  quickSort([...arr], 0, arr.length - 1, sortedIndices);
  
  steps.push({
    description: "Array is now sorted!",
    highlight: [],
    array: [11, 12, 22, 25, 34, 64, 90],
    sorted: Array.from({ length: arr.length }, (_, i) => i),
    codeLine: [14],
  });

  return steps;
};

const generateMergeSortSteps = (): AlgorithmStep[] => {
  const steps: AlgorithmStep[] = [];
  
  steps.push({
    description: "Initial array - Merge Sort divides array into halves recursively",
    highlight: [],
    array: [64, 34, 25, 12, 22, 11, 90],
    sorted: [],
    codeLine: [0, 1],
  });

  steps.push({
    description: "Divide: Split array into [64, 34, 25] and [12, 22, 11, 90]",
    highlight: [0, 1, 2],
    array: [64, 34, 25, 12, 22, 11, 90],
    left: 0,
    right: 2,
    codeLine: [2, 3, 4],
  });

  steps.push({
    description: "Divide: Split [64, 34, 25] into [64] and [34, 25]",
    highlight: [0],
    array: [64, 34, 25, 12, 22, 11, 90],
    codeLine: [3],
  });

  steps.push({
    description: "Divide: Split [34, 25] into [34] and [25]",
    highlight: [1, 2],
    array: [64, 34, 25, 12, 22, 11, 90],
    codeLine: [3, 4],
  });

  steps.push({
    description: "Merge: Compare 34 and 25, 25 is smaller",
    highlight: [1, 2],
    array: [64, 34, 25, 12, 22, 11, 90],
    codeLine: [10, 11],
  });

  steps.push({
    description: "Merge: [25, 34] is now sorted",
    highlight: [1, 2],
    array: [64, 25, 34, 12, 22, 11, 90],
    codeLine: [12],
  });

  steps.push({
    description: "Merge: Compare 64 with [25, 34] - 25 < 64",
    highlight: [0, 1, 2],
    array: [64, 25, 34, 12, 22, 11, 90],
    codeLine: [11, 12],
  });

  steps.push({
    description: "Merge: [25, 34, 64] is now sorted",
    highlight: [0, 1, 2],
    array: [25, 34, 64, 12, 22, 11, 90],
    sorted: [0, 1, 2],
    codeLine: [16],
  });

  steps.push({
    description: "Now sort right half: [12, 22, 11, 90]",
    highlight: [3, 4, 5, 6],
    array: [25, 34, 64, 12, 22, 11, 90],
    codeLine: [4],
  });

  steps.push({
    description: "After sorting right half: [11, 12, 22, 90]",
    highlight: [3, 4, 5, 6],
    array: [25, 34, 64, 11, 12, 22, 90],
    sorted: [3, 4, 5, 6],
    codeLine: [5],
  });

  steps.push({
    description: "Final merge: Compare elements from both halves",
    highlight: [0, 3],
    array: [25, 34, 64, 11, 12, 22, 90],
    codeLine: [10, 11],
  });

  steps.push({
    description: "Array is now sorted!",
    highlight: [],
    array: [11, 12, 22, 25, 34, 64, 90],
    sorted: Array.from({ length: 7 }, (_, i) => i),
    codeLine: [16],
  });

  return steps;
};

const generateBinarySearchSteps = (): AlgorithmStep[] => {
  const arr = [11, 12, 22, 25, 34, 64, 90];
  const target = 25;
  const steps: AlgorithmStep[] = [];

  steps.push({
    description: `Sorted array - searching for ${target} using Binary Search`,
    highlight: [],
    array: arr,
    sorted: Array.from({ length: arr.length }, (_, i) => i),
    codeLine: [0, 1],
  });

  let left = 0;
  let right = arr.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    
    steps.push({
      description: `Check middle element at index ${mid}: value = ${arr[mid]}`,
      highlight: [mid],
      array: arr,
      left,
      right,
      mid,
      codeLine: [2, 3],
    });

    if (arr[mid] === target) {
      steps.push({
        description: `Found ${target} at index ${mid}!`,
        highlight: [mid],
        array: arr,
        found: true,
        mid,
        codeLine: [4, 5],
      });
      break;
    } else if (arr[mid] < target) {
      steps.push({
        description: `${arr[mid]} < ${target}, search right half`,
        highlight: Array.from({ length: right - mid }, (_, i) => mid + 1 + i),
        array: arr,
        left: mid + 1,
        right,
        codeLine: [7, 8],
      });
      left = mid + 1;
    } else {
      steps.push({
        description: `${arr[mid]} > ${target}, search left half`,
        highlight: Array.from({ length: mid - left }, (_, i) => left + i),
        array: arr,
        left,
        right: mid - 1,
        codeLine: [9, 10],
      });
      right = mid - 1;
    }
  }

  return steps;
};

const generateBFSSteps = (): AlgorithmStep[] => {
  const steps: AlgorithmStep[] = [];
  
  steps.push({
    description: "Graph with 7 nodes - BFS explores level by level using a queue",
    highlight: [],
    visited: [],
    queue: [],
    codeLine: [0, 1, 2],
  });

  steps.push({
    description: "Start BFS from node 0, add to queue",
    highlight: [0],
    visited: [],
    queue: [0],
    current: 0,
    codeLine: [2],
  });

  steps.push({
    description: "Visit node 0, add neighbors (1, 3) to queue",
    highlight: [0],
    visited: [0],
    queue: [1, 3],
    current: 0,
    codeLine: [4, 6, 7, 8, 9],
  });

  steps.push({
    description: "Dequeue node 1, add unvisited neighbors (2, 4) to queue",
    highlight: [1],
    visited: [0, 1],
    queue: [3, 2, 4],
    current: 1,
    codeLine: [4, 6, 7, 8, 9],
  });

  steps.push({
    description: "Dequeue node 3, neighbor 4 already in queue",
    highlight: [3],
    visited: [0, 1, 3],
    queue: [2, 4],
    current: 3,
    codeLine: [4, 5, 6],
  });

  steps.push({
    description: "Dequeue node 2, no new neighbors",
    highlight: [2],
    visited: [0, 1, 3, 2],
    queue: [4],
    current: 2,
    codeLine: [4, 6],
  });

  steps.push({
    description: "Dequeue node 4, add unvisited neighbors (5, 6) to queue",
    highlight: [4],
    visited: [0, 1, 3, 2, 4],
    queue: [5, 6],
    current: 4,
    codeLine: [7, 8, 9],
  });

  steps.push({
    description: "Dequeue node 5, no new neighbors",
    highlight: [5],
    visited: [0, 1, 3, 2, 4, 5],
    queue: [6],
    current: 5,
    codeLine: [4, 6],
  });

  steps.push({
    description: "Dequeue node 6, no new neighbors",
    highlight: [6],
    visited: [0, 1, 3, 2, 4, 5, 6],
    queue: [],
    current: 6,
    codeLine: [4, 6],
  });

  steps.push({
    description: "BFS complete! Order: 0 → 1 → 3 → 2 → 4 → 5 → 6",
    highlight: [],
    visited: [0, 1, 3, 2, 4, 5, 6],
    queue: [],
    codeLine: [13],
  });

  return steps;
};

const generateDFSSteps = (): AlgorithmStep[] => {
  const steps: AlgorithmStep[] = [];
  
  steps.push({
    description: "Graph with 7 nodes - DFS explores as deep as possible using a stack",
    highlight: [],
    visited: [],
    stack: [],
    codeLine: [0, 1, 2],
  });

  steps.push({
    description: "Start DFS from node 0, push to stack",
    highlight: [0],
    visited: [],
    stack: [0],
    current: 0,
    codeLine: [2],
  });

  steps.push({
    description: "Visit node 0, push unvisited neighbor 1 to stack",
    highlight: [0],
    visited: [0],
    stack: [1],
    current: 0,
    codeLine: [4, 6, 7, 8, 9],
  });

  steps.push({
    description: "Pop node 1, push unvisited neighbor 2 to stack",
    highlight: [1],
    visited: [0, 1],
    stack: [2, 4],
    current: 1,
    codeLine: [4, 6, 7, 8, 9],
  });

  steps.push({
    description: "Pop node 2, no unvisited neighbors",
    highlight: [2],
    visited: [0, 1, 2],
    stack: [4],
    current: 2,
    codeLine: [4, 5, 6],
  });

  steps.push({
    description: "Backtrack, pop node 4, push unvisited neighbors",
    highlight: [4],
    visited: [0, 1, 2, 4],
    stack: [5, 6, 3],
    current: 4,
    codeLine: [7, 8, 9],
  });

  steps.push({
    description: "Pop node 3, no new unvisited neighbors",
    highlight: [3],
    visited: [0, 1, 2, 4, 3],
    stack: [5, 6],
    current: 3,
    codeLine: [4, 5, 6],
  });

  steps.push({
    description: "Pop node 6, no unvisited neighbors",
    highlight: [6],
    visited: [0, 1, 2, 4, 3, 6],
    stack: [5],
    current: 6,
    codeLine: [4, 5, 6],
  });

  steps.push({
    description: "Pop node 5, no unvisited neighbors",
    highlight: [5],
    visited: [0, 1, 2, 4, 3, 6, 5],
    stack: [],
    current: 5,
    codeLine: [4, 5, 6],
  });

  steps.push({
    description: "DFS complete! Order: 0 → 1 → 2 → 4 → 3 → 6 → 5",
    highlight: [],
    visited: [0, 1, 2, 4, 3, 6, 5],
    stack: [],
    codeLine: [13],
  });

  return steps;
};

const GraphVisualization = ({ step }: { step: AlgorithmStep }) => {
  const nodes = [
    { id: 0, x: 50, y: 30 },
    { id: 1, x: 150, y: 30 },
    { id: 2, x: 250, y: 30 },
    { id: 3, x: 50, y: 110 },
    { id: 4, x: 150, y: 110 },
    { id: 5, x: 250, y: 110 },
    { id: 6, x: 150, y: 190 },
  ];

  const edges = [
    [0, 1], [1, 2], [0, 3], [1, 4], [3, 4], [4, 5], [4, 6]
  ];

  return (
    <div className="flex flex-col items-center gap-4">
      <svg width="320" height="220" className="mx-auto">
        {edges.map(([from, to], i) => (
          <line
            key={i}
            x1={nodes[from].x + 20}
            y1={nodes[from].y + 20}
            x2={nodes[to].x + 20}
            y2={nodes[to].y + 20}
            stroke="hsl(var(--muted-foreground))"
            strokeWidth="2"
            opacity="0.5"
          />
        ))}
        
        {nodes.map((node) => {
          const isVisited = step.visited?.includes(node.id);
          const isCurrent = step.current === node.id;
          const isHighlighted = step.highlight.includes(node.id);
          
          return (
            <g key={node.id}>
              <motion.circle
                cx={node.x + 20}
                cy={node.y + 20}
                r={20}
                fill={
                  isCurrent
                    ? "hsl(var(--primary))"
                    : isVisited
                    ? "hsl(var(--accent))"
                    : isHighlighted
                    ? "hsl(var(--primary) / 0.5)"
                    : "hsl(var(--secondary))"
                }
                stroke={isCurrent ? "hsl(var(--primary))" : "hsl(var(--border))"}
                strokeWidth="2"
                animate={{ scale: isCurrent ? 1.1 : 1 }}
              />
              <text
                x={node.x + 20}
                y={node.y + 25}
                textAnchor="middle"
                fill="hsl(var(--foreground))"
                fontSize="14"
                fontWeight="bold"
              >
                {node.id}
              </text>
            </g>
          );
        })}
      </svg>
      
      <div className="flex gap-4 text-sm">
        {step.queue !== undefined && (
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground">Queue:</span>
            <div className="flex gap-1">
              {step.queue.length > 0 ? step.queue.map((n, i) => (
                <span key={i} className="px-2 py-1 bg-primary/20 rounded text-primary">
                  {n}
                </span>
              )) : <span className="text-muted-foreground">empty</span>}
            </div>
          </div>
        )}
        {step.stack !== undefined && (
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground">Stack:</span>
            <div className="flex gap-1">
              {step.stack.length > 0 ? step.stack.map((n, i) => (
                <span key={i} className="px-2 py-1 bg-accent/20 rounded text-accent">
                  {n}
                </span>
              )) : <span className="text-muted-foreground">empty</span>}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const CodePanel = ({ 
  algorithm, 
  highlightedLines 
}: { 
  algorithm: string; 
  highlightedLines: number[];
}) => {
  const code = algorithmCode[algorithm] || [];
  
  return (
    <div className="bg-card/80 border border-border rounded-lg overflow-hidden">
      <div className="flex items-center gap-2 px-4 py-2 bg-secondary/50 border-b border-border">
        <Code className="w-4 h-4 text-primary" />
        <span className="text-sm font-medium">Pseudocode</span>
      </div>
      <div className="p-4 overflow-x-auto max-h-[300px] overflow-y-auto">
        <pre className="text-sm font-mono">
          {code.map((line, i) => {
            const isHighlighted = highlightedLines.includes(i);
            return (
              <motion.div
                key={i}
                className={`px-2 py-0.5 rounded transition-all ${
                  isHighlighted 
                    ? "bg-primary/20 border-l-2 border-primary text-foreground" 
                    : "text-muted-foreground"
                }`}
                animate={{
                  backgroundColor: isHighlighted ? "hsl(var(--primary) / 0.2)" : "transparent",
                }}
              >
                <span className="inline-block w-6 text-right mr-3 text-muted-foreground/50 select-none">
                  {i + 1}
                </span>
                <span className={isHighlighted ? "text-foreground" : ""}>
                  {line || " "}
                </span>
              </motion.div>
            );
          })}
        </pre>
      </div>
    </div>
  );
};

export const Visualizer = () => {
  const [selectedAlgo, setSelectedAlgo] = useState("Bubble Sort");
  const [step, setStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1); // 0.5x to 3x
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const steps = useMemo(() => {
    switch (selectedAlgo) {
      case "Bubble Sort":
        return generateBubbleSortSteps();
      case "Quick Sort":
        return generateQuickSortSteps();
      case "Merge Sort":
        return generateMergeSortSteps();
      case "Binary Search":
        return generateBinarySearchSteps();
      case "BFS":
        return generateBFSSteps();
      case "DFS":
        return generateDFSSteps();
      default:
        return generateBubbleSortSteps();
    }
  }, [selectedAlgo]);

  const currentStep = steps[step] || steps[0];
  const isGraphAlgo = selectedAlgo === "BFS" || selectedAlgo === "DFS";

  // Auto-play logic
  useEffect(() => {
    if (isPlaying) {
      const delay = 1000 / speed;
      intervalRef.current = setInterval(() => {
        setStep(prev => {
          if (prev >= steps.length - 1) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, delay);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPlaying, speed, steps.length]);

  const handleReset = () => {
    setStep(0);
    setIsPlaying(false);
  };

  const handleAlgoChange = (algo: string) => {
    setSelectedAlgo(algo);
    setStep(0);
    setIsPlaying(false);
  };

  return (
    <section id="visualizer" className="py-20 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Interactive <span className="gradient-text-accent">Visualizer</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Watch algorithms come to life with step-by-step visual explanations
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Algorithm Selection */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-card p-4 rounded-xl"
          >
            <h3 className="text-lg font-semibold mb-4">Select Algorithm</h3>
            <div className="space-y-2">
              {algorithms.map((algo) => (
                <button
                  key={algo}
                  onClick={() => handleAlgoChange(algo)}
                  className={`w-full text-left px-3 py-2 rounded-lg transition-all text-sm ${
                    selectedAlgo === algo
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary/50 hover:bg-secondary text-foreground"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{algo}</span>
                    {selectedAlgo === algo && <ChevronRight className="w-4 h-4" />}
                  </div>
                </button>
              ))}
            </div>
          </motion.div>

          {/* Visualization Area */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2 glass-card p-6 rounded-xl"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">{selectedAlgo}</h3>
              <div className="flex items-center gap-4">
                {/* Speed Control */}
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">Speed:</span>
                  <Slider
                    value={[speed]}
                    onValueChange={([v]) => setSpeed(v)}
                    min={0.5}
                    max={3}
                    step={0.5}
                    className="w-20"
                  />
                  <span className="text-xs font-mono w-8">{speed}x</span>
                </div>
                <div className="flex items-center gap-1">
                  <Button variant="ghost" size="icon" onClick={handleReset}>
                    <RotateCcw className="w-4 h-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => setIsPlaying(!isPlaying)}
                  >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => setStep(Math.min(steps.length - 1, step + 1))}
                    disabled={isPlaying}
                  >
                    <SkipForward className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Visualization */}
            <div className="min-h-[200px] flex items-center justify-center mb-6">
              {isGraphAlgo ? (
                <GraphVisualization step={currentStep} />
              ) : (
                <div className="flex justify-center gap-2 flex-wrap">
                  {(currentStep.array || [64, 34, 25, 12, 22, 11, 90]).map((val, i) => {
                    const isHighlighted = currentStep.highlight.includes(i);
                    const isSorted = currentStep.sorted?.includes(i);
                    const isPivot = currentStep.pivot === i;
                    const isFound = currentStep.found && currentStep.mid === i;
                    const isInRange = currentStep.left !== undefined && 
                      currentStep.right !== undefined && 
                      i >= currentStep.left && 
                      i <= currentStep.right;
                    
                    return (
                      <motion.div
                        key={i}
                        className={`w-10 h-10 flex items-center justify-center rounded-lg font-mono font-bold text-sm border-2 transition-all ${
                          isFound
                            ? "bg-green-500 border-green-400 text-white"
                            : isPivot
                            ? "bg-accent border-accent text-accent-foreground"
                            : isSorted
                            ? "bg-green-500/20 border-green-500 text-green-400"
                            : isHighlighted
                            ? "bg-primary border-primary text-primary-foreground glow-primary"
                            : isInRange
                            ? "bg-primary/20 border-primary/50 text-foreground"
                            : "bg-secondary/50 border-border text-muted-foreground"
                        }`}
                        animate={{
                          scale: isHighlighted || isPivot || isFound ? 1.1 : 1,
                          y: isHighlighted ? -5 : 0,
                        }}
                      >
                        {val}
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Step description */}
            <div className="bg-secondary/50 rounded-lg p-3 mb-4">
              <p className="text-xs font-mono text-center">
                Step {step + 1}/{steps.length}: {currentStep.description}
              </p>
            </div>

            {/* Progress */}
            <div className="flex items-center gap-4">
              <div className="flex-1 h-2 bg-secondary rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-primary to-accent"
                  animate={{ width: `${((step + 1) / steps.length) * 100}%` }}
                />
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setStep(Math.max(0, step - 1))}
                  disabled={step === 0}
                >
                  Prev
                </Button>
                <Button
                  variant="hero"
                  size="sm"
                  onClick={() => setStep(Math.min(steps.length - 1, step + 1))}
                  disabled={step === steps.length - 1}
                >
                  Next
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Code Panel */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <CodePanel 
              algorithm={selectedAlgo} 
              highlightedLines={currentStep.codeLine || []} 
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
