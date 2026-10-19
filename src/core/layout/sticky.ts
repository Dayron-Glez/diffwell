/**
 * Whether a file's rows are on screen, for the scrollbar that sits at the end
 * of them.
 *
 * The strip is placed straight onto the element by the scroll handler, never
 * through React, which would re-render the whole window on a scroll that did
 * not change which rows are on it. This is the part of that worth testing
 * without a browser.
 */
export interface Block {
  /** The top and bottom of the file's rows, in document coordinates. */
  readonly top: number
  readonly bottom: number
}

export interface Viewport {
  readonly scrollTop: number
  readonly height: number
}

/** Whether any part of the block is on screen at all. */
export function onScreen(block: Block, viewport: Viewport): boolean {
  return block.bottom > viewport.scrollTop && block.top < viewport.scrollTop + viewport.height
}

/**
 * Where the file's scrollbar sits: on the bottom edge of the view while the
 * file runs past it, and at rest on the file's own last rows once they are on
 * screen.
 *
 * It used to be only the second of those. That reads as the bar belonging to
 * this file rather than to the viewer, which was the point, but it cost the
 * reader every file taller than the view. A window shows on the order of
 * forty rows, so anything past a few hundred lines keeps its own end off
 * screen for most of the way down, and for all of that way the bar that pans
 * the file is somewhere below the window: the only thing left to move a long
 * line with is the arrow keys. What makes the bar read as the file's own turned out not to
 * be where it rests but that it is invisible until the pointer is in that
 * file, so the position was the half worth giving up.
 *
 * Never above the file's own first row: a file whose top edge has only just
 * come into view at the bottom of the window would otherwise be given a bar
 * floating above itself.
 */
export function stripTop(block: Block, viewport: Viewport, barHeight: number): number {
  const floor = viewport.scrollTop + viewport.height
  return Math.max(block.top, Math.min(block.bottom, floor) - barHeight)
}
