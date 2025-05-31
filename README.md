# LEWAS Frontend - Interactive Environmental Data Dashboard

> **Learning Enhanced Watershed Assessment System (LEWAS) Lab**  
> Virginia Tech - Environmental Data Visualization Platform

## 🛠️ Technologies Used

![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![D3.js](https://img.shields.io/badge/d3.js-F9A03C?style=for-the-badge&logo=d3.js&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![Node.js](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)

## 🌐 Live Demo

🔗 **Access the Dashboard**: [https://lewas.vercel.app/](https://lewas.vercel.app/)

## 🌊 Overview

The LEWAS Frontend is a modern, responsive web application that provides real-time visualization and analysis of environmental monitoring data from the Webb Branch watershed. Built with Next.js and D3.js, it offers researchers, students, and the public an intuitive interface to explore water quality, flow dynamics, and weather data collected 24/7 from sophisticated sensors.

> **🔗 Related Projects**: This frontend connects to the [LEWAS Backend API](https://github.com/lewas-lab/lewas-backend) for data and integrates with the [LEWAS AI Chatbot](https://github.com/lewas-lab/chatbot-frontend) for natural language queries.

## ✨ Features

### 📊 Interactive Data Visualization

- **Real-time Charts**: Live updating graphs with D3.js
- **Multi-parameter Display**: Overlay up to 3 different measurements
- **Time Range Controls**: From 12 hours to 12 days of data
- **Unit System Toggle**: Switch between SI and US Imperial units
- **Responsive Design**: Works on desktop, tablet, and mobile

### 🔬 Comprehensive Parameter Support

#### Water Quality Monitoring

- **pH Level**: Water acidity/alkalinity measurement
- **Dissolved Oxygen**: Critical for aquatic ecosystem health
- **Water Temperature**: Thermal monitoring with unit conversion
- **Turbidity**: Water clarity in Nephelometric Turbidity Units
- **Specific Conductance**: Electrical conductivity measurement
- **Salinity**: Salt content in parts per thousand
- **ORP**: Oxidation Reduction Potential in millivolts

#### Water Flow Dynamics

- **Stage**: Water level with datum offset correction
- **Flow Rate**: Estimated volumetric flow using advanced algorithms
- **Smoothed Velocity**: Processed water speed with noise reduction
- **Downstream Velocity**: Raw velocity measurements

#### Weather Monitoring

- **Air Temperature**: Atmospheric temperature with unit conversion
- **Humidity**: Relative humidity percentage
- **Air Pressure**: Barometric pressure with altitude correction
- **Rain Intensity**: Real-time precipitation rate
- **Rain Accumulation**: Cumulative rainfall totals
- **Rain Duration**: Duration of precipitation events

### 🎛️ Advanced Data Processing

- **Real-time Processing**: Applies the same scientific algorithms used in research
- **Stage Correction**: Datum offset adjustments for accurate water levels
- **Velocity Smoothing**: Adaptive alpha filtering for cleaner velocity data
- **Flow Rate Calculation**: Cubic polynomial conversion from velocity measurements
- **Pressure Correction**: Altitude-adjusted atmospheric pressure readings

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ installed
- Access to LEWAS Backend API
- Modern web browser

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/lewaslab/lewas-frontend
cd lewas-frontend
```

2. **Install dependencies**

```bash
npm install
```

3. **Configure environment variables**

```bash
# Create .env file from the .env.example file
NEXT_PUBLIC_API_URL=<BACKEND URL>
NEXT_PUBLIC_API_KEY=<BACKEND API KEY>
```

4. **Run development server**

```bash
npm run dev
```

5. **Access the application**
   Open [http://localhost:3000](http://localhost:3000) in your browser

### Production Build

```bash
# Build for production
npm run build

# Start production server
npm run start

# Or export static files
npm run build && npm run export
```

## 🏗️ Architecture

### Technology Stack

- **Framework**: Next.js 15.2.4 (React 19)
- **Visualization**: D3.js 7.9.0 for advanced charting
- **Data Processing**: Custom algorithms matching research standards
- **Deployment**: Static export compatible with any hosting platform

### Component Structure

```
src/
├── components/
│   ├── Layout.js              # Main layout with navigation
│   ├── RawDataDisplay.js      # Debug data visualization
│   └── SensorTable.js         # Tabular data display
├── pages/
│   ├── index.js               # Landing page with overview
│   ├── live-data.js           # Main interactive dashboard
│   ├── team.js                # Research team information
│   ├── chatbot.js             # AI assistant integration
├── services/
│   └── api.js                 # Backend API integration
├── utils/
│   └── dataProcessor.js       # Scientific data processing
└── styles/
    └── globals.css            # Global styling and themes
```

## 📊 Interactive Dashboard Usage

### Getting Started

1. Navigate to the **Live Creek Data** page
2. Select your preferred unit system (SI or US Imperial)
3. Choose a time range for data display
4. Configure up to 3 parameters for simultaneous viewing

### Parameter Selection

- **Axis 1 (Blue)**: Primary measurement, always visible
- **Axis 2 (Red)**: Secondary measurement, toggleable
- **Axis 3 (Green)**: Tertiary measurement, toggleable

### Advanced Features

- **Interactive Tooltips**: Hover over data points for detailed information
- **Zoom and Pan**: Explore specific time periods in detail
- **Real-time Updates**: Click "Update Chart" for latest data
- **Multi-scale Display**: Different Y-axes for parameters with different ranges

### Time Range Options

- **Past 12 Hours**: High-resolution recent data
- **Past 3 Days**: Short-term trend analysis
- **Past 6 Days**: Weekly pattern observation
- **Past 12 Days**: Extended trend monitoring

## 🔧 Configuration

### API Configuration

```javascript
// src/services/api.js
export const ApiService = {
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/v1/sensors`,
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  // ... additional configuration
};
```

### Parameter Mapping

The application maps frontend parameters to backend API calls:

```javascript
// Example parameter configuration
export const PARAMETER_CONFIG = {
  water_temperature: {
    metric: "temperature",
    medium: "water",
    instrument: "sonde",
    processing: "none",
  },
  stage: {
    metric: "velocity-z",
    medium: "water",
    instrument: "argonaut",
    processing: "stage_correction",
  },
  // ... more parameters
};
```

### Data Processing Pipeline

The frontend replicates research-grade processing:

```javascript
// Stage correction example
if (param === "water/velocity-z") {
  for (let i in response.data) {
    response.data[i].y = response.data[i].y + 0.128; // Datum offset
  }
}

// Velocity smoothing example
for (let i = 1; i < response.data.length; i++) {
  const absValue = Math.abs(response.data[i].y);
  const alpha = Math.min(Math.max(absValue, 24.5) - 23, 30) / 30;
  response.data[i].y =
    (1 - alpha) * response.data[i - 1].y + alpha * response.data[i].y;
}
```

## 🎨 Customization

### Styling and Themes

### Adding New Parameters

1. **Update Parameter Config**: Add to `PARAMETER_CONFIG` in `api.js`
2. **Add to Dropdown Options**: Update `parameterOptions` in `live-data.js`
3. **Configure Processing**: Add processing logic if needed
4. **Update Labels**: Add user-friendly labels and units

### Custom Visualizations

The D3.js integration allows for custom chart types:

```javascript
// Example: Adding a new chart type
const customChart = d3
  .select(container)
  .append("svg")
  .attr("width", width)
  .attr("height", height);

// Add your custom visualization logic
```

## 🔗 Integration

### Backend API Integration

The frontend seamlessly integrates with the LEWAS Backend API:

```javascript
// Real-time data fetching
const fetchParameterData = async (parameterType, startTime, endTime) => {
  const response = await ApiService.fetchParameterData(
    config,
    startTime,
    endTime
  );
  return dataProcessor.processParameterData(
    response.observations,
    parameterType,
    unitSystem
  );
};
```

### AI Chatbot Integration

Links to the LEWAS Chatbot for natural language data queries:

- Direct link to Streamlit chatbot application
- Contextual help and example questions
- Seamless user experience between platforms

## 🧪 Development

### Adding New Features

1. **API Integration**: Add new endpoints in `services/api.js`
2. **Data Processing**: Extend `utils/dataProcessor.js` for new algorithms

## 🌐 Deployment

### Static Export (Recommended)

```bash
# Build static files
npm run build

# Serve static files
npx serve@latest exportable
```

### Hosting Options

- **GitHub Pages**: Free hosting for static sites
- **Vercel**: Optimal for Next.js applications
- **Netlify**: Great for static sites with forms
- **AWS S3 + CloudFront**: Scalable cloud hosting
- **Virginia Tech Servers**: Internal hosting option

## 📚 Educational Use

### Classroom Integration

- **Real-time Data**: Current environmental conditions for class discussions
- **Historical Analysis**: Trend analysis for research projects
- **Interactive Learning**: Hands-on data exploration
- **Cross-disciplinary**: Supports environmental, engineering, and data science courses

### Research Applications

- **Publication-ready Visualizations**: High-quality charts for papers
- **Hypothesis Testing**: Visual correlation analysis

## 🔒 Security

### API Security

- API keys stored in environment variables
- HTTPS-only communication

### Privacy

- No personal data collection
- Environmental data only
- Transparent data usage
- Research compliance standards

## 📞 Support

### Getting Help

- **Technical Issues**: Submit GitHub issues
- **Educational Use**: Contact Dr. Vinod Lohani (vlohani@vt.edu)
- **Development**: Contact Dhruv Varshney (dhruvvarshney@vt.edu) | [LinkedIn](https://www.linkedin.com/in/dvar/)

This project is part of the LEWAS Lab research initiative at Virginia Tech.

Dhruv Varshney | **LEWAS Lab** | Virginia Tech | Real-time Environmental Data Since 2010

_Making environmental data accessible through innovative visualization and interactive technologies._
