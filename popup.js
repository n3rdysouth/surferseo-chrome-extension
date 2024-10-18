document.addEventListener('DOMContentLoaded', function() {
  const apiKeyInput = document.getElementById('apiKey');
  const setupForm = document.getElementById('setup-form');
  const appDiv = document.getElementById('app');
  const setupDiv = document.getElementById('setup');
  const changeApiKeyLink = document.getElementById('change-api-key-link');
  const contentEditorForm = document.getElementById('content-editor-form');
  const auditsForm = document.getElementById('audits-form');
  const serpsAnalyzerForm = document.getElementById('serps-analyzer-form');
  const alertContainer = document.getElementById('alert-container');

  const defaultLocation = 'United States';
  const locationStorageKey = 'lastUsedLocation';

  // Function to create and show an alert
  function showAlert(message, type) {
    const alert = document.createElement('div');
    alert.className = `alert alert-${type} alert-dismissible`;
    alert.role = 'alert';
    alert.innerHTML = `
      ${message}
    `;
    alertContainer.appendChild(alert);
    setTimeout(() => {
      alert.remove();
    }, 5000); // Alert disappears after 5 seconds
  }

  // Function to set up the API key
  setupForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const apiKey = apiKeyInput.value;
    if (apiKey) {
      chrome.storage.local.set({ apiKey }, () => {
        switchToApp();
        showAlert('API Key saved successfully!', 'success');
      });
    }
  });

  // Switch to app interface
  function switchToApp() {
    setupDiv.style.display = 'none';
    appDiv.style.display = 'block';
    populateLocations();
  }

  // Handle Change API Key link click
  changeApiKeyLink.addEventListener('click', function(event) {
    event.preventDefault();
    appDiv.style.display = 'none';
    setupDiv.style.display = 'block';
  });

  // Get stored API key and switch to app if it exists
  chrome.storage.local.get(['apiKey'], (result) => {
    if (result.apiKey) {
      switchToApp();
    } else {
      setupDiv.style.display = 'block';
      appDiv.style.display = 'none';
    }
  });

  // Populate location options from the SurferSEO API
  async function populateLocations() {
    const response = await fetch('https://app.surferseo.com/api/v1/locations');
    const locations = await response.json();

    let lastUsedLocation = defaultLocation;
    chrome.storage.local.get([locationStorageKey], (result) => {
      if (result[locationStorageKey]) {
        lastUsedLocation = result[locationStorageKey];
      }

      const locationSelects = document.querySelectorAll('select[id^="location"]');
      locationSelects.forEach(select => {
        locations.forEach(location => {
          const option = document.createElement('option');
          option.value = location;
          option.text = location;
          select.appendChild(option);
        });

        select.value = lastUsedLocation;
      });
    });
  }

  // Store last used location when any form is submitted
  function storeLastUsedLocation(location) {
    chrome.storage.local.set({ [locationStorageKey]: location });
  }

  // Get current tab URL for audits
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    const urlInput = document.getElementById('url');
    if (tabs[0] && tabs[0].url) {
      urlInput.value = tabs[0].url;
    }
  });

  // Handle Content Editor form submission
  contentEditorForm.addEventListener('submit', function(event) {
    event.preventDefault();
    chrome.storage.local.get(['apiKey'], function(result) {
      const apiKey = result.apiKey;
      const keyword = document.getElementById('keyword').value;
      const location = document.getElementById('location').value;
      storeLastUsedLocation(location);

      fetch('https://app.surferseo.com/api/v1/content_editors', {
        method: 'POST',
        headers: {
          'API-KEY': apiKey,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          keywords: [keyword],
          location: location
        })
      })
          .then(response => response.json())
          .then(data => {
            console.log(data);
            showAlert('Content Editor Request Scheduled with ID: ' + data.id, 'success');
          })
          .catch(error => {
            console.error('Error:', error);
            showAlert('An error occurred: ' + error, 'danger');
          });
    });
  });

  // Handle Audits form submission
  auditsForm.addEventListener('submit', function(event) {
    event.preventDefault();
    chrome.storage.local.get(['apiKey'], function(result) {
      const apiKey = result.apiKey;
      const url = document.getElementById('url').value;
      const keyword = document.getElementById('keyword-audit').value;
      const location = document.getElementById('location-audit').value;
      storeLastUsedLocation(location);

      fetch('https://app.surferseo.com/api/v1/audits', {
        method: 'POST',
        headers: {
          'API-KEY': apiKey,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          keyword: keyword,
          location: location,
          url: url
        })
      })
          .then(response => response.json())
          .then(data => {
            console.log(data);
            showAlert('Audit Request Scheduled with ID: ' + data.id, 'success');
          })
          .catch(error => {
            console.error('Error:', error);
            showAlert('An error occurred: ' + error, 'danger');
          });
    });
  });

  // Handle SERPs Analyzer form submission
  serpsAnalyzerForm.addEventListener('submit', function(event) {
    event.preventDefault();
    chrome.storage.local.get(['apiKey'], function(result) {
      const apiKey = result.apiKey;
      const keyword = document.getElementById('keyword-serps').value;
      const location = document.getElementById('location-serps').value;
      storeLastUsedLocation(location);

      fetch('https://app.surferseo.com/api/v1/serp_analyzer', {
        method: 'POST',
        headers: {
          'API-KEY': apiKey,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          keyword: keyword,
          location: location,
          device: 'mobile'
        })
      })
          .then(response => response.json())
          .then(data => {
            console.log(data);
            showAlert('SERP Analyzer Request Scheduled with ID: ' + data.id, 'success');
          })
          .catch(error => {
            console.error('Error:', error);
            showAlert('An error occurred: ' + error, 'danger');
          });
    });
  });
});