/**
 * API Service для взаимодействия с WordPress backend
 */

// Для локального тестування використовуйте: 'http://localhost/witerok/api'
// Для production: 'https://witerok.com/api'
const API_BASE_URL = "https://witerok.com/api";

// Типы данных
export interface Post {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  date: string;
  image: string;
  categories: string[];
  link: string;
}

export interface NewsletterData {
  email: string;
  name?: string;
}

export interface ContactData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface DonateData {
  amount: number;
  name: string;
  email: string;
  message?: string;
  payment_method: "stripe" | "paypal";
}

export interface ApiResponse {
  success: boolean;
  message: string;
  error?: string;
}

// Helper для fetch
async function fetchAPI<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  console.log("🌐 Fetching:", url);

  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options?.headers,
      },
    });

    console.log("📡 Response status:", response.status, response.statusText);

    if (!response.ok) {
      const error = await response.json();
      console.error("❌ API Error Response:", error);
      throw new Error(error.error || "API request failed");
    }

    const data = await response.json();
    console.log("✅ API Data received:", data);
    return data;
  } catch (error) {
    console.error("❌ API Error:", error);
    throw error;
  }
}

/**
 * Получить все посты (новости)
 */
export async function getPosts(
  limit?: number,
  category?: string
): Promise<Post[]> {
  const params = new URLSearchParams();
  if (limit) params.append("limit", limit.toString());
  if (category) params.append("category", category);

  const query = params.toString() ? `?${params.toString()}` : "";
  return fetchAPI<Post[]>(`/posts.php${query}`);
}

/**
 * Получить один пост по slug
 */
export async function getPostBySlug(slug: string): Promise<Post> {
  return fetchAPI<Post>(`/post-single.php?slug=${slug}`);
}

/**
 * Подписаться на newsletter
 */
export async function subscribeNewsletter(
  data: NewsletterData
): Promise<ApiResponse> {
  return fetchAPI<ApiResponse>("/newsletter.php", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

/**
 * Отправить контактное сообщение
 */
export async function sendContactMessage(
  data: ContactData
): Promise<ApiResponse> {
  return fetchAPI<ApiResponse>("/contact.php", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

/**
 * Создать донат
 */
export async function createDonation(data: DonateData): Promise<ApiResponse> {
  return fetchAPI<ApiResponse>("/donate.php", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export default {
  getPosts,
  getPostBySlug,
  subscribeNewsletter,
  sendContactMessage,
  createDonation,
};
