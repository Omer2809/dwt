import _ from "lodash/array";

export default function getTrendingData(items) {
  return _.slice(items, 0, Math.min(10, items.length)).reverse();
}
