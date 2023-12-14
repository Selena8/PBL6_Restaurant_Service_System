const api_url = "https://api.restaurantservice.online"
import request from 'superagent';

export async function getTablesDB(payload: any, token: string): Promise<any> {
  try {
    const url = `${api_url}/api/tables`;
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

export async function getTableByIdDB(id: number, token: string): Promise<any> {
  try {
    const url = `${api_url}/api/tables/${id}`;

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

export async function updateTableDB(data: any, token: string): Promise<any> {
  try {
    const url = `${api_url}/api/tables/${data.id}`;

    const response = await request
      .put(url)
      .set('Content-Type', 'application/json')
      .set('Authorization', 'Bearer ' + token)
      .send(data);

    return response.body;
  } catch (error: any) {
    console.log("Error logging in:", error.message);
    throw error;
  }
}

export async function addTableDB(data: any, token: string): Promise<any> {
  try {
    const url = `${api_url}/api/tables`;
    const response = await request
      .post(url)
      .set('Content-Type', 'application/json')
      .set('Authorization', 'Bearer ' + token)
      .send(data);

    return response.body;
  } catch (error: any) {
    console.log("Error logging in:", error.message);
    throw error;
  }
}

export async function deleteTablesDB(ids: number[], token: string): Promise<any> {
  try {
    const url = `${api_url}/api/tables`;

    const response = await request
      .delete(url)
      .set('Content-Type', 'application/json')
      .set('Authorization', 'Bearer ' + token)
      .send(ids);

    return response.body;
  } catch (error: any) {
    console.log("Error logging in:", error.message);
    throw error;
  }
}
