import { DataGrid, GridColDef } from '@mui/x-data-grid';
import clsx from "clsx";

const columns: GridColDef[] = [
  { field: "stock_id", headerName: "Stock_id", width: 120 },
  { field: "id", headerName: "Book_id", width: 120 },
  {
    field: "quantity",
    headerName: "Quantity",
    width: 120,
    cellClassName: (params: { value?: number }) =>
      clsx("cell", {
        negative: params.value! <= 0,
      }),
  },
  { field: "title", headerName: "Title", flex: 1 },
  { field: "author", headerName: "Author", flex: 1 },
  { field: "summary", headerName: "Summary", flex: 1 },
];

export default function BooksList({ data, isLoading }: { data: { [key: string]: string }[], isLoading: boolean | undefined }) {
  return (
    <div
      style={{
        display: "flex",
        justifyItems: "center",
        height: "85vh",
        width: "100%",
      }}>
      <DataGrid
        rows={data}
        columns={columns}
        pageSizeOptions={[5, 10, 25]}
        loading={isLoading}
      />
    </div>
  );
}
