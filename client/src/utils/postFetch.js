export async function postFetch(url, data) {
  try {
    const response = await fetch(`http://localhost:8097${url}`, {
      method: "POST",
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const json = await response.json();
    return json;
  } catch (error) {
    console.error("Error during POST request:", error);
    throw error;
  }
}
