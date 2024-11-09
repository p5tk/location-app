# Running Location App

## Prerequisites


1.  **Expo Go App**: Install the Expo Go app on your phone from the [App Store](https://apps.apple.com/us/app/expo-go/id982107779) (for iOS) or [Google Play](https://play.google.com/store/apps/details?id=host.exp.exponent&hl=en&gl=US) (for Android) to preview the app on your mobile device.

  
1.  **Git**: If you haven't installed Git, you can download and install it from [Git](https://git-scm.com/).

3.  **Text Editor**: Use a text editor such as [VS Code](https://code.visualstudio.com/) to edit the project.

  
## Steps to Run

Follow these steps to set up and run the app locally:

1.  **Clone the Repository**: First, clone the repository to your local machine using the following command:

```bash

git clone https://github.com/p5tk/location-app.git

cd location

```

2.  **Add .env file**: Add the .env file at the root of this project. env file should include EXPO_PUBLIC_BACKEND_URL=http://[Your IP address]:8080


3.  **Install Dependencies**: Once you're inside the project folder, install all the required dependencies using either npm or yarn:

- Using npm:

```bash

npm install

```

- Using yarn:

```bash

yarn install

```
4.  **Start the Expo Server**: After installing dependencies, start the Expo development server with the following command:
```bash

npx expo start

```

This will make an QR code output in your terminal. You have to scan the QR code by expo app you installed.

5.  **Run the App on a Simulator/Emulator (Optional)**:

- For iOS: Run the following command to open the app in an iOS simulator:

```bash

npx expo start --ios

```
- For Android: Run the following command to open the app in an Android emulator:
```bash

npx expo start --android



```

**NOTE** : Before running this project, you need to run backend first according to this [Backend Repo](https://github.com/devcombine-llc/jwt-maps-go-server)

## Architecture overview
The architecture of this app focuses on displaying markers on a map and allowing users to view the details of each marker. It follows a modular design that separates concerns such as data fetching, marker rendering, and user interaction with the map. The app uses a map rendering library like `react-native-maps`, and markers are dynamically added to the map using coordinates fetched from an API. When a user taps on a marker, detailed information about the marker is displayed in a modal or dedicated detail view.

## Implementation decisions
To implement the marker display and detail functionality, the app uses a combination of state management and API calls. The markers are fetched either from Golang API. Once markers are loaded, they are rendered on the map with unique IDs or keys. When a user interacts with a marker, its details are fetched and displayed in a user-friendly interface. 

## Future Improvements
1.  **Enhanced Marker Customization**:

- Allow for color-coded or custom icon markers and add animations for marker interactions.

  

2.  **User Interaction**:

- Enable users to add their own markers and implement marker clustering for better performance.

3.  **Search and Filter**:

- Add search functionality to filter markers by keyword or category.

  

4.  **Performance Optimizations**:

- Improve marker rendering to ensure smooth performance with larger data sets.

  

5.  **Geolocation and Navigation**:

- Provide real-time location tracking and directions to selected markers.

  

6.  **Marker Details Enhancement**:

- Add media and interactive elements (e.g., reviews) to marker details.

  

7.  **Multi-Language Support**:

- Support multiple languages to cater to a global audience.

  

8.  **Real-Time Updates**:

- Implement real-time updates for new or updated markers.

## Running Unit Tests

This project uses Jest for unit test. To run unit tests, follow these steps:

1.  **Run Tests**: From the project directory, you can run unit tests using the following command:

```bash

npm test

```

or

```bash

yarn test

```


This will run Jest, and the test results will be displayed in the terminal.

2.  **Run on specific platform**: If you'd like to run the tests for specific platform (Android, iOS), yu need to update this line in package.json file "jest": { "preset": "jest-expo/android" }. If you run tests for ios, replace ios with "android".



