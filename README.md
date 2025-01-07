# BEX Salesrep Dashboard

The **BEX Salesrep Dashboard** is a frontend application designed to interact with the Strapi API, providing a seamless interface for sales representatives to manage and track their sales activities efficiently.  

## Features  
- User-friendly dashboard tailored for sales representatives.  
- Integration with the Strapi API for real-time data management.  
- Ability to view, create, and update sales records.  
- Optimized performance for handling large datasets.  
- Secure authentication and role-based access.  

## Technology Stack  
- **Frontend**: Built using [React](https://reactjs.org/) (or specify if you're using another framework).  
- **Backend**: Powered by the Strapi API.  
- **Database**: MongoDB (via Strapi for user and sales data).  

## Architecture Overview  
The **BEX Salesrep Dashboard** operates as the frontend layer in the following architecture:  

1. **Odoo**: The central ERP system for business processes.  
2. **Strapi**: Acts as a middleware between the dashboard and Odoo, handling API requests.  
3. **MongoDB**: Stores user and sales data for the dashboard via Strapi.  

### Flow:  
Sales Representatives → **BEX Salesrep Dashboard** → Strapi → Odoo  

This architecture ensures efficient handling of sales activities while reducing the cost of additional Odoo licenses.  


### Steps  
1. git clone https://github.com/your-repo/bex-salesrep-dashboard.git
2. cd bex-salesrep-dashboard
3. yarn install
4. yarn dev
5. When ready to deploy: yarn build -> yarn deploy
