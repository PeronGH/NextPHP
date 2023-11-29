import { ejs, path } from "./deps.ts";

export async function render(
  { templatePath, data, root, extname = ".ejs" }: RenderOptions,
): Promise<string | undefined> {
  const jointPath = path.join(root, templatePath);
  if (!jointPath.startsWith(root)) return;

  let filepath = jointPath;

  try {
    const { isDirectory } = await Deno.stat(filepath);
    if (isDirectory) filepath = path.join(filepath, "index");
  } catch {
    // do nothing
  }

  if (path.extname(filepath) !== extname) filepath += extname;

  return await ejs.renderFile(filepath, data, { async: true });
}

export interface TemplateOptions {
  data?: ejs.Data;
  root: string;
  extname?: string;
}

export interface RenderOptions extends TemplateOptions {
  templatePath: string;
}
