import ColorItem from './ColorItem'

function ColorList({value: colorsObj}){
    //const colorsObj = useSelector(selectAllColors)
    const renderedColorItems = colorsObj.map(color => {
        return <ColorItem key={color.id} id={color.id} name={color.name} />
    })
    return(
        <div>
            <table className='tblColors'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Edit</th>
                        <th>Del</th>
                    </tr>
                </thead>
                <tbody>
                    {renderedColorItems}
                </tbody>
            </table>
        </div>
    )

}

export default ColorList