export type RowData = {
  index: number;
  userId: string;
  firstName: string;
  lastName: string;
  sex: string;
  email: string;
  phone: string;
  birthDay: Date;
  jobTitle: string;
  liked: boolean;
};

type Props = RowData & {
  onLike: () => void;
};

export function TableRow({
  userId,
  firstName,
  lastName,
  sex,
  email,
  phone,
  birthDay,
  jobTitle,
  liked,
  onLike,
}: Props) {
  return (
    <details style={{ marginBottom: "1rem" }}>
      <summary>
        {lastName}, {firstName}
      </summary>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span>User id</span>
          <span>Job title</span>
          <span>Sex</span>
          <span>Email</span>
          <span>Phone</span>
          <span>Date of birth</span>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flexGrow: 1,
          }}
        >
          <span>{userId}</span>
          <span>{jobTitle}</span>
          <span>{sex}</span>
          <span>{email}</span>
          <span>{phone}</span>
          <span>{birthDay.toDateString()}</span>
        </div>
        <div
          style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
        >
          <button onClick={() => onLike()}>{liked ? "♥️" : "♡"}</button>
          <button onClick={() => alert("todo")}>Edit</button>
        </div>
      </div>
    </details>
  );
}
