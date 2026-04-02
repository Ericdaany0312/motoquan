'use client';
// Likes and favorites stored in localStorage (no DB table required)
// Format: { [articleId]: { liked: boolean, favorited: boolean } }

const KEY = 'motoquan_user_actions';

export function getUserActions(): Record<string, { liked: boolean; favorited: boolean }> {
  if (typeof window === 'undefined') return {};
  try {
    return JSON.parse(localStorage.getItem(KEY) || '{}');
  } catch {
    return {};
  }
}

export function getArticleAction(articleId: string): { liked: boolean; favorited: boolean } {
  return getUserActions()[articleId] || { liked: false, favorited: false };
}

export function setArticleAction(articleId: string, action: 'liked' | 'favorited', value: boolean) {
  const all = getUserActions();
  if (!all[articleId]) all[articleId] = { liked: false, favorited: false };
  all[articleId][action] = value;
  localStorage.setItem(KEY, JSON.stringify(all));
}

export function toggleLike(articleId: string): boolean {
  const current = getArticleAction(articleId);
  const newVal = !current.liked;
  setArticleAction(articleId, 'liked', newVal);
  return newVal;
}

export function toggleFavorite(articleId: string): boolean {
  const current = getArticleAction(articleId);
  const newVal = !current.favorited;
  setArticleAction(articleId, 'favorited', newVal);
  return newVal;
}
