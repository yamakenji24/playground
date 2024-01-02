
export const TEXT_ELEMENT = 'TEXT_ELEMENT' as const
type TagType = string
export type ElementType = typeof TEXT_ELEMENT | TagType | Function

export interface Props {
  nodeValue?: string
  children: Element[]
  [key: string]: any
}
export interface Element {
  type: ElementType
  props: Props
}

function createElement(type: ElementType, props: Props, ...children: Element[]): Element {
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

function render(element: Element, container: HTMLElement | null) {
  if (!container) {
    return
  };

  // @ts-ignore
  const dom = element.type == "TEXT_ELEMENT" ? document.createTextNode("") : document.createElement(element.type)

  const isProperty = (key: string) => key !== "children";
  Object.keys(element.props)
    .filter(isProperty)
    // @ts-ignore
    .forEach(name => dom[name] = element.props[name])
  
  // @ts-ignore
  element.props.children.forEach(child => render(child, dom))


  container.appendChild(dom)
}



const sample = {
  type: 'div',
  props: {
    id: 'foo',
    children: [
      {
        type: 'a',
        props: {
          href: '/',
          target: '_blank',
          children: [
            { type: 'TEXT_ELEMENT', props: { nodeValue: 'link', children: [] } },
            {
              type: 'span',
              props: { id: 'baz', children: [{ type: 'TEXT_ELEMENT', props: { nodeValue: 'hogefuga', children: [] } }] }
            }
          ]
        }
      }
    ]
  }
}

const MyReactDom = {
  createElement,
  render
}

const container = document.getElementById("app")
MyReactDom.render(sample, container)