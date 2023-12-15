import { registerForm } from "./registerForm.js";
const url = "https://api.noroff.dev/api/v1/auction/auth/register";

export async function register() {
  const registerBody = registerForm();

  async function postRegister() {
    try {
      const postRegisterOptions = {
        method: "POST",
        body: JSON.stringify(registerBody),
        headers: {
          "Content-Type": "application/json",
        },
      };

      const response = await fetch(url, postRegisterOptions);
      const json = await response.json();

      if (response.status === 200 || response.status === 201) {
        alert("User created!");
      } else {
        console.log(response.status);
      }
    } catch (error) {
      console.log(error);
    }
  }

  await postRegister();
}
