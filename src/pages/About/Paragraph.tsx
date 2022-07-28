import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Fonts } from "../../fonts";

export function Paragraph(props: { content: string }) {
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
        {props.content}
      </Box>
    </Typography>
  );
}
