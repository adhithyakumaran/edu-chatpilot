'use client';

import { useState } from 'react';
import {
    BookOpen, User, MessageSquare, ChevronDown, ChevronRight,
    Clock, Award, PlayCircle, CheckCircle2, Circle
} from 'lucide-react';

export default function CourseDetailPage({ params }: { params: { id: string } }) {
    const { id } = params;

    // Mock data - replace with API call
    const courseData = {
        id: id,
        title: 'Placement Ready Program (Jan Batch)',
        instructor: {
            name: 'Edu ChatPilot Team',
            avatar: 'https://ui-avatars.com/api/?name=ChatPilot+Team&background=8b5cf6&color=fff',
            bio: 'Expert team of industry veterans and placement mentors dedicated to getting you job-ready.',
            expertise: ['100+ LeetCode', 'DSA', 'Aptitude', 'Interview Prep']
        },
        description: `This is not a generic coding course. This is a 24-day intensive outcome-focused bootcamp designed with one goal: To get you Placed.
        
        We have stripped away all the unnecessary theory and focused 100% on what interviewers actually ask. You will solve the exact LeetCode problems asked by top tech companies, build projects that stand out, and master the art of cracking the HR round.
        
        Our Promise: If you commit 100% to these 24 days, you will walk out with a strong resume, confidence in DSA, and the ability to crack technical interviews.`,
        syllabus: [
            {
                id: 1,
                title: 'Arrays & Strings (20 Problems)',
                duration: 'Days 1-3',
                lessons: [
                    'Two Sum', 'Best Time to Buy and Sell Stock', 'Contains Duplicate', 'Product of Array Except Self',
                    'Maximum Subarray', 'Maximum Product Subarray', 'Find Minimum in Rotated Sorted Array',
                    'Search in Rotated Sorted Array', '3Sum', 'Container With Most Water',
                    'Valid Anagram', 'Group Anagrams', 'Longest Substring Without Repeating Characters',
                    'Longest Repeating Character Replacement', 'Minimum Window Substring', 'Valid Palindrome',
                    'Palindromic Substrings', 'Longest Palindromic Substring', 'Encode and Decode Strings', 'String to Integer (atoi)'
                ],
                completed: true
            },
            {
                id: 2,
                title: 'Hashing & Two Pointers (15 Problems)',
                duration: 'Days 4-6',
                lessons: [
                    'Valid Parentheses', 'Remove Nth Node From End of List', 'Linked List Cycle', 'Reorder List',
                    'Merge Two Sorted Lists', 'Intersection of Two Arrays II', 'Subarray Sum Equals K',
                    'Top K Frequent Elements', 'Longest Consecutive Sequence', 'Minimum Size Subarray Sum',
                    'Trapping Rain Water', 'Minimum Remove to Make Valid Parentheses', 'Roman to Integer',
                    'Integer to Roman', 'Find All Anagrams in a String'
                ],
                completed: false
            },
            {
                id: 3,
                title: 'Stack & Queue (10 Problems)',
                duration: 'Days 7-8',
                lessons: [
                    'Min Stack', 'Daily Temperatures', 'Evaluate Reverse Polish Notation', 'Generate Parentheses',
                    'Asteroid Collision', 'Sliding Window Maximum', 'Implement Queue using Stacks',
                    'Simplify Path', 'Decode String', 'Next Greater Element'
                ],
                completed: false
            },
            {
                id: 4,
                title: 'Binary Search (10 Problems)',
                duration: 'Days 9-10',
                lessons: [
                    'Binary Search', 'Search a 2D Matrix', 'Koko Eating Bananas', 'Find Peak Element',
                    'Find First and Last Position', 'Search Insert Position', 'Capacity to Ship Packages',
                    'Median of Two Sorted Arrays', 'Split Array Largest Sum', 'Find Minimum in Rotated Sorted Array'
                ],
                completed: false
            },
            {
                id: 5,
                title: 'Trees & BST (15 Problems)',
                duration: 'Days 11-14',
                lessons: [
                    'Invert Binary Tree', 'Maximum Depth of Binary Tree', 'Same Tree', 'Subtree of Another Tree',
                    'Lowest Common Ancestor', 'Binary Tree Level Order Traversal', 'Validate Binary Search Tree',
                    'Kth Smallest in BST', 'Serialize and Deserialize Binary Tree', 'Diameter of Binary Tree',
                    'Balanced Binary Tree', 'Right Side View', 'Construct Binary Tree from Preorder & Inorder',
                    'Path Sum', 'Count Good Nodes in Binary Tree'
                ],
                completed: false
            },
            {
                id: 6,
                title: 'Graphs (10 Problems)',
                duration: 'Days 15-17',
                lessons: [
                    'Number of Islands', 'Clone Graph', 'Course Schedule', 'Pacific Atlantic Water Flow',
                    'Rotting Oranges', 'Walls and Gates', 'Surrounded Regions', 'Graph Valid Tree',
                    'Number of Connected Components', 'Reconstruct Itinerary'
                ],
                completed: false
            },
            {
                id: 7,
                title: 'Dynamic Programming (15 Problems)',
                duration: 'Days 18-21',
                lessons: [
                    'Climbing Stairs', 'House Robber', 'House Robber II', 'Longest Increasing Subsequence',
                    'Coin Change', 'Combination Sum', 'Partition Equal Subset Sum', 'Word Break',
                    'Longest Common Subsequence', 'Unique Paths', 'Edit Distance', 'Decode Ways',
                    'Maximum Product Subarray', 'Target Sum', 'Palindrome Partitioning'
                ],
                completed: false
            },
            {
                id: 8,
                title: 'Greedy + Backtracking (5 Problems)',
                duration: 'Days 22-23',
                lessons: [
                    'Jump Game', 'Merge Intervals', 'Insert Interval', 'Subsets', 'Permutations'
                ],
                completed: false
            },
            {
                id: 9,
                title: 'Final Polish (Interview Day)',
                duration: 'Day 24',
                lessons: [
                    'Mock Interview 1 (System Design)', 'Mock Interview 2 (Coding)', 'HR Round Prep', 'Final Resume Review'
                ],
                completed: false
            }
        ],
        progress: 5
    };

    const [expandedModule, setExpandedModule] = useState<number | null>(1);
    const [mentorMessages] = useState<{ id: number; from: string; message: string; timestamp: string; type: 'meeting' | 'update' | 'resource' }[]>([]);

    return (
        <div className="flex h-full w-full bg-gray-50">
            {/* Left Sidebar - Syllabus */}
            <aside className="w-80 bg-white border-r border-gray-200 overflow-y-auto shrink-0">
                <div className="p-6 border-b border-gray-200 bg-gradient-to-br from-brand-primary to-violet-600 text-white">
                    <h2 className="text-lg font-bold mb-2">Course Content</h2>
                    <div className="flex items-center gap-2 text-sm opacity-90">
                        <Clock className="w-4 h-4" />
                        <span>24 Days • 5 Modules</span>
                    </div>
                    <div className="mt-3 bg-white/20 rounded-full h-2">
                        <div className="bg-white h-full rounded-full" style={{ width: `${courseData.progress}%` }}></div>
                    </div>
                    <p className="text-xs mt-1 opacity-80">{courseData.progress}% Complete</p>
                </div>

                {/* Syllabus Modules */}
                <div className="p-4 space-y-2">
                    {courseData.syllabus.map((module) => (
                        <div key={module.id} className="border border-gray-200 rounded-lg overflow-hidden">
                            <button
                                onClick={() => setExpandedModule(expandedModule === module.id ? null : module.id)}
                                className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                            >
                                <div className="flex items-center gap-3">
                                    {module.completed ? (
                                        <CheckCircle2 className="w-5 h-5 text-green-500" />
                                    ) : (
                                        <Circle className="w-5 h-5 text-gray-300" />
                                    )}
                                    <div className="text-left">
                                        <h3 className="font-semibold text-sm text-gray-900">{module.title}</h3>
                                        <p className="text-xs text-gray-500">{module.duration}</p>
                                    </div>
                                </div>
                                {expandedModule === module.id ? (
                                    <ChevronDown className="w-4 h-4 text-gray-400" />
                                ) : (
                                    <ChevronRight className="w-4 h-4 text-gray-400" />
                                )}
                            </button>

                            {/* Lessons */}
                            {expandedModule === module.id && (
                                <div className="px-4 pb-4 space-y-1 bg-gray-50">
                                    {module.lessons.map((lesson, idx) => (
                                        <button
                                            key={idx}
                                            className="w-full text-left p-3 rounded-lg hover:bg-white border border-transparent hover:border-gray-200 transition-all flex items-center gap-2 text-sm"
                                        >
                                            <PlayCircle className="w-4 h-4 text-brand-primary shrink-0" />
                                            <span className="text-gray-700">{lesson}</span>
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto">
                <div className="max-w-5xl mx-auto p-8 space-y-8">
                    {/* Course Header */}
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">{courseData.title}</h1>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                            <div className="flex items-center gap-2">
                                <Award className="w-4 h-4 text-yellow-500" />
                                <span>Certificate upon completion</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4" />
                                <span>24 Days (Daily Live)</span>
                            </div>
                        </div>
                    </div>

                    {/* Instructor Section */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <User className="w-5 h-5 text-brand-primary" />
                            Your Instructor
                        </h2>
                        <div className="flex items-start gap-4">
                            <img
                                src={courseData.instructor.avatar}
                                alt={courseData.instructor.name}
                                className="w-20 h-20 rounded-full"
                            />
                            <div className="flex-1">
                                <h3 className="font-bold text-lg text-gray-900">{courseData.instructor.name}</h3>
                                <p className="text-gray-600 text-sm mb-3">{courseData.instructor.bio}</p>
                                <div className="flex flex-wrap gap-2">
                                    {courseData.instructor.expertise.map((skill) => (
                                        <span key={skill} className="px-3 py-1 bg-violet-50 text-violet-600 rounded-full text-xs font-medium">
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Mentor Inbox - Read Only for Students */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <MessageSquare className="w-5 h-5 text-brand-primary" />
                            Mentor Updates & Meeting Links
                        </h2>

                        <div className="space-y-3 max-h-96 overflow-y-auto">
                            {mentorMessages.length === 0 ? (
                                <div className="text-center py-8 text-gray-500">
                                    <Clock className="w-12 h-12 mx-auto mb-3 text-brand-primary opacity-50" />
                                    <p className="font-semibold text-gray-900 mb-1">Course starts on Jan 05</p>
                                    <p className="text-sm">Messages and updates from your mentor will appear here once the batch begins.</p>
                                </div>
                            ) : (
                                mentorMessages.map((msg) => (
                                    <div key={msg.id} className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                                        <div className="flex items-start justify-between mb-2">
                                            <span className="font-semibold text-sm text-gray-900">{msg.from}</span>
                                            <span className="text-xs text-gray-500">{msg.timestamp}</span>
                                        </div>
                                        <p className="text-sm text-gray-700 whitespace-pre-line">{msg.message}</p>
                                        {msg.type === 'meeting' && (
                                            <div className="mt-2 inline-flex px-2 py-1 bg-green-100 text-green-700 rounded-md text-xs font-medium">
                                                📅 View Schedule
                                            </div>
                                        )}
                                    </div>
                                ))
                            )}
                        </div>

                        <div className="mt-4 p-3 bg-blue-50 border border-blue-100 rounded-xl">
                            <p className="text-xs text-blue-700">
                                💡 Your mentor will post important updates, meeting links, and assignment instructions here.
                            </p>
                        </div>
                    </div>

                    {/* Course Description */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <BookOpen className="w-5 h-5 text-brand-primary" />
                            About This Course
                        </h2>
                        <div className="prose prose-sm max-w-none text-gray-700 leading-relaxed whitespace-pre-line">
                            {courseData.description}
                        </div>

                        <div className="mt-6 pt-6 border-t border-gray-200">
                            <h3 className="font-bold text-gray-900 mb-3">What You'll Learn:</h3>
                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {['Solve 100+ Top LeetCode Problems', 'Master Aptitude & Reasoning', 'Earn Industry Recognized Certifications', 'Build Resume-Worthy Projects', 'Ace Technical & HR Interviews', 'Get complete Placement Guidance'].map((item) => (
                                    <li key={item} className="flex items-start gap-2 text-sm text-gray-700">
                                        <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
