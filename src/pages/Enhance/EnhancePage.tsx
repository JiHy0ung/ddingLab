import styled from "@emotion/styled";
import { Box, Stack, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React from "react";
import EnhanceTable from "./components/EnhanceTable";
import Enrichments from "./components/Enrichments";
import ToolEffectTable from "./components/ToolEffectTable";

const EnhanceContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  paddingBlock: "3rem",
});

const EnhanceTitle = styled(Typography)({
  fontFamily: "Galmuri11",
  fontSize: "4rem",
  fontWeight: "900",
  marginBottom: "1rem",
});

const EnhanceSubtitle = styled(Typography)({
  fontFamily: "Galmuri11",
  fontSize: "1.2rem",
  color: "#666",
  marginBottom: "0.5rem",
  textAlign: "center",
});

const EnhanceDescription = styled(Typography)({
  fontFamily: "Galmuri11",
  fontSize: "0.95rem",
  color: "#888",
  marginBottom: "3rem",
  textAlign: "center",
  maxWidth: "600px",
});

const DataTableBox = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  paddingInline: "10rem",
  marginTop: "2rem",
});

const EnhancePage = () => {
  return (
    <EnhanceContainer>
      <EnhanceTitle>강화 분석실</EnhanceTitle>
      <EnhanceSubtitle>아이템 강화 레시피 및 확률 분석</EnhanceSubtitle>
      <EnhanceDescription>
        필요한 재료와 수량을 확인하고, 강화 성공 확률을 분석해보세요
      </EnhanceDescription>
      <Enrichments />
      <DataTableBox>
        <EnhanceTable />
      </DataTableBox>
      <DataTableBox>
        <ToolEffectTable />
      </DataTableBox>
    </EnhanceContainer>
  );
};

export default EnhancePage;
