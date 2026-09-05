import { useEffect, useState } from "react";
import { getPeopleData, loadPeopleData, subscribePeopleData } from "@/data/people-store";
import type { Person } from "@/data/people";

export function usePeopleData() {
  const [data, setData] = useState(getPeopleData);
  useEffect(() => {
    loadPeopleData().then(setData).catch(() => undefined);
    return subscribePeopleData(() => setData(getPeopleData()));
  }, []);
  return data;
}

export function usePerson(kind: "cast" | "crew", slug: string) {
  const data = usePeopleData();
  const list = kind === "cast" ? data.cast : data.crew;
  return { person: list.find((p) => p.slug === slug), others: list.filter((p) => p.slug !== slug) } as {
    person?: Person;
    others: Person[];
  };
}
