import React, { useState } from 'react'
import Button from "../../ui/Button"
import Model from "../../ui/Modal";
import CreateCabinForm from './CreateCabinForm';


export default function AddCabin() {
    const [isOpenModel, setIsOpenModel] = useState(false);

  return (
    <div>
       <Button onClick={()=>setIsOpenModel((show)=> 
        !show)}>
            Add new cabin
        </Button>
       {isOpenModel && 
        <Model onClose={()=>setIsOpenModel(false)}>
            <CreateCabinForm onCloseModel={()=>setIsOpenModel(false)} />
        </Model> 
        }
    </div>
  )
}
