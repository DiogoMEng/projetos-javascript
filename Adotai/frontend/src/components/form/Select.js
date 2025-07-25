import styles from "./Select.module.css";

function Select ({ text, name, options, handleOnChange, value }) {

  return (
    <di className={styles.form_control}>
      <label htmlFor={name}>{text}:</label>
      <select name={name} id={name} onChange={handleOnChange} value={value || ""}>
        <option>Selecione uma opção</option>
        {options.map((option) => (
          <option value={option} key={option}>
            {option}
          </option>
        ))}
      </select> 
    </di>
  )

}

export default Select;