const api_url = "https://api.restaurantservice.online";

export async function fetchListMenu(params: any): Promise<any> {
  try {
    const url = `${api_url}/api/foods`;
    const queryParams = new URLSearchParams(params).toString();

    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await fetch(`${url}?${queryParams}`, requestOptions);
    if (!response.ok) {
      const errData = await response.json();
      throw new Error(errData.message);
    }

    const data = await response.json();
    return data;
  } catch (error: any) {
    console.log("Error fetch list menu:", error.message);
    throw error;
  }
}

export async function fetchMenuDetail(id: number) {
  try {
    const url = `${api_url}/api/foods`;

    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await fetch(`${url}/${id}`, requestOptions);
    if (!response.ok) {
      const errData = await response.json();
      throw new Error(errData.message);
    }

    const data = await response.json();
    return data;
  } catch (error: any) {
    console.log("Error fetch list menu:", error.message);
    throw error;
  }
}

export async function addMenu(payload: any, token: string): Promise<any> {
  try {
    const url = `${api_url}/api/foods`;

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(payload),
    };

    const response = await fetch(url, requestOptions);
    if (!response.ok) {
      const errData = await response.json();
      throw new Error(errData.message);
    }
    const data = await response.json();
    return data;
  } catch (error: any) {
    console.log("Error add menu:", error.message);
    throw error;
  }
}

export async function updateMenu(id: number, payload: any, token: string): Promise<any> {
  try {
    const url = `${api_url}/api/foods/${id}`;
    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token
      },
      body: JSON.stringify(payload)
    };

    const response = await fetch(url, requestOptions);
    const data = await response.json();
    return data;
  } catch (error: any) {
    console.log("Error update menu:", error.message);
    throw error;
  }
}

export async function deleteMenu(id: number, token: string): Promise<any> {
  try {
    const url = `${api_url}/api/foods`;
    const requestOptions = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token
      },
      body: JSON.stringify([id])
    };

    const response = await fetch(url, requestOptions);
    const data = await response.json();
    return data;
  } catch (error: any) {
    console.log("Error delete menu:", error.message);
    throw error;
  }
}

export async function updateAvatar(id: number, formData: any, token: string): Promise<any> {
  try {
    const url = `${api_url}/api/foods/${id}/upload-image`;
    const requestOptions = {
      method: "PUT",
      headers: {
        "Authorization": "Bearer " + token
      },
      body: formData,
      noneContentType: true
    };

    const response = await fetch(url, requestOptions);
    return response;
  } catch (error: any) {
    console.log("Error logging in:", error.message);
    throw error;
  }
}