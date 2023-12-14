const api_url = "https://api.restaurantservice.online"

export async function login(email: string, password: string): Promise<any> {
  try {
    const url = `${api_url}/api/auth/login`;
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    };

    const response = await fetch(url, requestOptions);
    if (!response.ok) {
      const errData = await response.json()
      throw new Error(errData.message);
    }

    const data = await response.json();
    return data;
  } catch (error: any) {
    console.log("Error logging in:", error.message);
    throw error;
  }
}

export async function getUserDB(token: string): Promise<any> {
  try {
    const url = `${api_url}/api/users/me`;
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token
      }
    };

    const response = await fetch(url, requestOptions);
    const data = await response.json();
    return data;
  } catch (error: any) {
    console.log("Error logging in:", error.message);
    throw error;
  }
}

export async function updateUserDB(user: any, token: string): Promise<any> {
  try {
    const url = `${api_url}/api/users/me`;
    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token
      },
      body: JSON.stringify({...user}),
    };

    const response = await fetch(url, requestOptions);
    const data = await response.json();
    return data;
  } catch (error: any) {
    console.log("Error logging in:", error.message);
    throw error;
  }
}

export async function updateAvatarDB(formData: any, token: string): Promise<any> {
  try {
    const url = `${api_url}/api/users/me/set-avatar`;
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

export async function verifyEmail(email: string): Promise<any> {
  try {
    const url = `${api_url}/api/users/send/forgot-password`;
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({email})
    };

    const response = await fetch(url, requestOptions);
    return response;
  } catch (error: any) {
    console.log("Error verify:", error.message);
    throw error;
  }
}

export async function resetPassword({newPassword, confirmPassword, token}: any): Promise<any> {
  try {
    const url = `${api_url}/api/users/reset-password`;
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({newPassword, confirmPassword, token})
    };

    const response = await fetch(url, requestOptions);
    return response;
  } catch (error: any) {
    console.log("Error verify:", error.message);
    throw error;
  }
}

export async function changePassword(data: any, token: string): Promise<any> {
  try {
    const url = `${api_url}/api/users/change-password`;
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token
      },
      body: JSON.stringify({...data}),
      noneContentType: true
    };

    const response = await fetch(url, requestOptions);
    return response;
  } catch (error: any) {
    console.log("Error logging in:", error.message);
    throw error;
  }
}

export async function activateAccount(token: any): Promise<any> {
  try {
    const url = `${api_url}/api/users/verify-email?token=${token}`;
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      }
    };

    const response = await fetch(url, requestOptions);
    const data = await response.json();
    return data;
  } catch (error: any) {
    console.log("Error logging in:", error.message);
    throw error;
  }
}