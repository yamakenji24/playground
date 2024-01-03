import { createDom, updateDom } from "./dom";
import type { Element } from "./dom";

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
let deletions: any = null

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
  console.log('workLoop')
  let shouldYield = false
  while (nextUnitOfWork && !shouldYield) {
    console.log('workLooping')
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
  deletions.forEach(commitWork)
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
    
    // @ts-ignore
    nextFiber = nextFiber.parent
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