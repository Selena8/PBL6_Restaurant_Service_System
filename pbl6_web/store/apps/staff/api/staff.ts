const api_url = "https://api.restaurantservice.online"
import request from 'superagent';

export async function getStaffsDB(payload: any, token: string): Promise<any> {
  try {
    const url = `${api_url}/api/staffs`;
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

export async function getStaffByIdDB(id: number, token: string): Promise<any> {
  try {
    const url = `${api_url}/api/staffs/${id}`;

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

export async function updateStaffDB(data: any, token: string): Promise<any> {
  try {
    const url = `${api_url}/api/staffs/${data.id}`;

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

export async function addStaffDB(data: any, token: string): Promise<any> {
  try {
    const url = `${api_url}/api/staffs`;

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

export async function deleteStaffsDB(ids: number[], token: string): Promise<any> {
  try {
    const url = `${api_url}/api/staffs`;

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
