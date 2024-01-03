
export const TEXT_ELEMENT = 'TEXT_ELEMENT' as const
type TagType = string
export type ElementType = typeof TEXT_ELEMENT | TagType | Function

export interface Props {
  nodeValue?: string
  children: Element[]
  [key: string]: any
}
export interface Element {
  type?: ElementType
  props: Props
}

export function createElement(type: ElementType, props: Props, ...children: Element[]): Element {
  return {
    type,
    props: {
      ...props,
      children: children.map(child => typeof child === "object" ? child : createTextElement(child)),
    },
  }
}

function createTextElement(text: string): Element {
  return {
    type: "TEXT_ELEMENT",
    props: {
      nodeValue: text,
      children: [],
    },
  }
}

export function createDom(element: Element) {
  // @ts-ignore
  const dom = element.type == "TEXT_ELEMENT" ? document.createTextNode("") : document.createElement(element.type)

  const isProperty = (key: string) => key !== "children";
  Object.keys(element.props)
    .filter(isProperty)
    // @ts-ignore
    .forEach(name => dom[name] = element.props[name])

  updateDom(dom, {children: []}, element.props)

  return dom
}

const isEvent = (key: string) => key.startsWith("on")
const isProperty = (key: string) => key !== "children" && !isEvent(key)
const isNew = (prev: Props, next: Props) => (key: string) => prev[key] !== next[key]
const isGone = (_: any, next: Props) => (key: string) => !(key in next)
export function updateDom(dom: HTMLElement | Text, prevProps: Props, nextProps: Props) {
  Object.keys(prevProps)
    .filter(isEvent)
    .filter(
      key =>
        !(key in nextProps) ||
        isNew(prevProps, nextProps)(key)
    )
    .forEach(name => {
      const eventType = name
        .toLowerCase()
        .substring(2)
      dom.removeEventListener(
        eventType,
        prevProps[name]
      )
    })

  // Remove old properties
  Object.keys(prevProps)
    .filter(isProperty)
    .filter(isGone(prevProps, nextProps))
    // @ts-ignore
    .forEach(name => dom[name] = "")
    
  // Set new or changed properties
  Object.keys(nextProps)
    .filter(isProperty)
    .filter(isNew(prevProps, nextProps))
    // @ts-ignore
    .forEach(name => dom[name] = nextProps[name])

  // Add event listeners
  Object.keys(nextProps)
    .filter(isEvent)
    .filter(isNew(prevProps, nextProps))
    .forEach(name => {
      const eventType = name
        .toLowerCase()
        .substring(2)
      dom.addEventListener(
        eventType,
        nextProps[name]
      )
    })
}