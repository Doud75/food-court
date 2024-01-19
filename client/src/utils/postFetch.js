export async function postFetch(url, data) {
  try {
    const response = await fetch(`http://localhost:8097${url}`, {
      method: "POST",
      body: JSON.stringify(data),
    });
    const json = await response.json();
    return true;
  } catch (error) {
    return false;
  }
}
