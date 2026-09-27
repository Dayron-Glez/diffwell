/**
 * How a text field shows that it has focus.
 *
 * The ring stays off. A ring around a field that is already outlined reads
 * heavier than it needs to, which is why it was taken off in the first
 * place — but taking it off left the field with nothing: its border held the
 * same colour focused or not, at 1.55:1 against the page, so a reader
 * working by keyboard could not see which field they were in. The caret is
 * not an answer either, since it says where the text will go rather than
 * which of three fields is listening.
 *
 * So the field's own frame lights up instead, which costs no ring and no
 * element: 1.55:1 becomes 11.38:1, and `npm run audit:contrast` is what says
 * so. Every other control keeps its ring; this is only for the ones you type
 * into.
 *
 * Written once and shared so the three fields cannot drift apart, and
 * applied where they are used so `ui/input` and `ui/textarea` stay shadcn's
 * files, unedited and overwritable.
 */
export const QUIET_FOCUS = 'focus-visible:border-ring focus-visible:ring-0'
