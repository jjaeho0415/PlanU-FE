import apiRoutes from "@api/apiRoutes";
import api from "@api/fetcher";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

type IPostCreateGroupBodyType = {
  groupName: string;
  groupImage: File;
};

type IResponsePostCreateGroupType = {
  groupId: number;
  groupName: string;
  leaderUserName: string;
  groupImageUrl: string;
};

const postCreateGroup = async (body: IPostCreateGroupBodyType, authorization: string) => {
  const formData = new FormData();
 
  formData.append("groupName", body.groupName);
  formData.append("groupImage", body.groupImage);
  
  const response = await api.post<FormData, IResponsePostCreateGroupType>({
    endpoint: apiRoutes.createGroup,
    body: formData,
    authorization,
  });
    
  return response;
};

export const usePostCreateGroup = (authorization: string) => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (body: IPostCreateGroupBodyType) => postCreateGroup(body, authorization),
    onSuccess: (data: IResponsePostCreateGroupType) => {
      navigate(`/group/${data.groupId}`);
    },
    onError: (error) => {
      alert(error.message);
    },
  });
};
