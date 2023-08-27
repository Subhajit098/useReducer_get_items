import React,{useReducer,useRef,useState} from 'react'
import { INITIAL_STATE,formReducer } from './useReducer/FormReducer'


export default function Form() {

    const [state,dispatch]=useReducer(formReducer,INITIAL_STATE);

    const tagRef = useRef()

    const handleChange = (e)=>{
        dispatch({
            type:"CHANGE_INPUT",
            payload:{name: e.target.name,value:e.target.value}
        });
    }

    console.log(state);

    const handleTags=()=>{
        const tags=tagRef.current.value.split(",");
        tags.forEach(tag=>{
            dispatch({type:"ADD_TAG",payload:tag})
        })
    }

  return (
    <>
        <form>
        <input
          type="text"
          placeholder="Title"
          onChange={handleChange}
          name="title"
        />
        <input
          type="text"
          placeholder="Desc"
          onChange={handleChange}
          name="desc"
        />
        <input
          type="number"
          placeholder="Price"
          onChange={handleChange}
          name="price"
        />
        <p>Category:</p>
        <select onChange={handleChange}  name="category">
          <option value="sneakers">Sneakers</option>
          <option value="tshirts">T-shirts</option>
          <option value="jeans">Jeans</option>
        </select>
        <p>Tags:</p>
        <textarea
          placeholder="Seperate tags with commas..." ref={tagRef}
        ></textarea>
        <button onClick={handleTags}  type="button">
          Add Tags
        </button>
        <div className="tags">
           {state.tags.map(tag=>(
            <small onClick={()=>dispatch({type:"REMOVE_TAGS",payload:tag})}  key={tag} >
                {tag}
            </small>
           ))}
          
        </div>
        <div className="quantity">
          <button  onClick={()=>dispatch({type:"DECREASE"})} type="button">
            -
          </button>
          <span>Quantity</span>
          <button onClick={()=>dispatch({type:"INCREASE"})}  type="button">
            +
          </button>
        </div>
      </form>

    </>
  )
}
