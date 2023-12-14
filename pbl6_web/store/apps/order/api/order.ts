const api_url = "https://api.restaurantservice.online"
import request from 'superagent';

export async function getOrdersDB(payload: any, token: string): Promise<any> {
  try {
    const url = `${api_url}/api/orders`;
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

export async function getOrderByIdDB(id: number, token: string): Promise<any> {
  try {
    const url = `${api_url}/api/orders/${id}`;

    const response = await request
      .get(url)
      .set('Content-Type', 'application/json')
      .set('Authorization', 'Bearer ' + token);

    return response.body;
  } catch (error: any) {
    console.log("Error logging in:", error.message);
    throw error;
  }
}

export async function getOrderByTable(token: string): Promise<any> {
    try {
        const url = `${api_url}/api/orders/get-order-by-table`;
        const response = await request
        .get(url)
        .set('Content-Type', 'application/json')
        .set('Authorization', 'Bearer ' + token);
  
        return response.body;
    } catch (error: any) {
        console.log("Error logging in:", error.message);
        throw error;
    }
}

export async function addOrderDB(id: any, token: string): Promise<any> {
  try {
    const url = `${api_url}/api/orders/`;

    const response = await request
      .put(url)
      .set('Content-Type', 'application/json')
      .set('Authorization', 'Bearer ' + token)
      .send(id);

    return response.body;
  } catch (error: any) {
    console.log("Error logging in:", error.message);
    throw error;
  }
}

export async function updateStatusOrderByIdDB(data: any, token: string): Promise<any> {
  try {
    const url = `${api_url}/api/orders/${data.id}/update-status-order`;

    const response = await request
      .post(url)
      .set('Content-Type', 'application/json')
      .set('Authorization', 'Bearer ' + token)
      .send(data.newStatus);

    return response.body;
  } catch (error: any) {
    console.log("Error logging in:", error.message);
    throw error;
  }
}

export async function updateStatusOrderByIdAndOrderDetailIdDB(data: any, token: string): Promise<any> {
    try {
      const url = `${api_url}/api/orders/${data.id}/${data.orderDetailId}/update-status-order`;
  
      const response = await request
        .post(url)
        .set('Content-Type', 'application/json')
        .set('Authorization', 'Bearer ' + token)
        .send(data.newStatus);
  
      return response.body;
    } catch (error: any) {
      console.log("Error logging in:", error.message);
      throw error;
    }
}

export async function updateOrderFoodByIdDB(data: any, token: string): Promise<any> {
    try {
      const url = `${api_url}/api/orders/${data.id}/order-food`;
  
      const response = await request
        .post(url)
        .set('Content-Type', 'application/json')
        .set('Authorization', 'Bearer ' + token)
        .send(data.orders);
  
      return response.body;
    } catch (error: any) {
      console.log("Error logging in:", error.message);
      throw error;
    }
  }