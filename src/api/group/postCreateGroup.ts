import apiRoutes from "@api/apiRoutes";
import api from "@api/fetcher";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const postCreateGroup = async (body: IPostCreateGroupRequestBodyType, authorization: string) => {
  const formData = new FormData();

  formData.append("groupName", body.groupName);
  formData.append("groupImage", body.groupImage);

  const response = await api.post<FormData, IPostCreateGroupResponseBodyType>({
    endpoint: apiRoutes.createGroup,
    body: formData,
    authorization,
  });

  return response;
};

export const usePostCreateGroup = (authorization: string) => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (body: IPostCreateGroupRequestBodyType) => postCreateGroup(body, authorization),
    onMutate: () => {
      toast.loading("처리 중...", { id: "createGroupLoading" });
    },
    onSuccess: (data: IPostCreateGroupResponseBodyType) => {
      toast.dismiss("createGroupLoading");
      toast.success("그룹 생성 완료");
      navigate(`/group/${data.groupId}`);
    },
    onError: (error) => {
      toast.dismiss("createGroupLoading");
      toast.error(error.message);
    },
  });
};
