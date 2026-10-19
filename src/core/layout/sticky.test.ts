import { describe, expect, it } from 'vitest'
import { onScreen, stripTop } from './sticky'

const view = (scrollTop: number, height = 100) => ({ scrollTop, height })

describe('whether a file is on screen at all', () => {
  it.each([
    [{ top: 0, bottom: 50 }, 0, true],
    [{ top: 0, bottom: 50 }, 60, false],
    [{ top: 200, bottom: 400 }, 0, false],
    [{ top: 90, bottom: 400 }, 0, true],
  ])('%o against a view at %i', (block, scrollTop, expected) => {
    expect(onScreen(block, view(scrollTop))).toBe(expected)
  })
})

/**
 * A file taller than the view keeps its bar on the bottom edge of the view
 * for as long as it runs past it, and only lets it come to rest once the
 * file's own last rows are on screen. Before, the bar was always at the
 * file's end, so a long file offered no bar at all until the reader had got
 * there.
 */
describe('where a file keeps its scrollbar', () => {
  const BAR = 12

  it('rests on the end of a file that fits', () => {
    expect(stripTop({ top: 0, bottom: 50 }, view(0), BAR)).toBe(50 - BAR)
  })

  it('rides the bottom of the view while the file runs past it', () => {
    expect(stripTop({ top: 0, bottom: 5000 }, view(0), BAR)).toBe(100 - BAR)
    expect(stripTop({ top: 0, bottom: 5000 }, view(900), BAR)).toBe(1000 - BAR)
  })

  it('lands on the file the moment its end comes into view', () => {
    // The end is one pixel inside the view, so the bar leaves the edge.
    expect(stripTop({ top: 0, bottom: 999 }, view(900), BAR)).toBe(999 - BAR)
  })

  it('never floats above the file it belongs to', () => {
    // A file whose first row has only just appeared at the bottom edge: the
    // bar would otherwise be placed a bar's height above its own top.
    expect(stripTop({ top: 995, bottom: 5000 }, view(900), BAR)).toBe(995)
  })
})
