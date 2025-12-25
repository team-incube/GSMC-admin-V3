import { useQuery } from "@tanstack/react-query";
import { getMemberSearch } from "../../api/getMemberSearch";
import { MemberSearchParams } from "../types";

export const useGetMemberSearch = (searchParams: MemberSearchParams, enabled: boolean = true) => {
  return useQuery({
    queryKey: ['members', searchParams],
    queryFn: () => getMemberSearch(searchParams),
    enabled,
  });
};