export const handleMakeSlug = (value: string) => {
  const lowerCaseStr = value.trim().toLowerCase(); // Triming and making lowercase
  const cleanStr = lowerCaseStr.replace(/[^a-z0-9 ]/g, ""); // Removing char except a-z, 0-9 and spaces
  const sanitizedStr = cleanStr.replace(/\s+/g, " "); // Removing double spaces
  const slug = sanitizedStr.trim().split(" ").join("-"); // Joing the string with hyphen

  return slug;
};
