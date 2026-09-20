// The design bakes every simple-icons request to the light-mode accent hex
// and relies on the `--icon-filter` CSS variable to recolor for dark mode
// (see index.css), rather than swapping the URL's color per theme.
const ICON_COLOR = '697565'

export function simpleIconUrl(slug) {
  return `https://cdn.simpleicons.org/${slug}/${ICON_COLOR}`
}
