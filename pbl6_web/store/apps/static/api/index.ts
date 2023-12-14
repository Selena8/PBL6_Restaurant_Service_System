const api_url = "https://api.restaurantservice.online"
import request from 'superagent';

const todayFormatted: string = new Date().toISOString().split('T')[0];

export async function getStaticProfit(payload: any, token: string): Promise<any> {
    try {
      const url = `${api_url}/api/statistics/get-profit`;
      const response = await request
        .get(url)
        .query(payload)
        .set('Content-Type', 'application/json')
        .set('Authorization', 'Bearer ' + token);
  
      return response.body;
    } catch (error: any) {
      console.log("Error logging in:", error.message);
      throw error;
    }
}

export async function getStaticOrderToday(token: string): Promise<any> {
  try {
    const url = `${api_url}/api/statistics/get-number-of-order`;
    const response = await request
      .get(url)
      .query({
        StartDate: todayFormatted,
        EndDate: todayFormatted
      })
      .set('Content-Type', 'application/json')
      .set('Authorization', 'Bearer ' + token);

    return response.body;
  } catch (error: any) {
    console.log("Error logging in:", error.message);
    throw error;
  }
}

export async function getStaticOrder(token: string): Promise<any> {
  try {
    const url = `${api_url}/api/statistics/get-number-of-order`;
    const response = await request
      .get(url)
      .query({
        EndDate: todayFormatted
      })
      .set('Content-Type', 'application/json')
      .set('Authorization', 'Bearer ' + token);

    return response.body;
  } catch (error: any) {
    console.log("Error logging in:", error.message);
    throw error;
  }
}

export async function getStaticPayment(payload: any, token: string): Promise<any> {
  try {
    const url = `${api_url}/api/statistics/get-payment-statistics`;
    const response = await request
      .get(url)
      .query(payload)
      .set('Content-Type', 'application/json')
      .set('Authorization', 'Bearer ' + token);

    return response.body;
  } catch (error: any) {
    console.log("Error logging in:", error.message);
    throw error;
  }
}

