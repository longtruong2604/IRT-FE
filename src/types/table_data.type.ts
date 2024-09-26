import { GroupValues, ItemData } from './response_data.type'

export type TableData = GroupValues & { label: keyof ItemData }
