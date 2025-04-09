import Layout from "@layout/Layout";
import ChatListPage from "@pages/ChatListPage/page";
import ChatListSearchPage from "@pages/ChatListSearchPage/page";
import ChattingPage from "@pages/ChattingPage/page";
import CreateGroupPage from "@pages/CreateGroupPage/page";
import ErrorPage from "@pages/ErrorPage/page";
import FindPage from "@pages/FindPage/page";
import FriendManagementPage from "@pages/FriendManagementPage/page";
import GroupCalendarPage from "@pages/GroupCalendarPage/page";
import GroupCalendarPossiblePage from "@pages/GroupCalendarPossiblePage/page";
import GroupListPage from "@pages/GroupListPage/page";
import GroupMemberPage from "@pages/GroupMemberPage/page";
import GroupPage from "@pages/GroupPage/page";
import GroupScheduleDetailPage from "@pages/GroupScheduleDetailPage/page";
import InviteGroupMemberPage from "@pages/InviteGroupMemberPage/page";
import LocationSharingPage from "@pages/LocationSharingPage/page";
import LoginPage from "@pages/LoginPage/page";
import MyCalendarPage from "@pages/MyCalendarPage/page";
import MyCalendarPossiblePage from "@pages/MyCalendarPossiblePage/page";
import MyPage from "@pages/MyPage/page";
import MyScheduleDetailPage from "@pages/MyScheduleDetailPage/page";
import RegisterAccountPage from "@pages/RegisterAccountPage/page";
import RegisterPage from "@pages/RegisterPage/page";
import RegisterSuccessPage from "@pages/RegisterSuccessPage/page";
import SelectLocationPage from "@pages/SelectLocationPage/page";
import StartPage from "@pages/StartPage";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.module.css";
import CommonRoute from "./routes/CommonRoute";
import ProtectedRoute from "./routes/ProtectedRoute";
import EditProfilePage from "@pages/EditProfilePage/page";
import EditSchedulePage from "@pages/EditSchedulePage/page";
import CreateSchedulePage from "@pages/CreateSchedulePage/page";
import NotificationPage from "@pages/NotificationPage/page";
import { WebSocketProvider } from "@store/webSocketProvider";
import { Toaster } from "react-hot-toast";

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
              <Route path="/myCalendar/:username" element={<MyCalendarPage />} />
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
              <Route path="/editSchedule/:scheduleId" element={<EditSchedulePage />} />
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
          <Route element={<ProtectedRoute />}>
            <Route path="/registerAccount" element={<RegisterAccountPage />} />
            <Route path="/notificationList" element={<NotificationPage />} />
            <Route path="/myCalendar/:username" element={<MyCalendarPage />} />
            <Route path="/myCalendar" element={<MyCalendarPage />} />
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
        </Routes>
      </Router>
    </WebSocketProvider>
  );
}

export default App;
