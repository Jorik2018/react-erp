import { useState } from "react";
import {  graphqlOperation } from "aws-amplify/api";
import API from "aws-amplify/api";
import Storage from '@aws-amplify/storage';
import { updateProfile } from "../../graphql/mutations";
import "./UploadCourse.css";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import { Obj } from "../../models";

function UploadProfile() {
  const [selectedFile, setSelectedFile] = useState(null as unknown as { name: string });
  const [alert, setAlert] = useState(false);
  const [profileName, setProfileName] = useState("");
  const [profileDescription, setProfileDescription] = useState("");
  const [accountType, setAccountType] = useState("");

  const handleOnFileChange = (e: { target: { files: FileList | null } }) => {
    if (e.target.files) {
      const selectedFile = e.target.files[0];
      setSelectedFile(selectedFile);
      console.log("handlefileschange", selectedFile);
    }
  };

  const sendImageToDB = (image: Obj) => {
    console.log("inside db write", image);
    API.graphql(graphqlOperation(updateProfile, { input: image }))
      .catch((err: Error) => console.error("db write error", err));
  };

  const handleFormSubmit = (e:{preventDefault:()=>void}) => {
    console.log("inside handleFormSubmit");
    e.preventDefault();
    console.log("{selectedFile}", selectedFile);
    console.log("{filename}", selectedFile.name);
    const fileWithExtn = selectedFile.name;
    const extn = fileWithExtn.split(".").pop();
    let extractedContentType = "application/octet-stream";
    if (extn === "html") extractedContentType = "text/html";
    if (extn === "css") extractedContentType = "text/css";
    if (extn === "js") extractedContentType = "application/javascript";
    if (extn === "png" || extn === "jpg" || extn === "gif")
      extractedContentType = "image/" + extn;
    console.log("contentType ", extractedContentType);

    //storing image in S3
    Storage.put(selectedFile.name, selectedFile, {
      // contentType: "image/png",
      contentType: extractedContentType,
    }).then(() => {
      const image = {
        id: "101b98fe-4641-4b3c-8e5d-4f47114cfdc5",
        file: {
          //bucket: awsExports.aws_user_files_s3_bucket,
          //region: awsExports.aws_user_files_s3_bucket_region,
          key: selectedFile.name,
        },
        name: profileName,
        accountType: accountType,
        description: profileDescription
      };
      console.log("image payload", image);
      setAlert(true);
      sendImageToDB(image);
    });
  };

  return (
    <div className="jumbotron ">
      <Form onSubmit={handleFormSubmit}>
        <h1> Add User Information </h1>
        <FormGroup>
          <Label for="CourseName">Username</Label>
          <Input
            type="text"
            value={profileName}
            placeholder=""
            onChange={({ target }) => setProfileName(target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="creator">Account Type</Label>
          <Input
            type="text"
            value={accountType}
            placeholder=""
            onChange={({ target }) => setAccountType(target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="Course Description">Description</Label>
          <Input
            type="textarea"
            value={profileDescription}
            placeholder=""
            onChange={({ target }) => setProfileDescription(target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="File">Image</Label>
          <Input type="file" onChange={handleOnFileChange} />
        </FormGroup>
        <Button>Submit</Button>
      </Form>
    </div>
  );
}

export default UploadProfile;
