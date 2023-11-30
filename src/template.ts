import { ejs, path } from "./deps.ts";

export async function render(
  { templatePath, data, root }: RenderOptions,
): Promise<string | undefined> {
  // clone data to prevent unexpected mutation
  data = { ...data, route: {} };

  const jointPath = path.join(root, templatePath);
  if (!jointPath.startsWith(root)) return;

  let filepath = jointPath;

  try {
    const { isDirectory } = await Deno.stat(filepath);
    if (isDirectory) filepath = path.join(filepath, "index.ejs");
  } catch {
    // do nothing
  }

  const lastEjsEndIndex = filepath.lastIndexOf(".ejs") + ".ejs".length;
  if (lastEjsEndIndex === -1) return;

  data.route.param = filepath.slice(lastEjsEndIndex);
  filepath = filepath.slice(0, lastEjsEndIndex);
  data.route.filepath = filepath;

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
