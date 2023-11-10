document
  .getElementById("contact_form")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const message = document.getElementById("description").value;
    const selectCountry = document.getElementById("countrySelect");

    const selectedOption = selectCountry.options[selectCountry.selectedIndex];
    const selectedCountry = selectedOption.text;
    console.log(selectedCountry);

    const formData = {
      name: name,
      email: email,
      phone: phone,
      message: message,
      country: selectedCountry, // Include the selected country directly here
    };
    console.log(formData);

    fetch("http://13.51.168.236:3336/leads/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then(function (response) {
        console.log("Response:", response);
        if (response.ok) {
          return response.text();
        } else {
          throw new Error("Network response was not ok");
        }
      })
      .then(function (result) {
        console.log(result);
        const alertElement = document.querySelector(".alert");
        alertElement.classList.remove("error-alert");
        alertElement.classList.add("success-alert");
        alertElement.innerHTML = "Form submitted successfully!";
        alertElement.style.display = "block";

        document.getElementById("name").value = "";
        document.getElementById("email").value = "";
        document.getElementById("phone").value = "";
        document.getElementById("description").value = "";
        document.getElementById("countrySelect").value = "";

        setTimeout(function () {
          alertElement.style.display = "none";
        }, 3000);
      })
      .catch(function (error) {
        console.error("Error:", error);
        const alertElement = document.querySelector(".alert");
        alertElement.classList.remove("success-alert");
        alertElement.classList.add("error-alert");

        alertElement.innerHTML = "An error occurred. Please try again later.";
        alertElement.style.display = "block";
      });
  });
