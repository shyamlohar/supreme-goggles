import React, { ReactNode } from "react"
import styles from "./input.module.scss"

type Props = {
  label: ReactNode
} & React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>

const Input = ({ label, id, ...props }: Props) => {
  return (
    <div className={styles.inputContainer}>
      <label htmlFor="id">{label}</label>
      <input id={id} type="text" {...props} />
    </div>
  )
}

export default Input
