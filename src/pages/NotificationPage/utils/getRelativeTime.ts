export const getRelativeTime = (createdDate: string) => {
  const now = new Date();
  const created = new Date(createdDate);

  const diffInSeconds = Math.floor((now.getTime() - created.getTime()) / 1000);
  if (diffInSeconds < 60) {
    return `${diffInSeconds}초 전`;
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes}분 전`;
  }

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours}시간 전`;
  }

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 30) {
    return `${diffInDays}일 전`;
  }

  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInDays < 7) {
    return `${diffInMonths}개월 전`;
  }
};
