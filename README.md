
# Connect: Commitment Management Application

## About Connect

Connect is a modern web application designed to help users create, manage and track various types of commitments between parties. Whether personal promises, business agreements, or contracts, Connect provides a secure and transparent way to document and verify commitments.

## Features

- User authentication and profile management
- Create and manage different types of commitments
- Real-time updates on commitment status
- Document storage for commitment-related files
- Connection management between users
- Digital wallet integration

## Technical Stack

- **Frontend**: React, TypeScript, Tailwind CSS, shadcn/ui
- **Backend**: Supabase (PostgreSQL, Auth, Storage, Functions)
- **State Management**: TanStack Query (React Query)
- **Styling**: Tailwind CSS with custom theme
- **Authentication**: Supabase Auth

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Supabase account

### Installation

1. Clone the repository:
```sh
git clone <repository-url>
cd connect
```

2. Install dependencies:
```sh
npm install
```

3. Configure environment variables:
Create a `.env` file in the project root with the following variables:
```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Run the development server:
```sh
npm run dev
```

## Backend Architecture

The application uses Supabase as its backend with the potential to migrate to AWS QLDB in the future. For detailed information on the backend architecture, see:

- [Backend Architecture Documentation](./docs/BACKEND_ARCHITECTURE.md)
- [Supabase to QLDB Migration Guide](./docs/SUPABASE_TO_QLDB_MIGRATION.md)

## Database Schema

The following tables are used in the Supabase database:

### profiles
- Stores user profile information
- Automatically created when a user signs up

### commitments
- Core table for commitment data
- Stores common fields like title, description, status

### commitment_parties
- Junction table for users involved in commitments
- Defines the role of each user in the commitment

### commitment_documents
- Stores document references for commitments
- Links to files in Storage

### commitment_history
- Tracks changes to commitments over time
- Useful for audit and verification

## API Documentation

The application uses Supabase as its backend API. The CommitmentService class provides methods for interacting with the Supabase API:

- `createCommitment`: Creates a new commitment
- `getUserCommitments`: Gets all commitments created by the current user
- `getParticipatingCommitments`: Gets all commitments where the user is a participant
- `getCommitmentById`: Gets a specific commitment by its ID
- `updateCommitment`: Updates a commitment's details
- `updateCommitmentStatus`: Updates a commitment's status
- `deleteCommitment`: Deletes a commitment

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
