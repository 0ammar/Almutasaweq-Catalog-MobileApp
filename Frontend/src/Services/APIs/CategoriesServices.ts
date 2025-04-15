import { api } from "@/Services/api";
import { Group, SubOne, SubTwo, SubThree } from '@/Types'

export const getGroups = async (): Promise<Group[]> => {
  try {
    const response = await api.get<Group[]>("/api/groups");
    return response.data;
  } catch (err) {
    console.error("Error fetching groups:", err);
    return [];
  }
};

export const getSubOnes = async (groupId: number): Promise<SubOne[]> => {
  try {
    const response = await api.get<SubOne[]>(`/api/subones/${groupId}`);
    return response.data;
  } catch (err) {
    console.error("Error fetching SubOnes:", err);
    return [];
  }
};

export const getSubTwos = async (subOneId: number): Promise<SubTwo[]> => {
  try {
    const response = await api.get<SubTwo[]>(`/api/subtwos/${subOneId}`);
    return response.data;
  } catch (err) {
    console.error("Error fetching SubTwos:", err);
    return [];
  } 
};

export const getSubThrees = async (subTwoId: number): Promise<SubThree[]> => {
  try {
    const response = await api.get<SubThree[]>(`/api/subthrees/${subTwoId}`);
    return response.data;
  } catch (err) {
    console.error("Error fetching SubThrees:", err);
    return [];
  }
};