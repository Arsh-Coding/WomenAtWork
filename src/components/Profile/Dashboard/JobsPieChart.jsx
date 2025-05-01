// components/JobPieChart.jsx
import React, { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent, Typography } from "@mui/material";
import axios from "axios";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658"];

const JobPieChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/jobs/job-stats")
      .then((res) => {
        const { totalJobs, activeJobs, appliedJobs } = res.data;
        setData([
          { name: "Total Jobs", value: totalJobs },
          { name: "Active Jobs", value: activeJobs },
          { name: "Jobs Applied", value: appliedJobs },
        ]);
      })
      .catch((err) => console.error("Error fetching stats", err));
  }, []);

  return (
    <Card sx={{ maxWidth: 500, margin: "auto", mt: 4 }}>
      <CardContent>
        <Typography variant="h6" align="center" gutterBottom>
          Job Statistics
        </Typography>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              label
            >
              {data.map((entry, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend verticalAlign="bottom" height={36} />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default JobPieChart;
