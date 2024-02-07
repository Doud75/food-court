const token = sessionStorage.getItem("token");

export async function deleteFetch(url, data = {}) {
  try {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    const response = await fetch(`http://localhost:8097${url}`, {
      method: "DELETE",
      body: JSON.stringify(data),
      headers: headers,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const json = await response.json();
    return json;
  } catch (error) {
    console.error("Error during DELETE request:", error);
    throw error;
  }
}
