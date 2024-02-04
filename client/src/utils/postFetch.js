const token = sessionStorage.getItem("token");

export async function postFetch(url, data) {
  try {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    const response = await fetch(`http://localhost:8097${url}`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: headers,
    });

    if (!response.ok) {
      if (response.status !== 500) {
        return response.status;
      }
      throw new Error(`HTTP Error ${response.status}: ${response.statusText}`);
    }

    const json = await response.json();
    return json;
  } catch (error) {
    throw error;
  }
}
