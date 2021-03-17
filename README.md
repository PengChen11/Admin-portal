# Admin portal

This website will be my centralized management center for all my apps. It will be:

1. A secured system only allow authenticated admin to login.
2. Has a demo user to show functionality, demo user will only see mock data. (**username and password both are "demo".**)
3. Has the ability to display all users, and perform user account management.
4. Has the ability to display, create, edit and delete both articles project info I wrote to the blog micro-service.
5. Has the ability to display, edit and delete system monitoring logs received from system monitor micro-service.
6. more support is coming later.

Deployed site: <https://admin.pengchen.work>

## Technical Requirements

The application will be created with the following overall architecture and methodologies

1. Built with client-sider rendered React code.
2. Axios for performing API Requests to backend service.
3. React Material-UI for layout and styling.
4. Deployment to a cloud provider (Vercel in this case).
5. A single page app behind the hood, use React-router-dom handle the route
6. This website is only intended to manage applications, to DISPLAY info, please visit <https://pengchen.work>
