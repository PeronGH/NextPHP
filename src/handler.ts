import { render, TemplateOptions } from "./template.ts";

export function createHandler({
  data,
  root,
  handleError = () => new Response("Internal Server Error", { status: 500 }),
  handleNotFound = () => new Response("Not Found", { status: 404 }),
}: CreateHandlerOptions): Deno.ServeHandler {
  return async (req, info) => {
    const { pathname } = new URL(req.url);

    const responseInit: ResponseInit = {
      headers: new Headers({ "Content-Type": "text/html; charset=utf-8" }),
    };

    data = { ...data, req: Object.assign(req, { info }), res: responseInit };
    let body: string | undefined;

    try {
      body = await render({
        templatePath: pathname,
        data,
        root,
      });
    } catch (e) {
      if (e.name === "NotFound") return handleNotFound(req);

      console.warn(`Error while rendering ${pathname}:`, e);
      return handleError(req, e);
    }

    if (body === undefined) return handleNotFound(req);

    return new Response(body, responseInit);
  };
}

export interface CreateHandlerOptions extends TemplateOptions {
  handleError?(req: Request, e: unknown): Response | Promise<Response>;
  handleNotFound?(req: Request): Response | Promise<Response>;
}
