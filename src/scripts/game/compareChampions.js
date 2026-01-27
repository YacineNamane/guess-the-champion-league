import { compareValue } from "./compareValue.js";
export function compareChampions(inputChampion, secretChampion) {
  return {
    gender: compareValue(inputChampion.gender, secretChampion.gender),
    species: compareValue(inputChampion.species, secretChampion.species),
    region: compareValue(inputChampion.region, secretChampion.region),
    lane: compareValue(inputChampion.lane, secretChampion.lane),
    resource: compareValue(inputChampion.resource, secretChampion.resource),
    rangeType: compareValue(inputChampion.rangeType, secretChampion.rangeType),
    esportPresence: compareValue(
      inputChampion.esportPresence,
      secretChampion.esportPresence,
    ),
    tags: compareValue(inputChampion.tags, secretChampion.tags),
  };
}
