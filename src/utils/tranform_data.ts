import { ItemData } from '../types/response_data.type'
import { TableData } from '../types/table_data.type'

export const transformData = (data: ItemData) => {
  const excludeKeys = ['question', 'p_value', 'rpbis', 'difficulty']
  return Object.entries(data)
    .filter(([key, _]) => !excludeKeys.includes(key)) // Filter out nested objects
    .map(([key, value]): TableData => {
      return {
        label: key, // Add the key as a label
        ...value, // Use the value from the item
      }
    })
}
