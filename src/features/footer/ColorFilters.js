import { selectAllColors } from '../colors/colorsSlice'
import { useSelector } from 'react-redux'

function ColorFilters ({ value: colors, onChange }){
  const colorsObj = useSelector(selectAllColors)

  //const convertedColors = colorsObj.map(color => color.name)
  //const dispatch = useDispatch()

  const renderedColors = colorsObj.map((color) => {
    const checked = colors.includes(color.name)
    const handleChange = () => {
      const changeType = checked ? 'uncheck' : 'checked'
      //dispatch(filteredColors(color.name,changeType))
      onChange(color.name,changeType)
    }



    return (
      <label key={color.name}>
        <input
          type="checkbox"
          name={color.name}
          checked={checked}
          onChange={handleChange}
        />
        <span
          className="color-block"
          style={{
            backgroundColor: color.name,
          }}
        ></span>
        {color.name}
      </label>
    )
  })

  return (
    <div className="filters colorFilters">
      <h5>Filter by Color</h5>
      <form className="colorSelection">{renderedColors}</form>
    </div>
  )
}
 
export default ColorFilters