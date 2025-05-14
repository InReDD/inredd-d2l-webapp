import { Item } from "..";
import { Accordion } from "@/components";
import { accordion } from "./utilProps";

export default function AccordionDoc() {

  const code = () => `import { Accordion } from "@/components";

<div style={{ width: "425px", height: "200px", margin: "10px" }}>
  <Accordion summary={"Lorem ipsum dolor sit amet"}>
    Lorem ipsum litora lorem elit rhoncus 
    massa taciti massa augue, 
    et lectus at laoreet congue 
    euismod molestie morbi, 
  </Accordion>
  <Accordion summary={"Lorem ipsum dolor sit amet"}>
    Lorem ipsum litora lorem elit rhoncus 
    massa taciti massa augue, 
    et lectus at laoreet congue 
    euismod molestie morbi
  </Accordion>
  <Accordion summary={"Lorem ipsum dolor sit amet"}>
    Lorem ipsum litora lorem elit rhoncus 
    massa taciti massa augue, 
    et lectus at laoreet congue 
    euismod molestie morbi     
  </Accordion>
</div>

  `

  return (
    <Item
      name={"Accordion"}
      description={"Accordion"}
      props={accordion}
      code={code()}
    >
      <div style={{ width: "425px", height: "200px"}}>

        <Accordion summary={"Lorem ipsum dolor sit amet"}>
          Lorem ipsum litora lorem elit rhoncus massa taciti massa augue, et lectus at laoreet congue euismod molestie morbi, hendrerit lectus justo neque nisi sociosqu lobortis erat. ut tempor etiam cubilia tempor viverra convallis euismod fermentum, curabitur purus erat placerat quisque inceptos donec faucibus, posuere conubia eget eleifend habitant
        </Accordion>
        <Accordion summary={"Lorem ipsum dolor sit amet"}>
          Lorem ipsum litora lorem elit rhoncus massa taciti massa augue, et lectus at laoreet congue euismod molestie morbi, hendrerit lectus justo neque nisi sociosqu lobortis erat. ut tempor etiam cubilia tempor viverra convallis euismod fermentum, curabitur purus erat placerat quisque inceptos donec faucibus, posuere conubia eget eleifend habitant
        </Accordion>
        <Accordion summary={"Lorem ipsum dolor sit amet"}>
          Lorem ipsum litora lorem elit rhoncus massa taciti massa augue, et lectus at laoreet congue euismod molestie morbi, hendrerit lectus justo neque nisi sociosqu lobortis erat. ut tempor etiam cubilia tempor viverra convallis euismod fermentum, curabitur purus erat placerat quisque inceptos donec faucibus, posuere conubia eget eleifend habitant
        </Accordion>
      </div>
    </Item>
  )
}