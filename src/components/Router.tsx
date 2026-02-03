import { MemberProvider } from '@/integrations';
import { createBrowserRouter, RouterProvider, Navigate, Outlet } from 'react-router-dom';
import { ScrollToTop } from '@/lib/scroll-to-top';
import ErrorPage from '@/integrations/errorHandlers/ErrorPage';
import HomePage from '@/components/pages/HomePage';
import LocationsPage from '@/components/pages/LocationsPage';
import LocationDetailsPage from '@/components/pages/LocationDetailsPage';
import RewardsPage from '@/components/pages/RewardsPage';
import GuidelinesPage from '@/components/pages/GuidelinesPage';
import AIToolsPage from '@/components/pages/AIToolsPage';
import SchedulingPage from '@/components/pages/SchedulingPage';
import ChallengesPage from '@/components/pages/ChallengesPage';
import AnalyticsPage from '@/components/pages/AnalyticsPage';

// Layout component that includes ScrollToTop
function Layout() {
  return (
    <>
      <ScrollToTop />
      <Outlet />
    </>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
        routeMetadata: {
          pageIdentifier: 'home',
        },
      },
      {
        path: "locations",
        element: <LocationsPage />,
        routeMetadata: {
          pageIdentifier: 'locations',
        },
      },
      {
        path: "locations/:id",
        element: <LocationDetailsPage />,
        routeMetadata: {
          pageIdentifier: 'location-details',
        },
      },
      {
        path: "rewards",
        element: <RewardsPage />,
        routeMetadata: {
          pageIdentifier: 'rewards',
        },
      },
      {
        path: "guidelines",
        element: <GuidelinesPage />,
        routeMetadata: {
          pageIdentifier: 'guidelines',
        },
      },
      {
        path: "ai-tools",
        element: <AIToolsPage />,
        routeMetadata: {
          pageIdentifier: 'ai-tools',
        },
      },
      {
        path: "scheduling",
        element: <SchedulingPage />,
        routeMetadata: {
          pageIdentifier: 'scheduling',
        },
      },
      {
        path: "challenges",
        element: <ChallengesPage />,
        routeMetadata: {
          pageIdentifier: 'challenges',
        },
      },
      {
        path: "analytics",
        element: <AnalyticsPage />,
        routeMetadata: {
          pageIdentifier: 'analytics',
        },
      },
      {
        path: "*",
        element: <Navigate to="/" replace />,
      },
    ],
  },
], {
  basename: import.meta.env.BASE_NAME,
});

export default function AppRouter() {
  return (
    <MemberProvider>
      <RouterProvider router={router} />
    </MemberProvider>
  );
}
