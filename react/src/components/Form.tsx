export function Form() {
  return (
    <>
      <h2>Fill out our form filling form</h2>
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          maxWidth: "40rem",
        }}
      >
        <label htmlFor="name">What is your name?</label>
        <input type="text" name="name" />
        <label htmlFor="birthday">What is your birthday?</label>
        <input type="date" name="birthday" />
        <label htmlFor="handedness">Which is your dominant hand</label>
        <div>
          <input type="radio" name="handedness" value="left" />
          <label htmlFor="left">Left</label>
          <input type="radio" name="handedness" value="right" checked />
          <label htmlFor="right">Right</label>
        </div>
        <label htmlFor="checkbox">Do you like clicking checkboxes?</label>
        <input type="checkbox" name="checkbox" />
        <label htmlFor="color">What is your favourite color?</label>
        <input type="color" name="color" />
      </form>
    </>
  );
}
