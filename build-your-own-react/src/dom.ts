
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

  return dom
}