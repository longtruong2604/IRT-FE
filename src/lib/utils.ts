import { ItemData } from '@/types/response_data.type'
import { TableData } from '@/types/table_data.type'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export const transformData = (data: ItemData) => {
  const excludeKeys = ['question', 'p_value', 'rpbis', 'difficulty']
  return Object.entries(data)
    .filter(([key, _]) => !excludeKeys.includes(key))
    .map(([key, value]): TableData => {
      return {
        label: key,
        ...value,
      }
    })
}

export const normalizePath = (path: string) => {
  return path.startsWith('/') ? path.slice(1) : path
}
