import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { ENHANCE_ROWS } from "../../../constants/enhancementData";

const EnhanceTableContainer = styled(TableContainer)({
  width: "100%",
  minWidth: 550,
  maxWidth: 900,
  tableLayout: "fixed",
  border: "2px solid black",
  borderRadius: "12px",
  overflow: "hidden",
  marginBlock: "3rem",
  cursor: "default",
});

const EnhanceTableHeadCell = styled(TableCell)({
  fontFamily: "Galmuri11",
  fontWeight: 800,
  fontSize: "1rem",
  backgroundColor: "#222",
  color: "white",
  borderBottom: "2px solid black",
  textAlign: "center",
  verticalAlign: "middle",
});

const EnhanceTableCell = styled(TableCell)({
  fontFamily: "Galmuri11",
  fontSize: "0.8rem",
  color: "#222",
  borderBottom: "1px solid #ddd",
  textAlign: "center",
  verticalAlign: "middle",
  borderRight: "1px solid #eee",
  "&:last-child": {
    borderRight: "none",
  },
});

const EnhanceTableRow = styled(TableRow)({
  "&:nth-of-type(odd)": {
    backgroundColor: "#f9f9f9",
  },
  "&:nth-of-type(even)": {
    backgroundColor: "#ffffff",
  },

  transition: "0.2s",

  "&:hover": {
    backgroundColor: "#d0d0d0ff",
    cursor: "pointer",
    "& td:first-of-type": {
      color: "#5781ffff",
      fontWeight: 900,
    },
  },
});

const EnhanceTable = () => {
  return (
    <Box component={EnhanceTableContainer}>
      <Table>
        <TableHead>
          <TableRow>
            <EnhanceTableHeadCell>강화 단계</EnhanceTableHeadCell>
            <EnhanceTableHeadCell>하급</EnhanceTableHeadCell>
            <EnhanceTableHeadCell>중급</EnhanceTableHeadCell>
            <EnhanceTableHeadCell>상급</EnhanceTableHeadCell>
            <EnhanceTableHeadCell>골드</EnhanceTableHeadCell>
            <EnhanceTableHeadCell>확률</EnhanceTableHeadCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {ENHANCE_ROWS.map((row) => {
            const rateNumber = parseInt(row.rate, 10);
            return (
              <EnhanceTableRow key={row.id}>
                <EnhanceTableCell sx={{ fontWeight: "800" }}>
                  {row.level}
                </EnhanceTableCell>
                <EnhanceTableCell
                  sx={{ color: row.lowStone === 0 ? "#e1e1e1ff" : "#222" }}
                >
                  {row.lowStone}
                </EnhanceTableCell>

                <EnhanceTableCell
                  sx={{ color: row.midStone === 0 ? "#e1e1e1ff" : "#222" }}
                >
                  {row.midStone}
                </EnhanceTableCell>

                <EnhanceTableCell
                  sx={{ color: row.highStone === 0 ? "#e1e1e1ff" : "#222" }}
                >
                  {row.highStone}
                </EnhanceTableCell>

                <EnhanceTableCell
                  sx={{ color: row.gold === 0 ? "#e1e1e1ff" : "#222" }}
                >
                  {row.gold.toLocaleString()} 골드
                </EnhanceTableCell>

                <EnhanceTableCell
                  sx={{
                    fontWeight: 700,
                    color:
                      rateNumber <= 2
                        ? "#900000ff"
                        : rateNumber <= 5
                          ? "#d30000ff"
                          : rateNumber <= 5
                            ? "#e7533cff"
                            : rateNumber <= 20
                              ? "#ffad29ff"
                              : rateNumber <= 40
                                ? "#ffd21dff"
                                : rateNumber <= 70
                                  ? "#64ae27ff"
                                  : "#2980b9",
                  }}
                >
                  {row.rate}
                </EnhanceTableCell>
              </EnhanceTableRow>
            );
          })}
        </TableBody>
      </Table>
    </Box>
  );
};

export default EnhanceTable;
