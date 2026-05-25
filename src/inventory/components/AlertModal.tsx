import { List, ListItem, ListSubheader, Modal, Typography } from "@mui/material";

type AlertModalProps = {
  isOpen: boolean,
  setIsOpen: (isOpen: boolean) => void,
  emptyStocks: {
    id: string,
    bookstore_id: string,
    bookstore_name: string,
    book_id: string,
    book_title: string,
    book_author: string
  }[]
}
export default function AlertModal(props: AlertModalProps) {

  const { isOpen, setIsOpen, emptyStocks } = props;

  return (
    <Modal
      open={isOpen}
      onClose={() => setIsOpen(false)}>
      <List
        subheader={
          <ListSubheader
            color="primary"
            id="out-of-stock-subheader"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}>
            <Typography variant="h3">Out Of Stock</Typography>
          </ListSubheader>
        }>
        {emptyStocks.map((emptyStock) => (
          <ListItem
            key={emptyStock.id}
            divider={true}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
            }}>
            {/* <ListItemText */}
            {/* primary={ */}
            <Typography variant="h5">
              {`${emptyStock.bookstore_id} - ${emptyStock.bookstore_name}`}
            </Typography>
            {/* } */}
            {/* secondary={ */}
            {/* <div> */}
            <Typography variant="subtitle1">
              {`${emptyStock.book_id} - ${emptyStock.book_title}`}
            </Typography>
            <span>{`By ${emptyStock.book_author}`}</span>
            {/* </div> */}
            {/* } */}
            {/* /> */}
          </ListItem>
        ))}
      </List>
    </Modal>
  );
}
