import { render, TemplateOptions } from "./template.ts";

export function createHandler({
  data,
  root,
  extname,
  handleError = () => new Response("Internal Server Error", { status: 500 }),
  handleNotFound = () => new Response("Not Found", { status: 404 }),
}: CreateHandlerOptions): Deno.ServeHandler {
  return async (request, info) => {
    const { pathname } = new URL(request.url);

    const responseInit: ResponseInit = {
      headers: new Headers({ "Content-Type": "text/html; charset=utf-8" }),
    };

    data = { ...data, request, info, response: responseInit };
    let body: string | undefined;

    try {
      body = await render({
        templatePath: pathname,
        data,
        root,
        extname,
      });
    } catch (e) {
      console.error(`Error while rendering ${pathname}:`, e);
      return handleError(request, e);
    }

    if (body === undefined) return handleNotFound(request);

    return new Response(body, responseInit);
  };
}

export interface CreateHandlerOptions extends TemplateOptions {
  handleError?(req: Request, e: unknown): Response | Promise<Response>;
  handleNotFound?(req: Request): Response | Promise<Response>;
}
