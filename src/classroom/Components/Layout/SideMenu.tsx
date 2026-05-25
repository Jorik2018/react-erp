import { styled } from '@mui/material/styles';
import { Avatar, Drawer, Grid } from '@mui/material';

const drawerWidth = 240;

const StyledDrawer = styled(Drawer)(() => ({
  width: drawerWidth,
  flexShrink: 0,
  '& .MuiDrawer-paper': {
    width: drawerWidth,
    backgroundImage: `linear-gradient(#cfd9df,#e2ebf0)`,
    color: 'grey',
  },
}));

const BigAvatar = styled(Avatar)(() => ({
  margin: 30,
  width: 100,
  height: 100,
}));


function SideMenu() {

  return (
    <StyledDrawer
      open={true}
      variant='permanent'
      anchor='left'
    >
      <Grid alignItems='center'>
        <BigAvatar
          src='https://helpx.adobe.com/content/dam/help/en/stock/how-to/visual-reverse-image-search/jcr_content/main-pars/image/visual-reverse-image-search-v2_intro.jpg'
        />
      </Grid>
    </StyledDrawer>
  );
}

export default SideMenu;