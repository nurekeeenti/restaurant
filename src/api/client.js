const API_BASE = process.env.REACT_APP_API_URL || "";

async function request(path, options = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { "Content-Type": "application/json", ...(options.headers || {}) },
    ...options
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const msg = data.error || data.message || "Ошибка сервера";
    throw new Error(msg);
  }
  return data;
}

export function createBooking(payload) {
  return request("/api/bookings", {
    method: "POST",
    body: JSON.stringify(payload)
  });
}

export function payBooking(bookingId) {
  return request(`/api/bookings/${bookingId}/pay`, { method: "POST" });
}

export function getReceipt(bookingId) {
  return request(`/api/bookings/${bookingId}/receipt`);
}

export function getMenu() {
  return request("/api/menu");
}
