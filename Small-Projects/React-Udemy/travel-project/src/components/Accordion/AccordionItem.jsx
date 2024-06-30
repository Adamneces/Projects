import { useAccordionContext } from "./Accordion"

export default function AccordionItem({className, children}) {
    const {openItemId, toggleItem} = useAccordionContext();

    const isOpen = openItemId === id

  return (
    <li className={className}>
      {children}
    </li>
  )
}
