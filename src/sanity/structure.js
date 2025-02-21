// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure = (S) =>
  S.list()
    .title('Bakery')
    .items([
      S.documentTypeListItem('cake').title('Cakes'),
      S.documentTypeListItem('category').title('Categories'),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (item) => item.getId() && !['cake', 'category'].includes(item.getId()),
      ),
    ])
