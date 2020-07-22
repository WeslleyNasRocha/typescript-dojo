interface HttpResponse<T> extends Response {
  parsedBody?: T;
}

export async function api<T>(request: RequestInfo): Promise<HttpResponse<T>> {
  const response: HttpResponse<T> = await fetch(request);
  try {
    // if no body it will throw
    response.parsedBody = await response.json();
  } catch (err) {}
  return response;
}
