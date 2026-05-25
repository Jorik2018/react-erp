import { useState, useEffect } from "react";
//import { Storage, API } from "aws-amplify";
import { listProfiles } from "../../graphql/queries";
import UploadProfile from "./UploadProfile";
import ProfileGallery from "./ProfileGallery";
import { Col, Row } from "reactstrap";
import { Profile } from "../../models";
import { generateClient } from "aws-amplify/api";

export default function ProfilePage() {

  const client = generateClient();

  const [profiles, setProfiles] = useState([] as Profile[]);

  const [picture] = useState("");

  useEffect(() => {
    getAllCoursesToState();
  }, [picture]);

  const getAllCoursesToState = async () => {
    client.graphql<{ data: { listProfiles: { items: [] } } }>({ query: listProfiles })
    
    
     // .then((result: { data: { listProfiles: { items: [] } } }) => buildCourseArray(result.data.listProfiles.items))
     // .then((courseArray: Profile[]) => setProfiles(courseArray));
  };

  const buildCourseArray = (listProfiles: Profile[]) => {
    return getCourseList(listProfiles);
  };

  const getCourseList = (profileList: Profile[]) => {
    return Promise.all(
      profileList.map((i) => getOneFormatedCourse(i))
    );
  };

  const getOneFormatedCourse = (singleProfile: Profile) =>
    Storage.get(singleProfile.file.key).then((src: string) => ({
      src,
      id: singleProfile.id,
      name: singleProfile.name,
      accountType: singleProfile.accountType,
      description: singleProfile.description,
      key: singleProfile.file.key,
    }));

  return (
    <Row>
      <Col className="col-lg-8">
        <ProfileGallery profile={profiles} />
      </Col>
      <Col className="col-lg-4">
        <UploadProfile />
      </Col>
    </Row>
  );
}
