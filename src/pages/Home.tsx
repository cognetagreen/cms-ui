import React from 'react';
import Layout from '../components/Layouts/Layout';
import GridDashboard from '../Dashboards/GridDashboard';
import MainDashboard from '../Dashboards/MainDashboard';

const Home: React.FC = () => {
  const currentURL = window.location.href;
  const current = currentURL.split("/")[3];
  let DashboardComponent: React.FC;

  if (current === "" || current === "home") {
    DashboardComponent = MainDashboard;
  } else if (current === "grid") {
    DashboardComponent = GridDashboard;
  } else {
    DashboardComponent = () => <div>404 Not Found</div>; // Default component or 404
  }

  return (
    <Layout>
      <DashboardComponent />
    </Layout>
  );
};

export default Home;
