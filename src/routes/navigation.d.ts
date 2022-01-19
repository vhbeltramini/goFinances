import { GoFinancesRoutesList } from '../utils/routes';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends GoFinancesRoutesList {}
  }
}