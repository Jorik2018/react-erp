import { Divider, List, ListItem, ListItemText } from "@mui/material";
import { Bookstore } from '../models';

type BookstoresListProps = {
  handleClick: (id: string) => void,
  bookstores: Bookstore[],
  classes?: { toolbar: string },
  bookstoreId?: string | null
}

export default function BookstoresList(props: BookstoresListProps) {
  const { handleClick, bookstores, classes, bookstoreId } = props;

  return (
    <div>
      <div className={classes?.toolbar} />
      <Divider />
      <List>
        {bookstores.map((bookstore: Bookstore) => (
          <ListItem
            selected={bookstore.id === bookstoreId}
            key={bookstore.id}
            onClick={() => handleClick(bookstore.id)}>
            <ListItemText primary={`${bookstore.id} - ${bookstore.name}`} />
          </ListItem>
        ))}
      </List>
    </div>
  );
}
