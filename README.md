# Office Management Application

A Next.js web application for managing office layouts, employee seating, team assignments, and room management.

## Features

- Multiple office maps with management features
- Employee location tracking with QR code generation
- Team assignment functionality
- Room naming and management
- Search and filtering capabilities
- Works in both online (MongoDB) and offline (localStorage) modes
- Printable QR code export for all employees

## Deployment on Vercel

This application is configured for deployment on Vercel:

1. Push your code to GitHub
2. Import your repository at [vercel.com/import](https://vercel.com/import)
3. Add your MongoDB URI as an environment variable:
   - Name: `MONGODB_URI`
   - Value: Your MongoDB connection string

### Environment Variables

- `MONGODB_URI`: Connection string for your MongoDB database

## Local Development

1. Clone the repository
2. Install dependencies: `npm install`
3. Create a `.env.local` file with your MongoDB connection string:
   ```
   MONGODB_URI=mongodb+srv://...
   ```
4. Run the development server: `npm run dev`
5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Build & Run

- Build: `npm run build`
- Start: `npm start`

## License

MIT

## Tech Stack

- Next.js
- TypeScript
- MongoDB (with fallback to localStorage)
- GitHub Pages deployment

## Deployment

The application is automatically deployed to GitHub Pages through GitHub Actions.

## Setup Instructions

### Prerequisites

- Node.js (v16 or later)
- npm or yarn
- MongoDB Atlas account (or a MongoDB server)

### Installation

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```

3. Set up MongoDB:
   - Create a `.env.local` file in the root directory
   - Add your MongoDB connection string:
     ```
     MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database?retryWrites=true&w=majority
     ```
   - Replace username, password, cluster, and database with your MongoDB credentials

4. Run the development server:
   ```
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

### Testing MongoDB Connection

To verify your MongoDB connection is working:
1. Start the development server
2. Visit [http://localhost:3000/api/test-db](http://localhost:3000/api/test-db)
3. You should see a JSON response confirming the connection

## Using the Application

1. **Upload a Map**: Start by uploading an office floor plan image
2. **Add Employees**: Switch to the Employee Placement tab and add employees
3. **Import from CSV**: Alternatively, import employees from a CSV file
4. **Arrange Employees**: Drag employees to their correct positions
5. **Create Teams**: Switch to the Team Assignment tab to create and assign teams
6. **Name Rooms**: Use the Room Renaming tab to label rooms
7. **Search**: Use the Search & Filter tab to find employees

All changes are automatically saved to the database.

## Technologies Used

- Next.js
- React
- TypeScript
- Tailwind CSS
- MongoDB/Mongoose

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Deployment

### Deploying to GitHub Pages

This application is configured for deployment to GitHub Pages. Follow these steps:

1. Create a GitHub repository and push your code

2. Update the "homepage" in package.json with your GitHub username:
   ```json
   "homepage": "https://yourusername.github.io/office-managment"
   ```

3. Deploy using the GitHub Actions workflow (automatic):
   - Push to the main branch to trigger automatic deployment, or
   - Go to the Actions tab on GitHub and manually trigger the "Deploy to GitHub Pages" workflow

4. Alternatively, deploy manually with:
   ```
   npm run deploy
   ```

5. Configure GitHub Pages Settings:
   - Go to your GitHub repository
   - Navigate to Settings > Pages
   - Set the source to "GitHub Actions"

### Note About MongoDB in Deployment

When deployed to GitHub Pages (or any static hosting), the app automatically switches to offline mode and saves data to local storage since MongoDB requires a backend server. This is expected behavior.

If you need full database functionality in production, consider deploying to a platform that supports server-side code like Vercel, Netlify, or Heroku.
