import { BookStatus, BorrowedBorrowStatus, Gender, ProfileType } from "@/types";

export const setHashRoute = (str: string) => {

  window.location.hash = str.replaceAll('-', '');
}

export const getHashRoute = () => {

  return window.location.hash.replace('#', '');
}

export const matchProfileType = (profileType: ProfileType) => {
  switch (Number(profileType)) {
    case ProfileType.ADMIN:
      return '管理员';
    case ProfileType.USER:
      return '用户';
    default:
      return '未知';
  }
}

export const matchGender = (gender: Gender) => {

  switch (Number(gender)) {
    case Gender.Female:
      return '女';
    case Gender.Male:
      return '男';
    default:
      return '未知';
  }
}


export const matchBookStatus = (bookStatus: BookStatus) => {

  switch (Number(bookStatus)) {
    case BookStatus.AVAILABLE:
      return '可用';
    case BookStatus.BORROWED:
      return '已借出';
    case BookStatus.RESERVED:
      return '维护';
    default:
      return '异常';
  }
}

export const matchBorrowedBookStatus = (borrowed: BorrowedBorrowStatus) => {

  switch (Number(borrowed)) {
    case BorrowedBorrowStatus.RETURNED:
      return '已归还';
    case BorrowedBorrowStatus.UNRETURNED:
      return '未归还';
    default:
      return '未知';
  }
}
