export default function getSearchData(nameSearch, listings) {
  if (nameSearch)
    listings = listings.filter((l) =>
      l.title.toLowerCase().startsWith(nameSearch.toLowerCase())
    );

  // if (numberSearch)
  //   filtered = filtered.filter((m) =>
  //     m.member.phone.toLowerCase().startsWith(numberSearch.toLowerCase())
  //   );

  return listings;
}
