import { getTaskFileString } from "../(libs)/utils";
import { convert_html, convert_tex } from "bebras";
import path from "path";

export async function getTaskHtml(taskFilePath: string) {
  const t_text = await getTaskFileString(taskFilePath);
  const [htmContent, _] = convert_html.renderMarkdown(
    t_text,
    path.dirname(taskFilePath),
    true
  );
  return htmContent;
}

export async function getTaskMd(taskFilePath: string) {
  return await getTaskFileString(taskFilePath);
}

export async function getTaskTex(taskFilePath: string) {
  const textMd = await getTaskFileString(taskFilePath);
  const langCode = "fra";
  const [tokens, metadata] = convert_html.parseMarkdown(
    textMd,
    path.dirname(taskFilePath),
    {
      langCode,
      // we use ⍀ to avoid escaping \ to \\, and we later convert it back to \
      customQuotes: ["⍀enquote⦃", "⦄", "⍀enquote⦃", "⦄"],
    }
  );
  const linealizedTokens = tokens.flatMap((t) => {
    if (t.type === "inline") {
      return t.children ?? [];
    } else {
      return [t];
    }
  });

  const texDataStandalone = convert_tex.renderTex(
    linealizedTokens,
    langCode,
    metadata,
    taskFilePath,
    true
  );

  return texDataStandalone;
}
