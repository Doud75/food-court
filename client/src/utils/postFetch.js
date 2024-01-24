export async function postFetch(url, data) {
  try {
    const response = await fetch(`http://localhost:8097${url}`, {
      method: "POST",
      body: JSON.stringify(data),
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
