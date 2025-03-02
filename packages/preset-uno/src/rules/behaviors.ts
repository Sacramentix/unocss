import { Rule } from '@unocss/core'
import { handler as h } from '../utils'
import { colorResolver } from './color'

const listStyleProps = [
  'none', 'disc', 'circle', 'square',
  'decimal', 'zero-decimal', 'greek', 'roman',
  'upper-roman', 'alpha', 'upper-alpha',
]

export const listStyle: Rule[] = [
  [new RegExp(`^list-((${listStyleProps.join('|')})(?:(-outside|-inside))?)$`), ([, value]) => {
    const style = value.split(/-outside|-inside/)[0]
    const position = /inside|outside/.exec(value) ?? []

    if (position.length) {
      return {
        'list-style-position': `${position[0]}`,
        'list-style-type': `${style}`,
      }
    }
    return {
      'list-style-type': `${style}`,
    }
  }],
  [/^list-(inside|outside)$/, ([, value]) => {
    return {
      'list-style-position': value,
    }
  }],
]

export const boxDecorationBreaks: Rule[] = [
  ['decoration-slice', { 'box-decoration-break': 'slice' }],
  ['decoration-clone', { 'box-decoration-break': 'clone' }],
]

export const caretOpacity: Rule[] = [
  [/^caret-op(?:acity)?-?(.+)$/, ([, d]) => ({ '--un-caret-opacity': h.bracket.percent(d) })],
]

export const caretColors: Rule[] = [
  [/^caret-(.+)$/, colorResolver('caret-color', 'caret')],
]

export const imageRenderings: Rule[] = [
  ['image-render-auto', { 'image-rendering': 'auto' }],
  ['image-render-edge', { 'image-rendering': 'crisp-edges' }],
  ['image-render-pixel', [
    ['-ms-interpolation-mode', 'nearest-neighbor'],
    ['image-rendering', '-webkit-optimize-contrast'],
    ['image-rendering', '-moz-crisp-edges'],
    ['image-rendering', '-o-pixelated'],
    ['image-rendering', 'pixelated'],
  ]],
]

export const appearance: Rule[] = [
  ['appearance-none', {
    'appearance-none': 'none',
  }],
]

export const placeholder: Rule[] = [
  [
    /^placeholder-opacity-(\d+)$/, ([, d]) => ({
      'placeholder-opacity': h.bracket.percent(d),
    }),
  ],
  [
    /^placeholder-(?!opacity)(.+)$/, (match, config) => {
      match[1] = match[1].replace(/^color-/, '')
      return colorResolver('placeholder-color', 'placeholder-color')(match, config)
    },
  ],
]

const overflowValues = [
  'none',
  'auto',
  'hidden',
  'visible',
  'scroll',
  'contain',
]

export const overscrolls: Rule[] = [
  [/^overscroll-(.+)$/, ([, v]) => overflowValues.includes(v) ? { 'overscroll-behavior': v } : undefined],
  [/^overscroll-([xy])-(.+)$/, ([, d, v]) => overflowValues.includes(v) ? { [`overscroll-behavior-${d}`]: v } : undefined],
]
