# Ticket-Booking-Assignment


This is a web application of “Train Ticket Reservation System”, in which front end (client side) is developed using React JS, HTML, CSS.

Application is divided into two categories, one is super-agent and the other is agent. 

Super-agent is provided capability to create or delete agents based on their email-ids. While creating the agents, super-agent can specify the maximum number of tickets each agent can book.

On the agent side, there are multiple pages designated for each task like to login into the account, setting up the profile to book tickets. As soon as an agent completes their email, it is cross-validated against super-agent's list of agents created, if it is available, login made successful and redirected to either profile update page or ticket booking page.

If it is the first time login, the agent is redirected to the profile update page to enter his/her personal details (name, DOB etc.).
Once the data is entered, the page will be redirected to the ticket booking page. If the agent is logging for the second time or onwards, the page will be redirected directly to the booking page.

In the ticket booking page, the agent is provided with an interface to enter passenger details (Name, Age, & Gender). Agent can enter passenger details till his/her maximum capacity of seats are exceeded (set by super-agent). Once the details are entered, agents can click a button to book tickets are allocated based on following criteria.
	Priority of seat allotment is done in the mentioned order 
	Woman with age 60 or above --> Men with age 60 or above --> Woman under age 60 --> men under age 60
	
Once the allotment is done, a layout is shown to indicate which seats are booked.



