import { ejs, path } from "./deps.ts";

export async function render(
  { templatePath, data, root }: RenderOptions,
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

  if (!filepath.endsWith(".ejs")) filepath += ".ejs";

  try {
    return await ejs.renderFile(filepath, data, { async: true });
  } catch (e) {
    if (e.name === "NotFound") return;
    throw e;
  }
}

export interface TemplateOptions {
  data?: ejs.Data;
  root: string;
}

export interface RenderOptions extends TemplateOptions {
  templatePath: string;
}
