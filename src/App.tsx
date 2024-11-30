import Layout from "@layout/Layout";
import ChatListPage from "@pages/ChatListPage/page";
import ChatListSearchPage from "@pages/ChatListSearchPage/page";
import ChattingPage from "@pages/ChattingPage/page";
import { default as CreateGroupPage, default as GroupPage } from "@pages/CreateGroupPage/page";
import CreateGroupSchedulePage from "@pages/CreateGroupSchedulePage";
import CreateMySchedulePage from "@pages/CreateMySchedulePage/page";
import ErrorPage from "@pages/ErrorPage/page";
import FindPage from "@pages/FindPage/page";
import FriendManagementPage from "@pages/FriendManagementPage/page";
import GroupCalenderPage from "@pages/GroupCalenderPage/page";
import GroupListPage from "@pages/GroupListPage/page";
import GroupMemberPage from "@pages/GroupMemberPage/page";
import GroupScheduleDetailPage from "@pages/GroupScheduleDetailPage/page";
import InvitingPage from "@pages/InvitingPage/page";
import LocationSharingPage from "@pages/LocationSharingPage/page";
import LoginPage from "@pages/LoginPage/page";
import ModifyLocationPage from "@pages/ModifyLocationPage/page";
import MyCalendarPage from "@pages/MyCalendarPage/page";
import MyPage from "@pages/MyPage/page";
import MyScheduleDetailPage from "@pages/MyScheduleDetailPage/page";
import NotificationPage from "@pages/NotificationPage/page";
import RegisterPage from "@pages/RegisterPage/page";
import StartPage from "@pages/StartPage";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.module.css";
import RegisterAccountPage from "@pages/RegisterAccountPage/page";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<StartPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/registerAccount" element={<RegisterAccountPage />} />
          <Route path="/find" element={<FindPage />} />
          <Route path="/myCalendar" element={<MyCalendarPage />} />
          <Route path="/groupList" element={<GroupListPage />} />
          <Route path="/group/:groupId" element={<GroupPage />} />
          <Route path="/group/:groupId/members" element={<GroupMemberPage />} />
          <Route path="/createGroup" element={<CreateGroupPage />} />
          <Route path="/chatList" element={<ChatListPage />} />
          <Route path="/chatList/search" element={<ChatListSearchPage />} />
          <Route path="/group/:groupId/chatting" element={<ChattingPage />} />
          <Route path="/group/:groupId/calender" element={<GroupCalenderPage />} />
          <Route
            path="/group/:groupId/calender/createSchedule"
            element={<CreateGroupSchedulePage />}
          />
          <Route path="/createMySchedule" element={<CreateMySchedulePage />} />
          <Route
            path="/group/:groupId/calender/schedule/:scheduleId"
            element={<GroupScheduleDetailPage />}
          />
          <Route path="/modifyLocation" element={<ModifyLocationPage />} />
          <Route path="/mySchedule/:scheduleId" element={<MyScheduleDetailPage />} />
          <Route path="/myPage" element={<MyPage />} />
          <Route path="/myPage/friendsManagement" element={<FriendManagementPage />} />
          <Route path="/notification" element={<NotificationPage />} />
          <Route
            path="/group/:groupId/calender/schedule/:scheduleId/locationSharing"
            element={<LocationSharingPage />}
          />
          <Route path="/memberInvitation" element={<InvitingPage />} />
          <Route path="*" element={<ErrorPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
