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
  onLike,
}: Props) {
  return (
    <tr>
      <td>{index}</td>
      <td>{userId}</td>
      <td>{firstName}</td>
      <td>{lastName}</td>
      <td>{sex}</td>
      <td>{email}</td>
      <td>{phone}</td>
      <td>{birthDay.toDateString()}</td>
      <td>{jobTitle}</td>
      <td onClick={() => onLike()}>{liked ? "♥️" : "♡"}</td>
    </tr>
  );
}
