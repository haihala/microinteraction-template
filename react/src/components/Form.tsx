import React, { useState } from "react";
import { RegisterOptions, useForm } from "react-hook-form";

type DataModel = {
  handedness: "left" | "right";
  name: string;
  birthday: string;
  checkbox: boolean;
  color: string;
  mathTrivia: string;
  animalTrivia: string;
  geographyTrivia: string;
  astronomyTrivia: string;
  done: boolean;
};

export function Form() {
  const [success, setSuccess] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DataModel>({ defaultValues: { handedness: "right" } });

  const twoColsWide = { gridColumn: "1 / 3" };

  type LabeledInputProps = {
    name: keyof DataModel;
    label: string;
    type?: string;
    registerOpts?: RegisterOptions<DataModel>;
  };

  function LabeledInput({
    name,
    label,
    type,
    registerOpts,
  }: LabeledInputProps) {
    return (
      <>
        <label htmlFor={name}>{label}</label>
        <input
          type={type}
          {...register(name, registerOpts)}
          style={type === "checkbox" ? { width: "1rem" } : undefined}
        />
      </>
    );
  }

  type LabeledRadioButtonsProps = {
    name: keyof DataModel;
    label: string;
    options: {
      value: string;
      label: string;
      registerOpts?: RegisterOptions<DataModel>;
    }[];
  };

  function LabeledRadioButtons({
    name,
    label,
    options,
  }: LabeledRadioButtonsProps) {
    return (
      <>
        <label htmlFor={name}>{label}</label>
        <div>
          {options.map(({ label, value, registerOpts }) => (
            <React.Fragment key={value}>
              <input
                type="radio"
                {...register(name, registerOpts)}
                value={value}
              />{" "}
              <label htmlFor={value} style={{ paddingRight: "1rem" }}>
                {label}
              </label>{" "}
            </React.Fragment>
          ))}
        </div>
      </>
    );
  }

  return (
    <>
      <p style={{ fontSize: "2rem" }}>
        {Object.keys(errors).length !== 0 ? (
          <p style={{ color: "red" }}>Error in form</p>
        ) : success ? (
          <p style={{ color: "green" }}>Success!</p>
        ) : null}
      </p>
      <form
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 2fr",
          rowGap: "1rem",
          maxWidth: "60rem",
        }}
        onSubmit={handleSubmit(() => setSuccess(true))}
        onChange={() => setSuccess(false)}
      >
        <h2 style={twoColsWide}>Form about filling forms</h2>
        <LabeledInput
          name="name"
          label="What is your name?"
          registerOpts={{ required: true }}
        />
        <LabeledInput
          name="birthday"
          type="date"
          label="What is your birthday?"
          registerOpts={{ required: true }}
        />
        <LabeledRadioButtons
          name="handedness"
          label="Which is your dominant hand"
          options={[
            { value: "left", label: "Left" },
            { value: "right", label: "Right" },
          ]}
        />
        <LabeledInput
          name="checkbox"
          type="checkbox"
          label="Do you like clicking checkboxes?"
        />
        <LabeledInput
          name="color"
          type="color"
          label="What is your favourite color?"
        />

        <h2 style={twoColsWide}>Trivia time!</h2>
        <LabeledInput name="mathTrivia" label="2X-1=5, X=?" />
        <LabeledInput name="animalTrivia" label="What color are polar bears?" />
        <LabeledInput
          name="geographyTrivia"
          label="What is the capital of Italy?"
        />
        <LabeledRadioButtons
          name="astronomyTrivia"
          label="Which planet has rings?"
          options={[
            { value: "sun", label: "The Sun" },
            { value: "saturn", label: "Saturn" },
            { value: "earth", label: "The Earth" },
            { value: "venus", label: "Venus" },
          ]}
        />

        <h2 style={twoColsWide}>Final part</h2>
        <LabeledInput
          type="checkbox"
          name="done"
          label="Are you done?"
          registerOpts={{ required: true }}
        />
        <input style={twoColsWide} type="submit" value="Submit" />
      </form>
    </>
  );
}
