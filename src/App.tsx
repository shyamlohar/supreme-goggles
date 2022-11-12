import { useMemo, useRef, useState } from "react"
import deleteEntry from "./apis/delete-entry"
import updateEntry from "./apis/update-entry"
import "./App.css"
import SortIcon from "./assets/icons/sort-icon"
import Input from "./components/input/input"
import Pagination from "./components/pagination/pagination"
import TableRow from "./components/table-row/table-row"
import { BASE_URL } from "./config"
import { DataContext } from "./contexts/data-context"
import useDebounce from "./hooks/use-debounce"
import useFetch from "./hooks/use-fetch"
import { useToggle } from "./hooks/use-toggle"
import updateDeepKey from "./utils/update-deep-key"



function App() {
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const debouncedSearchTerm = useDebounce(searchTerm, 150)
  const [isAscSort, toggleDescSort] = useToggle(true)
  const actionStack = useRef<Array<any>>([])

  const order = isAscSort ? "asc" : "desc"

  const searchUrl = useMemo(() => {
    return `${BASE_URL}?sortBy=name&order=${order}&p=${currentPage}&l=6&search=${debouncedSearchTerm}`
  }, [order, debouncedSearchTerm, currentPage])

  const { data: fetchResp, loading, mutate } = useFetch<Array<any>>(searchUrl)

  const handleSearchInputChange = (searchTerm: string) => {
    setSearchTerm(searchTerm)
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const handleUpdateStack = (update: any) => {
    actionStack.current.push(update)
  }

  const handleDelete = async (index: number, entry: any) => {
    /**
     * Optimistically delete entries
     */
    const clonedData = JSON.parse(JSON.stringify(fetchResp))
    clonedData.splice(index, 1)
    mutate(clonedData)

    /**
     * If we fail to update add entry back to table after notifying user
     */
    const deleteresp = await deleteEntry(entry.id)
    if (!deleteresp) {
      alert("Failed to delete entry. Please try again later")
      clonedData.splice(index, 0, entry)
      mutate(clonedData)
    }
  }

  const handleDescriptionUpdate = async (
    index: number,
    keyDepth: number,
    updatedValue: string,
    entry: any
  ) => {
    /**
     * Optimistically delete entries
     */
    const clonedData = JSON.parse(JSON.stringify(fetchResp))
    const updatedEntry = updateDeepKey(
      keyDepth,
      "item",
      "description",
      clonedData[index],
      updatedValue
    )
    clonedData.splice(index, 1, updatedEntry)
    mutate(clonedData)

    const updateResp = await updateEntry(entry.id, updatedEntry)
    if (!updateResp) {
      alert("Failed to update Entry. Please try again")
      clonedData.splice(index, 1, entry)
      mutate(clonedData)
    }
  }

  return (
    <div className="App">
      <DataContext.Provider
        value={{
          updateStack: handleUpdateStack,
          onDelete: handleDelete,
          onUpdate: handleDescriptionUpdate,
        }}
      >
        <div className="container">
          <div className="table-actions-container">
            <Input
            placeholder="Enter a keyword"
              label="Search"
              id="search-input"
              value={searchTerm}
              onChange={(e) => handleSearchInputChange(e.target.value)}
            />
          </div>
          <div className="row">
            <div className="heading">Id</div>
            <div className="heading">CreatedAt</div>
            <div className="heading with-icon" onClick={toggleDescSort}>
              <span>Name</span>
              <SortIcon/>
            </div>
            <div className="heading">Updated At</div>
            <div className="heading">Description</div>
            <div className="heading">Type</div>
            <div className="heading">Test</div>
          </div>
          {loading &&  <div className="loader">Fetching data....</div> }
          {!loading &&
            fetchResp &&
            fetchResp.map((entry, index) => {
              return (
                <TableRow
                  key={entry.id}
                  nestingLevel={0}
                  data={entry}
                  index={index}
                />
              )
            })}
          <div className="footerActionsContainer">
            <Pagination currentPage={currentPage} onChange={handlePageChange} />
          </div>
        </div>
      </DataContext.Provider>
    </div>
  )
}

export default App
