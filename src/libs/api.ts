const winners = 'http://127.0.0.1:3000/winners';
const garage = 'http://127.0.0.1:3000/garage';
const engine = 'http://127.0.0.1:3000/engine';

/*                       \\ garage //                               */

export const getCar = async (id: number) => {
  const url = `${garage}/${id}`;
  const response = await fetch(url);
  return response.json();
};

export const getCars = async (page:number, limit?: number) => {
  const url = `${garage}?_limit=${limit}&_page=${page}`;
  const response = await fetch(url);
  return { cars: await response.json(), count: await response.headers.get('X-Total-Count') };
};

export const deleteCar = async (id:number) => {
  const url = `${garage}/${id}`;
  const response = await fetch(url, { method: 'delete' });
  return { cars: response.ok };
};

export const createCar = async (name: string, color: string) => fetch(garage,
  {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, color }),
  });

export const updateCar = async (id:string, name: string, color: string) => {
  const url = `${garage}/${id}`;
  const response = await fetch(url,
    {
      method: 'put',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, color }),
    });
  return response.status;
};

// ////////////////////////////\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

/*                       \\ engine //                               */

export const switchEngine = (id:string, status: 'started'|'stopped') => {
  const url = `${engine}?id=${id}&status=${status}`;
  return fetch(url);
};

export const driveModeEngine = async (id:string) => {
  const url = `${engine}?id=${id}&status=drive`;
  const response = await fetch(url, { method: 'get' });
  return response.statusText;
};

/*                          winners                                */

export const getWinners = async (
  page:number,
  sort : 'id' | 'wins' | 'time',
  order : 'ASC' | 'DESC',
) => {
  const limit = 10;
  const url = `${winners}?_page=${page}&_limit=${limit}&_sort=${sort}&_order=${order}`;
  const response = await fetch(url);
  return {
    data: await response.json(),
    count: await response.headers.get('X-Total-Count'),
  };
};

export const createWinner = async (id: number, wins:number, time:number) => fetch(winners,
  {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id, wins, time }),
  });

export const getWinner = async (id:number) => {
  const url = `${winners}/${id}`;
  const response = await fetch(url);
  return { data: await response.json(), ok: response.ok };
};

export const deleteWinner = async (id:number) => {
  const url = `${winners}/${id}`;
  const response = await fetch(url, { method: 'delete' });
  return { cars: response.ok };
};

export const updateWinner = async (id:string, wins: string, time: string) => {
  const url = `${winners}/${id}`;
  const response = await fetch(url,
    {
      method: 'put',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ wins, time }),
    });
  return response.status;
};
