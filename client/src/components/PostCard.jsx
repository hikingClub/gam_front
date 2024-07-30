import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Typography,
} from "@mui/material";
import React from "react";

const outerPostBox = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  marginTop: "0.5px", // 카드 사이 간격
  // paddingLeft: "10%",
};

// category, map_path, company_name
// title
// Author_affiliation | date | publisher
const PostCard = ({ post }) => {
  const {
    category,
    registration,
    link,
    title,
    description,
    date,
    institution,
  } = post;

  return (
    <Box style={outerPostBox}>
      <Card
        sx={{ width: "40%", mb: 2, p: 2, borderRadius: "8px", boxShadow: 3 }}
      >
        <CardContent>
          <Box display="flex" alignItems="center" gap={1}>
            <Chip
              label={category}
              color="primary"
              sx={{ backgroundColor: "#f44336", color: "white" }}
            />
            <Chip label={registration} sx={{ backgroundColor: "#e0e0e0" }} />
            <Typography variant="body2" color="primary">
              {link}
            </Typography>
          </Box>
          <Typography
            variant="h6"
            component="div"
            sx={{ mt: 2, fontWeight: "bold" }}
          >
            {title}
          </Typography>
          <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
            {description}
          </Typography>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            sx={{ mt: 2 }}
          >
            <Typography variant="body2" color="textSecondary">
              {date}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {institution}
            </Typography>
          </Box>
          <Box display="flex" gap={1} sx={{ mt: 2 }}>
            <Button variant="outlined" size="small">
              설명
            </Button>
            <Button variant="outlined" size="small">
              연관지식
            </Button>
            <Button variant="outlined" size="small">
              상세 보기
            </Button>
            <Button variant="outlined" size="small">
              출처 바로가기
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default PostCard;
