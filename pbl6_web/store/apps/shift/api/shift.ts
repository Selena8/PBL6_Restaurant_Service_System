const api_url = "https://api.restaurantservice.online"
import request from 'superagent';

// Shift
export async function getShifts(payload: any, token: string): Promise<any> {
  try {
    const url = `${api_url}/api/shifts`;

    const response = await request
      .get(url)
      .query(payload)
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer + ${token}`);

    if (!response.ok) {
    const errData = await response.body;
    throw new Error(errData.message);
    }
    const data = await response.body;
    return data;
  } catch (error: any) {
    console.log("Error fetch shifts in:", error.message);
    throw error;
  }
}

export async function getShiftById(id: any, token: string): Promise<any> {
  try {
    const url = `${api_url}/api/shifts/${id}`;

    const response = await request
      .get(url)
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer + ${token}`);

    if (!response.ok) {
    const errData = await response.body;
    throw new Error(errData.message);
    }
    const data = await response.body;
    return data;
  } catch (error: any) {
    console.log("Error fetch shifts in:", error.message);
    throw error;
  }
}

export async function addShift(payload: any, token: string): Promise<any> {
  try {
    const url = `${api_url}/api/shifts`;

    const response = await request
      .post(url)
      .send(payload)
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer + ${token}`);

    if (!response.ok) {
    const errData = await response.body;
    throw new Error(errData.message);
    }
    const data = await response.body;
    return data;
  } catch (error: any) {
    console.log("Error add shifts in:", error.message);
    throw error;
  }
}

export async function editShift(payload: any, token: string, id: string): Promise<any> {
  try {
    const url = `${api_url}/api/shifts/${id}`;

    const response = await request
      .put(url)
      .send(payload)
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer + ${token}`);

    if (!response.ok) {
    const errData = await response.body;
    throw new Error(errData.message);
    }
    const data = await response.body;
    return data;
  } catch (error: any) {
    console.log("Error edit shifts in:", error.message);
    throw error;
  }
}

export async function deleteShift(payload: any, token: string): Promise<any> {
  try {
    const url = `${api_url}/api/shifts`;

    const response = await request
      .delete(url)
      .send([payload])
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer + ${token}`);

    if (!response.ok) {
    const errData = await response.body;
    throw new Error(errData.message);
    }
    const data = await response.body;
    return data;
  } catch (error: any) {
    console.log("Error delete shifts in:", error.message);
    throw error;
  }
}

// WorkLog
export async function getWorkLogs(payload: any, token: string): Promise<any> {
  try {
    const url = `${api_url}/api/shifts/request-change-worklog`;

    const response = await request
      .get(url)
      .query(payload)
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer + ${token}`);

    if (!response.ok) {
    const errData = await response.body;
    throw new Error(errData.message);
    }
    const data = await response.body;
    return data;
  } catch (error: any) {
    console.log("Error fetch shifts in:", error.message);
    throw error;
  }
}

export async function deleteWorkLogs(payload: any, token: string): Promise<any> {
  try {
    const url = `${api_url}/api/shifts/request-change-worklog`;

    const response = await request
      .delete(url)
      .send(payload)
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer + ${token}`);

    if (!response.ok) {
    const errData = await response.body;
    throw new Error(errData.message);
    }
    const data = await response.body;
    return data;
  } catch (error: any) {
    console.log("Error delete shifts in:", error.message);
    throw error;
  }
}



export async function approveRequest(id: any, token: string): Promise<any> {
  try {
    const url = `${api_url}/api/shifts/approve-worklog-change-request/${id}`;

    const response = await request
      .put(url)
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer + ${token}`);

    if (!response.ok) {
    const errData = await response.body;
    throw new Error(errData.message);
    }
    const data = await response.body;
    return data;
  } catch (error: any) {
    console.log("Error delete shifts in:", error.message);
    throw error;
  }
}

export async function rejectRequest(id: any, token: string): Promise<any> {
  try {
    const url = `${api_url}/api/shifts/reject-change-worklog/${id}`;

    const response = await request
      .put(url)
      .send(id)
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer + ${token}`);

    if (!response.ok) {
    const errData = await response.body;
    throw new Error(errData.message);
    }
    const data = await response.body;
    return data;
  } catch (error: any) {
    console.log("Error delete shifts in:", error.message);
    throw error;
  }
}