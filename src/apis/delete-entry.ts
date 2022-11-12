import { BASE_URL } from "../config"

/**
 * Delete single entry from table 
 * @param entryId 
 * @returns 
 */
const deleteEntry = async (entryId: string): Promise<any> => {
  try {
    const resp = await fetch(
        `${BASE_URL}/${entryId}`,
        {
          method: "DELETE",
        }
      )
      return await resp.json()
  } catch (error) {
    return null
  }
}

export default deleteEntry
