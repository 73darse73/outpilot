'use client';

import { motion } from 'motion/react';

interface Skill {
  name: string;
  level: number;
  color: string;
  icon: string;
}

const skills: Skill[] = [
  { name: 'React', level: 90, color: '#61DAFB', icon: '⚛️' },
  { name: 'TypeScript', level: 85, color: '#3178C6', icon: '📘' },
  { name: 'Next.js', level: 80, color: '#000000', icon: '⚡' },
  { name: 'Node.js', level: 75, color: '#339933', icon: '🟢' },
  { name: 'Python', level: 70, color: '#3776AB', icon: '🐍' },
  { name: 'AWS', level: 65, color: '#FF9900', icon: '☁️' },
];

export default function SkillsSection() {
  return (
    <section className="py-20 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            技術スタック
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            最新の技術を駆使して、高品質なWebアプリケーションを開発しています
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center group"
            >
              <div className="relative mb-4">
                <div className="w-24 h-24 mx-auto relative">
                  {/* 円グラフの背景 */}
                  <svg
                    className="w-24 h-24 transform -rotate-90"
                    viewBox="0 0 100 100"
                  >
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      stroke="currentColor"
                      strokeWidth="8"
                      fill="none"
                      className="text-gray-200 dark:text-gray-700"
                    />
                    <motion.circle
                      cx="50"
                      cy="50"
                      r="40"
                      stroke={skill.color}
                      strokeWidth="8"
                      fill="none"
                      strokeLinecap="round"
                      initial={{ strokeDasharray: 0, strokeDashoffset: 0 }}
                      whileInView={{
                        strokeDasharray: `${2 * Math.PI * 40}`,
                        strokeDashoffset: `${
                          2 * Math.PI * 40 * (1 - skill.level / 100)
                        }`,
                      }}
                      transition={{ duration: 1.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                    />
                  </svg>

                  {/* アイコンとパーセンテージ */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-2xl mb-1">{skill.icon}</div>
                      <div className="text-sm font-bold text-gray-900 dark:text-white">
                        {skill.level}%
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {skill.name}
              </h3>
            </motion.div>
          ))}
        </div>

        {/* 追加スキル */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
            その他の技術
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              'Tailwind CSS',
              'Prisma',
              'PostgreSQL',
              'Docker',
              'Git',
              'GitHub Actions',
              'Figma',
              'Vercel',
            ].map((tech, index) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium hover:bg-blue-100 dark:hover:bg-blue-900 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
