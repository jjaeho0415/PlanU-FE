import styles from "./App.module.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import { WebSocketProvider } from "@store/webSocketProvider";
import { Toaster } from "react-hot-toast";
import CommonRoute from "./routes/CommonRoute";
import ProtectedRoute from "./routes/ProtectedRoute";
import Layout from "@layout/Layout";
// 기본적으로 즉시 로딩될 페이지들
import StartPage from "@pages/StartPage";
import LoginPage from "@pages/LoginPage/page";
import MyCalendarPage from "@pages/MyCalendarPage/page";
// 필요할때만 로딩될 페이지들(lazy 로딩 적용)
const ChatListPage = lazy(() => import("@pages/ChatListPage/page"));
const ChatListSearchPage = lazy(() => import("@pages/ChatListSearchPage/page"));
const ChattingPage = lazy(() => import("@pages/ChattingPage/page"));
const CreateGroupPage = lazy(() => import("@pages/CreateGroupPage/page"));
const ErrorPage = lazy(() => import("@pages/ErrorPage/page"));
const FindPage = lazy(() => import("@pages/FindPage/page"));
const FriendManagementPage = lazy(() => import("@pages/FriendManagementPage/page"));
const GroupCalendarPage = lazy(() => import("@pages/GroupCalendarPage/page"));
const GroupCalendarPossiblePage = lazy(() => import("@pages/GroupCalendarPossiblePage/page"));
const GroupListPage = lazy(() => import("@pages/GroupListPage/page"));
const GroupMemberPage = lazy(() => import("@pages/GroupMemberPage/page"));
const GroupPage = lazy(() => import("@pages/GroupPage/page"));
const GroupScheduleDetailPage = lazy(() => import("@pages/GroupScheduleDetailPage/page"));
const InviteGroupMemberPage = lazy(() => import("@pages/InviteGroupMemberPage/page"));
const LocationSharingPage = lazy(() => import("@pages/LocationSharingPage/page"));
const MyCalendarPossiblePage = lazy(() => import("@pages/MyCalendarPossiblePage/page"));
const MyPage = lazy(() => import("@pages/MyPage/page"));
const MyScheduleDetailPage = lazy(() => import("@pages/MyScheduleDetailPage/page"));
const RegisterAccountPage = lazy(() => import("@pages/RegisterAccountPage/page"));
const RegisterPage = lazy(() => import("@pages/RegisterPage/page"));
const RegisterSuccessPage = lazy(() => import("@pages/RegisterSuccessPage/page"));
const SelectLocationPage = lazy(() => import("@pages/SelectLocationPage/page"));
const EditProfilePage = lazy(() => import("@pages/EditProfilePage/page"));
const EditSchedulePage = lazy(() => import("@pages/EditSchedulePage/page"));
const CreateSchedulePage = lazy(() => import("@pages/CreateSchedulePage/page"));
const NotificationPage = lazy(() => import("@pages/NotificationPage/page"));

function App() {
  return (
    <WebSocketProvider>
      <Router>
        {/* api 응답 대기중일때
        1. 로딩 시작 : toast.loading("문구", {id: "id"})
        2. 성공 or 실패 : toast.dismiss("id")
        3. 후속 알림 : toast.success("문구") 또는 toast.error("문구") 호출 */}
        <Toaster
          position="bottom-center"
          toastOptions={{
            duration: 3000,
            style: { fontSize: "15px" },
            success: {
              style: {
                background: "#4BB543",
                color: "white",
              },
            },
            error: {
              style: {
                background: "#FF4C4C",
                color: "white",
              },
            },
            loading: {
              style: {
                fontSize: "13px",
                background: "#333",
                color: "#fff",
                borderRadius: "8px",
                padding: "12px 16px",
              },
              iconTheme: {
                primary: "#fff",
                secondary: "#888",
              },
            },
          }}
        />
        <Suspense fallback={<div className={styles.pageLoading}>로딩 중...</div>}>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route element={<CommonRoute />}>
                <Route path="/" element={<StartPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/registerSuccess" element={<RegisterSuccessPage />} />
                <Route path="/find" element={<FindPage />} />
              </Route>
              <Route element={<ProtectedRoute />}>
                <Route path="/registerAccount" element={<RegisterAccountPage />} />
                <Route path="/notificationList" element={<NotificationPage />} />
                <Route path="/myCalendar" element={<MyCalendarPage />} />
                <Route path="/myCalendar/:name/:username" element={<MyCalendarPage />} />
                <Route path="/myCalendar/possible" element={<MyCalendarPossiblePage />} />
                <Route path="/group/:groupId/groupCalendar" element={<GroupCalendarPage />} />
                <Route
                  path="/group/:groupId/groupCalendar/possible"
                  element={<GroupCalendarPossiblePage />}
                />
                <Route path="/chatList" element={<ChatListPage />} />
                <Route path="/chatList/search" element={<ChatListSearchPage />} />
                <Route path="/group/:groupId/chatting" element={<ChattingPage />} />
                <Route path="/myPage" element={<MyPage />} />
                <Route path="/myPage/friendsManagement" element={<FriendManagementPage />} />
                <Route path="/myPage/editProfile" element={<EditProfilePage />} />
                <Route path="/createSchedule/:groupId" element={<CreateSchedulePage />} />
                <Route path="/selectLocation" element={<SelectLocationPage />} />
                <Route path="/mySchedule/:scheduleId" element={<MyScheduleDetailPage />} />
                <Route path="/editSchedule/:groupId/:scheduleId" element={<EditSchedulePage />} />
                <Route
                  path="/group/:groupId/calendar/schedule/:scheduleId"
                  element={<GroupScheduleDetailPage />}
                />
                <Route
                  path="/group/:groupId/calendar/schedule/:scheduleId/locationSharing"
                  element={<LocationSharingPage />}
                />
                <Route path="/createGroup" element={<CreateGroupPage />} />
                <Route path="/groupList" element={<GroupListPage />} />
                <Route path="/group/:groupId" element={<GroupPage />} />
                <Route path="/group/:groupId/members" element={<GroupMemberPage />} />
                <Route path="/group/:groupId/inviteMembers" element={<InviteGroupMemberPage />} />
              </Route>
              <Route path="*" element={<ErrorPage />} />
            </Route>
          </Routes>
        </Suspense>
      </Router>
    </WebSocketProvider>
  );
}

export default App;
