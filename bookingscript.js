document.addEventListener("DOMContentLoaded", function () {
  const dateInput = document.getElementById("date");
  const timeInput = document.getElementById("time");
  const serviceSelect = document.getElementById("service");
  const techAssistanceGroup = document.getElementById(
    "technical-assistance-group"
  );
  const techServiceSelect = document.getElementById("techService");
  const deviceGroup = document.getElementById("device-group");

  const today = new Date();
  dateInput.min = today.toISOString().split("T")[0];

  function setTimeConstraints() {
    timeInput.min = "08:00";
    timeInput.max = "18:00";
  }
  setTimeConstraints();

  serviceSelect.addEventListener("change", function () {
    if (this.value === "Technical Assistance") {
      techAssistanceGroup.style.display = "block";
      document.getElementById("device").parentElement.style.display = "none";
    } else if (this.value === "Repair") {
      techAssistanceGroup.style.display = "none";
      document.getElementById("device").parentElement.style.display = "flex";
    } else {
      techAssistanceGroup.style.display = "none";
      document.getElementById("device").parentElement.style.display = "flex";
    }
  });

  dateInput.addEventListener("change", function () {
    const selectedDate = new Date(this.value);
    const todayDate = new Date();
    todayDate.setHours(0, 0, 0, 0);
    if (selectedDate < todayDate) {
      alert("Selected date cannot be in the past.");
      this.value = "";
    }
  });

  document
    .getElementById("booking-form")
    .addEventListener("submit", function (e) {
      e.preventDefault();

      let firstName = document.getElementById("firstName").value.trim();
      let lastName = document.getElementById("lastName").value.trim();
      const email = document.getElementById("email").value.trim();
      const service = document.getElementById("service").value;
      const techService = document.getElementById("techService").value;
      const device = document.getElementById("device").value;
      const date = document.getElementById("date").value;
      const time = document.getElementById("time").value;
      const message = document.getElementById("message").value.trim();

      if (date) {
        const selectedDate = new Date(date);
        const todayDate = new Date();
        todayDate.setHours(0, 0, 0, 0);
        if (selectedDate < todayDate) {
          alert("Selected date cannot be in the past.");
          return;
        }
      } else {
        alert("Please select a date.");
        return;
      }

      if (time < "08:00" || time > "19:00") {
        alert("Please select a time between 08:00 and 19:00.");
        return;
      }

      firstName =
        firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase();
      lastName =
        lastName.charAt(0).toUpperCase() + lastName.slice(1).toLowerCase();

      const wordCount = message
        .split(/\s+/)
        .filter((word) => word !== "").length;

      if (
        !firstName ||
        !lastName ||
        !email ||
        !service ||
        (service === "Technical Assistance" && !techService) ||
        (service !== "Technical Assistance" && !device) ||
        !date ||
        !time
      ) {
        alert("Please fill in all required fields marked with *.");
        return;
      }

      if (wordCount > 200) {
        alert("Please write 200 words or less.");
        return;
      }

      const confirmation = `
  Booking Confirmed!
  
  Name: ${firstName} ${lastName}
  Email: ${email}
  Service: ${service}
  ${
    service === "Technical Assistance"
      ? "Technical Assistance Type: " + techService
      : "Device: " + device
  }
  Date: ${date}
  Time: ${time}
  ${message ? "\nMessage:\n" + message : ""}
      `;
      alert(confirmation);

      document.getElementById("booking-form").reset();
      document.getElementById("techService").value = "";
      document.getElementById("device").parentElement.style.display = "flex";
      document.getElementById("technical-assistance-group").style.display =
        "none";
    });
});
