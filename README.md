# SurferSEO Chrome Extension

This is a free and open-source Chrome Extension for interacting with the SurferSEO API. **Please note that the SurferSEO API is only available to enterprise customers.** This extension is provided as-is for those with API access and a valid API key.

## Features

- **Content Editor**: Schedule a content editor request.
- **Audit**: Schedule an audit for a given URL and keyword.
- **SERP Analyzer**: Schedule a SERP analyzer request for mobile devices.
- **Location Select**: Automatically defaults to "United States" or the last used location.

## Installation

1. **Clone this repository:**
   ```sh
   git clone https://github.com/your-repository/surferseo-chrome-extension.git
   ```

2. **Open Chrome and navigate to `chrome://extensions`:**
   - Enable "Developer mode" in the top right corner.
   - Click "Load unpacked" and select the folder of the cloned repository.

## Usage

1. **Setup:**
   - Open the extension popup.
   - Enter your SurferSEO API key and click "Save". The API key will be stored locally in Chrome's storage.

2. **Content Editor:**
   - Input the keyword you wish to analyze.
   - Select the desired location.
   - Click "Submit" to schedule a content editor request.

3. **Audit:**
   - Ensure the URL of the you wish to audit is correct. It defaults to the current URL you are on.
   - Input the keyword you wish to analyze.
   - Select the desired location.
   - Click "Submit" to schedule an audit.

4. **SERP Analyzer:**
   - Input the keyword you wish to analyze.
   - Select the desired location.
   - Click "Submit" to schedule a SERP analyzer request.

## Error Handling

- The extension includes simple error handling for API requests.
- User-friendly error messages will be displayed for common issues such as "Access Denied".

## Contributing

1. **Fork the repository:**
   - [https://github.com/your-repository/surferseo-chrome-extension](https://github.com/your-repository/surferseo-chrome-extension)

2. **Create your feature branch:**
   ```sh
   git checkout -b feature/my-new-feature
   ```

3. **Commit your changes:**
   ```sh
   git commit -am 'Add some feature'
   ```

4. **Push to the branch:**
   ```sh
   git push origin feature/my-new-feature
   ```

5. **Create a new Pull Request:**
   - Go to the repository on GitHub and click "New pull request".

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Disclaimer

This is a free and open-source extension meant to facilitate interaction with the SurferSEO API for those who have access to it. The SurferSEO API itself is restricted to enterprise customers, and you must have a valid API key to use this extension.

---

### Notes

- The SurferSEO API requires a valid API key which should be kept confidential.
- This extension stores the API key locally in Chrome's storage and does not share it with any third-party services.

**Happy optimizing!**
