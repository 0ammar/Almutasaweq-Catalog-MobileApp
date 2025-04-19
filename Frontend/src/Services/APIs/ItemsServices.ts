import { api } from '@/Services/api';
import { Item, GetItemDto } from '@/Types'

export const getItems = async (
  id?: number,
  type?: 'subTwo' | 'subThree',
  page = 1,
  searchTerm?: string,
  pageSize = 30
): Promise<Item[]> => {
  let url: string;

  if (searchTerm?.trim()) {
    const encoded = encodeURIComponent(searchTerm.trim());

    if (id && type) {
      const paramKey = type === 'subTwo' ? 'subTwoId' : 'subThreeId';
      url = `/api/items/search?term=${encoded}&${paramKey}=${id}&page=${page}&pageSize=${pageSize}`;
    } else {
      url = `/api/items/search?term=${encoded}&page=${page}&pageSize=${pageSize}`;
    }

  } else if (id && type) {
    const paramKey = type === 'subTwo' ? 'subTwoId' : 'subThreeId';
    url = `/api/items?${paramKey}=${id}&page=${page}&pageSize=${pageSize}`;

  } else {
    throw new Error('Missing required parameters: provide either searchTerm or both id and type.');
  }

  const response = await api.get<Item[]>(url);
  return response.data;
};
export const getItemByItemNo = async (itemNo: string): Promise<GetItemDto> => {
  const response = await api.get<GetItemDto>(`/api/items/${itemNo}`);
  return response.data;
};

export const getItemImage = async (itemNo: string, imageId: string): Promise<string> => {
  const response = await api.get<{ imageUrl: string }>(`/api/items/${itemNo}/images/${imageId}`);
  return response.data.imageUrl;
};