/**
 * Converts a "positive" REST API sort parameter to its opposite "negative" and vise-versa
 * @param sort
 */
export default function (sort: string) {
  return sort.startsWith('-') ? sort.substring(1) : '-' + sort;
}
