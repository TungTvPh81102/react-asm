import slugify from "slugify";

export const generateSlug = (name) => {
  return slugify(name, {
    replacement: "-",
    lower: true,
    strict: true,
    locale: "vi",
    trim: true,
  });
};
