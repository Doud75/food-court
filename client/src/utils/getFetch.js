export async function getFetch(url) {
  try {
    const response = await fetch(`http://localhost:8097${url}`, {
      method: "GET",
    });
    
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}
