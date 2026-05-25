import { useState, useEffect } from "react";
import useAxios from "../../hooks/useAxios";
import BooksList from "./BooksList";
import BookstoresList from "./BookstoresList";
import { AppBar, Drawer, Hidden, IconButton, Toolbar, Typography, useTheme } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import { Bookstore } from '../models';

function ResponsiveDrawer(props: {
  window: () => { document: { body: HTMLElement } },
  bookstores: Bookstore[], token: string, reload: boolean
}) {
  const { window, bookstores, token, reload } = props;
  const [bookstoreId, setBookstoreId] = useState(null as unknown as string);
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const axios = useAxios(token);
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const container =
    window !== undefined ? () => window().document.body : undefined;

  useEffect(() => {
    if (bookstoreId) {
      setIsLoading(true);
      axios
        .get(`bookstores/${bookstoreId}/books`)
        .then((res) => {
          setIsLoading(false);
          setBooks(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, [bookstoreId, reload]);

  return (
    <div>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Inventory
          </Typography>
        </Toolbar>
      </AppBar>
      <nav aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}>
            <BookstoresList
              handleClick={setBookstoreId}
              bookstores={bookstores}
              bookstoreId={bookstoreId}
            />
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            variant="permanent"
            open>
            <BookstoresList
              handleClick={setBookstoreId}
              bookstores={bookstores}
              bookstoreId={bookstoreId}
            />
          </Drawer>
        </Hidden>
      </nav>
      <main>
        <div />
        {<BooksList isLoading={isLoading} data={books} />}
      </main>
    </div>
  );
}

export default ResponsiveDrawer;
