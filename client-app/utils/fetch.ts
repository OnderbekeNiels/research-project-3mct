export enum RestMethodType {
  POST = "POST",
  GET = "GET",
  PUT = "PUT",
  DELETE = "DELETE",
}

export const get = async (uri: string) => {
  const response = await fetch(`${uri}`, {
    method: RestMethodType.GET,
  });

  if (!response.ok) {
    throw `Could not ${RestMethodType.GET} ${response.url}`;
  } else {
    return await response.json();
  }
};

const post = async (uri: string, body: any) => {
  const response = await fetch(`http://localhost:4000/${uri}`, {
    headers: {
       'Content-Type': 'application/json',
    },
    method: RestMethodType.POST,
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw `Something went wrong with ${RestMethodType.POST} to ${response.url}`;
  } else {
    return await response.json();
  }
};

export const query = async (
  name: string,
  query: string,
  variables?: Object
): Promise<any> => {
  const result = await post(
    "graphql",
    {
      operationName: name,
      query,
      variables,
    }
  );

  if (result.errors) {
    throw `Could not ${name}`;
  } else {
    return result.data[name];
  }
};
