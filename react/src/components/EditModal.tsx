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
        <label>User id</label>
        <input value={workUser.userId} onChange={change("userId")} />
        <label>Supervisor</label>
        <input
          value={workUser.supervisor || ""}
          onChange={change("supervisor", (val) => (val ? parseInt(val) : null))}
        />
        <label>First name</label>
        <input value={workUser.firstName} onChange={change("firstName")} />
        <label>Last name</label>
        <input value={workUser.lastName} onChange={change("lastName")} />
        <label>Job title</label>
        <input value={workUser.jobTitle} onChange={change("jobTitle")} />
        <label>Sex</label>
        <input value={workUser.sex} onChange={change("sex")} />
        <label>Phone</label>
        <input value={workUser.phone} onChange={change("phone")} />
        <label>Email</label>
        <input value={workUser.email} onChange={change("email")} />
        <label>Date of birth</label>
        <input
          type="date"
          value={workUser.birthday.toISOString().slice(0, 10)}
          onChange={change("birthday", (val) => new Date(val))}
        />
        <input type="submit" value="Save" style={{ gridColumn: "1 / 3" }} />
      </form>
    </>
  );
}
