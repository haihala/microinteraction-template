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
  onEdit: () => void;
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
  onEdit,
}: Props) {
  return (
    <details style={{ marginBottom: "1rem" }}>
      <summary>
        {lastName}, {firstName}
      </summary>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "20rem auto",
          }}
        >
          <span>User id</span>
          <span>{userId}</span>
          <span>Job title</span>
          <span>{jobTitle}</span>
          <span>Sex</span>
          <span>{sex}</span>
          <span>Email</span>
          <span>{email}</span>
          <span>Phone</span>
          <span>{phone}</span>
          <span>Date of birth</span>
          <span>{birthDay.toDateString()}</span>
        </div>
        <div
          style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
        >
          <button onClick={() => onLike()}>{liked ? "♥️" : "♡"}</button>
          <button onClick={() => onEdit()}>Edit</button>
        </div>
      </div>
    </details>
  );
}
