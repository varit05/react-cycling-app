import React from "react";
import { Icycling } from "../interface/cycle.interface";

class AccordionItem extends React.Component<Icycling> {
  state = {
    opened: false
  };

  render() {
    const {
      props,
      state: { opened }
    } = this;

    const {
      ActivityType,
      Title,
      Date,
      Distance,
      Time,
      MaxSpeed,
      AvgSpeed
    } = props;
    return (
      <div
        {...{
          className: `accordion-item, ${opened && "accordion-item--opened"}`,
          onClick: () => {
            this.setState({ opened: !opened });
          }
        }}
      >
        <div {...{ className: "accordion-item__line" }}>
          <h3 {...{ className: "accordion-item__title" }}>
            {Title} <span className="text-base ml-3">{Date}</span>
          </h3>
          <span {...{ className: "accordion-item__icon" }} />
        </div>
        <div {...{ className: "accordion-item__inner" }}>
          <div {...{ className: "accordion-item__content" }}>
            <h2 {...{ className: "accordion-item__paragraph" }}>
              Activity Type: {ActivityType}
            </h2>
            <p {...{ className: "accordion-item__paragraph" }}>
              Distance: {Distance} Miles
            </p>
            <p {...{ className: "accordion-item__paragraph" }}>
              Maximum Speed: {MaxSpeed} Miles
            </p>
            <p {...{ className: "accordion-item__paragraph" }}>
              Avereage Speed: {AvgSpeed} Miles
            </p>
            <p {...{ className: "accordion-item__paragraph" }}>Time: {Time}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default AccordionItem;
