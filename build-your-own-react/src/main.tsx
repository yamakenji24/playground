import { TEXT_ELEMENT, createElement } from "./dom"
import { render } from "./fiber"


const MyReactDom = {
  createElement,
  render
}

const element = MyReactDom.createElement(
  "div",
  {id: "foo", children: []},
  MyReactDom.createElement("a", {children: []}, {type: TEXT_ELEMENT, props: {children: [], nodeValue: "bar"}}),
  MyReactDom.createElement("p", {children: []}, {type: TEXT_ELEMENT, props: {children: [], nodeValue: "foo"}})
)
console.log('element: ', element)

const container = document.getElementById("app")
MyReactDom.render(element, container)