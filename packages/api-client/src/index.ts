export interface ApiClientOptions {
  baseUrl: string;
  headers?: Record<string, string>;
}

export function createApiClient(options: ApiClientOptions) {
  async function request<T>(path: string, init?: RequestInit): Promise<T> {
    const response = await fetch(`${options.baseUrl}${path}`, {
      ...init,
      headers: {
        "content-type": "application/json",
        ...(options.headers ?? {}),
        ...(init?.headers ?? {})
      }
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status} ${response.statusText}`);
    }

    return response.json() as Promise<T>;
  }

  return {
    get: <T>(path: string) => request<T>(path),
    post: <T>(path: string, body: unknown) =>
      request<T>(path, { method: "POST", body: JSON.stringify(body) }),
    patch: <T>(path: string, body: unknown) =>
      request<T>(path, { method: "PATCH", body: JSON.stringify(body) })
  };
}
