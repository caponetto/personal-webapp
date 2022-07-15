import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { ReactNode } from "react";
import { Fonts } from "../../fonts";

export function Paragraph(props: { children: ReactNode }) {
  return (
    <Typography component="div">
      <Box
        sx={{
          textAlign: "justify",
          lineHeight: 1.7,
          fontFamily: Fonts.NUNITO,
          fontSize: { xs: "13px", sm: "16px" },
        }}
      >
        {props.children}
      </Box>
    </Typography>
  );
}
