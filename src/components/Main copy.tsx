import React from "react";
import { Route, Navigate, Routes } from "react-router-dom";
import Container from '@mui/material/Container';
import GuestsList from "./GuestsList";
import FeedBack from "./FeedBack";

const Main = () => {

    return (
        <Container component="main" sx={{ minHeight: '96vh' }}>
        <Routes>
          <Route path="/" element={<GuestsList/>} />
          <Route path="/feedback/:guestId" element={<FeedBack/>} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Container>
    );
};

export default Main;