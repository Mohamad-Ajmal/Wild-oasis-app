import React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";

import { useForm } from "react-hook-form";
import { createEditCabin } from "../../services/apiCabins";

function CreateCabinForm({ cabinToEdit = {}}) {
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
  const queryClient = useQueryClient();

  const {mutate: createCabin, isLoading: isCreating} = useMutation({
    mutationFn: createEditCabin,
    onSuccess: () => {
      toast.success("New cabin successfully created");
      queryClient.invalidateQueries({
        queryKey: ['cabins']
      });
      reset();
    },
    onError: (err)=> toast.error(err.message),
  })

  const {mutate: editCabin, isLoading: isEditing} = useMutation({
    mutationFn: ({newCabinData, id}) => createEditCabin(newCabinData, id),
    onSuccess: () => {
      toast.success("cabin successfully edited");
      queryClient.invalidateQueries({
        queryKey: ['cabins']
      });
      reset();
    },
    onError: (err)=> toast.error(err.message),
  })

  const isWorking = isCreating || isEditing;

  function onSubmit(data){
    const image = typeof data.image === "string" ? data.image : data.image[0]

    if(isEditSession)
      editCabin({ newCabinData: {...data, image }, id: editId });
    else
    createCabin({...data, image:image});
  }

  function onError(error){
    // console.log(error)
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
    
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
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isWorking}>{isEditSession ? "Edit Cabin" : "Create new cabin"}</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
