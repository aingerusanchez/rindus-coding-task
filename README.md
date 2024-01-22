# Rindus Coding Task

Technical challenge for Angular Frontend Developer at Rindus.

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.0.10.

## Setup

```bash, powershell, zsh
npm install
```

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Instructions

Develop an Employee Management Angular App with the following functionalities:

1. ✅ Role Selection Screen: This initial screen gives users the option to choose either ‘User’ or ‘Admin’ roles. Upon selection, the app will then navigate to the Employee List screen.

2. ✅ Employee List Screen: This section displays a comprehensive list of employees. It features a search bar that filters employees by their names or surnames. If the User role is selected from the previous screen, the employee details will be in a “view only” mode. Whereas, the Admin role has the authority to add or edit employee details.

   a) ✅ Display the Age of the employee instead of the Birthdate for enhanced readability.

3. Employee Details Screen: This is where an employee’s details can be viewed, added, or edited. Each employee has the following attributes:

   - ✅ Name (with a minimum of 3 char and a maximum of 20 chars)
   - ✅ Surname (also with a minimum of 3 char and a maximum of 20 chars)
   - ✅ Birthdate
   - ✅ Position (options include Junior, Senior, or ‘Other’)
   - ✅ When ‘Other’ is selected as a position, an input field will display for the user to specify the employee’s position.

### Nice to have features

- ✅ Simulate data delay: Both role options ([user,admin]) and the position options ([junior, senior, other]) should simulate a data load delay of 300ms from the backend. This would not require data storage.

  > [!NOTE]
  > There is a property in environments (`env.simulatedDelayMs`) setting delay time.

- Write tests: If possible, create unit tests to validate the app’s functionalities.
