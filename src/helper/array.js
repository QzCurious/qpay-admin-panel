export function rename_key(arr) {
  return arr.map((item) => {
    if (!("items" in item)) {
      return item
    }

    const new_item = { ...item }
    new_item.children = rename_key(new_item.items)
    delete new_item.items
    return new_item
  })
}
