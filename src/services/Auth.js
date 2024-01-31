
export const registration = async (formData) => {
  try {
    const res = await fetch(
      "https://demo-api.ideabridge.lt/api/auth/register",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      }
    );
    const data = await res.json();
    console.log(data);
  } catch (error) {
    console.log(error.message);
  }
};

export const signInSubmit = async (
  formData,
  dispatch,
  signInStart,
  signInSuccess,
  signInFailure
) => {
  if (!formData.email || !formData.password) {
    return dispatch(signInFailure("Please fill all the fields"));
  }
  try {
    dispatch(signInStart());
    const res = await fetch("https://demo-api.ideabridge.lt/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    if (data.success === false) {
      dispatch(signInFailure(data.message));
    }

    if (res.ok) {
      dispatch(signInSuccess(data));
    }
  } catch (error) {
    dispatch(signInFailure(error.message));
  }
};
