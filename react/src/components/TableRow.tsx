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
  supervisor: number;
};

type Props = RowData & {
  onLike: () => void;
  onEdit: () => void;
  employees: RowData[];
};

export function TableRow({
  index,
  userId,
  firstName,
  lastName,
  sex,
  email,
  phone,
  birthDay,
  jobTitle,
  liked,
  supervisor: supervisorIndex,
  onLike,
  onEdit,
  employees,
}: Props) {
  const supervisor = employees.find((e) => e.index === supervisorIndex);

  return (
    <details style={{ marginBottom: "1rem" }} id={`table-row-${index}`}>
      <summary>
        Employee {index} - {lastName}, {firstName}
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
          <span>Supervisor</span>
          {supervisor ? (
            <button
              onClick={() => {
                document
                  .querySelector(`#table-row-${supervisorIndex}`)
                  ?.scrollIntoView();
              }}
            >
              Employee {supervisor.index} - {supervisor.lastName},{" "}
              {supervisor.firstName}
            </button>
          ) : (
            "Nobody, they are at the top"
          )}
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
