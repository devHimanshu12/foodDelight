# FoodieDelight

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.0.6.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.


#About the Project

FoodDelight Assignment (Compatibility test for frontend developer)
Started on 05/07/2024 (9PM) and completed on 08/07/2024 (3.30AM)
Estimated time : 14h 
Spent time : 16h


Requirements: 
Angular CLI: 18.0.6 
Node: 20.11.1 (install node before installing other requirements in your machine)
Package Manager: npm 10.2.4
Built on : linux OS

Library used:
Angular material
Tailwind CSS framework in some of the component

Testing framework:
	Jasmine and Karma

Steps to run: 
Clone the repo from the give url here:
Now run command : npm i (it will install all the dependencies in node modules folder) 
Now run : ng serve 

Introduction:
Project is created on the latest Angular,angular material tailwind, and BEM methodology to handle css and all the components are standalone and I have tried to follow all the latest features of angular.

Total no of Components: 8


Home Component (spent time: 20 min)
To show a message and welcoming introduction.

Manage Restaurants Component (spent time: 2hrs)
To list out all the restaurants already created and fetched from mock Api.
After editing and deleting these lists if you refresh the page it will again render the same sample data from api or in case api fails it will render mock sample data saved in mock data file.
I wrote down comments with each method in the code.
Created test cases and covered almost all test code of these components.
For testing i have angular Karma tool provided by angular in its spec file of each component.
By clicking on three dots of each list you can delete and edit the list but these will be reset once you refresh as I am not calling any api to save it in the database.

Render form component (spent time: 3hrs)
Two inputs formFields and dialogInput(when used in modal).
This component renders any type of form dynamically, you just need to send a config sample of each input in an array.(Example: addRestaurantFields)
Same component is reused to render edit dialog with pre populated data.
It covers all the required fields and shows the error state of each  validating field in form.
90% of cases have been covered in the testing spec file of this component.

Link Component (spent time: 30min)
This is a very small component to handle Link and is used in navbar and where anchor tag functionality is required.
Input required is linkConfig of type navConfig (routerLink,label,value and id)

Card List Component (spent time: 1hr 30 min)
Two inputs required lists(each item) and formIndex and this is used to show cards in manageRestaurantsComponent to show list of cards.
formIndex is the current index of each cardList.
One output event actionEvent  whether edit or delete action is taken.

     6.  Custom Dialog Component (spent time: 2hr 30 min)
To handle modal for desktop view and bottomsheet for mobile view.
On click edit option from three dots list of restaurants it will get triggered and once you edit and click on save it will be closed and on click outside the dialog or bottomsheet it gets closed.
In config data it requires a selected list with formFields as renderFormList , action and index of selected list.
	

CRUD (total time 1.5hr which includes testing of each method)
Methods Created to handle Creation, Edit and Delete are written in ManageService
And time spent on creating each methods took 30 min max

To write test cases: (spent time: 4hrs)







