const BASE_URL = import.meta.env.VITE_API_URL;

export async function apiRequest(endpoint, options = {}) {
    const token = localStorage.getItem("token");

    const res = await fetch(`${BASE_URL}/api${endpoint}`, {
        method: options.method || "GET",
        headers: {
            "Content-Type": "application/json",
            ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: options.body ? JSON.stringify(options.body) : null,
    });

    let data;
    try {
        data = await res.json();
    } catch {
        data = {};
    }
    if (!res.ok) {
        return Promise.reject({
            message: data.error || data.message || "Request failed",
            status: res.status,
        });
    }

    return data;
    return data;
}
