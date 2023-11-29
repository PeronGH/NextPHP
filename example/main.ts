import { fromFileUrl } from "https://deno.land/std@0.208.0/path/posix/from_file_url.ts";
import { createHandler } from "../mod.ts";

Deno.serve(createHandler({
  root: fromFileUrl(import.meta.resolve("./routes")),
}));
