import Header from '../features/header/HeaderColors'
import ColorList from '../features/colors/ColorList'
import {selectAllColors} from '../features/colors/colorsSlice'
import { useSelector } from 'react-redux'
import React, {useState} from 'react'


function Colors(){
  const colorsObj = useSelector(selectAllColors)

  const [list, setList] = useState(colorsObj)

  //const [text, setText] = useState('')

    const handleSubmit = (text) => {
        const colors = []
        console.log('text',text)
        colorsObj.forEach((color)=>{
          if(color.name === text) {
            return colors.push(color)
          }
        })
        setList(colors)
        console.log('searched',colors)
        //setText('')
    }
  
    React.useEffect(()=>{
      setList(colorsObj)
    },[colorsObj])

    return (
        <div className="App">
          <main>
            <section className="medium-container">
              <h2>Colors</h2>
              <div className="todoapp">

                <Header onChange={handleSubmit}/>

                <ColorList value={list}/>
              </div>
            </section>
          </main>
        </div>
    )
}
export default Colors