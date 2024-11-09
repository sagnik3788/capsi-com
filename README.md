# Capsi-com

# Capsi-com: AI-Powered Subtitle Generator

Capsi-com is an AI-powered subtitle generation platform designed to create real-time, customizable subtitles for short-form video content on platforms like Instagram Reels and TikTok. This project enhances accessibility and viewer engagement by generating downloadable subtitles in the widely-used .srt format.

## Project Overview

Capsi-com aims to simplify the subtitle creation and editing process for content creators, offering an efficient and accessible solution for video content enhancement. Key features include:

- **AI-Powered Subtitle Generation**: Automated real-time subtitle creation using the Whisper AI model.
- **Subtitle Editing and Customization**: Intuitive interface for reviewing, editing, and customizing the generated subtitles.
- **Multi-Format Video Compatibility**: Support for various video file types, including MP4 and MOV.
- **Subtitle Download in .srt Format**: Enables users to download subtitles in the industry-standard .srt format for easy integration with video editing software.
- **Secure Cloud-Based Storage**: Leverages Azure Blob Storage for reliable video file storage and Google Cloud Console for secure user data management.

## Tech Stack

### Frontend
- **Next.js**: React-based framework for building the user interface.
- **React**: Library for building the component-based user interface.
- **Material UI**: UI component library for creating a visually appealing and responsive interface.
- **Figma**: Used for designing the user interface and user experience.

### Backend
- **Node.js**: Runtime environment for building the backend and handling server-side processes.
- **Whisper AI API (OpenAI)**: Integrated for real-time subtitle generation.

### Cloud Infrastructure and Storage
- **Azure Blob Storage**: Used for secure and scalable storage of video files.
- **Google Cloud Console**: Manages user information and data securely.

### Deployment and Hosting
- **Vercel**: For deploying the Next.js frontend.
- **Azure**: For backend deployment and data management.

### Version Control and Collaboration
- **Git** and **GitHub**: Used for version control and collaborative development.

### Design and Prototyping
- **Figma**: Utilized for creating user interface prototypes and refining the user experience.

## Frontend Repository
[Capsi-com Frontend](https://capsi-gen-spc6.vercel.app/)

## Backend Repository
[Capsi-com Backend](https://wis-ai-backend-1.onrender.com)

## Infrastructure as Code (Terraform)
To manage the cloud infrastructure and deployment of Capsi-com, we have also implemented Infrastructure as Code (IaC) using Terraform. The Terraform configuration is available in the following repository:

[Capsi-com Infrastructure](http://54.90.90.71/)

## AWS Deployment
The backend of Capsi-com is deployed on AWS using the Terraform configurations. This ensures a reliable and scalable hosting environment for the application.

## Future Enhancements
Potential future enhancements for Capsi-com include:

- **AI-Powered Context Detection and Subtitle Refinement**: Integrate advanced AI models to detect context, tone, and sentiment within the video content, enabling more nuanced and contextually accurate subtitles.
- **Direct Integration with Social Media Platforms**: Develop integrations with popular platforms like Instagram, TikTok, and YouTube to enable direct uploads of subtitle-enhanced videos.
- **Collaboration and Multi-User Access**: Implement collaborative tools for teams to work on subtitle generation and editing together in real-time.

## Conclusion
Capsi-com is a comprehensive solution that simplifies the subtitle creation process for video content creators, empowering them to enhance accessibility and viewer engagement across various social media platforms. By leveraging cutting-edge AI technology, cloud infrastructure, and a user-friendly interface, Capsi-com aims to become a go-to tool for modern digital content creators.
