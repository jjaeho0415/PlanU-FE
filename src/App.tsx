import ErrorPage from "@pages/ErrorPage/page";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "@pages/LoginPage/page";
import MyCalenderPage from "@pages/MyCalenderPage/page";
import SignUpPage from "@pages/SignUpPage/page";
import RegisterAccountPage from "@pages/RegisterAccountPage/page";
import GroupListPage from "@pages/GroupListPage/page";
import GroupPage from "@pages/GroupPage/page";
import GroupMemberPage from "@pages/GroupMemberPage/page";
import CreateGroupPage from "@pages/CreateGroupPage/page";
import ChattingPage from "@pages/ChattingPage/page";
import GroupCalenderPage from "@pages/GroupCalenderPage/page";
import CreateGroupSchedulePage from "@pages/CreateGroupSchedulePage";
import CreateMySchedulePage from "@pages/CreateMySchedulePage/page";
import GroupScheduleDetailPage from "@pages/GroupScheduleDetailPage/page";
import ModifyLocationPage from "@pages/ModifyLocationPage/page";
import MyScheduleDetailPage from "@pages/MyScheduleDetailPage/page";
import MyPage from "@pages/MyPage/page";
import FriendManagementPage from "@pages/FriendManagementPage/page";
import NotificationPage from "@pages/NotificationPage/page";
import LocationSharingPage from "@pages/LocationSharingPage/page";
import InvitingPage from "@pages/InvitingPage/page";
import Layout from "@layout/Layout";
import StartPage from "@pages/StartPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/start" element={<StartPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<MyCalenderPage />} />
          <Route path="/signUp" element={<SignUpPage />} />
          <Route path="/registerAccount" element={<RegisterAccountPage />} />
          <Route path="/groupList" element={<GroupListPage />} />
          <Route path="/group/:groupId" element={<GroupPage />} />
          <Route path="/group/:groupId/members" element={<GroupMemberPage />} />
          <Route path="/createGroup" element={<CreateGroupPage />} />
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
