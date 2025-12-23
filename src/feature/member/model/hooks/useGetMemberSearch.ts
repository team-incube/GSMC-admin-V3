import { useQuery } from "@tanstack/react-query";
import { getMemberSearch } from "../../api/getMemberSearch";
import { MemberSearchParams } from "../types";

export const useGetMemberSearch = (searchParams: MemberSearchParams) => {
  return useQuery({
    queryKey: ['members', searchParams],
    queryFn: () => getMemberSearch(searchParams),
  });
};