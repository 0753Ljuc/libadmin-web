import { ProfileType } from "@/types";
import { matchProfileType } from "@/utils/helper";
import { Tag } from "antd";

export const renderProfileType = (profileType: ProfileType) => {
  const text = matchProfileType(profileType);
  switch (Number(profileType)) {
    case ProfileType.ADMIN:
      return <Tag color='purple' >{text}</Tag>
    case ProfileType.USER:
      return <Tag color='volcano' >{text}</Tag>
    default:
      break;
  }
}