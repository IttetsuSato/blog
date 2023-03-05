---
to: <%= directory %>/<%= h.changeCase.pascal(directory_name) %>/<%= h.changeCase.pascal(component_name) %>.tsx
---

export type <%= h.changeCase.pascal(component_name) %>Props = {
  //
}

export const <%= h.changeCase.pascal(component_name) %>: <%= h.changeCase.pascal(component_name) %>Props = ({}) => {
  return (
    //
  )
}