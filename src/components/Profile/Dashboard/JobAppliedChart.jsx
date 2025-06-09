// components/JobApplicationChart.jsx
import React, { useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Paper, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchCompanyById } from "../../../services/slices/companySlice";

const JobAppliedChart = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.profile.user); // Adjust based on your slice
  const companyId = user?.companyDetails?.companyId;
  // console.log(companyId);

  const { companyDetails, loading, error } = useSelector(
    (state) => state.company
  );
  // console.log("companies: ", user);
  useEffect(() => {
    if (companyId) {
      dispatch(fetchCompanyById(companyId));
    }
  }, [dispatch, companyId]);

  const jobsPosted = companyDetails?.jobsPosted || [];
  // console.log("jobs posted: ", jobsPosted);

  const appliedJobs = user?.appliedJobs || [];

  // utils/transformData.js
  const getCumulativeJobData = (appliedJobs) => {
    // 1. Extract and sort dates
    const sorted = appliedJobs
      .map((job) => new Date(job.dateApplied).toISOString().slice(0, 10)) // 'YYYY-MM-DD'
      .sort();

    const dateCounts = {};
    sorted.forEach((date) => {
      dateCounts[date] = (dateCounts[date] || 0) + 1;
    });

    // 2. Build cumulative array
    const cumulativeData = [];
    let total = 0;

    Object.entries(dateCounts).forEach(([date, count]) => {
      total += count;
      cumulativeData.push({ date, total });
    });

    return cumulativeData;
  };

  const data = getCumulativeJobData(appliedJobs);
  const getJobsPostedCumulative = (jobsPosted) => {
    const dateCounts = {};
    jobsPosted.forEach((job) => {
      const date = new Date(job.datePosted).toISOString().slice(0, 10);
      dateCounts[date] = (dateCounts[date] || 0) + 1;
    });

    let total = 0;
    const cumulativeData = [];
    Object.entries(dateCounts)
      .sort()
      .forEach(([date, count]) => {
        total += count;
        cumulativeData.push({ date, total });
      });

    return cumulativeData;
  };

  // 3. Decide data based on role
  const chartData =
    user && user.role === "employer"
      ? getJobsPostedCumulative(companyDetails?.jobsPosted || [])
      : getCumulativeJobData(user?.appliedJobs || []);
  return (
    <>
      <h2 style={{ margin: "25px 0 10px 5px" }}>Job Application Activity</h2>
      <Paper elevation={3} style={{ padding: 20, marginTop: 30 }}>
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={chartData}>
            <CartesianGrid stroke="#e0e0e0" />
            <XAxis dataKey="date" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="total"
              stroke="#1976d2"
              strokeWidth={3}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </Paper>
    </>
  );
};

export default JobAppliedChart;
