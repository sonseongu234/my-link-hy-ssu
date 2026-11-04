export interface LinkItem {
  id: string;
  title: string;
  url: string;
  description?: string;
  icon?: string;
  category?: string;
}

export interface UserProfile {
  name: string;
  handle: string;
  bio: string;
  avatarUrl?: string;
  links: LinkItem[];
}
