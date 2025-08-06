'use client'

import { useState } from 'react'
import { PostData, PostFormData } from '@/types'

interface PostFormProps {
  onSave: (post: PostData) => void
}

export default function PostForm({ onSave }: PostFormProps) {
  const [formData, setFormData] = useState<PostFormData>({
    eventName: '',
    eventDate: '',
    eventLocation: '',
    eventType: 'announcement',
    organzerMessage: ''
  })
  
  const [generatedTexts, setGeneratedTexts] = useState({
    instagram: '',
    twitter: ''
  })
  
  const [isGenerating, setIsGenerating] = useState(false)

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const generateTexts = async () => {
    if (!formData.eventName || !formData.eventDate || !formData.eventLocation) {
      alert('イベント名、日時、場所を入力してください')
      return
    }

    setIsGenerating(true)
    
    // 仮の文章生成（後で生成AI連携に置き換え）
    const instagramText = generateInstagramText(formData)
    const twitterText = generateTwitterText(instagramText)
    
    setGeneratedTexts({
      instagram: instagramText,
      twitter: twitterText
    })
    
    setIsGenerating(false)
  }

  const generateInstagramText = (data: PostFormData): string => {
    const { eventName, eventDate, eventLocation, eventType, organzerMessage } = data
    
    if (eventType === 'announcement') {
      return `🎌✨ イベント告知 ✨🎌

【${eventName}】

📅 日時：${eventDate}
📍 場所：${eventLocation}

${organzerMessage}

応援合戦の魅力を一緒に伝えませんか？
皆さまのご参加をお待ちしております！

一生懸命はダサくない。
むしろこんなにもかっこいいんだってことを伝えたい。

#青春応援団我無沙羅 #応援合戦 #刈谷 #青春 #一生懸命 #${eventName.replace(/\s/g, '')}`
    } else {
      return `🎌✨ ありがとうございました ✨🎌

【${eventName}】

📅 ${eventDate}
📍 ${eventLocation}

${organzerMessage}

皆さまのおかげで素晴らしいイベントとなりました。
応援合戦の魅力を少しでもお伝えできていれば幸いです。

感動するほどの応援合戦を。
これからも一生懸命を大切に、活動を続けてまいります。

#青春応援団我無沙羅 #応援合戦 #刈谷 #青春 #感謝 #${eventName.replace(/\s/g, '')}`
    }
  }

  const generateTwitterText = (instagramText: string): string => {
    // Instagram文章をX用に簡潔化（文字数制限考慮）
    const lines = instagramText.split('\n').filter(line => line.trim())
    const eventInfo = lines.slice(0, 5).join('\n')
    const hashtags = lines[lines.length - 1]
    
    return `${eventInfo}

${hashtags}`
  }

  const handleSave = () => {
    if (!generatedTexts.instagram || !generatedTexts.twitter) {
      alert('文章を生成してください')
      return
    }

    const newPost: PostData = {
      id: Date.now().toString(),
      title: `${formData.eventName} - ${formData.eventType === 'announcement' ? '告知' : 'お礼'}`,
      eventName: formData.eventName,
      eventDate: formData.eventDate,
      eventLocation: formData.eventLocation,
      eventType: formData.eventType,
      organzerMessage: formData.organzerMessage,
      instagramText: generatedTexts.instagram,
      twitterText: generatedTexts.twitter,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    onSave(newPost)
    
    // フォームリセット
    setFormData({
      eventName: '',
      eventDate: '',
      eventLocation: '',
      eventType: 'announcement',
      organzerMessage: ''
    })
    setGeneratedTexts({ instagram: '', twitter: '' })
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-2xl font-bold mb-6">新規投稿作成</h2>
      
      <div className="space-y-6">
        {/* イベント基本情報 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              イベント名 *
            </label>
            <input
              type="text"
              name="eventName"
              value={formData.eventName}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="例：刈谷市民文化祭"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              投稿タイプ *
            </label>
            <select
              name="eventType"
              value={formData.eventType}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="announcement">イベント告知</option>
              <option value="thanks">お礼・報告</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              日時 *
            </label>
            <input
              type="text"
              name="eventDate"
              value={formData.eventDate}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="例：2024年12月25日（水）14:00〜"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              場所 *
            </label>
            <input
              type="text"
              name="eventLocation"
              value={formData.eventLocation}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="例：刈谷市総合文化センター"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            運営者からのメッセージ
          </label>
          <textarea
            name="organzerMessage"
            value={formData.organzerMessage}
            onChange={handleInputChange}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="イベントへの想いや参加者へのメッセージを入力してください"
          />
        </div>

        {/* 文章生成ボタン */}
        <div className="text-center">
          <button
            onClick={generateTexts}
            disabled={isGenerating}
            className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 text-white font-medium py-3 px-8 rounded-md transition-colors"
          >
            {isGenerating ? '生成中...' : 'SNS投稿文を生成'}
          </button>
        </div>

        {/* 生成された文章プレビュー */}
        {generatedTexts.instagram && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-3">Instagram用文章</h3>
              <div className="bg-gray-50 p-4 rounded-md">
                <pre className="whitespace-pre-wrap text-sm">
                  {generatedTexts.instagram}
                </pre>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-3">X (Twitter)用文章</h3>
              <div className="bg-gray-50 p-4 rounded-md">
                <pre className="whitespace-pre-wrap text-sm">
                  {generatedTexts.twitter}
                </pre>
              </div>
            </div>

            <div className="text-center">
              <button
                onClick={handleSave}
                className="bg-green-500 hover:bg-green-600 text-white font-medium py-3 px-8 rounded-md transition-colors"
              >
                保存する
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}