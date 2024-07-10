# Team Tracker

Team Tracker is a web application designed to help teams manage their match information, player statistics, and performance insights. It allows users to create accounts, join or create teams, input game data, and access detailed analytics to make informed strategic decisions.

## Features

- **User Accounts**: Sign up, log in, and manage your profile.
- **Team Management**: Create or join teams, manage team members.
- **Match Information**: Input match details including scores, players, and game statistics.
- **Player Statistics**: View individual and team performance metrics.
- **Performance Insights**: Analyze statistics to make data-driven strategic decisions.

## Tech Stack

### Front End

- **Framework**: [Next.js](https://nextjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [TailwindCSS](https://tailwindcss.com/)
- **UI Components**: [ShadcnUI](https://ui.shadcn.com/)

### Back End

- **Server Actions and Routes**: Handled by Next.js
- **Authentication**: Authenticated via [Supabase](https://supabase.com/)
- **Database**: PostgreSQL via [Supabase](https://supabase.com/)

## Installation

To get started with the development environment, follow these steps:

1. **Clone the repository**:

   ```bash
   git clone https://github.com/your-username/team-tracker.git
   cd team-tracker
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Set up environment variables**:
   Create a `.env.local` file in the root directory and add the following variables:

   ```env
   NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
   ```

4. **Run the development server**:

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Usage

### Creating an Account

1. Navigate to the Sign Up page.
2. Fill in your details and click "Sign Up".
3. Verify your email if required.

### Creating/Joining a Team

1. After logging in, go to the Teams page.
2. To create a team, click on "Create Team" and fill in the details.
3. To join a team, search for the team and send a join request.

### Inputting Match Information

1. Go to the Matches page.
2. Click on "Add Match" and enter the match details including scores and players involved.
3. Save the match details.

### Viewing Player Statistics

1. Navigate to the Statistics page.
2. Select a player or team to view detailed performance metrics.
3. Analyze the provided insights to improve strategies.

## Contributing

Contributions are welcome! Please fork the repository and create a pull request with your changes. Ensure your code follows the existing code style and includes relevant tests.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

## Acknowledgements

- Thanks to the Next.js, TailwindCSS, ShadcnUI, and Supabase teams for their excellent tools and documentation.
