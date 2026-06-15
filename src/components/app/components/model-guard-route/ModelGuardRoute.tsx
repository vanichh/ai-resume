import { Navigate, Outlet } from 'react-router-dom';
import { useShallow } from 'zustand/react/shallow';

import { APP_ROUTES } from '@common/constants/routes';
import { useResumeStore } from '@store/resumeStore';

import { selectModelGuardRouteState } from './common/selectors';

export const ModelGuardRoute = () => {
  const { modelStatus } = useResumeStore(useShallow(selectModelGuardRouteState));
  const isModelBlocked = modelStatus === 'unsupported' || modelStatus === 'unavailable';

  if (isModelBlocked) {
    return <Navigate replace to={APP_ROUTES.unsupportedBrowser} />;
  }

  return <Outlet />;
};
