export interface LinkItem {
  id: string;
  title: string;
  url: string;
  description?: string;
  icon?: string;
  badge?: string;
  bgColor?: string;
  tag?: string;
}

export interface UserProfile {
  name: string;
  handle: string;
  bio: string;
  avatarUrl?: string;
  links: LinkItem[];
}
