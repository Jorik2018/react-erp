export const FILTER = [
  { id: 1, ec: "name", pc: "Name" },
  { id: 2, ec: "id", pc: "National ID" },
];

export const renderButton = (
  user:{status:string},
  userHandler:(user:{status:string},content:string,setInformation:()=>void)=>void,
  content:string,
  setInformation:()=>void,
  setStaticInformation:()=>void,
) => {
  if (user.status === "accepted") {
    return (
      <>
        <div className="acc st">پذیرفته شده</div>
        <button
          onClick={() =>
            userHandler(
              user,
              content,
              "rejected",
              setInformation,
              setStaticInformation
            )
          }
          className="st-button reject"
        >
          حذف
        </button>
      </>
    );
  } else if (user.status === "pending") {
    return (
      <div>
        <button
          onClick={() =>
            userHandler(
              user,
              content,
              "accepted",
              setInformation,
              setStaticInformation
            )
          }
          className="st-button accept"
        >
          پذیرفتن
        </button>
        <button
          onClick={() =>
            userHandler(
              user,
              content,
              "rejected",
              setInformation,
              setStaticInformation
            )
          }
          className="st-button reject"
        >
          رد کردن
        </button>
      </div>
    );
  } else {
    return <div className="rej">رد شده</div>;
  }
};
