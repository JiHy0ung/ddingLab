import React, { useState } from "react";
import {
  Box,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  FISHINGROD_DATA,
  HOE_DATA,
  PICKAXE_DATA,
} from "../../../constants/enhancementData";

interface TabPanelProps {
  children?: React.ReactNode;
  value: number;
  index: number;
}

const StyledTableContainer = styled(TableContainer)({
  boxShadow: "2px 2px 0px rgba(0, 0, 0, 1)",
  border: "2px solid black",
  borderRadius: "0 !important",
});

const StyledTableHead = styled(TableHead)({
  backgroundColor: "#f5f5f5",
});

const StyledTableRow = styled(TableRow)({
  "&:nth-of-type(odd)": {
    backgroundColor: "#f9f9f9",
  },
  "&:nth-of-type(even)": {
    backgroundColor: "#ffffff",
  },

  transition: "0.2s",

  "&:hover": {
    cursor: "pointer",
    backgroundColor: "#d0d0d0ff",
    "& td:first-of-type": {
      color: "#5781ffff",
      fontWeight: 900,
    },
  },
});

const StyledHeaderCell = styled(TableCell)({
  fontFamily: "Galmuri11",
  fontWeight: "900",
  fontSize: "0.95rem",
  textAlign: "center",
  verticalAlign: "middle",
  backgroundColor: "#222",
  borderBottom: "2px solid black",
  color: "white",
  wordBreak: "keep-all",
  lineHeight: "1.4",
});

const StyledTableCell = styled(TableCell)({
  fontFamily: "Galmuri11",
  fontSize: "0.8rem",
  fontWeight: "500",
  textAlign: "center",
  verticalAlign: "middle",
  borderRight: "1px solid #eee",

  "&:last-child": {
    borderRight: "none",
  },
});

const StyledRowHeaderCell = styled(StyledTableCell)({
  textAlign: "center",
  verticalAlign: "middle",
  fontWeight: "800",
  "&:hover": {
    backgroundColor: "#d0d0d0ff",
    cursor: "pointer",
    "& td:first-of-type": {
      color: "#5781ffff",
      fontWeight: 900,
    },
  },
});

const TabPanel = ({ children, value, index }: TabPanelProps) => {
  return (
    <div role="tabpanel" hidden={value !== index}>
      {value === index && <Box>{children}</Box>}
    </div>
  );
};

const ToolEffectTable = () => {
  const [value, setValue] = useState(0);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        width: "100%",
        minWidth: 550,
        maxWidth: 900,
      }}
    >
      <Tabs
        centered
        variant="fullWidth"
        value={value}
        onChange={handleChange}
        sx={{
          borderRadius: "1rem 1rem 0 0",
          "& .MuiTab-root": {
            fontFamily: "Galmuri11",
            fontWeight: "700",
            fontSize: "1rem",
            backgroundColor: "#dbdbdbff",
            color: "#878787ff",
          },
          "& .MuiTab-root.Mui-selected": {
            backgroundColor: "#000000ff",
            color: "#ffffff !important",
          },
          "& .MuiTabs-indicator": {
            height: "0px",
          },
        }}
      >
        <Tab label="⛏️ 세이지 곡괭이" />
        <Tab label="🔨 세이지 괭이" />
        <Tab label="🎣 세이지 낚싯대" />
      </Tabs>

      <TabPanel value={value} index={0}>
        <Paper component={StyledTableContainer}>
          <Table>
            <StyledTableHead>
              <StyledTableRow>
                <StyledHeaderCell>강화 단계</StyledHeaderCell>
                <StyledHeaderCell align="center">채광력</StyledHeaderCell>
                <StyledHeaderCell align="center">채광 속도</StyledHeaderCell>
                <StyledHeaderCell align="center">광물 드롭 수</StyledHeaderCell>
                <StyledHeaderCell align="center">
                  코비 소환 확률
                </StyledHeaderCell>
                <StyledHeaderCell align="center">
                  채광 시 경험치
                </StyledHeaderCell>
              </StyledTableRow>
            </StyledTableHead>
            <TableBody>
              {PICKAXE_DATA.map((row, index) => (
                <StyledTableRow key={index}>
                  <StyledRowHeaderCell>{row.stage}</StyledRowHeaderCell>
                  <StyledTableCell align="center">{row.power}</StyledTableCell>
                  <StyledTableCell align="center">{row.speed}</StyledTableCell>
                  <StyledTableCell align="center">{row.drops}</StyledTableCell>
                  <StyledTableCell align="center">{row.rare}</StyledTableCell>
                  <StyledTableCell align="center">{row.exp}</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </TabPanel>

      <TabPanel value={value} index={1}>
        <Paper component={StyledTableContainer}>
          <Table>
            <StyledTableHead>
              <StyledTableRow>
                <StyledHeaderCell>강화 단계</StyledHeaderCell>
                <StyledHeaderCell align="center">채집력</StyledHeaderCell>
                <StyledHeaderCell align="center">채집 속도</StyledHeaderCell>
                <StyledHeaderCell align="center">씨앗 드롭 수</StyledHeaderCell>
                <StyledHeaderCell align="center">
                  채집 시 경험치
                </StyledHeaderCell>
              </StyledTableRow>
            </StyledTableHead>
            <TableBody>
              {HOE_DATA.map((row, index) => (
                <StyledTableRow key={index}>
                  <StyledRowHeaderCell>{row.stage}</StyledRowHeaderCell>
                  <StyledTableCell align="center">{row.power}</StyledTableCell>
                  <StyledTableCell align="center">{row.speed}</StyledTableCell>
                  <StyledTableCell align="center">{row.drops}</StyledTableCell>
                  <StyledTableCell align="center">{row.exp}</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </TabPanel>

      <TabPanel value={value} index={2}>
        <Paper component={StyledTableContainer}>
          <Table>
            <StyledTableHead>
              <StyledTableRow>
                <StyledHeaderCell>강화 단계</StyledHeaderCell>
                <StyledHeaderCell align="center">시간 감소율</StyledHeaderCell>
                <StyledHeaderCell align="center">
                  물고기 드롭 수
                </StyledHeaderCell>
                <StyledHeaderCell align="center">수중 어획력</StyledHeaderCell>
                <StyledHeaderCell align="center">
                  수중 어획 속도
                </StyledHeaderCell>
                <StyledHeaderCell align="center">
                  조개 등장 확률
                </StyledHeaderCell>
                <StyledHeaderCell align="center">
                  미니게임 스킬 확률
                </StyledHeaderCell>
                <StyledHeaderCell align="center">
                  어패류 드롭 수
                </StyledHeaderCell>
                <StyledHeaderCell align="center">
                  낚시 시 경험치
                </StyledHeaderCell>
                <StyledHeaderCell align="center">
                  수중 어획 시 경험치
                </StyledHeaderCell>
              </StyledTableRow>
            </StyledTableHead>
            <TableBody>
              {FISHINGROD_DATA.map((row, index) => (
                <StyledTableRow key={index}>
                  <StyledRowHeaderCell>{row.stage}</StyledRowHeaderCell>
                  <StyledTableCell align="center">
                    {row.timeReduce}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row.waterDrops}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row.fishPower}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row.fishSpeed}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row.treasureRate}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row.minigameSkill}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row.baitDrops}
                  </StyledTableCell>
                  <StyledTableCell align="center">{row.nutExp}</StyledTableCell>
                  <StyledTableCell align="center">
                    {row.fishExp}
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </TabPanel>
    </Box>
  );
};

export default ToolEffectTable;
