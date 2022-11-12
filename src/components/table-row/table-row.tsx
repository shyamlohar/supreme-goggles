import { useContext } from "react"
import DeleteIcon from "../../assets/icons/delete-icon"
import ExpandIcon from "../../assets/icons/expand-icon"
import { DataContext } from "../../contexts/data-context"
import { useToggle } from "../../hooks/use-toggle"
import { formateDate } from "../../utils/formate-date"
import Input from "../input/input"

const TableRow = ({ data, nestingLevel, index }: any) => {
  const { createdAt, name, updatedAt, description, type, id, test, item } = data
  const { onDelete, onUpdate } = useContext(DataContext)
  const [descriptionEditMode, toggleDescEditMode] = useToggle()
  const [rowExpanded, toggleExpand] = useToggle()

  const handleDescInputBlur = (
    index: number,
    updatedValue: string,
    entry: any
  ) => {
    onUpdate(index, nestingLevel, updatedValue, entry)
    toggleDescEditMode()
  }

  const handleDelete = (index: number, entry: any) => {
    const resp = confirm("Do tou want to delete it?")
    if (resp) {
      onDelete(index, entry)
    }
  }

  const handleDescriptionEdit = () => {
    toggleDescEditMode()
  }

  return (
    <>
      <div
        className="row-container"
        style={
          { "--indent-size": `${nestingLevel * 26}px` } as React.CSSProperties
        }
      >
        {item && (
          <button onClick={toggleExpand} className="expand-button">
            <ExpandIcon />
          </button>
        )}
        <div className="row">
          <div className="cell">{id}</div>
          <div className="cell">{formateDate(createdAt)}</div>
          <div className="cell">{name}</div>
          <div className="cell">{formateDate(updatedAt)}</div>
          {!descriptionEditMode && (
            <div className="cell" onClick={handleDescriptionEdit}>
              {description}
            </div>
          )}
          {descriptionEditMode && (
            <Input
              label=""
              id={`inline-edit-${index}`}
              defaultValue={description}
              onBlur={(e) => handleDescInputBlur(index, e.target.value, data)}
            />
          )}
          <div className="cell">{type}</div>
          <div className="cell">{test}</div>
        </div>
        <button
          onClick={() => handleDelete(index, data)}
          className="delete-button"
        >
          <DeleteIcon />
        </button>
      </div>
      {rowExpanded && item && (
        <TableRow data={item} nestingLevel={nestingLevel + 1} index={index} />
      )}
    </>
  )
}

export default TableRow
