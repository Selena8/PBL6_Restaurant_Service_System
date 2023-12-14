const api_url = "https://api.restaurantservice.online";

export async function getFreeTimes(params: any) : Promise<any> {
    params = params.replace('/', '%2F')
    try {
      const url = `${api_url}/api/booking/free-time`;
  
      const requestOptions = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      };
  
      const response = await fetch(`${url}?request=${params}`, requestOptions);
      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.message);
      }
  
      const data = await response.json();
      return data;
    } catch (error: any) {
      console.log("Error check availability:", error.message);
      throw error;
    }
}

export async function checkAvailable(payload: any) : Promise<any> {
    try {
      const url = `${api_url}/api/booking/check-availability`;
  
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload)
      };
  
      const response = await fetch(`${url}`, requestOptions);
      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.message);
      }
  
      const data = await response.json();
      return data;
    } catch (error: any) {
      console.log("Error check availability:", error.message);
      throw error;
    }
}

export async function booking(payload: any) : Promise<any> {
    try {
      const url = `${api_url}/api/booking`;
  
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({...payload})
      };
  
      const response = await fetch(`${url}`, requestOptions);
      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.message);
      }
  
      const data = await response.json();
      return data;
    } catch (error: any) {
      console.log("Error booking:", error.message);
      throw error;
    }
}