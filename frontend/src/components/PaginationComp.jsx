import { Pagination, Box } from "@mui/material";

export default function PaginationComp({ page, totalPages, onChange }) {
  if (totalPages <= 1) return null;

  return (
    <Box sx={{ display: "flex", justifyContent: "center", my: 3 }}>
      <Pagination
        page={page}
        count={totalPages}
        color="primary"
        onChange={(e, value) => onChange(value)}
      />
    </Box>
  );
}
