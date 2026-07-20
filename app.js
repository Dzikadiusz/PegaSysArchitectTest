const startSlider = document.getElementById("startSlider");
const endSlider = document.getElementById("endSlider");
const startValue = document.getElementById("startValue");
const endValue = document.getElementById("endValue");
const rangeInfo = document.getElementById("rangeInfo");

const nextBtn = document.getElementById("nextBtn");
const nextQBtn = document.getElementById("nextQBtn");
const prevQBtn = document.getElementById("prevQBtn");
const showAnswerBtn = document.getElementById("showAnswerBtn");
const validateBtn = document.getElementById("validateBtn");
const resetScoreBtn = document.getElementById("resetScoreBtn");
const harderBtn = document.getElementById("harderBtn");
const easierBtn = document.getElementById("easierBtn");
const resetWeightsBtn = document.getElementById("resetWeightsBtn");
const jumpToInput = document.getElementById("jumpToInput");
const jumpToBtn = document.getElementById("jumpToBtn");
const randomizeAnswersChk = document.getElementById("randomizeAnswersChk");
const markForReviewChk = document.getElementById("markForReviewChk");
const reviewRandomBtn = document.getElementById("reviewRandomBtn");
const poolModeInputs = document.querySelectorAll('input[name="questionPoolMode"]');

const questionCounter = document.getElementById("questionCounter");
const weightInfo = document.getElementById("weightInfo");
const scoreInfo = document.getElementById("scoreInfo");
const selectionFeedback = document.getElementById("selectionFeedback");
const questionText = document.getElementById("questionText");
const answerBlock = document.getElementById("answerBlock");
const answerText = document.getElementById("answerText");
const questionPanel = document.querySelector(".question-panel");

function setSelectionFeedback(text) {
  if (selectionFeedback) {
    selectionFeedback.textContent = text;
  }
}

let questions = [];
let currentQuestion = null;
let currentQuestionIndex = -1;
let activeQuestionSetKey = "";
let score = {
  attempted: 0,
  correct: 0,
  points: 0,
};

const SAMPLE_DATA = ` 
1.In which three situations can you use a data transform? (Choose Three) 
A. To set the destination location as the arrival location
B. To create a new property after case creation
C. To set the default arrival date to five days in the future
D. To copy the first and last name properties into a single property value
E. To perform an action that allows the user to update a reservation
Answer: A C D 
2.In which scenario is it appropriate to use a layout group? 
A. A view displays four columns when viewed on a tablet and two columns on a mobile device.
B. A view displays a table with course information, including a description, duration, and cost.
C. A view displays a text field if the user selects a checkbox to opt in to provide feedback.
D. A view displays address, contact, and payment information in a series of tabs.
Answer: D 
3.An order form provides four options from which customers select one option. 
According to best practice, which of the following two UI control types can be used to minimize clutter on 
the order form? (Choose Two) 
A. Dropdown
B. Checkbox
C. Radio buttons
D. Autocomplete
Answer: A C 
4.In which two situations do you configure local data storage? (Choose Two) 
A. Defining valid values for a property
B. Caching data retrieved from an external system
C. Storing reference data as part of the application
D. Saving case data in an application
Answer: A C 
5.As part of the case design, after someone completes a purchase, the application should send a confirmation email. 
How do you design the case life cycle to send the email? 
A. As part of the stage configuration
B. As an alternate stage
C. As part of the case configuration
D. As a separate process step
Answer: D 
6.You configure an application to allow users to download a mobile app. When users select one of the 
three supported platforms (Android, iOS, or Windows Mobile), the application opens a new window 
pointing to the appropriate app store. 
How do you configure this behavior? 

A. Add a button for each platform and configure an action set for each button. In each action set, specify a click event and add an action that opens the vendor's URL in a window.
B. Add one button and configure three action sets. In each action set, specify a click event and add an action that opens the vendor's URL in a window.
C. Add one button and configure one action set. In the action set, specify a click event with three actions to open each vendor URL in a window. Apply a when rule to each action to determine the correct URL.
D. Add three check boxes and one button. For each check box, configure an action set with a click event to set the value of the URL. For the button, configure an action set with a click event to open the URL in a window.
Answer: A 
7.Customers check their membership status with a company loyalty program by entering their full name 
and member ID number. Once the membership status is returned, the customer either abandons the 
case or makes changes to their membership. If the member chooses to make changes, a case ID is 
assigned to the request. 
Which two configurations, when applied in combination, achieve this behavior? (Choose Two) 
A. Configure the stage to resolve the case.
B. Configure the case type to create temporary cases.
C. Add a decision step to the process.
D. Add a Persist case step to the case life cycle.
Answer: B D 
8.Which two statements about data objects are true? (Choose Two) 
A. Data objects can reuse assets from an existing data object through inheritance.
B. A draft data object references a data type.
C. A data object created in App Studio creates a data type in Dev Studio.
D. Data objects are sourced from an external system of record.
Answer: A C 
9.Given a table which shows total working hours, sick, vacation. Identify how we calculate the respective 
values 
A. Total working hours
B. Calculate field, data transform
C. Sick hours
D. Leave hours
Answer: A 
10.A disrupted transaction case records account information using a page property. Account information 
is recorded at the time the case is created and does not update when the case is further processed. 
Account information is stored in an external system and accessed by a data page. 
How do you configure the account information page? 
A. Select refer to a data page on the page property
B. Configure the page property to refer to a keyed data page
C. Define a reference property that refers to the data page
D. Select copy from a data page on the page property
Answer: D
11.Choose two scenarios that you configure using procedural processing. (Choose Two) 
A. A prescription order page with a list of available prescriptions sent from the customer's health care provider. When the user opts to fill one or more prescriptions, the cost summary updates.
B. A restaurant reservation page in which the user chooses a reservation and the system returns the number of available tables.
C. A purchase order request page with a summary of items. The order total price updates after the customer changes a quantity.
D. A flight booking page where customers can adjust the location and date of the departure and return flights. The ticket prices recalculate after the customer chooses the "recalculate price" option.
Answer: C D 
12.DRAG DROP 
Select each Use Case on the left and drag it to the appropriate Automation on the right. 
Answer:
13.An online sales application supports both laptop and mobile devices. You are configuring the application skin and you notice the responsive layout in the mobile device is not displaying views as stakeholders require. 
Which two options allow you to resolve this situation without negatively impacting the laptop users? 
(Choose two.) 
A. Use the same application skin in all portals.
B. Update the process to give mobile users a separate portal.
C. Do not use a skin for the mobile application version.
D. Adjust the responsive behavior in the skin for optimal viewing in the mobile portal.
Answer: B D 
14.A customer refund case type requires that an auditor receives an email notification if the refund is 
greater than twice the price of the item. 
Which participant role do you select to configure this requirement? 
A. Customer
B. Interested individual
C. Owner
D. Work queue
Answer: B 
15.What are the minimum components of a user interface (Ul) action set? 
A. Two actions and one event
B. One action and one event
C. One action, one event, and one condition
D. One action and one condition
Answer: B
16.In a purchase request case type, you have the following requirement: Purchase requests should 
automatically go to a manager of an employee. 
To meet this requirement, you design a case with a_________ 
A. step that routes to the manager
B. change stage step to allow the employee to route to the manager
C. stage to route requests to the manager
D. process that routes to the manager
Answer: A 
17.You are designing a form for an online bookstore to show new arrivals. 
Which layout do you use to display the book cover pictures, as shown in the image? 
A. Screen layout
B. Column layout
C. Repeating dynamic layout
D. Dynamic layout
Answer: C 
18.Which issue do you address by simulating a data source? 
A. The product database moves to a new data source accessible by a web service that is not yet configured.
B. You need to test a save plan for a savable data page that updates the cost of coverage options for insurance policies
C. In production, the customer database needs to be taken off-line overnight for scheduled maintenance.
D. An Embedded data field needs simulated data for testing a customer creation view.
Answer: A 
19.While running a process, you notice that a read-only field on a form contains a value. 
Which tool allows you to determine if a declare expression was used to calculate the value? 
A. Declarative network
B. Clipboard tool
C. The Tracer
D. Live Ul
Answer: A 
20.You are creating a case type to process job applications for a large corporation. Job applications for security positions require a physical assessment in addition to the standard criminal background check. The physical assessment can occur before or after the background check. How do you configure a case type to achieve the required behavior? 
A. Create a process for the physical assessment that is followed by a process for the background check.
B. Create a process for the physical assessment that is parallel to the background check process.
C. Create a process on one stage for the background check and a process on another stage for the physical assessment.
D. Create a process for the background check and an optional process for the physical assessment.
Answer: B
21.Customers on a hotel booking application can add additional amenities to their reservation. The application displays a view with the available amenities, descriptions and costs. To reduce scrolling, the content is organized into multiple areas. Each area is accessed using a drop down menu that lists each amenity. 
How do you configure the user interface to improve access to the content and achieve the business requirement described? 
A. Configure a disable when condition on each field to allow access when the associated amenity is selected on the drop down control.
B. Configure a repeating dynamic layout with an embedded section for each amenity and set the layout format to grouped.
C. Configure a layout group to separate each amenity into individual panels and set the layout to a menu format.
D. Configure a visible when condition on the drop down control to display each section when the associated amenity is selected.
Answer: C 
22.A bookseller maintains a database of more than 10,000 book titles. You have been asked to configure a form that a allow users to select a book by title. 
How do you configure the form? 
A. Add a drop-down control arid source the data from the property value used in the control.
B. Add a drop-down control and Source the data using a data page.
C. Add an autocomplete control and Source the data using a data page.
D. Add an autocomplete control and source the data from the clipboard work page.
Answer: C F
23.You have been asked to create a pie chart that shows the number of cases each manager has created. A list report contains columns for manager name, case ID, and office. 
How do you configure the list report in order to create the pie chart? 
A. Group the case ID column.
B. Group the manager name column.
C. Summarize the manager name column.
D. Summarize the case ID column
Answer: D 
24.Which two items must be provided by the user to add an external data source to a data object? 
(Choose Two) 
A. The authenticating information, if required by the corresponding service
B. A data transform to map the application data model to the connector
C. A simulated data source to test the implementation
D. The uniform resource identifier that identifies the web service
Answer: A D 
25.An international online car parts business wants customers to find parts for any vehicle easily. You are asked to implement the following requirement: Customers muse select a make, model, and year to initiate a vehicle-specific search. 
How do you configure the data storage in the application to implement the requirement? 
A. Configure a data page to store the make, model, and year vehicle data.
B. Configure a connection to an external system of record that contains the make, model, and year vehicle data.
C. Configure a static list of the make, model, and year vehicle data.
D. Configure a local data storage of the make, model, and year vehicle data.
Answer: B 
26.Which two collaboration tools allow teams to communicate faster and share information more efficiently while resolving cases? (Choose two.) 
A. Dashboards
B. Widgets
C. Tags
D. Pulse
Answer: C D 
27.A door manufacturer offers a finite list of colors on all its doors. As part of the order, customers can select the color of the door. Select the data page definition configuration settings to source a color drop down list to minimize memory usage. 
Object Type » ACME-Products-Data-Color or ACME-Products-Work-Color or ACME-Products-Work ColorFeedback 
Edit Mode » Readonly Or Editable Or Savable Scope » Thread Or Requestor Or Node 
A. Page, ACME-Products-Data-Color,ReadOnly,Node
B. List, ACME-Products-Data-Color,ReadOnly,Thread
C. Page, ACME-Products-Data-Color,ReadOnly,Requestor
D. List, ACME-Products-Work-Color,ReadOnly,Node
E. List, ACME-Products-Work-ColorFeedback,ReadOnly,Node
F. List, ACME-Products-Data-Color,ReadOnly,Node
Answer: F 
28.A travel authorization requires approvals from the requestor's manager, division VP, and possibly an accountant based on the total amount. 
Which configuration satisfies this use case? 
A. Cascading approval using when rules to identify the assigned user
B. Cascading approval using the reporting manager
C. Cascading approval using an authority matrix
D. Cascading approval using the workgroup manager
Answer: C 
29.An application must validate postal codes for Canadian customers to match the pattern A1A 1A1, 
where A represents a letter, and 1 represents a number. 
Which two distinct configurations ensure that a user provides a valid postal code? (Choose Two)
A. Configure a drop-down control to select the postal code based on the specified city and province.
B. Configure the postal code field as a text property with a required input field.
C. Configure a validate rule to test that the entered postal code conforms to the required pattern.
D. Configure an edit validate rule to test that the entered postal code conforms to the required partem.
Answer: B D 
30.Which two requirements demonstrate the need to configure correspondence? (Choose Two) 
A. Fax a new insurance claim to the auto repair shop.
B. Text the customer with status changes in an insurance claim.
C. Assign a new insurance claim to a case worker to process.
D. Phone a customer for additional information about the case.
Answer: A B 
31.When a user selects a item in a list, the application displays data about that item. Data is copies to a page property using the Copy from a data page options. After the data has been copies to the property, when is the data copies to the property again? 
A. Never
B. The next time the case is opened
C. The next time the property is accessed
D. When the item is changed
Answer: C or D
32.Which statement about responsive breakpoints is true? 
A. Responsive breakpoints trigger selected behaviors to optimize data presentation.
B. Responsive breakpoint behavior changes based on the device brand.
C. Responsive behavior allows users to see all relevant information with scroll bars.
D. You configure custom responsive breakpoint display widths in Ag£ Studio.
Answer: A 
33.A library application used by staff creates a book request case when a member wishes to borrow one 
or more books. As part of the case process, the application shows the staff a read only list of outstanding 
past-due books to remind the member to return late books, select the Data page definition for this use 
case. 
A. List, Readonly, Thread
B. Page, Editable, Node
C. Page, Readonly, Requester
D. List, Readonly, Requestor
E. Page, Editable, Requester
F. List, Readonly, Node
Answer: D 
34.An application allows consultants to enter hours worked on a project on a weekly basis. Consultant 
hours need approval by the manager and the project supervisor. The approvals can occur in any order. 
Which approval configuration meets this requirement?
A. Configure a parallel process for each of the required approvals
B. Add the manager approval to an alternate stage in the case life cycle
C. Add an optional action for each approval in the appropriate stage
D. Configure a single cascading approval based on an authority matrix
Answer: A 
35.A requirement states: The tax identification number must contain 10 digits. 
How do you configure the field to support this requirement? 
A. Set the minimum and maximum values to "10" in a text field
B. Use an edit validate rule that validates the tax identification number pattern.
C. Use a decimal property type and make the field required.
D. Configure a validate rule to test the tax identification number pattern.
Answer: B 
36.How do you route an assignment so that any available member of the department can perform the 
task? 
A. Route the assignment to a work list.
B. Route the assignment to the admin user
C. Route the assignment separately to all members.
D. Route the assignment to a work queue.
Answer: D 
37.How do you propagate data to a new child case in Pega Express? 
A. Configure a data page to copy specified properties.
B. Configure a case calculation to copy specified properties.
C. Configure the Update Case shape to copy specified properties.
D. Configure the Create Case shape to copy specified properties.
Answer: D 
38.In an application that sells office supplies, the Payment view displays order items and collects 
payment information. In the Payment section rule, the order items are grouped in a dynamic layout. You 
find out later that the Order Summary view must also display the order items. 
How do you configure the Ul so that the order items display is shared between the Payment view and 
Order Summary view? 
A. Convert the Payment section layout that contains order items to a section, and embed this section in the Order Summary section.
B. Build the Order Summary section with a layout inside to group the order items, similar to the Payment section.
C. Embed the Payment section in the Order Summary section.
D. Reuse the Payment section in the Order Summary view and use a disable when condition to disable payment information on the Payment section rule.
Answer: A 
39.You are configuring an external data source using the Integration Designer. You have the REST, Dev,
Stage, and Prod endpoint URLs, and a name for the data source. 
What other information do you need to configure the external data source? 
A. The name of the database where the source data is stored
B. The data views using the external data source
C. A plan for mapping the data and REST response fields
D. A backup endpoint URL if the configured URL refuses to connect
Answer: C 
40.How do you enable field-level auditing for properties? 
A. Add an auditing optional action to the case workflow.
B. Enable the auditing feature on the property rule forms.
C. Enable field-level auditing for the case type.
D. Add a field validation to the case workflow.
Answer: B
41.Hospital staff members enter appointment details including relevant patient information, diagnoses, 
lab orders, and prescribed medication. This information is aggregated in the Patient visit summary view. 
The patient receives a copy of this view through email. 
Which two configurations, when applied in combination, achieve this behavior? (Choose Two) 
A. Add a Create PDF automation that references the Patient visit summary view.
B. Add a Send Email step and enable the option to include attachments.
C. Add a Send Email step and compose the message to reference the relevant properties.
D. Enable email notifications on the case type.
Answer: A B 
42.Users create Insurance Coverage Request Cases to authorize insurance payments. Users enter 
information that includes the name of the patient, the date of the procedure and the type of the 
procedure. After entering the information, the user submits the request for a review of the patient's 
insurance policy. Because multiple users enter requests, the duplicate requests can occur. A request is 
considered a duplicate if the patient name, procedure type, and procedure date match an existing 
request. You have been given two requirements: 
Ensure that users can identify duplicate requests. If a case is duplicated, it is not written to the database. 
Otherwise, write the case to the database. 
Which two options configure the application so that users can identify duplicate requests? (Choose two) 
A. Add a duplicate search step to the case life cycle design.
B. Configure a duplicate search decision table and add it to a Decision shape
C. Configure weighted conditions.
D. Configure a validation rule to validate matching cases.
Answer: A B 
43.You are testing an airline reservation case type that does not yet have a UI configured. You need to 
verify that changing the Purchase Insurance field in the Clipboard updates the TotalCost field. 
In which category of the Clipboard tools would you expect to find the Purchase Insurance field? 
A. Linked Property Pages
B. User Pages
C. Data Pages
D. System Pages
Answer: B 
44.What is the purpose of the Test coverage tool? 
A. To determine how many rules are covered and not covered bv Peqa Platform tests.
B. To determine which application needs to be assessed for test coverage.
C. To identity which users have the appropriate permissions to run test suites.
D. To create user-level test coverage reports, but not application-level coverage reports.
Answer: A 
45.An on-demand transportation application has a Conversation preference data type. When customers use the application to request a ride, they can specify their conversation preference: whether they would like to talk to their driver or if they would prefer silence. Company stakeholders are interested in analyzing the conversation preference data. 
How is the Conversation preference data type sourced? 
A. Local system of record
B. No system of record
C. External system of record
Answer: B 
46.With Pega's Situational Layer Cake approach, how do you configure a regional variation for Human Resources (HR) time off cases? 
A. Create a rule for the variation and add the rule to the common layer of the application.
B. Create a rule for the variation and replace the existing HR time off rule in the application common layer.
C. Create a rule for the variation and add it to a secondary common application layer.
D. Create a rule for the variation and add the rule to the layer for the region
Answer: D 
47.In a claims application customers can file home insurance claims. Each claims contains a list of items of loss. Depending on the situation, some claims… investigated for potential fraud in parallel to the actual claim process. 
Which two case types do you create to support this scenario? (Choose two.) 
A. Items of loss
B. Customer
C. Claim
D. Fraud Investigation
Answer: C D 
48.From the employee training portal, an employee opens a new Enrollment case, submits course selections, and receives an email confirmation. There is an error in the email confirmation. You must identify the cause of the error by recording a set of interactions on the portal and testing expected behavior on the data collection fields. 
What three steps, when applied in combination, achieve the required testing? (Choose Three) 
A. Add stage-entry validations on the Enrollment case fields.
B. Create a test case for the employee portal.
C. Add assertions on the Ul elements to verify correct data collection.(Ul Assertion)
D. Run a new Enrollment case from the employee training portal.
E. Add field validations on the course selection step.
Answer: B C D 
49.In a banking application, which two options must be used together to present users with a set of 
balance transfer options only if they select to transfer a balance to their credit card? (Choose two) 
A. Add an action set on the layout containing the balance transfer offers to trigger a refresh
B. Add a visible when condition on the check box for the balance transfer election
C. Add an action set on the check box for the balance transfer election to trigger a refresh
D. Add a visible when condition on the layout containing the balance transfer offers
Answer: C D 
50.What is the relationship between pyWorkPage and case data? 
A. pyWorkPage contains only the data entered by users while creating and processing a case.
B. pyWorkPage contains all the data pages accessed while creating and processing a case.
C. pyWorkPage contains only the data generated by the system while creating and processing a case.
D. pyWorkPage contains all the case data generated while creating and processing a case.
Answer: D 
51.Which of these options are typically configured on a dynamic layout? (Choose Two) 
A. Align columns and rows to present data in a spreadsheet
B. Label Positioning
C. Number of columns in each row
D. Alignment of field values
Answer: B C 
52.You are implementing a data entry screen to include an asset ID field to track company equipment. All 
asset IDs are eight characters in length. The first three characters are letters followed by a five-digit 
number. 
Which validation approach restricts entries for the asset ID field to the required format? 
A. Validate rule
B. Min/Max characters
C. Text data type
D. Edit Validate rule
Answer: D 
53.Which statement most accurately describes the use of pega mobile preview? 
A. pega mobile preview simulates the application user interface for various mobile devices
B. pega mobile preview allows you to run a pega application on a mobile device
C. pega mobile preview simulates user loads to test mobile app performance
D. pega mobile preview models a typical user interaction to scenario test a mobile app
Answer: A 
54.A restaurant has a case type that allows customers to book the dining room for events. Customers 
provide basic information including party size and indicate whether they want the restaurant to cater the 
event. 
If catering is not required, customers are given a rental rate quote. 
If customers indicate that they want the restaurant to cater the event, they must provide menu 
preference and schedule and appointment to do menu testing before they are given a quote. 
Which two options do you use to configure the case type to achieve the requested behavior? (Choose 
Two.) 
A. Create a check box for customers to indicate whether they want the restaurant to cater the event. Add a decision shape that evaluates whether the customer checks the box.
B. Create a check box for customers to indicate whether they want the restaurant to cater the event. Configure the menu preferences and appointment date fields with a visibility condition.
C. Create a process for providing menu preference and scheduling the menu tasting appointment. Create a parallel process for providing the customer with the rental rate quote.
D. Create a process for customers to indicate menu preference and schedule the menu tasting appointment. Add the process as a case-wide optional action.
Answer: A B 
55.A company requires that patients receive status updates during processing of medical tests. 
Patients are not users of the application. 
You create the work party for the patient as an instance of which class? 
A. Data-Party-Person
B. Data-Party-Operator
C. Data-Party-Org
D. Data-Party-Com
Answer: A 
56.A developer discovers that a calculated property value is returning an unexpected result. 
Which two features of the Tracer tool can you use to diagnose the problem while minimizing the impact 
on application performance? (Choose two.) 
A. The Save function
B. Breakpoints
C. The Watch function
D. The Clipboard tool
Answer: B C 
57.You create an application to track package deliveries. Choose three elements that are essential for 
this application. (Choose Three) 
A. A delivery cancellation child case
B. A shipment tracking case type
C. A set of fields to capture the shipping details
D. A work party to represent the customer
E. A user view to enter the shipping details
Answer: B C E 
58.To qualify for an instant loan, an applicant must earn a monthly income of at least GBP2000 and 
cannot exceed GBP20000 in total liability. 
How do you enforce these restrictions when requesting an instant loan? 
A. Use a Validate rule to call two Edit validate rules: one for income and one for liability.
B. Use two Edit Validate rules: one for income and one for liability.
C. Use a single Validate rule with two conditions: one for income and one for liability.
D. Use Ul controls to validate the entries in the income and liability fields.
Answer: C 
59.You are designing a medical claim case type and have the following requirement: Medical claims 
must be resolved within 5 days. To meet this requirement you need to set the____in the service level to 5 
days. 
A. passed deadline
B. urgency
C. deadline
D. goal
Answer: C 
60.The page .Product contains data retrieved from an external system of record using a data. 
How do you ensure.Product always contains the most current data from the data page? 
A. Select Refer to a data page on .Product.
B. Define a reference property that refers to the data page.
C. Configure .Product to refer to a keyed data page.
D. Select Copy data from a data page on .Product.
Answer: A 
61.Consider the following scenario: 
A customer files a fraud complaint. 
The complaint is investigated by a customer service agent. 
* The customer service agent may request additional information from the customer. 
* The merchant is notified and given 15 days to dispute the fraud claim. 
* If the fraud claim is approved, an affidavit is sent to the customer and a refund is posted totheiraccount. 
How do you name the step where the agent investigates the claim for fraud? 
A. Investigate Claim
B. Claim Investigation
C. Fraud Claim
D. Investigate Fraud
Answer: D
62.You are implementing a Ul form collecting job applicant information. Users must provide values to 
certain fields before submitting the form. 
Which configuration adds asterisks to indicate the mandatory fields on the form? 
A. Use a Validate rule to verify the mandatory fields have a value
B. Configure the mandatory fields as Required in the section rule
C. Use multiple Validate rules for each mandatory field
D. Use an Edit Validate rule to verify if each of the mandatory properties has a value
Answer: B 
63.Before development, your team creates a spreadsheet with work items to populate the backlog. All 
work items that describe business requirements are prioritized as Must have. 
You also create work items to address: 
A future enhancement request to group a set of existing steps into a multistep form 
A drop-down list that is missing one of the required options — This work item is in progress because the 
missing option prevents work from being done 
How do you populate the backlog directly from the spreadsheet? 
A. Import stories
B. Create bugs
C. Create stories
D. Create feedback
Answer: A 
64.A manager requests a report that contains the following columns: Create Date, Case ID, Create 
Operator, and World Status. You must sort the cases so the case with the most recent create date 
appears at the top of the list and descends in order. 
How do you design the report definition to support this requirement? 
A. Select Lowest to Highest sort type for Create Date.
B. Add a filter condition where Create Date is greater than the current date.
C. Select Highest to Lowest sort type for Create Date.
D. Make the Create Date the first column in the report.
Answer: C 
65.A report contains columns for Customer, Billing Cycle, Credit Card, and Expiration Date. A manager 
requests that the report show only those customers who meet the following conditions: - The customer is 
on a monthly billing cycle - The credit card is either MoreCash or Vista - The credit card expires within 60 
days. 
Which set of filtering conditions returns a report with the desired data? 
A. Credit Card equals MoreCash AND Credit Card equals Vista AND Billing Cycle equals monthly AND Expiration Date is 60 days greater than today
B. Credit Card equals MoreCash OR Credit Card equals Vista AND Billing Cycle equals monthly AND Expiration Date equals next 60 days.
C. Credit Card equals MoreCash OR Credit Card equals Vista AND Billing Cycle is not quarterly AND Expiration Date is less than 60 days
D. Credit Card equals MoreCash or Vista, Billing Cycle equals monthly, and Expiration Date equals next 60 days
Answer: B D 
66.A requirement states: A customer can update an address at any point during case processing by 
performing the following steps. 
1. The customer submits the new address. 
2. The application verifies that the address matches postal service requirements. 
3. The customer then approves the corrected address. 
How do you configure this requirement? 
A. Add a case-wide optional action to the workflow for the address submission.
B. Add a case-wide optional process to the case workflow to perform the address change.
C. Add an alternate stage to the case life cycle to change the address.
D. Add a button to each assignment to present the customer with a form to submit a new address.
Answer: A
67.You create an application for employees to submit timesheets. Employees enter work, vacation, and 
sick time for a particular week. On the entry form, employees see a summary of the total hours entered. 
After the employee submits the timesheet, the application displays remaining vacation and sick time for 
the employee. You configure the user view that displays remaining vacation and sick time. The balance 
calculates by subtracting the vacation time and sick time for the week from the current vacation and sick 
time balances. 
Which configuration option is used to summarize the remaining vacation and sick time? 
A. Use a When rule. When the application references the remaining vacation and sick time, each value calculates.
B. Use declarative processing. Whenever the vacation time or sick time entries change, the remaining vacation and sick time calculate.
C. Use pyDefault and pySetFieldDefaults. When the process invokes the data transforms, the remaining vacation and sick time calculate.
D. Use procedural processing with a data transform. Remaining vacation and sick time calculate after the user submits a timesheet.
Answer: B 
68.University admission application cases automatically advance in the case life cycle if the application 
standardized test scores are above a certain threshold. 
The threshold is determined each year based on the provided national average score. 
Which two configurations, when applied together, support this requirement? (Choose Two.) 
A. Configure a process with a decision shape that continues if the TestThreshold configuration setting is less than the applicant’s test score.
B. Configure a test Threshold Configuration setting that calculates the national average for the test score threshold.
C. Configure a process with a decision shape that continues if the TestThreshold Configuration setting is than the application’s test score.
D. Configure a TestThreshold Configuration setting with the national average for the test score threshold.
Answer: A D
69.A hotel booking application allows customers to change rooms after making a reservation. Each 
room's status in each hotel is stored on a data page sourced from an external database table. 
Which two configuration options, when applied in combination, do you use to update the database table 
when a customer changes rooms? (Choose Two) 
A. A savable data page that contains the room information
B. A when rule to trigger the database update
C. A data transform to copy updates to the data page
D. An editable data page that contains the room information
Answer: A C 
70.An accident claim case creates a vehicle claim case for each vehicle involved in an accident. 
Which two configurations prevent the accident claim case from resolving before all vehicle claims are 
resolved? (Choose Two) 
A. Add each vehicle claim as a child case of the accident claim.
B. Add a manual approval step to the accident claim case.
C. Add an optional process to pause the accident case until the vehicle claims are paid.
D. Add a wait step to the accident claim case to wait until ail vehicle claims have a status of Resolved.
Answer: A D 
71.In a Credit Card Payment case type, you want to set the payment amount to the minimum amount 
due when a user creates a case. 
How do you set the payment amount? 
A. Configure the pySetFieldDefaults data transform to set the default value.
B. Configure a field validation on the payment amount.
C. Configure the payment amount field to reference the minimum amount due.
D. Configure the payment amount as a calculated field.
Answer: A 
72.Which tool do you use to identify missing alternate text for an image? 
A. Clipboard tool
B. Accessibility Inspector
C. Tracer
D. Live Ul
Answer: B 
73.Which two configuration steps must be performed together to record a unit test for automated testing? 
(Choose Two) 
A. Add a test case to the Automated Testing landing page.
B. Select a ruleset that is configured to store the results of the test.
C. Select a ruleset that is configured to store automated test cases.
D. Add an assertion to define an expected result.
Answer: A D
74.DRAG DROP 
An organization requests the following behavior for a case type that allows customers to place orders for 
fulfillment. 
The application identifies customer information, such as user ID and locale, upon login. 
Cases list the last 10 orders placed by the customer, including the order status. 
Customers can select one of the previous 10 orders as the basis for the current order. 
Select each piece of Information on the left and drag it to the appropriate Clipboard Location. 
Answer: 
75.A home loan application requires approvals from the Legal team manager and the Finance team 
manager. The Legal team manager must approve before the Finance team manager. 
How do you configure this requirement? 
A. Create an approval process for each manager in parallel.
B. Apply business logic to route a single assignment in the correct order.
C. Create an approval step with cascading approval.
D. Route an assignment to a work queue where both roles have access.
Answer: C 
76.A purchase request list report includes columns for case ID and regional cost center. A manager 
wants to report to show the total of purchase requests for each of the regional cost centers. 
How do you configure the report definition? 
A. Create a filter for each cost center and count the case IDs.
B. Summarize the case ID column by count.
C. Summarize the regional cost centers by account.
D. Define a function for the cost center column to total the case IDs.
Answer: B 
77.Which business need do you address through delegation? 
A. A service representative must attach the appropriate form when emailing a customer
B. A risk officer wants to adjust the income threshold for automobile loans.
C. A care supervisor wants to authorize a second opinion for an insurance claim.
D. A general manager must approve catering proposals that exceed EUR5000
Answer: C 
78.Which two statements about data records are true? (Choose Two) 
A. Data records define permissible values for data fields.
B. Data records are displayed in a searchable text field by default.
C. Data records require external storage.
D. Data records are displayed in a drop-down list by default.
Answer: A D 
79.In a hotel reservation application, a form displays a list of hotels with available rooms based on the 
check-in and check-out dates entered by users. 
How do you configure the form to refresh the hotel list whenever the check-in or check-out date 
changes? 
A. Display the hotel in an embedded section with a visible when condition.
B. Configure edit validates on the date fields to refresh the section when the date values change.
C. Configure action sets on the date fields to refresh the section when the date values change.
D. Configure an action set on the hotel list display to refresh the section when the hotel list changes.
Answer: C 
80.Employees submit time-off requests that must be approved by their manager. If the requested time off 
is extended beyond three weeks, the manager, director, and a member of human resources (HR) must 
approve the request. 
Which two configurations, when applied in combination, achieve this behavior? (Choose Two) 
A. Create a decision table and evaluate all rows.
B. Use a cascading approval with an authority matrix.
C. Use a cascading approval with a reporting structure.
D. Configure custom approvals in the reporting structure.
Answer: B C 
81.Which requirement demonstrates the need configure correspondence? 
A. Phone a customer for additional information about the case
B. Case worker receives a mobile push notification to approve an insurance claim
C. Assign a new insurance claim to a case worker to process
D. Email the case worker when the insurance claim is routed to their worklist
Answer: D 
82.Which source do you select for a data page that contains the details of single record for a data type? 
A. Report definition
B. Data transform
C. Connector
D. Lookup
Answer: D 
83.Timesheets require the following approvals: 
Regular 40 hours -> Supervisor of employee 
Any overtime -> Manager of Supervisor 
Worked on weekend -> VP Finance 
Negative time-off balance -> HR Director 
Which two conditions require an authority matrix? (Choose two.) 
A. Worked on weekend -> VP Finance
B. Negative time-off balance -> HR Director
C. Any overtime -> Manager of Supervisor
D. Regular 40 hours -> Supervisor of Employee
Answer: A B 
84.You are asked to build a report listing customer order cases with an Order Total value over 
USD10000 sorted by Creation date (pxCreateDate). The report should display the following three fields: 
Case ID (pylD), Customer ID, and Order Total. 
Which property or property combination should you optimize to improve performance? 
A. Order Total
B. pxCreateDate
C. Customer ID and Order Total
D. pxCreateDate and Order Total
Answer: A 
85.Which two data requirements ensure valid data? (Choose Two) 
A. The data fits the business logic.
B. The data is organized in a data type.
C. The data is locally sourced.
D. The data is the correct type.
Answer: B D 
86.Which two statements about Configuration sets are true? (Choose two.) 
A. Used if a Dynamic System Setting does not meet the requirements
B. Used to organize Configuration settings with a common element
C. Configured by modifying the Data-Configuration-Settings class
D. Enables the business to control application behavior
Answer: B D
87.A flow action calls a pre-processing data transform to initiate values. There are several flow actions 
available for the assignment. You want to make sure that the values are only initiated once for each flow 
action. 
How do you implement a solution? 
A. Do nothing. The pre-processing data transform is only called once for each assignment.
B. Make sure that the flow action does not have the highest likelihood since it will always be invoked.
C. Configure the data transform as post-processing instead of pre-processing.
D. Add logic to the pre-processing data transform to test if values were already initiated.
Answer: D 
88.DRAG DROP 
Drag the appropriate ruleset version type on the left to the corresponding scenario on the right. 
Answer: 
89.A data page holds product information and has the Reload if Older Than field set to 30 minutes. The 
data page is created at 7:43. The user then performs the following actions: 8:10 the user refreshes the 
product information 8:45 the user refreshes the product information. 
At what time is the data page reloaded? 
A. 8:13
B. 8:10
C. 8:40
D. 8:45
Answer: D 
90.A user view includes a list of four urgency options selectable by radio buttons.
How do you configure the selection list? 
A. Configure a field group with selectable urgency options.
B. Configure a drop down field with selectable urgency options.
C. Configure a picklist with radio buttons for the urgency options.
D. Configure a Boolean field with selectable urgency options.
Answer: C 
91.Which studio do you use to configure a service level agreement (SLA) with a passed deadline? 
A. Admin Studio
B. Prediction Studio
C. Dev Studio
D. App Studio
Answer: C 
92.Consider the following scenario: - During the Interview process for a Job Application case, an 
administrative assistant selects the date and location of the interview. - Next, an email confirmation is 
sent to the candidate. - During the interview, the hiring manager captures notes from the discussion. - 
Finally, the candidate is assigned a technical exercise and the results are added to the case. 
Select two step names that follow the guidelines for identifying and naming the steps in the process. 
(Choose Two) 
A. Notify Candidate
B. Ask Questions
C. Schedule Interview
D. Technical Exercise
Answer: A C 
93.To qualify for an instant loan, an applicant must be older than 21 and have a monthly income of 
atleast USD2000. 
How do you enforce these restrictions? 
A. Use two Edit Validate rules: one for age and one for income.
B. Use a single Validate rule with two conditions: one for age and one for income.
C. Configure the Ul controls to only accept values geater than 21 for age and USD2000 for income.
D. Use two Validate rules: one for age and one for income.
Answer: B 
94.In which two of the following situations would you simulate an integration? (Choose Two) 
A. The service has slow response times.
B. The service is not available yet.
C. You need to test each flow path in the case processing.
D. The connector is configured to use global resource settings.
Answer: A B
95.An airline has the following requirement: A passenger requiring a service animal must document the type of animal, the size of the animal, and any relevant medical information the crew may need during the flight. The application prompts the passenger for this information when the passenger declares travel with a service animal. 
Which case life cycle configuration meets this requirement? 
A. Add a process to the case life cycle for service animal accommodation and apply a condition to determine when to, run the process.
B. Apply an optional action to the appropriate stage to allow the passenger to provide the information as needed.
C. Configure a stage in the case life cycle for service animal accommodation and apply a stage validation condition.
D. Create a child case for service animal accommodation to automatically resolve unless the passenger requires the accommodation.
Answer: A 
96.A developer discovers that a calculated property value is returning an unexpected result. 
Which two features of the Trace tool allow you to diagnose the problem without affecting application 
performed? (Choose Two.) 
A. Breakpoints
B. The Event monitor
C. The Watch function
D. The Clipboard tool
Answer: B C 
97.Which requirement is satisfied by configuring a service level agreement? 
A. Requests from customers with elite status go to a dedicated work group,
B. A transaction review is completed within 24 hours.
C. Users are notified when they receive an assignment.
D. Transaction dispute cases are considered more urgent than address change cases.
Answer: B 
98.Consider the following requirement: 
The patient must be able to modify physician details at any time without impacting primary case 
processing. 
Which configuration satisfies this requirement? 
A. Add a case-wide optional action to the case life cycle.
B. Add a primary stage with at least one process to the case life cycle.
C. Add an alternate stage with at least one process to the case life cycle.
D. Add an assignment to the case life cycle.
Answer: C 
99.You have been asked to create a report definition that includes information about the sales offices 
and sales representatives. The manager wants to access the report in the Report Browser in the user 
portal. The manager also wants to include the report in a new report category specifically for the sales 
group. 
What two configurations are required to support this request? (Choose Two)
A. Select the option in the Report Browser that allows users to view your report.
B. Create a report category rule for sales office reports.
C. Select the report definition option that displays your report in the Report Browser.
D. Add a report category for sales group reports in the Report Browser.
Answer: C D 
100.Before development, your team creates a spreadsheet with work items to populate the backlog. All 
work items that describe business requirements are prioritized as Must have. You also create work items 
to address: 
A future enhancement request to group a set of existing steps into a multistep form 
A drop-down list that is missing one of the required options — This work item is in progress because the 
missing option prevents work from being done 
How do you populate the backlog directly from the spreadsheet? 
A. Create bugs
B. Create feedback
C. Import stories
D. Create stories
Answer: C 
101.You should consider using a field value when the list of allowed values is ______________. 
A. three or fewer items
B. mostly static
C. specific to one case type
D. shared across all case types
Answer: D 
102.For which use case do you create a new rule in a Pega Platform application? 
A. A designer reuses a UI section every time the same behavior is needed in the application.
B. A developer makes changes to an email message that is configured in the case life cycle.
C. A designer uses Design mode at runtime to modify a view to use a two column template.
D. A developer creates a parallel process to audit the changes that a service agent makes.
Answer: A 
103.A customer calls to apply for a new bank account. The customer service representative (CSR) needs to perform an assignment named Select Account Type. During the discussion, the customer can request written information regarding different account types. 
Select the case lifecycle design that satisfies this requirement. 
A. A user view for requesting information to the Select Account Type assignment.
B. Add an optional action to the stage that contains the Select Account Type assignment.
C. Add a case-wide optional action.
D. Add a router to the Select Account Type assignment.
Answer: B 
104.A development team plans to enhance functionality of an existing application by changing several user interface rules. The team would like to pilot the enhancements to a small group of users before rolling the changes out to the entire user base. 
What approach maximizes reuse and maintainability? 
A. Place the updated rules into a new minor version of the ruleset and include the new ruleset version in a new application.
B. Place the updated rules into a new ruleset and include the new ruleset in a new application.
C. Place the updated rules into a new ruleset and include the new ruleset in a new version of the application.
D. Place the updated rules into a new minor version of the ruleset and include the new ruleset version in a new version of the application.
Answer: D 
105.You want operators in two separate units to be able to perform work routed to either un it. 
Which configuration supports this requirement? 
A. On each operator's record, associate the operator with both units.
B. On each operator's record, associate the operator with the same workgroup.
C. On the work group record, associate the operators with the workgroup.
D. On each unit record, associate both operators with each unit.
Answer: B 
106.Consider the following scenario: During the Interview process for a Job Application case, an administrative assistant selects the date and location of the interview. - Next, an email confirmation is sent to the candidate. - During the interview, the hiring manager captures notes from the discussion. - Finally, the candidate is assigned a technical exercise and the results are added to the case. 
Select two step names that follow the guidelines for identifying and naming the steps in the process. 
(Choose Two) 
A. Notify Candidate
B. Ask Questions
C. Schedule Interview
Answer: A C 
107.You create an application for employees to submit timesheets. Employees enter work, vacation, and 
sick time for a particular week. On the entry form, employees see a summary of the total hours entered. 
After the employee submits the timesheet, the application displays remaining vacation and sick time for 
the employee. To configure the form where users enter hours, select the best configuration option to 
calculate the total hours for the week. 
A. Use a When rule. When the value of any work, vacation, or sick time changes, the total hours change.
B. Use declarative processing. When the value of any work, vacation, or sick time changes, the total hours change.
C. Use procedural processing. When the value of any work, vacation, or sick time changes and the user submits the form, the total hours change.
D. Use a data transform. When the user enters the form, the data transform determines the sum of the work, vacation, and sick time properties.
Answer: B
108.ABC BankCorp wants to create a mobile app experience for users and CSRs for its Transaction Dispute application. 
Of the following requirements, which option requires you to configure distinct mobile app channels? 
(Choose two) 
A. CSRs can create other case type instances on the mobile app.
B. Mobile app color palettes are different for users and CSRs.
C. The mobile app customizes currency units and date/time format according to the location of the users.
D. The mobile app supports all mobile phone operating systems.
Answer: A B 
109.Color options are available to the customer, but the options are available on the screen, and do not 
appear with the popup. 
Which option to configure the color option? 
A. Dropdown
B. Radio button
C. Check box
D. Autocomplete/Textfield
Answer: B 
110.On a service level, the passed deadline interval is measured from 
A. the end of the deadline interval
B. when the assignment is ready for a user
C. when a user begins the assignment
D. the end of the goal interval
Answer: A 
111.You are developing a Visa case type to process entry visa applications. As part of the process, 
applicants schedule an interview with the consulate. An Interview child case is created for the interview 
process. 
Following the interview, the consulate reaches a decisions within 48 hours or more. For Visa case to 
proceed to application notification, the Interview case needs to be resolved. 
After you create the Interview child case, how to do you configure the case type to achieve the required 
behavior? 
A. Following the Create Case step, add a Wait step that pauses the parent case until the application schedules the interview.
B. Following the Create Case step, add a Wait step that pauses the parent case until the Interview reaches the Resolved status.
C. Following the Create Case step, add a services-level agreement (SLA) that escalates the parent case after 48 hours.
D. Following the Create Case step, add an Interview step that is automatically resolved after 48 hours.
Answer: B 
112.You want to unit test a rule. To ensure that the rule executes as intended, you need to populate the
clipboard with valid data. 
Which two options allow you to populate the clipboard before testing the rule? (Choose Two) 
A. Configure an assertion to define the required data.
B. Configure a validate rule to populate the needed data.
C. Run a data transform to create the test page.
D. Copy data from an existing clipboard page.
Answer: C D 
113.DRAG DROP 
Drag the term that is used in App Studio from the left to the rule that you use in Dev Studio on the right. 
Answer: 
114.To reduce scrolling on a view, you want to organize existing content so that details display when an 
option is selected in a drop-down menu. There is no drop-down menu currently on the view. 
Which two configurations achieve the business requirement? (Choose Two) 
A. Configure a layout group to separate each option into individual panels and set the layout to a menu format.
B. Configure a disable condition (when rule) on each field to allow access when the associated option is selected on the drop-down control.
C. Configure a repeating dynamic layout with an embedded section for each option and set the layout format to grouped.
D. Configure a data relationship to select the option using the Drop-down list record selection.
Answer: A C 
115.Creating a new rule in Pega Platform is typically done to define a new behavior or functionality in the application, which can then be reused as needed. In the given scenario, a designer is reusing a UI section every time the same behavior is needed in the application. By creating a new rule for the UI section, the designer can ensure consistent behavior and avoid duplicating effort. 
For which use case do you create a new rule in a Pega Platform™ application? 
A. A developer creates a parallel process to audit changes that a service agent makes.
B. A developer makes changes to an email message configured in the case life cycle.
C. A designer reuses a UI section every time the same behavior is needed in the application.
D. A business user issues a change request for the application to set the default value of a field.
Answer: C 
116.How do you reference the State property on an Address page group with the index Home? 
A. .Address(Home).State
B. .Home.State.Address
C. .Home(Address).State
D. .Address.Home.State
Answer: A 
117.To qualify for an instant loan, an applicant must earn a monthly income of at least GBP2000 and cannot exceed GBP20000 in credit card debt. 
How do you enforce these restrictions when requesting an instant loan? 
A. Use UI controls to validate the entries in the income and credit card debt fields.
B. Use a Validate rule to call two Edit validate rules: one for income and one for credit card debt.
C. Use a single Validate rule with two conditions; one for income and one for credit card debt.
D. Use two Edit Validate rules; one for income and one for credit card debt.
Answer: C 
118.Sales managers must be able to approve sales quote proposals by email and from a mobile device. 
How do you implement this requirement? 
A. Add an Approve/Reject step and enable email and mobile approval.
B. Add an Approve/Reject step and a Send Email step.
C. Add an Approve/Reject step with mobile approval enabled and a Send Email step.
D. Add an Approve/Reject step and enable email notifications on the case type.
Answer: A 
119.When processing an auto accident claim, the system requires three approvals: Approval from the 
adjuster who inspected the car, approval from the medical administrator who provided medical care to 
the insured, and approval from the insurance agent who verified the claim. 
How do you implement the requirements so each approver can work independently? 
A. Create three parallel processes with approval assignments.
B. Route to a workbasket where all three roles have access.
C. Create business logic to route to the different approvers.
D. Create an approval step with cascading approval.
Answer: A 
120.A company often receives multiple IT tickets for the same issue, such as ''the office Wi-Fi is down. You configure Search duplicate cases step to identify duplicate IT tickets. 
What is the basic condition for the Search duplicate cases step? 
A. Name of submitter is same
B. Issue type is same
C. Department is same
D. Office location is same
Answer: B 
121.Direct Capture of Objectives (DCO) aims to increase which two aspects of application delivery? 
(Choose Two) 
A. Accuracy
B. Coding
C. Speed
D. Performance
Answer: A C 
122.Depending upon the purchase request amount, approvals cascade from the users to a loan officer, 
then to a director and finally to a vice president. The loan officer is the user's manager. The director is the 
loan officer's manager. The vice president is the director's manager. 
Which two approaches can you use to configure the cascading approval? (Choose two) 
A. Approval based on Authority Matrix, with a Decision Tree rule to determine the approver(s)
B. Approval based on Authority Matrix, with a Decision Table rule to determine the approver(s)
C. Approval based on Reporting structure, using the workbasket manager to determine the approver(s)
D. Approval based on Reporting structure and when conditions, using each operator's reporting to manager to determine the approver(s)
Answer: A B 
123.In which three situations can you use a data transform? (Choose Three) 
A. To copy the first and last name properties into a single property value
B. To execute a flow action
C. To create the dependent property after case creation
D. To set default values for a case
E. To display the destination value as the location value
Answer: A D E 
124.An internal application currently grants 75 employees access to one of four roles: Admin, Author, 
User, and Manager. A new analyst that joins the company requires all the Author role access but only 
some of the reporting capabilities available to the Manager role.
How do you satisfy this security requirement? 
A. Update the Author role to include the required analyst reports.
B. Create a new Analyst role with the required access.
C. Add the analyst to the Manager role.
D. Add the analyst to both the Author role and the Case Manager channel interface.
Answer: B 
125.You need to test whether a user interface is suitable for users with visual disabilities, such as 
Deuteranopia (red-green confusion). 
How do you perform this task? 
A. Use the Accessibility Inspector.
B. Use a screen reader extension.
C. Enable the Live UI tool.
D. Unit test section rules.
Answer: A 
126.A requirement states When a customer applies for a credit card, a credit check must be completed 
in order for the credit card to be approved. 
Select the case type relationship that satisfies the requirement. 
A. Make both loan request and credit check top cases.
B. Make credit check a spin-off case of credit card request.
C. Make credit check a child case of credit card request.
D. Make credit card request a child case of credit check.
Answer: C 
127.In processing a parent case P-l, two child cases C-l and C-2 are created. 
Which of the following statements is correct about the processing of P-l, C-l, and C-2? 
A. P-l must be resolved before either C-l or C-2 can be resolved.
B. Either C-l or C-2 must be resolved before P-l can be resolved.
C. C-l must be resolved before C-2 can be resolved.
D. Both C-l and C-2 must be resolved before P-l can be resolved.
Answer: D 
128.Which two control types allow you to display three balance transfer offers on a form with a single 
control, to prevent the customer from selecting more than one offer? (Choose Two) 
A. Button
B. Radio buttons
C. Checkbox
D. Drop-down list
Answer: B D 
129.Which requirement can be implemented through circumstancing? 
A. An application establishes a goal of four hours to adjust claims for platinum customers. For other customers, the application establishes a goal of one business day.
B. An application sets the default shipping option for orders that exceed USD100 to two-day delivery. Otherwise, the default option is five-day delivery.
C. An application audits insurance claims that an insurance adjuster values at USD10000 or greater. Otherwise, the claim is approved.
D. An application routes upgrade requests for US customers to one work queue, and requests for European customers to a different work queue.
Answer: A D 
130.How do you indicate the progress of a case toward resolution? 
A. Apply service levels to the assignment steps.
B. Design intent-driven user interfaces.
C. Update the case status on the appropriate steps.
D. Configure a case notes field to capture progress information.
Answer: C 
131.You are configuring routing for a customer warranty service request. All warranty service requests 
are routed to the warranty resolution group except for warranty service requests for beta and release 
product that requires review by the vice president of service. 
How do you configure assignment routing to review warranty service requests? 
A. Route the assignment to the vice president of service who routes assignments to the warranty resolution group as needed.
B. Route the assignment to the warranty resolution group who sends an email notification to the vice president of service for the beta-release product.
C. Route the assignment to the skilled group for the beta release when the request is for the beta release. Otherwise, route the assignment to the warranty resolution group.
D. Route the assignment to the vice president of service when the request is for the beta release. Otherwise, route the assignment to the warranty resolution group.
Answer: D 
132.Select the three benefits of using Direct Capture of Objectives (DCO). (Choose Three) 
A. Generate the latest code from business-friendly metaphors.
B. Empower project participants to review development progress.
C. Facilitate collaboration between business and IT around working models.
D. Automate custom business processes.
E. Enter and store business requirements in the application.
Answer: B C E
133.Which two use cases are supported by configuring a mobile channel in App Studio? (Choose Two) 
A. Grant access to the application for a specific user.
B. Set the width of an application icon to 180x180 pixels.
C. Configure a left swipe behavior to open a message.
D. Lock the application after 20 minutes of inactivity.
Answer: C D
134.When applying for a credit limit increase, customers with standard credit cards must provide 
information in an Employment Information process. Requests from customers with Platinum credit cards 
automatically skip this process. 
What task do you perform to implement this requirement? 
A. In the Employment Information process add a card type true/false field to a user view.
B. In the Employment Information process add a custom condition to start the process by testing the card type.
C. In the Employment Information process add an Approve/Reject step to test the card type.
D. In the Employment Information process validate card type for continued processing.
Answer: C 
135.You need to localize correspondence into a language that is unavailable in the Pega language pack. 
Which option satisfies the requirement? 
A. Leverage translation services SOAP calls and enable records for translation.
B. Configure a field value record that contains the correspondence text.
C. Create the Translation rule manually and include the rule in the application ruleset.
D. Run the Localization wizard and add translations to Translation.html.
Answer: D 
136.In designing your application, you want to apply consistent visual styles to all parts of the 
application. 
How do you meet this requirement? 
A. Specify a skin in the application rule.
B. Apply styles to the screen layout.
C. Use the Live Ul tool to select the skin rule.
D. Specify a skin in the harness rule.
Answer: A 
137.You are a low-code developer that is interested in receiving personalized suggestions throughout 
application development. 
How do you achieve this in Pega Platform? 
A. Contact the Pega Support Center.
B. Install a browser plugin.
C. Use the Developer assistant pane.
D. Enable Pega GenAI features.
Answer: C 
138.You are developing a Visa case type to process visa applications. As part of the process, applicants 
need to schedule an interview with the consulate. A child Interview case is created for the interview 
process and assessment. 
Following the interview, it typically takes 48 hours for the consulate to reach a decision. For the visa case 
to proceed to applicant notification, the Interview case needs to be resolved. 
How do you configure a case type to achieve the required behavior? 
A. Add a Create Case step that creates the Interview child case. Following this step, add a Wait step that pauses the parent case until the Interview case reaches a status of Resolved and after 48 hours have elapsed.
B. Add a Create Case step that creates the Interview child case. Following this step, add a Wait step that pauses the parent case until 48 hours have elapsed.
C. Add a Create Case step that creates the Interview child case. Following this step, add a Wait step that pauses the parent case until the Interview case reaches a status of Resolved.
D. Add a Create Case step that creates the Interview child case. There is no need to add a Wait step.
Answer: C 
139.A customer wants to copy the contents of a previous order to their current order. 
What rule type do you use to copy the order contents? 
A. Data page
B. Data transform
C. Declare expression
D. Function
Answer: B 
140.Which scenario requires you to make updates in Dev Studio? 
A. A task is reassigned when it reaches a service-level agreement goal.
B. An email correspondence is added to the case type.
C. A customer representative can approve or reject a claim.
D. A new confirmation view displays a read-only text property
Answer: A B 
141.A manufacturing company has an Inventory data page that uses page structure. You need to write a 
single page of data to a single database row in the configured system of record. 
Which option fulfills the requirement? 
A. Data type
B. Connector
C. Insight
D. Database save
Answer: D 
142.To process an employee retirement package, the system requires approvals from the supervising 
manager, and the … 
How do you implement the requirements so that each approver can work independently? 
A. Create an approval step with cascading approval.
B. Create business logic to route the assignment to the different approvers.
C. Create three parallel processes with approval steps.
D. Route the assignment to a work queue to which all three roles have access.
Answer: C 
143.In which situation do you configure branched rulesets? 
A. One team creates a new patch for an application while another team creates a new major version of the application
B. You need to delegate rules to process owners from the business
C. Multiple teams need to work on the same application version
D. A team needs to work on the next version of an application while preparing to migrate the current version.
Answer: A
144.A survey is sent to a customer via email. 
How do you configure a solution to ensure the email includes the case ID for the survey? 
A. Create a required field for the case ID that must be entered by a user during the case process prior to sending the survey.
B. Call a data transform to copy the case ID from pyWorkPage to the email.
C. Create a process using the Send Email step allowing representatives to quickly add the case ID to the email.
D. Use the Insert Property feature of a Send Email step to add the case ID when composing the message dialog.
Answer: D 
145.While testing a business process to approve an expense report, you receive an error. 
Which tool allows you to review the rule execution to determine the source of the error? 
A. The Tracer
B. The Clipboard tool
C. The Application Profiler
D. The Dependency Analyzer
Answer: A 
146.A retail store wants an application to process a new customer loyalty account. The customer enters 
their contact information; including name, email, phone number, and address. This information is 
displayed in a data relationship. 
What type of data relationship do you create? 
A. A Data reference field
B. An Embedded data field
C. A Case reference field
D. A Query field
Answer: B
147.An online shopping application allows customers to select the item quantity of different goods and 
add items to the shopping cart. In the shopping cart, the application displays the price for each item type, 
indicates the quantity of each item type, calculate the total item prices, and calculate the total cost for all 
items in the shopping cart. The application pulls the price of each item type from a data page that 
references an external inventory management system. 
Select two unit tests useful in developing the shopping cart page. (Choose Two) 
A. Verify the data page has the correct item prices.
B. Verify the data transform copies the correct value from the data page to the shopping cart page.
C. Verify the price fields are displayed in the correct format.
D. Verify the order total cost property is accurately calculated
Answer: A C 
148.An online retailer allows customers to select a courier service for deliveries. The list of available 
courier services is drawn from a data type sourced in the Pega database. The Fulfillment department 
wants to allow local warehouse managers to add courier services to mitigate increases in delivery times 
and remove courier services that fail to meet delivery metrics. 
Which two options are required to allow local warehouse managers to update courier service records in 
production? (Choose two.) 
A. Create an access group for local warehouse managers.
B. Delegate the records for the courier service data type.
C. Define an approval process for adding and removing courier services.
D. Enable rule checkout for the local warehouse managers
Answer: A B 
149.You are building a form that contains a list of courses. Users will select the courses in which they 
want to enroll. 
Which two tasks must take place in Designer Studio? (Choose Two) 
A. Enable section editing and configure the selection check box by removing the caption.
B. Create a field group list property and make the property a data reference.
C. Configure the view in Run mode and change the order of the columns in the view.
D. Edit the field group list property and set data access to copy data from a data page.
Answer: D B 
150.A music studio allows clients to upload audio recordings, and if they choose, they can upload before they begin consultation. The studio wants to pause case processing after the Client Intake stage and give clients 72 hours to upload recordings before beginning the Client Consultation process. 
Which configuration meets this requirement? 
A. Configure a case wide optional action to allow uploads. Add a Wait shape with a Timer Wait type set to 72 hours.
B. Configure a service level on the stage that contains the Client Consultation process with a deadline of 72 hours.
C. Configure a child case to upload recordings. Add a Wait shape with a case dependency until the child case is resolved.
D. Configure a validate rule on the Client Intake stage and set the elapsed time to 72 hours.
Answer: B 
151.Which requirement is best implemented by using a Wait step in a case? 
A. You must pause a case until a user uploads a signed document.
B. You cannot proceed in an expense report until a manager approves the request.
C. You cannot complete a purchase case on a website unless you complete a new account subcase.
D. You need to send an email after a user completes a form.
Answer: C
152.Which two requirements ensure that valid data is used in a case? (Choose two.) 
A. The data fits the business logic.
B. The data is locally sourced.
C. The data is the correct field type.
D. The data is organized in a data type.
Answer: A C 
153.A customer views a product available in multiple color options. The customer must select only one 
color for each product. 
Which Ul control allows a developer to present the user with all color choices at once, without prompting 
or clicking, while ensuring that the user can only select one of the color options? 
A. Radio buttons
B. Text input
C. Drop-down
D. Check box
Answer: A 
154.Which of the following events can you trace by using the Tracer tool? 
A. User authentication
B. Data sources
C. Data transforms
D. Service-level agreements
Answer: D 
155.What two pieces of information comprise a data element? (Choose Two) 
A. The name of the referencing user view
B. The name of the data element
C. The name of the clipboard page D. The value of the data element
Answer: B D 
156.You are configuring an application to process travel reservations. The reservation case creates child 
cases for each booking component: flight, hotel stay, and vehicle rental. 
How do you update the total cost of the reservation as users update each child case? 
A. Define a case calculation to update the reservation total with the total of each child case.
B. Configure the Create Case shape to propagate the total cost from each child case to there servation. Create a declare expression to update the reservation total when the cost of each component changes.
C. Add the Update Case shape to the Reservation case type to capture changes to each component cost.
Answer: B 
157.You want your application to have consistent styling across portals. You want the background color 
of all buttons in your application to be blue. You want the background color of the buttons to be easily
updated in case corporate branding changes. 
Which attribute do you modify to set the background color? 
A. The application skin
B. The buttons format
C. The controls format
D. The background mixin
Answer: A
158.Several Development teams work on different enhancements. 
The release date for each enhancement is uncertain. 
Which two options allow each team to keep its work separate? (Choose Two) 
A. Create a new ruleset version for each team.
B. Set up a branch ruleset for each team
C. Create a new application for each team D. Create a production ruleset for each team.
Answer: A C 
159.A help desk ticket case type is defined as follows: 
If the Process ticket step is configured to set the status to Pending-Triage, when is the status of the case 
set to Pending-Triage? 
A. When the Process ticket step starts
B. When the Triage stage starts
C. When the Enter Ticket Details step completes
D. When the Process ticket step completes
Answer: A
160.Based on security factors, which two options are considered strong passwords? (Choose Two) 
A. lLik3Chocolate&sawDustIcecre@m
B. d8073&gxn*,.ki;vnhdf($h&m
C. bluedoor
D. Pe6@5yst3m$
Answer: A B 
161.An order fulfillment case type allows a customer to update user profile information during the order 
placement stage. 
The user profile consists of the following three pages:
Account ID and password Customer contact information A list of open orders with the status of each 
order. 
How do you configure the case type to allow customers to update any of the user profile pages at any 
time during case processing? 
A. Add an optional process to the case workflow.
B. Add a button for each profile page to each assignment.
C. Add an alternate stage to the case life cycle.
D. Add a set of optional actions to the case workflow
Answer: D 
162.A requirement states: When a business guest checks out of a hotel, the guest must complete a hotel 
review to receive a corporate discount. 
Select the case type relationship that satisfies the requirement. 
A. Configure hotel review as a spin-off case of the checkout request.
B. Configure checkout request as a child case of hotel review.
C. Configure both checkout request and hotel review as top-level cases.
D. Configure hotel review as a child case of the checkout request.
Answer: D 
163.Using the following Refund case life cycle, how do you design this case to skip the Item Return 
stage if the item will not be returned? 
A. Replace the Wait step in the Item Return stage with a Change Stage step.
B. Add a condition to skip the Item Return stage when a return is not necessary.
C. Add an Item Retention alternate stage and define a process for retention of item.
D. Add a decision in the Item Return process to change the stage when a return is not necessary.
Answer: B 
164.Which device characteristics should be considered when designing a mobile app? 
A. Customize controls for each responsive breakpoint.
B. Test applications in the mobile preview.
C. Design for finger taps.
D. Use fixed positioning.
Answer: C 
165.Which option follows best practices for naming a ruleset in Pega…… 
A. Pega-prod:01-04-01
B. Grand-Corporation-Human-Resources-Department:01-01-03
C. Credit Check:03-01-02
D. Expense:01-02-05
Answer: D 
166.Which two conditions do you test with a unit test? (Choose Two) 
A. A data page populates without any errors.
B. A property value is set correctly by a data transform.
C. An application displays user views for 20 users within three seconds.
D. An application is successfully migrated to a test system.
Answer: A B
167.Customers can log their own product support requests using an online portal. Once logged in, the 
portal displays the list of products purchased by the customer. The customer can initiate one or more 
support requests for each product. 
What is the appropriate scope for a data page that sources the list of products purchased by the 
customer? 
A. Thread
B. System
C. Requestor
D. Node
Answer: C 
168.During a playback session, a stakeholder notices that a drop-down list is missing one of the required 
options. 
Which work item do you create in Agile Workbench to address this issue? 
A. User Story
B. Bug
C. Feedback
D. Status
Answer: B 
169.Which three use cases demonstrate the Pega dynamic Ul behavior? (Choose Three) 
A. Display a message upon form submission that a date field must be in the future.
B. Unmask a password field when users click an icon.
C. Automatically calculate order total when users change quantities.
D. Display partner information fields when a screen loads for married applicants.
E. Display a shipping address section when users select the Different than billing address check box.
Answer: B D E 
170.How do you configure the application to display a field for entering a mobile phone number only when the check box is selected? 
A. Use a when condition in a data transform to determine whether to show the mobile phone number field.
B. Use a when condition in the flow to branch the flow based on case data.
C. Use a circumstance on the check box property to create a rule variant that is effective when the check box is selected.
D. Use a when condition in the UI form to determine whether to show the mobile phone number field.
Answer: D 
171.In a hiring application: 
* An employee interviews the candidate.
* The Human Resources (HR) team creates and send s the officer letter. 
* The Information Technology (IT) team assigns the workstation. 
* The facilities team assigns the work desk. 
To meet these requirements, what persona do you create? 
A. Employee, IT, Facilities
B. HR, IT, Facilities
C. Employee, HR, Facilities
D. Employee, HR, IT Facilities
Answer: D 
172.In an Online retail application, the Order Receipt view displays a list of the product ordering, 
including the product image, unit cost, and quantity. The total cost of the order is displayed at the bottom 
of the view. 
Which two configurations on the Receipt view must be together to display the required information as 
described? (Choose two.) 
A. Add a repeating dynamic layout with embedded dynamic layouts.
B. Add the total cost inside the repeating dynamic layout.
C. Add a dynamic with an embedded repeating dynamic layout.
D. Add the total outside the repeating dynamic layout.
Answer: C D 
173.A requirement for a hotel reservation case type states that as customers change their room 
selection, the total cost of the reservation updates. 
How do you satisfy this requirement? 
A. Configure a Validate rule for the room selection step.
B. Apply a Disable when condition to the total cost field.
C. Add a When condition to the room selection step.
D. Define a declare expression for the total cost field.
Answer: D 
174.In a construction application, the user access group is configured with an Access of Role to Object 
record as shown in the following image:
Currently, the application is in the quality assurance environment. 
Which three operations can users perform in the application at this level? (Choose three.) 
A. Modify instances
B. Run reports
C. Modify rules
D. Open instances
E. Delete rules
Answer: A B D 
175.You configure a service level to adjust assignment urgency to 100 when the goal interval lapses. 
How does assignment urgency impact the deadline and passed deadline intervals? 
A. Urgency value remains at 100, but other service level processing continues.
B. Urgency value continues to increment as configured.
C. Service level processing is halted until the assignment is completed.
D. The user is notified that the maximum urgency has been reached.
Answer: A 
176.You are asked to create a custom status named Open-Review. This status is to be applied to 
assignments in one application. 
How do you satisfy the request? 
A. Circumstance the existing Open field value record on the application name and update the status value to Open-Review.
B. Add the Open-Review status to the Application record for the application.
C. Create a field value record named Open-Review for. pyStatusWork with the Apply To class set to the class group.
D. Create a field value record named Open-Review for. pyStatusWork and configure an Access When record to apply the status to the correct application
Answer: C 
177.Which two statements are true about minimum lovable product (MLP) sizing when using the 
Estimator tool? (Choose two.) 
A. MPL complexities set to "high" are reserved for MLP 2 and later.
B. MLP sizing leads to precision in the sprint cycle and resource planning.
C. Creation of case steps is factored into MLP sizing.
D. Initial estimations are high-level and can be refined during sizing.
Answer: B D 
178.You are asked to create a visualization that allows managers in the Customer Service division to track the number and status of Customer Support Request cases submitted over the last 30 days. 
What is the process that you follow to create this visualization? 
A. Create a new report on the Data landing page.
B. Add a report widget to a portal on the Explore data landing page.
C. Add a new portal on the Channels landing page. D. Create a new Insight on the Explore data landing page.
Answer: B 
179.While testing a form, you need to verify the contents of a data page in memory. 
Which tool do you use to view the current contents of the data page? 
A. The Clipboard tool
B. Case Designer
C. The Data Explorer
D. Live UI
Answer: A 
180.When applying for a credit limit increase, customers with standard credit cards must provide information in an Employment Information process. Requests from customers with Platinum credit cards automatically skip this process. 
What task do you perform to implement this requirement? 
A. Add an Approve/Reject step to test the card type.
B. Add a card type true/false field to a user view.
C. Add a custom condition to start the process by testing the card type.
D. Add a validation condition to the card type for continued processing.
Answer: C 
181.Users must provide values to certain fields before submitting a job application form. 
Which configuration adds asterisks to indicate the mandatory fields on the form? 
A. Use an Edit Validate rule to verify if each of the mandatory properties has a value.
B. Configure the mandatory fields as Always Required on the form at runtime.
C. Use a Validate rule to verify the mandatory fields have a value.
D.  Configure a Disable when condition on the mandatory fields at runtime.
Answer: B
182.Which two of the following use cases do you implement by using one or more calculated fields? 
(Choose Two) 
A. A sales representative wants to quote the cost of an insurance policy based on selected coverage options.
B. An accountant wants to list the largest order for the last month, for each customer account.
C. A project manager wants to estimate the cost of painting a banquet hall based on labor and materials required.
D. A certification manager wants to determine the number of exams conducted at each testing facility in the current quarter.
Answer: A C
183.Which two statements demonstrate the role of a report? (Choose Two) 
A. Reports are used to assess process performance.
B. Reports are used to update data in a database.
C. Reports are used to select items from a list while working in an assignment.
D. Reports are used to source a list of selectable items while working in an assignment
Answer: A D 
184.A government application provides field placeholder values to help users enter the correct data. The 
Design Lead has asked you to increase the font size on all field placeholder value components to help 
visually impaired users. 
Which configuration applies the font styling requirement on the field placeholder values in the 
application? 
A. Update the existing Default theme text entry
B. Run a case type that uses the component and change the font on the view
C. Add a new theme text entry to the application theme D. Upload a new application theme
Answer: C 
185.You are configuring an accident claim case for an automobile insurance company with two child 
cases as illustrated. 
How do you suspend the Accident Claim case processing until the Vehicle Damage and Body Injury 
cases are resolved? 
A. Add a wait shape to the parent case pausing the parent case until the child cases resolve.
B. Add a service level agreement to resolve the child cases within 90 days.
C. Add a 30-day wait to the parent case to allow time for the child cases to resolve.
D. Add an approval shape to each of the child cases to resolve the cases.
Answer: A 
186.You have created a new report that contains a list of employees, hire dates, and managers. You 
have been asked to display each manager in a row. Beneath each manager row, you must list the 
manager's employees and their hire dates. 
How do you support this request?
A. Group the manager column
B. Filter the manager column
C. Summarize the manager column
D. Sort the manager column
Answer: A 
187.Which two options are process reports? (Choose two.) 
A. The number of customer support request cases created for each week.
B. Average duration and timeliness for each assignment.
C. Total customer inquiry cases for each state for each product line.
D. Top 10 merchants with highest percentage of fraud cases.
Answer: A B 
188.A form must support accessibility. 
How do you enable a user to specify a date? 
A. Configure a text box to allow date entry.
B. Use a calendar control that displays an entire year.
C. Use a calendar control that displays an entire month.
D. Provide separate controls for month, day, and year.
Answer: C (used flagged to be D) 
189.An organization has two lines of business: selling books for children and reselling college textbooks. 
The division selling books for children can use the same basic user interface (Ul) as the division reselling 
textbooks with the exception of the payment methods. 
How do you apply the Situational Layer CakeTM in this scenario? 
A. Place the Ul rules in the base layer, and create a new layer for the payment rules for both lines of business.
B. Place the Ul rules and generic payment method rules in the base layer, and create a new layer for the division-specific payment rules.
C. Place the Ul rules in the base layer, and create a parallel base layer for the payments rules.
D. Place the Ul rules in the base layer, and create a new layer for the payment rule for each division.
Answer: B 
190.Apartment tenants submit maintenance requests that specify their name, address, request type, and description of the request. Tenants may submit multiple maintenance requests for different request types. The company wants to identify duplicate maintenance requests from the same address. 
Which two configurations, when used together on the Search duplicate cases step, achieve this goal? 
(Choose Two) 
A. Configure the request type as a weighted condition.
B. Configure the tenant name as a basic condition.
C. Configure the apartment address as a basic condition.
D. Configure the apartment address as a weighted condition.
Answer: A C
191.Which use case describes the function of the Estimator tool? 
A. A tester needs to know how many versions of an application they test for MPL2.
B. A business architect needs to know when to prioritize a specific customer Microjourney for development.
C. A product owner needs to know how many user stories to create in Agile Workbench for MLP 1.
D. A stakeholder needs to know how much time and effort is needed to build MLP2.
Answer: D 
192.A reservation process allows customers to reserve a flight, hotel room, and rental car as part of a 
travel itinerary. 
Which configuration displays a check box to allow users to select travel insurance only if the itinerary 
includes a flight? 
A. A visible when condition applied to the check box
B. An action set applied to the check box
C. A declare expression configured for forward chaining
D. A validate rule applied to the flow action
Answer: A 
193.A human resources application contains reports that are used to review hiring practices. The product 
manager has asked you to test the recent hire training report. 
How do you run a unit test on the report? 
A. Create a copy of the rule and use the run rule window
B. Initialize the rule with test data using the run rule window
C. Identify a data test page to unit test the rule
D. Run the report definition using the contents of a database table
Answer: B 
194.A list report includes columns for purchase requests and regional cost centers. A manager wants 
there report to show the total number of purchase requests for each of the regional cost centers. 
How do you configure the report definition? 
A. Use the purchase requests column to group the cost centers.
B. Filter the results so that the report includes only cost center and purchase requests.
C. Summarize the purchase requests column by count.
D. Summarize the regional cost centers by count.
Answer: C 
195.An internal application grants 75 employees access to one of four personas: Admin, Author, User, 
and Manager. A new analyst who joins the company requires all the access of the Author persona, but 
only some of the reporting features that are available to the Manager persona. 
How do you satisfy this security requirement? 
A. Add the analyst to the Author persona.
B. Create a new Analyst persona with the required access.
C. Update the Author persona to include the required analyst reports.
D. Add the analyst to both the Author persona and Manager persona.
Answer: B 
196.A business architect has developed a new process for a case type. To verify that the UI elements 
collect the expected result, you want to test the process and the fields. 
Which two configurations, when used together, allow you to record a set of interactions and save the test 
result to verify process functionality? (Choose two.) 
A. Create a unit test for the case type.
B. Create a scenario test for the case type.
C. Add explicit assertions on the UI elements.
D. Add explicit assertions on the Scenario testing landing page.
Answer: B C 
197.In a Credit Card Payment case type, you want to set the yearly fee to USD 75. 
How do you set the Yearly fee field? 
A. Configure field validation on the Yearly fee field.
B. Configure the Yearly fee find to reference the minimum amount due.
C. In the Data initialization page, set the Yearly fee field to 75.
D. Configure the Yearly fee field as a calculated field.
Answer: C 
198.Which two statements are true about styling controls in App Studio? (Choose two) 
A. Developers can configure a Date Time control to display as a text input field, drop-down list, or calendar control.
B. Developers can configure a text input control to change the background when users click the control.
C. Developers can configure a button control to hide when users click the control.
D. Developers create a new style format to apply styling to an out-of-the-box button control.
Answer: A B 
199.A Declare expression evaluates a circumstanced decision tree. The decision tree evaluates a 
property set by a data transform. 
What two steps do you perform to ensure that the decision tree is configured properly? (Choose 2) 
A. Test the declare expression to verify that the rule is configured correctly
B. Configure a test page with data to satisfy the circumstancing condition
C. Specify the value of the circumstancing property when prompted in the run rule dialog
D. Test the data transform to verity the result is correct
Answer: A B 
200.ABC BankCorp operates two subsidiaries, GloboBank and LocalBank, with different brandings. ABC BankCorp wants to create a mobile app experience for both users and customer service representatives (CSRs) for its Transaction Dispute application. 
Of the following requirements, which two options affect the number of mobile app channels that you need 
to configure? (Choose Two) 
A. Mobile apps must support both phones and tablets.
B. Customers can create only dispute cases, while CSRs can also create fraud report cases.
C. Mobile app color palette is customized for each subsidiary.
D. The app customizes currency units and date/time format according to the user's locale.
Answer: B C 
201.An internet provider has a quiz that gives customers a recommended internet speed based on their 
typical internet use. The questions differ based on the selections that the customer makes, for example, 
whether they are seeking a recommendation for a residence or a business. 
Once the customer completes the quiz, how do you determine the recommended internet speed? 
A. Configure a decision table
B. Configure a view with the quiz questions
C. Configure a decision tree
D. Configure a process with multiple decision shapes
Answer: A
202.In the first step in a case type, the user compares data on a form to the data on a customer account. 
If the data matches, the case is resolved. If the data does not match, the user advances the case to 
update the account. 
Management only wants a record of the cases that update an account. 
What two configuration options do you use to implement this requirement? (Choose Two) 
A. Add a persist case shape after the first step.
B. Configure the starting flow to instantiate the case type as a temporary case.
C. Apply a when condition to the first step to persist only cases requiring updates.
D. Configure the first step to instantiate the case type as a temporary case.
Answer: A C 
203.How do you identify if a result in a decision rule cannot be returned? 
A. Test for missing conditions
B. Test for completeness
C. Test the rule using a unit test
D. Test for conflicts
Answer: B
204.All managers must be able to view the Employee vacation requests report in their Manager portal 
dashboards. 
Which configuration fulfills this requirement? 
A. Create a new landing page on the portal with the new report saved in a public category.
B. Add a report widget to the portal dashboard, and then click Publish to default.
C. Add a report widget to the portal dashboard, and then click Publish.
D. Add the report to a public category, and then add the out-of-the-box Reports landing page to the portal.
Answer: D 
205.Which two statements are true about insights? (Choose Two) 
A. Insights transform data queries into sharable visualizations.
B. Visibility is always shared for insight charts.
C. You can edit application data directly in an insight.
D. You can use only preconfigured fields in an insight.
Answer: A D 
206.You are building a new booking application in pega platform with a case type that displays a 
customer's various accounts and allows them to make banking transactions. The transaction data object 
allows customers to dispute a transaction. The system provides a drop-down list of reasons for the 
dispute, which are collected along with the transaction ID. 
According to pega best practices, which option do you use to source the transaction data object? 
A. External system of record
B. A data page
C. Pega platform system of record
D. No system of record
Answer: A 
207.Which two statement are true about insights? (Choose two.) 
A. You can search for an select the fields that you want to include in an insight.
B. You can transform data queries into sharable visualizations.
C. You can transform sharable visualizations into data queries.
D. You can edit application data directly in an insight.
Answer: A B 
208.You are developing a case type that processes scholarship applications. Scholarship applications 
advance based on the standardized test scores of the applicants. A decision shape directs the process 
flow. You want to test whether the process flows correctly, but you have not fully configured the user 
interface so that applicants can enter their standardized test scores. 
How do you test that the process flows correctly based on the decision? 
A. Use the Run Rule window to create a unit test to evaluate the flow rule.
B. Use a declare expression to set a value for the standardized test score field.
C. Use Live Ul to see how the case processes and if an error occurs.
D. Use the Clipboard tool to set a value for the standardized test score field.
Answer: A 
209.A reservation process allows customers to reserve a flight, hotel room, and rental car as part of a 
travel itinerary. 
Which configuration displays a Select flight insurance checkbox only when the itinerary includes a flight? 
A. A visibility condition (When rule) that applies to the Select flight insurance checkbox.
B. A visibility condition (When rule) that applies to the view with the flight insurance information.
C. A disable condition (When rule) that applies to the Select flight insurance checkbox.
D. A disable condition (When rule) that applies to the view with the flight insurance information.
Answer: A
210.Which three statements are true about DevOps practices in pega priority. (Choose three)
A. Intermittent delivery is preferred to help plan predictable releases
B. Acceptance criteria helps to focus customer-centric deployment
C. Pega can integrate third-party DevOps tools to promote flexibility
D. DevOps promotes larger releases in shorter development cycles
E. Tests are run before publishing changes to ensure compatibility
Answer: B C E 
211.A requirement states: The date of birth submitted for first grade students must be at least five years 
before September 1 of the current year. 
Which three validation methods, when applied in combination, satisfy the requirement? (Choose Three) 
A. When rule
B. Calendar control
C. Date data type
D. Validation rule
E. Edit validate rule
Answer: A D E 
212.In an insurance claim application, you have the following requirement: All claims must be resolved 
within 1 week. 
To meet this requirement you configure a service level. Where should the service level be configured? 
A. The process
B. The stage
C. The case type
D. The step
Answer: C 
213.Identify the two requirements that are satisfied by using a data transform. (Choose two.) 
A. Display the same data on multiple user views.
B. Convert integer data to text data.
C. Copy an existing order to a new case.
D. Validate the format of a property value.
Answer: B C 
214.A form listing nearby restaurants has four columns: 
Restaurant name Restaurant location Thumbnail image of the seating area Make reservation (check 
box) You want to ensure that users have the information they need to make a reservation regardless of 
screen size. When viewed on a small screen, you do not need to display the images. 
What three configuration steps do you take to support this requirement? (Choose Three) 
A. Set the importance of the image column to Secondary.
B. Set the importance of the Make reservation column to Primary.
C. Set the importance of the image column to Other.
D. Set the importance of the Restaurant name and Make reservation columns to Primary.
E. Set the importance of the Restaurant location and Make reservation columns to Secondary.
F. Set the importance of the Restaurant name column to Primary.
Answer: A D E 
215.Which statement about channel interfaces is true? 
A. Creating a channel interface creates a default work queue in Agg Studio.
B. All users see the same channel interface.
C. A persona requires a unique channel interface.
D. Channel interfaces are user interfaces that meet business requirements.
Answer: D 
216.How do you guide users through an application form without requiring user training? 
A. Add the corresponding step to an appropriate stage.
B. Send a notification to the assigned user.
C. Add an instruction to the assignment.
D. Add an optional action to the case to explain the task.
Answer: C 
217.Which requirement is fulfilled by configuration a field value? 
A. Service agents are able to enter feedback in multiple languages.
B. A global hotel chain application can display current amenities in 23 languages.
C. Customers can add an unlimited number of items to an online shopping card.
D. A government official can enter comments that require location.
Answer: B D 
218.Your online shopping application serves international customers. You need to define a Data Page 
that holds currency exchange rates. All users accessing the application need to use the information. 
The Scope of this Data Page should be set to____. 
A. Application
B. Node
C. Thread
D. Requestor
Answer: B 
219.Which two options can you configure for a mobile app channel? (Choose Two) 
A. Define security behavior for a mobile app such as biometric identifiers.
B. Manage administrative functions such as access to log files.
C. Define the Ul behavior for each view in a case type when the case is displayed on a mobile device.
D. Design how Ul elements render across different mobile devices.
Answer: A D 
220.A requirement states: Loan applicants must enter their annual salary. If the salary is above the qualifying threshold, the application is automatically approved. If the salary is below the threshold, the applicant must identify a cosigner. 
Select the two configuration options that follow best practices to meet the requirement. (Choose Two) 
A. Design a user view with an annual salary field and a data relationship for cosigner information. Use a visibility condition to display the cosigner information when the salary is below the threshold.
B. Use a collect information step with an annual salary field. Use a decision shape to determine whether to advance to a step to enter cosigner information or complete the process.
C. Design a user view with an annual salary field. Create an optional action to collect information about the cosigner and assign the action to the appropriate stage.
D. Create an assignment step for a loan officer to review the applicant's annual salary and determine if a cosigner is necessary.
Answer: A B 
221.User A should have application permissions that are identical to User B's permissions. Unlike User 
B, User A lacks access to the My Cases page. 
How do you grant access to the My Cases page for User A? 
A. Update User A to the same role as User B
B. Add the My Cases page to the User A profile.
C. Update the User A account to access the same portal as User
D. Add the My Cases page to the User A role
Answer: D
222.Identify Text, Multi record data relationship, Single record data relationship 
A. .Address( 1 ).pincode
B. .ShippingAddress.City
C. .BillingAddress.Telephone
Answer: A B C 
223.A life insurance company has satellite offices in various countries. Each satellite office has a work 
queue. 
Company policy requires that life insurance underwriting be assigned to offices based on the policy 
owner's residential address. 
Which routing approach supports this requirement? 
A. Route the assignment to the correct work queue by using an authority matrix.
B. Route the assignment to the correct work queue based on business logic.
C. Route the assignment to a specific underwriter based on business logic.
D. Route the assignment to the correct work queue by using a reporting structure.
Answer: B 
224.Users can access an apartment hunting application from different devices with different screen 
sizes. 
A screen displays the photos of available properties. By default, the photos are displayed in three 
columns. When the screen width is less than 800 pixels, the photos should be displayed in two columns. 
How do you implement the screen for this requirement? 
A. Use a dynamic layout with a responsive breakpoint at 800 pixels to change from inline-grid tripleto inline-grid double format.
B. Use a column layout with a responsive breakpoint at 800 pixels to hide the left column.
C. Circumstance the layout to display different number of columns at different screen sizes.
D. Circumstance the section rule to display different number of columns at different screen sizes.
Answer: A D 
225.A business architect has developed a new process for a case type. To verify that the UI elements 
collect the expected results, you want to test the process and the fields. 
Which two configurations, when used together, allow you to record a set of interactions and save the test 
results to verify process functionality? (Choose Two) 
A. Add explicit assertions on the UI elements
B. Add validations on the UI elements
C. Create a unit test for the case type
D. Create a scenario test for the case type
Answer: A D 
226.DRAG DROP 
Consider an application built on the Constellation architecture. 
Select each description on the left and drag it to the appropriate UX concept on the right. 
Answer: 
227.Which two components on the Case Designer can users assign to a minimum lovable product (MLP) 
release for project sizing purposes? (Choose Two)
A. An automation
B. A mobile User Portal
C. An approval decision
D. An external system of record (SOR)
Answer: A C 
228.In a Credit Card Payment case type, you want to set the yearly fee to USD 75. 
How do you set the Yearly fee field? 
A. In the Data initialization page, set tine Yearly fee field to 75.
B. Configure field validation on the Yearly fee field.
C. Configure the Yearly fee field to reference the minimum amount due.
D. Configure the Yearly fee field as a calculated field.
Answer: A 
229.A data page holds product information. The data page's Reload if older Than field is set to 15 
minutes. The data page is created at 06:12. At 06:20 the user requests product information. At 06:42 the 
user requests product information. 
When is the data page reloaded? 
A. 06:35
B. 06:20
C. 06:27
D. 06:42
Answer: D 
230.Which three options can you configure for a mobile app channel? (Choose Three) 
A. Change the host for a mobile app to a production system, rather than a development system.
B. Identify how different mobile devices render UI controls.
C. Establish security behavior for a mobile app, such as the use of biometric identifiers.
D. Define UI behavior for a view when displayed on a mobile device.
E. Define the role applied to users when they run the mobile app.
Answer: C D E
231.Which two dependencies do you directly enforce with a Wait step? (Choose Two) 
A. Pausing a case until a predetermined time expires
B. Pausing a case until a user submits a specified value
C. Pausing a case until another case reaches a specified status
D. Pausing a case until a new child case is created
Answer: A C 
232.What are two attributes of application level security? (Choose two.) 
A. Create password and authentication policies.
B. Identify authorized users who need access to the application.
C. Set up security roles for personas in each case type.
D. Prevent users from viewing features that they should not access.
Answer: A D 
233.On the Case Designer, who two component can users tag with a Minimum Lovable Product (MLP) 
release for project sizing purposes? (Choose Two.) 
A. A user Mobile App channel
B. An external system of record (SOR)
C. An automation
D. An approval decision
Answer: D C 
234.The following example shows the ruleset list for the logged in operator. 
What is stored in the Admin@MyCo ruleset? 
Admin@MyCo: 
Purchasing:01-01 
Purchasinglnt:01-01 
MyCo:01-01 
MyColnt:01-01 
Supplier:01-01 
Customer:01-01 
lnventory:01-01 
Pega-ProcessCommander:07-10 
Pega-DeploymnetDefaults:07-10 
Pega-LP-Mobile:07-10 
A. Preferences for the operator
B. Rules checked out by the operator
C. Rules delegated to the operator
D. Rules recently opened by the operator
Answer: B 
235.A case type for voice over requests includes two tasks: Edit Script and Record Script. Your team has 
been asked to route Edit Script tasks to editors and Record Script tasks to actors. 
Which approach fulfills this requirement? 
A. Create two new work queues, one for editors and one for actors.
B. Create one new work queue and split the tasks by type.
C. Create one work group for both personas and route to the work group. D. Create two new work groups in Dev Studio that reference one work queue.
Answer: A 
236.A stakeholder prefers to group a set of existing actions into a multistep form. 
Which work item do you create in Agile workbench to address this change request? 
A. Bug
B. Feedback
C. Status
D. User Story
Answer: D 
237.The business process for an automobile insurance claim consists of the following phases: - Submission: The customer contacts a customer service representative (CSR) to file the claim. - Review: An adjuster reviews the claim, assesses the damages to each vehicle, and provides an 
estimate of the cost of repairs. - Repair: A third party performs the repairs on each vehicle, communicating with the adjuster and 
customer as necessary. - Verification: After each vehicle repair, the adjuster closes the claim. 
According to Pega best practices, which phase can you implement as a child case? 
A. Verification
B. Submission
C. Review
D. Repair
Answer: D 
238.You are defining a user view for a loan application. If the loan applicant indicates there is an existing 
open account, the Date account opened must be before the current date. Select the approach that meets 
the validation requirements. 
A. Use a pick list control to verify the Date account opened is in the past.
B. Use a validate rule to verify the Date account opened is in the past.
C. Use a when rule to verify the Date account opened is in the past.
D. Use a calendar control to verify the Date account opened is in the past.
Answer: B 
239.Which two scenarios require you to configure conditional processing within the case type? (Choose Two.) 
A. A scholarship eligibility application requires students to enter standardized test scores, Students with qualifying test scores can schedule and interview. Students without qualifying test scores receives a rejection email.
B. A catering booking application requires customers to enter information about the expected party size, event date, and event time. When customers submit the information the catering company sends a confirmation email.
C. An application requires customer to select the type of request in a drop-down list. The system routes the request to the appropriate department work queue. A user with access to the work queue processes the case through fulfillment.
D. A shopping application requires a guest to fill out payment information. A user who enters a membership number skips the payment information step.
Answer: A D 
240.You are configuring an accident claim case with two child cases for an automobile insurance 
company, as shown in the following figure:
The business requirement changes to allow the parent case to continue independently of the child case 
processes. 
How do you configure the Wait step for this requirement? 
A. Configure the step to continue the parent case when the child cases reach the payment pending review status.
B. Configure the step to continue the parent case when the child cases reach auditor approval.
C. Configure the step so that only one child case must be resolved before the parent case can continue.
D. Configure the step so that users can continue with the parent case process regardless of child case status.
Answer: D 
241.In which two situations is it appropriate to use a decision table? (Choose two.) 
A. A dance studio recommends a membership type based on the number and type of dance classes the customer wants to attend every month.
B. Order total is calculated based on the quantity and price of the items in the customer's shopping cart.
C. If customers decide to add insurance, checked bags, or early boarding to their airline tickets, extra fees are added to their order total.
D. A hair care company suggests a line of products to customers based on their hair type, scalp moisture, hair moisture, and whether it is color-treated.
Answer: A D 
242.Which configuration informs a user by email when an assignment is added to the user's worklist? 
A. Configure the case type to send assignment notifications to assigned users.
B. Add a Send Email step to the process after the assignment to notify the assigned user.
C. Configure a service level to send a notification to the assigned user.
D. Add a Send Notification step to the process after the assignment to notify the assigned user.
Answer: A 
243.You are configuring duplicate case search logic in a case type. 
How do you ensure that resolved cases are not evaluated as potential duplicates? 
A. Add a must match condition where the work status of the current case does not contain "Resolved"
B. Add a weighted condition where the work status of potential duplicates does not contain "Resolved"
C. Add a weighted condition that evaluates the work status of current and existing cases where work status equals "Resolved" and has a weight of "0"
D. Add a must match condition where the work status of potential duplicates does not contain "Resolved".
Answer: D
244.What are two ways you can create a view with editable fields in an application built on the 
Constellation architecture? (Choose two.) 
A. On the Data model tab of a case type, configure a view.
B. In a step of the case life cycle, configure a view.
C. On the UX tab of a case type, create a Partial view.
D. On the UX tab of a data object, create a Form view.
Answer: B D 
245.Which two rules do you localize by using the localization wizard? (Choose Two) 
A. Work Parties
B. Paragraph
C. Correspondence Fragment
D. Field Value
Answer: B C 
246.In a Human Resources (HR) application, a business architect has developed a new process for the 
Onboarding case type. You want to test the process and the fields to verify the Ul elements collect 
expected results. 
A. Add explicit assertions on the Ul elements
B. Create a unit test for the Onboarding case type
C. Create a scenario test for the Onboarding case type
D. Add validations on the Ul elements
Answer: A C 
247.On the case Designer, which two components can users tag with a Minimum Lovable Product (MLP) 
release for project sizing purposes? (Choose two.) 
A. A User Mobile App channel
B. An external system of record (SOR)
C. An automation
D. An approval decision
Answer: C D 
248.Which two configurations do you use to validate the minimum age of a new potential customer in the 
Collect Account lnformation assignment step? (Choose Two) 
A. Create an Edit Validate rule to check the customer age.
B. Reference the Edit Validate rule on the Collect Account lnformation flow action.
C. Reference the Validate rule on the Collect Account lnformation flow action.
D. Reference the Validate rule on the Collect Account lnformation assignment.
E. Reference the Edit validate rule on the Collect Account lnformation assignment.
F. Create a Validate rule to check the customer age.
Answer: A B 
249.Which scenario is a use case for the Wait step? 
A. The customer cannot complete an application for a checking account until a bank representative reviews their credit report.
B. An agent needs to send a confirmation email to an insured customer after they complete a form.
C. A payroll user cannot process a salary increase until the department manager approves the increase.
D. The customer needs to log in to their account before receiving a membership discount on an online purchase.
Answer: C 
250.A process routes loan requests to a specific loan officer based on the type of loan. - If the loan is a 
mortgage, it is routed to Adam Ross. If the loan is for an automobile, it is routed to Julia Samuels. - If the 
loan is an equity line, the case is routed to Don Smith. 
How do you configure a router to ensure that case advances to the correct loan officer? 
A. Route the case to a worklist using a skilled router.
B. Route the case to a work queue using a When condition.
C. Route the case to a work queue using a skilled router.
D. Route the case to a worklist using a When condition.
Answer: D
251.In an application for configuring hardware equipment for new employees, the manager chooses a 
laptop model from a drop-down list. The list of available laptop models is maintained in an external 
system and may change over time. 
Which of the following do you use as the data source for this drop-down list ? 
A. A data page
B. A local list
C. A data table
D. A data transform
Answer: A 
252.A car insurance quote requires a view for potential customers to enter information to process the 
request. 
What are two primary decisions to make before you add fields to the view? (Choose Two) 
A. Is field entry required?
B. Are processing actions applied to the field?
C. Does the field require a data source?
D. How do users enter values into the field?
Answer: A D 
253.A moving company provides customers with a tool that recommends a moving vehicle based on the 
number of bedrooms in their current living space and whether they are planning to move heavy furniture
like bed frames, mattresses, or couches. Based on the customer inputs, a decision table presents the 
customer with a recommendation. 
Which two configurations do you use together to build the decision table? (Choose Two) 
A. Create a column for the recommended moving vehicle.
B. Create rows for the recommended moving vehicle.
C. Create two rows, one for the number of bedrooms and one for whether the customer is moving heavy furniture.
D. Create two columns, one for the number of bedrooms and one for whether the customer is moving heavy furniture.
Answer: D 
254.Need to select one severity option which is best 
A. Picklist
B. Radio button
C. Checkbox
Answer: B 
255.Which piece of application content do you localize by using a Field Value rule? 
A. Labels and drop-down values on a section rule
B. Logos or other images on a harness rule
C. User instructions in a paragraph rule
D. User-editable text in a correspondence rule
Answer: A 
256.In which workspace do you configure a service-level agreement (SLA) with a passed deadline 
interval that repeats three times? 
A. Prediction Studio
B. Admin Studio
C. App Studio
D. Dev Studio
Answer: D  
257.In the development of a boat repair case type, a business requirement states that clients can set their boat type as Powered, Sail, or Row. During the Inspection stage, the Inspect Boat process prompts technicians to inspect the common parts of all boats. However, if .boatType = 'Sail,' the technicians are additionally prompted to complete the Inspect Sailboat process.  
How do you configure the case life cycle to achieve this behavior? 
A. Configure the Inspect Sailboat process to start if the .boatType is not 'Powered'. Otherwise, the system skips the process. 
B. Configure the Inspect Boat process to start if the .boatType is not 'Powered'. Otherwise, the system skips the process. 
C. Configure the Inspect Boat process to start if the .boatType = 'Sail'. Otherwise, the system skips the process. 
D. Configure the Inspect Sailboat process to start if the .boatType = 'Sail'. Otherwise, the system skips the process. 
Answer: D  `;


// Question corrections and notes
const ADDITIONAL_QUESTIONS_DATA = `
1. You want to create a report that display the number of New Loan that have been rejected by the Amsterdam office in the last 90 days.
You want the report to display the results from the most recent to the oldest. What is your approach? (Choose 1)
A. Tick the “ASC” check box for the column on the Resolution date
B. Tick the “DESC” check box for the column on the Creation date
C. Select Highest to Lowest for the column Resolution date
D. Select Lowest to Highest for the column Resolution date
Answer: C

2. You want to ensure the payment method layout is not displayed if the service selected is about a flat tyre.
How would you configure the UI? (Choose 1)
A. Configure a visibility condition on the Payment method layout and an action to refresh the section on the Service dropdown
B. Configure a visibility condition and an action to refresh the section on the Service dropdown
C. Configure a visibility condition and an action to refresh the section on the Payment method layout
D. Configure a visibility condition on Service dropdown and an action to refresh the section on the Payment method layout
Answer: A

3. When implementing a case type in App Studio, what are the options you can set when configuring a Channel and an Interface? (Choose 2)
A. Release
B. MLP
C. Complexity
D. Due Date
Answer: A C

4. What can you do when configuring a mobile app? (Choose 2)
A. Secure and lock the app after N minutes of inactivity
B. Branding your app means select Launch screen, App icon and Login Screen
C. To ensure a consistent experience throughout the user workflow, define a case-wide theme for your app
D. Define the role assigned to users of the mobile app
Answer: A D

5. You need to create a new mobile app if you want to? (Choose 1)
A. Give access to a mobile app to two different roles
B. Provide a different branding for each case type
C. Configure a multiple Right Swipe actions
D. Switch between biometrics and patterns for unlocking the app
Answer: A

6. Why would you use the Mobile Preview? (Choose 2)
A. Test production application
B. Test one or multiple mobile applications
C. Ensure the pages and layout correspond with your design
D. Test all the features of your mobile application such as notifications
Answer: B C

7. A new employee needs all the privileges of the role for authors and some privileges from the managers role.
What is your approach? (Choose 1)
A. Add both roles to the new person
B. Add the person to both roles
C. Create a new role based on author and add some manager privileges
D. Create a new role and add some privileges from author and manager
Answer: C

8. In which scenario would you use a calculated field using a function and not a Decision Table? (Choose 1)
A. Calculate the default value of a discount
B. Calculate the total amount of tax depending on some products in the shopping card
C. Calculate the currency type for the total amount of the shopping cart
D. Calculate the discount value to apply to the purchase order based on the total amount, the marital status and the method of payment
Answer: B

9. From the following options displaying some "parts" within quotes, what is a Page property? (Choose 2)
A. .Client.”Address(Shipping)”.City
B. .”Client”.Address(1).City
C. .Client.”Address”.City
D. Client.Address.”City”
Answer: B C

10. What do you use to update the current case or all child cases and all descendants? (Choose 1)
A. Update a case
B. Save Case
C. Persist cases
D. Update cases
Answer: A

11. In App Studio, what configuration is mandatory when creating a data object sourced using a new REST service? (Choose 2)
A. The Uniform Resource Identifier
B. The REST connector
C. The data transform to do the mapping
D. The authentication method
Answer: A D

12. What is a good/secured password? (Choose 2)
A. 5!”36£$86%^Dfer&*Bgh()_+
B. 1L0v3P3g4
C. But1MuchPr3f3rBaklava&P1st4chio5!
D. Password123!
Answer: A C

13. You have created a rule named GetDiscount in a work class named MyOrg-MyApp-Work-CarRental.
What is the right order for class inheritance? (Choose 1)
A = @baseclass
B = Work-Cover-
C = MyOrg-MyApp-Data
D = MyOrg-Work
E = MyOrg-MyApp
F = MyOrg-MyApp-Work
A. A, B, F, E
B. A, C, E, B
C. F, D, B, A
D. F, E, B, A
Answer: D

14. In the UI Gallery, how is configured the shopping cart? (Choose 1)
A. Repeating dynamic layout
B. Repeating layout group
C. Layout group
D. Table
Answer: A

15. What of the following separates content into individual panels and permits users to view a group of related data one panel at a time? (Choose 2)
A. Columns
B. Layout group
C. Table
D. Dynamic layout group
Answer: B D

16. If you create a Data Object with a SOR in App Studio, what is created in Dev Studio? (Choose 1)
A. Data Class, Data Type, Data Model
B. Data Model, Data Type, Data Page
C. Data Pages, Data Class, Data Type
D. Data Type, Data Pages, Data Model
Answer: C

17. What can you do to ensure all rows conditions are reachable in a Decision Table? (Choose 1)
A. Check Completeness
B. Show Completeness
C. Show Conflicts
D. Check Conflicts
Answer: C

18. You want to configure the business logic routing for an authority matrix, what rule are you creating? (Choose 1)
A. When rule
B. Map Value
C. Decision Table
D. Decision Tree
Answer: C

19. You are in a situation where you want to conditionally evaluate few conditions against many properties, what rule type do you create? (Choose 1)
A. When rule
B. Map Value
C. Decision Table
D. Decision Tree
Answer: D

20. What is true regarding Insights in the Explore Data landing page? (Choose 2)
A. The “Shared” visibility means the insight is shared with your Access Group
B. The “Shared” visibility means the insight is shared with your Work Group
C. You have to use numerical data (Count, Maximum, …) on the Measures fields
D. You have to use numerical data (Count, Maximum, …) on the Dimensions fields
Answer: A C

21. A discount is granted under some conditions. You want to reward a client with a discount on the grand total of the purchase order. The decision will use the loyalty of the customer, the amount of the grand total as well as the type of purchase order.
A gold customer spending more than £500 will receive the discount.
A silver customer will need to spend £750 in order to receive the discount.
An “anniversary” purchase order will get the discount.
A = .Customer.Status is gold
B = . Customer.Status is silver
C = .GrandTotal > 500
D = .GrandTotal > 750
E = Purchase order is of type anniversary How would you implement the business rule? (Choose 1)
A. A OR B AND C OR D OR E
B. A AND C OR B AND D OR E
C. (A AND C) OR (B AND D) OR E
D. (A AND B) OR (C AND D) OR E
Answer: C

22. In a data transform you want to use the city of the shipping address to populate the city of the billing address. How do you implement this? (Choose 1)
A. Set .Address(billing).City same as .Address(shipping).City
B. Set .Address(billing).City equals to .Address(shipping).City
C. Set .Address(shipping).City same as .Address(billing).City
D. Set .Address(shipping).City equals to .Address(billing).City
Answer: B

23. In the case designer in App Studio, for what can you specify in which release that will be implemented? (Choose 2)
A. Data & Integrations
B. Personas & Channels
C. Workflow
D. Stage
Answer: A B

24. Who are interested in running the estimator? (Choose 1)
A. End users
B. Stakeholders
C. Business Architects
D. System Architects
Answer: B

25. Where to configure the audit field feature? (Choose 1)
A. On the property settings
B. On the control settings
C. On the stage settings
D. On the case settings
Answer: D

26. What is true regarding integration simulation? (Choose 2)
A. You can create simulation in Dev Studio only
B. The simulation can be configured at the Data Page level
C. The simulation is always using Data Transform as the source in order to hard code mock data
D. The simulation can be configured at the Connector level
Answer: B D

27. What WAI-ARIA role contains headings, notes, or presentations? (Choose 1)
A. Landmark
B. Document Structure
C. Component/Widget
Answer: B

28. A customer should have access to the previous orders while shopping and processing the current order.
A - Customer
B – Current Order
C – Previous Orders
1 – User Pages
2 – System Pages
3 – Data Pages
Associate the page with the right category
A. A1 – B2 – C3
B. A3 – B1 – C2
C. A2 – B3 – C1
D. A2 – B1 – C3
E. A1 – B3 – C2
Answer: D

29. The business would like to be able to set the applied discount based on the value of some properties.
What is your approach? (Choose 2)
A. Create a Configuration Setting
B. Create a property to hold the value
C. Create a declare expression
D. Have the Configuration Setting to calculate the discount using a function
E. Have the Configuration Setting to calculate the discount using a Decision Table
Answer: A E

30. The initial urgency of a case is 5.
The first assignment is ready at 8am on Monday
There is an initial delay of 4 hours and an initial urgency of 5
The Goal is set for 6 hours with an urgency of 5
The Dead line is set for 24 hours with an urgency of 5
The Passed Deadline is set for 12 hours with an urgency of 5
What is the urgency on Tuesday at 8pm? (Choose 1)
A. 10
B. 15
C. 20
D. 25
E. 30
Answer: C

31. What level correspond to Development and Staging? (Choose 2)
A. 1
B. 2
C. 3
D. 4
E. 5
Answer: B D

32. You want to save a data page in an external data base
What is your approach? (Choose 1)
A. Use a Connector
B. Use a Report Definition
C. Use a Data Base Save
D. Use an activity
Answer: C

33. Which of the followings are true regarding the importance of a column in a table? (Choose 1)
A. When reaching the default breakpoint, only the “primary” column will be hidden
B. When reaching the default breakpoint, only the “other” columns will be displayed
C. When reaching the default breakpoint, only the “other” columns will be hidden
D. When reaching the default breakpoint, only the “secondary” columns will be displayed
Answer: C

34. What of the following is true regarding the localisation process? (Choose 2)
A. You can translate rules such as correspondence, Paragraph and question set for surveys
B. You can select if the field values are going to a separate RuleSet
C. You can directly edit the translation into Pega
D. You have to use Excel and use the file directly in the import translated file wizard
E. You have to repackage the XML file before uploading the translated files
Answer: B E

35. In what version would you implement a new feature to a case? (Choose 1)
A. Minor
B. Major
C. Patch
D. Beta
Answer: A

36. How can you name a ruleset? (Choose 2)
A. Risk Mgmt:01-01-01
B. Risk-Mgmt:01.01.01
C. RiskMgmt:01-01-01
D. RM:01-01-01
E. Risk_Mgmt:01-01-01
Answer: C D

37. What do you need to configure to unit test a rule? (Choose 1)
A. Create a ruleset to store the unit test rules
B. Create an access group to access the unit test rules
C. Create an application containing the test rules
D. Create a work group to access the unit test rules
Answer: A

38. You can link a user story to? (Choose 2)
A. a Feature
B. a sub Feature
C. a Stage
D. an Assignment
Answer: A B

39. Select two use cases supported by Agile Workbench. (Choose 2)
A. You need to adjust the due date for several user stories.
B. During a peer review, the reviewer discovers and records an application bug.
C. The lead developer creates a new application for the development team.
D. The project team discusses how many application developers are needed and reports back to the stakeholders.
Answer: A B

40. Which role is the advocate for business users? (Choose 1)
A. SA
B. SSA
C. BA
D. SME
Answer: C

41. Which discipline allow SME/BA/SA to enter requirements in Pega? (Choose 1)
A. DCO
B. Scrum
C. Sprint
D. Compliance tools
Answer: A

42. You should follow best practices at all cost?
A. True
B. False
Answer: B

43. In a warranty application, too many cases were found to be duplicate cases and it was difficult to resolve the cases. What measure do you suggest reducing the number of duplicate cases? (Choose 1)
A. Use clipboard to adjust the condition weights
B. Use Track Duplicates tab to adjust the condition weights
C. Use clipboard to adjust the threshold value
D. Use Tracer to adjust the threshold value
Answer: B

44. Priya is configuring duplicate case search step for identifying duplicate travel booking cases booked by the same customer. She plans to use customer ID, travel date and travel location properties for identifying the duplicates. Which of the following would be the correct configuration? (Choose 1)
A. Travel date as basic condition, customer ID and travel location as weighted condition
B. Travel location and travel date as basic conditions and customer ID as weighted condition
C. Customer ID as basic condition, travel date and travel location as weighted conditions
D. Customer ID, travel date and travel location as weighted conditions
Answer: C

45. Management reports that an unacceptably large number of cases are incorrectly identified as potential duplicate cases. Which two approaches can you use to modify the duplicate case search process so that the process produces fewer invalid duplicates? (Choose 2)
A. Increase the weights for all basic conditions.
B. Do not use a basic condition.
C. Increase the threshold value.
D. Adjust the condition weights.
E. Add a second Search duplicate cases step to filter out invalid duplicates.
Answer: C D

46. As a customer I want to be able to cancel a request at any time. What is the best approach to configure this US? (Choose 1)
A. Add an approve/reject step
B. Add an alternate stage
C. Add a case-wide optional action
D. Add a cancel button on all views of the case life cycle
E. Add a process in all primary stage
Answer: C

47. Which requirement could be satisfied with an optional user action? (Choose 1)
A. An application randomly sends a survey to customers once their case is resolved.
B. Allow a user to transfer a case to another employee at one specific stage of the case.
C. Reassign any task that remains open after three days to another user.
D. Require a separate approval process whenever an order exceeds USD 10,000.
E. Send an email to the assignee
Answer: B

48. When in the process of opening an account, the SME decides to add the possibility for the CSR to send an email to the customer, if the client requests it. The email will be populated with data coming from a series of forms. How to implement this? (Choose 1)
A. Optional action
B. update the flow
C. optional process
D. parallel process
Answer: C

49. You have to implement the following business decision in a flow.
If the Status of the customer is Gold and Total Amount for the purchase is > 1000 then return FULL_DISOUNT
If the Status of the customer is Silver and Total Amount for the purchase is > 750 then return DICOUNT
If the Status of the customer is Bronze and Total Amount for the purchase is > 500 then return SMALL_DISCOUNT
How do you configure the decision connectors? (Choose 1)
A. 2 connectors (Discount applies or not)
B. 3 connectors (1 for each Status)
C. 4 connectors (1 for each Total Amount and 1 Else)
D. 6 connectors (1 for each Status and Total Amount)
E. 4 connectors (1 for each discount and 1 else)
Answer: E

50. Automating decisions based on business logic. (Choose 3)
A. architects to improve the performance of automated decision.
B. accelerate the process of some business decision.
C. application users to focus on more nuanced decisions that require business expertise.
D. architects to spend less time building the application and unit tests.
E. Business to spend more time discovering what can be automated
Answer: B C E

51. You should implement a decision shape when (Choose 2)
A. Need to apply a discount based on Customer status and Total amount of the purchase order
B. The age of the driving license applicant must be 18 years old or more
C. The duration of the loan cannot greater than 3 years if the car is more than 5 years old
D. An approval is needed if the booking is regarding the presidential suite.
E. A CSR to send an email if the customer asks for it.
Answer: A D

52. Choose two use cases that require the configuration of conditional paths within the case type. (Choose 2)
A. A shopping application requires a guest to fill out payment information. A user who enters a membership number skips the payment information step.
B. A scholarship eligibility application requires students to enter standardized test scores. Students with qualifying test scores can schedule an interview. Students without qualifying test scores receive a rejection email.
C. A catering booking application requires customers to enter information about expected party size, event date, and event time. When customers submit the information, the catering company sends a confirmation email.
D. An application requires customers to specify the type of request from a drop-down list. The request routes to the appropriate department work queue. A user with access to the work queue processes the case through fulfilment.
Answer: A B

53. What is false about skipping process or stage? (Choose 2)
A. You cannot skip the first process
B. You cannot skip the last stage
C. Use the same when rule to skip a stage and a process
D. Use the same when rule to skip 2 stages
Answer: A C

54. You want to create a case and automatically make it a child; how do you achieve this? (Choose 1)
A. Create a child case in Dev Studio and reference it from a change stage step in the parent
B. Create a case in App Studio and use a create case step in the parent case in Dev Studio
C. Create a case in App Studio and use a create case step in the parent case in App Studio
D. Create a case in App Studio and use a create case step in the parent case in Dev Studio
Answer: C

55. In a Sales application, during a purchase order (PO) providers must be contacted (PC) for the items that are not in stock anymore. How can you configure the case types to reflect the relationship? (Choose 1)
A. Make both PO and PC parent of Sales
B. Make PC parent of PO
C. Make PO parent of PC
D. Make Sales parent and PO and PC child
E. Make Sales Parent of PO and PC child of PO
Answer: C

56. In an online shopping application, the primary case type PurchaseOrder has two child case types: Payment and Packaging. In processing PurchaseOrder case PO-11, the Payment case Pay-37 and Packaging case Pac-56 are created. Which statement about the processing of PO-11, Pay-37, and Pac-56 is correct? (Choose 1)
A. PO-11 can be resolved when either Pay-37 or Pac-56 is resolved.
B. Both Pay-37 and Pac-56 must be resolved before PO-11 can be resolved.
C. Pac-56 must be resolved before Pay-37 is resolved.
D. PO-11 must be resolved before either Pay-37 and Pac-56 is resolved.
Answer: B

57. Which requirement is best implemented by using a Wait step in a case? (Choose 2)
A. You cannot proceed in an expense report until a manager approves the request.
B. You must pause a case until a user uploads a signed document.
C. Wait for the case to reach a status.
D. You cannot complete car accident claim if an injured person is still in the hospital.
E. Wait using a timer to reference a date/time
Answer: D E

58. In the integration designer you can learn about what? (Choose 2)
A. Case Types
B. Data Pages
C. User Views
D. Property types
Answer: A B

59. What are the types of validation for data? (Choose 2)
A. Property type
B. Validate rules
C. Java Validate rules
D. When rules
Answer: A B

60. In a mortgage loan case type, applicants enter data in the Credit score, Income, Assets, Liabilities, and Loan amount fields. The data is submitted on different processes in the case type. The system informs applicants that, based on the data they provided in the Financial information stage, there are no loans available, and the case does not enter the Loan stage. How would you configure the case type to perform the data validation described in this scenario? (Choose 1)
A. Configure business logic validation on each form.
B. Set the control for each field to allow only valid data.
C. Configure business logic validation on the Loan stage.
D. Set each field to the appropriate field type to test for valid data.
E. Configure business logic validation on the Financial information stage
Answer: C

61. You want to validate the format of a French SSN you use (Choose 1)
A. declare expression rule
B. validate rule
C. edit format rule
D. edit validate rule
Answer: D

62. You want to create a report to find out what is the average total of purchase orders on your online sales shop? (Choose 1)
A. Business reports
B. Process reports
C. Case reports
D. User reports
Answer: A

63. You want to create a report to find out the average time assignments are processed (Choose 1)
A. Business reports
B. Process reports
C. Case reports
D. User reports
Answer: B

64. In order to add a chart to a report, the report must contain (Choose 1)
A. A field of type Integer or Decimal
B. A group by field configured
C. A summarised field
D. A filter to count records
Answer: C

65. A manager has requested a report that shows the purchase requests for each of the regional cost centres. The manager wants to organize the results so that the cost centre appears only once on the report and the requests are listed under the cost centre. How should you configure the report? (Choose 1)
A. Use the requests column to group the results.
B. Filter the results so that only cost centre and requests are included in the report.
C. Use the cost centre column to group the results.
D. Summarize the requests column by count.
Answer: C

66. You want to display the number of cars sold (cases) per salesman in the last month (status of the case being resolved-completed), how do you configure? (Choose 2)
A. Group by salesman
B. Group by case ID
C. Summarize the salesman
D. Summarize the case ID
Answer: C

67. You want to display the number of cars sold per salesman in the last month (status of the case being resolved-completed), What do you use to filter? (Choose 2)
A. Salesman
B. Case ID
C. Case Status
D. Resolution Date
Answer: C D

68. Styling From App Studio you can style the application using (Choose 1)
A. Themes
B. Custom CSS
C. Skins
D. Mixins
Answer: A

69. The legal department references state and local laws on multiple forms in the company's HR application. Stakeholders would like the references styled differently to distinguish the content. How do you implement the requirement to apply font styling on all legal references found in the application? (Choose 1)
A. Run a case type that uses the text element and change the font on the form view.
B. Upload a new theme text.
C. Open the application theme and add a new theme text that maps to a text element for legal references.
D. Upload a new theme
Answer: C

70. What is true about a portal? (Choose 2)
A. A web channel in use by your application
B. Two default portals for end users are App Studio and Dev Studio
C. You cannot modify the default portals
D. Can contains Dashboards and Standard pages
Answer: A D

71. What is true configuring portals in App Studio? (Choose 2)
A. You can create new Pages
B. You cannot add Portals to Roles
C. You cannot add a dashboard
D. You can configure what pages are visible depending on roles and portals
Answer: A D

72. Which of the following statements are true about the dashboard? (Choose 2)
A. The dashboard displays key performance indicators (KPIs) and operational information about your application.
B. Each role-based interface includes a dashboard tailored to the role.
C. When a user with the Case Manager role signs in to the Pega application, they are presented with an empty dashboard that they must fill with widgets specific to the Case Manager role.
D. The dashboard should contain all available widgets for a specific role to help increase productivity.
Answer: A B

73. Adding roles Identify the use case that requires creating a new role. (Choose 1)
A. A new application is created.
B. An additional combination of channel interface and permissions is necessary.
C. The permissions for an existing role are too limited for the work to be done.
D. An additional person needs to interact with an application.
Answer: B

74. What best describes a case? (Choose 1)
A. Business transaction
B. Business process
C. Life cycle
Answer: A

75. At design time you figure out that a process would need an urgency, a status and/or is independent, you should transform it to: (Choose 1)
A. A case
B. a case type
C. a flow
D. a life cycle
Answer: B

76. What rule is created when creating a process? (Choose 1)
A. Stage rule
B. Process rule
C. Flow rule
D. None
Answer: C

77. What technology allows you to create an application where you can interact with your users in the channel of their choice? (Choose 1)
A. Enterprise class structure
B. Low-code development
C. Model driven approach
D. Holistic view approach
E. Traditional development
Answer: B

78. What is a benefit of Pega low-code development? (Choose 2)
A. Pega makes low-code development easy for very simple applications only.
B. The Pega user interface allows only low-code users to build applications.
C. The Pega low-code development tools create the code for you.
D. Pega low-code development increases both productivity and IT involvement.
E. Pega low-code development increases productivity.
Answer: C E

79. Which studio do you use to configure a service level agreement (SLA) with a passed deadline? (Choose 1)
A. App Studio
B. Dev Studio
C. Admin Studio
D. Prediction Studio
Answer: B

80. What are you using Admin Studio for? (Choose 1)
A. Manage the different channels of the organisation
B. Advanced application development
C. Manage DevOps, clusters and security
D. Manage Operators and Access Groups
Answer: C

81. What case life cycle design allows you to do? (Choose 2)
A. define how work is completed for each specific customer request.
B. define processes and steps to implement the five necessary stages of work.
C. define a structure to create, process, and resolve work.
D. define the user interface appearance
Answer: C

82. Which two of the following methods can configure one stage in the case life cycle to advance to the next? (Choose 2)
A. Configure automatic stage transitioning in the stage contextual property panel.
B. Add a Change Stage step.
C. While running a case, use the Actions menu to change the stage.
D. Configure the stage to resolve the case in the stage properties panel.
Answer: A B

83. When modelling the life cycle of a case, stages represent? (Choose 2)
A. Significant change in the status of a case.
B. Transfer of authority.
C. Time period for a process to complete.
D. Subset of data used to resolve a case
Answer: A B

84. When modelling the life cycle of a case, alternate stages _______ and ____________. (Choose 2)
A. Represent a separate, but related, business transaction.
B. Can be sequenced into primary stages.
C. Represent exceptions to the normal course of events.
D. Can be reached by user action at runtime only
Answer: B C

85. Select two benefits of following Pega's guardrails. (Choose Two)
A. Guardrails help developers to track compliance with Pega's best practices.
B. Guardrails help developers build applications that are easier to maintain and have fewer defects.
C. Guardrails help managers create schedules for efficiently allocating developer resources.
D. Guardrails help project managers ensure that applications are completed on time.
Answer: A B

86. A Collect Information step in the case life cycle sets the status to Pending-Approval. When does the case status automatically update? (Choose 1)
A. Case status updates at the beginning of the step.
B. Case status updates at the end of the step.
C. Case status updates at the end of the process containing the step.
D. Case status cannot update automatically.
Answer: A

87. Adding instructions to a step ______ (Choose 1)
A. Describes the business value of the step.
B. Describes to users the action to take in a step.
C. Instructs an application developer how to build the step.
D. Defines the step.
Answer: B

88. What is true about Goal and Deadline? (Choose 2)
A. Deadline starts after the Goal line
B. Both Goal and Deadline starts at the same time
C. The Goal line always starts after the assignment is ready
D. An initial delay can be applied after the assignment is ready
Answer: B D

89. From App Studio you can apply a Goal and Deadline to what element? (Choose 1)
A. Any step
B. Each case
C. Every multi-step form step
D. Any Approve & Reject step
Answer: D

90. The deadline milestone in a service level defines that amount of time ___________. (Choose 2)
A. in which the case or step should be completed.
B. in which the case or step must be completed.
C. allowed before an assignment is considered overdue.
D. allowed for users to advance to the next stage.
Answer: B C

91. The primary purpose of a service level is to __________. (Choose 1)
A. automatically send correspondence to the assignee.
B. Re-assign cases to an available case worker.
C. help ensure timely completion of work
D. generate service level reports.
Answer: C

92. The user story says: The auditor must complete the initial checklist form regarding a request from a VIP within the next 2 hours so the system can send an email to to inform the client about the progress been made.
Where do you configure the SLA (Choose 1)?
A. The step
B. The case type
C. The stage
D. The process
Answer: A

93. You want to capture the marital status. The options are Single, Married, Divorced and Widowed. What is the best approach to define the field(s) when creating the data model? (Choose 1)
A. 4 Check boxes
B. 1 Picklist
C. 4 Booleans
D. 1 Text
Answer: B

94. When configuring a view in App Studio, you can reuse saved views ________. (Choose 1)
A. That have been created in App Studio only
B. In Read-Only mode only
C. In auto (editable) mode only
D. You can decide what mode (auto/read-only) to use
Answer: D

95. You have a hotel booking case type that displays room availabilities. Customers can see the available rooms which are identified by the type, the size and the amenities. The case type displays more details when selecting a room. What are fields? (Choose 2)
A. Room
B. Customer
C. Amenities
D. Type
Answer: C D

96. What is the difference between a single record and a list of records when configuring a Data Reference? (Choose 1)
A. Main difference is a single record is singular when list is plural
B. The IDs of the records are required when configuring a list
C. A list can fetch multiple objects of different data types
D. A single record will fetch an object when a list will fetch multiple object
Answer: D

97. In a job interview application, candidates must enter their previous jobs. What field types do you configure to collect this information? (Choose 1)
A. A field group list
B. Multiple field groups
C. Text (paragraph)
D. Multiple text (paragraph)
Answer: A

98. Which two statements identify a benefit of using calculated fields? (Choose 2)
A. Calculated fields are indicated to users with a special character.
B. Calculations reduce mistakes by avoiding the need for manual computation of values.
C. Calculations update user form content when user complete a step.
D. Calculations automatically update fields whenever input values change.
Answer: B D

99. What two items describe the function of a calculation network? (Choose 2)
A. Update all relevant fields whenever a value changes.
B. Automatically configure custom calculations.
C. Identify the relationship between fields.
D. Determine the calculation function for a group of fields.
Answer: A C

100. What is the role of data records in an application? (Choose 1)
A. Data records provide access to data that is used to process cases but is not part of an application.
B. Data records and data types share the same role, which is to provide structure for data views.
C. Data records direct how an assignment moves forward.
D. Data records must be stored using a database table for local data storage.
Answer: A

101. What is true about Robotic? (Choose 2)
A. Preferred way of integration with external application with an API
B. Preferred way of integration with external application without an API
C. Attended RPA refers to automation that works alongside a human involved in the process
D. Unattended RPA refers to automation that works alongside a human involved in the process
Answer: B C

102. When creating a data type from a REST web service what are you configuring? (Choose 2)
A. Endpoint URLs for different environments
B. JDBC URL for different environments
C. GET or POST method for the REST method
D. Parameters name and value of the URL part
Answer: A C

103. An insurance company has different department for each type of contract (Home, Car, Jewellery). Each Department has a work queue. The company requires you to assign approvals to the department based on the type of contract. For instance, jewellery approval should go to the Jewellery department. (Choose 1)
A. Route the assignment based on approver’s skills.
B. Route the assignment to the correct work queue based on business logic.
C. Route the assignment based on an approver role.
D. Route the assignment based on an approver workload.
Answer: B

104. When using business logic for routing, what option can you implement? (Choose 2)
A. Route to work queue only
B. Route to work queue and/or operator
C. Group condition using AND only
D. Group condition using AND / OR
Answer: B C

105. You are configuring routing for a car insurance request. All car insurance quotes requests are routed to the car insurance group except for cars that are worth more than $1M as its need to be reviewed by the director of the luxury department.
How do you configure assignment? (Choose 1)
A. Route the assignment to the director of luxury when the request is for luxury car. Otherwise, route the assignment to the car insurance group.
B. Route the assignment to the car insurance group who sends an email notification to the director of luxury regarding the car.
C. Route the assignment to the director of luxury who routes assignments to the car insurance group as needed.
D. Route the assignment to the skilled group for luxury cars when the request is for a luxury car. Otherwise, route the assignment to the car insurance group.
Answer: A

106. Which scenario describes the appropriate use of an Approve/Reject step? (Choose 2)
A. Customers place online orders by adding items to the cart, entering shipping and payment information, and finalizing the order. Depending on what department the items are associated with a final decision has to be done by the FCO before a different team handles the order fulfilment.
B. Customers submit support requests to a company. In the support requests, customers specify their preferred language. Based on customers' preferred language, the case is routed to the worklist of a customer service representative who speaks that language.
C. Employees that incur work-related expenses must submit expense reports for review. If the expenses are less than USD1000, the case is routed to the employee’s direct manager; otherwise, the case is routed to the department manager.
D. Employees must periodically submit self-evaluations to their reporting managers. If the manager decides that the candidate evaluation is sufficient, the case continues. If the manager decides that the evaluation needs additional elaboration, the case is routed back to the candidate.
Answer: A D

107. In a loan application case, a manager and a loan officer must receive automatic email notifications when assignments are routed to their worklists. How do you configure this correspondence requirement? (Choose 1)
A. Before the assignment, add a Send Email step.
B. Enable assignment notifications for the case type.
C. After the assignment, add a Send Email step.
D. Compose email notifications in the assignments.
Answer: B

108. Who is a non-technical business users who participate in application development? (Choose 1)
A. Subject Matter Expert
B. Citizen Developer
C. Product Owner
D. Sponsor
Answer: B

109. Who creates acceptance criteria and prioritizes backlog items? (Choose 1)
A. Subject Matter Expert
B. Citizen Developer
C. Product Owner
D. Sponsor
Answer: C

110. What a BA is responsible for? (Choose 3)
A. Advocates for business users
B. Work with SME to write specs
C. Designs the application
D. Defines SLA
E. Contributes to technical implementation
Answer: A B D

111. Which two statements best describe the relationship between rules in App Studio and Dev Studio? (Choose 2)
A. Rule configurations performed in App Studio must be approved by a developer in Dev Studio.
B. App Studio and Dev Studio store rules in different application layers.
C. Developers in App Studio and Dev Studio configure the same rules, but Dev Studio provides more configuration options.
D. Developers can use Dev Studio to combine rules into solutions such as completed views or processes for use in App Studio.
Answer: C D

112. Under which circumstances the Private Edit button appears? (Choose 2)
A. If the user is not allowed to check out
B. If the rule is locked by another operator
C. If the ruleset of the rule is locked
D. Only if the rule is an OOTB rule from Pega Platform.
Answer: B C

113. What is the purpose of a class in a Pega Platform application? (Choose 2)
A. A class organizes rules within an application based on their capacity for reuse.
B. A class organizes rules that describe how the application interacts with other systems.
C. A class organizes rules that describe the data objects used in the application.
D. A class contains rules that have the same scope.
Answer: A D

114. What is false regarding inheritance? (Choose 2)
A. The last class in the inheritance path of any Pega class is @baseclass
B. Pega is based on Java and uses single inheritance
C. The directed inheritance can be used before pattern inheritance
D. With pattern inheritance, the parent class is explicitly specified
Answer: A C

115. An application references a data element found in the Data-Party class. How is this rule inherited by the application? (Choose 1)
A. By applying directed inheritance.
B. By applying pattern inheritance.
C. By adding the ruleset that contains the property to the application.
D. By naming PegaRULES as the built-on application.
Answer: A

116. Associate inheritance type (Choose 1)
Description
A - You have defined a Flow Action rule in MyOrg-MyApp-Work and you are planning to reuse it in the class MyOrg-MyApp-Work-PO
B - You have defined a rule in a framework representing a regional bloc for the company offices (Like EU for instance) and you are planning to reuse it.
C - You want to reuse an OOTB rule applying to @baseclass.
D - You want to reuse a rule from the division layer of the class structure in your case type.
Source
- Pattern inheritance
- Directed inheritance
A. A1, B1, C2, D2
B. A1, B2, C2, D1
C. A2, B2, C1, D1
D. A2, B1, C1, D2
Answer: B

117. Your application is built on Pega Platform directly and the case type MyOrg-MyApp-Work-PurchaseOrder directly inherits from Work-Cover-. What statements are correct when the system will try to execute a rule? (Choose 2)
A. The system will start searching for the rule in the class MyOrg-MyApp-Work-PurchaseOrder
B. The system will start searching for the rule in the class @baseclass
C. The system will not search for the rule in the class Work-
D. The system will search for the rule in the class MyOrg
Answer: A D

118. In order to enable the “check out” feature you must ensure that? (Choose 2)
A. The operator is allowed to check out
B. The operator group is allowed to check out
C. The rulesets containing the rules you want to be able to check out are enabled for check out
D. The application containing the rules you want to be able to check out are enabled for check out
Answer: A C

119. You want to enhance functionality of an existing application by updating some rules. You would like to have a beta-testers group to validate the changes before everyone can access it. Where do you save the updated rules? (Choose 1)
A. In a new ruleset and the ruleset in a new application.
B. In a new ruleset and the ruleset in a new version of the application.
C. In a new minor version of the ruleset and the ruleset in a new application.
D. In a new minor version of the ruleset and the ruleset in a new version of the application.
Answer: D

120. A new case is created with a default urgency of 15 and the first assignment of the case life cycle is reached at 8 am on Monday the 13th of July.
An initial delay of 4 hours is configured on the SLA and adds up 5 to the urgency.
The Goal line is set to 24 hours and the Dead line is set to 48 hours with both adding 5 to the urgency.
A Passed Dead Line is configured to wait for 6 hours 8 times and add 5 to the urgency.
What is the urgency of the case on Tuesday at 7pm? (Choose 1)
A. 20
B. 25
C. 30
D. 35
Answer: B

121. A new case is created with a default urgency of 10 and the first assignment of the case life cycle is reached at 8 am on Monday the 13th of July.
An initial delay of 4 hours is configured on the SLA for the assignment and adds up 5 to the urgency.
The Goal line is set to 24 hours and the Dead line is set to 48 hours with both adding 5 to the urgency.
A Passed Dead Line is configured to wait for 6 hours 8 times and add 5 to the urgency.
What is the urgency of the assignment on Wednesday at 7pm? (Choose 1)
A. 20
B. 25
C. 30
D. 35
Answer: D

122. What is true about Passed Deadline? (Choose 2)
A. Passed deadline doesn’t start with Goal and Deadline
B. Passed deadline intervals do not have urgency values.
C. Goal and deadline intervals do not repeat.
D. Passed deadline intervals do not have escalation actions.
Answer: A C

123. You want to have 2 managers approving and it doesn’t matter who approves first but you want both approvals to continue processing the case (Choose 1)
A. Create 2 processes with an approval step in each process
B. Create 1 process with 2 approval steps in it
C. Create 2 processes and add an execution condition to the second process
D. Create 2 parallel processes with 1 approval in each
Answer: D

124. What are two methods that you can use to share attached PDF files outside the case? (Choose 2)
A. Copy the file from the database server.
B. Send the PDF by email using a Send email step.
C. Copy the file from the application server.
D. Download the attached PDF file.
Answer: B D

125. A PDF file attached to the case doesn’t present all the information. Which rule or setting do you check to address this issue? (Choose 2)
A. Check the settings that are used in the PDF document.
B. Check the type of fields used in the PDF document.
C. Check the section specified in the Create PDF step of the case life cycle.
D. Check the page orientation and size settings in the Create PDF step.
Answer: C D

126. What is false about Decision table? (Choose 3)
A. You cannot save a decision table with an overlap
B. A decision table is always preferred to a decision tree
C. You can check for conflicts and completeness
D. You cannot save a decision table if the otherwise condition cannot be reached
Answer: A B D

127. What is true about decision table? (Choose 1)
A. An empty cell for a column means the value is null or empty
B. The relationship between the property and the values must be the same for each row
C. A decision table can return true/false
D. The operator between column is always AND
Answer: C

128. What is true regarding decision tables and trees (Choose 2)
A. You should consider Decision Tree for simpler business logic
B. Decision table is the preferred business rule approach compared to Trees
C. A decision tree should be used when many different properties are part of the conditional logic
D. The same result can be achieve using a table or a tree
Answer: C D

129. A booking company want to grant a discount to VIP customers only.
Customers with a status of Bronze are automatically rejected.
Customers with a status of Silver are rejected if either the number of nights spent in hotels is less than 60 or the number of points cumulated is less than 10000
Candidates with a status of Gold are automatically approved.
You use a decision tree to make the evaluations.
Which two branch configurations do you use in the decision tree? (Choose Two)
A. A top-level branch that evaluates the number of nights spent in hotels.
B. An otherwise branch that tests the status is Bronze.
C. A top-level branch that tests for status is Bronze.
D. Two nested branches — one to evaluate number of nights in hotels and another to evaluate the points cumulated.
Answer: C D

130. You have designed either a decision table or a decision tree. You want to verify that the system can evaluate every row regardless of the input values. How do you test your decision logic? (Choose 1)
A. Check the decision tree for conflicts.
B. Run the case and use the Tracer tool.
C. Add the decision tree to a decision shape and create cases that use various test values.
D. Check the decision tree for completeness.
Answer: A

131. An employee submits an expense report and the employee’s direct manager must approve the report. If the total amount of expense report is more than 1000USD, then the report must be approved by multiple people above the manager. The list of approvers is already defined and there are no other conditions.
Which of the following options can be used to configure the approval? (Choose 1)
A. Reporting structure
B. Authority matrix
C. Single level approval
D. Authority structure
Answer: A

132. A requirement states that if the request is less than EUR1000, the request is routed to a cost center manager. If the amount is greater than EUR1000, the request is also routed to a director.
In addition, if the request is for customer billable expenses, the request must be approved by an Account payable manager.
How do you configure the process to satisfy this requirement? (Choose 1)
A. Add a Collect information step. Use the ToDecisionTable router.
B. Add an Approve/Reject step, set the approval flow to cascading and use an authority matrix.
C. Add a Approve/Reject step, set the approval flow type to Single level
D. Add an Approve/Reject step, set the approval flow to cascading and use the reporting structure.
Answer: B

133. Your application requires a cascading approval for expense reports. Approvals must follow the submitter's reporting structure, with the following thresholds.
The manager must approve expense reports of USD500 or less.
A director must approve expense reports of USD1500 or less.
A vice president must approve expense reports of USD1500 or higher.
How do you configure the approval process? (Choose 1)
A. Select the reporting structure configuration with custom levels, then configure when rules to determine the number of levels.
B. Select the authority matrix configuration option.
C. Select the reporting structure configuration, then select All levels.
D. Select the reporting structure configuration with custom levels, then configure a decision table to determine the number of levels.
Answer: A

134. How do you organise users coming from different Business Units and working as a team? (Choose 1)
A. Work Group
B. Work Queue
C. Access Group
D. Shared Group
Answer: B

135. What is true about teams? (Choose 1)
A. A user can access only one work queue
B. A user cannot have access to multiple work groups
C. A work group has a manager and a default work queue
D. A work queue has a manager and a default Business Unit
Answer: C

136. Which requirement can you satisfy by creating a new work queue? (Choose 1)
A. Auditors can access a secondary view with additional information, but other users cannot access the secondary view.
B. Requests for information from prospective customers are directed to the sales representative assigned to the appropriate territory.
C. Inquiries from customers with a higher status tier are triaged before inquiries from customers with a lower status tier.
D. Policy renewals can be processed by any customer service representative (CSR), while coverage changes are assigned to members of a specialized team of underwriters and CSRs.
Answer: D

137. You want to confirm the operator’s information, in what category is the page related to the operator? (Choose 1)
A. System Pages
B. User Pages
C. Data Pages
D. Work Pages
Answer: A

138. What is true about the clipboard? (Choose 2)
A. Memory is organised in thread
B. You can edit the values of all the properties
C. You can access to the page related to a temporary case
D. The clipboard is a live view on the memory and do not need to be refreshed
Answer: A C

139. What contains pyWorkCover page? (Choose 1)
A. If the case is a top-level case then pyWorkCover is empty
B. The direct parent case of the current case
C. The top-level parent case of the current case
D. All the meta data for the current case
Answer: B

140. For which requirement must you configure an edit validate rule in Dev Studio? (Choose 1)
A. The value of the Date of service field must be no more than 15 days for a critical issue, and up to 60 days in the future for an issue with a lower priority.
B. The amount of a transfer between accounts must be greater than zero and less than the available balance of the originating account.
C. The format of the email must be one owned by the company.
D. An email address is required for a case to enter the Approval stage.
Answer: C

141. What rule can reference a validation rule? (Choose 2)
A. A validation rule
B. An edit validate rule
C. A flow action
D. A flow
Answer: A C

142. In which rule are you referencing the edit validate rule (Choose 1)
A. Flow
B. Section
C. Flow Action
D. Property
Answer: D

143. You want to ensure the value of the Social Security Number is 13 digits, how can you configure such validation? (Choose 2)
A. Set the type of the property to Integer and add a mix/max characters to the control settings
B. Set the type of the property to Text and add a mix/max characters to the control settings
C. Add a validate rule to the view
D. Add an edit validate rule to the property
Answer: A D

144. In .Client.Address(shipping).PostCode apply the correct mapping (Choose 1)
Property
A - .Client
B - .Address(Shipping)
C - .PostCode
Source
1- Single Page
2- Page List
3- Page Group
4- Single Value
A. A1, B2, C4
B. A2, B1, C3
C. A4, B3, C1
D. A1, B3, C4
Answer: D

145. A data transform should be used when (Choose 2)
A. Mapping data from an external System to Pega and vice versa
B. Manipulate data in memory
C. Query external system
D. Cache data in memory
Answer: A B

146. What are the different actions you can perform with a data transform? (Choose 3)
A. Loop through a Page List or Page Group
B. Sort a Page List or a Page Group
C. Add conditional processing
D. Execute another Data Transform
Answer: A C D

147. A healthcare services case has a child case that handles the hospital intake questionnaire.
The patient can self-identify symptoms from a list of possible symptoms in the child case.
Selected symptoms are copied over to the parent case with a status of "Unconfirmed."
In the parent case, the physician can update the symptoms listed and their associated status.
Which two configurations would be part of the Selected Symptoms data transform? (Choose 2)
A. Copy the list of possible symptoms and set a filter on the parent case view to filter the list by selected symptoms.
B. Set the status for each copied symptom equal to "Unconfirmed.".
C. Iterate over the list of possible symptoms and copy those entries selected by the patient during intake.
D. Remove unselected symptoms from the source of possible symptoms.
Answer: B C

148. In the Personal Insurance division, a goal and deadline date are assigned to each case. For insurance claims cases, stakeholders want to override the default goal date but maintain the default deadline date.
What two configuration steps do you take to meet this requirement? (Choose 2)
A. In the Claims data transform, for each case type, configure an Update Page action and set the goal date value.
B. Select the Call superclass data transform option in the Claims data transform and clear the option in the parent data transform.
C. In each case type data transform, set the goal date to the required value.
D. Select the Call superclass data transform option in each of the case type data transforms.
Answer: C D

149. What is the impact of ticking the check box “call superclass”? (Choose 1)
A. That tells the system to execute the current Data Transform when instantiating the case in order to set the default values
B. That will first execute the Data Transform applying to the class @supeclass
C. This will execute the data transform with the same name applying to its parent class before the execution of the current data transform
D. This will execute the data transform with the same name applying to its parent class after the execution of the current data transform
Answer: C

150. What are valid options for a Data Page source? (Choose 2)
A. Data Transform
B. Data Type
C. Connector
D. Utility
Answer: A C

151. What are valid options for the refreshment strategy of a data page? (Choose 3)
A. Once per interaction
B. Date/Time property reference
C. Timer
D. Do NOT refresh when
Answer: A C D

152. What is the data access you will select if you want to create a pointer to data stored in a data page from the current case? (Choose 1)
A. Manual
B. Automatic reference to class instance
C. Refer to a data page
D. Copy data from a data page
Answer: C

153. Exchange rates are updated daily from a web service. You make the exchange rates available in your application using a data page.
Which scope do you select for the data page? (Choose 1)
A. Thread.
B. Node.
C. Request.
D. Application
Answer: B

154. You want a data page to be sourced using a lookup, what is required? (Choose 2)
A. Structure as a page
B. Read Only mode
C. Parameter
D. Filter
Answer: A C

155. A data page has a refresh if older than 15 minutes configured.
Data page created at 8:00
Accessed at 8:10
Accessed at 8:20
When is it refreshed?
A. 8:10
B. 8:15
C. 8:20
D. 8:25
Answer: C

156. Page Which two statements are true about data save options for savable data pages? (Choose 2)
A. You cannot use data pages with a page list structure as savable data pages.
B. You can configure a data page with multiple save options based on conditions.
C. Only Data pages with a page structure can use the Database save option.
D. The Activity data save option is the best method for writing data to external sources.
Answer: B C

157. A developer is designing a view that necessitates a dynamic layout group, but is unsure how to achieve this configuration.
What should the developer do to learn how to configure a dynamic layout group? (Choose 1)
A. Find an example of a dynamic layout group in the UI Kit ruleset.
B. Use the example of a dynamic layout group the UI Gallery provides.
C. Add a new dynamic layout group to the section of interest.
D. Review the UI guardrail issues.
Answer: B

158. You want to cache some data coming from an external REST web service you decide to use a data page.
The business requirement is to persist the data within the case at run time.
As the SA on the project, what is your approach? (Choose 1)
A. Configure a Data Page Savable
B. Configure a page property to refer the data page
C. Configure a page property to copy the data page
D. Configure a data transform to copy the content of the data page
Answer: C

159. How do you set the responsiveness for a particular portion of the screen? (Choose 1)
A. Edit the format in the skin to use responsive breakpoints and reference the format in the layout.
B. Set the importance of the layout to be other
C. Set the responsive breakpoints in the properties of the layout
D. Create a custom CSS and use is in the presentation properties of the layout
Answer: A

160. What is the purpose of the “use native controls” option in a control? (Choose 1)
A. Tell the system to use custom CSS loaded in the client cache
B. Use the default theme of the mobile device
C. Enforce the use of controls that are coming from the Pega-UI-Mobile ruleset
D. Enforce the use of specific mobile device controls such as dial pad
Answer: D

161. Select two best practices to follow when designing mobile applications. (Choose 2)
A. Incorporate native device features.
B. Configure horizontal scrolling for smaller devices.
C. Use controls that support tapping.
D. Enable server-side decisions and validations.
Answer: A C

162. You have a table displaying the name of the restaurant, its description, a picture of and a check box to tell if you want to select this restaurant.
You have been told that on smaller devices customers were obliged to scroll horizontally to see the whole content of the table.
You want to get rid of the description column when the screen is smaller than 768px.
How to change this using responsiveness? (Choose 1)
A. Use a dynamic layer and change the format from triple to stack when below 768px
B. Use primary for the name and picture and set secondary to the select column and set to other the description column
C. Use the primary for name, secondary for Description and tertiary for selected and picture
D. Use primary for the name, secondary for picture and selected and other for description
Answer: D

163. You want to make the date of marriage field mandatory on a form if the marital status has been set to Married, what is the setting you are using? (Choose 1)
A. Use a radio buttons control to display all the options for the marital status and display the Marriage date next to the option Married
B. Use a dropdown and make it visible when the marital status is Married
C. Use a radio button to display the Marriage date and make it required when the marital status is Married
D. Use a dropdown to display the marital status and make the Marriage date required when the marital status is Married
Answer: D

164. What is true about Layouts and Design Templates? (Choose 2)
A. Dynamic Layouts automatically adjust to screen size and Design Templates allow easy update structure of the forms
B. Dynamic layouts are available only to user interfaces rendered in the HTML5 document type and you can add as many new Design Template as you want.
C. Layouts can be used to quickly create properties and Design templates contain views
D. Dynamic Layouts automatically adjust to screen size and you can only select OOTB design templates from App Studio
Answer: A B

165. You want to display a form displaying all the information about a product and you want this form to repeat on the screen for each item in the shopping cart, what is your approach? (Choose 1)
A. Use a table layout and source it with the shoppingCart item list
B. Use a repeating table layout and source it with the shoppingCart item list
C. Use a repeating Dynamic layout and source it with the shoppingCart item list
D. Use the Shopping Cart Design Template available in the UI gallery
Answer: C

166. Choose the correct statement about modifying the layout of a view in App Studio. (Choose 1)
A. From the case life cycle, you can configure a view and modify the layout.
B. At run-time, change the template to modify the layout.
C. From the Views tab of a case type, you can modify the layout of an existing view.
D. From App Studio, you cannot modify the view layout. You can make this change in Dev Studio only.
Answer: B

167. What is true about Skins? (Choose 2)
A. Skins contain formats and mixins
B. Skins are predefined and cannot be overridden
C. Skin can inherit from a skin
D. Skin contain formats such as border, typography and background
Answer: A C

168. When choosing a layout-group format, what is true? (Choose 2)
A. To display layouts as simple pages with no headers or menus, select Tab.
B. To display layouts under collapsible headers, select Accordion.
C. To display layouts one at a time as options in a menu, select List.
D. To display all layouts at the same time, with the layouts on top of one another, select Stacked.
Answer: B D

169. You want to reuse a layout from a section into another, you should: (Choose 1)
A. Include the entire section in your section and hide what you don’t need
B. save your layout as a section and include it
C. Use the partial include feature
D. You cannot do it with Pega
Answer: B

170. You want to conditionally display a section containing the spouse information of the employee. The business prefers a dynamic UI that would dynamically display the Spouse information if the employee is married.
How would you accomplish this task? (Choose 1)
A. Adjust the visibility of the section from the section itself using a when rule and select the option to run on the client side.
B. Adjust the visibility of the section from the dropdown
C. Adjust the visibility of the section from the section itself using a condition
D. Adjust the visibility of the section from the section itself using a condition and select the option to run on the client side.
Answer: D

171. You want to ensure the customer provides a valid social security number. What are the combined actions that you take? (Choose 2)
A. Configure an Edit Validate rule
B. Configure a Format rule
C. Configure a Validate rule
D. Configure the Field/Control settings in the view/section
Answer: A D

172. What is true about simulation? (Choose 2)
A. You can only view the simulated data types from Dev Studio
B. You can also simulate your data source when the source system does not have data, or the API is under development.
C. You can add sample source data, or records, to the data object and then configure the view to access the simulated data source
D. You cannot simulate local system of records
Answer: B C

173. Associate concept and definition (Choose 1)
Definition
A - defines an outbound request for information based on metadata that is published for the data source.
B - processes an inbound request and responds to the requesting system.
C - do the mapping between data model from the external system and the application data model
D - Store the data in memory and references the mapping rules
Concept
1- Data Page
2- Connector
3- Data Transform
4- Service
A. A2, B4, C3, D1
B. A4, B2, C3, D1
C. A4, B2, C1, D3
D. A2, B4, C1, D3
Answer: A

174. Which two configurations does the Data Object wizard support? (Choose 2)
A. Define a condition to determine when to access the data source.
B. Assign multiple data sources to a data object.
C. Configure parameters for elements of the call to the data source.
D. Define multiple endpoints for a data source.
Answer: C D

175. A hacker uses a robot to crack the login password. The robot compares hashed passwords to hashed values collected in a lookup table. What type of attack is the hacker using? (Choose 1)
A. Brute-force attack.
B. Cracking attack.
C. Rainbow attack.
D. Dictionary attack
Answer: C

176. Associate concept and definition (Choose 1)
Definition
A - you configure access by defining roles with the desired authorization and privileges
B - confirms the identity of a user and verifies that the user is allowed access to an application
C - determines what data the user can view and what actions the user can perform
D - align with the role that developers can assign to users in App Studio E - categorizes users according to their job function
Concept
1- Role-based access control model
2- Authentication
3- Authorisation
4- Access groups
5- Access roles
A. A1, B3, C2, D5, E4
B. A1, B2, C3, D4, E5
C. A1, B2, C3, D5, E4
D. A2, B3, C4, D1, E5
Answer: B

177. What are the options in the Access Manager? (Choose 2)
A. Full Access
B. Deny
C. No Access
D. Conditional Deny
Answer: A C

178. What two passwords are secured? (Choose 2)
A. YouWontBelieveItButThereIsNoPasswordAtAll
B. qwertyLKJHGHF123987!”£$%^&*(
C. P3g4Syst3m5
D. Hola
Answer: A B

179. A new employee needs all the privileges of the role for authors and some privileges from the managers role. What is your approach? (Choose 1)
A. Add both roles to the new person
B. Add the person to both roles
C. Create a new role based on author and add some manager privileges
D. Create a new role and add some privileges from author and manager
Answer: C

180. What is true about Field level auditing? (Choose 2)
A. You configure the field level auditing at the case level
B. You cannot audit fields of a field group or field group list
C. Field-level tracking, and changes made in an instance of a rule, are captured in the History- class.
D. The actions are automatically recorded for the field on the form Audit tab, in the history section.
Answer: A C

181. Associate concept and definition (Choose 1)
Definition
A - allows you to capture and view the events that occur during case processing
B - presents the current value of properties in memory
C - focus on an activity or series of activities that you want to trace
D - highlights the property change
Concept
1- Tracer
2- Clipboard
3- Watch
4- Breakpoints
A. A1, B2, C3, D4
B. A2, B1, C3, D4
C. A2, B1, C4, D3
D. A1, B2, C4, D3
Answer: D

182. What are the DevOps Continous Integration best practices? (Choose 2)
A. Automatically trigger merges and builds by using the Deployment Manager
B. Publish the exported application archives into a repository, such as JFrog Artifactory, to maintain a version history of deployable applications
C. Use Docker or a similar tool to create test environments for user acceptance tests (UAT) and exploratory tests
D. Create a wide variety of regression tests through the user interface and the service layer
Answer: A B

183. When running a unit test, how to set up your test environment? (Choose 2)
A. Run a data transform to populate the test page
B. Use a data page that contain the test page
C. Copy an existing page
D. Use pyWorkPage directly
Answer: A C

184. What is true about UI-based scenario tests (Choose 2)
A. You can provide data to your test cases with a predefined data page
B. Tests are saved in a production ruleset
C. Tests are available on the Scenario Testing landing page
D. You can record a scenario from Dev Studio or App Studio
Answer: A C

185. In which two contexts can you record a scenario test case? (Choose 2)
A. Process
B. Section
C. Portal
D. Case type
Answer: C D


`;

const QUESTION_CORRECTIONS = {
  9: { status: "INVALID", note: "INVALID_QUESTION" },
  18: { correct: "D", incorrect: "A", note: "not A (simulate data, not integration migration)" },
  23: { correct: "B", incorrect: "D", note: "not D (group by manager)" },
  31: { correct: "A", incorrect: "D", note: "not D (copy-from data page = one-time only)" },
  57: { correct: "B,C,D", incorrect: "B,C,E", note: "not E (work party to represent the customer is correct)" },
  65: { correct: "B", incorrect: "B,D", note: "not B,D (D invalid syntax)" },
  66: { correct: "A", incorrect: "B", note: "not B (use case-wide optional action)" },
  77: { correct: "B", incorrect: "C", note: "not C (delegation = business control)" },
  83: { correct: "A,B", incorrect: "A,C", note: "not A,C (authority matrix = non-hierarchy)" },
  85: { correct: "A,D", incorrect: "B,D", note: "not B,D (valid data = type + logic)" },
  94: { correct: "A,B", incorrect: "B,C", note: "not B,C (simulation = unavailable/slow systems)" },
  101: { correct: "B", incorrect: "D", note: "not D (field value = mostly static)" },
  114: { correct: "A", incorrect: "A,C", note: "not A,C (layout group only correct)" },
  123: { correct: "A,C,D", incorrect: "A,D,E", note: "not A,D,E (data transform does not display values)" },
  134: { correct: "B/C", incorrect: "D", note: "not D (process start condition, not validation)" },
  140: { correct: "A", incorrect: "A,B", note: "not A,B (email config not Dev Studio)" },
  147: { correct: "A,D", incorrect: "A,B,D", note: "not A,B,D (UI config not unit test)" },
  150: { correct: "A", incorrect: "D", note: "not D (wait step required)" },
  151: { correct: "C", incorrect: "B", note: "not B (wait = dependency, not approval)" },
  158: { correct: "B,D", incorrect: "A,C", note: "not A,C (branching needed for isolation)" },
  166: { correct: "A,B", incorrect: "A,D", note: "not A,D (unit test = rule behavior)" },
  178: { correct: "D", incorrect: "B", note: "not B (use Insight, not widget directly)" },
  190: { correct: "A,C", incorrect: "A,B", note: "not A,B (address = key duplicate condition)" },
  209: { correct: "A", incorrect: "D", note: "not D (visibility on checkbox itself)" },
  221: { correct: "C", incorrect: "B", note: "not B (portal controls access)" },
  224: { correct: "A", incorrect: "A,D", note: "not A,D (responsive layout only)" },
  250: { correct: "D", incorrect: "C", note: "not C (specific user = worklist)" },
  253: { correct: "A,D", incorrect: "D", note: "not D (need input + output columns)" },
};

const STORAGE_PREFIX = "testing-hub.weights.v1";
const SESSION_STATE_SUFFIX = ".sessionState";
const APP_SETTINGS_KEY = "testing-hub.settings.v1";

function hashString(value) {
  let hash = 5381;
  for (let i = 0; i < value.length; i += 1) {
    hash = (hash * 33) ^ value.charCodeAt(i);
  }

  return (hash >>> 0).toString(16);
}

function getQuestionId(question) {
  return `${question.number}|${question.text}|${question.answer}`;
}

function extractCorrectAnswers(answerStr) {
  const matches = answerStr.match(/[A-Z]+/g) || [];
  return new Set(matches);
}

function parseAnswerOptions(questionText) {
  const lines = questionText.split("\n");
  const options = [];

  for (const line of lines) {
    const match = line.match(/^([A-Z])[\.\)\:]\s*(.+)$/);
    if (match) {
      options.push({
        letter: match[1],
        text: match[2].trim(),
      });
    }
  }

  return options;
}

function parseQuestionParts(questionText) {
  const lines = questionText.split("\n");
  const stemLines = [];
  const options = [];

  for (const rawLine of lines) {
    const line = rawLine.trim();
    const optionMatch = line.match(/^([A-Z])[\.\)\:]\s*(.+)$/);

    if (optionMatch) {
      options.push({
        letter: optionMatch[1],
        text: optionMatch[2].trim(),
      });
      continue;
    }

    stemLines.push(rawLine);
  }

  return { stemLines, options };
}

function shuffleArray(items) {
  const cloned = [...items];
  for (let i = cloned.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    const tmp = cloned[i];
    cloned[i] = cloned[j];
    cloned[j] = tmp;
  }
  return cloned;
}

function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

function renderQuestionAsHTML(stemLines, renderedOptions) {
  const stemSpans = stemLines.map((line) => {
    const escapedLine = escapeHtml(line);
    const boldedLine = escapedLine.replace(/\(([^)]+)\)/g, '<strong>($1)</strong>');
    return `<span>${boldedLine}</span>`;
  });

  const optionSpans = renderedOptions.map((option) => {
    const escapedLine = escapeHtml(`${option.displayLetter}. ${option.text}`);
    const boldedLine = escapedLine.replace(/\(([^)]+)\)/g, '<strong>($1)</strong>');
    return `<span class="answer-option" data-letter="${option.displayLetter}">${boldedLine}</span>`;
  });

  return [...stemSpans, ...optionSpans].join("<br>");
}

function getQuestionSetKey(items) {
  const canonical = items
    .map((q) => `${q.number}::${q.text}::${q.answer}`)
    .sort()
    .join("\n");

  return `${STORAGE_PREFIX}.${hashString(canonical)}`;
}

function getSessionStateKey(questionSetKey) {
  return `${questionSetKey}${SESSION_STATE_SUFFIX}`;
}

function loadSavedAppSettings() {
  try {
    const raw = localStorage.getItem(APP_SETTINGS_KEY);
    if (!raw) {
      return {};
    }

    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") {
      return {};
    }

    return parsed;
  } catch {
    return {};
  }
}

function saveAppSettings() {
  const selectedPoolMode = getSelectedPoolMode();
  const payload = {
    selectedPoolMode,
  };

  localStorage.setItem(APP_SETTINGS_KEY, JSON.stringify(payload));
}

function loadSavedSessionState(storageKey) {
  try {
    const raw = localStorage.getItem(getSessionStateKey(storageKey));
    if (!raw) {
      return {};
    }

    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") {
      return {};
    }

    return parsed;
  } catch {
    return {};
  }
}

function saveCurrentSessionState() {
  if (!activeQuestionSetKey || !questions.length) {
    return;
  }

  const markedForReviewById = {};
  for (const question of questions) {
    if (question._forReview) {
      markedForReviewById[getQuestionId(question)] = true;
    }
  }

  const payload = {
    markedForReviewById,
    currentQuestionNumber: currentQuestion ? currentQuestion.number : null,
    randomizeAnswers: Boolean(randomizeAnswersChk && randomizeAnswersChk.checked),
    rangeStart: Number(startSlider.value),
    rangeEnd: Number(endSlider.value),
  };

  localStorage.setItem(getSessionStateKey(activeQuestionSetKey), JSON.stringify(payload));
}

function applySavedSessionState(storageKey) {
  const state = loadSavedSessionState(storageKey);
  if (!state || typeof state !== "object") {
    return false;
  }

  if (randomizeAnswersChk && typeof state.randomizeAnswers === "boolean") {
    randomizeAnswersChk.checked = state.randomizeAnswers;
  }

  const marked = state.markedForReviewById;
  if (marked && typeof marked === "object") {
    for (const question of questions) {
      question._forReview = Boolean(marked[getQuestionId(question)]);
    }
  }

  if (typeof state.rangeStart === "number") {
    const min = Number(startSlider.min);
    const max = Number(startSlider.max);
    const clampedStart = Math.min(max, Math.max(min, Math.round(state.rangeStart)));
    startSlider.value = String(clampedStart);
  }

  if (typeof state.rangeEnd === "number") {
    const min = Number(endSlider.min);
    const max = Number(endSlider.max);
    const clampedEnd = Math.min(max, Math.max(min, Math.round(state.rangeEnd)));
    endSlider.value = String(clampedEnd);
  }

  normalizeRange("end");

  const savedQuestionNumber = Number(state.currentQuestionNumber);
  if (!savedQuestionNumber) {
    return false;
  }

  const savedQuestion = questions.find((q) => q.number === savedQuestionNumber);
  if (!savedQuestion) {
    return false;
  }

  renderQuestion(savedQuestion);
  return true;
}

function getEffectiveAnswer(question) {
  const correction = QUESTION_CORRECTIONS[question.number];
  if (correction && correction.correct) {
    return correction.correct;
  }

  return question.answer;
}

function remapAnswerLetters(value, originalToDisplayMap) {
  if (!value || !originalToDisplayMap) {
    return value;
  }

  return value.replace(/\b([A-H])\b/g, (match, letter) => {
    return originalToDisplayMap[letter] || match;
  });
}

function formatAnswerWithCorrections(questionNumber, correctAnswer, originalToDisplayMap) {
  const correction = QUESTION_CORRECTIONS[questionNumber];
  const displayedAnswer = remapAnswerLetters(correctAnswer, originalToDisplayMap);
  
  if (!correction) {
    return escapeHtml(displayedAnswer);
  }
  
  if (correction.status === "INVALID") {
    return `<span style="color: #ff6b6b; font-weight: bold;">❌ ${correction.note}</span>`;
  }

  const correctedAnswer = remapAnswerLetters(correction.correct, originalToDisplayMap);
  const incorrectAnswer = remapAnswerLetters(correction.incorrect, originalToDisplayMap);
  const correctionNote = remapAnswerLetters(correction.note, originalToDisplayMap);
  
  let html = `<div style="margin-bottom: 8px;">${escapeHtml(displayedAnswer)}</div>`;
  html += `<div style="border-top: 2px solid #ffa500; padding-top: 8px; margin-top: 8px; color: #ff6b6b;">`;
  html += `<strong>⚠ CORRECTION NOTE:</strong><br/>`;
  html += `Correct Answer: <strong>${escapeHtml(correctedAnswer)}</strong><br/>`;
  if (correction.incorrect) {
    html += `${escapeHtml(incorrectAnswer)}<br/>`;
  }
  html += `${escapeHtml(correctionNote)}`;
  html += `</div>`;
  
  return html;
}

function updateScoreInfo() {
  scoreInfo.textContent = `Score: ${score.points} (${score.correct}/${score.attempted})`;
}

function resetQuizProgress() {
  score = { attempted: 0, correct: 0, points: 0 };
  updateScoreInfo();

  for (const question of questions) {
    question._selectedLetters = new Set();
    question._validated = false;
    question._wasCorrect = false;
    question._feedback = "";
  }
}

function wireAnswerOptionSelection(question) {
  const answerOptions = questionText.querySelectorAll("[data-letter]");

  answerOptions.forEach((optionEl) => {
    const displayLetter = optionEl.dataset.letter;

    optionEl.addEventListener("click", () => {
      if (!currentQuestion || currentQuestion.number !== question.number || question._validated) {
        return;
      }

      const originalLetter = question._displayToOriginalLetter[displayLetter] || displayLetter;

      if (question._selectedLetters.has(originalLetter)) {
        question._selectedLetters.delete(originalLetter);
      } else {
        question._selectedLetters.add(originalLetter);
      }

      optionEl.classList.toggle("selected-answer", question._selectedLetters.has(originalLetter));
    });
  });
}

function applyValidationStyles(question) {
  const answerOptions = questionText.querySelectorAll("[data-letter]");
  const correctAnswers = extractCorrectAnswers(getEffectiveAnswer(question));

  answerOptions.forEach((optionEl) => {
    const displayLetter = optionEl.dataset.letter;
    const originalLetter = question._displayToOriginalLetter[displayLetter] || displayLetter;
    const isSelected = question._selectedLetters.has(originalLetter);
    const isCorrect = correctAnswers.has(originalLetter);

    optionEl.classList.remove("selected-answer", "correct-answer", "wrong-answer", "missed-answer");

    if (!question._validated) {
      if (isSelected) {
        optionEl.classList.add("selected-answer");
      }
      return;
    }

    if (isSelected && isCorrect) {
      optionEl.classList.add("correct-answer");
    } else if (isSelected && !isCorrect) {
      optionEl.classList.add("wrong-answer");
    } else if (!isSelected && isCorrect) {
      optionEl.classList.add("missed-answer");
    }
  });
}

function loadSavedWeights(storageKey) {
  try {
    const raw = localStorage.getItem(storageKey);
    if (!raw) {
      return {};
    }

    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") {
      return {};
    }

    return parsed;
  } catch {
    return {};
  }
}

function saveCurrentWeights() {
  if (!activeQuestionSetKey || !questions.length) {
    return;
  }

  const payload = {};
  for (const q of questions) {
    payload[getQuestionId(q)] = Number(q.weight.toFixed(2));
  }

  localStorage.setItem(activeQuestionSetKey, JSON.stringify(payload));
}

function applySavedWeights(parsedQuestions, storageKey) {
  const savedWeights = loadSavedWeights(storageKey);

  return parsedQuestions.map((question) => {
    const questionId = getQuestionId(question);
    const savedWeight = savedWeights[questionId];

    if (typeof savedWeight !== "number" || Number.isNaN(savedWeight)) {
      return question;
    }

    return {
      ...question,
      weight: Math.max(0.2, Math.min(10, savedWeight)),
    };
  });
}

function parseQuestions(rawText) {
  const lines = rawText.split(/\r?\n/);
  const parsed = [];
  let active = null;

  for (const sourceLine of lines) {
    const line = sourceLine.trim();

    if (!line) {
      if (active) {
        active.text += "\n";
      }
      continue;
    }

    const answerMatch = line.match(/^(?:Answer|Answear|Answe?r)\s*:\s*(.*)$/i);
    if (answerMatch && active) {
      active.answer = answerMatch[1].trim();
      parsed.push(active);
      active = null;
      continue;
    }

    // Only start a new question when there is no active question being built.
    // This prevents numbered list items inside question text (for example: "1.", "2.")
    // from being parsed as standalone questions.
    if (!active) {
      const qMatch = line.match(/^(\d+)\s*[.:)]\s*(.*)$/);
      if (qMatch) {
        active = {
          number: Number(qMatch[1]),
          text: qMatch[2] || "",
          answer: "",
          weight: 1,
        };
      }
      continue;
    }

    active.text = active.text ? `${active.text}\n${line}` : line;
  }

  return parsed;
}

function normalizeQuestionText(rawText) {
  let normalized = rawText
    .replace(/\r/g, "")
    .replace(/[ \t]+/g, " ")
    .trim();

  // Split inline options to their own lines, for example: "... A) ... B) ...".
  normalized = normalized.replace(/\s([A-H])[\)\:\.]\s+/g, "\n$1. ");

  const lines = normalized
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const optionMatch = line.match(/^([A-H])[\)\:\.]\s*(.*)$/);
      if (!optionMatch) {
        return line;
      }

      return `${optionMatch[1]}. ${optionMatch[2].trim()}`;
    });

  return lines.join("\n");
}

function normalizeParsedQuestions(items) {
  return items.map((item) => ({
    ...item,
    text: normalizeQuestionText(item.text),
  }));
}

function getSelectedPoolMode() {
  const selected = document.querySelector('input[name="questionPoolMode"]:checked');
  return selected ? selected.value : "both";
}

function buildQuestionPool(mode) {
  const baseQuestions = normalizeParsedQuestions(parseQuestions(SAMPLE_DATA));
  const additionalRaw = normalizeParsedQuestions(parseQuestions(ADDITIONAL_QUESTIONS_DATA));
  const maxBaseNumber = baseQuestions.reduce(
    (max, question) => Math.max(max, Number(question.number) || 0),
    0,
  );

  const additionalQuestions = additionalRaw.map((question, index) => ({
    ...question,
    number: maxBaseNumber + index + 1,
  }));

  if (mode === "base") {
    return baseQuestions;
  }

  if (mode === "additional") {
    return additionalQuestions;
  }

  return [...baseQuestions, ...additionalQuestions];
}

function setControlsEnabled(enabled) {
  startSlider.disabled = !enabled;
  endSlider.disabled = !enabled;
  nextBtn.disabled = !enabled;
  nextQBtn.disabled = !enabled;
  prevQBtn.disabled = !enabled;
  showAnswerBtn.disabled = !enabled;
  validateBtn.disabled = !enabled;
  resetScoreBtn.disabled = !enabled;
  harderBtn.disabled = !enabled;
  easierBtn.disabled = !enabled;
  resetWeightsBtn.disabled = !enabled;
  jumpToInput.disabled = !enabled;
  jumpToBtn.disabled = !enabled;
  randomizeAnswersChk.disabled = !enabled;
  markForReviewChk.disabled = !enabled;
  reviewRandomBtn.disabled = !enabled;
}

function updateRangeInfo() {
  const start = Number(startSlider.value);
  const end = Number(endSlider.value);
  const count = Math.max(0, end - start + 1);

  startValue.textContent = String(start);
  endValue.textContent = String(end);
  rangeInfo.textContent = `${start}-${end} (${count} question${count === 1 ? "" : "s"})`;
}

function getQuestionsInRange() {
  const start = Number(startSlider.value);
  const end = Number(endSlider.value);

  return questions.filter((q) => q.number >= start && q.number <= end);
}

function pickWeightedRandom(items) {
  const totalWeight = items.reduce((sum, item) => sum + item.weight, 0);

  if (totalWeight <= 0) {
    return null;
  }

  let randomPoint = Math.random() * totalWeight;
  for (const item of items) {
    randomPoint -= item.weight;
    if (randomPoint <= 0) {
      return item;
    }
  }

  return items[items.length - 1] ?? null;
}

function clearQuestionSelectionState(question) {
  if (!question) {
    return;
  }

  question._selectedLetters = new Set();
  question._validated = false;
  question._wasCorrect = false;
  question._feedback = "";
}

function renderQuestion(question) {
  // If we are moving to a different question, clear the previous question selections.
  if (currentQuestion && currentQuestion.number !== question.number) {
    clearQuestionSelectionState(currentQuestion);
  }

  currentQuestion = question;
  currentQuestionIndex = questions.findIndex(q => q.number === question.number);

  if (!question._validated) {
    question._selectedLetters = new Set();
  } else if (!question._selectedLetters) {
    question._selectedLetters = new Set();
  }
  if (typeof question._validated !== "boolean") {
    question._validated = false;
  }
  if (typeof question._feedback !== "string") {
    question._feedback = "";
  }
  if (typeof question._forReview !== "boolean") {
    question._forReview = false;
  }

  if (markForReviewChk) {
    markForReviewChk.checked = question._forReview;
  }
  questionPanel.classList.toggle("reviewed-question", question._forReview);

  questionCounter.textContent = `Q: ${question.number}`;
  weightInfo.textContent = `Weight: ${question.weight.toFixed(2)}`;
  
  // Update weight color based on value
  weightInfo.classList.remove("weight-low", "weight-medium", "weight-high");
  if (question.weight < 1.5) {
    weightInfo.classList.add("weight-low");
  } else if (question.weight < 3) {
    weightInfo.classList.add("weight-medium");
  } else {
    weightInfo.classList.add("weight-high");
  }
  
  // Add visual indicator if this question has corrections
  const correction = QUESTION_CORRECTIONS[question.number];
  if (correction) {
    questionCounter.innerHTML = `Question: ${question.number} <span style="color: #ff6b6b; font-weight: bold; margin-left: 8px;">⚠ CORRECTION</span>`;
  }
  
  const { stemLines, options } = parseQuestionParts(question.text);
  const shouldRandomize = Boolean(randomizeAnswersChk && randomizeAnswersChk.checked);
  const orderedOptions = shouldRandomize ? shuffleArray(options) : options;
  const renderedOptions = orderedOptions.map((option, index) => ({
    displayLetter: String.fromCharCode(65 + index),
    originalLetter: option.letter,
    text: option.text,
  }));

  question._displayToOriginalLetter = {};
  question._originalToDisplayLetter = {};
  for (const option of renderedOptions) {
    question._displayToOriginalLetter[option.displayLetter] = option.originalLetter;
    question._originalToDisplayLetter[option.originalLetter] = option.displayLetter;
  }

  questionText.innerHTML = renderQuestionAsHTML(stemLines, renderedOptions);
  wireAnswerOptionSelection(question);
  applyValidationStyles(question);

  answerText.innerHTML = formatAnswerWithCorrections(
    question.number,
    question.answer,
    question._originalToDisplayLetter,
  );
  answerBlock.classList.add("hidden");
  setSelectionFeedback(question._feedback || "Select answers and click Validate.");
  
  const answerOptions = parseAnswerOptions(question.text);
  question._options = answerOptions;
  saveCurrentSessionState();
}

function showRandomQuestion() {
  const pool = getQuestionsInRange();

  if (!pool.length) {
    currentQuestion = null;
    questionCounter.textContent = "Question: -";
    weightInfo.textContent = "Weight: -";
    weightInfo.classList.remove("weight-low", "weight-medium", "weight-high");
    questionText.textContent = "No questions in selected range.";
    answerText.textContent = "";
    answerBlock.classList.add("hidden");
    return;
  }

  const selected = pickWeightedRandom(pool);
  if (!selected) {
    questionText.textContent = "Could not select a question. Check weights.";
    return;
  }

  renderQuestion(selected);
}

function showRandomReviewQuestion() {
  const pool = getQuestionsInRange().filter((q) => q._forReview);

  if (!pool.length) {
    setSelectionFeedback("No questions marked for review in selected range.");
    return;
  }

  const selected = pool[Math.floor(Math.random() * pool.length)];
  renderQuestion(selected);
}

function showNextQuestion() {
  const pool = getQuestionsInRange();

  if (!pool.length) {
    currentQuestion = null;
    questionCounter.textContent = "Question: -";
    weightInfo.textContent = "Weight: -";
    weightInfo.classList.remove("weight-low", "weight-medium", "weight-high");
    questionText.textContent = "No questions in selected range.";
    answerText.textContent = "";
    answerBlock.classList.add("hidden");
    return;
  }

  let nextQuestion = null;

  if (currentQuestion === null) {
    // If no question is selected, start with the first one in range
    nextQuestion = pool[0];
  } else {
    // Find the current question in the pool and get the next one
    const currentIndex = pool.findIndex(q => q.number === currentQuestion.number);
    if (currentIndex !== -1 && currentIndex < pool.length - 1) {
      nextQuestion = pool[currentIndex + 1];
    } else if (currentIndex === pool.length - 1) {
      // Wrap around to the first question
      nextQuestion = pool[0];
    } else {
      // Current question not in pool, start with first
      nextQuestion = pool[0];
    }
  }

  renderQuestion(nextQuestion);
}

function showPreviousQuestion() {
  const pool = getQuestionsInRange();

  if (!pool.length) {
    currentQuestion = null;
    questionCounter.textContent = "Question: -";
    weightInfo.textContent = "Weight: -";
    weightInfo.classList.remove("weight-low", "weight-medium", "weight-high");
    questionText.textContent = "No questions in selected range.";
    answerText.textContent = "";
    answerBlock.classList.add("hidden");
    return;
  }

  let prevQuestion = null;

  if (currentQuestion === null) {
    // If no question is selected, start with the last one in range
    prevQuestion = pool[pool.length - 1];
  } else {
    // Find the current question in the pool and get the previous one
    const currentIndex = pool.findIndex(q => q.number === currentQuestion.number);
    if (currentIndex !== -1 && currentIndex > 0) {
      prevQuestion = pool[currentIndex - 1];
    } else if (currentIndex === 0) {
      // Wrap around to the last question
      prevQuestion = pool[pool.length - 1];
    } else {
      // Current question not in pool, start with last
      prevQuestion = pool[pool.length - 1];
    }
  }

  renderQuestion(prevQuestion);
}

function configureSliders() {
  const numbers = questions.map((q) => q.number).sort((a, b) => a - b);
  const min = numbers[0];
  const max = numbers[numbers.length - 1];

  startSlider.min = String(min);
  startSlider.max = String(max);
  startSlider.value = String(min);

  endSlider.min = String(min);
  endSlider.max = String(max);
  endSlider.value = String(max);

  updateRangeInfo();
}

function normalizeRange(changed) {
  let start = Number(startSlider.value);
  let end = Number(endSlider.value);

  if (changed === "start" && start > end) {
    end = start;
    endSlider.value = String(end);
  }

  if (changed === "end" && end < start) {
    start = end;
    startSlider.value = String(start);
  }

  updateRangeInfo();
}

startSlider.addEventListener("input", () => {
  normalizeRange("start");
  saveCurrentSessionState();
});

endSlider.addEventListener("input", () => {
  normalizeRange("end");
  saveCurrentSessionState();
});

nextBtn.addEventListener("click", () => {
  showRandomQuestion();
});

reviewRandomBtn.addEventListener("click", () => {
  showRandomReviewQuestion();
});

nextQBtn.addEventListener("click", () => {
  showNextQuestion();
});

prevQBtn.addEventListener("click", () => {
  showPreviousQuestion();
});

showAnswerBtn.addEventListener("click", () => {
  answerBlock.classList.remove("hidden");
  
  if (!currentQuestion) {
    return;
  }

  const correctAnswers = extractCorrectAnswers(getEffectiveAnswer(currentQuestion));
  
  const answerOptions = questionText.querySelectorAll("[data-letter]");
  
  answerOptions.forEach((optionEl) => {
    optionEl.classList.remove("selected-answer", "correct-answer", "wrong-answer", "missed-answer");
    const displayLetter = optionEl.dataset.letter;
    const originalLetter = currentQuestion._displayToOriginalLetter[displayLetter] || displayLetter;
    if (correctAnswers.has(originalLetter)) {
      optionEl.classList.add("correct-answer");
    }
  });
});

validateBtn.addEventListener("click", () => {
  if (!currentQuestion) {
    return;
  }

  if (currentQuestion._validated) {
    setSelectionFeedback(currentQuestion._feedback || "Already validated.");
    answerBlock.classList.remove("hidden");
    return;
  }

  if (!currentQuestion._selectedLetters || currentQuestion._selectedLetters.size === 0) {
    setSelectionFeedback("Select at least one answer before validating.");
    return;
  }

  const correctAnswers = extractCorrectAnswers(getEffectiveAnswer(currentQuestion));
  const selectedAnswers = currentQuestion._selectedLetters;

  const isExactMatch = selectedAnswers.size === correctAnswers.size &&
    Array.from(selectedAnswers).every((answer) => correctAnswers.has(answer));

  currentQuestion._validated = true;
  currentQuestion._wasCorrect = isExactMatch;
  currentQuestion._feedback = isExactMatch ? "Correct! +1 point." : "Not correct. Review highlighted options.";

  score.attempted += 1;
  if (isExactMatch) {
    score.correct += 1;
    score.points += 1;
  }

  updateScoreInfo();
  setSelectionFeedback(currentQuestion._feedback);
  answerBlock.classList.remove("hidden");
  applyValidationStyles(currentQuestion);
});

// Keyboard shortcuts
document.addEventListener("keydown", (event) => {
    // Ignore shortcuts while typing in inputs/textareas
    const tag = document.activeElement.tagName;
    if (tag === "INPUT" || tag === "TEXTAREA") return;

    switch (event.code) {
        case "KeyA":
            event.preventDefault();
            document.getElementById("prevQBtn")?.click();
            break;

        case "KeyD":
            event.preventDefault();
            document.getElementById("nextQBtn")?.click();
            break;

        case "Space":
            event.preventDefault(); // Prevent page scroll
            document.getElementById("showAnswerBtn")?.click();
            break;

        case "KeyR":
            event.preventDefault();
            document.getElementById("nextBtn")?.click();
            break;

        case "KeyQ":
            event.preventDefault();
            document.getElementById("validateBtn")?.click();
            break;            

        case "KeyE":
            event.preventDefault();
            document.getElementById("reviewRandomBtn")?.click();
            break;
    }
});

resetScoreBtn.addEventListener("click", () => {
  resetQuizProgress();
  if (currentQuestion) {
    renderQuestion(currentQuestion);
  }
});

harderBtn.addEventListener("click", () => {
  if (!currentQuestion) {
    return;
  }

  currentQuestion.weight = Math.min(10, currentQuestion.weight + 0.4);
  weightInfo.textContent = `Weight: ${currentQuestion.weight.toFixed(2)}`;
  saveCurrentWeights();
  saveCurrentSessionState();
});

easierBtn.addEventListener("click", () => {
  if (!currentQuestion) {
    return;
  }

  currentQuestion.weight = Math.max(0.2, currentQuestion.weight - 0.4);
  weightInfo.textContent = `Weight: ${currentQuestion.weight.toFixed(2)}`;
  saveCurrentWeights();
  saveCurrentSessionState();
});

resetWeightsBtn.addEventListener("click", () => {
  if (!questions.length) {
    return;
  }

  for (const question of questions) {
    question.weight = 1;
  }

  if (currentQuestion) {
    weightInfo.textContent = `Weight: ${currentQuestion.weight.toFixed(2)}`;
  }

  saveCurrentWeights();
  saveCurrentSessionState();
});

jumpToBtn.addEventListener("click", () => {
  const qNum = Number(jumpToInput.value);
  
  if (!qNum || isNaN(qNum)) {
    alert("Please enter a valid question number");
    return;
  }

  const found = questions.find((q) => q.number === qNum);
  
  if (!found) {
    alert(`Question ${qNum} not found. Available: ${questions.map((q) => q.number).join(", ")}`);
    return;
  }

  renderQuestion(found);
});

randomizeAnswersChk.addEventListener("change", () => {
  saveCurrentSessionState();
  if (currentQuestion) {
    renderQuestion(currentQuestion);
  }
});

markForReviewChk.addEventListener("change", () => {
  if (!currentQuestion) {
    return;
  }

  currentQuestion._forReview = markForReviewChk.checked;
  questionPanel.classList.toggle("reviewed-question", currentQuestion._forReview);
  setSelectionFeedback(
    currentQuestion._forReview
      ? `Question ${currentQuestion.number} marked for review.`
      : `Question ${currentQuestion.number} removed from review list.`,
  );
  saveCurrentSessionState();
});

function loadSampleData() {
  const parsed = buildQuestionPool(getSelectedPoolMode());

  if (!parsed.length) {
    questions = [];
    setControlsEnabled(false);
    return;
  }

  activeQuestionSetKey = getQuestionSetKey(parsed);
  questions = applySavedWeights(parsed, activeQuestionSetKey).map((question) => ({
    ...question,
    _selectedLetters: new Set(),
    _validated: false,
    _wasCorrect: false,
    _feedback: "",
    _forReview: false,
  }));

  score = { attempted: 0, correct: 0, points: 0 };
  updateScoreInfo();
  configureSliders();
  setControlsEnabled(true);
  saveCurrentWeights();

  const didRestorePreviousSession = applySavedSessionState(activeQuestionSetKey);
  if (!didRestorePreviousSession) {
    showRandomQuestion();
  }
}

if (poolModeInputs && poolModeInputs.length) {
  for (const input of poolModeInputs) {
    input.addEventListener("change", () => {
      saveAppSettings();
      loadSampleData();
    });
  }
}

window.addEventListener("load", () => {
  const appSettings = loadSavedAppSettings();
  if (poolModeInputs && poolModeInputs.length && typeof appSettings.selectedPoolMode === "string") {
    const matchingInput = Array.from(poolModeInputs).find((input) => input.value === appSettings.selectedPoolMode);
    if (matchingInput) {
      matchingInput.checked = true;
    }
  }

  loadSampleData();
});

