// eslint-disable-next-line no-unused-vars
import React from 'react';
import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import Spinner from '../../ui/Spinner';

import { useSettings } from './useSettings';
import { useUpdateSetting } from './useUpdatetSetting';

function UpdateSettingsForm() {
  const {isLoading, settings:{
    minBookingsLength,
    maxBookingLength,
    maxGuestsPerBooking,
    breakfastPrice,

  } = {}} = useSettings();

  const {isUpdating, updateSetting} = useUpdateSetting();

  function handleUpdate(e, field){
    const { value } = e.target;
    if(!value) return;
    updateSetting({[field]: value});
  }

  if(isLoading) return <Spinner />
  return (
    <Form>
      <FormRow label='Minimum nights/booking'>
        <Input type='number' id='min-nights' defaultValue={minBookingsLength} disabled={isUpdating}   onBlur={(e)=>handleUpdate(e, "minBookingsLength")} />
      </FormRow>

      <FormRow label='Maximum nights/booking'>
        <Input type='number' id='max-nights'  defaultValue={maxBookingLength} disabled={isUpdating}   onBlur={(e)=>handleUpdate(e, "maxBookingLength")}/>
      </FormRow>

      <FormRow label='Maximum guests/booking'>
        <Input type='number' id='max-guests'  defaultValue={maxGuestsPerBooking} disabled={isUpdating}   onBlur={(e)=>handleUpdate(e, "maxGuestsPerBooking")}/>
      </FormRow>

      <FormRow label='Breakfast price'>
        <Input type='number' id='breakfast-price' defaultValue={breakfastPrice} disabled={isUpdating}   onBlur={(e)=>handleUpdate(e, "breakfastPrice")} />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
