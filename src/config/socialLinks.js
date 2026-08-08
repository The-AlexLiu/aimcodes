export const SOCIAL_LINKS = Object.freeze([
  {
    id: 'instagram',
    label: 'Instagram',
    url: 'https://www.instagram.com/aimcodes/',
  },
  {
    id: 'youtube',
    label: 'YouTube',
    url: 'https://www.youtube.com/channel/UCw76cLVNk46p8kzUUIhYNSA',
  },
  {
    id: 'tiktok',
    label: 'TikTok',
    url: 'https://www.tiktok.com/@aimcodes',
  },
  {
    id: 'facebook',
    label: 'Facebook',
    url: 'https://www.facebook.com/profile.php?id=61579049940186',
  },
])

export const SOCIAL_PROFILE_URLS = Object.freeze(SOCIAL_LINKS.map((item) => item.url))
