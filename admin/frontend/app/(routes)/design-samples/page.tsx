'use client';

import { useState } from 'react';

export default function DesignSamplesPage() {
  const [activeTab, setActiveTab] = useState<'modern' | 'tech' | 'creative'>(
    'modern',
  );

  const handleTabChange = (tabId: 'modern' | 'tech' | 'creative') => {
    console.log('タブ切り替え:', tabId);
    setActiveTab(tabId);
  };

  console.log('現在のアクティブタブ:', activeTab);

  return (
    <div
      className="min-h-screen bg-gray-50 dark:bg-gray-900"
      style={{ pointerEvents: 'auto' }}
    >
      {/* ヘッダー */}
      <header className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            ポートフォリオデザインサンプル
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            3つのデザインスタイルから選んでください
          </p>
          <p className="text-sm text-red-500 mt-2">現在のタブ: {activeTab}</p>

          {/* テストボタン */}
          <div className="mt-4 space-x-4">
            <button
              onClick={() => console.log('テストボタン1クリック')}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              テストボタン1
            </button>
            <button
              onClick={() => {
                console.log('テストボタン2クリック');
                setActiveTab('tech');
              }}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              テストボタン2 (techに変更)
            </button>
            <button
              onClick={() => {
                console.log('テストボタン3クリック');
                setActiveTab('creative');
              }}
              className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
            >
              テストボタン3 (creativeに変更)
            </button>
          </div>
        </div>
      </header>

      {/* タブナビゲーション */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4">
          <nav className="flex space-x-8">
            {[
              { id: 'modern', name: 'モダン・ミニマル', color: 'blue' },
              { id: 'tech', name: 'テック系', color: 'green' },
              { id: 'creative', name: 'クリエイティブ系', color: 'purple' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  console.log('ボタンクリック:', tab.id);
                  handleTabChange(tab.id as any);
                }}
                onMouseEnter={() => console.log('マウスホバー:', tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors cursor-pointer ${
                  activeTab === tab.id
                    ? tab.id === 'modern'
                      ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                      : tab.id === 'tech'
                      ? 'border-green-500 text-green-600 dark:text-green-400'
                      : 'border-purple-500 text-purple-600 dark:text-purple-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                }`}
                style={{ pointerEvents: 'auto' }}
              >
                {tab.name} (ID: {tab.id})
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* コンテンツエリア */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-4 p-4 bg-yellow-100 dark:bg-yellow-900 rounded">
          <p className="text-sm">デバッグ情報: アクティブタブ = {activeTab}</p>
        </div>
        {activeTab === 'modern' && <ModernMinimalDesign />}
        {activeTab === 'tech' && <TechDesign />}
        {activeTab === 'creative' && <CreativeDesign />}
      </main>
    </div>
  );
}

// モダン・ミニマルデザイン
function ModernMinimalDesign() {
  return (
    <div className="space-y-8">
      {/* ヒーローセクション */}
      <section className="text-center py-16 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
        <h2 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          Kodama
        </h2>
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
          Full-Stack Developer & AI Enthusiast
        </p>
        <div className="flex justify-center space-x-4">
          <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            プロジェクトを見る
          </button>
          <button className="px-6 py-3 border border-gray-300 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            お問い合わせ
          </button>
        </div>
      </section>

      {/* プロジェクトグリッド */}
      <section>
        <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
          プロジェクト
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              title: 'Outpilot',
              desc: 'AI学習支援ツール',
              tech: 'Next.js, NestJS, OpenAI',
            },
            {
              title: 'Portfolio',
              desc: 'ポートフォリオサイト',
              tech: 'React, TypeScript',
            },
            {
              title: 'ChatApp',
              desc: 'リアルタイムチャット',
              tech: 'Socket.io, Express',
            },
          ].map((project, i) => (
            <div
              key={i}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow"
            >
              <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                {project.title}
              </h4>
              <p className="text-gray-600 dark:text-gray-400 mb-3">
                {project.desc}
              </p>
              <p className="text-sm text-blue-600 dark:text-blue-400">
                {project.tech}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* スキルセクション */}
      <section>
        <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
          スキル
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            'React',
            'TypeScript',
            'Node.js',
            'Python',
            'AWS',
            'Docker',
            'PostgreSQL',
            'AI/ML',
          ].map((skill) => (
            <div
              key={skill}
              className="bg-white dark:bg-gray-800 rounded-lg p-4 text-center shadow-sm"
            >
              <span className="text-gray-900 dark:text-gray-100 font-medium">
                {skill}
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

// テック系デザイン
function TechDesign() {
  return (
    <div className="space-y-8">
      {/* ヒーローセクション */}
      <section className="bg-gray-900 text-green-400 p-8 rounded-lg font-mono">
        <div className="mb-4">
          <span className="text-green-500">$</span> whoami
        </div>
        <div className="text-2xl font-bold mb-4">&gt; Kodama.exe</div>
        <div className="mb-4">
          <span className="text-green-500">$</span> cat profile.txt
        </div>
        <div className="bg-black p-4 rounded text-sm">
          <div>Name: Kodama</div>
          <div>Role: Full-Stack Developer</div>
          <div>Specialty: AI/ML, Web Development</div>
          <div>Status: Available for projects</div>
        </div>
      </section>

      {/* プロジェクトターミナル */}
      <section>
        <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6 font-mono">
          &gt; ls projects/
        </h3>
        <div className="space-y-4">
          {[
            { name: 'outpilot/', desc: 'AI学習支援ツール', size: '2.3MB' },
            { name: 'portfolio/', desc: 'ポートフォリオサイト', size: '1.8MB' },
            { name: 'chatapp/', desc: 'リアルタイムチャット', size: '1.5MB' },
          ].map((project, i) => (
            <div
              key={i}
              className="bg-black text-green-400 p-4 rounded font-mono"
            >
              <div className="flex justify-between items-center">
                <span className="text-blue-400">{project.name}</span>
                <span className="text-gray-500">{project.size}</span>
              </div>
              <div className="text-sm text-gray-400 mt-1">{project.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* スキルプログレスバー */}
      <section>
        <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6 font-mono">
          &gt; cat skills.json
        </h3>
        <div className="bg-black p-6 rounded font-mono text-sm">
          {[
            { skill: 'React', level: 90 },
            { skill: 'TypeScript', level: 85 },
            { skill: 'Node.js', level: 80 },
            { skill: 'Python', level: 75 },
          ].map((item) => (
            <div key={item.skill} className="mb-3">
              <div className="flex justify-between mb-1">
                <span className="text-blue-400">{item.skill}:</span>
                <span className="text-green-400">{item.level}%</span>
              </div>
              <div className="bg-gray-800 rounded-full h-2">
                <div
                  className="bg-green-500 h-2 rounded-full transition-all duration-1000"
                  style={{ width: `${item.level}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

// クリエイティブ系デザイン
function CreativeDesign() {
  return (
    <div className="space-y-8">
      {/* ヒーローセクション */}
      <section className="relative overflow-hidden bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500 rounded-lg p-12 text-white">
        <div className="relative z-10 text-center">
          <h2 className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-pink-200">
            Kodama
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Creating Digital Experiences
          </p>
          <div className="flex justify-center space-x-4">
            <button className="px-8 py-4 bg-white text-purple-600 rounded-full font-bold hover:bg-pink-100 transition-all transform hover:scale-105">
              Explore Work
            </button>
            <button className="px-8 py-4 border-2 border-white text-white rounded-full font-bold hover:bg-white hover:text-purple-600 transition-all transform hover:scale-105">
              Get in Touch
            </button>
          </div>
        </div>
        <div className="absolute inset-0 bg-black opacity-20"></div>
      </section>

      {/* プロジェクトカード */}
      <section>
        <h3 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8 text-center">
          Featured Projects
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              title: 'Outpilot',
              desc: 'AI学習支援ツール',
              gradientClass: 'from-blue-500 to-purple-600',
            },
            {
              title: 'Portfolio',
              desc: 'ポートフォリオサイト',
              gradientClass: 'from-green-500 to-blue-600',
            },
            {
              title: 'ChatApp',
              desc: 'リアルタイムチャット',
              gradientClass: 'from-pink-500 to-red-600',
            },
          ].map((project, i) => (
            <div
              key={i}
              className="group relative overflow-hidden rounded-2xl shadow-lg transform hover:scale-105 transition-all duration-300"
            >
              <div
                className={`bg-gradient-to-br p-8 text-white h-64 flex flex-col justify-end ${
                  i === 0
                    ? 'from-blue-500 to-purple-600'
                    : i === 1
                    ? 'from-green-500 to-blue-600'
                    : 'from-pink-500 to-red-600'
                }`}
              >
                <h4 className="text-2xl font-bold mb-2">{project.title}</h4>
                <p className="opacity-90">{project.desc}</p>
              </div>
              <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity"></div>
            </div>
          ))}
        </div>
      </section>

      {/* スキルセクション */}
      <section>
        <h3 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8 text-center">
          Skills & Technologies
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { name: 'React', bgClass: 'bg-blue-500' },
            { name: 'TypeScript', bgClass: 'bg-blue-600' },
            { name: 'Node.js', bgClass: 'bg-green-500' },
            { name: 'Python', bgClass: 'bg-yellow-500' },
            { name: 'AWS', bgClass: 'bg-orange-500' },
            { name: 'Docker', bgClass: 'bg-blue-700' },
            { name: 'PostgreSQL', bgClass: 'bg-blue-800' },
            { name: 'AI/ML', bgClass: 'bg-purple-500' },
          ].map((skill, i) => (
            <div
              key={skill.name}
              className={`text-white p-6 rounded-2xl text-center font-bold transform hover:rotate-3 hover:scale-110 transition-all duration-300 ${
                skill.name === 'React'
                  ? 'bg-blue-500'
                  : skill.name === 'TypeScript'
                  ? 'bg-blue-600'
                  : skill.name === 'Node.js'
                  ? 'bg-green-500'
                  : skill.name === 'Python'
                  ? 'bg-yellow-500'
                  : skill.name === 'AWS'
                  ? 'bg-orange-500'
                  : skill.name === 'Docker'
                  ? 'bg-blue-700'
                  : skill.name === 'PostgreSQL'
                  ? 'bg-blue-800'
                  : 'bg-purple-500'
              }`}
            >
              {skill.name}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
