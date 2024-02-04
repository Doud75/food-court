const token = sessionStorage.getItem("token");

export async function getFetch(url) {
  try {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    const response = await fetch(`http://localhost:8097${url}`, {
      method: "GET",
      headers: headers,
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
