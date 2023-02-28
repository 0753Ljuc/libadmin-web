
import { getProfile, requestLogout } from '@/request';
import { Subpage } from '@/subpages/subpageConfig';
import type { CustomMunuItem, MenuItem, Profile, ProfileType } from '@/types';


export const getItems = (profileType: ProfileType | null, items: Subpage[], preKey = ''): CustomMunuItem[] => {
  // @ts-ignore
  return items
    .map((v, index) => {
      const key = preKey ? `${preKey}-${v.hash}` : v.hash
      if (Array.isArray(v.allowProfileType) && !v.allowProfileType.includes(profileType!)) {
        return
      }
      return {
        key,
        label: v.label,
        children: v.children ? getItems(profileType, v.children, key) : undefined,
      }
    })
    .filter(Boolean)
}

export const getPathsByItems = (items: CustomMunuItem[], pathArr: string[]): string[] => {
  let output: string[] = [];
  let wip = items;
  pathArr.reduce((pre, cur) => {
    const currentKey = pre ? `${pre}-${cur}` : cur;
    const matchedItem = wip.find((v) => v?.key === currentKey)
    if (matchedItem) {
      output.push(matchedItem.label)
    }
    wip = matchedItem?.children || []
    return currentKey
  }, "")
  return output
}

export const getProfileHelper = async () => {
  return await getProfile();
}

export const requestLogoutHelper = async () => {
  return await requestLogout();
}

