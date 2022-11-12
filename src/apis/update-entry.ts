import { BASE_URL } from "../config"

/**
 * Update entry in database
 * NOTE: we have type of data as any it can be improved but given that its just a demo
 * app i have kept it as any to move fast
 * @param entryId
 * @param data
 * @returns
 */
const updateEntry = async (entryId: string, data: any): Promise<any> => {
  try {
    const resp = await fetch(
      `${BASE_URL}/${entryId}`,
      {
        method: "PUT",
        body: JSON.stringify(data),
      }
    )
    return await resp.json()
  } catch (error) {
    return null
  }
}

export default updateEntry
