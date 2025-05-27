// components/JobPieChart.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent, Typography } from "@mui/material";
import { fetchCompanyById } from "../../../services/slices/companySlice";
import { useDispatch, useSelector } from "react-redux";
import { apiEndpoint } from "../../../services/urls";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658"];

const JobPieChart = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const user = useSelector((state) => state.profile.user);
  const { companyDetails } = useSelector((state) => state.company);
  const companyId = user?.companyDetails?.companyId;
  const token = localStorage.getItem("authToken");

  useEffect(() => {
    if (user?.role === "employer" && companyId) {
      dispatch(fetchCompanyById(companyId));
    }
  }, [dispatch, user?.role, companyId]);

  useEffect(() => {
    axios
      .get(`${apiEndpoint}jobs/job-stats`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        let { totalJobs, activeJobs, appliedJobs } = res.data;

        // Replace "appliedJobs" with "posted jobs" if user is employer
        if (user?.role === "employer") {
          appliedJobs = companyDetails?.jobsPosted?.length || 0;
        }

        setData([
          { name: "Total Jobs", value: totalJobs },
          { name: "Active Jobs", value: activeJobs },
          {
            name: user?.role === "employer" ? "Jobs Posted" : "Jobs Applied",
            value: appliedJobs,
          },
        ]);
      })
      .catch((err) => console.error("Error fetching stats", err));
  }, [user, companyDetails, token]);

  return (
    <>
      <h2 style={{ margin: "28px 0 10px 25px" }}>Job Statistics</h2>
      <Card sx={{ maxWidth: 500, margin: "auto", mt: 4 }}>
        <CardContent>
          <ResponsiveContainer width="100%" height={350}>
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
    </>
  );
};

export default JobPieChart;
