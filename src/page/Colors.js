import Header from '../features/header/HeaderColors'
import ColorList from '../features/colors/ColorList'
import {selectAllColors} from '../features/colors/colorsSlice'
import { useSelector } from 'react-redux'
import React, {useState} from 'react'
import {capitalize} from '../features/filters/colors'
import {Routes, Route, Link } from 'react-router-dom'
import CreateColor from '../page/CreateColor'



function Colors(){
  const colorsObj = useSelector(selectAllColors)

  const [list, setList] = useState(colorsObj)

  const [text, setText] = useState('')

    const handleSubmit = () => {
        const colors = []
        console.log('text',capitalize(text))
        colorsObj.forEach((color)=>{
          if(color.name == capitalize(text)) {
            return colors.push(color)
          }
        })
        setList(colors)
        console.log('searched',colors)
        setText('')
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

              <header>
            <Link to='/colors/create'>
            <button 
                className="button"
                style={{margin:15}}
            >
                +
            </button>
            </Link>
            
            <form>
                <div style={{float:'left', padding:18}}>
                    <input
                        placeholder='What color are you looking for?'
                        type="text" 
                        value={text}
                        autoFocus={true}
                        onChange={(e) => {setText(e.target.value)}}
                        style={{width:'100%', padding:10}}
                        required
                    />
                </div>    
                
                <button 
                    className="button"
                    type="submit"
                    style={{margin:15}}
                    onClick={handleSubmit}
                >
                    Search
                </button>
            </form> 
            
        <Routes>
            <Route path='/colors/create' element={<CreateColor/>}/>
        </Routes>
        </header>

                <ColorList value={list}/>
              </div>
            </section>
          </main>
        </div>
    )
}
export default Colors