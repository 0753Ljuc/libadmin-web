
import { ProfileType } from "@/types";
import { getHashRoute } from "@/utils/helper";
import { Fragment } from "react";
import BookManagement from "./BookManagement";
import Categories from "./BookManagement/Categories";
import NewBook from "./BookManagement/NewBook";
import QueryBooks from "./BookManagement/QueryBooks";
import BorrowManagement from "./BorrowManagement";
import BorrowHistory from "./BorrowManagement/BorrowHistory";
import NewBorrow from "./BorrowManagement/NewBorrow";
import ReturnBook from "./BorrowManagement/ReturnBook";
import Profile from "./Profile";
import UserManagemenet from "./UserManagemenet";
import NewUser from "./UserManagemenet/NewUser";
import QueryUser from "./UserManagemenet/QueryUser";

type PartialWithKey<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>
type ChangeProps<T, K extends keyof T, P> = Omit<T, K> & { [key in K]: P }

export interface SubpageProps {
  route: string;
  profileType: ProfileType;
  candle: NonNullable<Subpage['children']>[number] | undefined;
  routes: NonNullable<Subpage['children']> | undefined;
}
export type CandleProps = Omit<SubpageProps, 'routes'>

export interface Subpage {
  hash: string;
  label: string;
  Component: React.FC<SubpageProps>;
  allowProfileType?: ProfileType[];
  children?: (ChangeProps<PartialWithKey<Subpage, 'children'>, 'Component', React.FC<CandleProps>>)[];
}

export const subpageConfig: Subpage[] = [
  {
    hash: '/book',
    label: '书籍管理',
    Component: BookManagement,
    children: [
      { hash: '/add', label: '录入新书', Component: NewBook, allowProfileType: [ProfileType.ADMIN] },
      { hash: '/query', label: '查询书籍', Component: QueryBooks },
      { hash: '/categories', label: '书籍类别', Component: Categories },
    ]
  },
  {
    hash: '/user',
    label: '用户管理',
    Component: UserManagemenet,
    allowProfileType: [ProfileType.ADMIN],
    children: [
      { hash: '/query', label: '查询用户', Component: QueryUser },
      { hash: '/add', label: '新增用户', Component: NewUser },
    ]
  },
  {
    hash: '/borrow',
    label: '借阅信息',
    Component: BorrowManagement,
    children: [
      { hash: '/new', label: '借阅书籍', Component: NewBorrow, allowProfileType: [ProfileType.ADMIN] },
      { hash: '/return', label: '归还书籍', Component: ReturnBook, allowProfileType: [ProfileType.ADMIN] },
      { hash: '/hisotry', label: '借阅记录', Component: BorrowHistory },
    ]
  },
  {
    hash: '/profile',
    label: '个人信息',
    Component: Profile,

  },
]

export const getChildConfig = (): {
  currentConfig: Subpage;
  subRoute: string;
  candle: NonNullable<Subpage['children']>[number] | undefined;
} | null => {
  const hashRoute = getHashRoute();
  const currentConfig = subpageConfig.find(v => hashRoute.startsWith(v.hash))
  if (!currentConfig) {
    return null
  }
  const subRoute = hashRoute.slice(currentConfig.hash.length);
  const candle = currentConfig.children?.find(v => subRoute.startsWith(v.hash));
  return { currentConfig, subRoute, candle }
}
