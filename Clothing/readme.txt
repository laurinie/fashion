The user enters his username and password in the fields displayed by the JSP - LoginPage.jsp -
When the user submits, the servlet responsible for handling the request is called - LoginServlet -
The Servlet is responsible for calling the appropriate method in the DAO so that it can indirectly interact with the DB.
It is also responsible for setting and updating data saved in the bean, which will be used later by the DAO.

In our application,
The LoginServlet creates a new instant of the UserBean and fills it with the username and the password entered by the user. The DAO will use this bean later to compare between the user input and the DB data
The Servlet calls the "login" method in the "UserDAO" to start performing its task
The Login method, in the DAO, is responsible for checking whether the data entered by the user exists in the DB or not.
In addition, it has to update the Bean's data that will be used later by the servlet.

In our application,
The DAO uses the ConnectionManager class to get the DB connection
Query the DB (asks the DB to search for a user having certain username and password ) and checks,
If the ResultSet is empty, this means that the username and password were invalid (not in the DB).
If the ResultSet is not empty, this means that the username and password were valid.
Updates the UserBean.
In case of valid username and password, the DAO fills the bean with the rest of the user's information that will need to be displayed later by the JSP (first and last names).
In addition, it sets the "valid" attribute of the bean to true.

Otherwise, the DAO sets the "valid" attribute of the bean to false
Now we know if the user was registered or not
Finally, the Servlet will check the validity of the user (by reading the valid attribute of the bean) and redirect to the appropriate JSP .
If valid, the servlet will
Add the bean as an attribute to the session. The bean will be used by the JSP to display the user's first and last names
Redirect to “userLogged.jsp” - That will welcome the user
If invalid, the servlet will redirect to “invalidLogin.jsp” - That will ask the user to sign up