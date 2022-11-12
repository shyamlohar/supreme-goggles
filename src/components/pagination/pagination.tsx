import styles from "./pagination.module.scss"

type Props = {
    currentPage: number
    onChange: (page: number) => void
}

const Pagination = ({currentPage, onChange}: Props) => {

  const handlePaginationButtonClick = (action : "next" | "prev") => {
    const updatedPage = action === "next" ? currentPage + 1 : currentPage - 1
    onChange(updatedPage)
  }


  return (
    <div className={styles.pagination}>
       {<button disabled={currentPage <= 1 } onClick={() => handlePaginationButtonClick("prev")}>Previous Page</button>}
        {currentPage}
        <button onClick={() => handlePaginationButtonClick("next")}>Next Page</button>
    </div>
  )
}

export default Pagination