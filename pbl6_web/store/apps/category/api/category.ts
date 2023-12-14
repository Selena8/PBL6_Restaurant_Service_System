const api_url = "https://api.restaurantservice.online"

export async function getCategories(): Promise<any> {
    try {
      const url = `${api_url}/api/categories`;
      const requestOptions = {
        method: "GET",
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

  export async function getCategoryDB(id: number): Promise<any> {
    try {
      const url = `${api_url}/api/categories/${id}`;
      const requestOptions = {
        method: "GET",
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

  export async function addCategoryDB(name: string, description: string, token: string): Promise<any> {
    try {
      const url = `${api_url}/api/categories`;
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + token
        },
        body: JSON.stringify({name, description})
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

  export async function updateCategoryDB(id: number, name: string, description: string, token: string): Promise<any> {
    try {
      const url = `${api_url}/api/categories/${id}`;
      const requestOptions = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + token
        },
        body: JSON.stringify({name, description})
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


  export async function deleteCategoryDB(id: number, token: string): Promise<any> {
    try {
      const url = `${api_url}/api/categories/${id}`;
      const requestOptions = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + token
        }
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

  export async function deleteCategoriesDB(ids: number[], token: string): Promise<any> {
    try {
      const url = `${api_url}/api/categories`;
      const requestOptions = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + token
        },
        body: JSON.stringify(ids)
      };
  
      const response = await fetch(url, requestOptions);
      const data = await response.json();
      return data;
    } catch (error: any) {
      console.log("Error logging in:", error.message);
      throw error;
    }
  }

  