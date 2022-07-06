import React, { useState } from 'react'
import { useSelector , useDispatch } from 'react-redux'
import { addTodo } from '../todos/todosSlice'
import { selectAllColors } from '../colors/colorsSlice'

import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup";
import {schema} from './validate'

function Header(){
    const [status, setStatus] = useState('idle')
    const dispatch = useDispatch()

    

    const { register, handleSubmit, formState: { errors }, reset, setFocus } = useForm({
        resolver: yupResolver(schema),
    })

    React.useEffect(() => {
        setFocus("text")
    }, [setFocus])

    const onSubmitHandler = (data) => {
        console.log({ data });
        const aNewTodo= {
            text: data.text.trim(),
            color: data.color
        }
       
        setStatus('loading')
        dispatch(addTodo(aNewTodo))
        reset();
        setStatus('idle')
        setFocus("text")
    }

    const colorsList = useSelector(selectAllColors)
    const convertedColors = colorsList.map(color => color.name)
    const colorOptions = convertedColors.map((c) => (
        <option key={c} value={c}>
        {c}
        </option>
    ))


    let isLoading = status === 'loading'
    let placeholder = isLoading ? '' : 'What needs to be done?'
    let loader = isLoading ? <div className="loader" /> : null

    return (
        <header className="header">
            <form onSubmit={handleSubmit(onSubmitHandler)}>

                <div style={{float:'left'}}>
                    <input {...register("text")} 
                        placeholder={placeholder} 
                        type="text" 
                        className="new-todo"
                        disabled={isLoading}
                    />
                    <p className='error' style={{marginLeft:16}}>{errors.text?.message}</p>
                </div>

                <div style={{float:'left'}}>
                    <select
                        {...register("color")}
                        className="colorPicker"
                        style={{marginTop:20}}
                    >
                        <option value=""></option>
                        {colorOptions}
                        
                    </select>
                    <p className='error'>{errors.color?.message}</p>
                </div>

                <div style={{float:'right'}}>
                    <button 
                        className="button"
                        type="submit"
                        style={{margin:10}}
                    >
                        Add
                    </button>
                </div>
                
            </form> 
            
            {loader}

        </header>
    )
}

export default Header
