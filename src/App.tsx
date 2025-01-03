import Layout from "@layout/Layout";
import ChatListPage from "@pages/ChatListPage/page";
import ChatListSearchPage from "@pages/ChatListSearchPage/page";
import ChattingPage from "@pages/ChattingPage/page";
import CreateGroupPage from "@pages/CreateGroupPage/page";
import CreateGroupSchedulePage from "@pages/CreateGroupSchedulePage";
import CreateMySchedulePage from "@pages/CreateMySchedulePage/page";
import ErrorPage from "@pages/ErrorPage/page";
import FindPage from "@pages/FindPage/page";
import FriendManagementPage from "@pages/FriendManagementPage/page";
import GroupCalendarPage from "@pages/GroupCalendarPage/page";
import GroupListPage from "@pages/GroupListPage/page";
import GroupMemberPage from "@pages/GroupMemberPage/page";
import GroupScheduleDetailPage from "@pages/GroupScheduleDetailPage/page";
import LocationSharingPage from "@pages/LocationSharingPage/page";
import LoginPage from "@pages/LoginPage/page";
import MyCalendarPage from "@pages/MyCalendarPage/page";
import MyPage from "@pages/MyPage/page";
import MyScheduleDetailPage from "@pages/MyScheduleDetailPage/page";
import RegisterPage from "@pages/RegisterPage/page";
import StartPage from "@pages/StartPage";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.module.css";
import RegisterAccountPage from "@pages/RegisterAccountPage/page";
import RegisterSuccessPage from "@pages/RegisterSuccessPage/page";
import GroupPage from "@pages/GroupPage/page";
import CommonRoute from "./routes/CommonRoute";
import ProtectedRoute from "./routes/ProtectedRoute";
import SelectLocationPage from "@pages/SelectLocationPage/page";
import MyCalendarPossiblePage from "@pages/MyCalendarPossiblePage/page";
import GroupCalendarPossiblePage from "@pages/GroupCalendarPossiblePage/page";
import EditProfilePage from "@pages/EditProfilePage/page";
import EditMySchedulePage from "@pages/EditMySchedulePage/page";
import EditGroupSchedulePage from "@pages/EditGroupSchedulePage/page";
import InviteGroupMemberPage from "@pages/InviteGroupMemberPage/page";

function App() {
  return (
    <Router>
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
            <Route path="/myCalendar" element={<MyCalendarPage />} />
            <Route path="/myCalendarPossible" element={<MyCalendarPossiblePage />} />
            <Route path="/group/:groupId/groupCalendar" element={<GroupCalendarPage />} />
            <Route path="/groupCalendarPossible" element={<GroupCalendarPossiblePage />} />
            <Route path="/chatList" element={<ChatListPage />} />
            <Route path="/chatList/search" element={<ChatListSearchPage />} />
            <Route path="/group/:groupId/chatting" element={<ChattingPage />} />
            <Route path="/myPage" element={<MyPage />} />
            <Route path="/myPage/editProfile" element={<EditProfilePage />} />
            <Route path="/myPage/friendsManagement" element={<FriendManagementPage />} />
            <Route path="/createMySchedule" element={<CreateMySchedulePage />} />
            <Route
              path="/group/:groupId/calendar/createSchedule"
              element={<CreateGroupSchedulePage />}
            />
            <Route path="/selectLocation" element={<SelectLocationPage />} />
            <Route path="/mySchedule/:scheduleId" element={<MyScheduleDetailPage />} />
            <Route path="/mySchedule/:scheduleId/edit" element={<EditMySchedulePage />} />
            <Route
              path="/group/:groupId/calendar/schedule/:scheduleId"
              element={<GroupScheduleDetailPage />}
            />
            <Route
              path="/group/:groupId/calendar/schedule/:scheduleId/edit"
              element={<EditGroupSchedulePage />}
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
    </Router>
  );
}

export default App;
