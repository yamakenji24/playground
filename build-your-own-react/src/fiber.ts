import { createDom } from "./dom";
import type { Element, Props } from "./dom";

type EffectTagType = 'UPDATE' | 'PLACEMENT' | 'DELETION'
export type Fiber =
  | ({
      dom?: HTMLElement | Text
      parent?: Fiber
      child?: Fiber
      sibling?: Fiber
      alternate?: Fiber
      effectTag: EffectTagType
    } & Element)
  | null

let nextUnitOfWork: Fiber = null
let wipRoot: Fiber = null
let currentRoot: Fiber = null
let deletions = null

export function render(element: Element, container: HTMLElement | null) {
  if (!container) {
    return
  };

  wipRoot = {
    dom: container,
    props: {
      children: [element],
    },
    type: element.type,
    alternate: currentRoot,
    effectTag: 'PLACEMENT',
  }
  deletions = []
  nextUnitOfWork = wipRoot
}

function workLoop(deadline: any) {
  let shouldYield = false
  while (nextUnitOfWork && !shouldYield) {
    // @ts-ignore
    nextUnitOfWork = performUnitOfWork(
      nextUnitOfWork
    )
    shouldYield = deadline.timeRemaining() < 1
  }

  if (!nextUnitOfWork && wipRoot) {
    commitRoot()
  }
  requestIdleCallback(workLoop)
}

function commitRoot() {
  // @ts-ignore
  commitWork(wipRoot.child)
  currentRoot = wipRoot
  wipRoot = null
}

function commitWork(fiber: Fiber) {
  if (!fiber) {
    return
  }
  const domParent = fiber?.parent?.dom
  
  if (fiber.effectTag === "PLACEMENT" && fiber.dom != null) {
    domParent?.appendChild(fiber.dom)
  } else if (fiber.effectTag === "UPDATE" && fiber.dom != null) {
    // @ts-ignore
    updateDom(fiber.dom, fiber?.alternate?.props, fiber.props)
  } else if (fiber.effectTag === "DELETION") {
    // @ts-ignore
    domParent.removeChild(fiber.dom)
  }

  // @ts-ignore
  commitWork(fiber.child)
  // @ts-ignore
  commitWork(fiber.sibling)
}

const isEvent = (key: string) => key.startsWith("on")
const isProperty = (key: string) => key !== "children" && !isEvent(key)
const isNew = (prev: Props, next: Props) => (key: string) => prev[key] !== next[key]
const isGone = (_: any, next: Props) => (key: string) => !(key in next)
function updateDom(dom: HTMLElement | Text, prevProps: Props, nextProps: Props) {
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

function performUnitOfWork(fiber: Fiber) {
  if (!fiber) return;
  if (!fiber.dom) {
    fiber.dom = createDom(fiber)
  }

  const elements = fiber.props.children
  reconcileChildren(fiber, elements)

  if (fiber.child) {
    return fiber.child
  }
  let nextFiber = fiber
  while (nextFiber) {
    if (nextFiber.sibling) {
      return nextFiber.sibling
    }
    if (nextFiber.parent) {
      nextFiber = nextFiber.parent
    }
  }
}

requestIdleCallback(workLoop)

function reconcileChildren(wipFiber: Fiber, elements: Element[]) {
  let index = 0
  let oldFiber = wipFiber?.alternate && wipFiber.alternate.child
  let prevSibling: Fiber = null

  while (index < elements.length || oldFiber != null) {
    const element = elements[index]

    let newFiber = null

    const sameType = oldFiber && element && element.type == oldFiber.type;
    if (sameType) {
      newFiber = {
        type: oldFiber?.type,
        props: element.props,
        dom: oldFiber?.dom,
        parent: wipFiber,
        alternate: oldFiber,
        effectTag: "UPDATE",
      } satisfies Fiber
    }
    
    if (element && !sameType) {
      newFiber = {
        type: element.type,
        props: element.props,
        parent: wipFiber,
        effectTag: "PLACEMENT",
      } satisfies Fiber
    }
    
    if (oldFiber && !sameType) {
      oldFiber.effectTag = "DELETION"
      deletions.push(oldFiber)
    }
    
    if (oldFiber) {
      oldFiber = oldFiber.sibling
    }


    if (index === 0) {
      wipFiber!.child = newFiber
    } else {
      prevSibling!.sibling = newFiber
    }

    prevSibling = newFiber
    index++
  }
}