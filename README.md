# kandi

kandi is a community platform designed to help users build communities and organize community events through direct invites. It fosters skill-sharing, enabling users to collaborate on tasks and realize their event plans. Whether you're planning a festival in the woods, a songwriting workshop, or Grandma's 80th birthday, kandi provides the tools you need to create, organize, and share your interests with like-minded people.

## Key Features

- **Community Building**: Users can create communities via direct invite, ensuring safe and secure spaces.
- **Event Management**: Community creators can invite members to participate in community events.
- **Skill Sharing**: Users can assign themselves to tasks to help realize community events.
- **Safe Spaces**: Focus on providing a safe and inclusive environment for all users.

## Homepage Text
You have plans? A festival in the woods? A songwriting workshop with your music fellows? Grandma’s 80th?
kandi helps you to build communities of people who share the same interests and organize community events. Find your people and share your skills.

## Technologies Used

- **Frontend**: React.js
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Styling**: Tailwind CSS
- **Authentication**: JWT (JSON Web Tokens)

## Project Structure

The project is structured as follows:

- **context**: Contains context providers for authentication, color schemes, and user services.
- **components**: Reusable components like EventCard, CommunityCard, and TaskCard.
- **pages**: Main pages of the app such as ProfilePage, LoginPage, and CommunityPage.
- **styles**: Tailwind CSS configurations and global styles.

## Installation

To get a local copy up and running, follow these simple steps:

1. **Clone the repo**
   ```sh
   git clone https://github.com/kodah-space/fp-frontend/

2. **Install NPM packages**

sh

npm install

3. **Set up environment variables**

Create a .env file in the root directory and add the following:

env

REACT_APP_API_URL=http://localhost:5005

4. **Start the development server**

sh

    npm start

**Usage

    Sign up: Create a new account or log in if you already have one.
    Create a community: Navigate to the "Create Community" page and fill in the details to start a new community.
    Invite members: Use direct invites to add members to your community.
    Create events: Plan and manage events by inviting community members.
    Assign tasks: Share and assign tasks to realize your community events.

**Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are greatly appreciated.

    Fork the Project
    Create your Feature Branch (git checkout -b feature/AmazingFeature)
    Commit your Changes (git commit -m 'Add some AmazingFeature')
    Push to the Branch (git push origin feature/AmazingFeature)
    Open a Pull Request

**License

Distributed under the MIT License. See LICENSE for more information.
Contact

kandi@kandi.com

Project Link: https://github.com/your_username/kandi

**Acknowledgements

    React
    Tailwind CSS
    Express
    MongoDB
