export interface PostData {
  id: string
  title: string
  eventName: string
  eventDate: string
  eventLocation: string
  eventType: 'announcement' | 'thanks'
  organzerMessage: string
  instagramText: string
  twitterText: string
  createdAt: string
  updatedAt: string
}

export interface PostFormData {
  eventName: string
  eventDate: string
  eventLocation: string
  eventType: 'announcement' | 'thanks'
  organzerMessage: string
}