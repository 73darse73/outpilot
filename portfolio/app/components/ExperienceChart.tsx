'use client';

import { motion } from 'motion/react';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

interface Experience {
  year: string;
  title: string;
  company: string;
  description: string;
  skills: string[];
  duration: number; // 月数
}

interface ExperienceChartProps {
  experiences: Experience[];
}

export default function ExperienceChart({ experiences }: ExperienceChartProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <div ref={ref} className="relative">
      {/* メインタイムライン */}
      <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-green-500" />

      <div className="space-y-8">
        {experiences.map((exp, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            className="relative"
          >
            {/* タイムラインポイント */}
            <div className="absolute left-0 top-6 w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full border-4 border-white dark:border-gray-800 shadow-lg flex items-center justify-center">
              <div className="w-2 h-2 bg-white rounded-full" />
            </div>

            <div className="ml-16">
              {/* 年数とタイトル */}
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    {exp.title}
                  </h3>
                  <p className="text-blue-600 dark:text-blue-400 font-medium">
                    {exp.company}
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-sm text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full">
                    {exp.year}
                  </span>
                  <div className="text-xs text-gray-400 mt-1">
                    {exp.duration}ヶ月
                  </div>
                </div>
              </div>

              {/* 説明 */}
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {exp.description}
              </p>

              {/* スキルタグ */}
              <div className="flex flex-wrap gap-2">
                {exp.skills.map((skill, skillIndex) => (
                  <motion.span
                    key={skillIndex}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{
                      duration: 0.3,
                      delay: index * 0.2 + 0.5 + skillIndex * 0.1,
                    }}
                    className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm rounded-full"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
