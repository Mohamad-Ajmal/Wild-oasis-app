import { useQuery } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";

export function useBookings(){
    const [searchParams] = useSearchParams();

    // 1) Filter
    const filterValue = searchParams.get("status");
    const filter = !filterValue || filterValue === "all" 
    ? null 
    : {field: "status", value: filterValue}
    // {field: "status", value: filterValue, method: "gte"}

    // 2) Sort

  const sortByzRaw = searchParams.get("sortBy") || "startDate-desc";
  const [field, direction] =  sortByzRaw.split("-");
  const sortBy = {field, direction};




    const {isLoading, data: bookings, error} = useQuery({
        queryKey: ['bookings', filter, sortBy],
        queryFn: ()=> getBookings({filter,sortBy}),
      })
    return {isLoading, bookings, error};
}