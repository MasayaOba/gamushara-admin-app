'use client'

import { PostData } from '@/types'

interface PostListProps {
  posts: PostData[]
}

export default function PostList({ posts }: PostListProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      alert('クリップボードにコピーしました')
    } catch (err) {
      console.error('コピーに失敗しました:', err)
    }
  }

  if (posts.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-8 text-center">
        <p className="text-gray-500">まだ投稿がありません</p>
        <p className="text-sm text-gray-400 mt-2">「新規作成」から投稿を作成してみましょう</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">投稿履歴</h2>
      
      <div className="space-y-4">
        {posts.map((post) => (
          <div key={post.id} className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-medium">{post.title}</h3>
                <div className="text-sm text-gray-500 mt-1">
                  <span>{post.eventDate}</span>
                  <span className="mx-2">•</span>
                  <span>{post.eventLocation}</span>
                </div>
                <div className="text-xs text-gray-400 mt-1">
                  作成日時: {formatDate(post.createdAt)}
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  post.eventType === 'announcement' 
                    ? 'bg-blue-100 text-blue-800' 
                    : 'bg-green-100 text-green-800'
                }`}>
                  {post.eventType === 'announcement' ? '告知' : 'お礼'}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-medium">Instagram用文章</h4>
                  <button
                    onClick={() => copyToClipboard(post.instagramText)}
                    className="text-xs bg-gray-100 hover:bg-gray-200 px-2 py-1 rounded"
                  >
                    コピー
                  </button>
                </div>
                <div className="bg-gray-50 p-3 rounded text-sm max-h-40 overflow-y-auto">
                  <pre className="whitespace-pre-wrap">{post.instagramText}</pre>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-medium">X (Twitter)用文章</h4>
                  <button
                    onClick={() => copyToClipboard(post.twitterText)}
                    className="text-xs bg-gray-100 hover:bg-gray-200 px-2 py-1 rounded"
                  >
                    コピー
                  </button>
                </div>
                <div className="bg-gray-50 p-3 rounded text-sm max-h-40 overflow-y-auto">
                  <pre className="whitespace-pre-wrap">{post.twitterText}</pre>
                </div>
              </div>
            </div>

            {post.organzerMessage && (
              <div className="mt-4 pt-4 border-t border-gray-200">
                <h4 className="font-medium mb-2">運営者メッセージ</h4>
                <p className="text-sm text-gray-600">{post.organzerMessage}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}