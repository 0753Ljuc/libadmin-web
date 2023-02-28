import { Gender } from "@/types";
import { matchGender } from "@/utils/helper";
import { Tag } from "antd";

export const renderGender = (gender: Gender) => {
  const text = matchGender(gender);
  switch (Number(gender)) {
    case Gender.Female:
      return <Tag color='success' >{text}</Tag>
    case Gender.Male:
      return <Tag color='warning' >{text}</Tag>
    default:
      return <Tag color='red' >{text}</Tag>
  }
}