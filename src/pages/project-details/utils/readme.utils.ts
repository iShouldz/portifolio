import { defaultSchema } from "rehype-sanitize"

export const baseAttributes = defaultSchema.attributes || {}
export const baseProtocols = defaultSchema.protocols || {}

export const readmeSanitizeSchema = {
  ...defaultSchema,
  tagNames: Array.from(
    new Set([...(defaultSchema.tagNames || []), "details", "summary", "kbd"])
  ),
  attributes: {
    ...baseAttributes,
    a: [...(baseAttributes.a || []), "align"],
    img: [
      ...(baseAttributes.img || []),
      "align",
      "width",
      "height",
      "loading",
      "decoding",
    ],
    p: [...(baseAttributes.p || []), "align"],
    div: [...(baseAttributes.div || []), "align"],
    span: [...(baseAttributes.span || []), "align"],
    table: [...(baseAttributes.table || []), "align"],
    td: [
      ...(baseAttributes.td || []),
      "align",
      "colspan",
      "rowspan",
      "width",
      "height",
    ],
    th: [
      ...(baseAttributes.th || []),
      "align",
      "colspan",
      "rowspan",
      "width",
      "height",
    ],
  },
  protocols: {
    ...baseProtocols,
    href: baseProtocols.href || ["http", "https", "mailto", "tel"],
    src: Array.from(
      new Set([...(baseProtocols.src || ["http", "https"]), "data"])
    ),
  },
}
