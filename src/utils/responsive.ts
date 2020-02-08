import MediaQuery, { useMediaQuery } from 'react-responsive';

export const dimensionMaxMap = {
  xs: '479.98px',
  sm: '575.98px',
  md: '767.98px',
  lg: '991.98px',
  xl: '1199.98px',
  xxl: '1599.98px',
};

export default {
  useMediaQuery,
  MediaQuery,
  dimensionMaxMap,
//   BigScreen: useMediaQuery({ minDeviceWidth: dimensionMaxMap.lg }),
//   SmallScreen: useMediaQuery({ maxDeviceWidth: dimensionMaxMap.lg }),
};
