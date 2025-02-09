import styled from "styled-components";
import Spinner from '../../ui/Spinner';

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;


import React from 'react'
import { useRecentBookings } from "./useRecentBookings";
import { useRecentStays } from "./useRecentStays";

export default function DashboardLayout() {
  const {bookings, isLoading: isLoading1 } = useRecentBookings();
  const {stys, confirmedStays, isLoading: isLoading2} = useRecentStays();

  if(isLoading1 || isLoading2) return <Spinner />

  return (
    <StyledDashboardLayout>
      <div>Statistics</div>
      <div>Today's activity</div>
      <div>Chart stay duration</div>
      <div>Chart sales</div>
    </StyledDashboardLayout>
  )
}
