import React, { useEffect, useState } from "react";
import { useTitle } from "hookrouter";
import AccordionItem from "./../widgets/AccordionItem";
import { getData } from "../services/cycle.service";
import { Icycling } from "../interface/cycle.interface";

function History() {
  const [historyData, setHistoryData]: [Icycling[], Function] = useState([]);
  useTitle("History");

  useEffect(() => {
    async function fetchData() {
      const response = await getData();
      setHistoryData(response);
    }
    fetchData();
  }, []);

  return (
    <div {...{ className: "wrapper w-full mb-12" }}>
      <ul {...{ className: "accordion-list" }}>
        {historyData.map((data: Icycling, key: number) => {
          return (
            <li {...{ className: "accordion-list__item", key }}>
              <AccordionItem {...data} />
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default History;
