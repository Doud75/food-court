export async function deleteFetch(url, data = {}) {
  try {
    const response = await fetch(`http://localhost:8097${url}`, {
      method: "DELETE",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
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
