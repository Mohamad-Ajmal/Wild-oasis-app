import React from "react";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";

import { useForm } from "react-hook-form";
import { useCreateCabin } from "./useCreateCabin";
import { useEditCabin } from "./useEditCabin";

function CreateCabinForm({ cabinToEdit = {}, onCloseModel}) {
  const {isCreating, createCabin} = useCreateCabin();
  const {isEditing, editCabin} = useEditCabin();
  const {id:editId, ...editValues } = cabinToEdit;
  const isEditSession = Boolean(editId)
  const {
    register, 
    handleSubmit, 
    reset, 
    getValues, 
    formState
  } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });
  const {errors} = formState;

  const isWorking = isCreating || isEditing;

  function onSubmit(data){
    const image = typeof data.image === "string" ? data.image : data.image[0]

    if(isEditSession)
      editCabin({ newCabinData: {...data, image }, id: editId },{
        onSuccess: (data) => {
          reset();
          onCloseModel?.();
        },
    });
    else
    createCabin({...data, image:image},{
      onSuccess: (data) => {
        reset();
        onCloseModel?.();
      },
  });
  }

  function onError(error){
    // console.log(error)
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)} type={onCloseModel ? "model" : "regular"}>
    
      <FormRow label="Cabin name" error={errors?.name?.message}>
        <Input type="text" id="name" disabled={isWorking} {...register("name" ,{required: "This filed is required"})} />
      </FormRow>
      <FormRow label="Maximum capacity" error={errors?.maxCapacity?.message}>
        <Input type="number" id="maxCapacity"  {...register("maxCapacity",{required: "This filed is required", min: {value:1, message: "Capacity should be at least 1",}})}/>
      </FormRow>

      <FormRow label="Regular Price" error={errors?.name?.message}>
        <Input type="number" id="regularPrice" disabled={isWorking} {...register("regularPrice" ,{required: "This filed is required", min: {value:1, message: "Regular Price should be at least 1",}})} />
      </FormRow>

      <FormRow label="Discount" error={errors?.discount?.message}>
        <Input type="number" id="discount" disabled={isWorking} defaultValue={0} {...register("discount" ,{required: "This filed is required", validate: (value) => value <= getValues().regularPrice || "Discount should be less than the regular price"})}/>
      </FormRow>

      <FormRow label="Description for website" error={errors?.description?.message}>
        <Textarea type="number" id="description" disabled={isWorking} defaultValue="" {...register("description" ,{required: "This filed is required"})}/>
      </FormRow>

      <FormRow label="Cabin photo" >
      <FileInput 
        id="image" 
        type="file" 
        accept="image/*" 
        {...register("image" ,{required: isEditSession ? false : "This filed is required"})}
      />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset" onClick={() => onCloseModel?.()}>
          Cancel
        </Button>
        <Button disabled={isWorking}>{isEditSession ? "Edit Cabin" : "Create new cabin"}</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
