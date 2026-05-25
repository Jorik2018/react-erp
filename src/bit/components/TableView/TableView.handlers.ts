import axios from "axios";
import { ChangeEvent } from "react";
import { TUser } from "../../models";

type Obj = { name: string; username: string };
export const handleSearch = (
  e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  obj: Obj[],
  setData: (obj: Obj[]) => void,
  searchTerm: string
): void => {
  const value: string = e.target.value;

  if (value.trim() === "") {
    setData(obj);
    return;
  }
  let newObj;
  if (searchTerm === "name") {
    newObj = obj.filter((a) => {
      return a.name.includes(value);
    });
  } else {
    newObj = obj.filter((a) => {
      return a.username.includes(value);
    });
  }
  setData(newObj);
};

export const userHandler = (
  user: TUser,
  type: string,
  status: string,
  setInformation: (prev: TUser[])=>void,
  setStaticInformation: ()=>void
): void => {
  const data = { operation: status };
  const TOKEN = sessionStorage.getItem("token");
  const URL = `http://localhost:8000/study/${type}-request/${user.id}/`;

  axios
    .post(URL, data, {
      headers: {
        Authorization: `Token ${TOKEN}`,
      },
    })
    .then(() =>
      handleTableChange(setInformation, setStaticInformation, user, status)
    )
    .catch((e) => console.log(e));
};

const handleTableChange = (
  setInformation: (find:(prev: TUser[])=>TUser)=>void,
  setStaticInformation: (prev: TUser[])=>void,
  user: TUser,
  status: string
): void => {
  setInformation((prev: TUser[]) => {
    return prev.map((item: TUser) => {
      if (item.id === user.id) {
        item.status = status;
      }
      return item;
    });
  });
  setStaticInformation((prev: TUser[]) => {
    return prev.map((item: TUser) => {
      if (item.id === user.id) {
        item.status = status;
      }
      return item;
    });
  });
};
