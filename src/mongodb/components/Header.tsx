import { H1 } from '@leafygreen-ui/typography';
import { MongoDBLogoMark } from '@leafygreen-ui/logo';

export default function Header(props: { title: string }) {

  const logoSize = 48;

  const logoStyle = {
    width: `${logoSize}px`,
    marginRight: `${logoSize / 2}px`
  };

  return (
    <div style={{
      display: "flex",
      flexWrap: "wrap"
    }}>
      <MongoDBLogoMark style={logoStyle} height={logoSize} />
      <H1>{props.title}</H1>
    </div>
  )

}