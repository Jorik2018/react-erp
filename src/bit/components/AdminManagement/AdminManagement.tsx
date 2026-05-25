import { useState } from "react";
import { useParams } from "react-router-dom";
import SchoolRequest from "../AllSchools/AllSchools";
import AdminManagementHeader from "./AdminManagement.Header";
import { Wrapper } from "./AdminManagement.styles";
import ActiveMeetings from "../ActiveMeetings/ActiveMeetings";

const AdminManagement = () => {
  const param = useParams().info;
  const [state, setState] = useState(param as string);
  return <Wrapper>
    <AdminManagementHeader state={state} setState={setState} />
    <div>
      {state === "info" ? <SchoolRequest /> : <ActiveMeetings />}
    </div>
  </Wrapper>;
}
export default AdminManagement;
