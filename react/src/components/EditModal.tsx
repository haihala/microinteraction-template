import Modal from "react-modal";
import { RowData } from "./TableRow";
import { useState } from "react";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

type Props = {
  onClose: () => void;
  user: RowData | undefined;
  onSave: (user: RowData) => void;
};

type FormProps = {
  user: RowData;
  onSave: (user: RowData) => void;
};

Modal.setAppElement("#root");

export function EditModal({ user, onClose, onSave }: Props) {
  return (
    <Modal
      isOpen={user !== undefined}
      onRequestClose={onClose}
      style={customStyles}
    >
      {user && <EditForm user={user} onSave={onSave} />}
    </Modal>
  );
}

function EditForm({ user, onSave }: FormProps) {
  const [workUser, setWorkUser] = useState<RowData>(user);

  const change = <T extends keyof RowData>(
    key: T,
    converter?: (input: string) => RowData[T],
  ) => {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setWorkUser({
        ...workUser,
        [key]: converter ? converter(value) : value,
      });
    };
  };

  return (
    <>
      <h1>Editing user {workUser.index}</h1>

      <form
        onSubmit={(e) => {
          // Prevents pageload when a button is clicked / enter is pressed in the form
          e.preventDefault();
          onSave(workUser);
        }}
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}
      >
        <span>User id</span>
        <input value={workUser.userId} onChange={change("userId")} />
        <span>Supervisor</span>
        <input
          value={workUser.supervisor}
          onChange={change("supervisor", parseInt)}
        />
        <span>First name</span>
        <input value={workUser.firstName} onChange={change("firstName")} />
        <span>Last name</span>
        <input value={workUser.lastName} onChange={change("lastName")} />
        <span>Job title</span>
        <input value={workUser.jobTitle} onChange={change("jobTitle")} />
        <span>Sex</span>
        <input value={workUser.sex} onChange={change("sex")} />
        <span>Phone</span>
        <input value={workUser.phone} onChange={change("phone")} />
        <span>Email</span>
        <input value={workUser.email} onChange={change("email")} />
        <span>Date of birth</span>
        <input
          type="date"
          value={workUser.birthDay.toISOString().slice(0, 10)}
          onChange={change("birthDay", (val) => new Date(val))}
        />
        <input type="submit" value="Save" style={{ gridColumn: "1 / 3" }} />
      </form>
    </>
  );
}
