import {
  Card,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Row,
  Col,
  CardImg,
} from "reactstrap";
import "./CourseGallery.css";
import { Profile } from "../../models";

function ProfileGallery(props: { profile: Profile[] }) {
  return (
    <div className=" card-list ">
      {props.profile.map((profiles: Profile) => (
        <div className="" key={profiles.id}>
          <Row>
            <Col sm="12" md={{ size: 6, offset: 3 }}>
              <Card>
                <CardImg
                  top
                  width="100%"
                  src={profiles.src}
                  alt="Card image cap"
                />
                <CardBody>
                  <CardTitle tag="h5">{profiles.name}</CardTitle>
                  <CardSubtitle tag="h6" className="mb-2 text-muted">
                    {profiles.accountType}
                  </CardSubtitle>
                  <CardText>{profiles.description}</CardText>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <br />
        </div>
      ))}
    </div>
  );
}

export default ProfileGallery;
