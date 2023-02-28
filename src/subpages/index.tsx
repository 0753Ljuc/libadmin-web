
import Default from "./Default";
import { getChildConfig, subpageConfig } from './subpageConfig';
import { ProfileType } from "@/types";
export { subpageConfig };

export const renderSubPage = (profileType: ProfileType, colorBgContainer: string): JSX.Element => {


  const childConfig = getChildConfig();
  if (!childConfig) {
    return <Default />
  }

  const { currentConfig, subRoute, candle } = childConfig;
  return (
    <div style={{ background: colorBgContainer, minHeight: 360, padding: 20 }}>
      <currentConfig.Component
        route={subRoute}
        routes={currentConfig.children}
        candle={candle}
        profileType={profileType}
      />
    </div>
  )
}

