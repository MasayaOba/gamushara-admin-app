'use client'

import { useState } from 'react'
import PostForm from '@/components/PostForm'
import PostList from '@/components/PostList'
import { PostData } from '@/types'

export default function Home() {
  const [posts, setPosts] = useState<PostData[]>([])
  const [activeTab, setActiveTab] = useState<'create' | 'list'>('create')

  const handlePostSave = (newPost: PostData) => {
    setPosts(prev => [newPost, ...prev])
    setActiveTab('list')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto py-8 px-4">
        <header className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            我無沙羅 SNS投稿管理
          </h1>
          <p className="text-gray-600">
            イベント告知・お礼投稿の文章作成と管理
          </p>
        </header>

        <nav className="flex justify-center mb-8">
          <div className="flex bg-white rounded-lg p-1 shadow-sm">
            <button
              onClick={() => setActiveTab('create')}
              className={`px-6 py-2 rounded-md font-medium transition-colors ${
                activeTab === 'create'
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              新規作成
            </button>
            <button
              onClick={() => setActiveTab('list')}
              className={`px-6 py-2 rounded-md font-medium transition-colors ${
                activeTab === 'list'
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              投稿履歴
            </button>
          </div>
        </nav>

        <main>
          {activeTab === 'create' ? (
            <PostForm onSave={handlePostSave} />
          ) : (
            <PostList posts={posts} />
          )}
        </main>
      </div>
    </div>
  )
}
