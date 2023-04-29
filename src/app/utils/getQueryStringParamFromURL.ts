export function getQueryStringParamFromURL(
  key: string,
  url: string | undefined
): string | null {
  if (!url) return '';
  const search = new URL(url).search;
  const urlParams = new URLSearchParams(search);
  return urlParams.get(key);
}
