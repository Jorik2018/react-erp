import "./App.css";

import { Amplify } from "aws-amplify";
import { Authenticator } from "@aws-amplify/ui-react";
import awsExports from "./aws-exports";
import Footer from "./Components/Layout/Footer";
import Header from "./Components/Layout/Header";

Amplify.configure(awsExports);

function App() {
  return (
    <Authenticator>
      {({ user }) => (
        <div className="App" style={{ textAlign: "center" }}>
          {user ? <Header user={user} /> : null}
          <Footer />
        </div>
      )}
    </Authenticator>
  );
}

export default App;
