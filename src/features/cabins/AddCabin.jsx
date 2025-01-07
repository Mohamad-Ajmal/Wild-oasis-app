import React from 'react'
import Button from "../../ui/Button"
import Modal from "../../ui/Modal";
import CreateCabinForm from './CreateCabinForm';


export default function AddCabin() {
  return (
  <Modal>
    <Modal.Open opens="cabin-form">
      <Button>Add New Cabin</Button>
    </Modal.Open>
    <Modal.Window name="cabin-form">
      <CreateCabinForm />
    </Modal.Window>
  </Modal>
  )
}

// export default function AddCabin() {
//     const [isOpenModel, setIsOpenModel] = useState(false);

//   return (
//     <div>
//        <Button onClick={()=>setIsOpenModel((show)=> 
//         !show)}>
//             Add new cabin
//         </Button>
//        {isOpenModel && 
//         <Model onClose={()=>setIsOpenModel(false)}>
//             <CreateCabinForm onCloseModel={()=>setIsOpenModel(false)} />
//         </Model> 
//         }
//     </div>
//   )
// }
