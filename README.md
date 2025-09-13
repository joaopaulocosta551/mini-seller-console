# Mini Seller Console

A lightweight CRM application for managing sales leads and opportunities built with React, TypeScript, and Tailwind CSS.

![Mini Seller Console Screenshot](https://via.placeholder.com/800x450.png?text=Mini+Seller+Console+Screenshot)

## Features

- **Lead Management**: View, filter, and update sales leads
- **Opportunity Tracking**: Convert qualified leads into opportunities
- **Responsive Design**: Works on desktop and mobile devices
- **Interactive UI**: Modern user interface with real-time updates

## Tech Stack

- **React 19**: Front-end library for building user interfaces
- **TypeScript**: Type-safe JavaScript
- **Tailwind CSS**: Utility-first CSS framework
- **Vite**: Next generation frontend tooling

## Getting Started

### Prerequisites

- Node.js (v16+)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/mini-seller-console.git
cd mini-seller-console
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Start the development server
```bash
npm run dev
# or
yarn dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Project Structure

```
mini-seller-console/
├── src/
│   ├── assets/          # Static assets
│   ├── components/
│   │   ├── layout/      # Layout components
│   │   └── ui/          # UI components
│   ├── data/            # Mock data
│   ├── hooks/           # Custom React hooks
│   ├── types/           # TypeScript type definitions
│   ├── utils/           # Utility functions
│   ├── App.tsx          # Main App component
│   └── main.tsx         # Application entry point
├── public/              # Public assets
├── index.html           # HTML template
├── tailwind.config.js   # Tailwind configuration
└── vite.config.ts       # Vite configuration
```

## Usage

### Managing Leads

- **View Leads**: All leads are displayed in the main leads table
- **Filter Leads**: Use the search box to filter by name or company
- **Filter by Status**: Select a status to filter leads
- **Edit Lead**: Click on any lead to open the edit panel
- **Update Status**: Change lead status between New, Contacted, and Qualified

### Converting to Opportunities

- Click on a lead to open the details panel
- Click the "Convert to Opportunity" button to move the lead to opportunities

## Build for Production

```bash
npm run build
# or
yarn build
```

This will create an optimized build in the `dist` directory.

## Deployment

The application can be deployed to any static hosting service:

```bash
# Example using serve package
npm install -g serve
serve -s dist
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- React team for the amazing library
- Tailwind CSS for the utility-first approach
- Vite team for the lightning-fast build tool
